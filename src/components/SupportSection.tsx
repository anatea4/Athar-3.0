'use client';
import React, { useState, useEffect } from 'react';
import { Heart, Gift, Users, Award, Hand, Send, CheckCircle2, CreditCard, Copy, X, ArrowRight, ArrowLeft, Loader2, Download, Check } from 'lucide-react';
import { Language, getLangField } from '@/types';
import { VOLUNTEER_OPPORTUNITIES, ACADEMY_STATS } from '@/data';
import { motion, AnimatePresence } from 'framer-motion';
const atharLogo = '/athar-logo.png';

interface SupportSectionProps {
  currentLang: Language;
  activeSub?: string;
}

const TRANSLATIONS = {
  ar: {
    modalTitle: 'بوابة الدعم المالي الآمنة',
    circleTitle: 'كفالة حلقة قرآنية كاملة',
    studentTitle: 'كفالة طالب حفظ متميز',
    endowmentTitle: 'دعم منحة الأثر الخيرية',
    stepDetails: 'البيانات والمبلغ',
    stepPayment: 'طريقة الدفع',
    stepSuccess: 'تم بنجاح',
    fullName: 'الاسم الكامل',
    fullNamePlaceholder: 'أدخل اسمك الثلاثي',
    email: 'البريد الإلكتروني',
    emailPlaceholder: 'example@domain.com',
    phone: 'رقم الهاتف / الواتساب',
    phonePlaceholder: '+966 50 000 0000',
    currency: 'العملة',
    selectAmount: 'حدد مبلغ الكفالة / الدعم',
    customAmount: 'مبلغ مخصص',
    customAmountPlaceholder: 'أدخل مبلغاً آخر',
    next: 'المتابعة',
    back: 'الرجوع',
    cancel: 'إلغاء',
    choosePaymentMethod: 'اختر طريقة الدفع المفضلة',
    creditCard: 'بطاقة ائتمانية / مدى',
    bankTransfer: 'تحويل بنكي مباشر',
    cardNumber: 'رقم البطاقة',
    expiryDate: 'تاريخ الانتهاء',
    cvv: 'رمز التحقق (CVV)',
    cardHolder: 'اسم حامل البطاقة',
    cardHolderPlaceholder: 'الاسم كما هو مكتوب على البطاقة',
    bankName: 'البنك:',
    bankMaybank: 'بنك مايبانك (ماليزيا)',
    accountNumber: 'رقم الحساب:',
    accountName: 'اسم الحساب:',
    copyAccount: 'نسخ رقم الحساب',
    copied: 'تم النسخ!',
    confirmPayment: 'تأكيد عملية الدفع',
    processing: 'جاري معالجة عملية الدفع بأمان...',
    successTitle: 'شكر الله لكم كفالتكم وصنيعكم!',
    successDesc: 'تم استلام مبلغ الدعم بنجاح. نسأل الله أن يتقبل منكم ويجعلها في ميزان حسناتكم.',
    downloadReceipt: 'تحميل إيصال الدفع',
    close: 'إغلاق البوابة',
    receiptFileName: 'إيصال_كفالة_أكاديمية_أثر.txt',
    receiptHeader: 'إيصال دفع رسمي - أكاديمية أثر للقرآن الكريم',
    receiptDonationType: 'نوع المساهمة: ',
    receiptAmount: 'المبلغ: ',
    receiptDonorName: 'اسم المتبرع: ',
    receiptEmail: 'البريد الإلكتروني: ',
    receiptPhone: 'رقم الهاتف: ',
    receiptDate: 'التاريخ: ',
    receiptTxnId: 'رقم العملية: ',
    receiptStatus: 'الحالة: تم الدفع والتحويل بنجاح',
    receiptThankYou: 'شكراً لكم لدعمكم مسيرة تحفيظ كتاب الله الكريم.',
    preset: 'مبلغ محدد',
  },
  en: {
    modalTitle: 'Secure Sponsorship Portal',
    circleTitle: 'Sponsor a Full Quran Circle',
    studentTitle: 'Sponsor a Dedicated Student',
    endowmentTitle: 'Athar Benevolence Endowment',
    stepDetails: 'Details & Amount',
    stepPayment: 'Payment Method',
    stepSuccess: 'Success',
    fullName: 'Full Name',
    fullNamePlaceholder: 'Enter your full name',
    email: 'Email Address',
    emailPlaceholder: 'example@domain.com',
    phone: 'Phone / WhatsApp',
    phonePlaceholder: '+60 12-345 6789',
    currency: 'Currency',
    selectAmount: 'Select Sponsorship / Support Amount',
    customAmount: 'Custom Amount',
    customAmountPlaceholder: 'Enter custom amount',
    next: 'Continue',
    back: 'Back',
    cancel: 'Cancel',
    choosePaymentMethod: 'Choose Payment Method',
    creditCard: 'Credit / Debit Card',
    bankTransfer: 'Direct Bank Transfer',
    cardNumber: 'Card Number',
    expiryDate: 'Expiry Date',
    cvv: 'CVV',
    cardHolder: 'Cardholder Name',
    cardHolderPlaceholder: 'Name as on card',
    bankName: 'Bank:',
    bankMaybank: 'Maybank (Malaysia)',
    accountNumber: 'Account Number:',
    accountName: 'Account Name:',
    copyAccount: 'Copy Account Number',
    copied: 'Copied!',
    confirmPayment: 'Confirm Payment',
    processing: 'Processing payment securely...',
    successTitle: 'Thank You for Your Generous Support!',
    successDesc: 'Your payment was received successfully. May Allah reward you and place it in your scale of good deeds.',
    downloadReceipt: 'Download Payment Receipt',
    close: 'Close Portal',
    receiptFileName: 'Athar_Academy_Sponsorship_Receipt.txt',
    receiptHeader: 'Official Payment Receipt - Athar Academy for the Holy Quran',
    receiptDonationType: 'Sponsorship Type: ',
    receiptAmount: 'Amount: ',
    receiptDonorName: 'Donor Name: ',
    receiptEmail: 'Email Address: ',
    receiptPhone: 'Phone Number: ',
    receiptDate: 'Date: ',
    receiptTxnId: 'Transaction ID: ',
    receiptStatus: 'Status: Paid successfully',
    receiptThankYou: 'Thank you for supporting the memorization of the Holy Quran.',
    preset: 'Preset Amount',
  },
  ms: {
    modalTitle: 'Portal Penajaan Selamat',
    circleTitle: 'Taja Halaqah Al-Quran Penuh',
    studentTitle: 'Taja Pelajar Al-Quran Komited',
    endowmentTitle: 'Wakaf Kebajikan Athar',
    stepDetails: 'Butiran & Amaun',
    stepPayment: 'Kaedah Pembayaran',
    stepSuccess: 'Berjaya',
    fullName: 'Nama Penuh',
    fullNamePlaceholder: 'Masukkan nama penuh anda',
    email: 'Alamat E-mel',
    emailPlaceholder: 'contoh@domain.com',
    phone: 'No. Telefon / WhatsApp',
    phonePlaceholder: '+60 12-345 6789',
    currency: 'Mata Wang',
    selectAmount: 'Pilih Amaun Penajaan / Sumbangan',
    customAmount: 'Amaun Tersuai',
    customAmountPlaceholder: 'Masukkan amaun tersuai',
    next: 'Seterusnya',
    back: 'Kembali',
    cancel: 'Batal',
    choosePaymentMethod: 'Pilih Kaedah Pembayaran',
    creditCard: 'Kad Kredit / Debit',
    bankTransfer: 'Pindahan Bank Langsung',
    cardNumber: 'Nombor Kad',
    expiryDate: 'Tarikh Tamat',
    cvv: 'CVV',
    cardHolder: 'Nama Pemegang Kad',
    cardHolderPlaceholder: 'Nama seperti pada kad',
    bankName: 'Bank:',
    bankMaybank: 'Maybank (Malaysia)',
    accountNumber: 'Nombor Akaun:',
    accountName: 'Nama Akaun:',
    copyAccount: 'Salin Nombor Akaun',
    copied: 'Disalin!',
    confirmPayment: 'Sahkan Pembayaran',
    processing: 'Memproses pembayaran dengan selamat...',
    successTitle: 'Terima Kasih atas Sumbangan Murah Hati Anda!',
    successDesc: 'Pembayaran anda telah berjaya diterima. Semoga Allah membalas kebaikan anda dan menjadikannya timbangan amal soleh.',
    downloadReceipt: 'Muat Turun Resit Pembayaran',
    close: 'Tutup Portal',
    receiptFileName: 'Resit_Penajaan_Akademi_Athar.txt',
    receiptHeader: 'Resit Pembayaran Rasmi - Akademi Athar Al-Quran',
    receiptDonationType: 'Jenis Penajaan: ',
    receiptAmount: 'Amaun: ',
    receiptDonorName: 'Nama Penderma: ',
    receiptEmail: 'E-mel: ',
    receiptPhone: 'No. Telefon: ',
    receiptDate: 'Tarikh: ',
    receiptTxnId: 'ID Transaksi: ',
    receiptStatus: 'Status: Pembayaran berjaya',
    receiptThankYou: 'Terima kasih kerana menyokong usaha hafazan Al-Quran.',
    preset: 'Amaun Pilihan',
  }
};

const getPresets = (type: 'circle' | 'student' | 'endowment', curr: 'USD' | 'MYR' | 'SAR') => {
  const data = {
    circle: {
      USD: [150, 300, 500],
      MYR: [600, 1200, 2000],
      SAR: [550, 1100, 1800],
    },
    student: {
      USD: [20, 40, 80],
      MYR: [80, 160, 320],
      SAR: [75, 150, 300],
    },
    endowment: {
      USD: [10, 25, 50, 100],
      MYR: [40, 100, 200, 400],
      SAR: [35, 90, 180, 375],
    }
  };
  return data[type][curr];
};

export default function SupportSection({ currentLang, activeSub }: SupportSectionProps) {
  const [activeTab, setActiveTab] = useState('support-athar');
  const [volunteerName, setVolunteerName] = useState('');
  const [volunteerPhone, setVolunteerPhone] = useState('');
  const [selectedRole, setSelectedRole] = useState(VOLUNTEER_OPPORTUNITIES[0].id);
  const [submitted, setSubmitted] = useState(false);

  // Sponsoring Payment Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sponsorshipType, setSponsorshipType] = useState<'circle' | 'student' | 'endowment'>('circle');
  const [currency, setCurrency] = useState<'USD' | 'MYR' | 'SAR'>('USD');
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  const [isCustomAmount, setIsCustomAmount] = useState(false);
  const [customAmount, setCustomAmount] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentStep, setPaymentStep] = useState<'details' | 'payment' | 'processing' | 'success'>('details');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank'>('card');

  // Credit Card Form States
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');

  // Auxiliary States
  const [copied, setCopied] = useState(false);
  const [txnId, setTxnId] = useState('');

  useEffect(() => {
    if (activeSub) {
      if (activeSub === 'volunteer') setActiveTab('volunteer');
      else if (activeSub === 'support-athar') setActiveTab('support-athar');
    }
  }, [activeSub]);

  // Set default currency based on language
  useEffect(() => {
    if (currentLang === 'ms') {
      setCurrency('MYR');
    } else if (currentLang === 'ar') {
      setCurrency('SAR');
    } else {
      setCurrency('USD');
    }
  }, [currentLang]);

  // Reset preset selection when type or currency changes
  const presets = getPresets(sponsorshipType, currency);
  useEffect(() => {
    if (!isCustomAmount && presets.length > 0) {
      setSelectedPreset(presets[0]);
    }
  }, [sponsorshipType, currency, isCustomAmount]);

  const tabs = [
    { id: 'support-athar', labelAr: 'ادعم الأثر والكفالات', labelEn: 'Sponsor & Support', labelMs: 'Taja & Sokong' },
    { id: 'volunteer', labelAr: 'فرص التطوع بالأكاديمية', labelEn: 'Volunteering Opportunities', labelMs: 'Peluang Sukarelawan' },
  ];

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!volunteerName || !volunteerPhone) return;

    // Simulate submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setVolunteerName('');
      setVolunteerPhone('');
    }, 5000);
  };

  const handleSponsorClick = (type: 'circle' | 'student' | 'endowment') => {
    setSponsorshipType(type);
    setIsModalOpen(true);
    setPaymentStep('details');
    setFullName('');
    setEmail('');
    setPhoneNumber('');
    setCustomAmount('');
    setIsCustomAmount(false);
    setCardNumber('');
    setCardExpiry('');
    setCardCvv('');
    setCardHolderName('');
    setPaymentMethod('card');
    setCopied(false);
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phoneNumber) return;
    if (isCustomAmount && (!customAmount || parseFloat(customAmount) <= 0)) return;
    setPaymentStep('payment');
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 16);
    // Format card number with spaces every 4 digits
    const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
    setCardNumber(formatted);
  };

  const handleCardExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    const formatted = value.length >= 3 ? `${value.slice(0, 2)}/${value.slice(2)}` : value;
    setCardExpiry(formatted);
  };

  const handleCardCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setCardCvv(value);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText('564801608601');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const triggerPaymentProcessing = () => {
    setPaymentStep('processing');

    // Generate transaction ID
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomTxn = 'ATHR-';
    for (let i = 0; i < 8; i++) {
      randomTxn += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setTxnId(randomTxn);

    // Simulate network delay
    setTimeout(() => {
      setPaymentStep('success');
    }, 1800);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod === 'card') {
      const strippedCard = cardNumber.replace(/\s/g, '');
      if (strippedCard.length < 15 || cardExpiry.length < 5 || cardCvv.length < 3 || !cardHolderName) {
        return;
      }
    }
    triggerPaymentProcessing();
  };

  const downloadReceipt = () => {
    const t = TRANSLATIONS[currentLang];
    const finalAmount = isCustomAmount ? customAmount : selectedPreset;
    const symbol = currency === 'USD' ? '$' : currency === 'MYR' ? 'RM' : 'SAR ';

    const content = `${t.receiptHeader}
==================================================
${t.receiptDate}${new Date().toLocaleString()}
${t.receiptTxnId}${txnId}
--------------------------------------------------
${t.receiptDonationType}${t[`${sponsorshipType}Title`]}
${t.receiptAmount}${symbol}${finalAmount}
${t.receiptDonorName}${fullName}
${t.receiptEmail}${email}
${t.receiptPhone}${phoneNumber}
--------------------------------------------------
${t.receiptStatus}
==================================================
${t.receiptThankYou}
`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = t.receiptFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="relative bg-brand-sand py-16 overflow-hidden min-h-[70vh]">
      <div className="absolute inset-0 islamic-pattern opacity-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest font-bold text-brand-gold">
            {currentLang === 'ms' ? 'Sokongan & Sumbangan' : currentLang === 'en' ? 'Support and Giving' : 'التطوع والدعم المالي'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-blue-dark mt-2">
            {currentLang === 'ms' ? 'Taja Halaqah Al-Quran & Sokong Kami' : currentLang === 'en' ? 'Sponsor Quran Circles & Support Us' : 'ادعم الأثر وشارك في الأجر'}
          </h2>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center gap-2 mb-10 overflow-x-auto pb-4 scrollbar-none w-full">
          {tabs.map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-3 rounded-full text-xs sm:text-sm font-bold border transition-all duration-300 w-max shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-brand-blue-dark border-brand-gold text-brand-gold shadow-md'
                    : 'bg-white border-brand-gold/10 text-slate-600 hover:border-brand-gold/30 hover:text-brand-blue-dark'
                }`}
              >
                {currentLang === 'ms' ? tab.labelMs : currentLang === 'en' ? tab.labelEn : tab.labelAr}
              </button>
            );
          })}
        </div>

        {/* Content Box */}
        <div className="bg-white border border-brand-gold/15 rounded-3xl p-6 sm:p-10 shadow-sm min-h-[400px]">

          {/* SUPPORT ATHAR */}
          {activeTab === 'support-athar' && (
            <div className="space-y-8 animate-in fade-in duration-500 text-right rtl:text-right ltr:text-left">

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-brand-gold/15 pb-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-brand-blue-dark flex items-center gap-2">
                    <Gift className="h-6 w-6 text-brand-gold" />
                    <span>{currentLang === 'ms' ? 'Program Penajaan Halaqah' : currentLang === 'en' ? 'Circle Sponsoring Program' : 'برنامج كفالة ورعاية الحلقات القرآنية'}</span>
                  </h3>
                  <p className="text-slate-500 font-sans text-xs sm:text-sm mt-1">
                    {currentLang === 'ms'
                      ? 'Daripada 26 jumlah halaqah Al-Quran, 5 telah ditaja dan 21 halaqah sedang menunggu sokongan dana.'
                      : currentLang === 'en'
                      ? 'Out of 26 total Quran circles, 5 are sponsored and 21 circles are waiting for endowment support.'
                      : 'من أصل 26 حلقة تحفيظ نشطة، توجد 5 حلقات مكفولة فقط و 21 حلقة بانتظار كفالتكم المباركة.'}
                  </p>
                </div>

                {/* Stats Pills */}
                <div className="flex gap-2.5 font-sans font-bold text-xs">
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3.5 py-1.5 rounded-full shrink-0">
                    {currentLang === 'ms' ? `${ACADEMY_STATS.sponsoredCircles} Ditaja` : currentLang === 'en' ? `${ACADEMY_STATS.sponsoredCircles} Sponsored` : `${ACADEMY_STATS.sponsoredCircles} مكفولة بالكامل`}
                  </span>
                  <span className="bg-amber-50 text-amber-700 border border-amber-200 px-3.5 py-1.5 rounded-full shrink-0 animate-pulse">
                    {currentLang === 'ms' ? `${ACADEMY_STATS.unsponsoredCircles} Menunggu Penajaan` : currentLang === 'en' ? `${ACADEMY_STATS.unsponsoredCircles} Awaiting Sponsorship` : `${ACADEMY_STATS.unsponsoredCircles} بانتظار الكفالة`}
                  </span>
                </div>
              </div>

              {/* Sponsoring options */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                {/* Option 1 */}
                <div className="bg-white border-2 border-brand-gold/15 hover:border-brand-gold rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-brand-gold/5 rounded-full blur-xl pointer-events-none" />
                  <div className="space-y-4">
                    <div className="p-3 bg-brand-gold/10 text-brand-gold-dark rounded-xl w-12">
                      <Users className="h-6 w-6" />
                    </div>
                    <h4 className="text-base font-bold text-brand-blue-dark">
                      {currentLang === 'ms' ? 'Taja Halaqah Al-Quran' : currentLang === 'en' ? 'Sponsor a Quran Circle' : 'كفالة حلقة قرآنية كاملة'}
                    </h4>
                    <p className="text-xs text-slate-500 font-sans leading-relaxed">
                      {currentLang === 'ms'
                        ? 'Menampung elaun bulanan syeikh/guru dan bahan pendidikan untuk sekumpulan 10 pelajar.'
                        : currentLang === 'en'
                        ? 'Cover the monthly stipend of the sheikh/teacher and educational materials for a group of 10 students.'
                        : 'تغطية المكافأة الشهرية المقررة لشيخ الحلقة والمستلزمات التعليمية والمتابعة لـ 10 طلاب.'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleSponsorClick('circle')}
                    className="mt-6 w-full text-center bg-brand-blue hover:bg-brand-gold hover:text-brand-blue-dark text-white font-bold py-2.5 rounded-xl text-xs shadow-md transition-all duration-300 cursor-pointer"
                  >
                    {currentLang === 'ms' ? 'Taja Halaqah Sekarang' : currentLang === 'en' ? 'Sponsor Circle Now' : 'اكفل حلقة الآن'}
                  </button>
                </div>

                {/* Option 2 */}
                <div className="bg-white border-2 border-brand-gold/15 hover:border-brand-gold rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-brand-gold/5 rounded-full blur-xl pointer-events-none" />
                  <div className="space-y-4">
                    <div className="p-3 bg-brand-gold/10 text-brand-gold-dark rounded-xl w-12">
                      <Hand className="h-6 w-6" />
                    </div>
                    <h4 className="text-base font-bold text-brand-blue-dark">
                      {currentLang === 'ms' ? 'Taja Pelajar Al-Quran' : currentLang === 'en' ? 'Sponsor a Quran Student' : 'كفالة طالب حفظ متميز'}
                    </h4>
                    <p className="text-xs text-slate-500 font-sans leading-relaxed">
                      {currentLang === 'ms'
                        ? 'Menyokong pelajar komited yang menghadapi masalah kewangan dengan membiayai yuran bulanan akademi mereka.'
                        : currentLang === 'en'
                        ? 'Support a dedicated student facing financial hardship by covering their monthly academy fees.'
                        : 'كفالة طالب أو طالبة من ذوي العسرة المادية وتوفير تكاليف حلقاتهم ليواصلوا الحفظ دون انقطاع.'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleSponsorClick('student')}
                    className="mt-6 w-full text-center bg-brand-blue hover:bg-brand-gold hover:text-brand-blue-dark text-white font-bold py-2.5 rounded-xl text-xs shadow-md transition-all duration-300 cursor-pointer"
                  >
                    {currentLang === 'ms' ? 'Taja Pelajar Sekarang' : currentLang === 'en' ? 'Sponsor Student' : 'اكفل طالباً الآن'}
                  </button>
                </div>

                {/* Option 3 */}
                <div className="bg-white border-2 border-[#C09E5B] rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between shadow-sm relative overflow-hidden bg-gradient-to-tr from-brand-gold/5 via-white to-white">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-brand-gold/10 rounded-full blur-xl pointer-events-none" />
                  <div className="space-y-4">
                    <div className="p-3 bg-brand-gold/20 text-brand-gold-dark rounded-xl w-12">
                      <Award className="h-6 w-6" />
                    </div>
                    <h4 className="text-base font-bold text-brand-blue-dark">
                      {currentLang === 'ms' ? 'Wakaf Kebajikan Athar' : currentLang === 'en' ? 'Athar Benevolence Endowment' : 'دعم منحة الأثر الخيرية'}
                    </h4>
                    <p className="text-xs text-slate-500 font-sans leading-relaxed">
                      {currentLang === 'ms'
                        ? 'Menyumbang sebarang amaun am untuk menyokong geran biasiswa kebajikan dan kem pendidikan tahunan.'
                        : currentLang === 'en'
                        ? 'Contribute any general amount to support the charity scholarship grants and yearly educational camps.'
                        : 'المساهمة العامة بأي مبلغ لدعم الصندوق الخيري المخصص لتمويل المنح الدراسية والمخيمات التربوية.'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleSponsorClick('endowment')}
                    className="mt-6 w-full text-center bg-gradient-to-r from-brand-gold to-brand-gold-dark text-brand-blue-dark hover:from-brand-gold-light hover:to-brand-gold font-bold py-2.5 rounded-xl text-xs shadow-md transition-all duration-300 cursor-pointer"
                  >
                    {currentLang === 'ms' ? 'Sumbang Sekarang' : currentLang === 'en' ? 'Contribute' : 'سهم الصدقة الجارية'}
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* VOLUNTEER SYSTEM */}
          {activeTab === 'volunteer' && (
            <div className="space-y-6 animate-in fade-in duration-500 text-right rtl:text-right ltr:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-brand-blue-dark flex items-center gap-2 border-b border-brand-gold/15 pb-4">
                <Hand className="h-6 w-6 text-brand-gold" />
                <span>{currentLang === 'ms' ? 'Sertai sebagai Sukarelawan Aktif' : currentLang === 'en' ? 'Join as an Active Volunteer' : 'التطوع التعليمي والإداري في الأثر'}</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-2">

                {/* Form */}
                <div className="md:col-span-6 bg-brand-sand/30 border border-brand-gold/15 p-6 rounded-3xl">
                  {submitted ? (
                    <div className="text-center py-12 space-y-3 animate-in zoom-in duration-300">
                      <div className="p-3 bg-emerald-100 text-emerald-600 rounded-full inline-block mx-auto">
                        <CheckCircle2 className="h-8 w-8" />
                      </div>
                      <h4 className="text-base font-bold text-brand-blue-dark">
                        {currentLang === 'ms' ? 'Permohonan Berjaya Diterima!' : currentLang === 'en' ? 'Application Received Successfully!' : 'تم استلام طلب التطوع بنجاح!'}
                      </h4>
                      <p className="text-xs text-slate-500 font-sans">
                        {currentLang === 'ms' ? 'Penyelaras pentadbiran kami akan menyemak dan menghubungi anda tidak lama lagi.' : currentLang === 'en' ? 'Our administrative coordinators will review and call you shortly.' : 'سيتواصل معك منسق العمل الإداري والتطوعي لمناقشة التفاصيل.'}
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleVolunteerSubmit} className="space-y-4 text-xs sm:text-sm font-sans">
                      <div className="flex flex-col space-y-1">
                        <label className="font-bold text-slate-700">{currentLang === 'ms' ? 'Nama Penuh' : currentLang === 'en' ? 'Full Name' : 'الاسم الكامـل'}</label>
                        <input
                          type="text"
                          value={volunteerName}
                          onChange={(e) => setVolunteerName(e.target.value)}
                          placeholder={currentLang === 'ms' ? 'cth. Abdullah Ahmad' : currentLang === 'en' ? 'e.g. Abdullah Ahmad' : 'مثال: عبد الله أحمد'}
                          className="border border-brand-gold/20 focus:border-brand-gold outline-none p-3 rounded-xl bg-white text-slate-800"
                          required
                        />
                      </div>

                      <div className="flex flex-col space-y-1">
                        <label className="font-bold text-slate-700">{currentLang === 'ms' ? 'No. Telefon / WhatsApp' : currentLang === 'en' ? 'Phone / WhatsApp' : 'رقم الهاتف / الواتساب'}</label>
                        <input
                          type="text"
                          value={volunteerPhone}
                          onChange={(e) => setVolunteerPhone(e.target.value)}
                          placeholder="e.g. 0147086011"
                          className="border border-brand-gold/20 focus:border-brand-gold outline-none p-3 rounded-xl bg-white text-slate-800 text-left rtl:text-right"
                          required
                        />
                      </div>

                      <div className="flex flex-col space-y-1">
                        <label className="font-bold text-slate-700">{currentLang === 'ms' ? 'Pilih Peranan Sukarelawan' : currentLang === 'en' ? 'Select Volunteer Role' : 'حدد المسار التطوعي:'}</label>
                        <select
                          value={selectedRole}
                          onChange={(e) => setSelectedRole(e.target.value)}
                          className="border border-brand-gold/20 focus:border-brand-gold outline-none p-3 rounded-xl bg-white text-slate-800 font-semibold"
                        >
                          {VOLUNTEER_OPPORTUNITIES.map((role) => (
                            <option key={role.id} value={role.id}>
                              {getLangField(role, 'title', currentLang)}
                            </option>
                          ))}
                        </select>
                      </div>

                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 bg-brand-blue hover:bg-brand-gold hover:text-brand-blue-dark text-white font-bold py-3.5 rounded-xl shadow-md transition-colors cursor-pointer"
                      >
                        <Send className="h-4 w-4" />
                        <span>{currentLang === 'ms' ? 'Hantar Permohonan Sukarelawan' : currentLang === 'en' ? 'Submit Volunteer Application' : 'إرسال طلب الانضمام'}</span>
                      </button>
                    </form>
                  )}
                </div>

                {/* Roles Description */}
                <div className="md:col-span-6 space-y-4 text-right rtl:text-right ltr:text-left">
                  <h4 className="text-base font-bold text-brand-blue-dark">{currentLang === 'ms' ? 'Laluan Sukarelawan yang Tersedia' : currentLang === 'en' ? 'Available Volunteer Paths' : 'مسارات العطاء التطوعي المتاحة'}</h4>
                  <div className="space-y-4">
                    {VOLUNTEER_OPPORTUNITIES.map((role) => (
                      <div key={role.id} className="p-4 bg-brand-gold/5 border border-brand-gold/15 rounded-2xl">
                        <h5 className="text-sm font-bold text-brand-blue">
                          {getLangField(role, 'title', currentLang)}
                        </h5>
                        <p className="text-xs text-slate-500 font-sans mt-1 leading-relaxed">
                          {getLangField(role, 'desc', currentLang)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

      </div>

      {/* SECURE DIRECT SPONSORSHIP PORTAL MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-blue-dark/70 backdrop-blur-md overflow-y-auto select-none"
            onClick={() => {
              if (paymentStep !== 'processing') {
                setIsModalOpen(false);
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="bg-white border border-brand-gold/25 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative flex flex-col font-sans text-right rtl:text-right ltr:text-left my-8"
              onClick={(e) => e.stopPropagation()}
            >

              {/* Header Close button */}
              {paymentStep !== 'processing' && (
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 rtl:left-4 ltr:right-4 p-2 text-slate-400 hover:text-brand-blue-dark hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              )}

              {/* Logo & Category Headers */}
              <div className="flex flex-col items-center pt-6 pb-2 border-b border-brand-gold/10 bg-brand-sand/20">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white border border-brand-gold/15 shadow-sm p-1.5 mb-2 overflow-hidden">
                  <img src={atharLogo} alt="Athar Logo" className="h-full w-auto object-contain" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-brand-blue-dark">
                  {TRANSLATIONS[currentLang].modalTitle}
                </h3>
                <span className="text-[10px] sm:text-xs text-brand-gold-dark font-bold uppercase tracking-wider mt-1 bg-brand-gold/10 px-3 py-0.5 rounded-full">
                  {TRANSLATIONS[currentLang][`${sponsorshipType}Title`]}
                </span>
              </div>

              {/* Step Progress Tracker */}
              <div className="px-6 py-4 flex items-center justify-center border-b border-brand-gold/5 text-[10px] sm:text-xs font-bold text-slate-400 bg-slate-50/50">
                <div className="flex items-center gap-1.5">
                  <span className={`h-5 w-5 rounded-full flex items-center justify-center text-[9px] ${paymentStep === 'details' ? 'bg-brand-blue-dark text-brand-gold' : 'bg-emerald-100 text-emerald-700'}`}>
                    {paymentStep === 'details' ? '1' : <Check className="h-3 w-3" />}
                  </span>
                  <span className={paymentStep === 'details' ? 'text-brand-blue-dark' : 'text-emerald-700'}>
                    {TRANSLATIONS[currentLang].stepDetails}
                  </span>
                </div>

                <div className="h-px w-8 bg-slate-300 mx-2 sm:mx-4" />

                <div className="flex items-center gap-1.5">
                  <span className={`h-5 w-5 rounded-full flex items-center justify-center text-[9px] ${paymentStep === 'payment' ? 'bg-brand-blue-dark text-brand-gold' : paymentStep === 'success' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'}`}>
                    {paymentStep === 'payment' || paymentStep === 'processing' ? '2' : paymentStep === 'success' ? <Check className="h-3 w-3" /> : '2'}
                  </span>
                  <span className={paymentStep === 'payment' || paymentStep === 'processing' ? 'text-brand-blue-dark' : paymentStep === 'success' ? 'text-emerald-700' : ''}>
                    {TRANSLATIONS[currentLang].stepPayment}
                  </span>
                </div>

                <div className="h-px w-8 bg-slate-300 mx-2 sm:mx-4" />

                <div className="flex items-center gap-1.5">
                  <span className={`h-5 w-5 rounded-full flex items-center justify-center text-[9px] ${paymentStep === 'success' ? 'bg-emerald-600 text-white animate-bounce' : 'bg-slate-200 text-slate-500'}`}>
                    3
                  </span>
                  <span className={paymentStep === 'success' ? 'text-emerald-700' : ''}>
                    {TRANSLATIONS[currentLang].stepSuccess}
                  </span>
                </div>
              </div>

              {/* Scrollable Form Content */}
              <div className="p-6 overflow-y-auto max-h-[50vh] text-xs sm:text-sm text-slate-700 font-sans">

                {/* STEP 1: DETAILS */}
                {paymentStep === 'details' && (
                  <form onSubmit={handleDetailsSubmit} className="space-y-4">
                    {/* Currency selection tabs */}
                    <div className="flex flex-col space-y-1.5">
                      <label className="font-bold text-slate-700">{TRANSLATIONS[currentLang].currency}</label>
                      <div className="grid grid-cols-3 gap-2 border border-slate-200 rounded-xl p-1 bg-slate-50">
                        {(['USD', 'MYR', 'SAR'] as const).map((curr) => (
                          <button
                            key={curr}
                            type="button"
                            onClick={() => {
                              setCurrency(curr);
                              setIsCustomAmount(false);
                            }}
                            className={`py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all ${currency === curr ? 'bg-brand-blue-dark text-brand-gold shadow-sm' : 'text-slate-500 hover:text-brand-blue-dark'}`}
                          >
                            {curr}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Presets grid */}
                    <div className="flex flex-col space-y-2">
                      <label className="font-bold text-slate-700">{TRANSLATIONS[currentLang].selectAmount}</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {presets.map((preset) => {
                          const isSelected = !isCustomAmount && selectedPreset === preset;
                          return (
                            <button
                              key={preset}
                              type="button"
                              onClick={() => {
                                setSelectedPreset(preset);
                                setIsCustomAmount(false);
                              }}
                              className={`py-3 px-2 border rounded-xl text-center font-bold text-xs cursor-pointer transition-all duration-200 ${
                                isSelected
                                  ? 'bg-brand-gold/15 border-brand-gold text-brand-gold-dark ring-2 ring-brand-gold/30'
                                  : 'bg-white border-slate-200 hover:border-brand-gold/50 text-slate-600'
                              }`}
                            >
                              {currency === 'USD' ? `$${preset}` : currency === 'MYR' ? `RM ${preset}` : `${preset} SAR`}
                            </button>
                          );
                        })}
                        {/* Custom amount toggle */}
                        <button
                          type="button"
                          onClick={() => setIsCustomAmount(true)}
                          className={`py-3 px-2 border rounded-xl text-center font-bold text-xs col-span-2 sm:col-span-4 cursor-pointer transition-all duration-200 ${
                            isCustomAmount
                              ? 'bg-brand-gold/15 border-brand-gold text-brand-gold-dark ring-2 ring-brand-gold/30'
                              : 'bg-white border-slate-200 hover:border-brand-gold/50 text-slate-600'
                          }`}
                        >
                          {TRANSLATIONS[currentLang].customAmount}
                        </button>
                      </div>
                    </div>

                    {/* Custom amount input field */}
                    {isCustomAmount && (
                      <div className="flex flex-col space-y-1.5 animate-in slide-in-from-top-3 duration-200">
                        <label className="font-bold text-slate-700">{TRANSLATIONS[currentLang].customAmountPlaceholder}</label>
                        <div className="relative flex items-center">
                          <span className="absolute left-3 font-bold text-slate-400">
                            {currency === 'USD' ? '$' : currency === 'MYR' ? 'RM' : 'SAR'}
                          </span>
                          <input
                            type="number"
                            value={customAmount}
                            onChange={(e) => setCustomAmount(e.target.value)}
                            placeholder="100"
                            min="1"
                            className="w-full border border-brand-gold/20 focus:border-brand-gold outline-none p-3 pl-10 rounded-xl bg-white text-slate-800 font-bold"
                            required={isCustomAmount}
                          />
                        </div>
                      </div>
                    )}

                    {/* Personal details */}
                    <div className="border-t border-slate-100 pt-4 space-y-3">
                      <div className="flex flex-col space-y-1">
                        <label className="font-bold text-slate-700">{TRANSLATIONS[currentLang].fullName}</label>
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder={TRANSLATIONS[currentLang].fullNamePlaceholder}
                          className="border border-brand-gold/20 focus:border-brand-gold outline-none p-3 rounded-xl bg-white text-slate-800 font-medium"
                          required
                        />
                      </div>

                      <div className="flex flex-col space-y-1">
                        <label className="font-bold text-slate-700">{TRANSLATIONS[currentLang].email}</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={TRANSLATIONS[currentLang].emailPlaceholder}
                          className="border border-brand-gold/20 focus:border-brand-gold outline-none p-3 rounded-xl bg-white text-slate-800 font-medium"
                          required
                        />
                      </div>

                      <div className="flex flex-col space-y-1">
                        <label className="font-bold text-slate-700">{TRANSLATIONS[currentLang].phone}</label>
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder={TRANSLATIONS[currentLang].phonePlaceholder}
                          className="border border-brand-gold/20 focus:border-brand-gold outline-none p-3 rounded-xl bg-white text-slate-800 font-medium"
                          required
                        />
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4 border-t border-slate-100">
                      <button
                        type="submit"
                        className="flex-grow flex items-center justify-center gap-2 bg-brand-blue hover:bg-brand-gold hover:text-brand-blue-dark text-white font-bold py-3.5 rounded-xl shadow-md transition-colors cursor-pointer"
                      >
                        <span>{TRANSLATIONS[currentLang].next}</span>
                        {currentLang === 'ar' ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="px-5 py-3.5 border border-slate-200 hover:border-slate-300 text-slate-500 rounded-xl transition-all cursor-pointer font-bold"
                      >
                        {TRANSLATIONS[currentLang].cancel}
                      </button>
                    </div>
                  </form>
                )}

                {/* STEP 2: PAYMENT METHOD Selection & Form */}
                {paymentStep === 'payment' && (
                  <form onSubmit={handlePaymentSubmit} className="space-y-5">

                    <div className="flex flex-col space-y-1.5">
                      <label className="font-bold text-slate-700">{TRANSLATIONS[currentLang].choosePaymentMethod}</label>
                      <div className="grid grid-cols-2 gap-2 border border-slate-200 rounded-xl p-1 bg-slate-50">
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('card')}
                          className={`py-2 text-xs font-bold rounded-lg cursor-pointer transition-all flex items-center justify-center gap-1.5 ${paymentMethod === 'card' ? 'bg-brand-blue-dark text-brand-gold shadow-sm' : 'text-slate-500 hover:text-brand-blue-dark'}`}
                        >
                          <CreditCard className="h-3.5 w-3.5" />
                          <span>{TRANSLATIONS[currentLang].creditCard}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('bank')}
                          className={`py-2 text-xs font-bold rounded-lg cursor-pointer transition-all flex items-center justify-center gap-1.5 ${paymentMethod === 'bank' ? 'bg-brand-blue-dark text-brand-gold shadow-sm' : 'text-slate-500 hover:text-brand-blue-dark'}`}
                        >
                          <Award className="h-3.5 w-3.5" />
                          <span>{TRANSLATIONS[currentLang].bankTransfer}</span>
                        </button>
                      </div>
                    </div>

                    {/* CREDIT CARD INPUTS */}
                    {paymentMethod === 'card' && (
                      <div className="space-y-3.5 animate-in fade-in duration-200">
                        <div className="flex flex-col space-y-1">
                          <label className="font-bold text-slate-700 text-xs">{TRANSLATIONS[currentLang].cardHolder}</label>
                          <input
                            type="text"
                            value={cardHolderName}
                            onChange={(e) => setCardHolderName(e.target.value)}
                            placeholder={TRANSLATIONS[currentLang].cardHolderPlaceholder}
                            className="border border-slate-200 focus:border-brand-gold outline-none p-3 rounded-xl bg-white text-slate-800 text-xs font-semibold"
                            required
                          />
                        </div>

                        <div className="flex flex-col space-y-1">
                          <label className="font-bold text-slate-700 text-xs">{TRANSLATIONS[currentLang].cardNumber}</label>
                          <div className="relative">
                            <input
                              type="text"
                              value={cardNumber}
                              onChange={handleCardNumberChange}
                              placeholder="0000 0000 0000 0000"
                              className="w-full border border-slate-200 focus:border-brand-gold outline-none p-3 pr-10 rounded-xl bg-white text-slate-800 font-mono tracking-widest text-xs"
                              required
                            />
                            <CreditCard className="absolute right-3 top-3.5 h-4.5 w-4.5 text-slate-400" />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="flex flex-col space-y-1">
                            <label className="font-bold text-slate-700 text-xs">{TRANSLATIONS[currentLang].expiryDate}</label>
                            <input
                              type="text"
                              value={cardExpiry}
                              onChange={handleCardExpiryChange}
                              placeholder="MM/YY"
                              className="border border-slate-200 focus:border-brand-gold outline-none p-3 rounded-xl bg-white text-slate-800 text-center font-mono text-xs"
                              required
                            />
                          </div>

                          <div className="flex flex-col space-y-1">
                            <label className="font-bold text-slate-700 text-xs">{TRANSLATIONS[currentLang].cvv}</label>
                            <input
                              type="password"
                              value={cardCvv}
                              onChange={handleCardCvvChange}
                              placeholder="123"
                              className="border border-slate-200 focus:border-brand-gold outline-none p-3 rounded-xl bg-white text-slate-800 text-center font-mono text-xs"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* DIRECT BANK TRANSFER INFORMATION */}
                    {paymentMethod === 'bank' && (
                      <div className="border border-brand-gold/20 bg-brand-gold/5 p-5 rounded-2xl space-y-4 animate-in fade-in duration-200">
                        <div className="flex items-start gap-3 border-b border-brand-gold/10 pb-3">
                          <Award className="h-5 w-5 text-brand-gold-dark shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-bold text-brand-blue-dark text-xs sm:text-sm">
                              {currentLang === 'ms' ? 'Maklumat Pindahan Maybank Akademi' : currentLang === 'en' ? 'Academy Maybank Account Info' : 'معلومات الحساب البنكي للأكاديمية'}
                            </h4>
                            <p className="text-[10px] sm:text-xs text-slate-500 font-sans mt-0.5">
                              {currentLang === 'ms'
                                ? 'Pindahkan sumbangan terus ke akaun rasmi kami di bawah, kemudian tekan Sahkan.'
                                : currentLang === 'en'
                                ? 'Transfer the amount directly to our official Maybank account below, then click Confirm.'
                                : 'يرجى تحويل مبلغ الكفالة إلى حساب الأكاديمية الرسمي التالي، ثم انقر تأكيد.'}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2.5 font-sans font-medium text-xs text-slate-600">
                          <div className="flex justify-between items-center py-1">
                            <span className="text-slate-400 font-bold">{TRANSLATIONS[currentLang].bankName}</span>
                            <span className="font-bold text-brand-blue-dark">{TRANSLATIONS[currentLang].bankMaybank}</span>
                          </div>

                          <div className="flex justify-between items-center py-1 border-t border-dashed border-slate-200">
                            <span className="text-slate-400 font-bold">{TRANSLATIONS[currentLang].accountName}</span>
                            <span className="font-bold text-brand-blue-dark">AKADEMI ATHAR</span>
                          </div>

                          <div className="flex justify-between items-center py-2 border-t border-dashed border-slate-200">
                            <span className="text-slate-400 font-bold">{TRANSLATIONS[currentLang].accountNumber}</span>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-sm bg-white px-2.5 py-1 border border-slate-200 rounded text-brand-blue-dark">
                                564801608601
                              </span>
                              <button
                                type="button"
                                onClick={copyToClipboard}
                                className="p-1.5 border border-brand-gold/20 hover:border-brand-gold text-brand-gold-dark bg-white rounded-md cursor-pointer transition-colors"
                                title="Copy Account Number"
                              >
                                {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                              </button>
                            </div>
                          </div>

                          {copied && (
                            <p className="text-center font-bold text-emerald-600 text-[10px] animate-pulse">
                              {TRANSLATIONS[currentLang].copied}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Display final sponsorship summary */}
                    <div className="p-3 bg-brand-sand/30 border border-slate-100 rounded-xl flex items-center justify-between text-xs font-bold text-brand-blue-dark">
                      <span>{currentLang === 'ms' ? 'Jumlah Penajaan:' : currentLang === 'en' ? 'Sponsorship Total:' : 'إجمالي مبلغ الكفالة:'}</span>
                      <span className="text-sm text-brand-gold-dark">
                        {currency === 'USD' ? `$${isCustomAmount ? customAmount : selectedPreset}` : currency === 'MYR' ? `RM ${isCustomAmount ? customAmount : selectedPreset}` : `${isCustomAmount ? customAmount : selectedPreset} SAR`}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-3 border-t border-slate-100">
                      <button
                        type="submit"
                        className="flex-grow flex items-center justify-center gap-2 bg-brand-blue hover:bg-brand-gold hover:text-brand-blue-dark text-white font-bold py-3.5 rounded-xl shadow-md transition-colors cursor-pointer"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        <span>{TRANSLATIONS[currentLang].confirmPayment}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentStep('details')}
                        className="px-5 py-3.5 border border-slate-200 hover:border-slate-300 text-slate-500 rounded-xl transition-all cursor-pointer font-bold"
                      >
                        {TRANSLATIONS[currentLang].back}
                      </button>
                    </div>
                  </form>
                )}

                {/* STEP 3: PROCESSING */}
                {paymentStep === 'processing' && (
                  <div className="py-12 flex flex-col items-center justify-center space-y-4 animate-in zoom-in duration-300 text-center">
                    <Loader2 className="h-10 w-10 text-brand-gold animate-spin" />
                    <h4 className="text-sm font-bold text-brand-blue-dark">
                      {TRANSLATIONS[currentLang].processing}
                    </h4>
                  </div>
                )}

                {/* STEP 4: SUCCESS */}
                {paymentStep === 'success' && (
                  <div className="py-6 flex flex-col items-center justify-center space-y-4 animate-in zoom-in duration-300 text-center">
                    <div className="p-3.5 bg-emerald-100 text-emerald-600 rounded-full inline-block">
                      <CheckCircle2 className="h-10 w-10" />
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-brand-blue-dark">
                      {TRANSLATIONS[currentLang].successTitle}
                    </h4>
                    <p className="text-xs text-slate-500 font-sans leading-relaxed max-w-sm">
                      {TRANSLATIONS[currentLang].successDesc}
                    </p>

                    <div className="border border-dashed border-slate-200 p-4 rounded-xl w-full text-slate-600 bg-slate-50 space-y-2 font-mono text-[10px] sm:text-xs">
                      <div className="flex justify-between">
                        <span>{currentLang === 'ms' ? 'Penderma:' : currentLang === 'en' ? 'Donor:' : 'المتبرع:'}</span>
                        <span className="font-bold text-slate-800">{fullName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{currentLang === 'ms' ? 'No. Transaksi:' : currentLang === 'en' ? 'Transaction ID:' : 'رقم المعاملة:'}</span>
                        <span className="font-bold text-slate-800">{txnId}</span>
                      </div>
                      <div className="flex justify-between border-t border-dashed border-slate-200 pt-2">
                        <span>{currentLang === 'ms' ? 'Amaun:' : currentLang === 'en' ? 'Amount:' : 'المبلغ:'}</span>
                        <span className="font-bold text-brand-blue-dark">
                          {currency === 'USD' ? `$${isCustomAmount ? customAmount : selectedPreset}` : currency === 'MYR' ? `RM ${isCustomAmount ? customAmount : selectedPreset}` : `${isCustomAmount ? customAmount : selectedPreset} SAR`}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2.5 w-full pt-4">
                      <button
                        type="button"
                        onClick={downloadReceipt}
                        className="flex-grow flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-xs shadow-md transition-colors cursor-pointer"
                      >
                        <Download className="h-4 w-4" />
                        <span>{TRANSLATIONS[currentLang].downloadReceipt}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="px-5 py-3 border border-slate-200 hover:border-slate-300 text-slate-600 font-bold rounded-xl text-xs transition-all cursor-pointer bg-white"
                      >
                        {TRANSLATIONS[currentLang].close}
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
