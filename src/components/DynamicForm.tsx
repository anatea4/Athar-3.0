'use client';
import React, { useState } from 'react';
import { Language } from '@/types';
import { 
  Users, Award, CheckCircle2, Send, Loader2, CheckSquare, 
  Briefcase, BookOpen, GraduationCap, QrCode, Smartphone, 
  CreditCard, ShieldCheck, Sparkles
} from 'lucide-react';
import { submitForm } from '@/lib/submit-form';
import TurnstileWidget from '@/components/TurnstileWidget';

export interface FormField {
  key: string;
  labelAr: string;
  labelEn?: string;
  labelMs?: string;
  type: 'text' | 'tel' | 'email' | 'textarea' | 'select' | 'number';
  required?: boolean;
  options?: string;
  _hidden?: boolean;
}

export interface FormDef {
  id: string;
  section?: string;
  order?: number;
  titleAr: string;
  titleEn?: string;
  titleMs?: string;
  descAr?: string;
  descEn?: string;
  descMs?: string;
  headerImage?: string;
  submitType: string;
  submitLabelAr?: string;
  submitLabelEn?: string;
  submitLabelMs?: string;
  successAr?: string;
  successEn?: string;
  successMs?: string;
  fields: FormField[];
  _hidden?: boolean;

  // Custom sidebar properties
  sideBadgeAr?: string;
  sideBadgeEn?: string;
  sideBadgeMs?: string;
  sideTitleAr?: string;
  sideTitleEn?: string;
  sideTitleMs?: string;
  sideDescAr?: string;
  sideDescEn?: string;
  sideDescMs?: string;
  sidePerksTitleAr?: string;
  sidePerksTitleEn?: string;
  sidePerksTitleMs?: string;
  sidePerksAr?: string;
  sidePerksEn?: string;
  sidePerksMs?: string;
  sideStatsTitleAr?: string;
  sideStatsTitleEn?: string;
  sideStatsTitleMs?: string;
  sideStatsDescAr?: string;
  sideStatsDescEn?: string;
  sideStatsDescMs?: string;
  sideStatsVal?: string;
  sideStatsIcon?: string;

  // Custom payments/QR properties
  presets?: string;
  qrImage?: string;
  qrRef?: string;
  campaigns?: any[];
}

const pick = (obj: any, base: string, lang: Language): string => {
  if (!obj) return '';
  if (lang === 'ms') return obj[`${base}Ms`] || obj[`${base}En`] || obj[`${base}Ar`] || '';
  if (lang === 'en') return obj[`${base}En`] || obj[`${base}Ar`] || '';
  return obj[`${base}Ar`] || obj[`${base}En`] || '';
};

const IconComponent = ({ name, className }: { name: string; className?: string }) => {
  switch (name) {
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
      return <Award className={className} />;
  }
};

const getFormMeta = (form: FormDef, lang: Language) => {
  const t = (ar: string, en: string, ms: string) => {
    if (lang === 'ms') return ms;
    if (lang === 'en') return en;
    return ar;
  };

  const pickSide = (field: string) => {
    return pick(form, `side${field}`, lang);
  };

  const hasCustomSide = !!(form.sideTitleAr || form.sideTitleEn || form.sideTitleMs);

  if (hasCustomSide) {
    const rawPerks = pickSide('Perks');
    const perks = rawPerks ? rawPerks.split('\n').map((p: string) => p.trim()).filter(Boolean) : [];
    
    return {
      badge: pickSide('Badge') || t('أكاديمية أثر', 'Athar Academy', 'Akademi Athar'),
      title: pickSide('Title') || pick(form, 'title', lang),
      desc: pickSide('Desc') || pick(form, 'desc', lang),
      perksTitle: pickSide('PerksTitle') || t('المميزات:', 'Features:', 'Kelebihan:'),
      perks: perks.length > 0 ? perks : [
        t('كادر تعليمي مؤهل ومجاز بالسند المتصل', 'Qualified faculty with high connected Sanad', 'Barisan pendidik bertauliah bersambung Sanad'),
      ],
      statsTitle: pickSide('StatsTitle') || t('الطلاب والخريجين', 'Enrolled Pupils', 'Pelajar Terdaftar'),
      statsDesc: pickSide('StatsDesc') || t('مسيرتنا مستمرة في نشر الخير', 'Continuous path of Quranic light', 'Laluan berterusan menyebarkan kebaikan'),
      statsVal: form.sideStatsVal || '1,240+',
      icon: form.sideStatsIcon || 'Award'
    };
  }

  const formId = form.id;
  switch (formId) {
    case 'register-circles':
      return {
        badge: t('حلقات التسميع والتحفيظ', 'QURAN RECITATION CIRCLES', 'HALAQAH AL-QURAN'),
        title: t('حلقات حفظ القرآن الكريم للأطفال والشباب', 'Quran Memorization Circles', 'Halaqah Hafazan Al-Quran'),
        desc: t(
          'نهدف إلى توفير بيئة تعليمية ميسرة تحت إشراف نخبة من المعلمين المتقنين لمتابعة الحفظ والتجويد.',
          'Nurturing students in virtual and physical spaces under certified Quran teachers to master Tajweed and memorization.',
          'Membimbing pelajar dalam halaqah Al-Quran di bawah bimbingan guru bertauliah untuk menguasai Tajwid.'
        ),
        perksTitle: t('مميزات الحلقات القرآنية:', 'Circle Advantages', 'Kelebihan Halaqah Al-Quran:'),
        perks: [
          t('معلمون ومعلمات مجازون بالسند المتصل إلى رسول الله ﷺ', 'Teachers certified with high connected Sanad', 'Guru bertauliah dengan Sanad bersambung'),
          t('خطط حفظ مرنة ومخصصة تناسب قدرة ومستوى كل طالب', 'Flexible, personalized memorization plans for each student', 'Pelan hafazan yang fleksibel mengikut tahap pelajar'),
          t('تقارير متابعة دورية وبوابة خاصة لأولياء الأمور لتتبع الأداء', 'Periodic progress reports and live parent tracking portal', 'Laporan prestasi berkala dan portal pemantauan ibu bapa')
        ],
        statsTitle: t('عدد الطلاب النشطين', 'Active Students', 'Pelajar Aktif'),
        statsDesc: t('يتعلمون التلاوة والحفظ بالأكاديمية', 'Enrolled in Quranic pathways', 'Berdaftar dalam halaqah Al-Quran'),
        statsVal: '1,240+',
        icon: 'BookOpen'
      };

    case 'register-programs':
      return {
        badge: t('البرامج والمخيمات التعليمية', 'ACADEMY PROGRAMS & CAMPS', 'PROGRAM & KEM AKADEMI'),
        title: t('التأصيل الشرعي والتربوي للناشئة', 'Nurturing Islamic Character Together', 'Membina Sahsiah Islam Bersama'),
        desc: t(
          'برامج ومخيمات متكاملة تجمع بين العلم الشرعي والمهارات الحياتية والتربوية لبناء جيل واعد.',
          'Camps and educational courses combining theological basics with modern development tools.',
          'Kem dan kursus pendidikan menggabungkan asas syariah dengan pembangunan sahsiah moden.'
        ),
        perksTitle: t('أهداف برامجنا:', 'Program Features', 'Ciri-ciri Program:'),
        perks: [
          t('مناهج علمية مبسطة في العقيدة والحديث والسيرة النبوية', 'Simplified theological courses in Aqidah, Hadith, and Seerah', 'Kursus ringkas Aqidah, Hadith, dan Sirah Nabawiyyah'),
          t('أنشطة حركية وتربوية مصاحبة لبناء الوعي وتنمية المهارات', 'Interactive activities to build soft skills and leadership', 'Aktiviti interaktif untuk membina kemahiran kepimpinan'),
          t('شهادات معتمدة وجوائز تقديرية للمتميزين والمشاركين', 'Certified badges and honorary awards for participants', 'Sijil penyertaan dan anugerah bagi peserta')
        ],
        statsTitle: t('البرامج والمخيمات', 'Annual Programs', 'Program Tahunan'),
        statsDesc: t('تقام على مدار العام الدراسي', 'Hosted throughout the academic year', 'Dianjurkan sepanjang tahun akademik'),
        statsVal: '15+',
        icon: 'GraduationCap'
      };

    case 'careers':
      return {
        badge: t('بوابة الكوادر والتوظيف', 'ATHAR ACADEMY CAREERS', 'KERJAYA AKADEMI ATHAR'),
        title: t('شرف العطاء في رحاب أهل القرآن', 'Join our Nurturing Faculty', 'Sertai Barisan Pendidik Kami'),
        desc: t(
          'فرص وظيفية تعليمية وإدارية وتقنية للانضمام إلى فريق عمل أكاديمية أثر للقرآن الكريم.',
          'We welcome qualified administrators and certified scholars to support Quranic e-learning.',
          'Kami mengalu-alukan pentadbir and guru bertauliah untuk menyokong pembelajaran Al-Quran.'
        ),
        perksTitle: t('مميزات العمل معنا:', 'Careers Privileges', 'Kelebihan Bekerja dengan Kami:'),
        perks: [
          t('بيئة عمل تربوية، راقية ومحفزة على الإبداع والعطاء', 'A supportive, Islamic, and motivating workplace', 'Persekitaran kerja Islamik yang harmoni dan kondusif'),
          t('فرص للتطوير والنمو المهني المستمر عبر دورات متخصصة', 'Continuous professional development and training sessions', 'Peluang pembangunan profesional dan latihan berterusan'),
          t('شرف المساهمة المباشرة في خدمة وتدريس كتاب الله العزيز', 'The honor of serving and teaching the Holy Quran', 'Kehormatan berkhidmat dan mengajar Al-Quran')
        ],
        statsTitle: t('المعلمين والمعلمات', 'Teaching Scholars', 'Barisan Guru'),
        statsDesc: t('مؤهلين ومجازين لتعليم كتاب الله', 'Certified teachers and sheikhs', 'Guru bertauliah dan berpengalaman'),
        statsVal: '48+',
        icon: 'Briefcase'
      };

    case 'volunteer':
    case 'ambassadors':
      return {
        badge: t('فريق سفراء الأثر التطوعي', 'SFARAA AL-ATHAR TEAM', 'PASUKAN DUTA SUKARELAWAN ATHAR'),
        title: t('انضم كمتطوع وساهم في الأجر', 'Join as a Volunteer Ambassador', 'Sertai sebagai Duta Sukarelawan'),
        desc: t(
          'نهيئ الدروب لقنوات الخير، ونفتح الأبواب لكل صاحب مهارة يسعى بوقته وفطنته لخدمة طلبة الحلقات والمقارئ.',
          'Our volunteer ambassadors work globally to support Quranic e-learning and create assets.',
          'Kami membuka peluang kepada sesiapa sahaja untuk menyumbang kepakaran dalam menyokong pembelajaran Quran.'
        ),
        perksTitle: t('امتيازات الانضمام للفريق:', 'Volunteer Privileges', 'Keistimewaan Sukarelawan:'),
        perks: [
          t('ثبوت الأجر ومصاحبة ركب أهل القرآن بصدقة جارية', 'Sadaqah Jariyah continuous reward with Quran seekers', 'Ganjaran pahala berterusan dengan para penghafal Al-Quran'),
          t('شهادة شكر وتوثيق ساعات تطوعية رسمية معتمدة', 'Volunteering hours official certification', 'Sijil penghargaan dan pengesahan jam sukarelawan rasmi'),
          t('عضوية شرفية وتسهيلات كبرى في برامج الأكاديمية المختلفة', 'Special access to Quranic circles and programs', 'Keahlian kehormat dan kemudahan dalam program akademi')
        ],
        statsTitle: t('عدد السفراء الحاليين', 'Active Ambassadors', 'Jumlah Duta Aktif'),
        statsDesc: t('أفراد فريق الأثر التطوعي', 'Volunteered in Athar campaigns', 'Ahli Pasukan Sukarelawan Athar'),
        statsVal: '48+',
        icon: 'Users'
      };

    default:
      return {
        badge: t('أكاديمية أثر للقرآن الكريم', 'ATHAR ACADEMY', 'AKADEMI ATHAR'),
        title: t('خدمة كتاب الله ونشر علومه', 'Serving the Holy Quran', 'Berkhidmat untuk Al-Quran'),
        desc: t(
          'أكاديمية تعليمية رائدة تعنى بتحفيظ القرآن الكريم وتجويده وتعليم العلوم الشرعية واللغة العربية.',
          'A leading educational institution dedicated to teaching the Holy Quran and Arabic.',
          'Institusi pendidikan terkemuka khusus mengajar Al-Quran dan Bahasa Arab.'
        ),
        perksTitle: t('أهم ما يميزنا:', 'What Distinguishes Us:', 'Keistimewaan Kami:'),
        perks: [
          t('كادر تعليمي مؤهل ومجاز بالسند المتصل', 'Qualified faculty with high connected Sanad', 'Barisan pendidik bertauliah bersambung Sanad'),
          t('مناهج دراسية متكاملة تركز على الجانب السلوكي والتربوي', 'Comprehensive curriculum focusing on manners and morals', 'Kurikulum komprehensif memupuk adab dan akhlak'),
          t('استخدام أحدث التقنيات والوسائل التعليمية التفاعلية', 'Utilizing state-of-the-art interactive teaching systems', 'Menggunakan sistem pembelajaran interaktif terkini')
        ],
        statsTitle: t('الطلاب والخريجين', 'Enrolled Pupils', 'Pelajar Terdaftar'),
        statsDesc: t('مسيرتنا مستمرة في نشر الخير', 'Continuous path of Quranic light', 'Laluan berterusan menyebarkan kebaikan'),
        statsVal: '1,240+',
        icon: 'Award'
      };
  }
};

const pickConsentText = (formId: string, lang: Language): string => {
  const t = (ar: string, en: string, ms: string) => {
    if (lang === 'ms') return ms;
    if (lang === 'en') return en;
    return ar;
  };

  switch (formId) {
    case 'register-circles':
      return t(
        'أتعهد بالالتزام بحضور الحلقات والمتابعة المستمرة مع المعلم والالتزام بلائحة الأكاديمية.',
        'I pledge to commit to circle attendance, follow up with the teacher, and respect the academy guidelines.',
        'Saya berjanji untuk komited dengan kehadiran halaqah, bekerjasama dengan guru, dan mematuhi peraturan akademi.'
      );
    case 'register-programs':
      return t(
        'أتعهد بالالتزام بحضور البرنامج والأنشطة المصاحبة له واحترام الضوابط التنظيمية.',
        'I pledge to commit to program attendance and respect all organizational guidelines.',
        'Saya berjanji untuk komited menghadiri program dan mematuhi garis panduan organisasi.'
      );
    case 'careers':
      return t(
        'أقر بصحة جميع البيانات المدونة في هذا الطلب، وبأنني مستعد لتقديم الوثائق الرسمية عند طلبها.',
        'I certify that all information provided is accurate and I am ready to present official documents upon request.',
        'Saya mengesahkan semua maklumat yang diberikan adalah benar dan bersedia mengemukakan dokumen rasmi jika diminta.'
      );
    case 'volunteer':
    case 'ambassadors':
      return t(
        'أتعهد بالالتزام بالصبر والدقة الفنية المعتمدة لـسفراء الأثر، وتقديم ساعات التطوع في مواعيدها المحددة بكل تفانٍ.',
        'I promise to respect the educational guidelines of Athar Academy and dedicate constructive hours on time.',
        'Saya berjanji untuk mematuhi garis panduan akademik Akademi Athar dan meluangkan masa sukarelawan dengan penuh komitmen.'
      );
    default:
      return t(
        'أقر بصحة البيانات المدونة والتزامي بضوابط وسياسات أكاديمية أثر.',
        'I certify that the information entered is correct and agree to respect Athar Academy policies.',
        'Saya mengesahkan maklumat yang dimasukkan adalah betul dan bersetuju mematuhi polisi Akademi Athar.'
      );
  }
};

export default function DynamicForm({ form, lang }: { form: FormDef; lang: Language }) {
  const fields = (form.fields || []).filter((f) => !f._hidden);
  const [values, setValues] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  const [error, setError] = useState('');
  const [tsToken, setTsToken] = useState('');

  // Payment states if QR is enabled
  const [method, setMethod] = useState<'form' | 'qr'>('form');
  const [qrAmount, setQrAmount] = useState<number>(150);
  const [customQrText, setCustomQrText] = useState('');
  const [donorName, setDonorName] = useState('');
  const [qrEmail, setQrEmail] = useState('');
  const [qrDone, setQrDone] = useState(false);

  const rawPresets = form.presets || '50, 100, 150, 500';
  const presets = rawPresets.split(',').map((n) => Number(n.trim())).filter((n) => !isNaN(n));

  const set = (key: string, v: string) => setValues((prev) => ({ ...prev, [key]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!consentChecked) {
      setError(lang === 'ar' ? 'يرجى الموافقة على التعهد للمتابعة' : 'Please check the consent to proceed');
      return;
    }

    for (const f of fields) {
      if (f.required && !(values[f.key] || '').trim()) {
        setError(lang === 'ar' ? 'يرجى تعبئة جميع الحقول المطلوبة' : 'Please fill all required fields');
        return;
      }
    }

    setSending(true);
    const payload: Record<string, string> = { 'النموذج': pick(form, 'title', 'ar') };
    for (const f of fields) {
      const label = pick(f, 'label', 'ar') || f.key;
      payload[label] = values[f.key] || '';
    }

    const ok = await submitForm(form.submitType || 'registration', payload, tsToken);
    setSending(false);
    if (ok) {
      setDone(true);
      setValues({});
    } else {
      setError(lang === 'ar' ? 'تعذّر الإرسال، حاول مرة أخرى' : 'Submission failed, try again');
    }
  };

  const handleQrSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!qrEmail.trim()) {
      setError(lang === 'ar' ? 'يرجى إدخال البريد الإلكتروني' : 'Please enter your email');
      return;
    }

    setSending(true);
    const payload = {
      'النموذج': `${pick(form, 'title', 'ar')} (دفع سريع QR)`,
      'الاسم': donorName || (lang === 'ar' ? 'فاعل خير' : 'Anonymous'),
      'البريد الإلكتروني': qrEmail,
      'المبلغ بالرنجت': `${qrAmount} RM`,
      'المرجع': form.qrRef || 'ATH-QR-8923',
    };
    const ok = await submitForm(form.submitType || 'registration', payload, tsToken);
    setSending(false);
    if (ok) {
      setQrDone(true);
      setDonorName('');
      setQrEmail('');
    } else {
      setError(lang === 'ar' ? 'تعذّر إرسال إشعار السداد، حاول مرة أخرى' : 'Payment submission failed, try again');
    }
  };

  const meta = getFormMeta(form, lang);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start select-none">
      
      {/* Left Column: Info & Details */}
      <div className="lg:col-span-5 space-y-6 text-left rtl:text-right">
        <div className="bg-brand-gold-light border-2 border-brand-gold/20 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="inline-flex items-center space-x-2 rtl:space-x-reverse text-brand-gold-dark bg-brand-gold/10 border border-brand-gold/25 rounded-full px-3.5 py-1.5 shadow-sm">
            <Users className="h-4 w-4 text-brand-gold" />
            <span className="text-[10px] uppercase tracking-widest font-mono font-extrabold">
              {meta.badge}
            </span>
          </div>

          <h3 className="text-xl font-serif font-bold text-brand-blue-dark font-classical leading-snug">
            {meta.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
            {meta.desc}
          </p>

          <div className="space-y-3 font-sans">
            <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-widest">
              {meta.perksTitle}
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 font-sans">
              {meta.perks.map((perk, pi) => (
                <li key={pi} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-gold shrink-0 mt-0.5" />
                  <span>{perk}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stats card */}
        <div className="bg-white border border-brand-gold/15 rounded-3xl p-6 shadow-sm flex items-center justify-between gap-5 col-span-1">
          <div className="flex items-center gap-3">
            <div className="p-3.5 bg-brand-gold-light rounded-2xl text-brand-gold-dark border border-brand-gold/20">
              <IconComponent name={meta.icon} className="h-6 w-6" />
            </div>
            <div>
              <h5 className="text-sm font-bold text-slate-800 font-classical">
                {meta.statsTitle}
              </h5>
              <p className="text-[11px] text-slate-400 font-sans">
                {meta.statsDesc}
              </p>
            </div>
          </div>
          <div className="text-2xl font-mono font-black text-brand-blue-dark">
            {meta.statsVal}
          </div>
        </div>
      </div>

      {/* Right Column: Form card */}
      <div className="lg:col-span-7 bg-white border border-brand-gold/15 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-gold-dark via-brand-gold to-brand-gold-light" />
        
        <h3 className="text-lg font-bold font-serif text-brand-blue-dark font-classical mb-4">
          {pick(form, 'title', lang)}
        </h3>

        {/* Tab switcher if QR payment is configured */}
        {form.qrImage && !done && !qrDone && (
          <div className="flex bg-slate-100 rounded-2xl p-1 mb-6 font-sans">
            <button
              type="button"
              onClick={() => setMethod('form')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                method === 'form'
                  ? 'bg-white text-brand-blue-dark shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <CreditCard className="h-4 w-4" />
              <span>{lang === 'ar' ? 'النموذج الإلكتروني' : lang === 'ms' ? 'Borang Sinar' : 'Electronic Form'}</span>
            </button>
            <button
              type="button"
              onClick={() => setMethod('qr')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                method === 'qr'
                  ? 'bg-white text-brand-blue-dark shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <QrCode className="h-4 w-4" />
              <span>{lang === 'ar' ? 'سداد سريع بالرمز' : lang === 'ms' ? 'Bayar Pantas QR' : 'Quick QR Pay'}</span>
            </button>
          </div>
        )}

        {method === 'qr' && form.qrImage ? (
          qrDone ? (
            <div className="py-12 text-center space-y-6 animate-in fade-in duration-300">
              <div className="mx-auto w-20 h-20 bg-brand-gold/15 text-brand-gold rounded-full flex items-center justify-center border-2 border-brand-gold shadow-lg">
                <Sparkles className="h-10 w-10 animate-bounce" />
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-bold font-serif text-brand-blue-dark font-classical">
                  {lang === 'ar' ? 'جزاكم الله خيراً!' : lang === 'ms' ? 'Terima Kasih!' : 'Thank you!'}
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed font-sans px-2">
                  {lang === 'ar' 
                    ? 'تم تسجيل إشعار التحويل المالي وسنتأكد من السداد قريباً.' 
                    : 'Your simulated QR payment notice has been successfully simulated.'}
                </p>
              </div>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setQrDone(false);
                  }}
                  className="text-xs text-brand-gold-dark hover:text-brand-blue font-bold font-sans hover:underline cursor-pointer"
                >
                  {lang === 'ar' ? '← تقديم طلب سداد آخر' : '← Submit another notice'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleQrSubmit} className="space-y-5 text-left rtl:text-right font-sans">
              <div className="text-center space-y-2">
                <p className="text-xs text-slate-500 font-sans max-w-sm mx-auto leading-relaxed">
                  {lang === 'ar' ? 'امسح الكود الظاهر لتأكيد السداد بالأسفل.' : 'Scan the code below to complete the payment.'}
                </p>
              </div>

              {presets.length > 0 && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 font-sans mb-2.5 uppercase tracking-wider">
                    {lang === 'ar' ? 'حدد مبلغ السداد السريع' : 'Select Quick Amount'}
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
                            ? 'bg-brand-gold-light border-brand-gold text-brand-gold-dark shadow-sm'
                            : 'bg-white border-slate-200 hover:border-brand-gold text-slate-700'
                        }`}
                      >
                        {amount} RM
                      </button>
                    ))}
                  </div>
                  
                  <div className="mt-3 bg-brand-gold-light/20 p-2 border border-brand-gold/10 rounded-xl flex items-center justify-between gap-3 text-xs">
                    <span className="text-slate-500 font-sans text-[11px] shrink-0 font-bold">
                      {lang === 'ar' ? 'أو مبلغ آخر مخصص:' : 'Or Custom Amount:'}
                    </span>
                    <div className="relative w-full font-mono">
                      <input
                        type="number"
                        min="1"
                        value={customQrText}
                        onChange={(e) => {
                          setCustomQrText(e.target.value);
                          const parsed = parseFloat(e.target.value);
                          setQrAmount(isNaN(parsed) ? 0 : parsed);
                        }}
                        placeholder="مثال: 250"
                        className="w-full bg-white border border-slate-200 outline-none p-1.5 px-3 rounded-lg text-xs text-slate-800 text-left rtl:text-right"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* QR Image Display */}
              <div className="flex flex-col items-center justify-center p-6 bg-brand-gold-light/45 border border-brand-gold/20 rounded-3xl relative">
                <div className="absolute top-2 right-2 rtl:left-2 rtl:right-auto text-[9px] font-mono text-slate-400 bg-white border border-brand-gold/10 px-2 py-0.5 rounded-md">
                  {form.qrRef || 'REF: ATH-QR-8923'}
                </div>
                <div className="relative w-44 h-44 bg-white p-3 rounded-2xl shadow-md border border-brand-gold/25 flex items-center justify-center group select-none overflow-hidden">
                  <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-brand-gold to-transparent animate-bounce top-4" />
                  <img src={form.qrImage} alt="QR Code" className="w-full h-full object-contain" />
                </div>
                <div className="mt-4 text-center font-mono text-sm font-extrabold text-brand-blue-dark flex items-center justify-center gap-1.5 bg-white border border-brand-gold/20 px-4 py-1.5 rounded-full shadow-sm">
                  <Smartphone className="h-4 w-4 text-brand-gold animate-bounce" />
                  <span>{qrAmount} RM</span>
                </div>
              </div>

              {/* Payer info */}
              <div className="space-y-4 font-sans">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-655 mb-1.5 uppercase tracking-wide">
                      {lang === 'ar' ? 'اسم الطالب / المسدد' : 'Your Name'}
                    </label>
                    <input
                      type="text"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      placeholder={lang === 'ar' ? 'يكتب هنا الاسم لشهادة السداد...' : 'Enter your name...'}
                      className="w-full bg-white border border-slate-200 focus:border-brand-gold outline-none p-3 px-4 rounded-xl text-xs sm:text-sm font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-655 mb-1.5 uppercase tracking-wide">
                      {lang === 'ar' ? 'البريد الإلكتروني للرد' : 'Email Address'}
                    </label>
                    <input
                      type="email"
                      required
                      value={qrEmail}
                      onChange={(e) => setQrEmail(e.target.value)}
                      placeholder="mail@example.com"
                      className="w-full bg-[#FFFFFF] border border-slate-200 focus:border-brand-gold outline-none p-3 px-4 rounded-xl text-xs sm:text-sm font-sans text-left rtl:text-right"
                    />
                  </div>
                </div>
              </div>

              {error && <p className="text-xs text-red-650 text-center font-semibold">{error}</p>}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-brand-blue-dark text-brand-gold hover:bg-brand-gold hover:text-brand-blue-dark transition-all font-serif font-bold text-xs p-4 rounded-2xl uppercase tracking-wider shadow-md hover:scale-[1.01] duration-300 font-classical cursor-pointer select-none flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4.5 w-4.5" />}
                  <span>
                    {lang === 'ar' ? `تأكيد السداد بقيمة ${qrAmount} رنجت` : `Confirm Payment of ${qrAmount} RM`}
                  </span>
                </button>
                <div className="flex items-center justify-center gap-1.5 mt-3 text-[10px] text-slate-400 font-sans select-none">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  <span>{lang === 'ar' ? 'بوابة سداد افتراضية آمنة 100%' : '100% secure simulated payment sandbox'}</span>
                </div>
              </div>
            </form>
          )
        ) : done ? (
          <div className="py-12 text-center space-y-6 animate-in fade-in duration-300">
            <div className="mx-auto w-20 h-20 bg-brand-gold/15 text-brand-gold rounded-full flex items-center justify-center border-2 border-brand-gold shadow-lg">
              <Award className="h-10 w-10 animate-bounce" />
            </div>
            <div className="space-y-2">
              <h4 className="text-xl font-bold font-serif text-brand-blue-dark font-classical">
                {lang === 'ar' ? 'نشكرك على التسجيل!' : lang === 'ms' ? 'Pendaftaran Diterima!' : 'Thank you for registering!'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed font-sans">
                {pick(form, 'success', lang) || (lang === 'ar' ? 'تم استلام طلبك بنجاح! سنتواصل معك قريباً.' : 'Received! We will contact you soon.')}
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={() => {
                  setDone(false);
                  setConsentChecked(false);
                }}
                className="text-xs text-brand-gold-dark hover:text-brand-blue font-bold font-sans hover:underline cursor-pointer"
              >
                {lang === 'ar' ? '← تقديم طلب آخر' : lang === 'ms' ? '← Hantar permohonan lain' : '← Submit another request'}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 text-left rtl:text-right font-sans">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fields.map((f, i) => {
                const label = pick(f, 'label', lang) || f.key;
                const common = 'w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-brand-gold bg-slate-50/50 focus:bg-white transition font-sans';
                const full = f.type === 'textarea' ? 'sm:col-span-2' : '';
                return (
                  <div key={i} className={`space-y-1.5 ${full}`}>
                    <label className="block text-[10px] font-bold text-slate-660 uppercase tracking-wide">
                      {label} {f.required && <span className="text-red-500">*</span>}
                    </label>
                    {f.type === 'textarea' ? (
                      <textarea
                        required={f.required}
                        value={values[f.key] || ''}
                        onChange={(e) => set(f.key, e.target.value)}
                        rows={3}
                        className={common + ' resize-none'}
                      />
                    ) : f.type === 'select' ? (
                      <div className="relative">
                        <select
                          required={f.required}
                          value={values[f.key] || ''}
                          onChange={(e) => set(f.key, e.target.value)}
                          className={common + ' cursor-pointer appearance-none pr-10 rtl:pl-10 rtl:pr-4'}
                        >
                          <option value="">—</option>
                          {(f.options || '').split(',').map((o, oi) => (
                            <option key={oi} value={o.trim()} className="bg-white text-slate-800 font-sans">{o.trim()}</option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 rtl:left-0 rtl:right-auto flex items-center px-3.5 pointer-events-none text-slate-400">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    ) : (
                      <input
                        required={f.required}
                        type={f.type === 'email' ? 'email' : f.type === 'tel' ? 'tel' : f.type === 'number' ? 'number' : 'text'}
                        value={values[f.key] || ''}
                        onChange={(e) => set(f.key, e.target.value)}
                        dir={f.type === 'tel' || f.type === 'email' ? 'ltr' : undefined}
                        className={common}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {error && <p className="text-xs text-red-650 text-center font-semibold">{error}</p>}

            {/* Consent Checkbox */}
            <label className="flex items-start gap-2.5 pt-1 font-sans cursor-pointer select-none">
              <input
                type="checkbox"
                required
                checked={consentChecked}
                onChange={(e) => setConsentChecked(e.target.checked)}
                className="mt-1 h-4.5 w-4.5 rounded border-slate-300 text-brand-blue-dark focus:ring-brand-gold accent-brand-gold cursor-pointer shrink-0"
              />
              <span className="text-[11px] text-slate-500 leading-relaxed font-sans">
                {pickConsentText(form.id, lang)}
              </span>
            </label>

            <TurnstileWidget onVerify={setTsToken} />

            <div className="pt-2">
              <button
                type="submit"
                disabled={sending}
                className="w-full bg-brand-blue-dark text-brand-gold hover:bg-brand-gold hover:text-brand-blue-dark transition-all font-serif font-bold text-xs p-4 rounded-2xl uppercase tracking-wider shadow-md hover:scale-[1.01] duration-300 font-classical cursor-pointer select-none flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                <span>
                  {pick(form, 'submitLabel', lang) || (lang === 'ar' ? 'إرسال الطلب' : lang === 'ms' ? 'Hantar' : 'Submit')}
                </span>
              </button>
            </div>
          </form>
        )}
      </div>

    </div>
  );
}
