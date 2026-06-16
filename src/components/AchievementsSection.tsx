'use client';
import React, { useEffect } from 'react';
import { Award, Users, BookOpen, Heart, Sparkles, Star, Target } from 'lucide-react';
import { Language, getLangField } from '@/types';
import { useStats, useStudentProfiles } from '@/lib/content-provider';
import SmartImg from '@/components/SmartImg';

interface AchievementsSectionProps {
  currentLang: Language;
  activeSub?: string;
}

export default function AchievementsSection({ currentLang, activeSub }: AchievementsSectionProps) {
  const ACADEMY_STATS = useStats();
  const STUDENT_PROFILES = useStudentProfiles();
  const [activeTab, setActiveTab] = React.useState('stats');

  useEffect(() => {
    if (activeSub) {
      if (activeSub === 'success-stories') setActiveTab('success-stories');
      else if (activeSub === 'stats') setActiveTab('stats');
      else if (activeSub === 'ambassadors') setActiveTab('ambassadors');
    }
  }, [activeSub]);

  const tabs = [
    { id: 'stats', labelAr: 'الإحصائيات والمنجزات', labelEn: 'Stats & Achievements', labelMs: 'Statistik & Pencapaian' },
    { id: 'success-stories', labelAr: 'قصص النجاح', labelEn: 'Success Stories', labelMs: 'Kisah Kejayaan' },
    { id: 'ambassadors', labelAr: 'سفراء الأثر', labelEn: 'Impact Ambassadors', labelMs: 'Duta Impak' },
  ];

  return (
    <section className="relative bg-brand-sand py-16 overflow-hidden min-h-[70vh]">
      <div className="absolute inset-0 islamic-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest font-bold text-brand-gold">
            {currentLang === 'ms' ? 'Impak & Hasil Kami' : currentLang === 'en' ? 'Our Impact & Output' : 'الإنجازات ومسيرة الأثر الطيب'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-blue-dark mt-2">
            {currentLang === 'ms' ? 'Pencapaian & Statistik' : currentLang === 'en' ? 'Achievements & Statistics' : 'إحصائياتنا وقصص نجاح طلابنا'}
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

          {/* STATS & ACHIEVEMENTS */}
          {activeTab === 'stats' && (
            <div className="space-y-8 animate-in fade-in duration-500 text-right rtl:text-right ltr:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-brand-blue-dark flex items-center gap-2 border-b border-brand-gold/15 pb-4">
                <Target className="h-6 w-6 text-brand-gold" />
                <span>{currentLang === 'ms' ? 'Dashboard Statistik' : currentLang === 'en' ? 'Statistical Dashboard' : 'حصاد إحصائيات الأثر بالأرقام'}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
                {/* 1 */}
                <div className="bg-brand-gold/5 border border-brand-gold/20 p-6 rounded-2xl text-center flex flex-col justify-between">
                  <div className="p-3 bg-brand-gold/10 text-brand-gold-dark rounded-xl mx-auto mb-3 w-12">
                    <Users className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">{currentLang === 'ms' ? 'Jumlah Halaqah Al-Quran' : currentLang === 'en' ? 'Total Quran Circles' : 'إجمالي الحلقات القرآنية'}</span>
                  <span className="text-4xl font-extrabold text-brand-blue-dark font-sans mt-2 block">{ACADEMY_STATS.circlesCount}</span>
                  <span className="text-[10px] text-slate-500 font-sans mt-1 block">
                    {currentLang === 'ms' ? `${ACADEMY_STATS.sponsoredCircles} ditaja, ${ACADEMY_STATS.unsponsoredCircles} memerlukan penajaan` : currentLang === 'en' ? `${ACADEMY_STATS.sponsoredCircles} sponsored, ${ACADEMY_STATS.unsponsoredCircles} unsponsored` : `${ACADEMY_STATS.sponsoredCircles} مكفولة، ${ACADEMY_STATS.unsponsoredCircles} بانتظار الكفالة`}
                  </span>
                </div>
                {/* 2 */}
                <div className="bg-brand-gold/5 border border-brand-gold/20 p-6 rounded-2xl text-center flex flex-col justify-between">
                  <div className="p-3 bg-brand-gold/10 text-brand-gold-dark rounded-xl mx-auto mb-3 w-12">
                    <Star className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">{currentLang === 'ms' ? 'Pelajar Aktif' : currentLang === 'en' ? 'Active Students' : 'الطلاب والطالبات المسجلين'}</span>
                  <span className="text-4xl font-extrabold text-brand-blue-dark font-sans mt-2 block">{ACADEMY_STATS.studentsCount}</span>
                  <span className="text-[10px] text-slate-500 font-sans mt-1 block">
                    {currentLang === 'ms' ? 'Pendaftaran berterusan sepanjang tahun' : currentLang === 'en' ? 'Continuous year-round enrollment' : 'متابعة يومية حية لخطط الحفظ'}
                  </span>
                </div>
                {/* 3 */}
                <div className="bg-brand-gold/5 border border-brand-gold/20 p-6 rounded-2xl text-center flex flex-col justify-between">
                  <div className="p-3 bg-brand-gold/10 text-brand-gold-dark rounded-xl mx-auto mb-3 w-12">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">{currentLang === 'ms' ? 'Penerima Manfaat Simaan' : currentLang === 'en' ? 'Recital Beneficiaries' : 'مستفيدي برنامج مع السفرة'}</span>
                  <span className="text-4xl font-extrabold text-brand-blue-dark font-sans mt-2 block">{ACADEMY_STATS.totalBeneficiaries}</span>
                  <span className="text-[10px] text-slate-500 font-sans mt-1 block">
                    {currentLang === 'ms' ? 'Simaan Al-Quran dalam sekali duduk' : currentLang === 'en' ? 'Quran recital in a single sitting' : 'لسرد كامل المحفوظ للعامين الماضيين'}
                  </span>
                </div>
                {/* 4 */}
                <div className="bg-brand-gold/5 border border-brand-gold/20 p-6 rounded-2xl text-center flex flex-col justify-between">
                  <div className="p-3 bg-brand-gold/10 text-brand-gold-dark rounded-xl mx-auto mb-3 w-12">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">{currentLang === 'ms' ? 'Penerima Manfaat Kem Belia' : currentLang === 'en' ? 'Youth Camp Beneficiaries' : 'مستفيدي المخيمات التربوية'}</span>
                  <span className="text-4xl font-extrabold text-brand-blue-dark font-sans mt-2 block">
                    {ACADEMY_STATS.campSnaaBeneficiaries + ACADEMY_STATS.campSfeeratBeneficiaries}
                  </span>
                  <span className="text-[10px] text-slate-500 font-sans mt-1 block">
                    {currentLang === 'ms' ? 'Pencipta Hari Esok & Duta Impak' : currentLang === 'en' ? 'Creators of Tomorrow & Ambassadors' : 'في مخيمات صناع الغد وسفيرات الأثر'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* SUCCESS STORIES */}
          {activeTab === 'success-stories' && (
            <div className="space-y-6 animate-in fade-in duration-500 text-right rtl:text-right ltr:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-brand-blue-dark flex items-center gap-2 border-b border-brand-gold/15 pb-4">
                <Award className="h-6 w-6 text-brand-gold" />
                <span>{currentLang === 'ms' ? 'Kisah Kejayaan Pelajar yang Dihargai' : currentLang === 'en' ? 'Honored Student Success Stories' : 'قصص نجاح وسير تميز طلابنا'}</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {STUDENT_PROFILES.map((student) => (
                  <div key={student.id} className="p-6 bg-white border-2 border-brand-gold/10 rounded-3xl shadow-sm hover:border-brand-gold/30 hover:shadow-md transition-all duration-300">
                    <div className="flex gap-4 items-center mb-4 border-b border-slate-100 pb-3">
                      <SmartImg
                        src={student.avatar}
                        alt={getLangField(student, 'name', currentLang)}
                        className="h-14 w-14 rounded-full object-cover border-2 border-brand-gold/35"
                      />
                      <div className="text-right rtl:text-right ltr:text-left">
                        <h4 className="text-base font-bold text-brand-blue-dark">
                          {getLangField(student, 'name', currentLang)}
                        </h4>
                        <span className="text-[10px] sm:text-xs text-brand-gold-dark font-semibold">
                          {getLangField(student, 'class', currentLang)}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3 font-sans text-xs sm:text-sm text-slate-600">
                      <div>
                        <strong>📖 {currentLang === 'ms' ? 'Kemajuan Hafazan: ' : currentLang === 'en' ? 'Hifz Progress: ' : 'معدل الحفظ والتمكين: '}</strong>
                        <span className="font-bold text-brand-blue-dark font-sans">{student.hifzProgress}%</span>
                      </div>
                      <div>
                        <strong>🛡️ {currentLang === 'ms' ? 'Lencana Diperoleh: ' : currentLang === 'en' ? 'Earned Badges: ' : 'الأوسمة الحاصل عليها: '}</strong>
                        <div className="flex gap-1.5 mt-2 flex-wrap text-[10px]">
                          {student.badges.map((b) => (
                            <span key={b.id} className={`px-2.5 py-1 rounded-full border ${b.color} font-bold`}>
                              {b.icon} {getLangField(b, 'title', currentLang)}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="bg-brand-gold/5 border border-brand-gold/10 p-3 rounded-xl italic mt-3 text-[11px] sm:text-xs text-slate-500">
                        {getLangField(student.recentLogs[0], 'notes', currentLang)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* IMPACT AMBASSADORS */}
          {activeTab === 'ambassadors' && (
            <div className="space-y-6 animate-in fade-in duration-500 text-right rtl:text-right ltr:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-brand-blue-dark flex items-center gap-2 border-b border-brand-gold/15 pb-4">
                <Sparkles className="h-6 w-6 text-brand-gold" />
                <span>{currentLang === 'ms' ? 'Duta Nilai & Impak Kami' : currentLang === 'en' ? 'Our Value & Impact Ambassadors' : 'سفراء الأثر الطيب'}</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                {/* Amb 1 */}
                <div className="bg-brand-sand/50 border border-brand-gold/15 rounded-2xl p-5 text-center flex flex-col justify-between items-center hover:scale-102 transition-transform duration-300">
                  <div className="p-3 bg-brand-gold/10 rounded-full text-brand-gold-dark mb-3">
                    <Star className="h-6 w-6" />
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-brand-blue-dark">{currentLang === 'ms' ? 'Duta Al-Quran' : currentLang === 'en' ? 'Ambassadors of Quran' : 'سفراء القرآن الكريم'}</h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 font-sans mt-2 max-w-xs leading-relaxed">
                    {currentLang === 'ms'
                      ? 'Pelajar yang telah menghafal seluruh Al-Quran dan layak untuk menyertai program simaan awam "Bersama Para Malaikat Pencatat".'
                      : currentLang === 'en'
                        ? 'Students who memorized the entire Quran and qualified to sit in the public recital program "With the Scribes".'
                        : 'الطلاب والطالبات المتميزون الذين أتموا حفظ الكتاب ونجحوا في إتمام جلسات السرد والتمكين بمعدل تميز عالٍ.'}
                  </p>
                </div>
                {/* Amb 2 */}
                <div className="bg-brand-sand/50 border border-brand-gold/15 rounded-2xl p-5 text-center flex flex-col justify-between items-center hover:scale-102 transition-transform duration-300">
                  <div className="p-3 bg-brand-gold/10 rounded-full text-brand-gold-dark mb-3">
                    <Heart className="h-6 w-6" />
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-brand-blue-dark">{currentLang === 'ms' ? 'Duta Nilai Murni' : currentLang === 'en' ? 'Ambassadors of Values' : 'سفراء القيم والسلوك'}</h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 font-sans mt-2 max-w-xs leading-relaxed">
                    {currentLang === 'ms'
                      ? 'Pelajar yang menunjukkan komitmen luar biasa terhadap tingkah laku Islam, adab, dan sokongan komuniti dalam kem.'
                      : currentLang === 'en'
                        ? 'Students who showed exceptional commitment to Islamic behavior, manners, and community support in camps.'
                        : 'خريجو مخيمات صناع الغد وسفيرات الأثر الذين تميزوا بالالتزام بالسلوك القويم والعمل التطوعي وخدمة الزملاء.'}
                  </p>
                </div>
                {/* Amb 3 */}
                <div className="bg-brand-sand/50 border border-brand-gold/15 rounded-2xl p-5 text-center flex flex-col justify-between items-center hover:scale-102 transition-transform duration-300">
                  <div className="p-3 bg-brand-gold/10 rounded-full text-brand-gold-dark mb-3">
                    <Award className="h-6 w-6" />
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-brand-blue-dark">{currentLang === 'ms' ? 'Duta Pengajaran' : currentLang === 'en' ? 'Teaching Ambassadors' : 'سفراء العطاء والتعليم'}</h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 font-sans mt-2 max-w-xs leading-relaxed">
                    {currentLang === 'ms'
                      ? 'Huffaz graduan yang kembali mengajar halaqah cilik, menyumbang kembali kepada komuniti dan memindahkan warisan.'
                      : currentLang === 'en'
                        ? 'Graduated Huffaz who returned to teach junior circles, giving back to the community and transferring legacy.'
                        : 'الحفاظ المتميزون الذين تم تدريبهم وتأهيلهم ليعودوا كمدربين ومعيدين مشرفين على الحلقات التأسيسية للبراعم.'}
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
