// Default content for sections not yet in src/data/index.ts.
// These hold all editable text/strings from page components (Hero, Footer, Header, AICompanion).

// ===========================================================================
// SITE FORMS — managed registration/application forms, grouped by section.
// Rendered as tabs inside their section. Editable & extendable from the
// dashboard Forms Manager (add forms, fields, header image, choose section).
// section: 'admission' | 'support' | 'finance'
// ===========================================================================
export const FORMS_DEFAULTS = [
  {
    id: 'register-circles', section: 'admission', order: 1,
    titleAr: 'التسجيل في الحلقات', titleEn: 'Register in Circles', titleMs: 'Daftar Halaqah',
    descAr: 'سجّل ابنك أو ابنتك في حلقات تحفيظ القرآن الكريم. عبّئ البيانات وسنتواصل معك لتحديد الحلقة المناسبة.',
    descEn: 'Register your child in our Quran circles.',
    headerImage: '',
    submitType: 'register_circles',
    submitLabelAr: 'تسجيل', submitLabelEn: 'Register',
    successAr: 'تم استلام تسجيلك! سنتواصل معك لتأكيد الحلقة.', successEn: 'Registration received!',
    fields: [
      { key: 'student', labelAr: 'اسم الطالب/الطالبة', labelEn: 'Student Name', type: 'text', required: true },
      { key: 'age', labelAr: 'العمر', labelEn: 'Age', type: 'number', required: true },
      { key: 'gender', labelAr: 'الجنس', labelEn: 'Gender', type: 'select', required: true, options: 'ذكر, أنثى' },
      { key: 'guardian', labelAr: 'اسم ولي الأمر', labelEn: 'Guardian', type: 'text', required: true },
      { key: 'phone', labelAr: 'رقم جوال ولي الأمر', labelEn: 'Guardian Phone', type: 'tel', required: true },
      { key: 'level', labelAr: 'المستوى/مقدار الحفظ', labelEn: 'Level', type: 'text', required: false },
      { key: 'time', labelAr: 'الوقت المفضل', labelEn: 'Preferred Time', type: 'select', required: false, options: 'صباحي, مسائي, مرن' },
    ],
  },
  {
    id: 'register-programs', section: 'admission', order: 2,
    titleAr: 'التسجيل في البرامج', titleEn: 'Register in Programs', titleMs: 'Daftar Program',
    descAr: 'سجّل في برامج الأكاديمية التعليمية والمخيمات. اختر البرنامج وعبّئ بياناتك.',
    descEn: 'Register in our educational programs and camps.',
    headerImage: '',
    submitType: 'register_programs',
    submitLabelAr: 'تسجيل', submitLabelEn: 'Register',
    successAr: 'تم استلام تسجيلك في البرنامج! سنتواصل معك.', successEn: 'Program registration received!',
    fields: [
      { key: 'name', labelAr: 'الاسم الكامل', labelEn: 'Full Name', type: 'text', required: true },
      { key: 'phone', labelAr: 'رقم الجوال', labelEn: 'Phone', type: 'tel', required: true },
      { key: 'email', labelAr: 'البريد الإلكتروني', labelEn: 'Email', type: 'email', required: false },
      { key: 'program', labelAr: 'البرنامج', labelEn: 'Program', type: 'select', required: true, options: 'برنامج مع السّفرة, برنامج تكوين, مخيم صناع الغد, مخيم سفيرات الأثر, المعتكف الرمضاني, رحلة الأثر, قارئ أثر' },
      { key: 'notes', labelAr: 'ملاحظات', labelEn: 'Notes', type: 'textarea', required: false },
    ],
  },
  {
    id: 'careers', section: 'admission', order: 3,
    titleAr: 'طلب التوظيف', titleEn: 'Employment Application', titleMs: 'Permohonan Kerja',
    descAr: 'انضم إلى فريق أكاديمية أثر. عبّئ النموذج وسيتواصل معك قسم الموارد البشرية.',
    descEn: 'Join the Athar Academy team.',
    headerImage: '',
    submitType: 'careers',
    submitLabelAr: 'إرسال الطلب', submitLabelEn: 'Submit Application',
    successAr: 'تم استلام طلب توظيفك بنجاح! سنراجعه ونتواصل معك.', successEn: 'Your application was received!',
    fields: [
      { key: 'name', labelAr: 'الاسم الكامل', labelEn: 'Full Name', type: 'text', required: true },
      { key: 'phone', labelAr: 'رقم الجوال', labelEn: 'Phone', type: 'tel', required: true },
      { key: 'email', labelAr: 'البريد الإلكتروني', labelEn: 'Email', type: 'email', required: true },
      { key: 'position', labelAr: 'الوظيفة المتقدم لها', labelEn: 'Position', type: 'select', required: true, options: 'معلم تحفيظ, معلمة تحفيظ, معلم لغة عربية, إداري, تقني, أخرى' },
      { key: 'qualification', labelAr: 'المؤهل العلمي', labelEn: 'Qualification', type: 'text', required: false },
      { key: 'experience', labelAr: 'سنوات الخبرة', labelEn: 'Experience', type: 'text', required: false },
      { key: 'message', labelAr: 'نبذة عنك', labelEn: 'About you', type: 'textarea', required: false },
    ],
  },
  {
    id: 'volunteer', section: 'support', order: 1,
    titleAr: 'انضم كمتطوع', titleEn: 'Join as Volunteer', titleMs: 'Jadi Sukarelawan',
    descAr: 'كن جزءاً من فريق أثر التطوعي وساهم في نشر تعليم القرآن الكريم.',
    descEn: 'Join the Athar volunteer team.',
    headerImage: '',
    submitType: 'volunteer',
    submitLabelAr: 'إرسال طلب التطوع', submitLabelEn: 'Submit',
    successAr: 'تم استلام طلبك! سنتواصل معك قريباً.', successEn: 'Received!',
    fields: [
      { key: 'name', labelAr: 'الاسم الكامل', labelEn: 'Full Name', type: 'text', required: true },
      { key: 'phone', labelAr: 'رقم الجوال', labelEn: 'Phone', type: 'tel', required: true },
      { key: 'city', labelAr: 'المدينة', labelEn: 'City', type: 'text', required: false },
      { key: 'role', labelAr: 'مجال التطوع المفضل', labelEn: 'Preferred Role', type: 'text', required: false },
    ],
  },
  {
    id: 'ambassadors', section: 'support', order: 2,
    titleAr: 'فريق سفراء الأثر التطوعي', titleEn: 'Athar Ambassadors Team', titleMs: 'Pasukan Duta Athar',
    descAr: 'انضم لفريق سفراء الأثر وكن جزءاً من نشر القرآن الكريم وخدمة طلابه.',
    descEn: 'Join the Athar Ambassadors team.',
    headerImage: '',
    submitType: 'ambassadors',
    submitLabelAr: 'انضم للسفراء', submitLabelEn: 'Join',
    successAr: 'تم استلام طلبك للانضمام للسفراء! سنتواصل معك.', successEn: 'Received!',
    fields: [
      { key: 'name', labelAr: 'الاسم الكامل', labelEn: 'Full Name', type: 'text', required: true },
      { key: 'phone', labelAr: 'رقم الجوال', labelEn: 'Phone', type: 'tel', required: true },
      { key: 'city', labelAr: 'المدينة', labelEn: 'City', type: 'text', required: false },
      { key: 'skills', labelAr: 'مهاراتك', labelEn: 'Skills', type: 'textarea', required: false },
    ],
  },
  {
    id: 'donate', section: 'finance', order: 1,
    titleAr: 'تبرّع الآن', titleEn: 'Donate Now', titleMs: 'Derma Sekarang',
    descAr: 'ساهم في كفالة حلقة قرآنية أو طالب، ودعم مسيرة أكاديمية أثر. كل تبرع له أثر باقٍ.',
    descEn: 'Support a Quran circle or a student.',
    headerImage: '',
    submitType: 'donation',
    submitLabelAr: 'إرسال طلب التبرع', submitLabelEn: 'Submit Donation',
    successAr: 'شكراً لك! تم استلام طلب تبرعك وسنتواصل معك لإتمامه.', successEn: 'Thank you! Received.',
    fields: [
      { key: 'name', labelAr: 'الاسم الكامل', labelEn: 'Full Name', type: 'text', required: true },
      { key: 'phone', labelAr: 'رقم الجوال', labelEn: 'Phone', type: 'tel', required: true },
      { key: 'email', labelAr: 'البريد الإلكتروني', labelEn: 'Email', type: 'email', required: false },
      { key: 'type', labelAr: 'نوع التبرع', labelEn: 'Donation Type', type: 'select', required: true, options: 'كفالة حلقة كاملة, كفالة طالب, دعم منحة الأثر, تبرع عام' },
      { key: 'amount', labelAr: 'المبلغ (رينغيت)', labelEn: 'Amount (MYR)', type: 'number', required: false },
    ],
  },
  {
    id: 'pay-fees', section: 'finance', order: 2,
    titleAr: 'دفع الرسوم', titleEn: 'Pay Fees', titleMs: 'Bayar Yuran',
    descAr: 'سدّد رسوم الاشتراك في الحلقات والبرامج. عبّئ بياناتك وسنرسل لك تفاصيل السداد.',
    descEn: 'Pay your subscription fees.',
    headerImage: '',
    submitType: 'fee_payment',
    submitLabelAr: 'إرسال طلب السداد', submitLabelEn: 'Submit',
    successAr: 'تم استلام طلب السداد! سنرسل لك تفاصيل الدفع.', successEn: 'Received!',
    fields: [
      { key: 'name', labelAr: 'اسم الطالب', labelEn: 'Student Name', type: 'text', required: true },
      { key: 'phone', labelAr: 'رقم الجوال', labelEn: 'Phone', type: 'tel', required: true },
      { key: 'program', labelAr: 'الحلقة/البرنامج', labelEn: 'Program', type: 'text', required: true },
      { key: 'amount', labelAr: 'المبلغ (رينغيت)', labelEn: 'Amount (MYR)', type: 'number', required: false },
    ],
  },
];

// Annual calendar (shown as a tab in the Media Center, editable from dashboard)
export const CALENDAR_DEFAULTS = {
  titleAr: 'التقويم السنوي لأكاديمية أثر',
  titleEn: 'Athar Academy Annual Calendar',
  titleMs: 'Kalendar Tahunan Akademi Athar',
  descAr: 'أهم الفعاليات والبرامج والمخيمات على مدار العام الدراسي. يمكن لإدارة الأكاديمية تحديث الصورة والفعاليات من لوحة التحكم.',
  descEn: 'Key events, programs, and camps throughout the academic year.',
  descMs: 'Acara, program, dan kem utама sepanjang tahun akademik.',
  image: '',
  events: [
    { titleAr: 'بداية الحلقات القرآنية', titleEn: 'Quran circles begin', titleMs: '', dateAr: 'سبتمبر', dateEn: 'September' },
    { titleAr: 'مخيم صنّاع الغد', titleEn: 'Creators of Tomorrow Camp', titleMs: '', dateAr: 'يونيو', dateEn: 'June' },
    { titleAr: 'برنامج مع السّفرة', titleEn: 'With the Scribes Program', titleMs: '', dateAr: 'ديسمبر', dateEn: 'December' },
    { titleAr: 'المعتكف الرمضاني', titleEn: 'Ramadan Retreat', titleMs: '', dateAr: 'رمضان', dateEn: 'Ramadan' },
    { titleAr: 'حفل تخريج الحفاظ', titleEn: 'Huffaz graduation', titleMs: '', dateAr: 'مايو', dateEn: 'May' },
  ],
};

// Current / upcoming events (editable from the dashboard → "الفعاليات الحالية")
export const EVENTS_DEFAULTS = [
  {
    id: 'event-1',
    image: 'https://images.unsplash.com/photo-1590076215667-87373f82cb38?auto=format&fit=crop&q=80&w=600',
    badgeAr: 'ملتقى إيماني', badgeEn: 'Spiritual Meeting', badgeMs: 'Pertemuan Ruhiyyah',
    titleAr: 'الملتقى السنوي للمعتكف الرمضاني', titleEn: 'Annual Ramadan Quran Retreat', titleMs: 'Halaqah Intensif Rehlah Ramadan',
    descAr: 'ملتقى مبارك يعقد في العشر الأواخر من الشهر الفضيل للمراجعة المكثفة لطلبة الحلقات والمجازين.',
    descEn: 'Gathering students and sheikhs in the last ten days of Ramadan to review, contemplate, and pray together.',
    descMs: 'Menghimpunkan pelajar dan sheikh pada sepuluh malam terakhir Ramadan untuk mengulang, bertadabbur, dan solat bersama.',
  },
  {
    id: 'event-2',
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=600',
    badgeAr: 'حفل تخريج', badgeEn: 'Graduation', badgeMs: 'Graduasi',
    titleAr: 'حفل تكريم حفاظ السند المتصل', titleEn: 'Connected Sanad Graduates Ceremony', titleMs: 'Majlis Graduasi Penerima Sanad',
    descAr: 'احتفال مهيب لتكريم الطلبة الذين أتموا قراءة القرآن غيباً بالإسناد المتصل إلى رسول الله ﷺ.',
    descEn: 'Honoring students who successfully completed and recited the entire Quran in different narrations.',
    descMs: 'Merai dan memberi penghargaan kepada pelajar yang telah berjaya menghafal dan memperdengarkan keseluruhan Al-Quran dengan sanad bersambung.',
  },
];

export const HERO_DEFAULTS = {
  // Top badge
  badgeAr: 'أكاديمية أثر الرسمية',
  badgeEn: 'Athar Academy Official',
  badgeMs: 'Rasmi Akademi Athar',
  // Headline
  titleAr: 'أكاديمية أثر تهتم بتعليم القرآن الكريم وعلومه واللغة العربية.',
  titleEn: 'Athar Academy teaches the Holy Quran, Arabic, and Islamic sciences with care.',
  titleMs: 'Akademi Athar mementingkan pengajaran Al-Quran, Bahasa Arab, dan Sains Islam dengan penuh dedikasi.',
  // Subtitle
  subtitleAr: 'نقدم برامج معتمدة في تحفيظ القرآن والتجويد واللغة العربية والعلوم الشرعية، مع متابعة تربوية وأسلوب تعليمي رفيع.',
  subtitleEn: 'We provide certified Quran memorization, Tajweed, Arabic language, and Islamic studies programs with real academic support and a nurturing environment.',
  subtitleMs: 'Kami menyediakan program hafazan Al-Quran, Tajwid, Bahasa Arab, dan pengajian Islam yang diiktiraf dengan sokongan akademik serta persekitaran yang membina.',
  // CTA buttons
  ctaPrimaryAr: 'عرض برامج التسجيل',
  ctaPrimaryEn: 'Browse Enrollment Programs',
  ctaPrimaryMs: 'Lihat Program Pendaftaran',
  ctaSecondaryAr: 'الدخول للبوابة',
  ctaSecondaryEn: 'Open Student Portal',
  ctaSecondaryMs: 'Buka Portal Pelajar',
  // Stats
  statsLabelAr: 'إحصائيات الأثر',
  statsLabelEn: 'Athar Stats',
  statsLabelMs: 'Statistik Athar',
  stats: [
    {
      number: '1,240+',
      labelEn: 'Active Students',
      labelAr: 'طالباً وطالبة نشطين',
      labelMs: 'Pelajar Aktif',
      icon: 'Users',
    },
    {
      number: '48',
      labelEn: 'Certified Huffaz Teach',
      labelAr: 'شيوخ ومعلمات مجازين بالسند',
      labelMs: 'Guru Huffaz Bertauliah Sanad',
      icon: 'Award',
    },
    {
      number: '124,000+',
      labelEn: 'Recited Quran Hours',
      labelAr: 'ساعات تسميع مقطوعة',
      labelMs: 'Jam Bacaan Al-Quran',
      icon: 'BookOpen',
    },
    {
      number: '100%',
      labelEn: 'Online & Physical flex',
      labelAr: 'حلقات حضورية وعن بعد',
      labelMs: 'Fleksibiliti Fizikal & Online',
      icon: 'Clock',
    },
  ],
  // Carousel
  carousel: [
    {
      id: 'slide-1',
      image: 'https://images.unsplash.com/photo-1609599006353-e629f1d40e39?auto=format&fit=crop&q=80&w=800',
      titleEn: 'Sanctuaries of Recitation',
      titleAr: 'مقارئ الـذكـر الحكيم',
      titleMs: 'Halaqah Tilawah Al-Quran',
      descEn: 'Authentic Quranic memorization under preeminent scholars with high connected Sanad.',
      descAr: 'حلقات ممتدة لحفظ القرآن وضبطه غيباً تحت إشراف نخبة من القراء والمقرئات مجازين بالسند المتصل.',
      descMs: 'Hafazan Al-Quran sahih di bawah bimbingan para ulama terkemuka dengan Sanad yang tinggi bersambung.',
    },
    {
      id: 'slide-2',
      image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=800',
      titleEn: 'Spiritual Legacy',
      titleAr: 'أنـوار العلوم والتربية بالأثر',
      titleMs: 'Warisan Kerohanian',
      descEn: 'Foundational Islamic studies to nurture character and leave a lasting legacy (Athar).',
      descAr: 'حلقات ومناهج علمية تأصيلية ترتكز على هدي السلف الصالح لترك أثر سليم باقٍ في الفؤاد.',
      descMs: 'Pengajian Islam asas untuk memupuk akhlak mulia dan meninggalkan warisan soleh yang berterusan (Athar).',
    },
    {
      id: 'slide-3',
      image: 'https://images.unsplash.com/photo-1597935258735-e254c1839512?auto=format&fit=crop&q=80&w=800',
      titleEn: 'Eloquent Early Prep',
      titleAr: 'حلقة نور البينات للأطفال والبراعم',
      titleMs: 'Persediaan Awal Kefasihan',
      descEn: 'Building eloquence and correct Quran pronunciation utilizing classic Nooras Arabic method.',
      descAr: 'تأسيس فصاحة اللسان للأطفال الصغار وضبط مخارج الحروف الهجائية وقراءتها بالقاعدة النورانية.',
      descMs: 'Membina kefasihan dan sebutan Al-Quran yang betul menggunakan kaedah klasik Qaida Noorania.',
    },
  ],
  // Pillars (4 items)
  pillarsHeadingAr: 'ركائز التميز في أكاديمية أثر',
  pillarsHeadingEn: 'Our Core Educational Pillars',
  pillarsHeadingMs: 'Rangkaian Teras Pendidikan Kami',
  pillarsTaglineAr: 'منهجية الأثر التربوية',
  pillarsTaglineEn: 'OUR METHODOLOGY',
  pillarsTaglineMs: 'METODOLOGI KAMI',
  pillarsSubAr: 'لسنا مجرد مقرأة تعتمد التلقين الآلي الحرفي، بل نسعى لبناء جيل يعيش بهداية القرآن وعياً وعقيدة وسلوكاً باقٍ الأثر.',
  pillarsSubEn: 'We do not focus on mindless memorization; we build a lifelong connection to the Holy Quran and noble Islamic character.',
  pillarsSubMs: 'Kami tidak hanya tertumpu kepada hafazan semata-mata; kami membina hubungan berterusan dengan Al-Quran dan memupuk akhlak Islam yang mulia.',
  pillars: [
    {
      id: 'pillar-1',
      icon: 'ShieldCheck',
      img: 'https://images.unsplash.com/photo-1584281729059-3d5a7ab24934?auto=format&fit=crop&q=80&w=400',
      titleEn: 'Connected Sanad Licensure',
      titleAr: 'الإسناد المتصل بالرحاب النبوية',
      titleMs: 'Pentauliahan Sanad Bersambung',
      descEn: 'Authentic recitation assessment (Ijazah) with uninterrupted lines back to the Prophet ﷺ under international certified judges.',
      descAr: 'عرض الختمة كاملة في المقارئ الفردية لنيل الإجازة بالسند المتصل إلى غاية المعصوم ﷺ بروايات متعددة مع ضبط مخارج الأداء.',
      descMs: 'Penilaian bacaan Al-Quran (Ijazah) dengan rantaian riwayat yang tidak terputus kembali kepada Rasulullah ﷺ di bawah bimbingan para qari bertauliah antarabangsa.',
    },
    {
      id: 'pillar-2',
      icon: 'HeartHandshake',
      img: 'https://images.unsplash.com/photo-1590076215667-87373f82cb38?auto=format&fit=crop&q=80&w=400',
      titleEn: 'Ethics & Behavioral Athar',
      titleAr: 'التربية بالقيم وبناء الأثر الطيب',
      titleMs: 'Akhlak & Athar Tingkah Laku',
      descEn: 'Focusing on the practical behavioral impact of verses, nurturing noble prophetic manners alongside memorization.',
      descAr: 'لا نرتضي للمحفظ حفظ اللوح غيباً فحسب، بل يصاحب تسميعه اليومي دروس سلوكية عملية تضفي جمال الأخلاق وصلاح السيرة في واقع الحياة.',
      descMs: 'Menumpukan kepada kesan praktikal ayat-ayat Al-Quran terhadap tingkah laku, memupuk adab kenabian yang mulia di samping hafazan.',
    },
    {
      id: 'pillar-3',
      icon: 'Smartphone',
      img: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=400',
      titleEn: 'Instant Live Parent Portal',
      titleAr: 'المزامنة الفورية وأثر المتابعة',
      titleMs: 'Portal Ibu Bapa Serta-Merta',
      descEn: 'A high-fidelity parent sync board enabling live lesson listening, advisor note verification, and seamless milestone progress checking.',
      descAr: 'بوابة تفاعلية حية تمكن أولياء الأمور من سماع ريكورد التسميع الصوتي لأولادهم، وتتبع التقييم المباشر ودرجات الحفظ والتسميع يوماً بيوم.',
      descMs: 'Satu platform pemantauan ibu bapa yang membolehkan mendengar bacaan pelajar secara langsung, menyemak ulasan guru, dan melihat laporan kemajuan.',
    },
    {
      id: 'pillar-4',
      icon: 'GraduationCap',
      img: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=400',
      titleEn: 'Theological Foundation Study',
      titleAr: 'التأصيل العلمي والوعي الفكري',
      titleMs: 'Pengajian Asas Syariah',
      descEn: 'Complementary simplified classes in Tajweed theory, Nawawi Hadiths, prophetic biography, and essential jurisprudence.',
      descAr: 'تلقين الناشئة والشباب أصول العلوم العقدية والحديثية النبوية والفقه الميسر، بجانب ترسيخ قيم الأمن الفكري في مواجهة الشبهات المعاصرة.',
      descMs: 'Kelas tambahan ringkas mengenai teori Tajwid, Himpunan Hadis 40 Al-Nawawi, sirah nabi, dan fikah ibadat asas.',
    },
  ],
};

export const HEADER_DEFAULTS = {
  logoText: 'Athar',
  logoSubAr: 'أكاديمية أثر',
  logoSubEn: 'Academy',
  logoSubMs: 'Akademi',
  // Nav items with multilang labels
  nav: [
    { id: 'home', en: 'Home', ar: 'الرئيسية', ms: 'Utama' },
    { id: 'about', en: 'About', ar: 'عن الأكاديمية', ms: 'Tentang' },
    { id: 'programs', en: 'Programs', ar: 'البرامج', ms: 'Program' },
    { id: 'achievements', en: 'Achievements', ar: 'الإنجازات', ms: 'Pencapaian' },
    { id: 'team', en: 'Team', ar: 'الفريق', ms: 'Pasukan' },
    { id: 'support', en: 'Support', ar: 'الدعم', ms: 'Sokongan' },
    { id: 'faq', en: 'FAQ', ar: 'الأسئلة الشائعة', ms: 'Soalan Lazim' },
    { id: 'contact', en: 'Contact', ar: 'تواصل', ms: 'Hubungi' },
  ],
  ctaAr: 'التسجيل الآن',
  ctaEn: 'Enroll Now',
  ctaMs: 'Daftar Sekarang',
};

// ===========================================================================
// NAVIGATION — the site header menu (fully editable from the dashboard).
// Each item: kind = 'section' (built-in rich page) | 'page' (custom page) |
//            'external' (URL) | 'group' (dropdown parent with children).
// ===========================================================================
export const NAV_DEFAULTS = {
  items: [
    { id: 'home', labelAr: 'الرئيسية', labelEn: 'Home', labelMs: 'Utama', kind: 'section', section: 'home', sub: '' },
    {
      id: 'about', labelAr: 'من نحن', labelEn: 'About Us', labelMs: 'Tentang Kami', kind: 'group',
      children: [
        { id: 'about-intro', labelAr: 'نبذة عن الأكاديمية', labelEn: 'About the Academy', labelMs: 'Tentang Akademi', kind: 'section', section: 'about', sub: 'who-we-are' },
        { id: 'about-vision', labelAr: 'الرؤية والرسالة', labelEn: 'Vision & Mission', labelMs: 'Visi & Misi', kind: 'section', section: 'about', sub: 'vision-mission' },
        { id: 'about-goals', labelAr: 'أهداف الأكاديمية', labelEn: 'Our Goals', labelMs: 'Matlamat Kami', kind: 'section', section: 'about', sub: 'objectives' },
        { id: 'about-team', labelAr: 'فريق العمل', labelEn: 'Our Team', labelMs: 'Barisan Kami', kind: 'section', section: 'about', sub: 'team' },
        { id: 'director-message', labelAr: 'كلمة مدير الأكاديمية', labelEn: 'Director\'s Message', labelMs: 'Pesanan Pengarah', kind: 'section', section: 'about', sub: 'director-message' },
        { id: 'chairman-message', labelAr: 'كلمة رئيس مجلس الإدارة', labelEn: 'Chairman\'s Message', labelMs: 'Pesanan Pengerusi', kind: 'section', section: 'about', sub: 'chairman-message' },
        { id: 'secretary-message', labelAr: 'كلمة الأمين العام', labelEn: 'Secretary-General\'s Message', labelMs: 'Pesanan Setiausaha', kind: 'section', section: 'about', sub: 'secretary-message' },
        { id: 'about-partners', labelAr: 'شركاؤنا', labelEn: 'Our Partners', labelMs: 'Rakan Kami', kind: 'section', section: 'about', sub: 'partners' },
      ],
    },
    {
      id: 'programs', labelAr: 'البرامج التعليمية', labelEn: 'Educational Programs', labelMs: 'Program Pendidikan', kind: 'group',
      children: [
        { id: 'p-circles', labelAr: 'برنامج الحلقات القرآنية', labelEn: 'Quran Circles', labelMs: 'Halaqah Al-Quran', kind: 'section', section: 'programs', sub: 'quran-circles' },
        { id: 'p-safara', labelAr: 'برنامج مع السّفرة', labelEn: 'With the Scribes', labelMs: 'Bersama Para Pencatat', kind: 'section', section: 'programs', sub: 'safara' },
        { id: 'p-takween', labelAr: 'برنامج تكوين', labelEn: 'Takween Program', labelMs: 'Program Takween', kind: 'section', section: 'programs', sub: 'takween' },
        { id: 'p-snaa', labelAr: 'مخيم صناع الغد', labelEn: 'Creators of Tomorrow Camp', labelMs: 'Kem Pencipta Hari Esok', kind: 'section', section: 'programs', sub: 'creators-of-tomorrow' },
        { id: 'p-sfeerat', labelAr: 'مخيم سفيرات الأثر', labelEn: 'Ambassadors of Impact Camp', labelMs: 'Kem Duta Impak', kind: 'section', section: 'programs', sub: 'sfeerat' },
        { id: 'p-motakaf', labelAr: 'المعتكف الرمضاني', labelEn: 'Ramadan Retreat', labelMs: 'Iktikaf Ramadan', kind: 'section', section: 'programs', sub: 'ramadan-retreat' },
        { id: 'p-rihla', labelAr: 'رحلة الأثر', labelEn: 'Journey of Impact', labelMs: 'Perjalanan Impak', kind: 'section', section: 'programs', sub: 'journey-athar' },
        { id: 'p-qari', labelAr: 'قارئ أثر', labelEn: 'Athar Reciter', labelMs: 'Qari Athar', kind: 'section', section: 'programs', sub: 'qari' },
        { id: 'p-accompany', labelAr: 'البرامج المصاحبة', labelEn: 'Accompanying Programs', labelMs: 'Program Sampingan', kind: 'section', section: 'programs', sub: 'accompanying' },
      ],
    },
    {
      id: 'admission', labelAr: 'القبول والتسجيل', labelEn: 'Admission', labelMs: 'Kemasukan', kind: 'group',
      children: [
        { id: 'reg-circles', labelAr: 'التسجيل في الحلقات', labelEn: 'Register for Circles', labelMs: 'Daftar Halaqah', kind: 'section', section: 'admission', sub: 'register-circles' },
        { id: 'reg-programs', labelAr: 'التسجيل في البرامج', labelEn: 'Register for Programs', labelMs: 'Daftar Program', kind: 'section', section: 'admission', sub: 'register-programs' },
        { id: 'careers', labelAr: 'طلب التوظيف', labelEn: 'Careers', labelMs: 'Permohonan Kerja', kind: 'section', section: 'admission', sub: 'careers' },
      ],
    },
    {
      id: 'media', labelAr: 'المركز الإعلامي', labelEn: 'Media Center', labelMs: 'Pusat Media', kind: 'group',
      children: [
        { id: 'm-news', labelAr: 'الأخبار والإعلانات', labelEn: 'News & Announcements', labelMs: 'Berita', kind: 'section', section: 'media', sub: 'news' },
        { id: 'm-media', labelAr: 'الوسائط الإعلامية', labelEn: 'Media Gallery', labelMs: 'Galeri Media', kind: 'section', section: 'media', sub: 'gallery' },
        { id: 'm-library', labelAr: 'المكتبة الرقمية', labelEn: 'Digital Library', labelMs: 'Perpustakaan Digital', kind: 'section', section: 'media', sub: 'digital-library' },
        { id: 'm-calendar', labelAr: 'التقويم السنوي', labelEn: 'Annual Calendar', labelMs: 'Kalendar Tahunan', kind: 'section', section: 'media', sub: 'annual-calendar' },
      ],
    },
    {
      id: 'support', labelAr: 'المشاركة والدعم', labelEn: 'Participate & Support', labelMs: 'Sertai & Sokong', kind: 'group',
      children: [
        { id: 's-volunteer', labelAr: 'انضم كمتطوع', labelEn: 'Join as Volunteer', labelMs: 'Jadi Sukarelawan', kind: 'section', section: 'support', sub: 'volunteer' },
        { id: 's-ambassadors', labelAr: 'فريق سفراء الأثر التطوعي', labelEn: 'Athar Ambassadors Team', labelMs: 'Pasukan Duta Athar', kind: 'section', section: 'support', sub: 'ambassadors' },
      ],
    },
    {
      id: 'finance', labelAr: 'التبرعات والرسوم', labelEn: 'Donations & Fees', labelMs: 'Derma & Yuran', kind: 'group',
      children: [
        { id: 'f-donate', labelAr: 'تبرّع الآن', labelEn: 'Donate Now', labelMs: 'Derma Sekarang', kind: 'section', section: 'finance', sub: 'donate' },
        { id: 'f-pay', labelAr: 'دفع الرسوم', labelEn: 'Pay Fees', labelMs: 'Bayar Yuran', kind: 'section', section: 'finance', sub: 'pay-fees' },
        { id: 'f-calc', labelAr: 'حاسبة الرسوم', labelEn: 'Fee Calculator', labelMs: 'Kalkulator Yuran', kind: 'section', section: 'finance', sub: 'calculator' },
      ],
    },
    {
      id: 'solutions', labelAr: 'التقنيات الذكية', labelEn: 'Smart Technologies', labelMs: 'Teknologi Pintar', kind: 'group',
      children: [
        { id: 'sol-ai', labelAr: 'المعلم الذكي', labelEn: 'Smart Teacher', labelMs: 'Guru Pintar', kind: 'section', section: 'solutions', sub: 'ai-teacher' },
        { id: 'sol-ayah', labelAr: 'آية وتأمل', labelEn: 'Ayah & Reflection', labelMs: 'Ayat & Renungan', kind: 'section', section: 'solutions', sub: 'ayah-reflection' },
        { id: 'sol-calc', labelAr: 'حاسبة الرسوم', labelEn: 'Fee Calculator', labelMs: 'Kalkulator Yuran', kind: 'section', section: 'solutions', sub: 'fee-calculator' },
      ],
    },
    { id: 'faq', labelAr: 'الأسئلة الشائعة', labelEn: 'FAQ', labelMs: 'Soalan Lazim', kind: 'section', section: 'about', sub: 'faq' },
  ],
};

export const FOOTER_DEFAULTS = {
  // Section headings
  aboutHeadingAr: 'عن أكاديمية أثر',
  aboutHeadingEn: 'About Athar Academy',
  aboutHeadingMs: 'Tentang Akademi Athar',
  aboutTextAr: 'مؤسسة تعليمية رائدة تأسست في أغسطس 2024م تُعنى بتعليم القرآن الكريم وعلومه واللغة العربية.',
  aboutTextEn: 'A leading educational institution established in August 2024, dedicated to teaching the Holy Quran and Arabic.',
  aboutTextMs: 'Institusi pendidikan terkemuka yang ditubuhkan pada Ogos 2024, khusus mengajar Al-Quran dan Bahasa Arab.',

  linksHeadingAr: 'روابط مهمة',
  linksHeadingEn: 'Quick Links',
  linksHeadingMs: 'Pautan Pantas',

  contactHeadingAr: 'تواصل معنا',
  contactHeadingEn: 'Contact Us',
  contactHeadingMs: 'Hubungi Kami',

  newsletterHeadingAr: 'النشرة البريدية',
  newsletterHeadingEn: 'Newsletter',
  newsletterHeadingMs: 'Surat Berita',
  newsletterTextAr: 'اشترك لتلقي آخر أخبار الأكاديمية وبرامجها',
  newsletterTextEn: 'Subscribe to receive academy news and updates',
  newsletterTextMs: 'Langgan untuk berita dan kemas kini akademi',

  copyrightAr: 'جميع الحقوق محفوظة لأكاديمية أثر © 2026',
  copyrightEn: '© 2026 Athar Academy. All rights reserved.',
  copyrightMs: '© 2026 Akademi Athar. Hak cipta terpelihara.',
};

export const AI_COMPANION_DEFAULTS = {
  badgeAr: 'الأثر AI',
  badgeEn: 'Athar AI',
  badgeMs: 'Athar AI',
  titleAr: 'تعرف على مُعلم الأثر الذكي',
  titleEn: 'Meet your Athar AI Mu\'allim',
  titleMs: 'Kenali Mu\'allim Athar AI Anda',
  subtitleAr: 'مساعد ذكي يجيب على أسئلتك حول البرامج والتسجيل والمنح.',
  subtitleEn: 'An AI assistant that answers your questions about programs, enrollment, and grants.',
  subtitleMs: 'Pembantu AI menjawab soalan tentang program, pendaftaran, dan biasiswa.',
  placeholderAr: 'اسأل أي شيء عن الأكاديمية...',
  placeholderEn: 'Ask anything about the academy...',
  placeholderMs: 'Tanya apa-apa tentang akademi...',
};
