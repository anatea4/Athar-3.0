'use client';
import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles, Send, Bot, User, RefreshCw, Compass,
  MessageSquare, HelpCircle, Quote, Volume2, Globe, ArrowRight, ArrowLeft
} from 'lucide-react';
import { Language, getLangField } from '@/types';

const atharChatbot = '/athar-chatbot.png';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  isStreaming?: boolean;
}

interface AICompanionProps {
  currentLang: Language;
}

// High-fidelity Quranic knowledge corpus for responsive AI simulation
const AI_KNOWLEDGE_BASE = {
  ar: [
    {
      keywords: ['تفسير', 'رتل', 'الترتيل', 'ورتل القرآن'],
      question: 'فسّر لي الآية الكريمة: {وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا}',
      answer: `الترتيل في اللغة هو التنسيق والترتيب وحسن الأداء دون استعجال.

وعند المفسرين (كابن كثير والطبري): يعني قراءة القرآن بتدبر وهدوء وطمأنينة، مع إخراج كل حرف من مخرجه الصحيح وإعطائه حقه ومستحقه من الصفات كالغنة والقلقلة والمدود.

**الأثر التربوي والسلوكي للمسلم:**
1. **استحضار هيبة الخطاب الإلهي:** القراءة المتئدة تتيح لعقلك استيعاب معاني الربوبية والمواعظ، فتخترق الآيات شغاف قلبك.
2. **صلاح العمل:** الغاية من نزول القرآن التدبر المؤدي للعمل، والترتيل هو البوابة الذهبية للفهم السليم.
3. **التشبه بالنبي ﷺ:** فقد كانت قراءته مفسرة حرفاً حرفاً، يقف عند رؤوس الآي، ويمد صوته بها مداً مباركاً.`
    },
    {
      keywords: ['تثبيت', 'الحفظ', 'أنسى', 'نسيان', 'كيف أحفظ'],
      question: 'كيف أضع خطة مراجعة متينة لحفظ وتثبيت القرآن دون نسيان؟',
      answer: `تثبيت القرآن يرتكز على قاعدتين أساسيتين: "معاهدة المحفوظ" و "منهجية المراجعة التراكمية". إليك الخطة الذهبية المتبعة في أكاديمية أثر:

1. **تقسيم الحفظ اليومي إلى ثلاثة أبعاد:**
   * **الجديد (اللوح الراهن):** وهو القدر الذي تحفظه اليوم (مثلاً: نصف صفحة). يكرر تسميعه 20 مرة غيباً قبل التجاوز لضمان ركوزه في الذاكرة قصيرة المدى.
   * **الربط القريب (الماضي القريب):** وهو مراجعة آخر أسبوع مما تم حفظه (مثلاً: آخر 5 صفحات ملتصقة باللوح الجديد). إهماله يسبب تفلت البدايات فور العبور.
   * **الربط البعيد (الماضي البعيد):** مراجعة عامة لبقية الأجزاء بمعدل جزء يومياً للمتقن، أو نصف جزء للمبتدئ.

2. **التلاوة في الصلوات والنوافل:**
   أعظم محك لتثبيت لوحك الجديد هو أن تصلي به ركعتي قيام الليل أو النوافل. إذا صليت بمحفوظك، فلن تنساه أبداً بإذن الله.

3. **الرفيق والشيخ المعلم:**
   التسميع الفردي على شيخ مجاز (كما في مقارئنا التفاعلية) يمنع الأخطاء الوهمية ويعالج تفلت الروابط الصوتية.`
    },
    {
      keywords: ['نورانية', 'القاعدة', 'نور البينات', 'البراعم', 'أطفال'],
      question: 'ما فائدة القاعدة النورانية لتأسيس النطق والقراءة للأطفال؟',
      answer: `القاعدة النورانية هي المنهج العلمي الكلاسيكي الأصيل لتدريب اللسان على مخارج الحروف الهجائية والتجويد التطبيقي للقرآن الكريم. وتتجلى فوائدها العميقة للبراعم في نقاط محددة:

* **ضبط مخارج الحروف التطبيقي:** يتعلم الطفل بالفطرة الصوتية الفرق الدقيق بين مخارج المتشابهات (مثل الضاد والدال، والسين والصاد والزاي) دون الحاجة لشرح مصطلحات تشريحية معقدة.
* **التهجئة التفاعلية للرسم العثماني:** يتمرس البراعم على تهجئة كلمات المصحف بحركاتها الثلاث (الفتحة، الضمة، الكسرة) والتنوين والسكون والمد المتصل والمنفصل، مما يمكنهم من القراءة بطلاقة من أي موضع في القرآن الكريم فور إنهائه.
* **الفصاحة اللغوية وتطوير النطق:** تساعد في علاج عيوب النطق والتأتأة لدى الأطفال الصغار وتكسبهم لساناً عربياً هابط الفصاحة ومخارج بالغة الوضوح والجودة.`
    },
    {
      keywords: ['نصائح', 'ابنتي', 'ابني', 'تشجيع', 'الأهل'],
      question: 'أريد نصائح تربوية لتشجيع ابني أو ابنتي على الحفظ اليومي وتنمية حب القرآن؟',
      answer: `البيت هو مهد الأثر ومصباح الهداية الأول للأبناء والبراعم. لتشجيعهم تفضل بتطبيق هذه الإرشادات السلوكية الراقية:

1. **القدوة الصامتة:**
   أن يراك طفلك ممسكاً بمصحفك ترتل وتدبر، هو أبلغ من مئة نصيحة لفظية مكررة. الأطفال يقلدون أفعال الأبوين عاطفياً.
2. **الربط بالحب لا بالعقاب:**
   تجنب ربط حفظ القرآن بالتهديد أو الحرمان. اجعل وقت التسميع واحة دافئة، تفوح بعبير الطيب والعناق والثناء الجميل.
3. **الجوائز العينية وجدول الأثر:**
   ضع لوحة تشجيعية في الصالة لتثبيت النجوم والمكافآت (مثل بوابتنا التفاعلية التي تمنح الألقاب والتاج الذهبي). كافئهم عند ختم فصول أو أجزاء معينة باحتفال عائلي بهيج.
4. **الصلة بالقصص النبوي:**
   اشرح لهم معاني الآيات من خلال كرتون وقصص مصورة ممتعة قبل النوم (مثل قصص النساء في القرآن وقصص الأنبياء المتوفرة بمناهج الأكاديمية).`
    }
  ],
  en: [
    {
      keywords: ['tafsir', 'recite', 'tarteel', 'measured'],
      question: 'Explain the noble verse: "And recite the Qur\'an with measured recitation" [73:4]',
      answer: `In Arabic linguistics, "Tarteel" means the harmonious, deliberate, and beautiful delivery of speech without haste.

According to eminent classical commentators (like Ibn Kathir and Al-Tabari): It means reciting the Quran slowly, contemplating every word deeply, emitting every letter from its proper articulation point (Makhraj), and absolute fulfillment of Tajweed rules (such as nasalization and elongation).

**The Spiritual and Practical Impact for a Believer:**
1. **Contemplating the Divine Speech:** Slower recitation allows your mind to assimilate the sublime attributes of Allah, enabling the light of verses to pierce deep into your heart.
2. **Inspiring Righteous Actions:** The ultimate purpose of revelation is guidance. Tarteel acts as the key gate toward proper comprehension and implementation.
3. **Emulating Prophet Muhammad ﷺ:** His recitation was completely distinct, deliberate, stopping at every verse, and beautifully elongating its key vowels with spiritual reverence.`
    },
    {
      keywords: ['memorize', 'forget', 'rehearse', 'revision', 'plan'],
      question: 'How do I design a robust revision plan to retain my Quranic memorization safely?',
      answer: `Retaining Quranic memorization depends entirely on "Consistent Reclamation" and "Cumulative Backlogging." Here is the golden structure practiced at Athar Academy:

1. **Segment your Daily Circle into Three Key Dimensions:**
   * **The New Homework (The Current Board):** The fresh verses memorized today (e.g., 1 page). Rehearse and recite it 20 times to establish deep core familiarity before moving on.
   * **The Near Consolidation (Recent History):** Reviewing the pages memorized over the last 7 days (e.g., last 5 pages immediately preceding today's board) to prevent fresh links from evaporating.
   * **The Deep Recalling (Distant History):** General cumulative review of previously completed chapters (at least half of a Juz daily for beginners, or 1 Juz for advanced students).

2. **Recite within Daily Prayers:**
   The absolute best catalyst to secure your newly memorized verses is performing your voluntary nightly prayers (Tahajjud) or supererogatory prayers using what you memorized today.

3. **Active Scholar Assessment:**
   Reciting 1-on-1 to a certified shaykh or shaykha (like those presiding over our Interactive Maqra'a) eliminates errors in articulation and corrects structural slipups.`
    },
    {
      keywords: ['noorania', 'base', 'young', 'kids', 'pronunciation'],
      question: 'What is the benefit of the Noorania foundation for early child learners?',
      answer: `The Qaida Noorania is classical Arabic's most refined phonetic foundation, designed to groom the early learner's tongue in correct Quranic articulation.

* **Surgical Phonetic Precision:** Children naturally build muscles around rare sounds (like Ghad, Da, Thaa, and Qaaf) dynamically without getting bogged down with anatomical jargon.
* **Decoding Uthmani Script:** It trains young eyes to read Quranic configurations smoothly with their correct accents (Fathah, Dammah, Kasrah, Shaddah, and Madd), enabling fluent reading from any page.
* **Speech Development & Eloquence:** It plays a therapeutic role for children with minor speech impediments or pronunciation delays, introducing superior vocabulary and beautiful accents early in life.`
    }
  ],
  ms: [
    {
      keywords: ['tafsir', 'baca', 'tartil', 'hukum'],
      question: 'Terangkan makna ayat mulia: "Dan bacalah Al-Quran itu dengan perlahan-lahan (tartil)" [73:4]',
      answer: `Dalam bahasa Arab, "Tartil" bermaksud pembacaan yang harmoni, tenang, dan indah tanpa tergesa-gesa.

Menurut para mufassir terkenal (seperti Ibnu Kathir dan Al-Tabari): Ia bermaksud membaca Al-Quran perlahan-lahan, merenungkan setiap kalimah secara mendalam, menyebut setiap huruf dari makhrajnya yang betul, serta memenuhi hukum Tajwid sepenuhnya (seperti dengung dan mad).

**Kesan Rohani dan Praktikal bagi Orang Beriman:**
1. **Merenungkan Firman Tuhan:** Pembacaan yang tenang membolehkan minda memahami sifat-sifat keagungan Allah, membolehkan cahaya ayat-ayat Al-Quran meresap ke dalam hati.
2. **Menginspirasi Amalan Soleh:** Tujuan utama wahyu diturunkan adalah sebagai petunjuk. Tartil bertindak sebagai kunci ke arah kefahaman dan pelaksanaan yang betul.
3. **Mencontohi Rasulullah ﷺ:** Pembacaan Baginda ﷺ sangat jelas, tenang, berhenti pada setiap ayat, dan memanjangkan sebutan huruf mad dengan penuh khusyuk.`
    },
    {
      keywords: ['hafal', 'lupa', 'ulang', 'ulangkaji', 'jadual', 'rancangan'],
      question: 'Bagaimanakah cara merancang jadual ulangkaji yang mantap untuk mengekalkan hafazan Al-Quran saya?',
      answer: `Mengekalkan hafazan Al-Quran bergantung sepenuhnya kepada "Ulangkaji Konsisten" dan "Sistem Ulangkaji Kumulatif." Berikut adalah struktur emas yang diamalkan di Akademi Athar:

1. **Bahagikan Tugasan Halaqah Harian kepada Tiga Bahagian:**
   * **Hafazan Baru (Sabak):** Ayat baharu yang dihafal hari ini (cth. 1 halaman). Ulang dan baca sebanyak 20 kali secara ghaib untuk membina ingatan kuat sebelum beralih ke ayat lain.
   * **Ulangkaji Dekat (Sabqi):** Mengulang halaman yang telah dihafal sepanjang 7 hari yang lalu (cth. 5 halaman terakhir sebelum hafazan hari ini) bagi mengelakkan hafazan baharu daripada hilang.
   * **Ulangkaji Jauh (Manzil):** Ulangkaji kumulatif umum bagi bab yang telah dihafal sebelum ini (sekurang-kurangnya separuh Juzuk setiap hari untuk pemula, atau 1 Juzuk untuk pelajar lanjutan).

2. **Baca dalam Solat Harian:**
   Cara terbaik untuk mengukuhkan hafazan baharu anda adalah dengan membacanya semasa solat sunat malam (Tahajjud) atau solat sunat rawatib.

3. **Penilaian Aktif Bersama Guru:**
   Membaca secara bersemuka (1-on-1) bersama syeikh atau ustazah yang bertauliah (seperti di Maqra'a Interaktif kami) dapat membetulkan kesilapan makhraj dan sebutan.`
    },
    {
      keywords: ['noorania', 'asas', 'kanak-kanak', 'sebutan'],
      question: 'Apakah kelebihan asas Qaida Noorania untuk kanak-kanak pada peringkat awal?',
      answer: `Qaida Noorania ialah asas fonetik Arab klasik yang paling halus, direka untuk melatih lidah pelajar pada peringkat awal dalam sebutan Al-Quran yang betul.

* **Ketepatan Fonetik yang Jelas:** Kanak-kanak secara semula jadi melatih otot sebutan bunyi huruf yang sukar (seperti Ghad, Da, Thaa, dan Qaaf) tanpa perlu dibebankan dengan istilah anatomi yang rumit.
* **Membaca Rasm Uthmani:** Ia melatih mata kanak-kanak membaca tanda baca Al-Quran dengan lancar (Fathah, Dammah, Kasrah, Shaddah, dan Madd), membolehkan mereka membaca dari mana-mana halaman dengan fasih.
* **Perkembangan Pertuturan & Kefasihan:** Ia memainkan peranan penting untuk kanak-kanak yang mengalami masalah pertuturan ringan atau kelewatan sebutan, memperkenalkan kosa kata yang unggul dan sebutan yang indah sejak awal lagi.`
    }
  ]
};

export default function AICompanion({ currentLang }: AICompanionProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isBotResponding, setIsBotResponding] = useState(false);
  const [apiStatus, setApiStatus] = useState<'testing' | 'live' | 'local'>('testing');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Silent check for live Gemini API status on mount
  useEffect(() => {
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

  // Initialize with a beautiful, polite greeting corresponding to language
  useEffect(() => {
    const welcomeEn = `Assalamu Alaikum! I am **Mu'allim Athar (مُعلّم الأثـر)**, your interactive AI Quran Tutor and Academics Guide.

I am built to assist parents, students, and seekers with Quranic reflections (Tafsir), memorization hacks, Tajweed advice, and details about our academy.

How may I serve your spiritual learning path today? (Please select any prompt below, or type your custom inquiry!)`;

    const welcomeAr = `السلام عليكم ورحمة الله وبركاته! أنا **مُعلّم الأثَـر الذكي**، كمبيوتر ومساعد افتراضي متكامل لخدمتك في تدبر القرآن، ضبط المراجعة، القاعدة النورانية، ومرافقة رحلة الحفظ.

يسعدني أن أجيبك عن معاني الكلمات التجويدية، خطط الحفظ الذهبية للأسر، أو شروحات عن الحلقات والمشايخ.

تفضّل بالنقر على أحد المحاور المعدّة بالأسفل للتجربة الفورية، أو اكتب استفسارك الخاص لأجيبك فوراً بلغةٍ هادئة مريحة!`;

    const welcomeMs = `Assalamu Alaikum! Saya ialah **Mu'allim Athar (مُعلّم الأثـر)**, tutor Al-Quran kecerdasan buatan (AI) interaktif dan panduan akademik anda.

Saya bersedia membantu ibu bapa, pelajar, dan pencari ilmu dengan tadabbur Al-Quran (Tafsir), tips hafazan, nasihat Tajwid, serta maklumat mengenai akademi kami.

Bagaimanakah saya boleh membantu perjalanan pembelajaran rohani anda hari ini? (Sila pilih mana-mana cadangan di bawah, atau taip pertanyaan anda sendiri!)`;

    setMessages([
      {
        id: 'msg-welcome',
        sender: 'bot',
        text: currentLang === 'ms' ? welcomeMs : currentLang === 'en' ? welcomeEn : welcomeAr,
        timestamp: new Date().toLocaleTimeString(currentLang === 'ms' ? 'ms-MY' : currentLang === 'en' ? 'en-US' : 'ar-EG', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [currentLang]);

  // Handle autoscroll on new messages without scrolling the parent window/page
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  // Simulate premium chunk streaming text typing
  const streamResponseText = (fullText: string) => {
    const messageId = `bot-reply-${Date.now()}`;
    const timestampString = new Date().toLocaleTimeString(currentLang === 'ms' ? 'ms-MY' : currentLang === 'en' ? 'en-US' : 'ar-EG', { hour: '2-digit', minute: '2-digit' });

    setMessages((prev) => [
      ...prev,
      {
        id: messageId,
        sender: 'bot',
        text: '',
        timestamp: timestampString,
        isStreaming: true
      }
    ]);

    let currentIndex = 0;
    const words = fullText.split(' ');
    const interval = setInterval(() => {
      if (currentIndex < words.length) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === messageId
              ? { ...m, text: words.slice(0, currentIndex + 1).join(' ') }
              : m
          )
        );
        currentIndex++;
      } else {
        clearInterval(interval);
        setMessages((prev) =>
          prev.map((m) => (m.id === messageId ? { ...m, isStreaming: false } : m))
        );
        setIsBotResponding(false);
      }
    }, 45); // highly smooth and luxurious pace
  };

  const findLocalCompanionMatch = (query: string): string | null => {
    const lowerText = query.toLowerCase();
    const collection = currentLang === 'ms' ? AI_KNOWLEDGE_BASE.ms : currentLang === 'en' ? AI_KNOWLEDGE_BASE.en : AI_KNOWLEDGE_BASE.ar;
    const matchedItem = collection.find(item =>
      item.keywords.some(keyword => lowerText.includes(keyword.toLowerCase()))
    );
    return matchedItem ? matchedItem.answer : null;
  };

  const handleSendMessage = async (textToSend?: string) => {
    const rawText = textToSend || inputText;
    if (!rawText.trim() || isBotResponding) return;

    if (!textToSend) setInputText('');

    const newMsgId = `user-msg-${Date.now()}`;
    const timestampString = new Date().toLocaleTimeString(currentLang === 'ms' ? 'ms-MY' : currentLang === 'en' ? 'en-US' : 'ar-EG', { hour: '2-digit', minute: '2-digit' });

    setMessages((prev) => [
      ...prev,
      {
        id: newMsgId,
        sender: 'user',
        text: rawText,
        timestamp: timestampString
      }
    ]);

    setIsBotResponding(true);

    const localMatch = findLocalCompanionMatch(rawText);
    if (localMatch) {
      setTimeout(() => {
        streamResponseText(localMatch);
      }, 500);
      return;
    }

    try {
      const conversationHistory = messages
        .slice(-10)
        .map(m => ({
          id: m.id,
          sender: m.sender,
          text: m.text
        }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: rawText,
          history: conversationHistory,
          lang: currentLang,
          type: 'tutor'
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const statusText = response.status === 429
          ? (currentLang === 'en' ? 'Quota Exceeded' : currentLang === 'ms' ? 'Had Kuota Dilampaui' : 'نفاد حصة الاستهلاك اليومية')
          : (errorData.error || 'Server Error');
        throw new Error(statusText);
      }

      const data = await response.json();
      if (data.text) {
        setApiStatus('live');
        streamResponseText(data.text);
      } else {
        throw new Error('No text payload in API response');
      }
    } catch (error: any) {
      console.warn('API call failed:', error);

      const errorMessage = currentLang === 'ms'
        ? `⚠️ Sambungan ke API Gemini gagal (${error.message || 'Ralat Tidak Diketahui'}). Sila pastikan GEMINI_API_KEY dikonfigurasikan dengan betul dan mempunyai kuota yang mencukupi dalam fail .env.local anda.`
        : currentLang === 'en'
        ? `⚠️ Connection to Gemini API failed (${error.message || 'Unknown Error'}). Please ensure GEMINI_API_KEY is correctly configured and has enough quota in your .env.local file.`
        : `⚠️ فشل الاتصال بـ Gemini API (${error.message || 'خطأ غير معروف'}). يرجى التأكد من إدخال مفتاح GEMINI_API_KEY بشكل صحيح ومن توفر حصة الاستهلاك (Quota) في ملف .env.local.`;

      streamResponseText(errorMessage);
    }
  };

  return (
    <section id="ai-companion" className="py-16 sm:py-24 bg-white text-slate-800 relative z-10 selection:bg-brand-gold/30">

      {/* Decorative Traditional Border Bracket Overlay for authentic serene look */}
      <div className="absolute inset-0 islamic-pattern opacity-[0.06] pointer-events-none" />
      <div className="absolute top-10 left-10 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Module Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center space-x-2 rtl:space-x-reverse text-brand-gold-dark bg-brand-gold/10 border border-brand-gold/25 rounded-full px-4 py-1.5 shadow-sm">
            <Sparkles className="h-4.5 w-4.5 text-brand-gold animate-spin" />
            <span className="text-xs uppercase tracking-widest font-mono font-extrabold">
              {currentLang === 'ms' ? 'SANTUARI AI INTERAKTIF' : currentLang === 'en' ? 'AI INTERACTIVE SANCTUARY' : 'مُعلّم الأثَـر الذكي والموجّه الافتراضي'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-blue-dark tracking-tight font-classical">
            {currentLang === 'ms' ? 'Pendamping Al-Quran AI Athar' : currentLang === 'en' ? 'Trilingual AI Quran Companion' : 'صرح الذكاء القرآني المساعد'}
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            {currentLang === 'ms'
              ? 'Berinteraksi dengan pembantu pintar kami yang diinspirasikan oleh antara muka premium. Bincangkan tentang Tafsir, kaedah hafazan, perincian Noorania dan laluan akademik.'
              : currentLang === 'en'
              ? 'Engage with our smart workspace inspired by premium interfaces. Chat about Tafsir, memorization rules, Noorania details and academic tracks.'
              : 'مظهر مهدئ ومريح للعين صُمم خصيصاً ليحاكي أحدث الواجهات التفاعلية. اطرح أسئلتك عن فقه العبادات، معاني كلمات التجويد، أو خطط الحفظ اليومية.'}
          </p>
        </div>

        {/* Main Double-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Column 1: Suggestions and Guides (Bento cards look) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="bg-brand-gold-light border border-brand-gold/20 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-brand-gold-dark mb-4">
                <Compass className="h-5 w-5" />
                <h3 className="font-serif font-bold text-sm sm:text-base font-classical">
                  {currentLang === 'ms' ? 'Topik / Pertanyaan Cadangan' : currentLang === 'en' ? 'Suggested Topics / Queries' : 'محاور الأسئلة المختارة'}
                </h3>
              </div>
              <p className="text-slate-600 text-xs mb-5 leading-relaxed">
                {currentLang === 'ms'
                  ? 'Klik mana-mana topik panduan Al-Quran klasik di bawah untuk tindak balas segera daripada AI:'
                  : currentLang === 'en'
                  ? 'Click any classical Quranic guide topic below for an immediate high-fidelity simulated response:'
                  : 'تفضل بالنقر المباشر على أحد المواضيع التالية لتلتمس التفسير والخطط من معلم الأثر فوراً وبصوت كاتب حي:'}
              </p>

              <div className="space-y-3 font-sans">
                {(currentLang === 'ms' ? AI_KNOWLEDGE_BASE.ms : currentLang === 'en' ? AI_KNOWLEDGE_BASE.en : AI_KNOWLEDGE_BASE.ar).map((item, idx) => (
                  <button
                    key={idx}
                    disabled={isBotResponding}
                    onClick={() => handleSendMessage(item.question)}
                    className="w-full text-left rtl:text-right p-3.5 rounded-2xl bg-white border border-brand-gold/15 text-slate-700 hover:border-brand-gold hover:bg-brand-gold/5 transition-all text-xs font-sans font-semibold shadow-sm flex items-start gap-2 max-w-full select-none cursor-pointer hover:scale-[1.01] active:scale-95 duration-200"
                  >
                    <MessageSquare className="h-4 w-4 text-brand-gold mt-0.5 shrink-0" />
                    <span className="leading-relaxed">{item.question}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sub-card: Core Credentials Info */}
            <div className="bg-white border border-brand-gold/15 rounded-3xl p-6 shadow-sm text-left rtl:text-right">
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-brand-gold block mb-1">
                {currentLang === 'ms' ? 'Sumber Pengetahuan AI' : currentLang === 'en' ? 'AI Grounding Source' : 'حلفية المعرفة العقرانية'}
              </span>
              <h4 className="text-sm font-bold text-brand-blue-dark font-classical mb-2">
                {currentLang === 'ms' ? 'Silibus Akademik yang Diiktiraf' : currentLang === 'en' ? 'Authorized Academic Syllabus' : 'المناهج العلمية المعتمدة لـمُعلم الأثر'}
              </h4>
              <p className="text-slate-500 text-[11px] leading-relaxed font-sans">
                {currentLang === 'ms'
                  ? 'Pengetahuan dirujuk secara ketat melalui kitab tafsir yang diiktiraf (Ibnu Kathir, Saadi), kaedah standard Noorania, dan silibus Qiraat yang bertauliah.'
                  : currentLang === 'en'
                  ? 'Knowledge is referenced strictly through authorized tafseer books (Ibn Kathir, Saadi), the standard Noorania methods, and certified Qiraat syllabi.'
                  : 'تم تزويد المعلم بالمرجعيات الشرعية والآراء التربوية المستمدة من عيون التفسير الموثوقة كابن كثير والسعدي مع شروحات علم التجويد التطبيقية.'}
              </p>
            </div>
          </div>

          {/* Column 2: Elegant Conversational UI (ChatGPT look alike) */}
          <div className="lg:col-span-8 flex flex-col h-[580px] bg-white border-2 border-brand-gold/20 rounded-3xl shadow-xl overflow-hidden relative">

            {/* Chat Screen header with shimmering gold banner */}
            <div className="bg-brand-blue-dark text-white p-4.5 px-6 flex items-center justify-between border-b border-brand-gold/30">
              <div className="flex items-center space-x-3.5 rtl:space-x-reverse">
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-brand-gold to-brand-gold-light p-0.5 flex items-center justify-center">
                    <div className="h-full w-full bg-brand-blue rounded-full flex items-center justify-center text-brand-gold">
                      <Bot className="h-5 w-5" />
                    </div>
                  </div>
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-brand-blue-dark animate-pulse" />
                </div>
                <div className="text-left rtl:text-right">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm sm:text-base font-bold text-brand-gold font-serif font-classical leading-none">
                      {currentLang === 'ms' ? "Mu'allim Athar (Pembantu AI)" : currentLang === 'en' ? "Mu'allim Athar (AI Assistant)" : 'مُعلّم الأثَـر (ذكاء اصطناعي مهدئ)'}
                    </h3>
                    {apiStatus === 'live' ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-medium bg-green-500/10 text-green-400 border border-green-500/25 select-none">
                        <span className="w-1.5 h-1.5 mr-1 rtl:ml-1 rtl:mr-0 rounded-full bg-green-400 animate-pulse" />
                        {currentLang === 'ms' ? 'AI Aktif' : currentLang === 'en' ? 'Live AI' : 'متصل بالذكاء'}
                      </span>
                    ) : apiStatus === 'local' ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/25 select-none">
                        <span className="w-1.5 h-1.5 mr-1 rtl:ml-1 rtl:mr-0 rounded-full bg-amber-400" />
                        {currentLang === 'ms' ? 'Mod Tempatan' : currentLang === 'en' ? 'Local Base' : 'الوضع المحلي'}
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-medium bg-slate-500/10 text-slate-400 border border-slate-500/25 select-none">
                        <span className="w-1.5 h-1.5 mr-1 rtl:ml-1 rtl:mr-0 rounded-full bg-slate-400 animate-pulse" />
                        {currentLang === 'ms' ? 'Memeriksa...' : currentLang === 'en' ? 'Checking...' : 'جاري الفحص...'}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-300 font-mono tracking-widest uppercase block mt-1">
                    {currentLang === 'ms' ? 'RUANG KERJA TUTORIAL TIGA BAHASA' : currentLang === 'en' ? 'TRILINGUAL TUTORIAL WORKSPACE' : 'مساعد الأكاديمية الموحّد'}
                  </span>
                </div>
              </div>

              <div className="bg-brand-blue-light/50 border border-brand-gold/25 text-[10px] text-brand-gold font-bold px-2.5 py-1 rounded-md uppercase tracking-wider font-mono">
                {currentLang === 'ms' ? 'MESEJ LANGSUNG' : currentLang === 'en' ? 'ATHAR v1.2' : 'حديث مباشر'}
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div
              ref={chatContainerRef}
              className="flex-grow overflow-y-auto p-6 space-y-6 scrollbar"
            >
              {messages.map((m) => {
                const isBot = m.sender === 'bot';
                return (
                  <div
                    key={m.id}
                    className={`flex items-start gap-3 max-w-[85%] ${
                      isBot ? 'mr-auto rtl:ml-auto rtl:mr-0 text-left rtl:text-right' : 'ml-auto rtl:mr-auto rtl:ml-0 text-right rtl:text-left flex-row-reverse'
                    }`}
                  >
                    {/* Avatar Icon */}
                    <div className={`p-2 rounded-full shrink-0 ${
                      isBot ? 'bg-brand-gold/15 text-brand-gold-dark border border-brand-gold/30' : 'bg-brand-blue text-brand-gold'
                    }`}>
                      {isBot ? <Bot className="h-4.5 w-4.5" /> : <User className="h-4.5 w-4.5" />}
                    </div>

                    {/* Chat Bubble card */}
                    <div className="space-y-1 max-w-full">
                      <div className={`rounded-3xl p-4 text-xs sm:text-sm font-sans leading-relaxed whitespace-pre-line shadow-sm border ${
                        isBot
                          ? 'bg-brand-gold-light text-slate-800 border-brand-gold/15 rounded-tl-none rtl:rounded-tl-3xl rtl:rounded-tr-none'
                          : 'bg-brand-blue text-white border-transparent rounded-tr-none rtl:rounded-tr-3xl rtl:rounded-tl-none font-medium'
                      }`}>

                        {/* Quote decoration for bot */}
                        {isBot && m.id === 'msg-welcome' && (
                          <div className="relative mb-2">
                            <Quote className="h-5 w-5 text-brand-gold animate-bounce opacity-45 absolute -top-1.5 ltr:right-0 rtl:left-0" />
                          </div>
                        )}

                        <p className="leading-relaxed font-sans">{m.text}</p>

                        {/* Blinking cursor for streaming state */}
                        {m.isStreaming && (
                          <span className="inline-block h-3.5 w-1.5 bg-brand-gold ml-1 animate-pulse" />
                        )}

                      </div>

                      {/* Message Time label */}
                      <span className="text-[9px] text-slate-400 font-mono px-1 block">
                        {m.timestamp}
                      </span>
                    </div>

                  </div>
                );
              })}

              {isBotResponding && messages.length > 0 && messages[messages.length - 1].sender === 'user' && (
                <div className="flex items-start gap-3 max-w-[85%] mr-auto rtl:ml-auto rtl:mr-0 text-left rtl:text-right">
                  <div className="p-2 rounded-full shrink-0 bg-brand-gold/15 text-brand-gold-dark border border-brand-gold/30">
                    <Bot className="h-4.5 w-4.5" />
                  </div>
                  <div className="space-y-1">
                    <div className="rounded-3xl p-4 bg-brand-gold-light text-slate-800 border border-brand-gold/15 rounded-tl-none rtl:rounded-tl-3xl rtl:rounded-tr-none flex items-center gap-1.5 min-w-[65px] justify-center">
                      <span className="w-2.5 h-2.5 rounded-full bg-brand-gold animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2.5 h-2.5 rounded-full bg-brand-gold animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2.5 h-2.5 rounded-full bg-brand-gold animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                    <span className="text-[9px] text-slate-400 font-mono px-1 block">
                      {currentLang === 'en' ? "Mu'allim is preparing response..." : currentLang === 'ms' ? "Mu'allim sedang menyiapkan jawapan..." : 'يصيغ المعلم الإجابة الآن...'}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Action Form spacing */}
            <div className="p-4 bg-brand-gold-light border-t border-brand-gold/20">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-3 bg-white border border-brand-gold/25 rounded-2xl p-2 shadow-inner focus-within:border-brand-blue duration-300 transition-colors"
              >
                <input
                  type="text"
                  value={inputText}
                  disabled={isBotResponding}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={
                    currentLang === 'ms'
                      ? 'Tanya apa sahaja tentang Tajwid, Sirah, kaedah hafal...'
                      : currentLang === 'en'
                      ? 'Ask anything about Tajweed, Seerah, Hifz rules...'
                      : 'اكتب سؤالك لتفسير آية، نصائح حفظ، فقه ميسر...'
                  }
                  className="flex-grow bg-transparent border-none text-xs sm:text-sm text-slate-800 focus:outline-none p-2 px-3 font-sans"
                />

                <button
                  type="submit"
                  disabled={!inputText.trim() || isBotResponding}
                  className={`p-3 rounded-xl transition-all flex items-center justify-center shrink-0 cursor-pointer ${
                    inputText.trim() && !isBotResponding
                      ? 'bg-brand-blue text-brand-gold hover:bg-brand-gold hover:text-brand-blue shadow-md scale-105'
                      : 'bg-slate-100 text-slate-300'
                  }`}
                  title={currentLang === 'ms' ? 'Hantar Mesej' : currentLang === 'en' ? 'Send Message' : 'إرسال الرسالة'}
                >
                  {currentLang === 'en' ? <Send className="h-4 w-4" /> : <Send className="h-4 w-4 transform rotate-180" />}
                </button>
              </form>

              <div className="flex items-center justify-between text-[10px] text-slate-400 font-sans mt-2.5 px-1 select-none">
                <span>{currentLang === 'ms' ? '✦ Model AI Al-Quran Selamat berada dalam sandbox' : currentLang === 'en' ? '✦ Safe Quranic AI Model is sandboxed' : '✦ مدعوم بمرجعيات مجمع الملك فهد لطباعة المصحف'}</span>
                <span>{currentLang === 'ms' ? 'Sokongan pengoptimuman penuh 3 bahasa' : currentLang === 'en' ? 'Typing in Arabic is fully optimized' : 'يدعم الفصاحة التامة باللغتين'}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
