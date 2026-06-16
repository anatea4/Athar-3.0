'use client';
import React, { useState } from 'react';
import { 
  Heart, Sparkles, Gift, CheckCircle2, Award, Users,
  ShieldCheck, BookOpen, QrCode, Smartphone, CreditCard,
  Briefcase, GraduationCap, Loader2
} from 'lucide-react';
import { Language } from '@/types';
import { FormDef } from './DynamicForm';
import EmbeddedDonateCheckout from './EmbeddedDonateCheckout';

interface DonationPageProps {
  currentLang: Language;
  form?: FormDef;
}

const IconComponent = ({ name, className }: { name: string; className?: string }) => {
  switch (name) {
    case 'Heart':
      return <Heart className={className} />;
    case 'Gift':
      return <Gift className={className} />;
    case 'Users':
      return <Users className={className} />;
    case 'Award':
      return <Award className={className} />;
    case 'Briefcase':
      return <Briefcase className={className} />;
    case 'BookOpen':
      return <BookOpen className={className} />;
    case 'GraduationCap':
      return <GraduationCap className={className} />;
    default:
      return <Users className={className} />;
  }
};

const TRANSLATIONS = {
  ar: {
    badge: 'دعم مسيرة الأثر',
    title: 'دعم الأثر الطيب',
    subtitle: 'ساهم بصدقتك لدعم طلاب العلم وحفظة كتاب الله العزيز، لتنال أجور تلاوتهم وتعليمهم حرفاً بحرف مدى الدهر.',
    progLabel: 'أوجه المصارف ومشاريع الخير',
    progTitle: 'عمارة الحلقات ودعم الحفظة',
    progDesc: 'تقوم أكاديمية أثر برعاية ودعم طلبة القرآن وتوفير الحلقات الميسرة للبراعم والفتيات والشباب. مساهمتك تسهم في تغطية قيمة تشغيل المنصات وتكريم المتميزين الحافظين.',
    featTransparentTitle: 'شفافية وأمان كامل للفرص الطيبة',
    featTransparentDesc: 'نموذج محاكاة يحاكي منصات العطاء والتبرع والجمعيات التعاونية لخدمة كتاب الله.',
    featBarakahTitle: 'أثر يبقى وأجر يتضاعف',
    featBarakahDesc: 'يصدر تبرعك شهادة شكر فورية تحمل اسم الـمتصدق تقديراً للمساهمة النبيلة في الدعم.',
    statsTitle: '١٣٥+ طالب وطالبة مدعومين بالكامل',
    statsDesc: 'انتظموا في حلقات الإسناد والتلقين بفضل سخاء المتبرعين الكرام.',
    formTitle: 'منصة التبرع',
    formTraditional: 'نموذج التبرع',
    formQuickQr: 'سداد سريع بالرمز',
    successTitle: 'جزاكم الله خير الجزاء وتقبل منكم!',
    successDesc: (amount: number, name: string) => 
      `تمت محاكاة تبرعكم بنجاح وتم توليد بطاقة الشكر الخاصة بكم بقيمة ${amount} رنجت ماليزي باسم "${name || 'فاعل خير'}".`,
    certTitle: 'صك إلكتروني ومستند تبرع',
    certText: 'تم إصدار هذا الصك تقديراً لمساهمتكم العطرة في عمارة ودعم الحلقات ونظم الجودة التعليمية لطلاب أكاديمية أثر.',
    certTransId: 'رقم الصك: أثر-تبرع-404',
    anonymous: 'فاعل خير',
    donateAgain: '← التبرع مجدداً للمقارئ والحلقات',
    campaignLabel: 'حدد المسار المستهدف',
    campStudent: 'دعم طالب علم',
    campCircle: 'دعم حلقة متكاملة',
    campGeneral: 'الوقف العام المفتوح',
    amountLabel: 'اختر قيمة بطاقة المنح',
    amountPreset: 'دعم بقيمة',
    amountCustomBtn: 'تحديد مبلغ مخصص مختلف',
    amountCustomLabel: 'ادخل المبلغ المخصص بالرنجت',
    amountCustomPlaceholder: 'مثال: 1000',
    nameLabel: 'اسم الباذل / صاحب التبرع (اختياري)',
    namePlaceholder: 'يكتب هنا الاسم لشهادة الشكر...',
    emailLabel: 'البريد الإلكتروني لإرسال الصك',
    emailPlaceholder: 'mail@example.com',
    submitBtn: (amount: number) => `إتمام المساهمة فوراً بقيمة ${amount} رنجت ماليزي`,
    secureLabel: 'عملية دفع افتراضية آمنة مائة بالمائة',
    qrInstantBadge: '',
    qrInstantDesc: 'امسح الكود الظاهر لتأكيد مساهمتك بالأسفل.',
    qrSelectAmount: 'حدد مبلغ المساهمة السريعة',
    qrOrCustom: 'أو مبلغ آخر مخصص:',
    qrCustomPlaceholder: 'مثال: 250',
    qrEmailLabel: 'البريد الإلكتروني لإرسال شهادة السداد',
    qrSubmitBtn: (amount: number) => `تأكيد نجاح السداد بقيمة ${amount} رنجت ماليزي`,
    qrSecureLabel: 'بوابة سداد ذاتية مشفرة بالكامل',
  },
  en: {
    badge: 'SUPPORT ATHAR',
    title: 'Donate & Support',
    subtitle: 'Support students of the Quran, support interactive online circles, and leave an everlasting impact of light and barakah.',
    progLabel: 'Support Programs',
    progTitle: 'Supporting Sincere Seekers',
    progDesc: 'Athar Academy supports talented and underprivileged pupils, offering them certified trainers and seamless interface options. Your gift goes 100% to classroom tooling and supporting scholars.',
    featTransparentTitle: '100% Transparent Campaign',
    featTransparentDesc: 'Simulated interactive campaign aligning with premium digital donation workflows.',
    featBarakahTitle: 'Everlasting Spiritual Barakah',
    featBarakahDesc: 'Generates an immediate custom printable gold certificate representing your simulated support.',
    statsTitle: '135+ Sibling & Individual Grants',
    statsDesc: 'Currently hosted through generous community gifts.',
    formTitle: 'Donation Platform',
    formTraditional: 'Donation Form',
    formQuickQr: 'Quick QR Pay',
    successTitle: 'Jazakum Allahu Khairan!',
    successDesc: (amount: number, name: string) => 
      `Your simulated contribution of ${amount} RM was registered. A beautiful honor e-badge is created for "${name || 'An Anonymous Benefactor'}".`,
    certTitle: 'Donation Certificate',
    certText: 'For supporting the educational pathway and Holy Quran classes inside Athar Quran Academy.',
    certTransId: 'TRANS-ID: ATH-DON-404',
    anonymous: 'Anonymous Benefactor',
    donateAgain: '← Support another campaign',
    campaignLabel: 'donation campaign target',
    campStudent: 'Support a Student',
    campCircle: 'Support Quran Circle',
    campGeneral: 'General Endowment',
    amountLabel: 'donation amount',
    amountPreset: 'Donate',
    amountCustomBtn: 'Custom Amount Instead',
    amountCustomLabel: 'Custom RM Value',
    amountCustomPlaceholder: 'E.g. 1000',
    nameLabel: 'Your Noble Name (Optional)',
    namePlaceholder: 'E.g. Fahd Bin Omar',
    emailLabel: 'E-badge Delivery Email',
    emailPlaceholder: 'mail@example.com',
    submitBtn: (amount: number) => `Donate Now with ${amount} RM`,
    secureLabel: 'Secure Payment Sandbox verified',
    qrInstantBadge: '',
    qrInstantDesc: 'Scan the displayed code to register the contribution.',
    qrSelectAmount: 'Select Quick Amount',
    qrOrCustom: 'Or Custom Amount:',
    qrCustomPlaceholder: 'E.g. 250',
    qrEmailLabel: 'Receipt Confirmation Email',
    qrSubmitBtn: (amount: number) => `Verify Transfer of ${amount} RM`,
    qrSecureLabel: 'Simulated instant bank-transfer sandbox',
  },
  ms: {
    badge: 'SOKONG ATHAR',
    title: 'Derma & Sokong',
    subtitle: 'Sokong pelajar Al-Quran, sokong halaqah interaktif dalam talian, dan tinggalkan impak cahaya serta barakah yang berterusan.',
    progLabel: 'Program Sokongan & Sumbangan',
    progTitle: 'Memakmurkan Halaqah & Menyokong Pelajar',
    progDesc: 'Akademi Athar menyokong pelajar berbakat yang kurang berkemampuan, menyediakan guru bertauliah dan sistem pembelajaran mesra pengguna. 100% sumbangan anda disalurkan untuk sokongan akademik dan pembelajaran.',
    featTransparentTitle: 'Kempen 100% Telus',
    featTransparentDesc: 'Kempen interaktif simulasi yang sejajar dengan sistem sumbangan digital premium.',
    featBarakahTitle: 'Barakah Rohani Berterusan',
    featBarakahDesc: 'Menjana sijil penghargaan digital emas serta-merta atas nama penderma sebagai tanda penghargaan atas sumbangan anda.',
    statsTitle: '135+ Geran Pelajar & Individu Disokong',
    statsDesc: 'Kini mengikuti halaqah hasil sumbangan murah hati komuniti.',
    formTitle: 'Platform Derma',
    formTraditional: 'Borang Derma',
    formQuickQr: 'Bayar Pantas QR',
    successTitle: 'Jazakum Allahu Khairan!',
    successDesc: (amount: number, name: string) => 
      `Sumbangan simulasi anda sebanyak ${amount} RM telah didaftarkan. Sijil penghargaan digital yang indah telah dijana untuk "${name || 'Hamba Allah'}".`,
    certTitle: 'Sijil Sumbangan Digital',
    certText: 'Dikeluarkan sebagai penghargaan atas sumbangan anda terhadap perjalanan pendidikan dan halaqah Al-Quran di Akademi Athar.',
    certTransId: 'ID-TRANS: ATH-DON-404',
    anonymous: 'Hamba Allah',
    donateAgain: '← Sokong kempen lain',
    campaignLabel: 'Sasaran Kempen Derma',
    campStudent: 'Sokong Pelajar',
    campCircle: 'Sokong Halaqah Al-Quran',
    campGeneral: 'Wakaf Am Terbuka',
    amountLabel: 'Amaun Sumbangan',
    amountPreset: 'Sumbangan',
    amountCustomBtn: 'Masukkan Amaun Tersuai',
    amountCustomLabel: 'Amaun Tersuai (RM)',
    amountCustomPlaceholder: 'cth. 1000',
    nameLabel: 'Nama Penderma (Pilihan)',
    namePlaceholder: 'cth. Fahd Bin Omar',
    emailLabel: 'E-mel Penghantaran Sijil',
    emailPlaceholder: 'mail@example.com',
    submitBtn: (amount: number) => `Derma Sekarang dengan ${amount} RM`,
    secureLabel: 'Simulasi Pembayaran Selamat Diverifikasi',
    qrInstantBadge: '',
    qrInstantDesc: 'Imbas kod yang dipaparkan untuk mendaftarkan sumbangan.',
    qrSelectAmount: 'Pilih Amaun Pantas',
    qrOrCustom: 'Atau Amaun Tersuai:',
    qrCustomPlaceholder: 'cth. 250',
    qrEmailLabel: 'E-mel Pengesahan Penerimaan',
    qrSubmitBtn: (amount: number) => `Sahkan Pemindahan ${amount} RM`,
    qrSecureLabel: 'Simulasi Pindahan Bank Segera',
  }
};

export default function DonationPage({ currentLang, form }: DonationPageProps) {
  // Translate helper
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  const pick = React.useCallback((obj: any, base: string, lang: Language): string => {
    if (!obj) return '';
    if (lang === 'ms') return obj[`${base}Ms`] || obj[`${base}En`] || obj[`${base}Ar`] || '';
    if (lang === 'en') return obj[`${base}En`] || obj[`${base}Ar`] || '';
    return obj[`${base}Ar`] || obj[`${base}En`] || '';
  }, []);

  const hasCustomSide = !!(form && (form.sideTitleAr || form.sideTitleEn || form.sideTitleMs));

  const sidebarData = React.useMemo(() => {
    if (hasCustomSide && form) {
      const rawPerks = pick(form, 'sidePerks', currentLang);
      const perks = rawPerks ? rawPerks.split('\n').map((p: string) => p.trim()).filter(Boolean) : [];
      return {
        badge: pick(form, 'sideBadge', currentLang) || t.progLabel,
        title: pick(form, 'sideTitle', currentLang) || t.progTitle,
        desc: pick(form, 'sideDesc', currentLang) || t.progDesc,
        perksTitle: pick(form, 'sidePerksTitle', currentLang),
        perks: perks,
        statsTitle: pick(form, 'sideStatsTitle', currentLang) || t.statsTitle,
        statsDesc: pick(form, 'sideStatsDesc', currentLang) || t.statsDesc,
        statsVal: form.sideStatsVal || '135+',
        statsIcon: form.sideStatsIcon || 'Users'
      };
    }
    return null;
  }, [form, currentLang, hasCustomSide, t, pick]);

  const presets = React.useMemo(() => {
    const raw = form?.presets || '50, 100, 150, 500';
    return raw.split(',').map((n) => Number(n.trim())).filter((n) => !isNaN(n));
  }, [form?.presets]);

  const campaigns = React.useMemo(() => {
    if (form?.campaigns && Array.isArray(form.campaigns)) {
      const active = form.campaigns.filter((c: any) => !c._hidden);
      if (active.length > 0) return active;
    }
    return [
      { id: 'student', labelAr: t.campStudent, labelEn: t.campStudent, labelMs: t.campStudent, icon: 'Heart' },
      { id: 'circle', labelAr: t.campCircle, labelEn: t.campCircle, labelMs: t.campCircle, icon: 'Users' },
      { id: 'general', labelAr: t.campGeneral, labelEn: t.campGeneral, labelMs: t.campGeneral, icon: 'Gift' }
    ];
  }, [form?.campaigns, t]);

  // Donation State
  const [selectedAmount, setSelectedAmount] = useState<number | 'custom'>(presets[2] || presets[0] || 150);
  const [customAmountText, setCustomAmountText] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donationSuccess, setDonationSuccess] = useState(false);
  const [donationTierSelected, setDonationTierSelected] = useState<string>('');
  const [donorEmail, setDonorEmail] = useState('');
  const [processing, setProcessing] = useState(false);
  const [payError, setPayError] = useState('');
  const [publishableKey, setPublishableKey] = useState('');
  const [showCheckout, setShowCheckout] = useState(false);

  React.useEffect(() => {
    fetch('/api/payments/config')
      .then((r) => r.json())
      .then((d) => setPublishableKey(d.publishableKey || ''))
      .catch(() => {});
  }, []);

  React.useEffect(() => {
    if (campaigns.length > 0) {
      setDonationTierSelected((prev) => campaigns.some(c => c.id === prev) ? prev : campaigns[0].id);
    }
  }, [campaigns]);
  
  // Quick QR Payment states
  const [paymentMethod, setPaymentMethod] = useState<'traditional' | 'qr'>('traditional');
  const [qrAmount, setQrAmount] = useState<number>(presets[2] || presets[0] || 150);
  const [customQrText, setCustomQrText] = useState('');

  const containerRef = React.useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    setTimeout(() => {
      if (containerRef.current) {
        const offset = 100;
        const top = containerRef.current.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 100);
  };

  const getDonationAmount = () => {
    if (paymentMethod === 'qr') {
      return qrAmount;
    }
    if (selectedAmount === 'custom') {
      const parsed = parseFloat(customAmountText);
      return isNaN(parsed) ? 0 : parsed;
    }
    return selectedAmount;
  };

  const handleDonationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = getDonationAmount();
    if (amount <= 0) return;
    setPayError('');
    // In-site embedded checkout (preferred). Falls back to hosted redirect if no key.
    if (publishableKey) { setShowCheckout(true); return; }
    setProcessing(true);
    try {
      const campaign = campaigns.find((c) => c.id === donationTierSelected);
      const description = `${t.title}${campaign ? ' — ' + pick(campaign, 'label', currentLang) : ''}`;
      const res = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, currency: 'MYR', description, customerEmail: donorEmail }),
      });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url; // → Stripe Checkout (hosted)
        return;
      }
      setPayError(
        data.error ||
          (currentLang === 'ms' ? 'Pembayaran belum diaktifkan.' : currentLang === 'en' ? 'Payments are not enabled yet.' : 'المدفوعات غير مفعّلة بعد، يرجى المحاولة لاحقاً.')
      );
    } catch {
      setPayError(currentLang === 'ms' ? 'Ralat sambungan.' : currentLang === 'en' ? 'Connection error.' : 'حدث خطأ في الاتصال، حاول مجدداً.');
    } finally {
      setProcessing(false);
    }
  };

  const handleReset = () => {
    setDonationSuccess(false);
    setDonorName('');
    setCustomAmountText('');
    setCustomQrText('');
    setSelectedAmount(150);
    setQrAmount(150);
  };

  return (
    <div ref={containerRef} className="w-full text-slate-800 relative select-none text-right rtl:text-right ltr:text-left">
      
      {/* Decorative patterns and elements for premium style */}
      <div className="absolute inset-0 islamic-pattern opacity-[0.06] pointer-events-none" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-brand-gold-light/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-blue-dark tracking-tight font-classical">
            {t.title}
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-sans">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sponsoring Options Info Column */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-brand-gold-light border-2 border-brand-gold/20 rounded-3xl p-6 sm:p-8 space-y-6">
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-brand-gold block">
                {sidebarData ? sidebarData.badge : t.progLabel}
              </span>
              
              <h3 className="text-xl font-serif font-bold text-brand-blue-dark font-classical leading-snug">
                {sidebarData ? sidebarData.title : t.progTitle}
              </h3>
              
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                {sidebarData ? sidebarData.desc : t.progDesc}
              </p>

              {sidebarData && sidebarData.perks.length > 0 ? (
                <div className="space-y-3 font-sans">
                  {sidebarData.perksTitle && (
                    <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-widest">
                      {sidebarData.perksTitle}
                    </h4>
                  )}
                  <ul className="space-y-2 text-xs text-slate-600 font-sans">
                    {sidebarData.perks.map((perk, pi) => (
                      <li key={pi} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-brand-gold shrink-0 mt-0.5" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="space-y-4 pt-2">
                  <div className="flex gap-3.5 items-start">
                    <div className="p-2 bg-white rounded-xl border border-brand-gold/20 text-brand-gold shrink-0">
                      <Award className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-800 font-classical">
                        {t.featTransparentTitle}
                      </h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                        {t.featTransparentDesc}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3.5 items-start">
                    <div className="p-2 bg-white rounded-xl border border-brand-gold/20 text-brand-gold shrink-0">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-800 font-classical">
                        {t.featBarakahTitle}
                      </h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                        {t.featBarakahDesc}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Monthly Impact Card */}
            <div className="bg-white border border-brand-gold/15 rounded-3xl p-6 shadow-sm flex items-center justify-between gap-5 col-span-1">
              <div className="flex items-center gap-3">
                <div className="p-3.5 bg-brand-gold-light rounded-xl text-brand-gold-dark border border-brand-gold/20">
                  <IconComponent name={sidebarData ? sidebarData.statsIcon : 'Users'} className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800 font-classical">
                    {sidebarData ? sidebarData.statsTitle : t.statsTitle}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-sans">
                    {sidebarData ? sidebarData.statsDesc : t.statsDesc}
                  </p>
                </div>
              </div>
              <div className="text-2xl font-mono font-black text-brand-blue-dark">
                {sidebarData ? sidebarData.statsVal : '135+'}
              </div>
            </div>

          </div>

          {/* Donation Form Column */}
          <div className="lg:col-span-7 bg-white border border-brand-gold/15 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-gold-dark via-brand-gold to-brand-gold-light" />
            
            <h3 className="text-lg font-bold font-serif text-brand-blue-dark font-classical mb-4">
              {t.formTitle}
            </h3>

            {/* Payment Method Selector */}
            {!donationSuccess && (
              <div className="flex bg-slate-100 rounded-2xl p-1 mb-6 font-sans">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('traditional')}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    paymentMethod === 'traditional'
                      ? 'bg-white text-brand-blue-dark shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <CreditCard className="h-4 w-4" />
                  <span>{t.formTraditional}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPaymentMethod('qr');
                    const amt = getDonationAmount();
                    if (amt > 0) setQrAmount(amt);
                  }}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    paymentMethod === 'qr'
                      ? 'bg-white text-brand-blue-dark shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <QrCode className="h-4 w-4" />
                  <span>{t.formQuickQr}</span>
                </button>
              </div>
            )}

            {donationSuccess ? (
              <div className="py-8 text-center space-y-6 animate-in fade-in duration-300">
                <div className="mx-auto w-16 h-16 bg-brand-gold/15 text-brand-gold rounded-full flex items-center justify-center border-2 border-brand-gold shadow-lg animate-bounce">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-bold font-serif text-brand-blue-dark font-classical">
                    {t.successTitle}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed font-sans px-2">
                    {t.successDesc(getDonationAmount(), donorName)}
                  </p>
                </div>

                {/* Printable Certificate */}
                <div className="border border-brand-gold/30 rounded-2xl p-6 max-w-md mx-auto bg-brand-gold-light text-center relative shadow-sm">
                  <div className="absolute top-2 left-2 right-2 bottom-2 border border-brand-gold/10 pointer-events-none rounded-xl" />
                  <Sparkles className="h-5 w-5 text-brand-gold mx-auto mb-2.5" />
                  <span className="text-[10px] text-brand-gold-dark uppercase tracking-widest font-mono font-bold block">
                    {t.certTitle}
                  </span>
                  <h5 className="text-lg py-1.5 font-classical font-serif font-bold text-brand-blue-dark">
                    {donorName || t.anonymous}
                  </h5>
                  <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
                    {t.certText}
                  </p>
                  <div className="mt-4 pt-3 border-t border-brand-gold/15 flex justify-between items-center text-[9px] font-mono text-slate-400">
                    <span>{t.certTransId}</span>
                    <span>{new Date().toLocaleDateString(currentLang === 'en' ? 'en-US' : currentLang === 'ms' ? 'ms-MY' : 'ar-EG')}</span>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="mt-4 inline-flex items-center text-xs text-brand-gold-dark hover:text-brand-blue font-bold font-sans hover:underline cursor-pointer"
                >
                  {t.donateAgain}
                </button>
              </div>
            ) : paymentMethod === 'traditional' ? (
              <form onSubmit={handleDonationSubmit} className="space-y-6">
                
                {/* Campaigns */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 font-sans mb-2.5 uppercase tracking-wider">
                    {t.campaignLabel}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 font-sans">
                    {campaigns.map((c) => {
                      const selected = donationTierSelected === c.id;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setDonationTierSelected(c.id)}
                          className={`p-3.5 rounded-2xl border text-xs font-bold font-sans text-left rtl:text-right transition-all flex flex-col justify-between cursor-pointer ${
                            selected
                              ? 'bg-brand-blue text-brand-gold border-transparent shadow'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-brand-gold'
                          }`}
                        >
                          <IconComponent name={c.icon} className="h-4.5 w-4.5 mb-2.5" />
                          <span>{pick(c, 'label', currentLang)}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Preset amount cards */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 font-sans mb-2.5 uppercase tracking-wider">
                    {t.amountLabel}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-sm">
                    {presets.map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => setSelectedAmount(amount)}
                        className={`p-3.5 rounded-2xl border-2 transition-all font-extrabold flex flex-col items-center justify-center cursor-pointer select-none font-mono ${
                          selectedAmount === amount
                            ? 'bg-brand-gold-light border-brand-gold text-brand-gold-dark shadow-sm'
                            : 'bg-white border-slate-200 hover:border-brand-gold text-slate-700'
                        }`}
                      >
                        <span className="text-[10px] text-slate-400 font-sans font-medium mb-1">
                          {t.amountPreset}
                        </span>
                        <span>{amount} RM</span>
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => setSelectedAmount('custom')}
                      className={`p-3.5 rounded-2xl border-2 transition-all font-bold flex flex-col items-center justify-center cursor-pointer select-none font-sans text-xs ${
                        selectedAmount === 'custom'
                          ? 'bg-brand-gold-light border-brand-gold text-brand-gold-dark shadow-sm'
                          : 'bg-white border-slate-200 hover:border-brand-gold text-slate-700'
                      }`}
                    >
                      <span className="text-[10px] text-slate-400 font-sans font-medium mb-1">
                        {t.amountPreset}
                      </span>
                      <span>{currentLang === 'ms' ? 'Tersuai' : currentLang === 'en' ? 'Custom' : 'مبلغ مخصص'}</span>
                    </button>
                  </div>

                  {selectedAmount === 'custom' && (
                    <div className="mt-3.5 bg-brand-gold-light/45 p-4 rounded-2xl border border-brand-gold/15 animate-in slide-in-from-top-2 duration-350">
                      <label className="block text-[10px] uppercase tracking-widest text-[#8C7343] font-bold mb-1.5 font-sans">
                        {t.amountCustomLabel}
                      </label>
                      <div className="relative flex items-center">
                        <input
                          type="number"
                          min="10"
                          value={customAmountText}
                          onChange={(e) => setCustomAmountText(e.target.value)}
                          placeholder={t.amountCustomPlaceholder}
                          className="w-full bg-white border border-slate-200 outline-none p-2.5 px-4 pr-12 rounded-xl text-xs sm:text-sm text-slate-800 font-mono focus:border-brand-gold text-left rtl:text-right"
                        />
                        <span className="absolute right-4 rtl:left-4 rtl:right-auto font-mono text-xs font-bold text-slate-400">RM</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Donor settings */}
                <div className="space-y-4 font-sans">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-650 mb-1.5 uppercase tracking-wide">
                        {t.nameLabel}
                      </label>
                      <input
                        type="text"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        placeholder={t.namePlaceholder}
                        className="w-full bg-white border border-slate-200 focus:border-brand-gold outline-none p-3 px-4 rounded-xl text-xs sm:text-sm font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-650 mb-1.5 uppercase tracking-wide">
                        {t.emailLabel}
                      </label>
                      <input
                        type="email"
                        required
                        value={donorEmail}
                        onChange={(e) => setDonorEmail(e.target.value)}
                        placeholder={t.emailPlaceholder}
                        className="w-full bg-white border border-slate-200 focus:border-brand-gold outline-none p-3 px-4 rounded-xl text-xs sm:text-sm font-sans text-left rtl:text-right"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  {payError && (
                    <p className="mb-3 text-[11px] text-red-600 font-sans text-center bg-red-50 border border-red-200 rounded-xl py-2 px-3">
                      {payError}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-brand-blue-dark text-brand-gold hover:bg-brand-gold hover:text-brand-blue-dark transition-all font-serif font-bold text-xs p-4 rounded-2xl uppercase tracking-wider shadow-md hover:scale-[1.01] duration-300 font-classical cursor-pointer select-none disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {processing && <Loader2 className="h-4 w-4 animate-spin" />}
                    {processing
                      ? (currentLang === 'ms' ? 'Mengalihkan ke pembayaran...' : currentLang === 'en' ? 'Redirecting to payment...' : 'جارٍ التحويل لصفحة الدفع...')
                      : t.submitBtn(getDonationAmount())}
                  </button>
                  <div className="flex items-center justify-center gap-1.5 mt-3 text-[10px] text-slate-400 font-sans select-none">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    <span>{currentLang === 'ms' ? 'Pembayaran selamat melalui Stripe' : currentLang === 'en' ? 'Secure payment via Stripe' : 'دفع آمن عبر Stripe'}</span>
                  </div>
                </div>

              </form>
            ) : (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="text-center space-y-2">
                  {t.qrInstantBadge && (
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full uppercase tracking-widest font-mono font-bold inline-block">
                      {t.qrInstantBadge}
                    </span>
                  )}
                  <p className="text-xs text-slate-500 font-sans max-w-sm mx-auto leading-relaxed">
                    {t.qrInstantDesc}
                  </p>
                </div>

                {/* Amount Selector inside QR Tab */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 font-sans mb-2.5 uppercase tracking-wider text-center sm:text-left rtl:sm:text-right">
                    {t.qrSelectAmount}
                  </label>
                  <div className="grid grid-cols-4 gap-2 font-mono text-xs">
                    {presets.map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => {
                          setQrAmount(amount);
                          setCustomQrText('');
                        }}
                        className={`p-2.5 rounded-xl border-2 transition-all font-extrabold text-center cursor-pointer select-none ${
                          qrAmount === amount && !customQrText
                            ? 'bg-brand-gold-light border-brand-gold text-[#8C7343] shadow-sm'
                            : 'bg-white border-slate-200 hover:border-brand-gold text-slate-700'
                        }`}
                      >
                        {amount} RM
                      </button>
                    ))}
                  </div>

                  <div className="mt-3 bg-brand-gold-light/20 p-2 border border-brand-gold/10 rounded-xl flex items-center justify-between gap-3 text-xs">
                    <span className="text-slate-500 font-sans text-[11px] shrink-0 font-bold">
                      {t.qrOrCustom}
                    </span>
                    <div className="relative w-full">
                      <input
                        type="number"
                        min="10"
                        value={customQrText}
                        onChange={(e) => {
                          setCustomQrText(e.target.value);
                          const parsed = parseFloat(e.target.value);
                          setQrAmount(isNaN(parsed) ? 0 : parsed);
                        }}
                        placeholder={t.qrCustomPlaceholder}
                        className="w-full bg-white border border-slate-200 outline-none p-1.5 px-3 rounded-lg text-xs font-mono text-slate-800 text-left rtl:text-right"
                      />
                    </div>
                  </div>
                </div>

                {/* SVG Beautiful QR Code Graphic */}
                <div className="flex flex-col items-center justify-center p-6 bg-brand-gold-light/40 border border-brand-gold/20 rounded-3xl relative">
                  <div className="absolute top-2 right-2 rtl:left-2 rtl:right-auto text-[9px] font-mono text-slate-400 bg-white border border-brand-gold/10 px-2 py-0.5 rounded-md">
                    {form?.qrRef || 'REF: ATH-QR-8923'}
                  </div>

                  <div className="relative w-44 h-44 bg-white p-3 rounded-2xl shadow-md border border-brand-gold/25 flex items-center justify-center group select-none overflow-hidden">
                    {/* Animated scanning line */}
                    <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-brand-gold to-transparent animate-bounce top-4" />
                    
                    {form?.qrImage ? (
                      <img src={form.qrImage} alt="QR Code" className="w-full h-full object-contain" />
                    ) : (
                      /* Golden QR Code SVG Graphic */
                      <svg className="w-full h-full text-brand-blue-dark" viewBox="0 0 100 100" fill="currentColor">
                        {/* Quiet Zone Grid blocks representing premium Islamic geometry */}
                        <rect x="0" y="0" width="24" height="24" fill="#C09E5B" rx="1" />
                        <rect x="3" y="3" width="18" height="18" fill="#FFFFFF" rx="1" />
                        <rect x="6" y="6" width="12" height="12" fill="#192d4a" rx="1" />

                        <rect x="76" y="0" width="24" height="24" fill="#C09E5B" rx="1" />
                        <rect x="79" y="3" width="18" height="18" fill="#FFFFFF" rx="1" />
                        <rect x="82" y="6" width="12" height="12" fill="#192d4a" rx="1" />

                        <rect x="0" y="76" width="24" height="24" fill="#C09E5B" rx="1" />
                        <rect x="3" y="79" width="18" height="18" fill="#FFFFFF" rx="1" />
                        <rect x="6" y="82" width="12" height="12" fill="#192d4a" rx="1" />

                        {/* Random aesthetic QR-like block data patterns */}
                        <rect x="30" y="2" width="6" height="6" fill="#C09E5B" />
                        <rect x="42" y="4" width="8" height="4" fill="#192d4a" />
                        <rect x="56" y="1" width="12" height="6" fill="#C09E5B" />
                        <rect x="30" y="12" width="14" height="4" fill="#192d4a" />
                        <rect x="48" y="10" width="16" height="4" fill="#C09E5B" />
                        <rect x="34" y="20" width="8" height="8" fill="#192d4a" />

                        <rect x="2" y="30" width="12" height="8" fill="#C09E5B" />
                        <rect x="18" y="34" width="8" height="12" fill="#192d4a" />
                        <rect x="30" y="30" width="16" height="16" fill="#C09E5B" />
                        <rect x="50" y="32" width="12" height="6" fill="#192d4a" />
                        <rect x="66" y="30" width="8" height="18" fill="#C09E5B" />

                        <rect x="78" y="30" width="20" height="8" fill="#C09E5B" />
                        <rect x="90" y="42" width="8" height="14" fill="#192d4a" />
                        <rect x="78" y="46" width="10" height="10" fill="#C09E5B" />

                        <rect x="2" y="48" width="14" height="10" fill="#192d4a" />
                        <rect x="30" y="52" width="18" height="8" fill="#C09E5B" />
                        <rect x="52" y="44" width="8" height="16" fill="#192d4a" />

                        <rect x="26" y="66" width="14" height="14" fill="#C09E5B" />
                        <rect x="44" y="66" width="16" height="8" fill="#192d4a" />
                        <rect x="44" y="78" width="10" height="10" fill="#C09E5B" />

                        <rect x="66" y="60" width="14" height="14" fill="#192d4a" />
                        <rect x="84" y="60" width="14" height="8" fill="#C09E5B" />
                        <rect x="66" y="78" width="8" height="20" fill="#C09E5B" />
                        <rect x="78" y="78" width="20" height="20" fill="#192d4a" />
                        <rect x="3" y="1" width="1" height="1" fill="#FFFFFF" />

                        {/* Small gold leaf badge in center representing the Academy brand */}
                        <rect x="43" y="43" width="14" height="14" fill="#FFFFFF" rx="4" />
                        <circle cx="50" cy="50" r="5" fill="#C09E5B" />
                      </svg>
                    )}
                  </div>

                  <div className="mt-4 text-center font-mono text-sm font-extrabold text-brand-blue-dark flex items-center justify-center gap-1.5 bg-white border border-brand-gold/20 px-4 py-1.5 rounded-full shadow-sm">
                    <Smartphone className="h-4 w-4 text-brand-gold animate-bounce" />
                    <span>{qrAmount} RM</span>
                  </div>
                </div>

                {/* Name Capture for the Certificate */}
                <div className="space-y-4 font-sans">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-650 mb-1.5 uppercase tracking-wide">
                        {t.nameLabel}
                      </label>
                      <input
                        type="text"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        placeholder={t.namePlaceholder}
                        className="w-full bg-white border border-slate-200 focus:border-brand-gold outline-none p-3 px-4 rounded-xl text-xs sm:text-sm font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-650 mb-1.5 uppercase tracking-wide">
                        {t.qrEmailLabel}
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="mail@example.com"
                        className="w-full bg-[#FFFFFF] border border-slate-200 focus:border-brand-gold outline-none p-3 px-4 rounded-xl text-xs sm:text-sm font-sans text-left rtl:text-right"
                      />
                    </div>
                  </div>
                </div>

                {/* Confirm QR Transfer Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (qrAmount <= 0) return;
                      setDonationSuccess(true);
                      scrollToTop();
                    }}
                    className="w-full bg-brand-blue-dark text-brand-gold hover:bg-brand-gold hover:text-brand-blue-dark transition-all font-serif font-bold text-xs p-4 rounded-2xl uppercase tracking-wider shadow-md hover:scale-[1.01] duration-300 font-classical cursor-pointer select-none flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="h-4.5 w-4.5 transition-colors" />
                    <span>
                      {t.qrSubmitBtn(qrAmount)}
                    </span>
                  </button>
                  <div className="flex items-center justify-center gap-1.5 mt-3 text-[10px] text-slate-400 font-sans select-none">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    <span>{t.qrSecureLabel}</span>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      {showCheckout && publishableKey && (
        <EmbeddedDonateCheckout
          publishableKey={publishableKey}
          amount={getDonationAmount()}
          currency="MYR"
          description={t.title}
          email={donorEmail}
          name={donorName}
          onClose={() => setShowCheckout(false)}
        />
      )}
    </div>
  );
}
