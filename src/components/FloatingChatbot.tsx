'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Bot, User, Send, X, RefreshCw, MessageSquare } from 'lucide-react';
import { Language } from '@/types';
const logoSrc = '/athar-chatbot.png';
import { findLocalMatch } from '@/data/chatbot';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  isStreaming?: boolean;
}

interface FloatingChatbotProps {
  currentLang: Language;
}

const SUGGESTED_QUESTIONS = {
  ar: [
    { question: "ما هي أكاديمية أثر؟" },
    { question: "كيف أسجل في الأكاديمية؟" },
    { question: "كم الرسوم داخل ماليزيا؟" },
    { question: "ما هي شروط القبول؟" }
  ],
  en: [
    { question: "What is Athar Academy?" },
    { question: "How can I register?" },
    { question: "What are the fees in Malaysia?" },
    { question: "What are the requirements?" }
  ],
  ms: [
    { question: "Apa itu Akademi Athar?" },
    { question: "Bagaimana cara mendaftar?" },
    { question: "Berapakah yuran di Malaysia?" },
    { question: "Apakah syarat kemasukan?" }
  ]
};

export default function FloatingChatbot({ currentLang }: FloatingChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isBotResponding, setIsBotResponding] = useState(false);
  const [apiStatus, setApiStatus] = useState<'testing' | 'live' | 'local'>('testing');

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Load chat history and check API status on mount
  useEffect(() => {
    const cached = sessionStorage.getItem('athar_chatbot_messages');
    if (cached) {
      try {
        setMessages(JSON.parse(cached));
      } catch (e) {
        console.warn('Failed to parse cached messages', e);
      }
    }

    // Ping /api/chat to determine if live API is available
    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'ping', history: [], lang: 'ar' })
    })
      .then(res => {
        if (res.ok) {
          setApiStatus('live');
        } else {
          setApiStatus('local');
        }
      })
      .catch(() => {
        setApiStatus('local');
      });
  }, []);

  // Save messages to session storage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      sessionStorage.setItem('athar_chatbot_messages', JSON.stringify(messages));
    } else {
      sessionStorage.removeItem('athar_chatbot_messages');
    }
  }, [messages]);

  // Initial welcome message if history is empty
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeAr = `السلام عليكم ورحمة الله وبركاته، حياكم الله في أكاديمية أثر. أنا مساعد خدمة العملاء لأكاديمية أثر. كيف يمكنني مساعدتكم اليوم؟`;
      const welcomeEn = `Assalamu Alaikum wa Rahmatullah wa Barakatuh! Welcome to Athar Academy. I am your customer service assistant. How can I assist you today?`;
      const welcomeMs = `Assalamualaikum warahmatullahi wabarakatuh, selamat datang ke Akademi Athar. Saya pembantu khidmat pelanggan anda. Bagaimana saya boleh membantu anda hari ini?`;

      setMessages([
        {
          id: 'welcome-msg',
          sender: 'bot',
          text: currentLang === 'ms' ? welcomeMs : currentLang === 'ar' ? welcomeAr : welcomeEn,
          timestamp: new Date().toLocaleTimeString(
            currentLang === 'ar' ? 'ar-EG' : currentLang === 'ms' ? 'ms-MY' : 'en-US',
            { hour: '2-digit', minute: '2-digit' }
          )
        }
      ]);
    }
  }, [currentLang, messages.length]);

  // Auto-scroll inside chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isOpen]);

  // Handle typing stream effect
  const streamResponseText = (fullText: string) => {
    const messageId = `bot-stream-${Date.now()}`;
    const timeStr = new Date().toLocaleTimeString(
      currentLang === 'ar' ? 'ar-EG' : currentLang === 'ms' ? 'ms-MY' : 'en-US',
      { hour: '2-digit', minute: '2-digit' }
    );

    setMessages((prev) => [
      ...prev,
      {
        id: messageId,
        sender: 'bot',
        text: '',
        timestamp: timeStr,
        isStreaming: true
      }
    ]);

    let wordIdx = 0;
    const words = fullText.split(' ');
    const interval = setInterval(() => {
      if (wordIdx < words.length) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === messageId
              ? { ...msg, text: words.slice(0, wordIdx + 1).join(' ') }
              : msg
          )
        );
        wordIdx++;
      } else {
        clearInterval(interval);
        setMessages((prev) =>
          prev.map((msg) => (msg.id === messageId ? { ...msg, isStreaming: false } : msg))
        );
        setIsBotResponding(false);
      }
    }, 40);
  };



  // Sending message handler
  const handleSendMessage = async (textOverride?: string) => {
    const text = (textOverride || inputText).trim();
    if (!text || isBotResponding) return;

    if (!textOverride) setInputText('');

    const timeStr = new Date().toLocaleTimeString(
      currentLang === 'ar' ? 'ar-EG' : currentLang === 'ms' ? 'ms-MY' : 'en-US',
      { hour: '2-digit', minute: '2-digit' }
    );
    const userMsgId = `user-msg-${Date.now()}`;

    setMessages((prev) => [
      ...prev,
      {
        id: userMsgId,
        sender: 'user',
        text: text,
        timestamp: timeStr
      }
    ]);

    setIsBotResponding(true);

    const localMatch = findLocalMatch(text, currentLang);
    if (localMatch) {
      setTimeout(() => {
        streamResponseText(localMatch);
      }, 500);
      return;
    }

    try {
      const history = messages
        .slice(-6)
        .map(m => ({
          id: m.id,
          sender: m.sender,
          text: m.text
        }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history,
          lang: currentLang,
          type: 'customer_service'
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const statusText = response.status === 429
          ? (currentLang === 'ar' ? 'نفاد حصة الاستهلاك اليومية' : 'Quota Exceeded')
          : (errorData.error || 'Server Error');
        throw new Error(statusText);
      }

      const data = await response.json();
      if (data.text) {
        setApiStatus('live');
        streamResponseText(data.text);
      } else {
        throw new Error('No text in response');
      }
    } catch (error: any) {
      console.warn('API call failed:', error);

      const errorMessage = currentLang === 'ms'
        ? `⚠️ Sambungan ke API Gemini gagal (${error.message || 'Ralat Tidak Diketahui'}). Sila pastikan GEMINI_API_KEY dikonfigurasikan dengan betul dan mempunyai kuota yang mencukupi dalam fail .env.local anda.`
        : currentLang === 'ar'
        ? `⚠️ فشل الاتصال بـ Gemini API (${error.message || 'خطأ غير معروف'}). يرجى التأكد من إدخال مفتاح GEMINI_API_KEY بشكل صحيح ومن توفر حصة الاستهلاك (Quota) في ملف .env.local.`
        : `⚠️ Connection to Gemini API failed (${error.message || 'Unknown Error'}). Please ensure GEMINI_API_KEY is correctly configured and has enough quota in your .env.local file.`;

      streamResponseText(errorMessage);
    }
  };

  const handleClearHistory = () => {
    setMessages([]);
    sessionStorage.removeItem('athar_chatbot_messages');
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 z-50 flex h-16 w-16 items-center justify-center rounded-full border-2 border-brand-gold shadow-2xl transition-all duration-300 scale-100 hover:scale-110 active:scale-95 cursor-pointer overflow-hidden ${isOpen ? 'bg-brand-blue-dark text-white' : 'bg-white text-brand-gold'
          } ${currentLang === 'ar' ? 'left-6' : 'right-6'}`}
        title={currentLang === 'ms' ? 'Pembantu AI Athar' : currentLang === 'ar' ? 'مساعد أثر الذكي' : 'Athar Academy Assistant'}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white animate-in fade-in zoom-in duration-200" />
        ) : (
          <div className="relative w-full h-full flex items-center justify-center rounded-full">
            <img src={logoSrc} alt="شعار أثر" className="w-full h-full object-cover rounded-full" />
            <span className="absolute bottom-1 right-1 flex px-1.5 py-0.5 rounded-full bg-brand-gold text-[8px] font-black text-brand-blue-dark shadow-md border border-white leading-none select-none">
              AI
            </span>
          </div>
        )}
      </button>

      {/* Floating Chat Panel */}
      {isOpen && (
        <div
          dir={currentLang === 'ar' ? 'rtl' : 'ltr'}
          className={`fixed bottom-24 z-50 flex h-[500px] max-h-[80vh] w-[90%] sm:w-[400px] flex-col overflow-hidden rounded-3xl border border-brand-gold/30 bg-white shadow-2xl animate-in slide-in-from-bottom-5 fade-in duration-300 ${currentLang === 'ar' ? 'left-6' : 'right-6'
            }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-brand-blue-dark text-white p-4 border-b border-brand-gold/20">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-brand-gold to-brand-gold-light p-0.5 overflow-hidden shadow-md">
                  <img src={logoSrc} alt="شعار أثر" className="h-full w-full object-cover rounded-full" />
                </div>
                <span className="absolute -bottom-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-brand-gold text-[8px] font-black text-brand-blue-dark shadow-sm ring-1 ring-white select-none">
                  AI
                </span>
                <span className="absolute bottom-0 left-0 h-2.5 w-2.5 rounded-full bg-green-500 border border-brand-blue-dark animate-pulse" />
              </div>
              <div className="text-left rtl:text-right">
                <h4 className="text-xs sm:text-sm font-bold text-brand-gold font-serif leading-none">
                  {currentLang === 'ms' ? 'Pembantu AI Athar' : currentLang === 'ar' ? 'مساعد أثر الذكي' : 'Athar Academy Assistant'}
                </h4>
                <span className="text-[9px] text-slate-300 font-mono block mt-1">
                  {apiStatus === 'live'
                    ? (currentLang === 'ms' ? 'AI Aktif Berhubung' : currentLang === 'ar' ? 'متصل بالذكاء مباشر' : 'Live AI Connected')
                    : (currentLang === 'ms' ? 'Panduan Khidmat Pelanggan' : currentLang === 'ar' ? 'مساعد خدمة العملاء' : 'Customer Service Guide')}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleClearHistory}
                className="text-white/60 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
                title={currentLang === 'ms' ? 'Padam Sembang' : currentLang === 'ar' ? 'مسح المحادثة' : 'Clear Chat'}
              >
                <RefreshCw className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div
            ref={chatContainerRef}
            className="flex-grow overflow-y-auto bg-slate-50 p-4 space-y-4 scrollbar"
          >
            {messages.map((m) => {
              const isBot = m.sender === 'bot';
              return (
                <div
                  key={m.id}
                  className={`flex items-start gap-2 max-w-[85%] ${isBot ? 'mr-auto rtl:ml-auto rtl:mr-0' : 'ml-auto rtl:mr-auto rtl:ml-0 flex-row-reverse'
                    }`}
                >
                  {isBot ? (
                    <div className="relative shrink-0">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-brand-gold to-brand-gold-light p-0.5 flex items-center justify-center shadow-md overflow-hidden">
                        <img src={logoSrc} alt="شعار أثر" className="h-full w-full object-cover rounded-full" />
                      </div>
                      <span className="absolute -bottom-1 -right-1 rtl:-left-1 rtl:right-auto flex items-center justify-center px-1.5 py-0.5 rounded-full bg-brand-gold text-[7px] font-black text-brand-blue-dark shadow-md border border-white leading-none select-none">
                        AI
                      </span>
                    </div>
                  ) : (
                    <div className="p-1.5 rounded-full bg-brand-blue text-brand-gold shrink-0">
                      <User className="h-3.5 w-3.5" />
                    </div>
                  )}

                  <div className="space-y-1">
                    <div
                      className={`rounded-2xl p-3 text-xs leading-relaxed whitespace-pre-line shadow-sm border ${isBot
                          ? 'bg-white text-slate-800 border-slate-200/60 rounded-tl-none rtl:rounded-tl-2xl rtl:rounded-tr-none'
                          : 'bg-brand-blue text-white border-transparent rounded-tr-none rtl:rounded-tr-2xl rtl:rounded-tl-none font-medium'
                        }`}
                    >
                      {m.text}
                      {m.isStreaming && (
                        <span className="inline-block h-3.5 w-1 bg-brand-gold ml-1 animate-pulse" />
                      )}
                    </div>
                    <span className="text-[8px] text-slate-400 font-mono block px-1">
                      {m.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {isBotResponding && messages.length > 0 && messages[messages.length - 1].sender === 'user' && (
              <div className="flex items-start gap-2 max-w-[85%] mr-auto rtl:ml-auto rtl:mr-0 text-left rtl:text-right">
                <div className="relative shrink-0">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-brand-gold to-brand-gold-light p-0.5 flex items-center justify-center shadow-md overflow-hidden">
                    <img src={logoSrc} alt="شعار أثر" className="h-full w-full object-cover rounded-full" />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="rounded-2xl p-3 bg-white text-slate-800 border border-slate-200/60 rounded-tl-none rtl:rounded-tl-2xl rtl:rounded-tr-none flex items-center gap-1.2 min-w-[55px] justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Suggestions at bottom of chat screen when empty or idle */}
          <div className="px-4 py-2 bg-slate-100/50 border-t border-slate-200/50 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-none">
            {(currentLang === 'ms' ? SUGGESTED_QUESTIONS.ms : currentLang === 'ar' ? SUGGESTED_QUESTIONS.ar : SUGGESTED_QUESTIONS.en).map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(item.question)}
                disabled={isBotResponding}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 text-[10px] font-medium hover:border-brand-gold hover:bg-brand-gold/5 transition-all duration-200 cursor-pointer select-none"
              >
                <MessageSquare className="h-3 w-3 text-brand-gold" />
                {item.question}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-slate-100">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl p-1.5"
            >
              <input
                type="text"
                value={inputText}
                disabled={isBotResponding}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={currentLang === 'ms' ? 'Taip pertanyaan anda...' : currentLang === 'ar' ? 'اكتب استفسارك هنا...' : 'Type your question...'}
                className="flex-grow bg-transparent text-xs px-2 focus:outline-none"
              />
              <button
                type="submit"
                disabled={isBotResponding || !inputText.trim()}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-blue text-brand-gold hover:bg-brand-blue-dark transition-colors duration-200 disabled:opacity-50 cursor-pointer"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
