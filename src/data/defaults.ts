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
    descMs: 'Daftarkan anak anda dalam halaqah hafazan Al-Quran kami. Isi maklumat dan kami akan menghubungi anda.',
    headerImage: '',
    submitType: 'register_circles',
    submitLabelAr: 'تسجيل', submitLabelEn: 'Register', submitLabelMs: 'Daftar',
    successAr: 'تم استلام تسجيلك! سنتواصل معك لتأكيد الحلقة.', successEn: 'Registration received!', successMs: 'Pendaftaran diterima! Kami akan menghubungi anda.',
    fields: [
      { key: 'student', labelAr: 'اسم الطالب/الطالبة', labelEn: 'Student Name', labelMs: 'Nama Pelajar', type: 'text', required: true },
      { key: 'age', labelAr: 'العمر', labelEn: 'Age', labelMs: 'Umur', type: 'number', required: true },
      { key: 'gender', labelAr: 'الجنس', labelEn: 'Gender', labelMs: 'Jantina', type: 'select', required: true, options: 'ذكر, أنثى' },
      { key: 'guardian', labelAr: 'اسم ولي الأمر', labelEn: 'Guardian', labelMs: 'Nama Penjaga', type: 'text', required: true },
      { key: 'phone', labelAr: 'رقم جوال ولي الأمر', labelEn: 'Guardian Phone', labelMs: 'No. Telefon Penjaga', type: 'tel', required: true },
      { key: 'level', labelAr: 'المستوى/مقدار الحفظ', labelEn: 'Level', labelMs: 'Tahap / Jumlah Hafazan', type: 'text', required: false },
      { key: 'time', labelAr: 'الوقت المفضل', labelEn: 'Preferred Time', labelMs: 'Waktu Pilihan', type: 'select', required: false, options: 'صباحي, مسائي, مرن' },
    ],
  },
  {
    id: 'register-programs', section: 'admission', order: 2,
    titleAr: 'التسجيل في البرامج', titleEn: 'Register in Programs', titleMs: 'Daftar Program',
    descAr: 'سجّل في برامج الأكاديمية التعليمية والمخيمات. اختر البرنامج وعبّئ بياناتك.',
    descEn: 'Register in our educational programs and camps.',
    descMs: 'Daftar dalam program pendidikan dan kem akademi kami. Pilih program dan isi maklumat anda.',
    headerImage: '',
    submitType: 'register_programs',
    submitLabelAr: 'تسجيل', submitLabelEn: 'Register', submitLabelMs: 'Daftar',
    successAr: 'تم استلام تسجيلك في البرنامج! سنتواصل معك.', successEn: 'Program registration received!', successMs: 'Pendaftaran program diterima! Kami akan menghubungi anda.',
    fields: [
      { key: 'name', labelAr: 'الاسم الكامل', labelEn: 'Full Name', labelMs: 'Nama Penuh', type: 'text', required: true },
      { key: 'phone', labelAr: 'رقم الجوال', labelEn: 'Phone', labelMs: 'No. Telefon', type: 'tel', required: true },
      { key: 'email', labelAr: 'البريد الإلكتروني', labelEn: 'Email', labelMs: 'E-mel', type: 'email', required: false },
      { key: 'program', labelAr: 'البرنامج', labelEn: 'Program', labelMs: 'Program', type: 'select', required: true, options: 'برنامج مع السّفرة, برنامج تكوين, مخيم صناع الغد, مخيم سفيرات الأثر, المعتكف الرمضاني, رحلة الأثر, قارئ أثر' },
      { key: 'notes', labelAr: 'ملاحظات', labelEn: 'Notes', labelMs: 'Catatan', type: 'textarea', required: false },
    ],
  },
  {
    id: 'careers', section: 'admission', order: 3,
    titleAr: 'طلب التوظيف', titleEn: 'Employment Application', titleMs: 'Permohonan Kerja',
    descAr: 'انضم إلى فريق أكاديمية أثر. عبّئ النموذج وسيتواصل معك قسم الموارد البشرية.',
    descEn: 'Join the Athar Academy team.',
    descMs: 'Sertai pasukan Akademi Athar. Isi borang dan bahagian sumber manusia akan menghubungi anda.',
    headerImage: '',
    submitType: 'careers',
    submitLabelAr: 'إرسال الطلب', submitLabelEn: 'Submit Application', submitLabelMs: 'Hantar Permohonan',
    successAr: 'تم استلام طلب توظيفك بنجاح! سنراجعه ونتواصل معك.', successEn: 'Your application was received!', successMs: 'Permohonan anda diterima! Kami akan menyemak dan menghubungi anda.',
    fields: [
      { key: 'name', labelAr: 'الاسم الكامل', labelEn: 'Full Name', labelMs: 'Nama Penuh', type: 'text', required: true },
      { key: 'phone', labelAr: 'رقم الجوال', labelEn: 'Phone', labelMs: 'No. Telefon', type: 'tel', required: true },
      { key: 'email', labelAr: 'البريد الإلكتروني', labelEn: 'Email', labelMs: 'E-mel', type: 'email', required: true },
      { key: 'position', labelAr: 'الوظيفة المتقدم لها', labelEn: 'Position', labelMs: 'Jawatan Dipohon', type: 'select', required: true, options: 'معلم تحفيظ, معلمة تحفيظ, معلم لغة عربية, إداري, تقني, أخرى' },
      { key: 'qualification', labelAr: 'المؤهل العلمي', labelEn: 'Qualification', labelMs: 'Kelayakan Akademik', type: 'text', required: false },
      { key: 'experience', labelAr: 'سنوات الخبرة', labelEn: 'Experience', labelMs: 'Tahun Pengalaman', type: 'text', required: false },
      { key: 'message', labelAr: 'نبذة عنك', labelEn: 'About you', labelMs: 'Tentang Anda', type: 'textarea', required: false },
    ],
  },
  {
    id: 'volunteer', section: 'support', order: 1,
    titleAr: 'انضم كمتطوع', titleEn: 'Join as Volunteer', titleMs: 'Jadi Sukarelawan',
    descAr: 'كن جزءاً من فريق أثر التطوعي وساهم في نشر تعليم القرآن الكريم.',
    descEn: 'Join the Athar volunteer team.',
    descMs: 'Sertai pasukan sukarelawan Athar dan sumbangkan tenaga dalam menyebarkan pengajaran Al-Quran.',
    headerImage: '',
    submitType: 'volunteer',
    submitLabelAr: 'إرسال طلب التطوع', submitLabelEn: 'Submit', submitLabelMs: 'Hantar Permohonan',
    successAr: 'تم استلام طلبك! سنتواصل معك قريباً.', successEn: 'Received!', successMs: 'Diterima! Kami akan menghubungi anda tidak lama lagi.',
    fields: [
      { key: 'name', labelAr: 'الاسم الكامل', labelEn: 'Full Name', labelMs: 'Nama Penuh', type: 'text', required: true },
      { key: 'phone', labelAr: 'رقم الجوال', labelEn: 'Phone', labelMs: 'No. Telefon', type: 'tel', required: true },
      { key: 'city', labelAr: 'المدينة', labelEn: 'City', labelMs: 'Bandar', type: 'text', required: false },
      { key: 'role', labelAr: 'مجال التطوع المفضل', labelEn: 'Preferred Role', labelMs: 'Bidang Sukarela Pilihan', type: 'text', required: false },
    ],
  },
  {
    id: 'ambassadors', section: 'support', order: 2,
    titleAr: 'فريق سفراء الأثر التطوعي', titleEn: 'Athar Ambassadors Team', titleMs: 'Pasukan Duta Athar',
    descAr: 'انضم لفريق سفراء الأثر وكن جزءاً من نشر القرآن الكريم وخدمة طلابه.',
    descEn: 'Join the Athar Ambassadors team.',
    descMs: 'Sertai pasukan Duta Athar dan jadilah sebahagian daripada penyebaran Al-Quran.',
    headerImage: '',
    submitType: 'ambassadors',
    submitLabelAr: 'انضم للسفراء', submitLabelEn: 'Join', submitLabelMs: 'Sertai Pasukan',
    successAr: 'تم استلام طلبك للانضمام للسفراء! سنتواصل معك.', successEn: 'Received!', successMs: 'Diterima! Kami akan menghubungi anda.',
    fields: [
      { key: 'name', labelAr: 'الاسم الكامل', labelEn: 'Full Name', labelMs: 'Nama Penuh', type: 'text', required: true },
      { key: 'phone', labelAr: 'رقم الجوال', labelEn: 'Phone', labelMs: 'No. Telefon', type: 'tel', required: true },
      { key: 'city', labelAr: 'المدينة', labelEn: 'City', labelMs: 'Bandar', type: 'text', required: false },
      { key: 'skills', labelAr: 'مهاراتك', labelEn: 'Skills', labelMs: 'Kemahiran Anda', type: 'textarea', required: false },
    ],
  },
  {
    id: 'donate', section: 'finance', order: 1,
    titleAr: 'تبرّع الآن', titleEn: 'Donate', titleMs: 'Derma',
    descAr: 'ساهم في كفالة حلقة قرآنية أو طالب، ودعم مسيرة أكاديمية أثر. كل تبرع له أثر باقٍ.',
    descEn: 'Support a Quran circle or a student.',
    descMs: 'Sokong halaqah Al-Quran atau seorang pelajar dan bantu perjalanan Akademi Athar. Setiap derma meninggalkan kesan.',
    headerImage: '',
    submitType: 'donation',
    submitLabelAr: 'إرسال طلب التبرع', submitLabelEn: 'Submit Donation', submitLabelMs: 'Hantar Derma',
    successAr: 'شكراً لك! تم استلام طلب تبرعك وسنتواصل معك لإتمامه.', successEn: 'Thank you! Received.', successMs: 'Terima kasih! Derma anda diterima.',
    fields: [
      { key: 'name', labelAr: 'الاسم الكامل', labelEn: 'Full Name', labelMs: 'Nama Penuh', type: 'text', required: true },
      { key: 'phone', labelAr: 'رقم الجوال', labelEn: 'Phone', labelMs: 'No. Telefon', type: 'tel', required: true },
      { key: 'email', labelAr: 'البريد الإلكتروني', labelEn: 'Email', labelMs: 'E-mel', type: 'email', required: false },
      { key: 'type', labelAr: 'نوع التبرع', labelEn: 'Donation Type', labelMs: 'Jenis Derma', type: 'select', required: true, options: 'كفالة حلقة كاملة, كفالة طالب, دعم منحة الأثر, تبرع عام' },
      { key: 'amount', labelAr: 'المبلغ (رينغيت)', labelEn: 'Amount (MYR)', labelMs: 'Jumlah (MYR)', type: 'number', required: false },
    ],
  },
  {
    id: 'pay-fees', section: 'finance', order: 2,
    titleAr: 'دفع الرسوم', titleEn: 'Pay Fees', titleMs: 'Bayar Yuran',
    descAr: 'سدّد رسوم الاشتراك في الحلقات والبرامج. عبّئ بياناتك وسنرسل لك تفاصيل السداد.',
    descEn: 'Pay your subscription fees.',
    descMs: 'Bayar yuran langganan halaqah dan program. Isi maklumat anda dan kami akan menghantar butiran pembayaran.',
    headerImage: '',
    submitType: 'fee_payment',
    submitLabelAr: 'إرسال طلب السداد', submitLabelEn: 'Submit', submitLabelMs: 'Hantar',
    successAr: 'تم استلام طلب السداد! سنرسل لك تفاصيل الدفع.', successEn: 'Received!', successMs: 'Diterima! Butiran pembayaran akan dihantar kepada anda.',
    fields: [
      { key: 'name', labelAr: 'اسم الطالب', labelEn: 'Student Name', labelMs: 'Nama Pelajar', type: 'text', required: true },
      { key: 'phone', labelAr: 'رقم الجوال', labelEn: 'Phone', labelMs: 'No. Telefon', type: 'tel', required: true },
      { key: 'program', labelAr: 'الحلقة/البرنامج', labelEn: 'Program', labelMs: 'Halaqah / Program', type: 'text', required: true },
      { key: 'amount', labelAr: 'المبلغ (رينغيت)', labelEn: 'Amount (MYR)', labelMs: 'Jumlah (MYR)', type: 'number', required: false },
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
    { titleAr: 'بداية الحلقات القرآنية', titleEn: 'Quran circles begin', titleMs: 'Halaqah Al-Quran bermula', dateAr: 'سبتمبر', dateEn: 'September', dateMs: 'September' },
    { titleAr: 'مخيم صنّاع الغد', titleEn: 'Creators of Tomorrow Camp', titleMs: 'Kem Pencipta Hari Esok', dateAr: 'يونيو', dateEn: 'June', dateMs: 'Jun' },
    { titleAr: 'برنامج مع السّفرة', titleEn: 'With the Scribes Program', titleMs: 'Program Bersama Para Pencatat', dateAr: 'ديسمبر', dateEn: 'December', dateMs: 'Disember' },
    { titleAr: 'المعتكف الرمضاني', titleEn: 'Ramadan Retreat', titleMs: 'Iktikaf Ramadan', dateAr: 'رمضان', dateEn: 'Ramadan', dateMs: 'Ramadan' },
    { titleAr: 'حفل تخريج الحفاظ', titleEn: 'Huffaz graduation', titleMs: 'Majlis Graduasi Huffaz', dateAr: 'مايو', dateEn: 'May', dateMs: 'Mei' },
  ],
};

// Current / upcoming events (editable from the dashboard → "الفعاليات الحالية")
export const EVENTS_DEFAULTS = [
  {
    id: 'event-1',
    image: '/صناع الغد.jpg',
    badgeAr: 'مخيم', badgeEn: 'Camp', badgeMs: 'Kem',
    titleAr: 'مخيم صنّاع الغد', titleEn: 'Creators of Tomorrow Camp', titleMs: 'Kem Pencipta Hari Esok',
    descAr: 'مخيم تربوي مهاري مكثف للبنين يجمع بين البناء القيمي والأخلاقي والرياضة وبناء مهارات القيادة والاعتماد على النفس.',
    descEn: 'An intensive residential camp for boys combining character building, sports, leadership skills, and self-reliance.',
    descMs: 'Kem kediaman intensif untuk pelajar lelaki menggabungkan pembinaan karakter, sukan, kepimpinan, dan berdikari.',
  },
  {
    id: 'event-2',
    image: '/حفل اثر.jpeg',
    badgeAr: 'حفل تكريم', badgeEn: 'Ceremony', badgeMs: 'Majlis',
    titleAr: 'حفل أثر', titleEn: 'Athar Ceremony', titleMs: 'Majlis Athar',
    descAr: 'حفل تكريم الطلاب المتميزين والفائزين في برنامج مع السفرة.',
    descEn: 'Honoring distinguished students and winners of the With the Scribes program.',
    descMs: 'Majlis penghargaan pelajar cemerlang dan pemenang program Bersama Para Pencatat.',
  },
];

export const HERO_DEFAULTS = {
  videoUrl: '/مع السفرة 2 _ هنا يرتسم الأثر ✨.mp4',
  videos: [
    {
      id: 'vid-1',
      titleAr: 'مع السفرة 2 — هنا يرتسم الأثر',
      titleEn: 'With the Scribes 2',
      titleMs: 'Bersama Para Pencatat 2',
      url: '/مع السفرة 2 _ هنا يرتسم الأثر ✨.mp4',
    }
  ],
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
  ctaSecondaryAr: 'تبرّع الآن',
  ctaSecondaryEn: 'Donate',
  ctaSecondaryMs: 'Derma',
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
  // Pillars (Replaced with Educational Programs)
  pillarsHeadingAr: 'أهم البرامج في أكاديمية أثر',
  pillarsHeadingEn: 'Our Key Programs',
  pillarsHeadingMs: 'Program-Program Utama Kami',
  pillarsTaglineAr: 'برامجنا التعليمية',
  pillarsTaglineEn: 'OUR PROGRAMS',
  pillarsTaglineMs: 'PROGRAM KAMI',
  pillarsSubAr: 'نقدم باقة من البرامج المتميزة والمخيمات الموسمية الموجهة لمختلف الفئات العمرية بهدف تنشئة جيل قرآني قيادي.',
  pillarsSubEn: 'We offer a range of distinguished programs and seasonal camps designed for different age groups to nurture a Quranic and leading generation.',
  pillarsSubMs: 'Kami menawarkan pelbagai program utama dan kem bermusim yang direka untuk pelbagai peringkat umur.',
  pillars: [
    {
      id: 'pillar-1',
      icon: 'BookOpen',
      img: 'https://images.unsplash.com/photo-1584281729059-3d5a7ab24934?auto=format&fit=crop&q=80&w=400',
      titleAr: 'الحلقات القرآنية',
      titleEn: 'Quran Circles',
      titleMs: 'Halaqah Al-Quran',
      descAr: 'حلقات ممتدة لحفظ القرآن وضبطه غيباً وتلاوته وتجويده لجميع الأعمار تحت إشراف قراء مجازين بالسند.',
      descEn: 'Continuous circles for memorizing, reciting, and mastering the Holy Quran for all ages under licensed Huffaz.',
      descMs: 'Halaqah Al-Quran interaktif untuk hafazan, bacaan, dan penguasaan Tajwid untuk semua peringkat umur di bawah seliaan guru bertauliah.',
    },
    {
      id: 'pillar-2',
      icon: 'Award',
      img: 'https://images.unsplash.com/photo-1590076215667-87373f82cb38?auto=format&fit=crop&q=80&w=400',
      titleAr: 'برنامج مع السفرة',
      titleEn: 'With the Scribes Program',
      titleMs: 'Program Bersama Para Malaikat',
      descAr: 'برنامج مخصص لإعداد وتأهيل الحفاظ المتقنين للحصول على الإسناد المتصل بالرحاب النبوية.',
      descEn: 'Specialized program to prepare and license memorizers with high connected Sanad.',
      descMs: 'Program khusus untuk melatih dan memberi pentauliahan Sanad hafazan kepada para huffaz.',
    },
    {
      id: 'pillar-3',
      icon: 'Users',
      img: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=400',
      titleAr: 'مخيم صناع الغد',
      titleEn: 'Creators of Tomorrow Camp',
      titleMs: 'Kem Pencipta Hari Esok',
      descAr: 'برنامج تربوي قيمي لبناء المهارات القيادية وغرس الأخلاق القرآنية في نفوس الشباب.',
      descEn: 'A value-based educational program to build leadership skills and Quranic character in youth.',
      descMs: 'Program kepimpinan berasaskan nilai untuk membina jati diri dan akhlak Al-Quran dalam kalangan remaja.',
    },
    {
      id: 'pillar-4',
      icon: 'GraduationCap',
      img: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=400',
      titleAr: 'مخيم سفيرات الأثر',
      titleEn: 'Ambassadors of Impact Camp',
      titleMs: 'Kem Duta Impak',
      descAr: 'مخيم خاص بالفتيات لتمكينهن بالمهارات الحياتية والتربوية وترك أثر طيب في مجتمعهن.',
      descEn: 'A special camp for girls to empower them with life and educational skills to leave a lasting impact.',
      descMs: 'Kem khusus untuk golongan wanita/gadis bagi memperkasa kemahiran hidup dan kepimpinan.',
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
        { id: 'about-partners', labelAr: 'شركاؤنا', labelEn: 'Our Partners', labelMs: 'Rakan Kami', kind: 'section', section: 'home', sub: 'partners' },
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
        { id: 'm-news', labelAr: 'الأخبار والإعلانات', labelEn: 'News & Announcements', labelMs: 'Berita & Pengumuman', kind: 'section', section: 'media', sub: 'news' },
        { id: 'm-library', labelAr: 'المكتبة الرقمية', labelEn: 'Digital Library', labelMs: 'Perpustakaan Digital', kind: 'section', section: 'media', sub: 'digital-library' },
        { id: 'm-gallery', labelAr: 'الصور والفيديو', labelEn: 'Photo & Video Gallery', labelMs: 'Galeri Foto & Video', kind: 'section', section: 'media', sub: 'gallery' },
        {
          id: 'm-calendar', labelAr: 'التقويم السنوي', labelEn: 'Annual Calendar', labelMs: 'Kalendar Tahunan', kind: 'group',
          section: 'media', sub: 'annual-calendar',
          children: [
            { id: 'm-cal-calendar', labelAr: 'التقويم السنوي', labelEn: 'Annual Calendar', labelMs: 'Kalendar Tahunan', kind: 'section', section: 'media', sub: 'annual-calendar' },
            { id: 'm-cal-events', labelAr: 'الفعاليات الحالية', labelEn: 'Active Events', labelMs: 'Acara Aktif', kind: 'section', section: 'media', sub: 'events-list' },
          ],
        },
      ],
    },
    { id: 'support', labelAr: 'انضم كمتطوع', labelEn: 'Join as Volunteer', labelMs: 'Jadi Sukarelawan', kind: 'section', section: 'support', sub: 'volunteer' },
    {
      id: 'finance', labelAr: 'التبرعات والرسوم', labelEn: 'Donations & Fees', labelMs: 'Derma & Yuran', kind: 'group',
      children: [
        { id: 'f-donate', labelAr: 'تبرّع الآن', labelEn: 'Donate', labelMs: 'Derma', kind: 'section', section: 'finance', sub: 'donate' },
        { id: 'f-pay', labelAr: 'دفع الرسوم', labelEn: 'Pay Fees', labelMs: 'Bayar Yuran', kind: 'section', section: 'finance', sub: 'pay-fees' },
        { id: 'f-calc', labelAr: 'حاسبة الرسوم', labelEn: 'Fee Calculator', labelMs: 'Kalkulator Yuran', kind: 'section', section: 'finance', sub: 'calculator', _hidden: true },
      ],
    },
    {
      id: 'solutions', labelAr: 'التقنيات الذكية', labelEn: 'Smart Technologies', labelMs: 'Teknologi Pintar', kind: 'group',
      children: [
        { id: 'sol-ai', labelAr: 'المعلم الذكي', labelEn: 'Smart Teacher', labelMs: 'Guru Pintar', kind: 'section', section: 'solutions', sub: 'ai-teacher' },
        { id: 'sol-ayah', labelAr: 'آية وتأمل', labelEn: 'Ayah & Reflection', labelMs: 'Ayat & Renungan', kind: 'section', section: 'solutions', sub: 'ayah-reflection' },
        { id: 'sol-calc', labelAr: 'حاسبة الرسوم', labelEn: 'Fee Calculator', labelMs: 'Kalkulator Yuran', kind: 'section', section: 'solutions', sub: 'fee-calculator', _hidden: true },
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
