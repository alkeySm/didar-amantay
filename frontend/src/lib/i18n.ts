import { GenreSlug, LangCode } from "./types";

export interface LanguageOption {
  code: LangCode;
  nativeName: string;
  kazakhName: string;
  rtl?: boolean;
}

export const LANGUAGES: LanguageOption[] = [
  { code: "kk", nativeName: "Qazaq (Қазақша)", kazakhName: "Қазақша" },
  { code: "en", nativeName: "English", kazakhName: "Ағылшынша" },
  { code: "fr", nativeName: "Français", kazakhName: "Французша" },
  { code: "de", nativeName: "Deutsch", kazakhName: "Немісше" },
  { code: "ru", nativeName: "Русский", kazakhName: "Орысша" },
  { code: "zh", nativeName: "中文", kazakhName: "Қытайша" },
  { code: "ko", nativeName: "한국어", kazakhName: "Кәрісше" },
  { code: "tr", nativeName: "Türkçe", kazakhName: "Түрікше" },
  { code: "ka", nativeName: "ქართული", kazakhName: "Грузинше" },
  { code: "mn", nativeName: "Монгол", kazakhName: "Моңғолша" },
  { code: "uz", nativeName: "Oʻzbekcha", kazakhName: "Өзбекше" },
  { code: "ar", nativeName: "العربية", kazakhName: "Арабша", rtl: true },
  { code: "sah", nativeName: "Саха тыла", kazakhName: "Сахаша" },
  { code: "ky", nativeName: "Кыргызча", kazakhName: "Қырғызша" },
];

export const GENRE_ORDER: GenreSlug[] = [
  "angime_novella",
  "povester",
  "romandar",
  "piesalar",
  "kosemsoz",
  "esseler",
  "olender",
  "kinoscenariyler",
  "korkem_filmder",
  "derekti_filmder",
  "telehabarlar",
];

export interface UIStrings {
  siteSubtitle: string;
  navBio: string;
  navBooks: string;
  navWorks: string;
  navNew: string;
  navQuotes: string;
  navGallery: string;
  navPodcast: string;
  navReviews: string;
  navContact: string;
  adminBtn: string;
  langLabel: string;

  heroBadge: string;
  heroTitle: string;
  heroRole: string;
  heroDesc: string;
  heroPrimaryBtn: string;
  heroSecondaryBtn: string;
  statBooks: string;
  statGenres: string;
  statLanguages: string;
  statAwards: string;

  bioHeading: string;
  bioSub: string;
  bioParagraph1: string;
  bioParagraph2: string;
  bioAwardsTitle: string;
  bioTimelineTitle: string;

  booksHeading: string;
  booksSub: string;
  filterAll: string;
  filterNew: string;
  filterLangAll: string;
  featuredLabel: string;
  newReleaseBadge: string;
  readExcerptBtn: string;
  openPdfBtn: string;
  closeBtn: string;
  pagesUnit: string;
  translatedInto: string;

  worksHeading: string;
  worksSub: string;
  readWorkBtn: string;

  quotesHeading: string;
  quotesSub: string;
  tabThoughts: string;
  tabMetaphors: string;

  galleryHeading: string;
  gallerySub: string;

  podcastHeading: string;
  podcastSub: string;
  podcastCta: string;
  podcastWatch: string;

  reviewsHeading: string;
  reviewsSub: string;
  reviewFormTitle: string;
  reviewNameLabel: string;
  reviewRoleLabel: string;
  reviewBookLabel: string;
  reviewContentLabel: string;
  reviewSubmitBtn: string;
  reviewSuccess: string;

  footerTagline: string;
  footerContactTitle: string;
  footerDomainsTitle: string;
  footerRights: string;
  genres: Record<GenreSlug, string>;
}

const KK_UI: UIStrings = {
  siteSubtitle: "Ресми әдеби портал",
  navBio: "Өмірбаяны",
  navBooks: "Кітаптар",
  navWorks: "Шығармашылығы",
  navNew: "Жаңа туындылары",
  navQuotes: "Ойлар мен метафора",
  navGallery: "Фотогалерея",
  navPodcast: "Teledidar.kz",
  navReviews: "Оқырман пікірі",
  navContact: "Байланыс",
  adminBtn: "Админ",
  langLabel: "Тіл",

  heroBadge: "ҚАЗАҚ ӘДЕБИЕТІ • ПОСТМОДЕРНИЗМ • КИНОДРАМАТУРГИЯ",
  heroTitle: "Дидар Амантай",
  heroRole: "Жазушы, кинодраматург, философ-публицист",
  heroDesc:
    "«Гүлдер мен кітаптар», «Пұт-кітап», «Майдақоңыр» және «Қарқаралы басында» кітаптарының авторы. Шығармалары әлемнің 14 тіліне аударылған заманауи қазақ прозасының көрнекті өкілі.",
  heroPrimaryBtn: "Кітаптарды оқу",
  heroSecondaryBtn: "Teledidar.kz подкаст",
  statBooks: "Негізгі кітап",
  statGenres: "Әдеби-кино жанр",
  statLanguages: "Аударма тілі",
  statAwards: "«Дарын» • «Тарлан»",

  bioHeading: "Өмірбаяны",
  bioSub: "Қарқаралыдан әлемдік әдеби кеңістікке дейінгі шығармашылық жол",
  bioParagraph1:
    "Дидар Амантай 1969 жылы 5 ақпанда Қарағанды облысы, Қарқаралы ауданында дүниеге келген. Әл-Фараби атындағы Қазақ ұлттық университетінің Философия және саясаттану факультетін, сондай-ақ Т. Жүргенов атындағы Өнер академиясының кинодраматургия бөлімін тәмамдаған.",
  bioParagraph2:
    "«Жас Алаш», «Заман Қазақстан» басылымдарында тілші, бөлім меңгерушісі, «Хабар» агенттігінде редактор, «Қазақфильм» ұлттық кинокомпаниясында бас редактор қызметтерін атқарған. Қазақ прозасына философиялық тереңдік пен модернистік көркемдік әкелген қаламгер.",
  bioAwardsTitle: "Мемлекеттік және тәуелсіз марапаттары",
  bioTimelineTitle: "Өмір мен шығармашылық белестері",

  booksHeading: "Кітаптары",
  booksSub: "Автордың басылып шыққан романдары, хикаяттары мен таңдамалы жинақтары",
  filterAll: "Барлық кітаптар",
  filterNew: "Жаңа туындылары",
  filterLangAll: "Барлық тілдер",
  featuredLabel: "ТАҢДАУЛЫ РОМАН",
  newReleaseBadge: "Жаңа туынды",
  readExcerptBtn: "Үзінді оқу",
  openPdfBtn: "PDF оқу",
  closeBtn: "Жабу",
  pagesUnit: "бет",
  translatedInto: "Аударылған тілдер:",

  worksHeading: "Шығармашылығы және 11 жанр",
  worksSub: "Әңгіме-новеллалардан бастап көркем фильмдер мен телехабарларға дейін",
  readWorkBtn: "Толығырақ",

  quotesHeading: "Жаңа туындылары • Ойлары мен Метафоралары",
  quotesSub: "Шығармалардан алынған философиялық ой-толғамдар мен көркем метафоралар",
  tabThoughts: "Ойлары",
  tabMetaphors: "Метафоралары",

  galleryHeading: "Фотогалерея",
  gallerySub: "Шығармашылық кештер, киностудия және мұрағат суреттері",

  podcastHeading: "Teledidar.kz — Подкаст және сұхбаттар",
  podcastSub: "Әдебиет, философия, кино өнері және заманауи ой туралы авторлық подкаст арнасы",
  podcastCta: "Teledidar.kz порталына өту",
  podcastWatch: "Тыңдау / Қарау",

  reviewsHeading: "Оқырман пікірі",
  reviewsSub: "Қаламгер шығармашылығы туралы әдебиеттанушылар мен оқырмандар лебізі",
  reviewFormTitle: "Өз пікіріңізді қалдырыңыз",
  reviewNameLabel: "Аты-жөніңіз",
  reviewRoleLabel: "Мәртебеңіз (оқырман, сыншы, студент...)",
  reviewBookLabel: "Кітап немесе шығарма атауы",
  reviewContentLabel: "Пікіріңіз",
  reviewSubmitBtn: "Пікір жіберу",
  reviewSuccess: "Рақмет! Сіздің пікіріңіз сәтті жарияланды.",

  footerTagline: "Қазақтың көрнекті жазушысы, кинодраматург Дидар Амантайдың ресми әдеби мұрағаты.",
  footerContactTitle: "Байланыс",
  footerDomainsTitle: "Ресми ресурстар",
  footerRights: "© 2026 Дидар Амантай. Барлық құқықтар қорғалған.",
  genres: {
    angime_novella: "Әңгіме-новеллалар",
    povester: "Повестер",
    romandar: "Романдар",
    piesalar: "Пьесалар",
    kosemsoz: "Көсемсөз",
    esseler: "Эсселер",
    olender: "Өлеңдер",
    kinoscenariyler: "Киносценарийлер",
    korkem_filmder: "Көркем фильмдері",
    derekti_filmder: "Деректі фильмдері",
    telehabarlar: "Телехабарлар",
  },
};

const EN_UI: UIStrings = {
  siteSubtitle: "Official Literary Portal",
  navBio: "Biography",
  navBooks: "Books",
  navWorks: "Works",
  navNew: "New Works",
  navQuotes: "Thoughts",
  navGallery: "Gallery",
  navPodcast: "Teledidar.kz",
  navReviews: "Reviews",
  navContact: "Contact",
  adminBtn: "Admin",
  langLabel: "Language",

  heroBadge: "KAZAKH LITERATURE • POSTMODERNISM • CINEMA",
  heroTitle: "Didar Amantay",
  heroRole: "Novelist, Screenwriter, Philosopher & Essayist",
  heroDesc:
    "Author of Flowers and Books, Put-Kitap, Maidakonyr, and On Top of Karkaraly Hills. A pioneering voice of modern Kazakh prose translated into 14 languages worldwide.",
  heroPrimaryBtn: "Explore Books",
  heroSecondaryBtn: "Teledidar.kz Podcast",
  statBooks: "Published Books",
  statGenres: "Creative Genres",
  statLanguages: "Languages",
  statAwards: "Daryn • Tarlan",

  bioHeading: "Biography",
  bioSub: "From Karkaraly mountains to international literary horizons",
  bioParagraph1:
    "Born on February 5, 1969 in Karkaraly, Karaganda Region, Didar Amantay graduated in Philosophy and Political Science from Al-Farabi Kazakh National University and in Screenwriting from the Zhurgenov Academy of Arts.",
  bioParagraph2:
    "He worked as an editor and host at Khabar Agency and served as Chief Editor of Kazakhfilm National Film Studio, introducing philosophical depth and postmodernist aesthetics to Kazakh prose and cinema.",
  bioAwardsTitle: "Awards & Honors",
  bioTimelineTitle: "Milestones",

  booksHeading: "Books & Editions",
  booksSub: "Published novels, novellas, short story collections, and collected works",
  filterAll: "All Books",
  filterNew: "New Releases",
  filterLangAll: "All Languages",
  featuredLabel: "FLAGSHIP NOVEL",
  newReleaseBadge: "New Release",
  readExcerptBtn: "Read Excerpt",
  openPdfBtn: "Open PDF",
  closeBtn: "Close",
  pagesUnit: "pages",
  translatedInto: "Translated into:",

  worksHeading: "Creative Works Across 11 Genres",
  worksSub: "From short stories and novels to plays, essays, screenplays, films, and broadcasts",
  readWorkBtn: "Read Details",

  quotesHeading: "New Works • Thoughts & Metaphors",
  quotesSub: "Philosophical aphorisms and literary metaphors from the author's writings",
  tabThoughts: "Thoughts",
  tabMetaphors: "Metaphors",

  galleryHeading: "Photo Gallery",
  gallerySub: "Archival photographs, literary evenings, and studio frames",

  podcastHeading: "Teledidar.kz — Podcast & Dialogues",
  podcastSub: "Author's intellectual video & audio channel on literature, cinema, and philosophy",
  podcastCta: "Visit Teledidar.kz",
  podcastWatch: "Watch / Listen",

  reviewsHeading: "Reader & Critic Reviews",
  reviewsSub: "Reflections from literary critics, poets, and readers worldwide",
  reviewFormTitle: "Leave a Reader Review",
  reviewNameLabel: "Your Name",
  reviewRoleLabel: "Role (Reader, Critic, Scholar...)",
  reviewBookLabel: "Book or Work Title",
  reviewContentLabel: "Your Review",
  reviewSubmitBtn: "Submit Review",
  reviewSuccess: "Thank you! Your review has been published.",

  footerTagline: "Official literary archive and portal of Kazakh writer and screenwriter Didar Amantay.",
  footerContactTitle: "Contacts",
  footerDomainsTitle: "Official Domains",
  footerRights: "© 2026 Didar Amantay. All rights reserved.",
  genres: {
    angime_novella: "Short Stories & Novellas",
    povester: "Novellas (Povest)",
    romandar: "Novels",
    piesalar: "Plays",
    kosemsoz: "Publicism",
    esseler: "Essays",
    olender: "Poetry",
    kinoscenariyler: "Screenplays",
    korkem_filmder: "Feature Films",
    derekti_filmder: "Documentary Films",
    telehabarlar: "TV Programs",
  },
};

const RU_UI: UIStrings = {
  siteSubtitle: "Официальный литературный портал",
  navBio: "Биография",
  navBooks: "Книги",
  navWorks: "Творчество",
  navNew: "Новые работы",
  navQuotes: "Мысли и метафоры",
  navGallery: "Фотогалерея",
  navPodcast: "Teledidar.kz",
  navReviews: "Отзывы",
  navContact: "Контакты",
  adminBtn: "Админ",
  langLabel: "Язык",

  heroBadge: "КАЗАХСКАЯ ЛИТЕРАТУРА • ПОСТМОДЕРНИЗМ • КИНОДРАМАТУРГИЯ",
  heroTitle: "Дидар Амантай",
  heroRole: "Писатель, кинодраматург, философ-публицист",
  heroDesc:
    "Автор романов и сборников «Цветы и книги», «Пұт-кітап», «Майдақоңыр», «На вершине Каркаралы». Выдающийся представитель современной казахской прозы, переведённый на 14 языков мира.",
  heroPrimaryBtn: "Читать книги",
  heroSecondaryBtn: "Подкаст Teledidar.kz",
  statBooks: "Книги и тома",
  statGenres: "Жанров творчества",
  statLanguages: "Языков перевода",
  statAwards: "«Дарын» • «Тарлан»",

  bioHeading: "Биография",
  bioSub: "Творческий путь от Каркаралинских гор к мировой литературе",
  bioParagraph1:
    "Дидар Амантай родился 5 февраля 1969 года в Каркаралинском районе Карагандинской области. Окончил факультет философии и политологии КазНУ им. аль-Фараби и отделение кинодраматургии Академии искусств им. Т. Жургенова.",
  bioParagraph2:
    "Работал редактором и ведущим на телеканале «Хабар», главным редактором национальной кинокомпании «Казахфильм». Основоположник постмодернистской и философской поэтики в современной казахской прозе.",
  bioAwardsTitle: "Премии и награды",
  bioTimelineTitle: "Вехи биографии",

  booksHeading: "Книги и издания",
  booksSub: "Романы, повести, сборники новелл и собрания сочинений",
  filterAll: "Все книги",
  filterNew: "Новые произведения",
  filterLangAll: "Все языки",
  featuredLabel: "ГЛАВНЫЙ РОМАН",
  newReleaseBadge: "Новое издание",
  readExcerptBtn: "Читать отрывок",
  openPdfBtn: "Открыть PDF",
  closeBtn: "Закрыть",
  pagesUnit: "стр.",
  translatedInto: "Переведено на языки:",

  worksHeading: "Творчество: 11 жанров",
  worksSub: "Рассказы, повести, романы, пьесы, эссе, стихи, киносценарии и фильмы",
  readWorkBtn: "Подробнее",

  quotesHeading: "Новые произведения • Мысли и Метафоры",
  quotesSub: "Философские размышления и художественные метафоры автора",
  tabThoughts: "Мысли (Ойлары)",
  tabMetaphors: "Метафоры",

  galleryHeading: "Фотогалерея",
  gallerySub: "Архивные фотографии, творческие встречи и кадры киностудии",

  podcastHeading: "Teledidar.kz — Подкаст и беседы",
  podcastSub: "Авторский видео- и аудиоподкаст о литературе, философии и искусстве кино",
  podcastCta: "Перейти на Teledidar.kz",
  podcastWatch: "Смотреть / Слушать",

  reviewsHeading: "Отзывы читателей и критиков",
  reviewsSub: "Мнения литературоведов, поэтов и читателей о книгах автора",
  reviewFormTitle: "Оставить отзыв",
  reviewNameLabel: "Ваше имя",
  reviewRoleLabel: "Статус (читатель, критик, студент...)",
  reviewBookLabel: "Название книги",
  reviewContentLabel: "Текст отзыва",
  reviewSubmitBtn: "Отправить отзыв",
  reviewSuccess: "Спасибо! Ваш отзыв успешно опубликован.",

  footerTagline: "Официальный литературный портал казахского писателя и кинодраматурга Дидара Амантая.",
  footerContactTitle: "Контакты",
  footerDomainsTitle: "Официальные домены",
  footerRights: "© 2026 Дидар Амантай. Все права защищены.",
  genres: {
    angime_novella: "Рассказы и новеллы",
    povester: "Повести",
    romandar: "Романы",
    piesalar: "Пьесы",
    kosemsoz: "Публицистика",
    esseler: "Эссе",
    olender: "Стихи",
    kinoscenariyler: "Киносценарии",
    korkem_filmder: "Художественные фильмы",
    derekti_filmder: "Документальные фильмы",
    telehabarlar: "Телепередачи",
  },
};

const PARTIAL_TRANSLATIONS: Partial<Record<LangCode, Partial<UIStrings>>> = {
  fr: {
    siteSubtitle: "Portail littéraire officiel",
    navBio: "Biographie",
    navBooks: "Livres",
    navWorks: "Œuvres",
    navPodcast: "Teledidar.kz",
    navReviews: "Critiques",
    heroTitle: "Didar Amantay",
    heroRole: "Écrivain, scénariste et philosophe kazakh",
    heroPrimaryBtn: "Découvrir les livres",
    booksHeading: "Livres et Éditions",
    worksHeading: "Œuvres dans 11 genres",
    readExcerptBtn: "Lire un extrait",
  },
  de: {
    siteSubtitle: "Offizielles Literaturportal",
    navBio: "Biografie",
    navBooks: "Bücher",
    navWorks: "Werke",
    navReviews: "Rezensionen",
    heroTitle: "Didar Amantay",
    heroRole: "Kasachischer Schriftsteller, Drehbuchautor und Philosoph",
    heroPrimaryBtn: "Bücher entdecken",
    booksHeading: "Bücher & Ausgaben",
    readExcerptBtn: "Auszug lesen",
  },
  tr: {
    siteSubtitle: "Resmi Edebiyat Portalı",
    navBio: "Biyografi",
    navBooks: "Kitaplar",
    navWorks: "Eserler",
    navQuotes: "Düşünceler",
    navReviews: "Okur Yorumları",
    heroTitle: "Didar Amantay",
    heroRole: "Kazak Yazar, Senarist ve Düşünür",
    heroPrimaryBtn: "Kitapları Keşfet",
    booksHeading: "Kitaplar",
    readExcerptBtn: "Bölüm Oku",
  },
  zh: {
    siteSubtitle: "官方文学门户",
    navBio: "生平简介",
    navBooks: "著作书籍",
    navWorks: "文学创作",
    navReviews: "读者评论",
    heroTitle: "迪达尔·阿曼泰 (Didar Amantay)",
    heroRole: "哈萨克斯坦著名作家、电影剧作家与思想家",
    heroPrimaryBtn: "阅读著作",
    booksHeading: "出版书籍",
    readExcerptBtn: "阅读节选",
  },
  ko: {
    siteSubtitle: "공식 문학 포털",
    navBio: "작가 소개",
    navBooks: "저서",
    navWorks: "작품 세계",
    navReviews: "독자 서평",
    heroTitle: "디다르 아만타이 (Didar Amantay)",
    heroRole: "카자흐스탄 현대 문학 작가 및 시나리오 작가",
    heroPrimaryBtn: "도서 살펴보기",
    booksHeading: "출간 도서",
    readExcerptBtn: "발췌 읽기",
  },
  ar: {
    siteSubtitle: "البوابة الأدبية الرسمية",
    navBio: "السيرة الذاتية",
    navBooks: "الكتب",
    navWorks: "الأعمال الأدبية",
    navQuotes: "الأفكار والاستعارات",
    navReviews: "آراء القراء",
    heroTitle: "ديدار أمانتاي",
    heroRole: "كاتب وروائي وسيناريست ومفكر كازاخستاني",
    heroPrimaryBtn: "استكشف الكتب",
    booksHeading: "الكتب والإصدارات",
    readExcerptBtn: "اقرأ مقتطفاً",
  },
  mn: {
    siteSubtitle: "Албан ёсны утга зохиолын портал",
    navBio: "Намтар",
    navBooks: "Номууд",
    navWorks: "Бүтээлүүд",
    heroTitle: "Дидар Амантай",
    heroRole: "Казахын нэрт зохиолч, кино зохиолч, гүн ухаантан",
    heroPrimaryBtn: "Ном унших",
    booksHeading: "Хэвлэгдсэн номууд",
  },
  uz: {
    siteSubtitle: "Rasmiy adabiy portal",
    navBio: "Tarjimai hol",
    navBooks: "Kitoblar",
    navWorks: "Asarlar",
    navReviews: "Kitobxon fikrlari",
    heroTitle: "Didar Amantay",
    heroRole: "Qozoq yozuvchisi, kinodramaturg va mutafakkir",
    heroPrimaryBtn: "Kitoblarni oʻqish",
    booksHeading: "Nashr etilgan kitoblar",
  },
  ky: {
    siteSubtitle: "Расмий адабий портал",
    navBio: "Өмүр баяны",
    navBooks: "Китептер",
    navWorks: "Чыгармачылыгы",
    navReviews: "Окурман пикири",
    heroTitle: "Дидар Амантай",
    heroRole: "Казак жазуучусу, кинодраматург, философ",
    heroPrimaryBtn: "Китептерди окуу",
    booksHeading: "Китептер",
  },
  ka: {
    siteSubtitle: "ოფიციალური ლიტერატურული პორტალი",
    navBio: "ბიოგრაფია",
    navBooks: "წიგნები",
    navWorks: "შემოქმედება",
    heroTitle: "დიდარ ამანთაი",
    heroRole: "ყაზახი მწერალი, კინოდრამატურგი და მოაზროვნე",
    heroPrimaryBtn: "წიგნების ნახვა",
  },
  sah: {
    siteSubtitle: "Официальнай литературнай портал",
    navBio: "Олоҕун олуктара",
    navBooks: "Кинигэлэр",
    navWorks: "Айымньылара",
    heroTitle: "Дидар Амантай",
    heroRole: "Казах биллиилээх суруйааччыта, киинэ драматура",
    heroPrimaryBtn: "Кинигэлэри көрүү",
  },
};

export function getUIStrings(lang: LangCode): UIStrings {
  if (lang === "kk") return KK_UI;
  if (lang === "en") return EN_UI;
  if (lang === "ru") return RU_UI;
  const base = EN_UI;
  const overrides = PARTIAL_TRANSLATIONS[lang] || {};
  return { ...base, ...overrides, genres: { ...base.genres, ...(overrides.genres || {}) } };
}

export function getLanguageMeta(code: LangCode): LanguageOption {
  return LANGUAGES.find((l) => l.code === code) || LANGUAGES[0];
}

export function localizeRecord<T extends Record<string, any>>(
  item: T,
  fieldBase: string,
  lang: LangCode
): string {
  const fromTranslations = item.translations?.[lang]?.[fieldBase];
  if (typeof fromTranslations === "string" && fromTranslations.trim()) {
    return fromTranslations;
  }
  const directKey = `${fieldBase}_${lang}`;
  if (typeof item[directKey] === "string" && item[directKey].trim()) {
    return item[directKey];
  }
  if (lang !== "kk") {
    const fallbackEn = item[`${fieldBase}_en`];
    if (lang !== "ru" && typeof fallbackEn === "string" && fallbackEn.trim()) {
      return fallbackEn;
    }
    const fallbackRu = item[`${fieldBase}_ru`];
    if (typeof fallbackRu === "string" && fallbackRu.trim()) {
      return fallbackRu;
    }
  }
  const kkVal = item[`${fieldBase}_kk`];
  if (typeof kkVal === "string" && kkVal.trim()) {
    return kkVal;
  }
  return item[`${fieldBase}_en`] || item[`${fieldBase}_ru`] || "";
}
