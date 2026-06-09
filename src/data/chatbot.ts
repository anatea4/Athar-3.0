import { Language } from '@/types';

export const CHATBOT_RULES = {
  welcomeGreetingAr: "السلام عليكم ورحمة الله وبركاته، حياكم الله في أكاديمية أثر. كيف يمكننا خدمتكم؟",
  welcomeGreetingEn: "Assalamu Alaikum wa Rahmatullah wa Barakatuh! Welcome to Athar Academy. How can we assist you today?",
  welcomeGreetingMs: "Assalamualaikum warahmatullahi wabarakatuh, selamat datang ke Akademi Athar. Bagaimana kami boleh membantu anda hari ini?",

  fallbackAr: "للتأكد من التفاصيل بدقة، يمكنكم التواصل مع الإدارة عبر الواتساب أو البريد الإلكتروني.",
  fallbackEn: "To verify the details accurately, please contact the administration via WhatsApp or Email.",
  fallbackMs: "Untuk mendapatkan butiran yang tepat, sila hubungi pihak pengurusan kami melalui WhatsApp atau e-mel.",

  adminRedirectAr: "هذه التفاصيل تحتاج تأكيدًا من الإدارة حتى نعطيكم جوابًا دقيقًا. فضلاً تواصلوا عبر الواتساب: +60147086011 أو البريد الإلكتروني: atharacademy6@gmail.com.",
  adminRedirectEn: "These details require confirmation from the administration to give you an accurate answer. Please contact us via WhatsApp: +60147086011 or Email: atharacademy6@gmail.com.",
  adminRedirectMs: "Butiran ini memerlukan pengesahan daripada pihak pengurusan untuk memberikan jawapan yang tepat. Sila hubungi kami melalui WhatsApp: +60147086011 atau e-mel: atharacademy6@gmail.com."
};

export interface QAItem {
  id: number;
  keywords: string[];
  responseAr: string;
  responseEn?: string;
  responseMs?: string;
}

export const CHATBOT_QA_LIST: QAItem[] = [
  // أ. أسئلة عامة عن الأكاديمية
  {
    id: 1,
    keywords: ["ما هي اكاديمية اثر", "ايش هي اكاديمية اثر", "شو بتقدم اكاديمية اثر", "تعريف الاكاديمية", "وش هي اثر", "من انتم", "ما هي اثر", "what is athar academy", "who are you", "apa itu akademi athar", "siapa kami"],
    responseAr: "وعليكم السلام ورحمة الله وبركاته، حياكم الله. أكاديمية أثر تهتم بتعليم القرآن الكريم وعلومه واللغة العربية، من خلال برامج وحلقات تعليمية للطلاب والطالبات أونلاين وحضور.",
    responseEn: "Welcome to Athar Academy. We specialize in teaching the Holy Quran, its sciences, and the Arabic language through educational programs and circles for male and female students, both online and in-person.",
    responseMs: "Selamat datang ke Akademi Athar. Kami pakar dalam pengajaran Al-Quran, sains Al-Quran, dan bahasa Arab melalui program pendidikan dan halaqah untuk pelajar lelaki dan perempuan, sama ada secara dalam talian (online) atau bersemuka."
  },
  {
    id: 2,
    keywords: ["ماذا تدرسون", "المواد", "البرامج", "ايش تدرسون", "وش تدرسوا", "المناهج", "شو بتدرسوا", "what do you teach", "courses", "syllabus", "apa yang diajar", "silibus", "kursus"],
    responseAr: "نقدم برامج في حفظ ومراجعة القرآن الكريم، التجويد، النورانية، برامج للأطفال، برنامج الإجازة، تعليم اللغة العربية للناطقين بغيرها، وبرامج لتكوين معلمي القرآن واللغة العربية.",
    responseEn: "We offer programs in Quran memorization and revision, Tajweed, Qaida Noorania, children's courses, Connected Sanad licensure, Arabic for non-native speakers, and teacher training for Quran & Arabic instructors.",
    responseMs: "Kami menawarkan program hafazan dan ulangkaji Al-Quran, Tajwid, Qaida Noorania, kursus kanak-kanak, pentauliahan Sanad Bersambung, bahasa Arab untuk penutur bukan asli, dan latihan untuk guru Al-Quran & bahasa Arab."
  },
  {
    id: 3,
    keywords: ["فقط للقران", "بس قران", "شي ثاني", "غير القران", "هل تقتصر الدراسة على القران", "only quran", "hanya alquran"],
    responseAr: "الأكاديمية تهتم بالقرآن الكريم وعلومه، وكذلك بتعليم اللغة العربية، ويوجد أيضًا برامج تربوية وتدريبية مناسبة للطلاب.",
    responseEn: "The academy focuses on the Holy Quran and its sciences, as well as teaching the Arabic language, alongside developmental and educational programs suitable for students.",
    responseMs: "Akademi memberi tumpuan kepada Al-Quran dan sainsnya, serta pengajaran bahasa Arab, di samping program pembangunan dan pendidikan yang sesuai untuk para pelajar."
  },
  {
    id: 4,
    keywords: ["في ماليزيا", "وين مكانكم", "موقعكم", "مقر الاكاديمية", "مقركم", "اين تقع", "location", "malaysia", "where are you", "lokasi", "di mana"],
    responseAr: "الأكاديمية مقرها في ماليزيا، وتوفر أيضًا حلقات أونلاين ليستفيد الطلاب من داخل ماليزيا وخارجها.",
    responseEn: "The academy is based in Malaysia and offers online circles so students from both inside and outside Malaysia can benefit.",
    responseMs: "Akademi ini berpangkalan di Malaysia dan menawarkan halaqah dalam talian supaya pelajar dari dalam dan luar Malaysia boleh menyertainya."
  },
  {
    id: 5,
    keywords: ["اونلاين ام حضوري", "اونلاين ولا حضور", "عن بعد", "حضوري", "نوع الحلقات", "اون لاين", "في قاعات", "online", "in person", "bersemuka"],
    responseAr: "توجد حلقات حضور وحلقات أونلاين، ويمكن اختيار الحلقة المناسبة حسب المتاح للطلاب والطالبات.",
    responseEn: "We offer both in-person and online circles. You can choose the appropriate option based on student availability and current slots.",
    responseMs: "Kami menawarkan halaqah bersemuka dan dalam talian. Anda boleh memilih pilihan yang sesuai berdasarkan kekosongan dan kesesuaian pelajar."
  },

  // ب. أسئلة التسجيل
  {
    id: 6,
    keywords: ["كيف اسجل", "كيفية التسجيل", "طريقة التسجيل", "تسجيل جديد", "ابغى اسجل", "عايز اسجل", "كيف انضم", "وين رابط التسجيل", "سجلت", "how to register", "sign up", "enroll", "pendaftaran", "cara daftar"],
    responseAr: "يمكنكم التسجيل من خلال موقع الأكاديمية عبر خيار \"التسجيل في الحلقات\" أو \"تسجيل جديد\"، ثم تعبئة البيانات المطلوبة، وبعد التسجيل يُرجى متابعة البريد الإلكتروني لتفعيل الحساب.",
    responseEn: "You can register through the academy website by clicking on \"Register in Circles\" or \"New Registration\" and filling out the required data. After registering, please check your email to activate your account.",
    responseMs: "Anda boleh mendaftar melalui laman web akademi dengan mengklik \"Daftar Halaqah\" atau \"Pendaftaran Baru\" dan mengisi butiran yang diperlukan. Selepas mendaftar, sila semak e-mel anda untuk mengaktifkan akaun."
  },
  {
    id: 7,
    keywords: ["البيانات المطلوبة", "ايش البيانات", "المعلومات المطلوبة", "وش يطلبوا للتسجيل", "ايش مطلوب", "required details", "butiran diperlukan"],
    responseAr: "عادةً يتم طلب الاسم، البريد الإلكتروني، تاريخ الميلاد، الجنس، الجنسية، بلد الإقامة، المؤهل الدراسي، مجال العمل، وكلمة المرور.",
    responseEn: "Usually, we require the student's name, email address, date of birth, gender, nationality, country of residence, educational qualification, field of work, and account password.",
    responseMs: "Biasanya, kami memerlukan nama pelajar, alamat e-mel, tarikh lahir, jantina, kewarganegaraan, negara tempat tinggal, kelayakan akademik, bidang pekerjaan, dan kata laluan akaun."
  },
  {
    id: 8,
    keywords: ["احتاج بريد", "لازم ايميل", "البريد الالكتروني ضروري", "احتاج ايميل", "بدون ايميل", "email needed", "perlu emel"],
    responseAr: "نعم، البريد الإلكتروني مهم لأنه يتم إرسال رابط التفعيل أو إعادة تعيين كلمة المرور عليه.",
    responseEn: "Yes, a valid email address is essential because the account activation link and password reset links will be sent to it.",
    responseMs: "Ya, alamat e-mel yang sah adalah penting kerana pautan pengaktifan akaun dan pautan tetapan semula kata laluan akan dihantar ke emel tersebut."
  },
  {
    id: 9,
    keywords: ["لم يصلني رابط التفعيل", "ما وصلني رابط التفعيل", "رابط التفعيل ما وصل", "تفعيل الحساب ما وصل", "activation link", "pautan pengaktifan"],
    responseAr: "فضلاً تحققوا من صندوق البريد الوارد والرسائل غير المرغوب فيها. إذا لم تجدوا الرسالة، تواصلوا مع الإدارة عبر الواتساب أو البريد الإلكتروني لمساعدتكم.",
    responseEn: "Please check your spam or junk folder. If you still cannot find the activation email, contact the administration via WhatsApp or Email for assistance.",
    responseMs: "Sila semak folder spam atau junk e-mel anda. Jika anda masih tidak menemui e-mel pengaktifan, hubungi pihak pentadbiran kami melalui WhatsApp atau e-mel untuk bantuan."
  },
  {
    id: 10,
    keywords: ["لا استطيع تسجيل الدخول", "ما اقدر ادخل حسابي", "مشكلة في الدخول", "مو قادر ادخل", "ما يفتح الحساب", "cannot login", "tak boleh masuk"],
    responseAr: "يرجى التأكد من كتابة البريد الإلكتروني وكلمة المرور بشكل صحيح. وإذا نسيتم كلمة المرور يمكنكم استخدام خيار \"نسيت كلمة المرور؟\" لإعادة تعيينها.",
    responseEn: "Please make sure that you typed your email and password correctly. If you forgot your password, you can use the \"Forgot Password?\" option to reset it.",
    responseMs: "Sila pastikan anda memasukkan e-mel dan kata laluan dengan betul. Jika anda terlupa kata laluan, anda boleh menggunakan pilihan \"Lupa Kata Laluan?\" untuk menetapkannya semula."
  },
  {
    id: 11,
    keywords: ["نسيت كلمة المرور", "نسيت الباسورد", "استعادة كلمة المرور", "نسيت الرقم السري", "forgot password", "lupa kata laluan"],
    responseAr: "يمكنكم الضغط على \"نسيت كلمة المرور؟\"، ثم إدخل البريد الإلكتروني لتلقي رابط إعادة تعيين كلمة المرور.",
    responseEn: "You can click on \"Forgot Password?\", then enter your email address to receive a link to reset your password.",
    responseMs: "Anda boleh klik pada \"Lupa Kata Laluan?\", kemudian masukkan alamat e-mel anda untuk menerima pautan tetapan semula kata laluan."
  },
  {
    id: 12,
    keywords: ["هل التسجيل مفتوح", "التسجيل متاح حاليا", "التسجيل مفتوح", "مفتوح التسجيل", "is registration open", "pendaftaran dibuka"],
    responseAr: "يمكنكم الدخول إلى صفحة التسجيل في الحلقات لمعرفة الحلقات المتاحة. وللتأكد من توفر المقاعد، يُفضل التواصل مع الإدارة عبر الواتساب.",
    responseEn: "You can access the registration page to see currently available circles. To confirm seat availability, it is recommended to contact the administration via WhatsApp.",
    responseMs: "Anda boleh melayari halaman pendaftaran untuk melihat halaqah yang ditawarkan sekarang. Untuk mengesahkan kekosongan tempat, disyorkan untuk menghubungi pentadbiran melalui WhatsApp."
  },
  {
    id: 13,
    keywords: ["تسجيل اكثر من طالب", "اكثر من ابن", "اقدر اسجل اكثر من طفل", "اسجل عيالي", "اسجل اولادي", "multiple students", "lebih dari satu anak"],
    responseAr: "نعم، يمكن تسجيل أكثر من طالب، لكن يُفضل إنشاء بيانات مستقلة لكل طالب حتى تتم متابعة مستواه وخطته بشكل صحيح.",
    responseEn: "Yes, you can register more than one student, but it is preferred to create separate accounts/data profiles for each student to accurately track their progress and plans.",
    responseMs: "Ya, anda boleh mendaftar lebih daripada seorang pelajar, tetapi lebih baik untuk mencipta profil berasingan bagi setiap pelajar untuk memantau kemajuan dan rancangan pembelajaran mereka dengan tepat."
  },

  // ج. الرسوم والدفع
  {
    id: 14,
    keywords: ["داخل ماليزيا كم", "رسوم ماليزيا", "كم رسوم ماليزيا", "سعر ماليزيا", "الرسوم لماليزيا", "fees in malaysia", "yuran malaysia"],
    responseAr: "رسوم التسجيل للطلاب داخل ماليزيا 100 رنجت، والرسوم الشهرية 70 رنجت.",
    responseEn: "Registration fee for students inside Malaysia is 100 MYR, and the monthly fee is 70 MYR.",
    responseMs: "Yuran pendaftaran untuk pelajar di Malaysia ialah RM100, dan yuran bulanan ialah RM70."
  },
  {
    id: 15,
    keywords: ["خارج ماليزيا كم", "اللي برا ماليزيا كم يدفع", "رسوم خارج ماليزيا", "سعر خارج ماليزيا", "الرسوم للي برا", "fees outside malaysia", "yuran luar negara"],
    responseAr: "لمن هم خارج ماليزيا، رسوم التسجيل 50 دولار، والرسوم الشهرية 25 دولار.",
    responseEn: "For those outside Malaysia, the registration fee is 50 USD, and the monthly fee is 25 USD.",
    responseMs: "Bagi pelajar di luar Malaysia, yuran pendaftaran ialah 50 USD, dan yuran bulanan ialah 25 USD."
  },
  {
    id: 16,
    keywords: ["الرسوم شهرية", "الدفع كل شهر", "هل الرسوم شهرية", "كم الاشتراك", "كم السعر", "بكم الشهر", "الدفع كم", "كم سعر", "monthly fees", "yuran bulanan"],
    responseAr: "نعم، توجد رسوم شهرية حسب بلد الطالب: داخل ماليزيا 70 رنجت شهريًا، وخارج ماليزيا 25 دولار شهريًا.",
    responseEn: "Yes, there are monthly fees depending on the student's country: 70 MYR monthly inside Malaysia, and 25 USD monthly outside Malaysia.",
    responseMs: "Ya, terdapat yuran bulanan mengikut negara tempat tinggal pelajar: RM70 sebulan di Malaysia, dan 25 USD sebulan untuk luar Malaysia."
  },
  {
    id: 17,
    keywords: ["طريقة الدفع", "كيف ادفع", "طريقة سداد", "كيف الدفع", "رقم الحساب للدفع", "payment method", "cara bayar"],
    responseAr: "طريقة الدفع يتم تأكيدها من الإدارة بعد التسجيل. فضلاً تواصلوا مع الواتساب للحصول على تفاصيل الدفع المعتمدة.",
    responseEn: "The payment method is confirmed by the administration after registration. Please contact us via WhatsApp to receive the approved payment details.",
    responseMs: "Kaedah pembayaran akan disahkan oleh pihak pentadbiran selepas pendaftaran. Sila hubungi kami melalui WhatsApp untuk mendapatkan butiran pembayaran yang sah."
  },
  {
    id: 18,
    keywords: ["هل توجد خصومات", "في خصومات", "ايش الخصومات", "خصم", "في خصم", "discount", "diskaun"],
    responseAr: "لا تظهر تفاصيل الخصومات في المعلومات المتاحة. يمكنكم التواصل مع الإدارة للاستفسار عن أي خصومات أو ترتيبات خاصة إن وجدت.",
    responseEn: "Discount details are not specified in the static information. Please contact the administration directly to inquire about any discounts or family arrangements.",
    responseMs: "Butiran diskaun tidak dinyatakan secara khusus dalam maklumat am. Sila hubungi pentadbiran untuk bertanya tentang sebarang diskaun atau pakej keluarga yang ada."
  },
  {
    id: 19,
    keywords: ["استرجاع الرسوم", "استرداد المبلغ", "سياسة الاسترجاع", "لو بطلت يرجع المبلغ", "refund", "pulangkan wang"],
    responseAr: "سياسة الاسترجاع غير موضحة في المعلومات المتاحة، لذلك يُرجى التواصل مع الإدارة مباشرة قبل الدفع لمعرفة التفاصيل.",
    responseEn: "Refund policies are not specified in the general information. Please contact the administration directly before making payments to discuss the policy.",
    responseMs: "Polisi pemulangan wang tidak dinyatakan dalam maklumat umum. Sila hubungi pentadbiran terus sebelum membuat pembayaran untuk mengetahui butirannya."
  },

  // د. شروط القبول والانضمام
  {
    id: 20,
    keywords: ["شروط القبول", "ايش شروط القبول", "وش شروطكم", "admission requirements", "syarat kemasukan"],
    responseAr: "شروط القبول هي الجدية والانضباط، دفع رسوم التسجيل، والالتزام بأنظمة ولوائح الأكاديمية.",
    responseEn: "The main admission requirements are seriousness and discipline, payment of registration fees, and commitment to the academy's regulations and guidelines.",
    responseMs: "Syarat kemasukan utama adalah komitmen dan disiplin, pembayaran yuran pendaftaran, dan pematuhan kepada peraturan serta garis panduan akademi."
  },
  {
    id: 21,
    keywords: ["مقابلة او اختبار", "في اختبار قبل", "اختبار القبول", "هل في اختبار", "اختبار تحديد مستوى", "placement test", "ujian penempatan"],
    responseAr: "إذا كان لدى الطالب حفظ سابق، يتم اختباره في حفظه السابق، وإذا اجتاز الاختبار يمكنه مواصلة الحفظ من موضعه المناسب.",
    responseEn: "If the student has memorized sections of the Quran previously, a placement assessment is conducted. If passed, they can continue memorization from their current level.",
    responseMs: "Jika pelajar mempunyai hafazan terdahulu, ujian penempatan akan dijalankan. Jika lulus, mereka boleh meneruskan hafazan daripada tahap semasa mereka."
  },
  {
    id: 22,
    keywords: ["ابدأ من البداية", "لازم ابدأ من الاول", "اكمل من حفظي", "ابدأ من الفاتحة", "حفظ سابق", "عندي حفظ قديم", "انا حافظ جزء"],
    responseAr: "لا يلزم أن تبدأ من البداية إذا كان لديك حفظ سابق. يتم اختبار الحفظ السابق، وإذا اجتزت الاختبار يمكنك المواصلة.",
    responseEn: "You do not have to start from the beginning if you have prior memorization. We assess your current retention, and you can resume from there.",
    responseMs: "Anda tidak perlu bermula dari awal jika mempunyai hafazan terdahulu. Kami akan menilai tahap ingatan semasa anda, dan anda boleh menyambung dari situ."
  },
  {
    id: 23,
    keywords: ["متى يتم اختبار", "متى تختبروني", "موعد الاختبار", "test date", "tarikh ujian"],
    responseAr: "يتم أولًا إعداد خطة وتحديد فترة للمراجعة، وبعد ذلك يتم تحديد موعد الاختبار.",
    responseEn: "First, a study plan is set and a revision period is designated. After that, the test date will be scheduled.",
    responseMs: "Pertama, rancangan pengajian akan ditetapkan dan tempoh ulangkaji akan diperuntukkan. Selepas itu, tarikh ujian akan dijadualkan."
  },
  {
    id: 24,
    keywords: ["القبول مضمون", "اذا سجلت خلاص انقبلت"],
    responseAr: "التسجيل خطوة أولى، ويتم بعدها متابعة البيانات وتحديد الحلقة المناسبة حسب المتاح ومستوى الطالب.",
    responseEn: "Registration is the first step, followed by checking applicant data and assigning the appropriate circle based on level and availability.",
    responseMs: "Pendaftaran adalah langkah pertama, diikuti dengan semakan data pemohon dan penempatan halaqah yang sesuai berdasarkan tahap dan kekosongan."
  },

  // هـ. الحلقات والمواعيد
  {
    id: 25,
    keywords: ["حلقات للبنين", "حلقات للاولاد", "بنين", "اولاد", "للولد", "boys circles", "halaqah lelaki"],
    responseAr: "نعم، توجد حلقات للبنين، ومنها حلقات حضور وأونلاين حسب المتاح في صفحة التسجيل.",
    responseEn: "Yes, we offer Quran circles specifically for boys, including both in-person and online classes based on current availability.",
    responseMs: "Ya, kami menawarkan halaqah Al-Quran khusus untuk lelaki, termasuk kelas bersemuka dan dalam talian berdasarkan kekosongan semasa."
  },
  {
    id: 26,
    keywords: ["حلقات للبنات", "بنات", "للبنت", "قسم البنات", "حلقة للبنات", "girls circles", "halaqah perempuan"],
    responseAr: "نعم، يوجد قسم خاص للطالبات، وتوجد حلقات للبنات حضور وأونلاين حسب المتاح.",
    responseEn: "Yes, there is a dedicated section for female students. We offer both in-person and online circles for girls based on availability.",
    responseMs: "Ya, terdapat bahagian khas untuk pelajar perempuan. Kami menawarkan halaqah bersemuka dan dalam talian untuk perempuan mengikut kekosongan."
  },
  {
    id: 27,
    keywords: ["منفصلون", "البنات والاولاد منفصلين", "الفصل بين الطلاب", "مختلط", "separated classes", "kelas berasingan"],
    responseAr: "نعم، يوجد قسم خاص للطلاب وقسم خاص للطالبات.",
    responseEn: "Yes, we maintain separate classes/sections for male and female students.",
    responseMs: "Ya, kami mengekalkan kelas/bahagian yang berasingan untuk pelajar lelaki dan perempuan."
  },
  {
    id: 28,
    keywords: ["وقت الحلقات", "متى مواعيد", "اوقات الدوام", "متى الدوام", "صباحي", "مسائي", "الفترات", "timing", "waktu kelas"],
    responseAr: "الدوام يكون على فترتين: صباحًا ومساءً. أما الموعد المحدد فيعتمد على الحلقة المناسبة والمتاحة.",
    responseEn: "Classes are held in two sessions: morning and evening. The exact schedule depends on the assigned circle and current availability.",
    responseMs: "Kelas diadakan dalam dua sesi: pagi dan petang. Jadual tepat bergantung kepada halaqah yang diperuntukkan dan kekosongan semasa."
  },
  {
    id: 29,
    keywords: ["اختيار الوقت", "اقدر اختار الوقت", "تغيير الوقت", "change time", "tukar waktu"],
    responseAr: "يتم اختيار الوقت حسب الحلقات المتاحة، ويمكنكم التواصل مع الإدارة لتحديد الأنسب لكم.",
    responseEn: "Timing is selected based on available circles. You can coordinate with the administration to find the best slot.",
    responseMs: "Waktu kelas dipilih berdasarkan halaqah yang tersedia. Anda boleh menyelaras dengan pentadbiran untuk mencari slot terbaik."
  },
  {
    id: 30,
    keywords: ["مدة الحلقة", "كم مدتها", "class duration", "durasi kelas"],
    responseAr: "مدة الحلقة قد تختلف حسب عدد الطلاب ونظام الحلقة، حيث يتم تقسيم وقت الحلقة بين الطلاب.",
    responseEn: "Circle duration varies depending on the number of students and the circle structure, with teaching time divided among students.",
    responseMs: "Durasi halaqah berbeza mengikut bilangan pelajar dan struktur halaqah, dengan masa pembelajaran dibahagikan sesama pelajar."
  },
  {
    id: 31,
    keywords: ["كم ياخذ كل طالب", "كم دقيقة للطالب", "وقت المعلم"],
    responseAr: "يتم تقسيم وقت الحلقة بين عدد الطلاب، ويختلف الوقت بحسب نظام الحلقة وعدد المشاركين.",
    responseEn: "The overall class time is divided among participants. The exact minutes per student depend on the circle's setup and class size.",
    responseMs: "Jumlah masa kelas dibahagikan sesama peserta. Minit tepat bagi setiap pelajar bergantung kepada susunan halaqah dan saiz kelas."
  },

  // و. الحفظ والمراجعة
  {
    id: 32,
    keywords: ["نظام الحفظ", "كيف طريقة الحفظ", "نظام الحفظ والمراجعة", "memorization system", "sistem hafazan"],
    responseAr: "يتم تحديد المسار حسب قدرة الطالب، وتوجد مسارات للحفظ تبدأ من ربع وجه يوميًا إلى وجهين يوميًا، مع تعبئة خطة والالتزام بها.",
    responseEn: "The track is customized according to student ability. We offer tracks ranging from a quarter page daily up to 2 pages daily, with a structured plan to commit to.",
    responseMs: "Laluan pembelajaran disesuaikan mengikut keupayaan pelajar. Kami menawarkan laluan daripada suku muka surat sehari sehingga 2 muka surat sehari, dengan rancangan berstruktur untuk diikuti."
  },
  {
    id: 33,
    keywords: ["مسارات الحفظ", "مستويات للحفظ", "المسارات", "tracks", "laluan"],
    responseAr: "نعم، توجد مسارات متعددة مثل: الماهر، الموهوب، المتميز، المجتهد، والمثابر، وتختلف حسب مقدار الحفظ اليومي.",
    responseEn: "Yes, we have multiple tracks (e.g. Al-Mahir, Al-Mawhoob, Al-Mutamayyiz, Al-Mujtahid, Al-Muthabir) depending on the daily memorization target.",
    responseMs: "Ya, kami mempunyai pelbagai laluan (cth. Al-Mahir, Al-Mawhoob, Al-Mutamayyiz, Al-Mujtahid, Al-Muthabir) bergantung kepada sasaran hafazan harian."
  },
  {
    id: 34,
    keywords: ["مسار الماهر", "الماهر يعني ايش", "ما هو الماهر"],
    responseAr: "مسار الماهر مناسب لمن يستطيع حفظ وجهين يوميًا، أي صفحتين، وفق خطة محددة.",
    responseEn: "Al-Mahir track is suitable for students who can memorize 2 pages (two faces) daily under a structured schedule.",
    responseMs: "Laluan Al-Mahir sesuai untuk pelajar yang boleh menghafal 2 muka surat sehari di bawah jadual berstruktur."
  },
  {
    id: 35,
    keywords: ["مسار الموهوب", "الموهوب كم يحفظ", "ما هو الموهوب"],
    responseAr: "مسار الموهوب يكون بحفظ وجه ونصف يوميًا تقريبًا، وفق خطة الحفظ والمراجعة.",
    responseEn: "Al-Mawhoob track involves memorizing approximately 1.5 pages daily, combined with systematic review.",
    responseMs: "Laluan Al-Mawhoob melibatkan hafazan kira-kira 1.5 muka surat sehari, digabungkan dengan ulangkaji sistematik."
  },
  {
    id: 36,
    keywords: ["مسار المتميز", "المتميز كم يحفظ", "ما هو المتميز"],
    responseAr: "مسار المتميز يكون بحفظ وجه واحد يوميًا تقريبًا، مع الالتزام بالخطة والمتابعة.",
    responseEn: "Al-Mutamayyiz track involves memorizing approximately 1 page daily, with continuous tracking and commitment.",
    responseMs: "Laluan Al-Mutamayyiz melibatkan hafazan kira-kira 1 muka surat sehari, dengan susulan dan komitmen berterusan."
  },
  {
    id: 37,
    keywords: ["مسار المجتهد", "المجتهد كم يحفظ", "ما هو المجتهد"],
    responseAr: "مسار المجتهد يكون بحفظ نصف وجه يوميًا تقريبًا، وهو مناسب لمن يريد التدرج بهدوء.",
    responseEn: "Al-Mujtahid track requires memorizing about half a page daily, ideal for students who prefer a moderate, steady pace.",
    responseMs: "Laluan Al-Mujtahid memerlukan hafazan kira-kira separuh muka surat sehari, sesuai untuk pelajar yang memilih kadar sederhana dan konsisten."
  },
  {
    id: 38,
    keywords: ["مسار خفيف", "حفظي بطيء", "المثابر كم", "مسار المثابر", "اقل مسار"],
    responseAr: "نعم، يوجد مسار المثابر، ويكون بحفظ ربع وجه يوميًا تقريبًا، ويمكن اختيار المسار المناسب حسب قدرة الطالب.",
    responseEn: "Yes, Al-Muthabir track involves memorizing about a quarter of a page daily. You can choose the track that fits the student's capability.",
    responseMs: "Ya, laluan Al-Muthabir melibatkan hafazan kira-kira suku muka surat sehari. Anda boleh memilih laluan yang sesuai dengan kemampuan pelajar."
  },
  {
    id: 39,
    keywords: ["خطة حفظ", "تعطوني خطة", "جدول حفظ", "memorization plan", "jadual hafazan"],
    responseAr: "نعم، يتم تحديد مسار الحفظ ووضع خطة كاملة للحفظ والمراجعة بمساعدة المعلم، ثم تُرفع الخطة عبر النظام.",
    responseEn: "Yes, the memorization track is chosen and a full plan for memorization and revision is set with the teacher's help, then uploaded to the system.",
    responseMs: "Ya, laluan hafazan dipilih dan satu rancangan lengkap untuk hafazan serta ulangkaji ditetapkan dengan bantuan guru, kemudian dimuat naik ke dalam sistem."
  },
  {
    id: 40,
    keywords: ["نموذج خطة", "نموذج للخطة"],
    responseAr: "نعم، توجد خطة يتم إعدادها حسب مسار الطالب وقدرته، ويشارك المعلم في مساعدته على ضبطها.",
    responseEn: "Yes, a customized study plan template is filled out based on student capability and track, adjusted with the teacher's guidance.",
    responseMs: "Ya, templat rancangan pengajian tersuai diisi berdasarkan keupayaan dan laluan pelajar, diselaraskan dengan bimbingan guru."
  },
  {
    id: 41,
    keywords: ["مراجعة للحفاظ", "انا حافظ عندكم مراجعة", "خاتم", "revision for huffaz", "ulangkaji huffaz"],
    responseAr: "نعم، توجد حلقة إتقان وحلقة إجازة للحفاظ.",
    responseEn: "Yes, we offer Mastery Circles and Connected Sanad circles specifically designed for Huffaz (those who have memorized the entire Quran).",
    responseMs: "Ya, kami menawarkan Halaqah Mastery dan Halaqah Sanad bersambung yang direka khas untuk Huffaz (mereka yang telah menghafal seluruh Al-Quran)."
  },
  {
    id: 42,
    keywords: ["مصحف خاص", "لازم يكون عندي مصحف", "مصحف محدد", "own mushaf", "mushaf sendiri"],
    responseAr: "نعم، يُفضّل أن يكون لدى الطالب مصحف خاص ليسهل عليه الحفظ وتذكر الآيات والتأشير على الأخطاء ومراجعتها.",
    responseEn: "Yes, we highly recommend that the student uses their own physical Mushaf copy. This aids visual memory, noting slip points, and steady revision.",
    responseMs: "Ya, kami amat mengesyorkan agar pelajar menggunakan naskhah Mushaf fizikal mereka sendiri. Ini membantu ingatan visual, mencatat kesilapan, dan ulangkaji yang mantap."
  },

  // ز. التجويد والتدبر والأنشطة
  {
    id: 43,
    keywords: ["عندكم تجويد", "درس تجويد", "حصاد الاسبوع", "التجويد", "tajweed lessons", "kelas tajwid"],
    responseAr: "نعم، ضمن مزايا الأكاديمية يوجد درس تجويد أسبوعي مع متابعة واختبار حصاد الأسبوع للحفظ والمراجعة.",
    responseEn: "Yes, our programs include weekly Tajweed lessons along with continuous follow-up and a weekly evaluation (Harvest of the Week) to verify memorization and revision quality.",
    responseMs: "Ya, program kami merangkumi pelajaran Tajwid mingguan berserta susulan berterusan dan penilaian mingguan (Hasil Mingguan) untuk mengesahkan kualiti hafazan dan ulangkaji."
  },
  {
    id: 44,
    keywords: ["درس تدبر", "دروس تدبر", "في تدبر", "tadabbur lessons", "kelas tadabbur"],
    responseAr: "نعم، يوجد درس تدبر أسبوعي ضمن البرنامج.",
    responseEn: "Yes, a weekly Quranic reflection (Tadabbur) lesson is included in the educational package.",
    responseMs: "Ya, pelajaran tadabbur Al-Quran mingguan disertakan dalam pakej pendidikan."
  },
  {
    id: 45,
    keywords: ["فعاليات", "انشطة غير الحفظ", "دورات تدريبية", "تكريم", "activities", "aktiviti"],
    responseAr: "نعم، توجد محاضرة تربوية أسبوعية أونلاين، ودورات تدريبية كل شهرين، وبرنامج شهري للحلقات، وتكريم للطلاب المتميزين شهريًا.",
    responseEn: "Yes, we host weekly online educational lectures, specialized training courses every two months, monthly circle programs, and monthly recognition ceremonies for outstanding students.",
    responseMs: "Ya, kami menganjurkan kuliah pendidikan dalam talian mingguan, kursus latihan khusus setiap dua bulan, program halaqah bulanan, dan majlis penghargaan bulanan untuk pelajar cemerlang."
  },
  {
    id: 46,
    keywords: ["تكريم للطلاب", "تحفيز للطلاب", "تكرمون", "honoring students", "menghargai pelajar"],
    responseAr: "نعم، يتم تكريم الطلاب المثاليين والمتميزين في الأكاديمية شهريًا.",
    responseEn: "Yes, exemplary and outstanding students at the academy are honored and rewarded monthly.",
    responseMs: "Ya, pelajar yang teladan dan cemerlang di akademi dihargai dan dianugerahkan setiap bulan."
  },

  // ح. برامج الأطفال
  {
    id: 47,
    keywords: ["برامج للاطفال", "حلقات للاطفال", "عمر الاطفال", "اطفال", "للصغار", "children programs", "program kanak-kanak"],
    responseAr: "نعم، توجد برامج مخصصة للأطفال، منها فصل قرآني علمني وبرنامج النورانية، وتستخدم بعض البرامج طرقًا حديثة مثل الخرائط الذهنية والأنشطة الحركية.",
    responseEn: "Yes, we offer specialized children's programs, including the \"Teach Me Quran\" class and the Noorania foundation course. They utilize modern techniques like mind-mapping and active movement activities.",
    responseMs: "Ya, kami menawarkan program khas untuk kanak-kanak, termasuk kelas \"Ajarkan Saya Al-Quran\" dan kursus asas Noorania. Mereka menggunakan teknik moden seperti peta minda dan aktiviti pergerakan aktif."
  },
  {
    id: 48,
    keywords: ["فصل قرآني علمني", "برنامج علمني للاطفال", "فصل علمني"],
    responseAr: "هو برنامج خاص للأطفال يعتمد على فهم وحفظ القرآن الكريم، خاصة جزء عم، بطريقة حديثة باستخدام الخرائط الذهنية والأنشطة الحركية التي تساعد على الفهم والتذكر والحفظ.",
    responseEn: "\"Teach Me\" is a children's Quran class focusing on understanding and memorizing Juz Amma using modern interactive methods like mind maps and kinetics to improve memory retention.",
    responseMs: "\"Ajarkan Saya\" ialah kelas Al-Quran kanak-kanak yang memfokuskan kepada pemahaman dan hafazan Juz Amma menggunakan kaedah interaktif moden seperti peta minda dan pergerakan fizikal untuk meningkatkan ingatan."
  },
  {
    id: 49,
    keywords: ["برنامج النورانية", "النورانية ايش هي", "القاعدة النورانية", "qaida noorania"],
    responseAr: "برنامج يساعد الطالب على تعلم القراءة والكتابة وفهم الحروف والأصوات العربية، كما يتعلم فيه الطالب القرآن الكريم والعلوم الشرعية المناسبة لعمره.",
    responseEn: "A foundational method that teaches proper Arabic pronunciation, reading, and spelling, alongside basic Quranic recitation and age-appropriate Islamic topics.",
    responseMs: "Kaedah asas yang mengajar sebutan, pembacaan, dan ejaan bahasa Arab yang betul, di samping bacaan Al-Quran asas dan topik Islam yang sesuai dengan umur."
  },
  {
    id: 50,
    keywords: ["النورانية مناسبة للمبتدئين", "ما يعرف يقرا تناسبه", "ما يعرف عربي"],
    responseAr: "نعم، برنامج النورانية مناسب للمبتدئين لأنه يساعد على تعلم الحروف والأصوات والقراءة بطريقة تأسيسية.",
    responseEn: "Yes, the Noorania program is ideal for absolute beginners as it systematically teaches letters, phonetic rules, and reading from the absolute basics.",
    responseMs: "Ya, program Noorania amat sesuai untuk pemula kerana ia mengajar huruf, hukum sebutan, dan pembacaan secara sistematik dari asas."
  },
  {
    id: 51,
    keywords: ["تقبلون الاطفال الصغار", "من عمر كم", "السن المناسب للأطفال", "عمر كم تقبلون", "age limit", "had umur"],
    responseAr: "العمر المحدد غير موضح في المعلومات المتاحة، لكن توجد برامج خاصة للأطفال. للتأكد من العمر المناسب، يُرجى التواصل مع الإدارة.",
    responseEn: "Specific minimum age parameters are not detailed in static notes, but we have tailored children's classes. Please reach out to the admin office to check child eligibility.",
    responseMs: "Had umur minimum khusus tidak dinyatakan secara terperinci dalam maklumat am, tetapi kami mempunyai kelas kanak-kanak yang disesuaikan. Sila hubungi pentadbiran untuk menyemak kelayakan."
  },

  // ط. برنامج الإجازة
  {
    id: 52,
    keywords: ["برنامج اجازة", "عندكم اجازة قران", "اجازة بالسند", "الاجازة بالسند", "ijazah program", "program ijazah"],
    responseAr: "نعم، يوجد برنامج الإجازة، وهو برنامج يتيح للطالب الحصول على شهادة الإجازة بالسند المتصل بعد تحقق شروط القراءة الصحيحة.",
    responseEn: "Yes, we have an Ijazah program, allowing students to earn an authentic certification with a Connected Chain of Narration (Sanad) upon meeting precise recitation criteria.",
    responseMs: "Ya, kami mempunyai program Ijazah, membolehkan pelajar memperoleh sijil pentauliahan dengan Rantaian Riwayat Bersambung (Sanad) setelah memenuhi kriteria bacaan yang tepat."
  },
  {
    id: 53,
    keywords: ["معنى الاجازة", "يعني ايش اجازة"],
    responseAr: "الإجازة تعني أن الشيخ أو المجيز يشهد أن قراءة الطالب أصبحت صحيحة بالنسبة للرواية التي أجازه بها، ثم يأذن له أن يقرأ ويُقرئ غيره.",
    responseEn: "Ijazah is a certificate where the scholar testifies that the student's recitation matches the traditional narration guidelines perfectly, authorizing them to recite and teach others.",
    responseMs: "Ijazah ialah sijil di mana guru bersaksi bahawa bacaan pelajar sepadan dengan garis panduan riwayat tradisi dengan sempurna, memberi kebenaran kepada mereka untuk membaca dan mengajar orang lain."
  },
  {
    id: 54,
    keywords: ["الالتحاق ببرنامج الاجازة", "اي احد يدخل الاجازة", "شروط الاجازة"],
    responseAr: "برنامج الإجازة يحتاج إلى مستوى مناسب في القراءة والإتقان. يُفضل التواصل مع الإدارة أو المعلم لتقييم المستوى وتحديد إمكانية الالتحاق.",
    responseEn: "Entering the Ijazah track requires an advanced level of recitation precision. We recommend getting assessed by a teacher first to determine suitability.",
    responseMs: "Memasuki program Ijazah memerlukan tahap ketepatan bacaan yang tinggi. Kami mengesyorkan agar dinilai oleh guru terlebih dahulu untuk menentukan kesesuaian."
  },

  // ي. تعليم اللغة العربية
  {
    id: 55,
    keywords: ["تعلمون اللغة العربية", "عندكم تعليم عربي", "لغة عربية", "تعليم اللغة العربية", "arabic classes", "kelas bahasa arab"],
    responseAr: "نعم، يوجد برنامج لتعليم اللغة العربية للناطقين بغيرها.",
    responseEn: "Yes, we offer a dedicated program for teaching Arabic to non-native speakers.",
    responseMs: "Ya, kami menawarkan program khas untuk pengajaran bahasa Arab kepada penutur bukan asli."
  },
  {
    id: 56,
    keywords: ["لغير العرب", "ينفع للي ما يتكلم عربي", "لغير الناطقين", "for non arabs", "bukan arab"],
    responseAr: "نعم، البرنامج مخصص للطلاب الذين لا يتحدثون العربية كلغة أم، ويركز على الاستماع والتحدث والقراءة والكتابة.",
    responseEn: "Yes, the program is designed for students whose native language is not Arabic, focusing on listening, speaking, reading, and writing skills.",
    responseMs: "Ya, program ini dirancang untuk pelajar yang bahasa ibundanya bukan bahasa Arab, memberi tumpuan kepada kemahiran mendengar, bertutur, membaca, dan menulis."
  },
  {
    id: 57,
    keywords: ["يشمل برنامج العربية", "ايش اتعلم في العربي", "مهارات اللغة"],
    responseAr: "يركز البرنامج على مهارات الاستماع، والتحدث، والقراءة، والكتابة، مع تعريف بالثقافة العربية وممارساتها.",
    responseEn: "The program builds listening comprehension, conversational fluency, reading literacy, and writing proficiency, with introductions to cultural contexts.",
    responseMs: "Program ini membina pemahaman mendengar, kefasihan bertutur, literasi membaca, dan kecekapan menulis, berserta pengenalan kepada konteks budaya."
  },

  // ك. برنامج قارئ أثر
  {
    id: 58,
    keywords: ["برنامج قارئ اثر", "ايش برنامج قارئ اثر", "قارئ اثر", "qari athar"],
    responseAr: "هو برنامج قرآني تربوي يهدف إلى صناعة قارئ يحمل أثر القرآن في سلوكه وقلبه، ويجمع بين إتقان التلاوة، وتأمل المعاني، والعمل بما قرأ.",
    responseEn: "A spiritual and educational program designed to nurture a reciter who embodies Quranic values, combining reading mastery, reflection, and practice.",
    responseMs: "Program kerohanian dan pendidikan yang dirancang untuk melahirkan qari yang mengamalkan nilai-nilai Al-Quran, menggabungkan penguasaan bacaan, tadabbur, dan amalan."
  },
  {
    id: 59,
    keywords: ["برنامج فقط للتلاوة", "قارئ اثر بس قراءة", "فقط تلاوة"],
    responseAr: "لا، البرنامج لا يقتصر على التلاوة الصحيحة، بل يهتم أيضًا بفهم المعاني والتخلق بأخلاق القرآن.",
    responseEn: "No, the course is not limited to proper articulation; it equally emphasizes understanding the messages and adopting Quranic manners.",
    responseMs: "Tidak, kursus ini tidak terhad kepada sebutan yang betul sahaja; ia juga menekankan pemahaman mesej dan penerapan akhlak Al-Quran."
  },

  // ل. برنامج تكوين
  {
    id: 60,
    keywords: ["برنامج تكوين", "ايش برنامج تكوين", "تكوين", "takween program"],
    responseAr: "برنامج تكوين يهتم بتأهيل وتدريب معلمي القرآن الكريم واللغة العربية، من خلال تزويدهم بالمهارات والأساليب التربوية الحديثة.",
    responseEn: "Takween program focuses on training and certifying Quran and Arabic language teachers, providing them with modern pedagogical skills.",
    responseMs: "Program Takween menumpukan kepada latihan dan pentauliahan guru Al-Quran dan bahasa Arab, membekalkan mereka dengan kemahiran pedagogi moden."
  },
  {
    id: 61,
    keywords: ["تكوين للمعلمين", "تكوين للمدرسين", "معلمي القران واللغة العربية"],
    responseAr: "نعم، البرنامج يستهدف معلمي القرآن الكريم واللغة العربية أو من يرغب في التأهل للتعليم.",
    responseEn: "Yes, the program is directed at active Quran & Arabic teachers or individuals seeking to qualify for educational teaching positions.",
    responseMs: "Ya, program ini ditujukan kepada guru Al-Quran & bahasa Arab yang aktif atau individu yang ingin layak menyandang jawatan pengajaran."
  },

  // م. الالتزام والغياب
  {
    id: 62,
    keywords: ["ما سياسة الغياب", "لو غبت ايش يصير", "غياب", "لو غبت", "absence policy", "polisi ketidakhadiran"],
    responseAr: "ينبغي الالتزام بالحضور والانضابط. وحسب نظام الأكاديمية، إذا غاب الطالب أكثر من ثلاثة أيام بدون عذر قد يتم استبعاده من الحلقة.",
    responseEn: "Attendance and discipline are required. According to academy rules, if a student is absent for more than three days without a valid excuse, they may be dismissed from the circle.",
    responseMs: "Kehadiran dan disiplin amat diperlukan. Mengikut peraturan akademi, jika pelajar tidak hadir melebihi tiga hari tanpa alasan munasabah, mereka boleh dikeluarkan daripada halaqah."
  },
  {
    id: 63,
    keywords: ["تقديم عذر للغياب", "عذر للغياب", "لو عندي عذر"],
    responseAr: "نعم، يُفضل إبلاغ المعلم أو الإدارة مسبقًا وتوضيح العذر حتى لا يُحسب الغياب بدون عذر.",
    responseEn: "Yes, you should notify the teacher or administration in advance with details of your excuse to avoid unauthorized absence marks.",
    responseMs: "Ya, anda perlu memaklumkan kepada guru atau pentadbiran terlebih dahulu dengan butiran alasan anda untuk mengelakkan tanda tidak hadir tanpa izin."
  },
  {
    id: 64,
    keywords: ["تغيير الحلقة", "اقدر اغير الحلقة", "اغير الوقت"],
    responseAr: "يمكنكم طلب ذلك من الإدارة، وسيتم النظر في الطلب حسب توفر المقاعد والمواعيد المناسبة.",
    responseEn: "You can request this from the admin office, and it will be evaluated based on vacant seats and schedule compatibility.",
    responseMs: "Anda boleh meminta perkara ini daripada pentadbiran, dan ia akan dinilai berdasarkan kekosongan tempat serta kesesuaian jadual."
  },
  {
    id: 65,
    keywords: ["ايقاف الدراسة مؤقتا", "تجميد الاشتراك", "اقدر اوقف فترة واروح", "ايقاف مؤقت", "freeze account", "gantung akaun"],
    responseAr: "هذه التفاصيل تحتاج تأكيدًا من الإدارة؛ يُرجى التواصل عبر الواتساب لمعرفة الإجراء المناسب.",
    responseEn: "These specific parameters require admin approval. Please reach out via WhatsApp to discuss student suspension options.",
    responseMs: "Butiran khusus ini memerlukan kelulusan pentadbiran. Sila hubungi kami melalui WhatsApp untuk membincangkan pilihan penangguhan pengajian."
  },

  // ن. الأسئلة التقنية
  {
    id: 66,
    keywords: ["تحميل برنامج زووم", "لازم انزل زووم", "برنامج زووم", "تطبيق زووم", "zoom app", "aplikasi zoom"],
    responseAr: "يُفضّل تحميل برنامج زووم، خاصة للحلقات أو اللقاءات الأونلاين.",
    responseEn: "It is highly recommended to download the Zoom application, especially for online circles and live virtual meetings.",
    responseMs: "Sangat disyorkan untuk memuat turun aplikasi Zoom, terutamanya untuk halaqah dalam talian dan mesyuarat maya secara langsung."
  },
  {
    id: 67,
    keywords: ["مشكلة في فتح الموقع", "الموقع ما يفتح", "موقعكم خربان", "ما اقدر افتح الموقع", "website error", "masalah laman web"],
    responseAr: "جرّب تحديث الصفحة أو استخدام متصفح آخر أو التأكد من اتصال الإنترنت. إذا استمرت المشكلة، تواصل مع الإدارة عبر الواتساب.",
    responseEn: "Try refreshing the page, using a different browser, or checking your internet connection. If the issue persists, contact us on WhatsApp.",
    responseMs: "Cuba segar semula halaman, gunakan pelayar lain, atau semak sambungan internet anda. Jika masalah berterusan, hubungi kami di WhatsApp."
  },
  {
    id: 68,
    keywords: ["رفع خطة الحفظ", "مو قادر ارفع الخطة", "مشكلة في الرفع"],
    responseAr: "فضلاً جرّب من متصفح آخر أو تأكد من اتصال الإنترنت. وإذا استمرت المشكلة، أرسل صورة للمشكلة للإدارة عبر الواتساب لمساعدتك.",
    responseEn: "Please try uploading from a different browser or check your connection. If it persists, send a screenshot of the error to admin on WhatsApp.",
    responseMs: "Sila cuba memuat naik daripada pelayar lain atau semak sambungan anda. Jika ia berterusan, hantar tangkapan skrin ralat kepada pentadbiran di WhatsApp."
  },
  {
    id: 69,
    keywords: ["الدخول الى الحلقة", "ما قدرت ادخل الحلقة اونلاين", "رابط الزووم ما يفتح", "cannot join zoom", "tak boleh masuk zoom"],
    responseAr: "فضلاً تأكد من الرابط والوقت المحدد ومن تحميل برنامج زووم. وإذا استمرت المشكلة، تواصل مباشرة مع المعلم أو الإدارة.",
    responseEn: "Please double check the class link, schedule, and ensure Zoom is installed. If issues persist, contact your teacher or the admin office immediately.",
    responseMs: "Sila semak semula pautan kelas, jadual, dan pastikan Zoom dipasang. Jika masalah berterusan, hubungi guru anda atau pejabat pentadbiran dengan segera."
  },

  // س. التواصل وخدمة العملاء
  {
    id: 70,
    keywords: ["التواصل مع الاكاديمية", "كيف اكلمكم", "رقمكم", "بريدكم", "كيف اتواصل", "contact info", "hubungi kami"],
    responseAr: "يمكنكم التواصل عبر البريد الإلكتروني: atharacademy6@gmail.com أو عبر الواتساب: +60147086011.",
    responseEn: "You can contact us via Email: atharacademy6@gmail.com or via WhatsApp: +60147086011.",
    responseMs: "Anda boleh menghubungi kami melalui E-mel: atharacademy6@gmail.com atau melalui WhatsApp: +60147086011."
  },
  {
    id: 71,
    keywords: ["عندكم واتساب", "رقم واتساب", "واتساب", "رقم الواتس", "whatsapp number", "nombor whatsapp"],
    responseAr: "نعم، يمكنكم التواصل عبر واتساب: +60147086011.",
    responseEn: "Yes, you can reach out to us via WhatsApp at: +60147086011.",
    responseMs: "Ya, anda boleh menghubungi kami melalui WhatsApp di talian: +60147086011."
  },
  {
    id: 72,
    keywords: ["مسؤول", "التحدث مع موظف", "اكلم احد من الادارة", "اكلم الموظف", "ادارة", "admin", "staf"],
    responseAr: "بكل سرور، يمكنكم التواصل مباشرة مع الإدارة عبر الواتساب، وسيتم مساعدتكم بإذن الله.",
    responseEn: "We would be happy to help. You can message the administration directly on WhatsApp, and we will assist you shortly.",
    responseMs: "Kami berbesar hati untuk membantu. Anda boleh menghantar mesej terus kepada pentadbiran melalui WhatsApp, dan kami akan membantu anda segera."
  },
  {
    id: 73,
    keywords: ["شکوی", "عندي شكوى", "ملاحظة", "ابغى اشتكي", "complaint", "aduan"],
    responseAr: "نعتذر عن أي إزعاج حصل لكم. فضلاً أرسلوا تفاصيل المشكلة واسم الطالب والحلقة، وسيتم تحويل الملاحظة للإدارة لمتابعتها.",
    responseEn: "We sincerely apologize for any inconvenience. Please send the details of your issue, student name, and circle, and we will escalate it to admin.",
    responseMs: "Kami memohon maaf atas sebarang kesulitan. Sila hantar butiran masalah anda, nama pelajar, dan halaqah, dan kami akan memajukannya kepada pihak pentadbiran."
  },
  {
    id: 74,
    keywords: ["اقتراح", "عندي اقتراح", "اقتراحات", "suggestion", "cadangan"],
    responseAr: "نسعد بسماع اقتراحاتكم، فهي تساعدنا على التطوير. فضلاً أرسلوا الاقتراح عبر الواتساب أو البريد الإلكتروني.",
    responseEn: "We welcome your suggestions to help us improve. Please submit your ideas via WhatsApp or Email.",
    responseMs: "Kami mengalu-alukan cadangan anda untuk membantu kami menambah baik. Sila kemukakan idea anda melalui WhatsApp atau e-mel."
  },

  // ع. التوظيف والتطوع
  {
    id: 75,
    keywords: ["وظائف شاغرة", "في توظيف عندكم", "توظيف", "شغل", "تقديم على وظيفة", "jobs", "kerja kosong"],
    responseAr: "يوجد في الموقع قسم للتوظيف. يمكنكم الدخول إليه أو التواصل مع الإدارة لمعرفة الفرص المتاحة حاليًا.",
    responseEn: "We have a careers section on the website. You can check it or message the administration to learn about current opportunities.",
    responseMs: "Kami mempunyai bahagian kerjaya di laman web. Anda boleh menyemaknya atau menghantar mesej kepada pentadbiran untuk mengetahui peluang semasa."
  },
  {
    id: 76,
    keywords: ["معلم قران", "اشتغل معلم قران", "اصير مدرس", "توظيف معلمين", "quran teacher job", "kerja guru quran"],
    responseAr: "مرحبًا بكم، يمكنكم زيارة قسم التوظيف في الموقع أو إرسال بياناتكم للإدارة عبر البريد الإلكتروني أو الواتساب.",
    responseEn: "Welcome! You can check the careers section on our site or submit your credentials/resume to the administration via Email or WhatsApp.",
    responseMs: "Selamat datang! Anda boleh menyemak bahagian kerjaya di laman web kami atau menghantar kelayakan/resume anda kepada pentadbiran melalui e-mel atau WhatsApp."
  },
  {
    id: 77,
    keywords: ["فرص للتطوع", "اقدر اتطوع", "تطوع", "volunteer opportunities", "peluang sukarelawan"],
    responseAr: "هذه التفاصيل تحتاج تأكيدًا من الإدارة. يمكنكم التواصل عبر الواتساب وإرسال نبذة عن خبراتكم ورغبتكم في التطوع.",
    responseEn: "These details require administration confirmation. You can contact us via WhatsApp to share your background and volunteering preferences.",
    responseMs: "Butiran ini memerlukan pengesahan pihak pentadbiran. Anda boleh menghubungi kami melalui WhatsApp untuk berkongsi latar belakang dan minat sukarelawan anda."
  }
];

// Keywords requiring direct administrative redirects based on rule 6
const ADMIN_REDIRECT_KEYWORDS = [
  "مقاعد", "المقاعد المتاحة", "متاح مقعد", "أعمار القبول", "عمر كم", "العمر المناسب",
  "طريقة الدفع التفصيلية", "رقم الحساب", "كيف أدفع بالتفصيل", "خصومات", "خصم الأخوة", "الخصم",
  "استرجاع الرسوم", "استرداد المبلغ", "سياسة الاسترجاع", "جدول حلقة", "موعد الحلقة المحددة",
  "اسم المعلم", "أسماء المعلمين", "شهادة معتمدة", "اعتماد رسمي", "هل الشهادة معتمدة",
  "seats", "available seats", "payment details", "bank account", "sibling discount", "refund policy",
  "schedule", "teacher name", "accredited", "certificate", "tempat kosong", "cara bayar", "akaun bank",
  "diskaun adik beradik", "polisi refund", "jadual kelas", "nama guru", "sijil diiktiraf"
];

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/[ى]/g, "ي")
    .replace(/[^\w\sء-ي]/g, "") // Keep only letters and spaces
    .replace(/\s+/g, " ")
    .trim();
}

export function findLocalResponse(query: string, lang: Language): string {
  const normQuery = normalizeText(query);
  const welcome = lang === 'ms' ? CHATBOT_RULES.welcomeGreetingMs : (lang === 'en' ? CHATBOT_RULES.welcomeGreetingEn : CHATBOT_RULES.welcomeGreetingAr);
  const admin = lang === 'ms' ? CHATBOT_RULES.adminRedirectMs : (lang === 'en' ? CHATBOT_RULES.adminRedirectEn : CHATBOT_RULES.adminRedirectAr);
  const fallback = lang === 'ms' ? CHATBOT_RULES.fallbackMs : (lang === 'en' ? CHATBOT_RULES.fallbackEn : CHATBOT_RULES.fallbackAr);

  // If greeting
  if (
    normQuery.includes("سلام") ||
    normQuery.includes("مرحبا") ||
    normQuery.includes("اهلا") ||
    normQuery.includes("hello") ||
    normQuery.includes("hi") ||
    normQuery.includes("selamat") ||
    normQuery.includes("apa khabar") ||
    normQuery.includes("assalamu")
  ) {
    return welcome;
  }

  // Check if it asks about admin redirect topics
  const requiresAdminRedirect = ADMIN_REDIRECT_KEYWORDS.some(keyword => {
    const normKeyword = normalizeText(keyword);
    return normQuery.includes(normKeyword);
  });

  if (requiresAdminRedirect) {
    return admin;
  }

  // Score matching
  let bestMatch: QAItem | null = null;
  let maxScore = 0;

  for (const item of CHATBOT_QA_LIST) {
    let score = 0;
    for (const kw of item.keywords) {
      const normKw = normalizeText(kw);
      if (normQuery.includes(normKw)) {
        // Higher score for longer keyword matches
        score += normKw.length;
      }
    }
    if (score > maxScore) {
      maxScore = score;
      bestMatch = item;
    }
  }

  if (bestMatch && maxScore > 0) {
    if (lang === 'ms' && bestMatch.responseMs) {
      return bestMatch.responseMs;
    }
    if (lang === 'en' && bestMatch.responseEn) {
      return bestMatch.responseEn;
    }
    return bestMatch.responseAr;
  }

  // Dynamic friendly fallback that provides an overview instead of saying "under pressure/error"
  return welcome + "\n\n" + fallback;
}

export function findLocalMatch(query: string, lang: Language): string | null {
  const normQuery = normalizeText(query);
  const welcome = lang === 'ms' ? CHATBOT_RULES.welcomeGreetingMs : (lang === 'en' ? CHATBOT_RULES.welcomeGreetingEn : CHATBOT_RULES.welcomeGreetingAr);
  const admin = lang === 'ms' ? CHATBOT_RULES.adminRedirectMs : (lang === 'en' ? CHATBOT_RULES.adminRedirectEn : CHATBOT_RULES.adminRedirectAr);

  // If greeting
  if (
    normQuery.includes("سلام") ||
    normQuery.includes("مرحبا") ||
    normQuery.includes("اهلا") ||
    normQuery.includes("hello") ||
    normQuery.includes("hi") ||
    normQuery.includes("selamat") ||
    normQuery.includes("apa khabar") ||
    normQuery.includes("assalamu")
  ) {
    return welcome;
  }

  // Check if it asks about admin redirect topics
  const requiresAdminRedirect = ADMIN_REDIRECT_KEYWORDS.some(keyword => {
    const normKeyword = normalizeText(keyword);
    return normQuery.includes(normKeyword);
  });

  if (requiresAdminRedirect) {
    return admin;
  }

  // Score matching
  let bestMatch: QAItem | null = null;
  let maxScore = 0;

  for (const item of CHATBOT_QA_LIST) {
    let score = 0;
    for (const kw of item.keywords) {
      const normKw = normalizeText(kw);
      if (normQuery.includes(normKw)) {
        score += normKw.length;
      }
    }
    if (score > maxScore) {
      maxScore = score;
      bestMatch = item;
    }
  }

  if (bestMatch && maxScore > 0) {
    if (lang === 'ms' && bestMatch.responseMs) {
      return bestMatch.responseMs;
    }
    if (lang === 'en' && bestMatch.responseEn) {
      return bestMatch.responseEn;
    }
    return bestMatch.responseAr;
  }

  return null;
}
