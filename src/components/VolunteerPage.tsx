'use client';
import React, { useState } from 'react';
import { 
  Users, Gift, CheckCircle2, Award, Heart, 
  Send, ShieldCheck, Mail, User, Sparkles, CheckSquare,
  Briefcase, BookOpen, GraduationCap
} from 'lucide-react';
import { Language } from '@/types';
import { submitForm } from '@/lib/submit-form';
import { FormDef } from './DynamicForm';

interface VolunteerPageProps {
  currentLang: Language;
  form?: FormDef;
}

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
      return <Users className={className} />;
  }
};

export default function VolunteerPage({ currentLang, form }: VolunteerPageProps) {
  // Volunteer State
  const [volunteerName, setVolunteerName] = useState('');
  const [volunteerEmail, setVolunteerEmail] = useState('');
  const [volunteerSkill, setVolunteerSkill] = useState('teaching');
  const [volunteerReason, setVolunteerReason] = useState('');
  const [volunteerCommitment, setVolunteerCommitment] = useState('5');
  const [volunteerSuccess, setVolunteerSuccess] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getTranslation = (ar: string, en: string, ms: string) => {
    if (currentLang === 'ms') return ms;
    if (currentLang === 'en') return en;
    return ar;
  };

  const pick = (obj: any, base: string, lang: Language): string => {
    if (!obj) return '';
    if (lang === 'ms') return obj[`${base}Ms`] || obj[`${base}En`] || obj[`${base}Ar`] || '';
    if (lang === 'en') return obj[`${base}En`] || obj[`${base}Ar`] || '';
    return obj[`${base}Ar`] || obj[`${base}En`] || '';
  };

  const hasCustomSide = !!(form && (form.sideTitleAr || form.sideTitleEn || form.sideTitleMs));

  const sidebarData = React.useMemo(() => {
    if (hasCustomSide && form) {
      const rawPerks = pick(form, 'sidePerks', currentLang);
      const perks = rawPerks ? rawPerks.split('\n').map((p: string) => p.trim()).filter(Boolean) : [];
      return {
        badge: pick(form, 'sideBadge', currentLang) || getTranslation('رسالة وهدف الفريق', 'OUR MISSION', 'MISI KAMI'),
        title: pick(form, 'sideTitle', currentLang) || getTranslation('نشر كتاب الله وبناء الأثر الصالح', 'Spreading Quranic Light Together', 'Menyebarkan Cahaya Al-Quran Bersama'),
        desc: pick(form, 'sideDesc', currentLang) || getTranslation(
          'نهدف عبر فريق سفراء الأثر إلى تنظيم الجهود الخدمية والتقنية والتواصلية ومساندة الحفاظ الصالحين في رحلتهم مع كتاب الله لتيسير التلاوة والتدبر.',
          'Volunteer hours inside Athar Quran Academy are celebrated and calculated under general non-profit guidance, enabling youths to gain certified skills.',
          'Kami bertujuan untuk menyelaraskan usaha khidmat, teknikal, dan komunikasi bagi menyokong para penghafal Al-Quran dalam perjalanan mereka.'
        ),
        perksTitle: pick(form, 'sidePerksTitle', currentLang) || getTranslation('امتيازات الانضمام للفريق:', 'Volunteer Privileges', 'Keistimewaan Menyertai Pasukan:'),
        perks: perks.length > 0 ? perks : [
          getTranslation('ثبوت الأجر ومصاحبة ركب أهل القرآن', 'Sadaqah Jariyah continuous reward', 'Ganjaran pahala berterusan dan bersama para penghafal Al-Quran'),
          getTranslation('شهادة شكر وتوثيق ساعات تطوعية رسمية', 'Volunteering hours official certification', 'Sijil penghargaan dan pengesahan jam sukarelawan rasmi'),
          getTranslation('عضوية شرفية وتسهيلات كبرى في برامج الأكاديمية', 'Special access to Quranic circles', 'Keahlian kehormat dan kemudahan dalam program akademi')
        ],
        statsTitle: pick(form, 'sideStatsTitle', currentLang) || getTranslation('عدد السفراء الحاليين', 'Active Ambassadors', 'Jumlah Duta Aktif'),
        statsDesc: pick(form, 'sideStatsDesc', currentLang) || getTranslation('أفراد فريق الأثر التطوعي', 'Volunteered in Athar campaigns', 'Ahli Pasukan Sukarelawan Athar'),
        statsVal: (form as any).sideStatsVal || '+48',
        statsIcon: (form as any).sideStatsIcon || 'Users'
      };
    }
    return {
      badge: getTranslation('رسالة وهدف الفريق', 'OUR MISSION', 'MISI KAMI'),
      title: getTranslation('نشر كتاب الله وبناء الأثر الصالح', 'Spreading Quranic Light Together', 'Menyebarkan Cahaya Al-Quran Bersama'),
      desc: getTranslation(
        'نهدف عبر فريق سفراء الأثر إلى تنظيم الجهود الخدمية والتقنية والتواصلية ومساندة الحفاظ الصالحين في رحلتهم مع كتاب الله لتيسير التلاوة والتدبر.',
        'Volunteer hours inside Athar Quran Academy are celebrated and calculated under general non-profit guidance, enabling youths to gain certified skills.',
        'Kami bertujuan untuk menyelaraskan usaha khidmat, teknikal, dan komunikasi bagi menyokong para penghafal Al-Quran dalam perjalanan mereka.'
      ),
      perksTitle: getTranslation('امتيازات الانضمام للفريق:', 'Volunteer Privileges', 'Keistimewaan Menyertai Pasukan:'),
      perks: [
        getTranslation('ثبوت الأجر ومصاحبة ركب أهل القرآن', 'Sadaqah Jariyah continuous reward', 'Ganjaran pahala berterusan dan bersama para penghafal Al-Quran'),
        getTranslation('شهادة شكر وتوثيق ساعات تطوعية رسمية', 'Volunteering hours official certification', 'Sijil penghargaan dan pengesahan jam sukarelawan rasmi'),
        getTranslation('عضوية شرفية وتسهيلات كبرى في برامج الأكاديمية', 'Special access to Quranic circles', 'Keahlian kehormat dan kemudahan dalam program akademi')
      ],
      statsTitle: getTranslation('عدد السفراء الحاليين', 'Active Ambassadors', 'Jumlah Duta Aktif'),
      statsDesc: getTranslation('أفراد فريق الأثر التطوعي', 'Volunteered in Athar campaigns', 'Ahli Pasukan Sukarelawan Athar'),
      statsVal: '+48',
      statsIcon: 'Users'
    };
  }, [form, currentLang, hasCustomSide]);

  const handleVolunteerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!volunteerName || !volunteerEmail || !volunteerReason || !consentChecked) return;
    
    setIsSubmitting(true);
    
    const payload = {
      'النموذج': 'انضم كمتطوع (سفراء الأثر)',
      'اسم المتطوع': volunteerName,
      'البريد الإلكتروني': volunteerEmail,
      'المسار التطوعي': volunteerSkill,
      'ساعات التطوع': volunteerCommitment,
      'الدافع للانضمام': volunteerReason
    };
    
    const success = await submitForm('volunteer', payload);
    setIsSubmitting(false);
    
    if (success) {
      setVolunteerSuccess(true);
    }
  };

  const resetForm = () => {
    setVolunteerSuccess(false);
    setVolunteerName('');
    setVolunteerEmail('');
    setVolunteerReason('');
    setConsentChecked(false);
  };

  return (
    <section id="volunteer" className="py-8 bg-white text-slate-800 relative z-10 selection:bg-brand-gold/30">
      
      {/* Decorative patterns and elements */}
      <div className="absolute inset-0 islamic-pattern opacity-[0.06] pointer-events-none" />
      <div className="absolute top-20 left-10 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-gold-light/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl">
        
        {/* Header Slogan */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center space-x-2 rtl:space-x-reverse text-brand-gold-dark bg-brand-gold/10 border border-brand-gold/25 rounded-full px-4 py-1.5 shadow-sm">
            <Users className="h-4 w-4 text-brand-gold" />
            <span className="text-xs uppercase tracking-widest font-mono font-extrabold">
              {getTranslation('فريق سفراء الأثر التطوعي', 'SFARAA AL-ATHAR TEAM', 'PASUKAN DUTA SUKARELAWAN ATHAR')}
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-blue-dark tracking-tight font-classical">
            {getTranslation('انضم كمتطوع', 'Join as a Volunteer', 'Sertai sebagai Sukarelawan')}
          </h2>
          
          <p className="text-brand-blue font-serif text-base sm:text-lg font-bold font-classical leading-relaxed max-w-2xl mx-auto">
            {getTranslation(
              'كن جزءاً من فريق أثر التطوعي وساهم في نشر تعليم القرآن الكريم.',
              'Be a part of Athar volunteer team and contribute to spreading the teaching of the Holy Quran.',
              'Sertai pasukan sukarelawan Athar dan sumbangkan tenaga dalam menyebarkan ajaran Al-Quran.'
            )}
          </p>
          
          <p className="text-slate-500 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-sans">
            {getTranslation(
              'نهيئ الدروب لقنوات الخير، ونفتح الأبواب لكل صاحب مهارة يسعى بوقته وفطنته لخدمة طلبة الحلقات والمقارئ والبراعم.',
              'Our volunteer ambassadors work globally to support Quranic e-learning, create assets, and help students feel connected.',
              'Kami menyediakan laluan kebajikan dan membuka peluang bagi sesiapa yang ingin menyumbang masa dan kemahiran mereka untuk menyokong pelajar Quran.'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Slogan and details column */}
          <div className="lg:col-span-5 space-y-6 text-left rtl:text-right">
            
            <div className="bg-brand-gold-light border-2 border-brand-gold/20 rounded-3xl p-6 sm:p-8 space-y-6">
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-brand-gold block">
                {sidebarData.badge}
              </span>
              
              <h3 className="text-xl font-serif font-bold text-brand-blue-dark font-classical leading-snug">
                {sidebarData.title}
              </h3>
              
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                {sidebarData.desc}
              </p>

              {/* Perks list */}
              <div className="space-y-3 font-sans">
                <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-widest">
                  {sidebarData.perksTitle}
                </h4>
                <ul className="space-y-2 text-xs text-slate-600 font-sans">
                  {sidebarData.perks.map((perk, pi) => (
                    <li key={pi} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-brand-gold shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Current volunt stats */}
            <div className="bg-white border border-brand-gold/15 rounded-3xl p-6 shadow-sm flex items-center justify-between gap-5 col-span-1">
              <div className="flex items-center gap-3">
                <div className="p-3.5 bg-brand-gold-light rounded-2xl text-brand-gold-dark border border-brand-gold/20">
                  <IconComponent name={sidebarData.statsIcon} className="h-6 w-6" />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-slate-800 font-classical">
                    {sidebarData.statsTitle}
                  </h5>
                  <p className="text-[11px] text-slate-400 font-sans">
                    {sidebarData.statsDesc}
                  </p>
                </div>
              </div>
              <div className="text-2xl font-mono font-black text-brand-blue-dark">
                {sidebarData.statsVal}
              </div>
            </div>

          </div>

          {/* Form column */}
          <div className="lg:col-span-7 bg-white border border-brand-gold/15 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-gold-dark via-brand-gold to-brand-gold-light" />
            
            <h3 className="text-lg font-bold font-serif text-brand-blue-dark font-classical mb-4">
              {getTranslation('طلب الالتحاق بفريق سفراء الأثر', 'Application Form', 'Borang Permohonan Sertai')}
            </h3>

            {volunteerSuccess ? (
              <div className="py-12 text-center space-y-6">
                <div className="mx-auto w-20 h-20 bg-brand-gold/15 text-brand-gold rounded-full flex items-center justify-center border-2 border-brand-gold shadow-lg">
                  <Award className="h-10 w-10 animate-spin" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-bold font-serif text-brand-blue-dark font-classical">
                    {getTranslation('نشكر رغبتك الصادقة بالتطوع!', 'Application Registered!', 'Permohonan Diterima!')}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed font-sans">
                    {getTranslation(
                      `السلام عليكم ورحمة الله وبركاته يا ${volunteerName}! تم استلام طلبك ومسارك للانضمام لـسفراء الأثر بنجاح. سيتصل بك فريق تنسيق الموارد البشرية لضبط مقابلة ترحيبية عبر: ${volunteerEmail}.`,
                      `Assalamu Alaikum ${volunteerName}! Your volunteer request to join Sfaraa Al-Athar was simulated successfully. We will contact you via ${volunteerEmail} soon.`,
                      `Assalamu Alaikum ${volunteerName}! Permohonan sukarelawan anda untuk menyertai Sfaraa Al-Athar telah berjaya didaftarkan. Kami akan menghubungi anda melalui ${volunteerEmail} tidak lama lagi.`
                    )}
                  </p>
                </div>

                <div className="inline-flex items-center gap-3 bg-brand-gold/10 border border-brand-gold/40 rounded-full px-5 py-2">
                  <Sparkles className="h-4 w-4 text-brand-gold animate-bounce" />
                  <span className="text-[11px] font-bold font-serif text-brand-gold-dark font-classical">
                    {getTranslation('كنز الأثر والثواب الصالح', 'Athar Ambassador Nominee Badge', 'Ganjaran dan Pahala Amal Jariah')}
                  </span>
                </div>

                <div className="pt-4">
                  <button
                    onClick={resetForm}
                    className="text-xs text-brand-gold-dark hover:text-brand-blue font-bold font-sans hover:underline cursor-pointer"
                  >
                    {getTranslation('← مراجعة أو تعديل طلبي', '← Review another submission', '← Hantar permohonan lain')}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleVolunteerSubmit} className="space-y-5 font-sans text-left rtl:text-right">
                
                {/* Name & email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-1.5 uppercase tracking-wide">
                      {getTranslation('اسم المتطوع الثلاثي', 'Full Name', 'Nama Penuh')}
                    </label>
                    <div className="relative">
                      <User className="absolute top-3.5 left-3.5 rtl:right-3.5 rtl:left-auto h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={volunteerName}
                        onChange={(e) => setVolunteerName(e.target.value)}
                        placeholder={getTranslation('مثال: أحمد الحربي', 'E.g. Ahmad Al-Harbi', 'cth. Ahmad Al-Harbi')}
                        className="w-full bg-white border border-slate-200 focus:border-brand-gold outline-none p-3 pl-10 rtl:pr-10 rtl:pl-3 rounded-xl text-xs sm:text-sm font-sans"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-1.5 uppercase tracking-wide">
                      {getTranslation('البريد الإلكتروني للرد', 'Primary Email', 'E-mel Utama')}
                    </label>
                    <div className="relative">
                      <Mail className="absolute top-3.5 left-3.5 rtl:right-3.5 rtl:left-auto h-4 w-4 text-slate-400" />
                      <input
                        type="email"
                        required
                        value={volunteerEmail}
                        onChange={(e) => setVolunteerEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full bg-white border border-slate-200 focus:border-brand-gold outline-none p-3 pl-10 rtl:pr-10 rtl:pl-3 rounded-xl text-xs sm:text-sm font-sans text-left rtl:text-right"
                      />
                    </div>
                  </div>
                </div>

                {/* Stream / Skill Specialization */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 mb-1.5 uppercase tracking-wide font-sans">
                    {getTranslation('حدد المسار المناسب لمهارتك', 'Select Volunteer Specialization', 'Pilih Bidang Pengkhususan Sukarelawan')}
                  </label>
                  <div className="relative">
                    <select
                      value={volunteerSkill}
                      onChange={(e) => setVolunteerSkill(e.target.value)}
                      className="w-full bg-white border border-slate-200 focus:border-brand-gold outline-none p-3 px-4 pr-10 rtl:pl-10 rtl:pr-4 rounded-xl text-xs sm:text-sm font-sans cursor-pointer appearance-none animate-none"
                    >
                      <option value="teaching" className="bg-white text-slate-800 font-sans">{getTranslation('تحفيظ وتصحيح مخارج تلاوة للأطفال', 'Quran Teaching & Recitation Guidance', 'Pengajaran Al-Quran & Bimbingan Bacaan')}</option>
                      <option value="design" className="bg-white text-slate-800 font-sans">{getTranslation('إنتاج وتصميم بصري ومونتاج لمقاطع التحفيظ', 'Graphic Design & Video Editing', 'Reka Bentuk Grafik & Penyuntingan Video')}</option>
                      <option value="marketing" className="bg-white text-slate-800 font-sans">{getTranslation('إدارة حسابات شبكات التواصل ونشر التغريدات القرآنية', 'Social Media Advocacy & Copywriting', 'Pengurusan Media Sosial & Penulisan Iklan')}</option>
                      <option value="tech" className="bg-white text-slate-800 font-sans">{getTranslation('المساعدة البرمجية وتطوير واجهات المنصة الهادئة', 'Software Development & Support', 'Pembangunan Perisian & Sokongan Teknis')}</option>
                      <option value="coordination" className="bg-white text-slate-800 font-sans">{getTranslation('تنظيم شؤون المواعيد والحلقات والمتابعة مع الآباء', 'General Event Coordination', 'Pengurusan Acara Am & Penyelarasan')}</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 rtl:left-0 rtl:right-auto flex items-center px-3.5 pointer-events-none text-slate-400">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Commitment hours */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 mb-1.5 uppercase tracking-wide">
                    {getTranslation('ساعات التطوع الأسبوعية المتاحة لديك', 'Weekly Commitment Availability', 'Komitmen Jam Mingguan')}
                  </label>
                  <div className="grid grid-cols-3 gap-3 font-mono text-xs">
                    {[
                      { key: '2', valEn: '2 hrs / wk', valAr: 'ساعتين / أسبوع', valMs: '2 jam / minggu' },
                      { key: '5', valEn: '5 hrs / wk', valAr: '٥ ساعات / أسبوع', valMs: '5 jam / minggu' },
                      { key: '10', valEn: '10+ hrs / wk', valAr: '١٠+ ساعات', valMs: '10+ jam' }
                    ].map((hrs) => (
                      <button
                        key={hrs.key}
                        type="button"
                        onClick={() => setVolunteerCommitment(hrs.key)}
                        className={`p-3 rounded-xl border text-center transition-all cursor-pointer font-bold ${
                          volunteerCommitment === hrs.key
                            ? 'bg-brand-gold-light border-brand-gold text-brand-gold-dark shadow-sm'
                            : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        {getTranslation(hrs.valAr, hrs.valEn, hrs.valMs)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Motivation / Reason */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 mb-1.5 uppercase tracking-wide">
                    {getTranslation(
                      'اكتب لنا دافعك للانضمام وسيرتك الوجيزة مع كتاب الله',
                      'Why do you love to join?',
                      'Mengapa anda ingin sertai kami? (Nyatakan sebab & latar belakang ringkas)'
                    )}
                  </label>
                  <textarea
                    required
                    value={volunteerReason}
                    onChange={(e) => setVolunteerReason(e.target.value)}
                    placeholder={
                      getTranslation(
                        'أدخل كلمات وجيزة تبين دافعك للتطوع مع سفراء أثر...',
                        'Briefly express why you want to support Quranic teaching...',
                        'Nyatakan sebab anda mahu menyokong Akademi Athar...'
                      )
                    }
                    className="w-full bg-white border border-slate-200 focus:border-brand-gold outline-none p-3 px-4 rounded-xl text-xs sm:text-sm font-sans h-24"
                  />
                </div>

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
                    {getTranslation(
                      'أتعهد بالالتزام بالصبر والدقة الفنية المعتمدة لـسفراء الأثر، وتقديم ساعات التطوع في مواعيدها المحددة بكل تفانٍ.',
                      'I promise to respect the educational guidelines of Athar Academy and dedicate constructive hours on time.',
                      'Saya berjanji untuk mematuhi garis panduan akademik Akademi Athar dan meluangkan masa sukarelawan dengan penuh komitmen.'
                    )}
                  </span>
                </label>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-blue-dark text-brand-gold hover:bg-brand-gold hover:text-brand-blue-dark transition-all font-serif font-bold text-xs p-4 rounded-2xl uppercase tracking-wider shadow-md hover:scale-[1.01] duration-300 font-classical cursor-pointer select-none disabled:opacity-50"
                  >
                    {isSubmitting
                      ? getTranslation('جاري الإرسال...', 'Submitting...', 'Menghantar...')
                      : getTranslation('تأكيد إرسال طلب الانضمام كمتطوع', 'Submit Volunteer Application', 'Hantar Permohonan Sukarelawan')}
                  </button>
                </div>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
