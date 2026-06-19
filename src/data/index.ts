import { Program, StudentProfile, QuranVerse, FAQItem } from '@/types';

// ==========================================================================
// 1. CORE PROGRAMS DATA
// ==========================================================================
export const PROGRAMS: Program[] = [
  {
    id: 'boys-quran',
    titleEn: 'Boys Quran Memorization Circles',
    titleAr: 'حلقات البنين لتحفيظ القرآن الكريم',
    titleMs: 'Halaqah Tahfiz Al-Quran Kanak-Kanak Lelaki',
    category: 'boys',
    descriptionEn: 'Daily spiritual circles dedicated to Quranic memorization, proper Tajweed rules, and character refinement, overseen by certified reciters.',
    descriptionAr: 'حلقات يومية تربوية تعنى بتحفيظ كتاب الله تعالى، وضبط أحكام التجويد، وترسيخ القيم الإسلامية والأثر الحسن، بإشراف نخبة من القراء المجازين بالاتصال.',
    descriptionMs: 'Halaqah kerohanian harian khusus untuk hafazan Al-Quran, hukum Tajwid yang betul, dan pemantapan akhlak, dipantau oleh para qari yang diiktiraf.',
    durationEn: 'Continuous (Year-round enrolment)',
    durationAr: 'مستمر ومفتوح طوال العام',
    durationMs: 'Berterusan (Pendaftaran sepanjang tahun)',
    ageRulesEn: 'Ages 7 to 18 years',
    ageRulesAr: 'من سن 7 سنوات إلى 18 سنة',
    ageRulesMs: 'Umur 7 hingga 18 tahun',
    scheduleEn: 'Sunday to Wednesday, 4:00 PM - 6:30 PM',
    scheduleAr: 'من الأحد إلى الأربعاء، 4:00 مساءً - 6:30 مساءً',
    scheduleMs: 'Ahad hingga Rabu, 4:00 PM - 6:30 PM',
    pricePerMonth: 45,
    syllabusEn: ['Introduction to Tajweed Rules', 'Memorization of Juz 28, 29 & 30', 'Practical application of Quranic manners', 'Basic Islamic Creed & Daily Supplications'],
    syllabusAr: ['مقدمة في أحكام التجويد الأساسية', 'حفظ الأجزاء الثلاثة الأخيرة (عمّ وتبارك وقد سمع)', 'تطبيقات عملية للآداب والعلوم السلوكية', 'العقيدة الميسرة والأذكار اليومية المأثورة'],
    syllabusMs: ['Pengenalan kepada Hukum Tajwid', 'Hafazan Juz 28, 29 & 30', 'Aplikasi praktikal adab Al-Quran', 'Aqidah Asas & Doa Harian'],
    teacherEn: 'Sheikh Dr. Ahmad Al-Mansour (Ijazah in 10 Qira\'at)',
    teacherAr: 'الشيخ الدكتور أحمد المنصور (مُجاز بالقراءات العشر المتواترة)',
    teacherMs: 'Syeikh Dr. Ahmad Al-Mansour (Ijazah 10 Qiraat)'
  },
  {
    id: 'girls-quran',
    titleEn: 'Girls Quran & Tajweed Sanctuary',
    titleAr: 'حلقات البنات والتربية بالقرآن الكريم',
    titleMs: 'Halaqah Al-Quran & Tajwid Kanak-Kanak Perempuan',
    category: 'girls',
    descriptionEn: 'An inspiring sisterhood focused on thorough Quranic memorization, Tajweed artistry, Islamic sisterhood, and character development under female scholars.',
    descriptionAr: 'واحة قرآنية تربوية للفتيات، تهدف إلى حفظ القرآن الكريم بإتقان وتجويد، وبناء الفتاة الصالحة ذات الأثر الطيب في مجتمعها، بتأطير نخبة من المعلمات الحافظات المجازات.',
    descriptionMs: 'Suasana persaudaraan yang memberi inspirasi memfokuskan kepada hafazan Al-Quran yang mantap, seni Tajwid, persaudaraan Islam, dan pembangunan sahsiah di bawah bimbingan ustazah bertauliah.',
    durationEn: 'Continuous (Year-round enrolment)',
    durationAr: 'مستمر ومفتوح طوال العام',
    durationMs: 'Berterusan (Pendaftaran sepanjang tahun)',
    ageRulesEn: 'Ages 6 to 22 years',
    ageRulesAr: 'من سن 6 سنوات إلى 22 سنة',
    ageRulesMs: 'Umur 6 hingga 22 tahun',
    scheduleEn: 'Sunday to Wednesday, 4:00 PM - 6:30 PM',
    scheduleAr: 'من الأحد إلى الأربعاء، 4:00 مساءً - 6:30 مساءً',
    scheduleMs: 'Ahad hingga Rabu, 4:00 PM - 6:30 PM',
    pricePerMonth: 45,
    syllabusEn: ['Thorough Memorization with Revision', 'The Golden Rules of Pronunciation', 'Stories of Women in the Quran', 'Islamic Manners & Devotionals'],
    syllabusAr: ['الحفظ المنهجي مع المراجعة المكثفة التراكمية', 'مخارج الحروف والصفات التطبيقية', 'دراسة قصص النساء المؤثرات في القرآن', 'منهج الآداب النبوية والعبادات اليومية'],
    syllabusMs: ['Hafazan Mantap dengan Ulangkaji', 'Hukum Tajwid dan Sebutan Emas', 'Kisah-Kisah Wanita dalam Al-Quran', 'Adab Islam & Ibadah Harian'],
    teacherEn: 'Sheikha Fatima Al-Hussaini (Master of Hadith Science)',
    teacherAr: 'الشيخة فاطمة الحسيني (ماجستير في علوم الحديث والقرآن)',
    teacherMs: 'Ustazah Fatima Al-Hussaini (Sarjana Sains Hadis)'
  },
  {
    id: 'sharia-foundation',
    titleEn: 'Sharia & Islamic Science Foundation',
    titleAr: 'البرنامج التمهيدي لتأصيل العلوم الشرعية',
    titleMs: 'Asas Syariah & Sains Islam',
    category: 'general',
    descriptionEn: 'A structured introducing students to foundational Islamic sciences: Aqeedah, Fiqh, Hadith, Seerah, and Islamic history.',
    descriptionAr: 'برنامج علمي متكامل مخصص لبناء الوعي الشرعي والفكري لدى الأجيال الناشئة، يضم مبادئ العقيدة الصحيحة، الفقه الميسّر، السيرة النبوية العطرة، والأخلاق والآداب.',
    descriptionMs: 'Program berstruktur memperkenalkan pelajar kepada sains asas Islam: Aqidah, Fikah, Hadis, Sirah, dan sejarah Islam.',
    durationEn: '4 Months (Semesterly certificate program)',
    durationAr: '4 أشهر (فصل دراسي ينتهي بشهادة معتمدة)',
    durationMs: '4 Bulan (Program sijil setiap semester)',
    ageRulesEn: 'Youth and Adults (15+ years)',
    ageRulesAr: 'للشباب والكبار من سن 15 سنة فما فوق',
    ageRulesMs: 'Belia dan Dewasa (15+ tahun)',
    scheduleEn: 'Every Thursday and Saturday, 5:30 PM - 8:30 PM',
    scheduleAr: 'خميس وسبت من كل أسبوع، 5:30 مساءً - 8:30 مساءً',
    scheduleMs: 'Setiap Khamis dan Sabtu, 5:30 PM - 8:30 PM',
    pricePerMonth: 60,
    syllabusEn: ['Introduction to Fiqh of Worship', 'Summary of Seerah Nabawiyah (Prophet\'s Biography)', 'Forty Hadith of Al-Nawawi study', 'Contemporary Intellectual Awareness'],
    syllabusAr: ['مدخل إلى فقه العبادات (الطهارة، الصلاة، الصيام)', 'خلاصة السيرة النبوية الميسرة لشأن المعصوم', 'شرح الأربعين النووية مع الفوائد التربوية', 'مفاهيم الأمن الفكري ومواجهة الشبهات المعاصرة'],
    syllabusMs: ['Pengenalan Fikah Ibadah', 'Ringkasan Sirah Nabawiyah (Biografi Nabi)', 'Kajian Hadis Empat Puluh Al-Nawawi', 'Kesedaran Intelektual Kontemporari'],
    teacherEn: 'Dr. Abdul-Rahman Al-Ghamdi (Associate Professor of Fiqh)',
    teacherAr: 'فضيلة الشيخ الأستاذ الدكتور عبد الرحمن الغامدي',
    teacherMs: 'Dr. Abdul-Rahman Al-Ghamdi (Profesor Madya Fikah)'
  },
  {
    id: 'maqra-sanad',
    titleEn: 'Recitation Mastery & Connected Sanad',
    titleAr: 'مقرأة الإجازة بالسند المتصل إلى رسول الله ﷺ',
    titleMs: 'Penguasaan Bacaan & Sanad Bersambung',
    category: 'general',
    descriptionEn: 'The highest academic tier for seasoned memorizers aiming to obtain an authentic chain of narration (Sanad) representing classical precision.',
    descriptionAr: 'برنامج النخبة المخصص للحفاظ والحافظات المتقنين الراغبين في ضبط الأداء وعرض الختمة الكاملة، لنيل شهادة الإجازة بالسند المتصل بروايات متعددة.',
    descriptionMs: 'Tahap akademik tertinggi untuk penghafaz berpengalaman bertujuan mendapatkan rantaian periwayatan sahih (Sanad) yang mewakili ketepatan klasik.',
    durationEn: 'Based on student performance (typical 8-12 months)',
    durationAr: 'حسب همة الطالب وأدائه (بين 8 إلى 12 شهراً غالباً)',
    durationMs: 'Berdasarkan prestasi pelajar (biasanya 8-12 bulan)',
    ageRulesEn: 'Huffaz with complete Quran memorization',
    ageRulesAr: 'للحافظين والحافظات لكامل كتاب الله تعالى',
    ageRulesMs: 'Huffaz dengan hafazan Al-Quran yang lengkap',
    scheduleEn: 'Personalized 1-on-1 sessions, twice a week',
    scheduleAr: 'متابعة فردية شيخ لطالب، مرتين أسبوعياً (مرن)',
    scheduleMs: 'Sesi peribadi 1-ke-1, dua kali seminggu',
    pricePerMonth: 80,
    syllabusEn: ['Theoretical Shatibiyyah studies', 'Full Quran recitation with meticulous articulation', 'Phonetic nuances & historical Qira\'at variations', 'Sanad authentication exam'],
    syllabusAr: ['دراسة نظرية منظومة الشاطبية ومقدمة الجزرية', 'عرض الختمة كاملة غيباً من الفاتحة إلى الناس', 'تحقيق دقائق الأداء الصوتي والوجوه الجائزة وقواعد الرسم', 'اختبار لجنة المشايخ لمنح الإسناد'],
    syllabusMs: ['Kajian teori Shatibiyyah', 'Bacaan Al-Quran penuh dengan sebutan yang teliti', 'Nuansa fonetik & variasi Qiraat sejarah', 'Peperiksaan pengesahan Sanad'],
    teacherEn: 'Sheikh Al-Muqri\' Yahya Al-Ansari (Owner of high-chain Sanad)',
    teacherAr: 'فضيلة الشيخ المقرئ يحيى الأنصاري (صاحب السند العالي ومحكم دولي)',
    teacherMs: 'Syeikh Al-Muqri\' Yahya Al-Ansari (Pemegang Sanad Rantaian Tinggi)'
  },
  {
    id: 'kids-noorania',
    titleEn: 'Noorania Foundation for Little Learners',
    titleAr: 'حلقة نور البينات للأطفال (القاعدة النورانية)',
    titleMs: 'Asas Noorania untuk Pelajar Cilik',
    category: 'kids',
    descriptionEn: 'Building natural pronunciation, fluent Quran reading, and writing skills for sweet children utilizing the classic Nouras Arabic method.',
    descriptionAr: 'برنامج تأسيسي تفاعلي يبني الفصاحة اللغوية للأطفال، ومهارات قراءة القرآن الكريم برسم المصحف، عبر تدريب حيوي على النطق الصحيح للحروف.',
    descriptionMs: 'Membina sebutan semula jadi, pembacaan Al-Quran yang lancar, dan kemahiran menulis untuk kanak-kanak menggunakan kaedah klasik Qaida Noorania.',
    durationEn: '3 Months intensive training',
    durationAr: '3 أشهر مدة الدورة كاملة',
    durationMs: 'Latihan intensif 3 Bulan',
    ageRulesEn: 'Ages 4 to 7 years',
    ageRulesAr: 'للأطفال البراعم من سن 4 إلى 7 سنوات',
    ageRulesMs: 'Umur 4 hingga 7 tahun',
    scheduleEn: 'Monday, Tuesday & Wednesday, 3:30 PM - 5:00 PM',
    scheduleAr: 'الإثنين، الثلاثاء والأربعاء، 3:30 مساءً - 5:00 مساءً',
    scheduleMs: 'Isnin, Selasa & Rabu, 3:30 PM - 5:00 PM',
    pricePerMonth: 35,
    syllabusEn: ['Orthodox Arabic letter configurations', 'Harakaat & Tanween articulation', 'Short stories of prophets for kids', 'Memorization of short Surahs (An-Nas to Ad-Duha)'],
    syllabusAr: ['مخارج الحروف الهجائية مفرداً ومركباً', 'الحركات والتنوين والمدود والسكون والتشديد والتنوين', 'حزب قصار السور من سورة الناس إلى الضحى', 'قصص الأنبياء المصورة والآداب البسيطة'],
    syllabusMs: ['Konfigurasi huruf Arab ortodoks', 'Sebutan Harakat & Tanween', 'Kisah ringkas para nabi untuk kanak-kanak', 'Hafazan surah-surah pendek (An-Nas hingga Ad-Duha)'],
    teacherEn: 'Ustadha Amina Al-Hadi (Specialist in Early Childhood Quran)',
    teacherAr: 'الأستاذة أمينة الهادي (أخصائية رياض أطفال وتعليم نوراني)',
    teacherMs: 'Ustazah Amina Al-Hadi (Pakar Al-Quran Awal Kanak-Kanak)'
  }
];

// ==========================================================================
// 2. STUDENT PROFILES DATA (Keep for mock success stories & logs view)
// ==========================================================================
export const STUDENT_PROFILES: StudentProfile[] = [
  {
    id: 'student-1',
    nameEn: 'Musa Al-Ghazali',
    nameAr: 'موسى الغزالي',
    nameMs: 'Musa Al-Ghazali',
    avatar: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&q=80&w=200',
    classEn: 'Imam Malik Circle (Juz 28-30)',
    classAr: 'حلقة الإمام مالك (الأجزاء من 28 إلى 30)',
    classMs: 'Halaqah Imam Malik (Juz 28-30)',
    teacherEn: 'Sheikh Dr. Ahmad Al-Mansour',
    teacherAr: 'الشيخ الدكتور أحمد المنصور',
    teacherMs: 'Syeikh Dr. Ahmad Al-Mansour',
    hifzProgress: 78,
    memorizedJuzs: [30, 29],
    currentSurahEn: 'Al-Mulk',
    currentSurahAr: 'الملك',
    currentSurahMs: 'Al-Mulk',
    dailyTargetEn: 'Memorize Al-Mulk: Verses 15 to 25',
    dailyTargetAr: 'حفظ سورة الملك: الآيات 15 إلى 25',
    dailyTargetMs: 'Hafazan Al-Mulk: Ayat 15 hingga 25',
    recentLogs: [
      {
        id: 'log-1',
        date: '2026-06-04',
        surahEn: 'Al-Mulk',
        surahAr: 'الملك',
        surahMs: 'Al-Mulk',
        verses: '1 - 14',
        grade: 'A+',
        typeEn: 'Memorization',
        typeAr: 'تسميع جديد',
        typeMs: 'Hafazan',
        notesEn: 'Outstanding recitation! Perfect retention of Tajweed rules and vowels. Baarak Allah Feek.',
        notesAr: 'قراءة متميزة ومتقنة تبارك الرحمن! ضبط تام للمخارج والغنن والمدود. بارك الله فيك.',
        notesMs: 'Bacaan yang luar biasa! Pengekalan hukum Tajwid dan harakat yang sempurna. Barakallah Feek.'
      },
      {
        id: 'log-2',
        date: '2026-06-03',
        surahEn: 'Al-Jinn',
        surahAr: 'الجن',
        surahMs: 'Al-Jinn',
        verses: '15 - 28',
        grade: 'A',
        typeEn: 'Revision',
        typeAr: 'مراجعة',
        typeMs: 'Ulangkaji',
        notesEn: 'Excellent review. Minor slip in verse 21 quickly auto-corrected.',
        notesAr: 'مراجعة ممتازة تبارك الرحمن، كان هناك تردد يسير في الآية 21 وتم تداركه سريعاً.',
        notesMs: 'Ulangkaji yang cemerlang. Sedikit kesilapan pada ayat 21 berjaya diperbetulkan sendiri dengan cepat.'
      }
    ],
    badges: [
      {
        id: 'badge-1',
        titleEn: 'Golden Crown',
        titleAr: 'التاج الذهبي',
        titleMs: 'Mahkota Emas',
        icon: '👑',
        color: 'bg-amber-100 border-amber-400 text-amber-700',
        unlockedAt: '2026-05-15'
      },
      {
        id: 'badge-2',
        titleEn: 'Tajweed Virtuoso',
        titleAr: 'سفير التجويد',
        titleMs: 'Pakar Tajwid',
        icon: '💎',
        color: 'bg-emerald-100 border-emerald-400 text-emerald-700',
        unlockedAt: '2026-05-28'
      }
    ]
  },
  {
    id: 'student-2',
    nameEn: 'Fatima Al-Zahra',
    nameAr: 'فاطمة الزهراء',
    nameMs: 'Fatima Al-Zahra',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    classEn: 'Sheikha Fatima Sanctuary (Juz 26-30)',
    classAr: 'حلقة أم المؤمنين خديجة (الأجزاء من 26 إلى 30)',
    classMs: 'Halaqah Sayyidah Fatima (Juz 26-30)',
    teacherEn: 'Sheikha Fatima Al-Hussaini',
    teacherAr: 'الشيخة فاطمة الحسيني',
    teacherMs: 'Ustazah Fatima Al-Hussaini',
    hifzProgress: 91,
    memorizedJuzs: [30, 29, 28, 27],
    currentSurahEn: 'Al-Fath',
    currentSurahAr: 'الفتح',
    currentSurahMs: 'Al-Fath',
    dailyTargetEn: 'Memorize Al-Fath: Verses 1 to 10',
    dailyTargetAr: 'حفظ سورة الفتح: الآيات 1 إلى 10',
    dailyTargetMs: 'Hafazan Al-Fath: Ayat 1 hingga 10',
    recentLogs: [
      {
        id: 'log-4',
        date: '2026-06-03',
        surahEn: 'Al-Hujurat',
        surahAr: 'الحجرات',
        surahMs: 'Al-Hujurat',
        verses: 'Full Surah',
        grade: 'A+',
        typeEn: 'Revision',
        typeAr: 'مراجعة',
        typeMs: 'Ulangkaji',
        notesEn: 'Impeccable recitation from memory without a single mistake. Mashallah, a shining example.',
        notesAr: 'عرض متميز لكامل السورة غيباً دون أي خطأ أو تردد. بارك الله في والديك وجعلك قرة عين لهما.',
        notesMs: 'Bacaan lancar daripada ingatan tanpa sebarang kesilapan. Masya-Allah, contoh yang sangat baik.'
      }
    ],
    badges: [
      {
        id: 'badge-1',
        titleEn: 'Golden Crown',
        titleAr: 'التاج الذهبي',
        titleMs: 'Mahkota Emas',
        icon: '👑',
        color: 'bg-amber-100 border-amber-400 text-amber-700',
        unlockedAt: '2026-04-10'
      },
      {
        id: 'badge-5',
        titleEn: 'Sovereign Reciter',
        titleAr: 'سيد الحفاظ المتقنين',
        titleMs: 'Qari Ulung',
        icon: '🛡️',
        color: 'bg-purple-100 border-purple-400 text-purple-700',
        unlockedAt: '2026-05-25'
      }
    ]
  }
];

// ==========================================================================
// 3. DAILY REFLECTION AYAH DATA
// ==========================================================================
export const DAILY_AYAHS: QuranVerse[] = [
  {
    id: 1,
    surahEn: 'Al-Muzzammil',
    surahAr: 'المزمل',
    surahMs: 'Al-Muzzammil',
    ayahNumber: 4,
    textAr: 'وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا',
    textEn: 'And recite the Qur\'an with measured recitation.',
    textMs: 'Dan bacalah Al-Quran itu dengan perlahan-lahan (tartil).',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/073004.mp3',
    reflectionAr: 'الترتيل ليس مجرد قراءة هادئة، بل هو تدبّر للآيات ليخالط الإيمان شغاف قلبك وتكون متبعاً لهدي نبيك ﷺ.',
    reflectionEn: 'Measured recitation (Tarteel) isn\'t just slow reading; it represents deep contemplation to let the divine lights permeate your heart.',
    reflectionMs: 'Membaca secara tartil bukan sekadar membaca dengan lambat; ia melambangkan renungan mendalam untuk membiarkan cahaya ketuhanan meresap ke dalam hati.'
  },
  {
    id: 2,
    surahEn: 'Al-Ankabut',
    surahAr: 'العنكبوت',
    surahMs: 'Al-Ankabut',
    ayahNumber: 45,
    textAr: 'اتْلُ مَا أُوحِيَ إِلَيْكَ مِنَ الْكِتَابِ وَأَقِمِ الصَّلَاةَ ۖ',
    textEn: 'Recite, [O Muhammad], what has been revealed to you of the Book and establish prayer...',
    textMs: 'Bacalah apa yang diwahyukan kepadamu, iaitu Al-Kitab (Al-Quran) dan dirikanlah solat...',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/029045.mp3',
    reflectionAr: 'تلاوة الأثر وحيه تنجيك وتبني في فؤادك حصناً منيعاً يقيك من ظلمات الفتن والشهوات المعاصرة.',
    reflectionEn: 'The continuous recitation of the Divine Book serves as a fortress protecting the believer from the confusion of contemporary life.',
    reflectionMs: 'Membaca Kitab Suci secara berterusan berfungsi sebagai benteng yang melindungi orang beriman daripada kekeliruan kehidupan kontemporari.'
  }
];

// ==========================================================================
// 4. FAQS DATA
// ==========================================================================
export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'admissions',
    questionEn: 'How can I enroll in Athar Academy?',
    questionAr: 'كيف يمكنني التسجيل في أكاديمية أثر؟',
    questionMs: 'Bagaimanakah saya boleh mendaftar di Akademi Athar?',
    answerEn: 'You can register for programs via the registration links or contact our academic supervisors on WhatsApp. An assessment session will be arranged to place the student in the appropriate Quranic circle.',
    answerAr: 'يمكنكم التسجيل في برامجنا المتنوعة عبر النقر على زر التسجيل أو التواصل مباشرة مع المشرفين عبر الواتساب. سيتم ترتيب موعد مقابلة لتقييم وتصنيف الطالب في الحلقة المناسبة لمستواه.',
    answerMs: 'Anda boleh mendaftar untuk program melalui pautan pendaftaran atau menghubungi penyelia akademik kami di WhatsApp. Sesi penilaian akan diatur untuk menempatkan pelajar dalam halaqah Al-Quran yang sesuai.'
  },
  {
    id: 'faq-2',
    category: 'academics',
    questionEn: 'Are there online distance learning programs?',
    questionAr: 'هل تتوفر برامج مخصصة للتعليم عن بعد؟',
    questionMs: 'Adakah terdapat program pembelajaran jarak jauh dalam talian (online)?',
    answerEn: 'Yes! Athar Academy offers interactive online Quran classes for boys, girls, and adults worldwide with highly skilled reciters using virtual learning environments.',
    answerAr: 'نعم بالتأكيد! توفر الأكاديمية فصولاً قرآنية تفاعلية بالكامل عبر الإنترنت للبنين والبنات والكبار من مختلف دول العالم، بإشراف شيوخ ومعلمات متميزين.',
    answerMs: 'Ya! Akademi Athar menawarkan kelas Al-Quran interaktif dalam talian untuk lelaki, perempuan, dan dewasa di seluruh dunia bersama qari mahir menggunakan persekitaran pembelajaran maya.'
  },
  {
    id: 'faq-3',
    category: 'financial',
    questionEn: 'What are the fees for joining Athar Academy?',
    questionAr: 'كم رسوم التسجيل والاشتراك الشهري في أكاديمية أثر؟',
    questionMs: 'Berapakah yuran pendaftaran dan yuran bulanan Akademi Athar?',
    answerEn: 'For students inside Malaysia: Registration fee is 100 MYR, and the monthly subscription is 70 MYR. For students outside Malaysia: Registration fee is 50 USD, and the monthly fee is 25 USD.',
    answerAr: 'للطلاب داخل ماليزيا: رسوم التسجيل 100 رنجت، والاشتراك الشهري 70 رنجت. للطلاب خارج ماليزيا: رسوم التسجيل 50 دولار، والاشتراك الشهري 25 دولار.',
    answerMs: 'Untuk pelajar dalam Malaysia: Yuran pendaftaran RM100, dan yuran bulanan RM70. Untuk pelajar luar Malaysia: Yuran pendaftaran 50 USD, dan yuran bulanan 25 USD.'
  },
  {
    id: 'faq-4',
    category: 'financial',
    questionEn: 'Are there subsidized slots or sponsorships for circles?',
    questionAr: 'هل توجد حلقات مكفولة بالكامل ودعم مالي للطلاب؟',
    questionMs: 'Adakah terdapat kuota bersubsidi atau penajaan untuk halaqah?',
    answerEn: 'Yes! We have the "Athar Benevolence Grant" which currently supports 5 fully-sponsored Quran circles for dedicated students who cannot afford tuition fees.',
    answerAr: 'نعم! توفر الأكاديمية "منحة الأثر الخيري" لدعم الطلبة غير القادرين، ولدينا حالياً 5 حلقات مكفولة بالكامل، ونسعى لكفالة الـ 21 حلقة المتبقية بمساعدة الداعمين.',
    answerMs: 'Ya! Kami mempunyai "Geran Kebajikan Athar" yang kini menaja 5 halaqah Al-Quran sepenuhnya untuk pelajar yang komited tetapi tidak mampu membayar yuran pengajian.'
  }
];

// ==========================================================================
// 5. OFFICIAL ATHAR PROFILE & TEXT DATA (NEW SECTIONS)
// ==========================================================================
export const ACADEMY_PROFILE = {
  aboutAr: 'مؤسسة تعليمية رائدة تأسست في أغسطس 2024م، تُعنى بتعليم القرآن الكريم وعلومه واللغة العربية. نسعى لشحذ الهمم وتحقيق أثر إيجابي مستدام لبناء جيلٍ فريد يتميز بالعلم والأخلاق الرفيعة.',
  aboutEn: 'A leading educational institution established in August 2024, dedicated to teaching the Holy Quran, its sciences, and the Arabic language. We seek to inspire determination and achieve a sustainable positive impact (Athar) to build a unique generation characterized by knowledge and noble character.',
  aboutMs: 'Sebuah institusi pendidikan terkemuka yang ditubuhkan pada Ogos 2024, didedikasikan untuk pengajaran Al-Quran, sains Al-Quran, dan bahasa Arab. Kami berusaha untuk memberi inspirasi dan mencapai impak positif yang berterusan (Athar) bagi membina generasi unik yang berilmu dan berakhlak mulia.',

  visionAr: 'الريادة في تعليم القرآن الكريم وعلومه واللغة العربية، محققين أثراً إيجابياً مستداماً في بناء جيل يتسم بالعلم والأخلاق.',
  visionEn: 'Leadership in teaching the Holy Quran, its sciences, and the Arabic language, achieving a sustainable positive impact in building a generation characterized by knowledge and morals.',
  visionMs: 'Peneraju dalam pengajaran Al-Quran, sains Al-Quran, dan bahasa Arab, mencapai impak positif yang berterusan dalam membina generasi yang berilmu dan berakhlak mulia.',

  missionAr: 'نشر رسالة القرآن الكريم في المجتمع من خلال تقديم تعليم متميز للقرآن الكريم وعلومه واللغة العربية، والتركيز المباشر على غرس القيم الإسلامية في النفوس.',
  missionEn: 'Spreading the message of the Holy Quran in society by providing distinguished education for the Quran, its sciences, and the Arabic language, with a direct focus on instilling Islamic values in hearts.',
  missionMs: 'Menyebarkan mesej Al-Quran dalam masyarakat dengan menyediakan pendidikan cemerlang untuk Al-Quran, sains Al-Quran, dan bahasa Arab, dengan fokus langsung untuk menyemai nilai-nilai Islam dalam hati.',

  objectivesAr: [
    'تربية جيل مسلم متصل بالقرآن فهماً وتلاوةً، أخلاقاً، ومنهجاً وحفظاً.',
    'تعزيز الالتزام بالقيم الإسلامية عبر التعليم والتدريب على السلوك القرآني.',
    'تأهيل وتخريج طلاب قادرين على نشر وتعليم القرآن الكريم وتحقيق تأثير إيجابي في مجتمعاتهم.',
    'ابتكار برامج تعليمية نوعية تُعزز فهم وتطبيق تعاليم الوحيين واللغة العربية.',
    'نشر لغة الضاد عبر تقديم برامج مخصصة لتعليم اللغة العربية للناطقين بغيرها.'
  ],
  objectivesEn: [
    'Nurturing a Muslim generation connected to the Quran in understanding, recitation, morals, methodology, and memorization.',
    'Enhancing commitment to Islamic values through education and training on Quranic behavior.',
    'Qualifying and graduating students capable of spreading and teaching the Quran and making a positive impact in their communities.',
    'Innovating qualitative educational programs that enhance the understanding and application of the two revelations and Arabic.',
    'Spreading the Arabic language by providing dedicated programs for teaching Arabic to non-native speakers.'
  ],
  objectivesMs: [
    'Melahirkan generasi Muslim yang terhubung dengan Al-Quran dari segi pemahaman, bacaan, akhlak, metodologi, dan hafazan.',
    'Meningkatkan komitmen terhadap nilai-nilai Islam melalui pendidikan dan latihan berasaskan tingkah laku Al-Quran.',
    'Melayakkan dan melahirkan pelajar yang mampu menyebarkan dan mengajar Al-Quran serta memberikan impak positif dalam komuniti mereka.',
    'Memperkenalkan program pendidikan kualitatif yang meningkatkan pemahaman dan aplikasi wahyu serta bahasa Arab.',
    'Menyebarkan bahasa Arab dengan menyediakan program khusus untuk pengajaran bahasa Arab kepada penutur bukan asli.'
  ],

  // ---- Leadership messages (shown as tabs inside the "About Us" section) ----
  directorNameAr: 'مدير الأكاديمية',
  directorNameEn: 'Academy Director',
  directorNameMs: 'Pengarah Akademi',
  directorImage: '',
  directorMessageAr: 'الحمد لله رب العالمين، والصلاة والسلام على أشرف الأنبياء والمرسلين، أما بعد:\n\nيسعدني أن أرحب بكم في أكاديمية أثر، التي نسعى من خلالها إلى بناء جيل قرآني متصل بكتاب الله تعالى تلاوةً وحفظاً وفهماً وعملاً. نؤمن أن تعليم القرآن الكريم رسالة قبل أن يكون مهنة، ونحرص على أن نترك في كل طالب أثراً طيباً باقياً. نفتح أبوابنا لكل راغب في تعلم القرآن وعلومه واللغة العربية، ونعدكم ببيئة تعليمية راقية ومعلمين مجازين بالسند المتصل.',
  directorMessageEn: 'Welcome to Athar Academy. We strive to build a generation deeply connected to the Holy Quran in recitation, memorization, understanding, and practice. We believe teaching the Quran is a mission before a profession, and we are committed to leaving a lasting positive impact in every student.',
  directorMessageMs: 'Selamat datang ke Akademi Athar. Kami berusaha membina generasi yang terhubung rapat dengan Al-Quran dalam bacaan, hafazan, pemahaman, dan amalan.',

  chairmanNameAr: 'رئيس مجلس الإدارة',
  chairmanNameEn: 'Chairman of the Board',
  chairmanNameMs: 'Pengerusi Lembaga',
  chairmanImage: '',
  chairmanMessageAr: 'بسم الله الرحمن الرحيم،\n\nانطلقت أكاديمية أثر برؤية واضحة: الريادة في تعليم القرآن الكريم وعلومه واللغة العربية، وتحقيق أثر إيجابي مستدام في بناء جيل يتسم بالعلم والأخلاق. إن ما نقدمه اليوم هو ثمرة جهود مخلصة من فريق عمل متكامل وشركاء داعمين. نتطلع إلى أن تكون الأكاديمية منارة علمية تربوية تخرّج حفظةً ومعلمين قادرين على حمل رسالة القرآن إلى العالم.',
  chairmanMessageEn: 'Athar Academy launched with a clear vision: leadership in teaching the Holy Quran and Arabic, achieving a sustainable positive impact in building a knowledgeable, ethical generation.',
  chairmanMessageMs: 'Akademi Athar dilancarkan dengan visi yang jelas: peneraju dalam pengajaran Al-Quran dan bahasa Arab.',

  secretaryNameAr: 'الأمين العام',
  secretaryNameEn: 'Secretary-General',
  secretaryNameMs: 'Setiausaha Agung',
  secretaryImage: '',
  secretaryMessageAr: 'الحمد لله والصلاة والسلام على رسول الله،\n\nتحرص الأمانة العامة لأكاديمية أثر على تنظيم العمل المؤسسي وتطوير البرامج التعليمية والإدارية بما يخدم رسالة الأكاديمية. نعمل على ضمان جودة التعليم ومتابعة الطلاب وأولياء الأمور، وتنسيق الجهود بين الأقسام المختلفة. نرحب بملاحظاتكم واقتراحاتكم التي تسهم في تطوير الأكاديمية.',
  secretaryMessageEn: 'The Secretary-General office oversees institutional organization and the development of educational and administrative programs that serve the academy\'s mission.',
  secretaryMessageMs: 'Pejabat Setiausaha Agung menyelia organisasi institusi dan pembangunan program pendidikan dan pentadbiran.',
};

// Statistics Dashboard
export const ACADEMY_STATS = {
  circlesCount: 26,
  studentsCount: 260,
  sponsoredCircles: 5,
  unsponsoredCircles: 21,
  totalBeneficiaries: 500, // For Ma'a As-Safarah program
  campSnaaBeneficiaries: 60,
  campSfeeratBeneficiaries: 45
};

// Team Members
export const TEAM_MEMBERS = [
  {
    nameAr: 'الشيخ الدكتور أحمد المنصور',
    nameEn: 'Sheikh Dr. Ahmad Al-Mansour',
    nameMs: 'Syeikh Dr. Ahmad Al-Mansour',
    roleAr: 'المشرف العلمي والمجاز بالقراءات العشر',
    roleEn: 'Scientific Supervisor & Qira\'at Scholar',
    roleMs: 'Penyelia Ilmiah & Qiraat Scholar',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    bioAr: 'صاحب إسناد عالٍ في القراءات المتواترة، يشرف على ضبط الجوانب الأدائية والقراءات في المقارئ.',
    bioEn: 'Holder of a high chain of narration in Quranic Qira\'at, overseeing the recitation standards in the sanctuary.',
    bioMs: 'Pemegang sanad tinggi dalam Qiraat Al-Quran, memantau standard bacaan di akademi.'
  },
  {
    nameAr: 'الشيخة فاطمة الحسيني',
    nameEn: 'Sheikha Fatima Al-Hussaini',
    nameMs: 'Ustazah Fatima Al-Hussaini',
    roleAr: 'مشرفة حلقات الفتيات وعضو اللجنة العلمية',
    roleEn: 'Girls Circles Director & Academic Member',
    roleMs: 'Pengarah Halaqah Perempuan & Ahli Akademik',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    bioAr: 'ماجستير في علوم الحديث والقرآن، متخصصة في التربية الإيمانية وعلوم الوحيين للبنات.',
    bioEn: 'Master of Hadith and Quranic sciences, specializing in faith education and divine revelations for female students.',
    bioMs: 'Sarjana Sains Hadis dan Al-Quran, pakar dalam pendidikan iman dan wahyu untuk pelajar perempuan.'
  },
  {
    nameAr: 'فضيلة الشيخ الأستاذ الدكتور عبد الرحمن الغامدي',
    nameEn: 'Dr. Abdul-Rahman Al-Ghamdi',
    nameMs: 'Dr. Abdul-Rahman Al-Ghamdi',
    roleAr: 'أستاذ الفقه والعلوم الشرعية المساعد',
    roleEn: 'Associate Professor of Fiqh & Sharia Studies',
    roleMs: 'Profesor Madya Fikah & Pengajian Syariah',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300',
    bioAr: 'يشرف على المناهج التأصيلية في الفقه والعبادات والسيرة للبرنامج الشرعي التمهيدي.',
    bioEn: 'Supervising core Islamic curricula in Fiqh, worship, and Prophet\'s biography for the Sharia program.',
    bioMs: 'Menyelia kurikulum asas Islam dalam Fikah, ibadah, dan sirah Nabi untuk program Syariah.'
  },
  {
    nameAr: 'فضيلة الشيخ المقرئ يحيى الأنصاري',
    nameEn: 'Sheikh Al-Muqri\' Yahya Al-Ansari',
    nameMs: 'Syeikh Al-Muqri\' Yahya Al-Ansari',
    roleAr: 'مدير مقرأة الإجازة واللجان العلمية',
    roleEn: 'Director of Connected Sanad Sanctuary',
    roleMs: 'Pengarah Halaqah Sanad Bersambung',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
    bioAr: 'مقرئ ومحكّم دولي معتمد، متخصص في كبار الحفاظ الراغبين في نيل السند المتصل.',
    bioEn: 'An accredited international Quran judge, focusing on advanced memorizers seeking Connected Sanad.',
    bioMs: 'Hakim Al-Quran antarabangsa bertauliah, membimbing hafiz peringkat tinggi untuk mendapatkan Sanad.'
  },
  {
    nameAr: 'الأستاذة أمينة الهادي',
    nameEn: 'Ustadha Amina Al-Hadi',
    nameMs: 'Ustazah Amina Al-Hadi',
    roleAr: 'أخصائية رياض الأطفال والتعليم النوراني',
    roleEn: 'Early Childhood & Noorania Specialist',
    roleMs: 'Pakar Awal Kanak-Kanak & Kaedah Noorania',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300',
    bioAr: 'مقرئ ومحكّم دولي معتمد، متخصص في كبار الحفاظ الراغبين في نيل السند المتصل.', // Note: Same as bioAr above in original code, kept original
    bioEn: 'Expert in the Qaida Noorania method, training young learners in proper pronunciation and Quran reading.',
    bioMs: 'Pakar dalam kaedah Qaida Noorania, melatih pelajar cilik dalam sebutan yang betul dan bacaan Al-Quran.'
  }
];

// Partners
export const PARTNERS = [
  {
    nameAr: 'جمعية المحافظة على القرآن الكريم',
    nameEn: 'Holy Quran Preservation Association',
    nameMs: 'Persatuan Pemeliharaan Al-Quran',
    logo: '👑',
    descAr: 'شراكة إستراتيجية لتنظيم مقارئ السند والتقييم المشترك.',
    descEn: 'Strategic partner organizing narration circles and assessments.',
    descMs: 'Rakan strategik yang menganjurkan halaqah bacaan dan penilaian bersama.'
  },
  {
    nameAr: 'الهيئة العالمية للكتاب والسنة',
    nameEn: 'Global League of Book & Sunnah',
    nameMs: 'Liga Global Al-Kitab & Sunnah',
    logo: '📖',
    descAr: 'التعاون في اعتماد المناهج الشرعية ونشر المواد التعليمية.',
    descEn: 'Collaborating in accrediting Islamic courses and publishing resources.',
    descMs: 'Bekerjasama dalam memperakui kursus Islam dan menerbitkan sumber pendidikan.'
  },
  {
    nameAr: 'منصة المقرأة العالمية للقرآن الكريم',
    nameEn: 'Global Sanctuary Platform',
    nameMs: 'Platform Sanctuary Global',
    logo: '🌐',
    descAr: 'الشريك التقني لتسيير فصول التعليم عن بعد والصفوف الافتراضية.',
    descEn: 'Technical partner running distance learning and virtual classrooms.',
    descMs: 'Rakan kongsi teknikal yang menjalankan pembelajaran jarak jauh dan bilik darjah maya.'
  },
  {
    nameAr: 'مؤسسة أثر الخيرية الوقفية',
    nameEn: 'Athar Charity Endowment Fund',
    nameMs: 'Dana Wakaf Kebajikan Athar',
    logo: '🤝',
    descAr: 'الجهة الراعية والداعمة لمنحة الأثر لحلقات القرآن الكريم.',
    descEn: 'Endowment fund sponsoring the Athar scholarships for Quran circles.',
    descMs: 'Dana wakaf yang menaja biasiswa Athar untuk halaqah Al-Quran.'
  }
];

// Comprehensive Programs Data (Basic vs Accompanying)
export const DETAILED_PROGRAMS = {
  basic: [
    {
      id: 'circles',
      titleAr: 'الحلقات القرآنية اليومية',
      titleEn: 'Daily Quranic Circles',
      titleMs: 'Halaqah Al-Quran Harian',
      descAr: 'حلقات حفظ ومراجعة مستمرة للبنين والبنات من سن 6 سنوات فما فوق مع فحص التجويد والمتابعة التربوية.',
      descEn: 'Continuous Quran memorization and review classes for boys & girls aged 6+ with Tajweed assessment and character mentorship.',
      descMs: 'Kelas hafazan dan ulangkaji Al-Quran berterusan untuk pelajar lelaki & perempuan berumur 6+ dengan penilaian Tajwid و bimbingan sahsiah.',
      stats: '26 حلقة — 260 طالباً وطالبة',
      statsEn: '26 Circles — 260 Students',
      statsMs: '26 Halaqah — 260 Pelajar',
      gallery: []
    },
    {
      id: 'alsafarah',
      titleAr: 'برنامج مع السّفرة (السنوي)',
      titleEn: 'With the Noble Scribes Program (Annual)',
      titleMs: 'Program Bersama Para Malaikat Pencatat (Tahunan)',
      descAr: 'برنامج ريادي مخصص لسرد المحفوظ كاملاً غيباً في جلسة واحدة أو بضع جلسات متتالية لنيل مرتبة المتقن.',
      descEn: 'A pioneering program dedicated to reciting the entire memorized Quran in a single sitting or consecutive sessions to gain absolute mastery.',
      descMs: 'Program perintis yang didedikasikan untuk membaca keseluruhan Al-Quran yang dihafal dalam satu sesi atau sesi berturut-turut untuk mendapatkan penguasaan mutlak.',
      stats: '500 مستفيد للعامين الماضيين',
      statsEn: '500 beneficiaries over the past 2 years',
      statsMs: '500 peserta dalam 2 tahun lepas',
      gallery: [
        { img: '/safara-1.png', titleAr: 'حلقات الإسناد وتلقي القراءات', titleEn: 'Connected Recitation Circles', titleMs: 'Halaqah Isnad & Penerimaan Bacaan', descAr: 'تلقي القراءات والإجازات القرآنية بالسند المتصل على شيوخ الأكاديمية.', descEn: 'Receiving Quranic chains of narration from the academy scholars.', descMs: 'Menerima rantaian periwayatan Al-Quran daripada syeikh akademi.' },
        { img: '/safara-2.png', titleAr: 'مدارسة المتون وضبط التجويد', titleEn: 'Text Study & Articulation', titleMs: 'Kajian Teks & Penguasaan Tajwid', descAr: 'حلقات نقاشية ومدارسة المتون العلمية التخصصية كالجزرية وتحفة الأطفال.', descEn: 'Discussion and study of specialized Sharia and Tajweed texts.', descMs: 'Perbincangan dan kajian teks khusus syariah dan tajwid seperti Al-Jazariyyah.' },
        { img: '/safara-3.png', titleAr: 'تكريم الحفاظ والمتميزين', titleEn: 'Honoring Distinguished Students', titleMs: 'Penghargaan Pelajar Cemerlang', descAr: 'احتفاء مبارك بالطلاب والطالبات الذين أتموا سرد القرآن غيباً في مجلس واحد.', descEn: 'Celebrating students who completed reciting the entire Quran in one sitting.', descMs: 'Meraikan pelajar yang berjaya membaca keseluruhan Al-Quran dalam satu majlis.' }
      ]
    },
    {
      id: 'ijazah',
      titleAr: 'مقرأة الإتقان والإجازة',
      titleEn: 'Sanad Licensure & Mastery',
      titleMs: 'Pentauliahan Sanad & Penguasaan',
      descAr: 'مخصصة للحفاظ المتقنين لعرض الختمة ونيل الإسناد المتصل إلى رسول الله ﷺ بروايات حفص وشعبة ونافع وغيرهم.',
      descEn: 'For advanced memorizers to recite the full Quran and earn an authentic chain of narration (Sanad) connected to the Prophet ﷺ.',
      descMs: 'Untuk penghafaz peringkat tinggi membaca keseluruhan Al-Quran dan memperoleh rantaian periwayatan (Sanad) sahih yang bersambung dengan Rasulullah ﷺ.',
      stats: 'عرض فردي مباشر مع الشيخ',
      statsEn: 'One-on-one session with the Sheikh',
      statsMs: 'Sesi individu langsung bersama Sheikh',
      gallery: []
    },
    {
      id: 'mutoon',
      titleAr: 'دورات حفظ وشرح المتون العلمية',
      titleEn: 'Hadith & Tajweed Text Memorization',
      titleMs: 'Hafazan Teks Matan Hadis & Tajwid',
      descAr: 'برنامج لدراسة وحفظ المنظومات الأساسية مثل الجزرية، تحفة الأطفال، والكتب الحديثية المسندة.',
      descEn: 'A specialized course for studying and memorizing core texts like Al-Jazariyyah, Tuhfat Al-Atfal, and Hadith collections.',
      descMs: 'Kursus khusus untuk mempelajari dan menghafal teks teras seperti Al-Jazariyyah, Tuhfat Al-Atfal, dan koleksi Hadis.',
      gallery: []
    },
    {
      id: 'qari',
      titleAr: 'برنامج قارئ أثر',
      titleEn: 'Athar Reciter Program',
      titleMs: 'Program Qari Athar',
      descAr: 'يركز على جمال الصوت والمقامات التعبيرية لتمثيل الأكاديمية في المحافل الدولية وتدريب الأئمة.',
      descEn: 'Focuses on vocal beauty, articulation, and expressive recitation to train future Imams and represent the academy globally.',
      descMs: 'Memfokuskan kepada keindahan vokal, artikulasi, dan bacaan ekspresif untuk melatih bakal Imam dan mewakili akademi di peringkat global.',
      gallery: [
        { img: '/safara-1.png', titleAr: 'فحص التجويد وضبط مخارج الحروف', titleEn: 'Tajweed Evaluation & Articulation', titleMs: 'Penilaian Tajwid & Makhraj Huruf', descAr: 'تعليم التلاوة الصحيحة وأحكام التجويد عملياً ونظرياً.', descEn: 'Teaching correct pronunciation and rules practically and theoretically.', descMs: 'Mengajar sebutan yang betul dan hukum tajwid secara praktikal dan teori.' },
        { img: '/quran-boys-3.png', titleAr: 'التسجيلات الصوتية والمحافل', titleEn: 'Audio Recordings & Assemblies', titleMs: 'Rakaman Audio & Majlis Pembacaan', descAr: 'تسجيل التلاوات المتميزة للطلاب وتشجيعهم بظهور مبارك.', descEn: 'Recording top student recitations to encourage and reward them.', descMs: 'Merakam bacaan terbaik pelajar untuk menggalakkan dan memberi ganjaran.' },
        { img: '/quran-girls-3.png', titleAr: 'التتويج بجوائز قارئ أثر المتميز', titleEn: 'Athar Reciter Award Coronation', titleMs: 'Majlis Pertabalan Anugerah Qari Athar', descAr: 'تكريم المتسابقين الحاصلين على أعلى درجات الضبط والجمال الصوتي.', descEn: 'Honoring contestants with the highest articulation and vocal beauty.', descMs: 'Meraikan peserta yang mendapat markah tertinggi dalam artikulasi dan keindahan suara.' }
      ]
    }
  ],
  accompanying: [
    {
      id: 'camps-snaa',
      titleAr: 'مخيم صنّاع الغد (السنوي)',
      titleEn: 'Creators of Tomorrow Camp (Annual)',
      titleMs: 'Kem Pencipta Hari Esok (Tahunan)',
      descAr: 'مخيم تربوي مهاري ترفيهي مكثف للبنين يستمر لمدة 30 يوماً يبني المهارات، القيم، والأنشطة القيادية والمغامرة.',
      descEn: 'An intensive 30-day educational, skill-building, and recreational camp for boys, focusing on leadership, values, and team building.',
      descMs: 'Kem pendidikan, pembinaan kemahiran, dan rekreasi intensif selama 30 hari untuk lelaki, memfokuskan kepada kepimpinan, nilai murni, dan pembinaan pasukan.',
      stats: '60 مستفيداً كل عام',
      statsEn: '60 beneficiaries every year',
      statsMs: '60 peserta setiap tahun',
      gallery: [
        { img: '/creators-1.png', titleAr: 'الأنشطة الرياضية واللياقة البدنية', titleEn: 'Sports & Physical Activities', titleMs: 'Aktiviti Sukan & Kecergasan Fizikal', descAr: 'تعزيز القوة البدنية والنشاط اليومي من خلال رياضات مختلفة.', descEn: 'Enhancing physical fitness and daily active sports.', descMs: 'Meningkatkan kecergasan fizikal dan aktiviti harian melalui pelbagai sukan.' },
        { img: '/creators-2.png', titleAr: 'ورش العمل وبناء القيادة', titleEn: 'Leadership & Workshops', titleMs: 'Kepimpinan & Bengkel Kemahiran', descAr: 'تدريبات مهارية في الإلقاء، وحل المشكلات، والاعتماد على النفس.', descEn: 'Skill building in public speaking, problem-solving, and independence.', descMs: 'Pembinaan kemahiran dalam ucapan awam, penyelesaian masalah, dan berdikari.' },
        { img: '/creators-3.png', titleAr: 'اللقاءات التربوية وحلقات القرآن', titleEn: 'Educational Meetings & Quran Hifz', titleMs: 'Pertemuan Pendidikan & Hafazan Al-Quran', descAr: 'مراجعة وتسميع أوراد القرآن الكريم بالإضافة إلى اللقاءات القيمية اليومية.', descEn: 'Reviewing Quranic memorization alongside daily values sittings.', descMs: 'Mengulangkaji hafazan Al-Quran bersama pertemuan nilai harian.' }
      ]
    },
    {
      id: 'camps-sfeerat',
      titleAr: 'مخيم سفيرات الأثر (السنوي)',
      titleEn: 'Ambassadors of Impact Camp (Annual)',
      titleMs: 'Kem Duta Impak (Tahunan)',
      descAr: 'مخيم مهاراتي ترفيهي قيمي للفتيات يهدف لبناء الشخصية المسلمة الرائدة القادرة على إحداث الأثر الطيب.',
      descEn: 'A value-driven, skill-oriented camp for girls aimed at building a strong Muslim character capable of leaving a positive impact.',
      descMs: 'Kem berasaskan nilai dan kemahiran untuk perempuan bertujuan membina peribadi Muslimah kukuh yang mampu meninggalkan impak positif.',
      stats: '45 مستفيدة سنوياً',
      statsEn: '45 girls yearly',
      statsMs: '45 pelajar perempuan setiap tahun',
      gallery: [
        { img: '/sfeerat-1.png', titleAr: 'الحلقات الحوارية والقيمية للفتيات', titleEn: 'Girls Value & Dialogue Circles', titleMs: 'Halaqah Nilai & Dialog untuk Perempuan', descAr: 'لقاءات تربوية تعزز الهوية الإسلامية والقيم والأخلاق النبيلة.', descEn: 'Educational sessions reinforcing Islamic identity and values.', descMs: 'Sesi pendidikan yang mengukuhkan identiti Islam, nilai murni, dan akhlak.' },
        { img: '/sfeerat-2.png', titleAr: 'الورش الحرفية والإبداعية', titleEn: 'Craft & Creative Workshops', titleMs: 'Bengkel Kraf & Kreativiti', descAr: 'تعليم مهارات اليد والأعمال الفنية لتمكين الفتيات إبداعياً.', descEn: 'Teaching arts, crafts, and handiworks for creative empowerment.', descMs: 'Mengajar kemahiran tangan dan kerja seni untuk memperkasakan kreativiti perempuan.' },
        { img: '/sfeerat-2.png', titleAr: 'أنشطة الخدمة المجتمعية والترفيه', titleEn: 'Community Service & Recreation', titleMs: 'Khidmat Masyarakat & Rekreasi', descAr: 'أعمال تطوعية وزيارات ترفيهية تنمي الأثر السليم في الفؤاد.', descEn: 'Volunteering and fun field trips that foster healthy social impact.', descMs: 'Kerja sukarela dan lawatan rekreasi yang memupuk impak sosial yang sihat.' }
      ]
    },
    {
      id: 'takween',
      titleAr: 'برنامج تكوين التربوي',
      titleEn: 'Takween Development Program',
      titleMs: 'Program Pembangunan Takween',
      descAr: 'برنامج سنوي متكامل لبناء الفكر الإسلامي الصحيح، وترسيخ العقيدة وحب الأوطان ومواجهة الفتن الفكرية.',
      descEn: 'An annual program designed to build sound Islamic thought, strengthen faith, civic duty, and resist contemporary intellectual challenges.',
      descMs: 'Program tahunan yang dirancang untuk membina pemikiran Islam yang sihat, mengukuhkan keimanan, tanggungjawab sivik, dan menentang cabaran intelektual kontemporari.',
      gallery: [
        { img: '/takween-1.png', titleAr: 'محاضرات العلوم الشرعية', titleEn: 'Sharia Science Lectures', titleMs: 'Kuliah Ilmu Syariah', descAr: 'تأصيل شرعي في العقيدة والفقه والحديث واللغة العربية.', descEn: 'Foundational sharia studies in creed, jurisprudence, and language.', descMs: 'Pengajian syariah asas merangkumi akidah, fiqh, hadis, dan bahasa Arab.' },
        { img: '/takween-2.png', titleAr: 'حلقات النقاش والمذاكرة', titleEn: 'Discussion & Study Groups', titleMs: 'Kumpulan Perbincangan & Pengajian', descAr: 'تفعيل التعلم النشط وتوطين المعرفة بين الطلاب.', descEn: 'Promoting active learning and knowledge peer discussions.', descMs: 'Menggalakkan pembelajaran aktif dan perbincangan ilmu sesama pelajar.' },
        { img: '/takween-3.png', titleAr: 'تكريم المتفوقين في الاختبارات', titleEn: 'Honoring Top Achievers', titleMs: 'Penghargaan Pelajar Cemerlang', descAr: 'جوائز تشجيعية وشهادات تفوق للطلبة المتميزين في الفحص الدوري.', descEn: 'Awards and certificates for top performing students in assessments.', descMs: 'Anugerah dan sijil kecemerlangan untuk pelajar terbaik dalam penilaian berkala.' }
      ]
    },
    {
      id: 'ramadan-retreat',
      titleAr: 'المعتكف الرمضاني العلمي',
      titleEn: 'Ramadan Spiritual Retreat',
      titleMs: 'Iktikaf Rohani Ramadan',
      descAr: 'خلوة علمية تربوية في العشر الأواخر من رمضان، تركز على مراجعة القرآن وتلاوة الأثر وقيام الليل والاعتكاف.',
      descEn: 'A structured spiritual retreat during the last ten days of Ramadan, focusing on Quranic revision, night prayers, and devotion.',
      descMs: 'Iktikaf rohani berstruktur dalam sepuluh hari terakhir Ramadan, memfokuskan kepada ulangkaji Al-Quran, solat malam, dan ibadah.',
      gallery: [
        { img: '/quran-boys.png', titleAr: 'التهجد وصلاة القيام', titleEn: 'Night Prayers (Tahajjud)', titleMs: 'Solat Malam (Tahajjud)', descAr: 'إحياء العشر الأواخر بالقيام والدعاء والتضرع في جو إيماني.', descEn: 'Spiritual night prayers and supplication during the last ten nights.', descMs: 'Menghidupkan sepuluh malam terakhir dengan solat malam, doa, dan munajat dalam suasana keimanan.' },
        { img: '/safara-1.png', titleAr: 'المراجعة القرآنية المكثفة', titleEn: 'Intensive Quranic Review', titleMs: 'Ulangkaji Al-Quran Intensif', descAr: 'خطط يومية مكثفة لتثبيت الحفظ والمراجعة الجماعية والفردية.', descEn: 'Focused daily structures for solidifying memorization and reviews.', descMs: 'Jadual harian intensif untuk mengukuhkan hafazan secara berjemaah dan individu.' },
        { img: '/quran-girls-2.png', titleAr: 'الإفطار الجماعي واللقاءات الإيمانية', titleEn: 'Community Iftar & Lessons', titleMs: 'Iftar Berjemaah & Majlis Ilmu', descAr: 'جلسات إيمانية وثقافية مباركة تجمع طلبة الأكاديمية.', descEn: 'Blessed spiritual and cultural sittings with academy students.', descMs: 'Majlis rohani dan kebudayaan yang menghimpunkan para pelajar akademi.' }
      ]
    },
    {
      id: 'journey-athar',
      titleAr: 'برنامج رحلة الأثر',
      titleEn: 'Journey of Impact (Athar)',
      titleMs: 'Perjalanan Impak (Athar)',
      descAr: 'رحلات تربوية وثقافية دورية لزيارة البقاع الطاهرة والعلماء، وربط الطلاب ببيئات العلم والصلاح.',
      descEn: 'Regular educational and cultural journeys to holy places and scholars, linking students with environments of knowledge and righteousness.',
      descMs: 'Perjalanan pendidikan dan kebudayaan berkala ke tempat suci dan ulama, menghubungkan pelajar dengan persekitaran ilmu dan kesolehan.',
      gallery: [
        { img: '/creators-1.png', titleAr: 'الرحلات الاستكشافية والخارجية', titleEn: 'Outdoor Expeditions & Field Trips', titleMs: 'Ekspedisi Luar & Lawatan Sambil Belajar', descAr: 'زيارة المعالم والتعلم من خلال الاستكشاف والتجربة العملية.', descEn: 'Visiting historic landmarks and learning through direct experience.', descMs: 'Melawat tempat bersejarah dan belajar melalui eksplorasi dan pengalaman langsung.' },
        { img: '/creators-2.png', titleAr: 'الأنشطة الجماعية وتحديات الفريق', titleEn: 'Group Activities & Team Challenges', titleMs: 'Aktiviti Berkumpulan & Cabaran Pasukan', descAr: 'ألعاب حركية ومسابقات تعزز روح الأخوة والعمل الجماعي.', descEn: 'Action sports and puzzles reinforcing team spirit and brotherhood.', descMs: 'Sukan aksi dan cabaran yang mengukuhkan semangat berpasukan dan persaudaraan.' },
        { img: '/quran-boys-2.png', titleAr: 'المحاضرات وجلسات التفكر والتدبر', titleEn: 'Lectures & Reflection Circles', titleMs: 'Kuliah & Majlis Tadabbur', descAr: 'جلسات تفكر في الطبيعة ودروس تدبر في معاني الآيات العظيمة.', descEn: 'Sittings in nature reflecting on Quranic verses and meanings.', descMs: 'Duduk di alam terbuka merenungi ayat-ayat Al-Quran dan maknanya.' }
      ]
    }
  ]
};

// Contact Details
export const CONTACT_DETAILS = {
  phone: '0147086011',
  email: 'atharacademy6@gmail.com',
  website: 'atharacademy.info',
  whatsapp: 'https://api.whatsapp.com/send?phone=0147086011',
  instagram: 'https://www.instagram.com/athar.my',
  facebook: 'https://www.facebook.com/athar1.my',
  youtube: 'https://www.youtube.com/@athar_my'
};

// Media Center Items
export const MEDIA_NEWS = [
  {
    id: 'news-1',
    titleAr: 'بدء التسجيل للمخيم الصيفي "صناع الغد 2026"',
    titleEn: 'Registration Opens for Summer Camp "Creators of Tomorrow 2026"',
    titleMs: 'Pendaftaran Dibuka untuk Kem Musim Panas "Pencipta Hari Esok 2026"',
    date: '2026-06-01',
    excerptAr: 'فتحت الأكاديمية باب التسجيل في المخيم الصيفي السنوي الحافل بالأنشطة والمهارات والتحفيظ المكثف.',
    excerptEn: 'The academy opened registration for its annual summer camp filled with sports, skills, and intensive Quran memorization.',
    excerptMs: 'Akademi membuka pendaftaran untuk kem musim panas tahunan yang penuh dengan aktiviti sukan, kemahiran, dan hafazan Al-Quran intensif.'
  },
  {
    id: 'news-2',
    titleAr: 'تخريج دفعة جديدة من الحفاظ المجازين بالسند المتصل',
    titleEn: 'Graduation of a New Batch of Sanad-Accredited Huffaz',
    titleMs: 'Graduasi Kumpulan Baru Huffaz Beracredited Sanad',
    date: '2026-05-25',
    excerptAr: 'احتفلت الأكاديمية بمنح الإجازة لـ 12 حافظاً وحافظة أتموا عرض الختمة كاملة بالسند المتصل بروايات متعددة.',
    excerptEn: 'The academy celebrated presenting Ijazah to 12 memorizers who finished reciting the full Quran in connected narration chain.',
    excerptMs: 'Akademi meraikan penyampaian Ijazah kepada 12 penghafaz yang telah menamatkan bacaan Al-Quran lengkap dalam rantaian riwayat bersambung.'
  }
];

export const MEDIA_ARTICLES = [
  {
    id: 'art-1',
    titleAr: 'أثر الترتيل على حضور القلب وتدبر معاني القرآن الكريم',
    titleEn: 'The Impact of Tarteel on Heart Presence & Quranic Contemplation',
    titleMs: 'Kesan Tartil ke atas Kehadiran Hati & Renungan Al-Quran',
    authorAr: 'فضيلة الشيخ يحيى الأنصاري',
    authorEn: 'Sheikh Yahya Al-Ansari',
    authorMs: 'Syeikh Yahya Al-Ansari',
    excerptAr: 'إن قراءة القرآن بأحكام التجويد والتمهل يورث العقل فهماً أعمق ويبعث في النفس خشوعاً دائماً.',
    excerptEn: 'Reciting the Quran with Tajweed and patience instills a deeper intellectual understanding and triggers perpetual devotion.',
    excerptMs: 'Membaca Al-Quran dengan Tajwid dan tenang menyemai pemahaman intelektual yang lebih mendalam dan mencetuskan ketakwaan yang berterusan.'
  },
  {
    id: 'art-2',
    titleAr: 'بناء سلوك الطفل من خلال القصص القرآني والآداب النبوية',
    titleEn: 'Nurturing Child Behavior through Quranic Stories and Prophetic Manners',
    titleMs: 'Membentuk Tingkah Laku Kanak-Kanak Melalui Kisah Al-Quran dan Adab Nabawi',
    authorAr: 'الأستاذة أمينة الهادي',
    authorEn: 'Ustadha Amina Al-Hadi',
    authorMs: 'Ustazah Amina Al-Hadi',
    excerptAr: 'كيف ننتقل من مجرد القراءة التاريخية للقصة إلى تمثّل القيم وتدريب البراعم على الصدق والبر.',
    excerptEn: 'How to transition from dry historical story readings to active training in values like truthfulness and kindness for children.',
    excerptMs: 'Bagaimana untuk beralih daripada bacaan kisah sejarah kepada penerapan nilai seperti kejujuran dan kebaikan untuk kanak-kanak.'
  }
];

export const DIGITAL_LIBRARY = [
  {
    titleAr: 'منظومة الجزرية في أحكام التجويد (مكتوبة ومشروحة)',
    titleEn: 'Al-Jazariyyah Text in Tajweed Rules (PDF)',
    titleMs: 'Teks Al-Jazariyyah dalam Hukum Tajwid (PDF)',
    type: 'PDF',
    size: '2.4 MB',
    url: ''
  },
  {
    titleAr: 'كتاب الآداب والسنن اليومية لحملة القرآن الكريم',
    titleEn: 'Daily Manners Book for Quran Bearers (PDF)',
    titleMs: 'Buku Adab Harian untuk Penghafal Al-Quran (PDF)',
    type: 'PDF',
    size: '1.8 MB',
    url: ''
  },
  {
    titleAr: 'جدول المراجعة التراكمي وتتبع الحفظ اليومي للطلاب',
    titleEn: 'Cumulative Review & Daily Hifz Tracker (XLS)',
    titleMs: 'Ulangkaji Kumulatif & Penjejak Hifz Harian (XLS)',
    type: 'Excel',
    size: '850 KB',
    url: ''
  }
];

export const GALLERY_ITEMS = [
  {
    id: 'gal-1',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1609599006353-e629f1d40e39?auto=format&fit=crop&q=80&w=600',
    titleAr: 'حلقة الحفظ بمسجد الأثر',
    titleEn: 'Memorization Circle at Athar Mosque',
    titleMs: 'Halaqah Hafazan di Masjid Athar'
  },
  {
    id: 'gal-2',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1597935258735-e254c1839512?auto=format&fit=crop&q=80&w=600',
    titleAr: 'تكريم الطلاب المتميزين في القاعدة النورانية',
    titleEn: 'Honoring Outstanding Noorania Children',
    titleMs: 'Penghargaan Kanak-Kanak Noorania Cemerlang'
  },
  {
    id: 'gal-3',
    type: 'video',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder embed
    titleAr: 'فيديو تعريفي بمخيم صناع الغد',
    titleEn: 'Introductory Video of Creators of Tomorrow Camp',
    titleMs: 'Video Pengenalan Kem Pencipta Hari Esok'
  }
];

// Initiatives
export const INITIATIVES_LIST = [
  {
    id: 'init-1',
    titleAr: 'منحة الأثر الخيري لكفالة الحلقات والطلاب',
    titleEn: 'Athar Benevolence Grant for Student Sponsorship',
    titleMs: 'Geran Kebajikan Athar untuk Penajaan Pelajar',
    descAr: 'منحة تغطي الرسوم الدراسية بالكامل للطلبة الحفاظ الجادين من ذوي العسرة المادية لنشر التعليم القرآني للجميع.',
    descEn: 'A scholarship covering full tuition fees for dedicated Quran students facing financial hardship, ensuring access for all.',
    descMs: 'Biasiswa yang menanggung yuran pengajian penuh untuk pelajar Al-Quran yang komited tetapi menghadapi kesukaran kewangan, memastikan akses untuk semua.'
  },
  {
    id: 'init-2',
    titleAr: 'خصم الأخوة لتعزيز الترابط العائلي في الحلقات',
    titleEn: 'Sibling Discount for Family Memorizers',
    titleMs: 'Diskaun Adik-Beradik untuk Penghafaz Keluarga',
    descAr: 'توفير خصم عائلي يصل إلى 30% للأشقاء المسجلين معاً في أي من حلقات التحفيظ أو برامج الأكاديمية.',
    descEn: 'Providing a family discount of up to 30% for siblings enrolled together in any of our Quran circles or courses.',
    descMs: 'Menyediakan diskaun keluarga sehingga 30% untuk adik-beradik yang mendaftar bersama dalam mana-mana halaqah Al-Quran atau kursus kami.'
  }
];

// Volunteering Roles
export const VOLUNTEER_OPPORTUNITIES = [
  {
    id: 'vol-1',
    titleAr: 'مسمّع تطوعي لمقارئ التقييم اليومي',
    titleEn: 'Volunteer Quran Listening Reciter',
    titleMs: 'Qari Sukarelawan Pendengar Al-Quran',
    descAr: 'مساعدة الحفاظ والطلاب في مراجعة وتسميع أورادهم اليومية الإضافية خارج أوقات الحلقات المعتادة.',
    descEn: 'Helping students review and recite their extra daily portions outside of standard circle hours.',
    descMs: 'Membantu pelajar mengulang dan membaca bahagian harian tambahan mereka di luar waktu halaqah standard.'
  },
  {
    id: 'vol-2',
    titleAr: 'منظم إعلامي وإداري للمخيمات الصيفية والشتوية',
    titleEn: 'Media & Admin Organizer for Camps',
    titleMs: 'Penganjur Media & Pentadbiran Kem',
    descAr: 'المشاركة في تخطيط الأنشطة الرياضية وتصميم المحتوى الإعلامي والتصوير لمخيمات صناع الغد وسفيرات الأثر.',
    descEn: 'Assisting in scheduling sports activities, designing media content, and photographing our youth camps.',
    descMs: 'Membantu dalam menjadualkan aktiviti sukan, merancang kandungan media, dan mengambil gambar kem belia kami.'
  }
];
