'use client';
import React, { useState } from 'react';
import { Calculator, Ticket } from 'lucide-react';
import { Language, getLangField } from '@/types';
import { usePrograms, useContact } from '@/lib/content-provider';

interface FeeCalculatorProps {
  currentLang: Language;
}

export default function FeeCalculator({ currentLang }: FeeCalculatorProps) {
  const PROGRAMS = usePrograms();
  const CONTACT_DETAILS = useContact();
  // Calculator states
  const [calcProgramId, setCalcProgramId] = useState<string>(PROGRAMS[0]?.id || '');
  const [hasSibling, setHasSibling] = useState(false);
  const [financialAid, setFinancialAid] = useState(false);
  const [prepayTerm, setPrepayTerm] = useState<1 | 3 | 5>(1); // months

  // Calculator logic
  const selectedCalcProgram = PROGRAMS.find(p => p.id === calcProgramId) || PROGRAMS[0];
  const baseMonthlyPrice = selectedCalcProgram.pricePerMonth;
  const originalSubtotal = baseMonthlyPrice * prepayTerm;

  let discountPercentage = 0;
  if (hasSibling) discountPercentage += 15;
  if (financialAid) discountPercentage += 80;
  if (prepayTerm === 3) discountPercentage += 10;
  if (prepayTerm === 5) discountPercentage += 20;
  if (discountPercentage > 95) discountPercentage = 95;

  const discountAmount = originalSubtotal * (discountPercentage / 100);
  const finalTotalFee = originalSubtotal - discountAmount;

  return (
    <section className="relative bg-brand-sand py-16 overflow-hidden">
      <div className="absolute inset-0 islamic-pattern opacity-10 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Interactive Tuition Fee Calculator */}
        <div className="bg-brand-blue-dark rounded-3xl border border-brand-gold/30 shadow-2xl relative overflow-hidden text-white p-8 sm:p-12">

          <div className="absolute inset-0 islamic-pattern-dark opacity-10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

          {/* Heading */}
          <div className="relative mb-10 flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-brand-gold/15 text-left rtl:text-right">
            <div className="flex items-start space-x-3.5 rtl:space-x-reverse">
              <div className="p-3 bg-brand-gold/10 border border-brand-gold/30 rounded-2xl text-brand-gold mt-1">
                <Calculator className="h-7 w-7" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-brand-gold">
                  {currentLang === 'ms' ? 'Anggaran Yuran Teras Terapung' : currentLang === 'en' ? 'Interactive Fee Estimator' : 'حاسبة الرسوم والـمنح التفاعلية'}
                </h3>
                <p className="text-sm font-sans text-slate-300">
                  {currentLang === 'ms'
                    ? 'Dapatkan harga serta-merta berdasarkan program, tempoh, dan geran bantuan kewangan sosial.'
                    : currentLang === 'en'
                      ? 'Get instant pricing based on programs, terms, and social financial aid grants.'
                      : 'احسب التكاليف الدراسية والخصومات المتاحة للقرابة ومنح العسر المالي فورياً وبشفافية.'}
                </p>
              </div>
            </div>

            <div className="inline-flex space-x-2 rtl:space-x-reverse bg-brand-blue-light/50 px-4 py-2 rounded-full border border-brand-gold/25 font-sans font-bold text-xs">
              <Ticket className="h-4 w-4 text-brand-gold shrink-0" />
              <span className="text-brand-gold-light">
                {currentLang === 'ms' ? 'Pilihan subsidi tersedia di bawah' : currentLang === 'en' ? 'Subsidy options available below' : 'خيارات الدعم والإعفاء الخيري مدرجة'}
              </span>
            </div>
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch text-left rtl:text-right">

            {/* Form Side */}
            <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
              <div className="space-y-5">

                {/* 1. SELECT PROGRAM */}
                <div className="flex flex-col space-y-1.5 text-left rtl:text-right">
                  <label className="text-xs font-bold text-brand-gold uppercase tracking-wider font-sans">
                    {currentLang === 'ms' ? '1. Pilih Program Pengajian:' : currentLang === 'en' ? '1. Select Study Program:' : '1. حدد البرنامج الدراسي:'}
                  </label>
                  <select
                    value={calcProgramId}
                    onChange={(e) => setCalcProgramId(e.target.value)}
                    className="w-full bg-brand-blue-light/40 hover:bg-brand-blue-light/60 text-white font-semibold text-sm rounded-xl py-3.5 px-4 outline-none border border-brand-gold/20 focus:border-brand-gold transition-colors select-none font-sans"
                  >
                    {PROGRAMS.map((p) => (
                      <option key={p.id} value={p.id} className="bg-brand-blue-dark text-white text-xs sm:text-sm">
                        {getLangField(p, 'title', currentLang)} (${p.pricePerMonth}/{currentLang === 'ms' ? 'bln' : currentLang === 'en' ? 'mo' : 'شهرياً'})
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. SELECT PREPAY TERM */}
                <div className="flex flex-col space-y-1.5 font-sans text-left rtl:text-right">
                  <label className="text-xs font-bold text-brand-gold uppercase tracking-wider">
                    {currentLang === 'ms' ? '2. Pilih Tempoh Prabayar:' : currentLang === 'en' ? '2. Select Prepayment Term:' : '2. مدة الدفع المسبق:'}
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { val: 1, labelEn: '1 Month', labelAr: 'شهر واحد', labelMs: '1 Bulan', bonusEn: 'Standard', bonusAr: 'أساسي', bonusMs: 'Standard' },
                      { val: 3, labelEn: '3 Months', labelAr: '3 أشهر', labelMs: '3 Bulan', bonusEn: '10% Rebate', bonusAr: 'خصم 10٪', bonusMs: 'Rebat 10%' },
                      { val: 5, labelEn: 'Full Semester', labelAr: 'فصل دراسي كامل', labelMs: '1 Semester', bonusEn: '20% Rebate', bonusAr: 'خصم 20٪', bonusMs: 'Rebat 20%' }
                    ].map((term) => (
                      <button
                        key={term.val}
                        type="button"
                        onClick={() => setPrepayTerm(term.val as any)}
                        className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all duration-300 outline-none ${
                          prepayTerm === term.val
                            ? 'bg-brand-gold text-brand-blue-dark border-brand-gold shadow-lg shadow-brand-gold/10 font-bold'
                            : 'bg-brand-blue-light/20 text-white border-brand-gold/25 hover:bg-brand-blue-light/40 font-medium'
                        }`}
                      >
                        <span className="text-xs sm:text-sm">{currentLang === 'ms' ? term.labelMs : currentLang === 'en' ? term.labelEn : term.labelAr}</span>
                        <span className={`text-[9px] mt-0.5 px-1.5 py-0.5 rounded uppercase font-bold tracking-tight ${
                          prepayTerm === term.val
                            ? 'bg-brand-blue-dark text-brand-gold'
                            : 'bg-brand-gold/15 text-brand-gold-light'
                        }`}>
                          {currentLang === 'ms' ? term.bonusMs : currentLang === 'en' ? term.bonusEn : term.bonusAr}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. ADDITIONAL GRANTS */}
                <div className="flex flex-col space-y-3 pt-2 text-left rtl:text-right">
                  <label className="text-xs font-bold text-brand-gold uppercase tracking-wider font-sans">
                    {currentLang === 'ms' ? '3. Guna Pakai Subsidi & Manfaat:' : currentLang === 'en' ? '3. Apply Subsidies & Benefits:' : '3. المنح والدعم والتخفيض الخاص:'}
                  </label>

                  <div className="space-y-2">
                    {/* Sibling discount */}
                    <label className="flex items-center space-x-3.5 rtl:space-x-reverse bg-brand-blue-light/10 hover:bg-brand-blue-light/20 p-3.5 rounded-xl border border-brand-gold/10 cursor-pointer transition-colors select-none text-left rtl:text-right">
                      <input
                        type="checkbox"
                        checked={hasSibling}
                        onChange={(e) => setHasSibling(e.target.checked)}
                        className="h-4.5 w-4.5 accent-brand-gold rounded border-brand-gold shrink-0"
                      />
                      <div className="flex-grow text-xs sm:text-sm">
                        <span className="font-bold text-white block">
                          {currentLang === 'ms' ? 'Diskaun Adik-Beradik (Potongan 15%)' : currentLang === 'en' ? 'Sibling Discount (15% Off)' : 'خصم الأخوة والأقارب (15٪)'}
                        </span>
                        <span className="text-slate-300 text-xs font-sans">
                          {currentLang === 'ms' ? 'Dikenakan apabila mendaftar dua atau lebih adik-beradik daripada isi rumah yang sama.' : currentLang === 'en' ? 'Applied when enrolling two or more sisters/brothers from the same household.' : 'يطبق لصالح الأسر الكريمة الملتحق منها أخوة متعاضدون.'}
                        </span>
                      </div>
                    </label>

                    {/* Financial aid */}
                    <label className="flex items-center space-x-3.5 rtl:space-x-reverse bg-brand-blue-light/10 hover:bg-brand-blue-light/20 p-3.5 rounded-xl border border-brand-gold/10 cursor-pointer transition-colors select-none text-left rtl:text-right">
                      <input
                        type="checkbox"
                        checked={financialAid}
                        onChange={(e) => setFinancialAid(e.target.checked)}
                        className="h-4.5 w-4.5 accent-brand-gold rounded border-brand-gold shrink-0"
                      />
                      <div className="flex-grow text-xs sm:text-sm">
                        <span className="font-bold text-brand-gold-light block">
                          {currentLang === 'ms' ? 'Geran Kebajikan Athar (Potongan 80%)' : currentLang === 'en' ? 'Athar Benevolence Solidarity Grant (80% Off)' : 'طلب منحة الأثر التضامنية الخيرية (80٪ إعفاء)'}
                        </span>
                        <span className="text-slate-300 text-xs font-sans">
                          {currentLang === 'ms' ? 'Bantuan yuran bersubsidi untuk keluarga yang memerlukan. Tertakluk kepada semakan penasihat akademik.' : currentLang === 'en' ? 'Subsidized tuition assistance for needy families. Subject to academic adviser review.' : 'دعم مالي للطلبة الجادين المعسرين. خاضع لموافقة اللجنة الأكاديمية والاجتماعية.'}
                        </span>
                      </div>
                    </label>
                  </div>
                </div>

              </div>

              <div className="text-[11px] font-sans text-slate-400 leading-relaxed border-t border-brand-gold/10 pt-4 mt-4 text-left rtl:text-right">
                {currentLang === 'ms'
                  ? '* Pengiraan ini memberikan anggaran awal interaktif. Yuran akhir disahkan secara elektronik oleh pentadbir.'
                  : currentLang === 'en'
                    ? '* This calculation provides an interactive initial estimate. Final fees are confirmed electronically by administrators.'
                    : '* هذه الحاسبة تعطي تقديراً أولياً تفاعلياً. يتم اعتماد الرسوم الرسمية بالتنسيق مع المشرفين.'}
              </div>
            </div>

            {/* Bill Receipt Side */}
            <div className="lg:col-span-5 flex flex-col text-left rtl:text-right">
              <div className="bg-white text-slate-800 rounded-2xl border-2 border-brand-gold p-6 sm:p-8 flex flex-col justify-between h-full relative shadow-lg">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-gold-dark via-brand-gold to-brand-gold-light rounded-t-2xl" />

                <div className="space-y-6">
                  <div className="text-center pb-4 border-b border-dashed border-slate-300">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-sans">
                      {currentLang === 'ms' ? 'RESIT YURAN ANGGARAN' : currentLang === 'en' ? 'PRO FORMA TUITION RECEIPT' : 'فاتورة تقديرية أولية للأقساط'}
                    </span>
                    <h4 className="text-lg font-bold text-brand-blue mb-1">
                      {currentLang === 'ms' ? 'Pengebilan Akademi Athar' : currentLang === 'en' ? 'Athar Academy Billing' : 'أكاديمية أثَــــر التعليمية'}
                    </h4>
                    <span className="text-xs text-slate-400 font-sans">
                      {new Date().toLocaleDateString(currentLang === 'ms' ? 'ms-MY' : currentLang === 'en' ? 'en-US' : 'ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                  </div>

                  <div className="space-y-3.5 text-xs sm:text-sm font-sans pt-2">
                    <div className="flex justify-between items-center text-slate-500">
                      <span>{currentLang === 'ms' ? 'Kadar Asas Program:' : currentLang === 'en' ? 'Program Base Rate:' : 'أقساط البرنامج الأساسية:'}</span>
                      <span className="font-semibold">${baseMonthlyPrice} / {currentLang === 'ms' ? 'bln' : currentLang === 'en' ? 'mo' : 'ش'}</span>
                    </div>

                    <div className="flex justify-between items-center text-slate-500">
                      <span>{currentLang === 'ms' ? 'Tempoh Prabayar:' : currentLang === 'en' ? 'Prepay Term Block:' : 'فترة الدراسة المحتسبة:'}</span>
                      <span className="font-semibold">× {prepayTerm} {currentLang === 'ms' ? 'Bulan' : currentLang === 'en' ? 'Month(s)' : 'شهر/أشهر'}</span>
                    </div>

                    <div className="flex justify-between items-center text-slate-800 border-t border-slate-100 pt-3">
                      <span>{currentLang === 'ms' ? 'Jumlah Kecil:' : currentLang === 'en' ? 'Subtotal Fee:' : 'الـمجموع الفرعي:'}</span>
                      <span className="font-bold font-sans">${originalSubtotal.toFixed(2)}</span>
                    </div>

                    {discountPercentage > 0 && (
                      <div className="space-y-1.5 bg-brand-gold/10 text-slate-800 p-3.5 rounded-xl border border-brand-gold/30">
                        <div className="flex justify-between text-xs font-bold items-center text-brand-gold-dark">
                          <span>{currentLang === 'ms' ? 'Jumlah Diskaun Terkumpul:' : currentLang === 'en' ? 'Accumulated Discounts:' : 'مجموع التخفيضات المعتمدة:'}</span>
                          <span>-{discountPercentage}%</span>
                        </div>
                        <div className="flex justify-between text-xs items-center text-slate-600">
                          <span>{currentLang === 'ms' ? 'Jumlah Subsidi Penaja:' : currentLang === 'en' ? 'Sponsor Subsidy amount:' : 'مقدار الدعم المالي:'}</span>
                          <span className="font-bold text-brand-gold-dark font-sans">-${discountAmount.toFixed(2)}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t-2 border-dashed border-slate-300">
                  <div className="flex justify-between items-baseline mb-6">
                    <span className="text-sm font-semibold text-slate-600">{currentLang === 'ms' ? 'Anggaran Jumlah Keseluruhan:' : currentLang === 'en' ? 'Estimated Total:' : 'إجمالي الأقساط المطلوبة:'}</span>
                    <div className="flex flex-col items-end">
                      <span className="text-3xl font-extrabold text-brand-blue font-sans tracking-tight">
                        ${finalTotalFee.toFixed(2)}
                      </span>
                      <span className="text-[10px] text-slate-400 font-sans mt-0.5 mb-0 select-none">
                        {currentLang === 'ms' ? 'Yuran dikecualikan cukai kebajikan' : currentLang === 'en' ? 'Tax exempt non-profit fee' : 'رسوم غير ربحية معفاة من الضرائب'}
                      </span>
                    </div>
                  </div>

                  <a
                    href={CONTACT_DETAILS.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-brand-blue hover:bg-brand-gold hover:text-brand-blue-dark text-white font-bold py-3.5 px-4 rounded-xl text-center shadow-md transition-all duration-300 hover:scale-105 cursor-pointer uppercase text-xs sm:text-sm font-sans"
                  >
                    {currentLang === 'ms' ? 'Hantar Pertanyaan Pendaftaran' : currentLang === 'en' ? 'Send Registration Inquiry' : 'تأكيـد الالتحاق والتسجيل'}
                  </a>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
