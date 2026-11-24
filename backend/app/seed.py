"""Idempotent database seed data for Didar Amantay literary portal."""

import os
from sqlalchemy.orm import Session

from .auth import hash_password
from .models import (
    AdminUser,
    Book,
    GalleryItem,
    PodcastEpisode,
    Quote,
    ReaderReview,
    Work,
)

ALL_14_LANGUAGES = [
    "kk", "en", "fr", "de", "ru", "zh", "ko",
    "tr", "ka", "mn", "uz", "ar", "sah", "ky",
]


def seed_database(db: Session) -> None:
    """Populate initial admin account and authentic literary records if tables are empty."""
    admin_username = os.getenv("ADMIN_USERNAME", "admin")
    admin_password = os.getenv("ADMIN_PASSWORD", "didar2026")

    if not db.query(AdminUser).filter(AdminUser.username == admin_username).first():
        db.add(AdminUser(username=admin_username, password_hash=hash_password(admin_password)))

    if db.query(Book).count() == 0:
        books_data = [
            Book(
                slug="gulder-men-kitaptar",
                year=2003,
                publisher="Атамұра / Қарқаралы басылымы",
                isbn="9965-05-742-1",
                pages=320,
                genre="romandar",
                cover_color="#1D352E",
                is_featured=True,
                is_new=False,
                available_languages=["kk", "ru", "en", "fr", "tr", "mn", "de", "ar", "zh", "ko"],
                title_kk="Гүлдер мен кітаптар",
                subtitle_kk="Қазақ әдебиетіндегі тұңғыш постмодерндік роман",
                description_kk=(
                    "Қазіргі қазақ прозасының бетбұрысты туындысы. Романда бас кейіпкер Әлішердің "
                    "рухани ізденісі, Қарқаралы тауларынан басталатын таным жолы, түркі мифологиясы мен "
                    "әлемдік әдебиеттің үндестігі терең философиялық иірімдермен өрілген. Кітап ғұмыры қысқа "
                    "«гүл» мен мәңгілік рухты сақтайтын «кітап» арасындағы нәзік метафораға құрылған."
                ),
                excerpt_kk=(
                    "«Шығарма – кітаби кеңістікте қозғалыссыз қалатын заттық фрагмент болса, "
                    "мәтін – әрқашан қозғалыста болатын, әдіснамалық әрекеттердің алаңы. "
                    "Шығарма да, мәтін де автордың қаншама күндер жалғыздықта көз майын тауысып жазған еңбегінің жемісі. "
                    "Алайда, оның ғұмыры қысқа гүл болатыны немесе өміршең кітап болатыны тарихтың еншісінде.\n\n"
                    "Жер бетін тұман басты. Содан кейін аспан салбырап төмен түскен. "
                    "Жорғалап келе жатып ол жердің иісін таныды, кітаптың иісі шығады. "
                    "Кәдімгі шаң-топырақ басқан сары ала байырғы қағаздың таңсық оқшау иісі тап иегінің астынан аңқып тұр...»"
                ),
                title_ru="Цветы и книги",
                description_ru=(
                    "Знаковый первый постмодернистский роман в современной казахской литературе. "
                    "Философское повествование о духовном поиске главного героя Алишера, диалоге культур, "
                    "тюркской мифологии и бессмертии художественного текста."
                ),
                title_en="Flowers and Books",
                description_en=(
                    "Widely recognized as the first postmodernist novel in Kazakh literature. "
                    "Follows Alisher's intellectual and spiritual odyssey across urban modernity, "
                    "Turkic mythology, and the eternal dialogue between fleeting flowers and enduring books."
                ),
                translations={
                    "fr": {"title": "Des fleurs et des livres", "description": "Premier roman postmoderne de la littérature kazakhe contemporaine."},
                    "tr": {"title": "Çiçekler ve Kitaplar", "description": "Çağdaş Kazak edebiyatının ilk postmodern romanı."},
                    "de": {"title": "Blumen und Bücher", "description": "Der erste postmoderne Roman der modernen kasachischen Literatur."},
                    "mn": {"title": "Цэцэгс ба номнууд", "description": "Орчин үеийн казах уран зохиолын анхны постмодерн роман."},
                },
            ),
            Book(
                slug="put-kitap",
                year=2024,
                publisher="«Дәуір» баспасы (Алматы)",
                isbn="978-601-217-845-3",
                pages=288,
                genre="povester",
                cover_color="#3E2723",
                is_featured=False,
                is_new=True,
                available_languages=["kk", "ru", "en"],
                title_kk="Пұт-кітап",
                subtitle_kk="Жаңа хикаяттар мен философиялық проза жинағы",
                description_kk=(
                    "2024 жылы жарық көрген жаңа прозалық жинақ. Автор қағазға түскен, тасқа басылған ел "
                    "тағдырына, заманауи өркениет пен адамзаттың рухани құндылықтарына жаңаша пәлсапалық көзқарас танытады."
                ),
                excerpt_kk=(
                    "«Тасқа қашалған жазу уақытқа бағынбайды, бірақ адам жадындағы кітап ғана нағыз өлмейтін ескерткіш. "
                    "Әр дәуірдің өз табынатын пұты бар — ал ойшылдың пұты да, құтқарушысы да тек Сөз.»"
                ),
                title_ru="Книга-идол (Пұт-кітап)",
                description_ru="Новый сборник повестей и философской прозы (2024, издательство «Дәуір»), осмысляющий судьбу слова, камня и человеческой памяти.",
                title_en="Idol-Book (Put-Kitap)",
                description_en="A 2024 collection of novellas and philosophical prose examining memory, stone inscriptions, and modern cultural values.",
                translations={},
            ),
            Book(
                slug="maidaqonyr",
                year=2023,
                publisher="«Орхон» баспасы (Алматы)",
                isbn="978-601-754-312-9",
                pages=244,
                genre="angime_novella",
                cover_color="#4A3728",
                is_featured=False,
                is_new=True,
                available_languages=["kk", "ru", "en", "tr"],
                title_kk="Майдақоңыр",
                subtitle_kk="Он жеті новелла кітабы (1991–2022)",
                description_kk=(
                    "Жазушының 1991–2022 жылдар аралығында жазған таңдаулы он жеті новелласынан құралған кітап. "
                    "«Төлеутай ақсақалдың немересі» атты прологпен басталып, «Бабалар мен ұрпақтар» эпилогымен түйінделеді."
                ),
                excerpt_kk=(
                    "«Күздің майдақоңыр желі даланың тынысын ашқанда, ескі ауылдың әрбір шаңырағы өткен ғасырдың "
                    "үзілмеген әуенін қайта шырқайтындай көрінетін...»"
                ),
                title_ru="Майдаконыр (Семнадцать новелл)",
                description_ru="Избранные семнадцать новелл, написанных с 1991 по 2022 год. Книга обрамлена прологом «Внук аксакала Толеутая» и эпилогом «Предки и потомки».",
                title_en="Maidakonyr: Book of Seventeen Novellas",
                description_en="Selected seventeen novellas written between 1991 and 2022, framed by a meditative prologue and epilogue on generational memory.",
                translations={},
            ),
            Book(
                slug="karkaraly-basynda",
                year=2010,
                publisher="«Жібек жолы» баспа үйі",
                isbn="978-601-294-018-4",
                pages=412,
                genre="romandar",
                cover_color="#233142",
                is_featured=False,
                is_new=False,
                available_languages=["kk", "ru", "en", "fr", "tr", "mn", "uz", "ky"],
                title_kk="Қарқаралы басында",
                subtitle_kk="Бес томдық шығармалар жинағы (1-том)",
                description_kk=(
                    "Автордың бес томдық таңдамалы шығармалар жинағының алғашқы томы. "
                    "Романдар, таңдаулы повестер мен новеллалар, сондай-ақ туған өлке — Қарқаралы табиғаты мен тарихи жадына арналған толғамдар енген."
                ),
                excerpt_kk=(
                    "«Қарқаралы басына бұлт үйірілгенде, бүкіл Сарыарқаның ғасырлық сыры қарағай басындағы самалмен сырласып тұрады.»"
                ),
                title_ru="На вершине Каркаралы",
                description_ru="Первый том пятитомного собрания сочинений, включающий роман «Цветы и книги» и избранную прозу.",
                title_en="On Top of Karkaraly Hills",
                description_en="First volume of the five-volume collected works, featuring his landmark novel and lyrical prose inspired by Karkaraly.",
                translations={"fr": {"title": "Au sommet de Karkaraly"}, "tr": {"title": "Karkaralı Tepesinde"}},
            ),
            Book(
                slug="kuzgi-randevu",
                year=2005,
                publisher="«Елорда» баспасы",
                isbn="9965-06-412-5",
                pages=216,
                genre="povester",
                cover_color="#5B3A29",
                is_featured=False,
                is_new=False,
                available_languages=["kk", "ru", "en", "ka"],
                title_kk="Күзгі рандеву",
                subtitle_kk="Повесть және әңгімелер",
                description_kk=(
                    "Қалалық зиялы орта, сағыныш, жалғыздық пен уақыт ағымы туралы психологизмге толы повесть-әңгімелер жинағы. "
                    "Шығармашылық еркіндік пен ішкі монолог өнерінің айқын үлгісі."
                ),
                excerpt_kk=(
                    "«Алматының күзі қашанда сары жапырақтардың арасындағы үнсіз кездесуден басталады.»"
                ),
                title_ru="Осеннее рандеву",
                description_ru="Сборник повестей и рассказов об интеллектуальной среде, одиночестве и тонких психологических переживаниях.",
                title_en="Autumn Rendezvous",
                description_en="A collection of novellas and stories exploring urban solitude, longing, and modern intellectual consciousness.",
                translations={},
            ),
            Book(
                slug="kasterle-meni",
                year=2000,
                publisher="«Өлке» баспасы",
                isbn="9965-451-89-3",
                pages=264,
                genre="romandar",
                cover_color="#3B2F4A",
                is_featured=False,
                is_new=False,
                available_languages=["kk", "ru", "en"],
                title_kk="Қастерле мені",
                subtitle_kk="Романдар, повестер, әңгімелер, эсселер",
                description_kk=(
                    "Тәуелсіздіктің алғашқы онжылдығында жазылған үздік прозалық және эссеистикалық еңбектері топтастырылған маңызды жинақ. "
                    "«Мен сізді сағынып жүрмін» повесі мен «Ібіліспен сүйісу» туындысы осы кезеңнің жарқын жемісі."
                ),
                excerpt_kk=(
                    "«Сүйіспеншілік пен рухани адалдық — адамзат өркениетінің ең соңғы тірегі.»"
                ),
                title_ru="Береги меня (Қастерле мені)",
                description_ru="Сборник романов, повестей, рассказов и эссе первого десятилетия независимости Казахстана.",
                title_en="Cherish Me",
                description_en="A foundational 2000 prose collection bringing together novels, novellas, short stories, and philosophical essays.",
                translations={},
            ),
            Book(
                slug="post-scriptum",
                year=1996,
                publisher="«Жалын» баспасы",
                isbn="5-610-01245-7",
                pages=160,
                genre="angime_novella",
                cover_color="#2A2E37",
                is_featured=False,
                is_new=False,
                available_languages=["kk", "ru", "en", "sah", "ky"],
                title_kk="Post Scriptum",
                subtitle_kk="Алғашқы әңгімелер жинағы",
                description_kk=(
                    "Дидар Амантайдың қазақ әдебиетіне жаңа серпін, тың форма мен модернистік эстетика алып келген тұңғыш кітабы. "
                    "Бұл жинақ 90-жылдардағы жас қаламгерлер толқынының манифесі іспеттес қабылданды."
                ),
                excerpt_kk=(
                    "«Хат соңында жазылатын Post Scriptum кейде бүкіл хаттың өзінен де маңыздырақ болып шығады.»"
                ),
                title_ru="Post Scriptum",
                description_ru="Дебютная книга рассказов (1996), принесшая в казахскую прозу эстетику европейского модернизма и фрагментарного письма.",
                title_en="Post Scriptum",
                description_en="Debut 1996 short story collection that signaled a modernist turn in post-Soviet Kazakh prose.",
                translations={},
            ),
        ]
        db.add_all(books_data)

    if db.query(Work).count() == 0:
        works_data = [
            # 1. Әңгіме-новеллалар
            Work(
                genre="angime_novella", year=2018, is_new=False,
                available_languages=["kk", "ru", "en"],
                title_kk="Букинист. Кітап дүкені",
                summary_kk="Ескі кітаптар дүкені арқылы адам жанының қатпарларын ашатын психологиялық новелла.",
                content_kk="Ескі кітап дүкенінің сөрелерінде шаң басқан ғасырлар үні сақталған. Новелла кейіпкері сирек кездесетін басылымды іздей жүріп, өз өмірінің жоғалған беттерін қайта табады.",
                title_ru="Букинист. Книжный магазин",
                summary_ru="Психологическая новелла о поисках редких изданий и собственной памяти.",
                title_en="The Bookseller. Bookshop",
                summary_en="A psychological novella set inside an antique bookstore exploring memory and lost manuscripts.",
            ),
            Work(
                genre="angime_novella", year=2015, is_new=False,
                available_languages=["kk", "ru", "fr"],
                title_kk="Тоты құс түсті көбелек",
                summary_kk="Болмыстың өткінші сұлулығы мен түс әлемін бейнелейтін модернистік әңгіме.",
                content_kk="Таңғы шықта дірілдеген қанаттай нәзік тағдырлар мен метафоралық бейнелер арқылы уақыттың шарттылығы суреттеледі.",
                title_ru="Бабочка цвета попугая",
                summary_ru="Модернистский рассказ о хрупкости бытия и метафоре времени.",
                title_en="The Parrot-Colored Butterfly",
                summary_en="A modernist short story capturing fleeting beauty and dreamlike perception.",
            ),
            Work(
                genre="angime_novella", year=2022, is_new=True,
                available_languages=["kk", "ru"],
                title_kk="Төлеутай ақсақалдың немересі",
                summary_kk="«Майдақоңыр» циклінің прологы — ата мен немере сабақтастығы туралы хикая.",
                content_kk="Ұрпақтар арасындағы көрінбейтін рухани арқау мен туған жерге деген мәңгілік сағыныш баяндалады.",
                title_ru="Внук аксакала Толеутая",
                summary_ru="Пролог цикла «Майдаконыр» о преемственности поколений.",
                title_en="Grandson of Elder Toleutai",
                summary_en="Prologue to Maidakonyr reflecting on generational lineage and ancestral memory.",
            ),
            # 2. Повестер
            Work(
                genre="povester", year=2000, is_new=False,
                available_languages=["kk", "ru", "en", "tr"],
                title_kk="Мен сізді сағынып жүрмін",
                summary_kk="Нәзік лиризм мен экзистенциалды сағынышқа құрылған танымал повесть.",
                content_kk="Қала шуы мен ішкі тыныштықтың қақтығысында кейіпкер рухани тазалық пен махаббат мәнін іздейді.",
                title_ru="Я скучаю по Вам",
                summary_ru="Лирическая повесть об экзистенциальной тоске и духовной чистоте.",
                title_en="I Miss You",
                summary_en="A lyrical novella woven from quiet urban solitude and philosophical longing.",
            ),
            Work(
                genre="povester", year=2002, is_new=False,
                available_languages=["kk", "ru"],
                title_kk="Ібіліспен сүйісу",
                summary_kk="Адам болмысындағы жақсылық пен азғырудың психологиялық тартысы туралы повесть.",
                content_kk="Философиялық драма мен ішкі монолог формасында жазылған, ар-ождан мен ерік бостандығын сынайтын туынды.",
                title_ru="Поцелуй с дьяволом",
                summary_ru="Философская повесть о внутреннем выборе, искушении и свободе воли.",
                title_en="Kissing with the Devil",
                summary_en="A psychological novella confronting temptation, conscience, and moral freedom.",
            ),
            # 3. Романдар
            Work(
                genre="romandar", year=2003, is_new=False,
                available_languages=ALL_14_LANGUAGES,
                title_kk="Гүлдер мен кітаптар",
                summary_kk="Қазақ әдебиетіндегі тұңғыш постмодерндік роман. Қоғам, өнер және мәңгілік мәтін туралы.",
                content_kk="Әлішердің рухани эволюциясы арқылы қазіргі дәуір мен ежелгі түркі дүниетанымы тоғысады.",
                title_ru="Цветы и книги",
                summary_ru="Первый постмодернистский роман в казахской литературе.",
                title_en="Flowers and Books",
                summary_en="Landmark postmodernist novel of contemporary Kazakh literature.",
            ),
            Work(
                genre="romandar", year=2024, is_new=True,
                available_languages=["kk", "ru"],
                title_kk="Пұт-кітап (роман-хикаяттар)",
                summary_kk="Тарих пен бүгіннің тоғысындағы рухани таным туындысы (2024).",
                content_kk="Адамзаттың тасқа және қағазға басқан тағдыры мен жаңа дәуірдегі ой еркіндігін зерттейтін проза.",
                title_ru="Книга-идол",
                summary_ru="Проза 2024 года об истории, символах и духовном наследии.",
                title_en="Idol-Book",
                summary_en="2024 philosophical prose work reflecting on heritage, memory, and cultural symbols.",
            ),
            # 4. Пьесалар
            Work(
                genre="piesalar", year=2014, is_new=False,
                available_languages=["kk", "ru"],
                title_kk="Баянжүрек – Тілеуке",
                summary_kk="Тарихи сана мен тұлға трагедиясын арқау еткен театр сахнасына арналған драмалық пьеса.",
                content_kk="Ұлттық код, елдік мұрат және тарихи жауапкершілік сахналық диалогтар арқылы терең ашылады.",
                title_ru="Баянжурек – Тлеуке",
                summary_ru="Драматическая пьеса для театральной сцены о национальной памяти и долге.",
                title_en="Bayanzhurek – Tleuke",
                summary_en="A theatrical drama exploring historical responsibility and cultural identity.",
            ),
            # 5. Көсемсөз
            Work(
                genre="kosemsoz", year=2023, is_new=True,
                available_languages=["kk", "ru", "en"],
                title_kk="Ұлттық рух және заманауи мәдениет",
                summary_kk="Қазақ зиялыларының рөлі, тіл болашағы және жаһандану дәуіріндегі мәдени бірегейлік туралы көсемсөз.",
                content_kk="Қоғамдағы серпіліс ең алдымен ой бостандығы мен кітап оқу мәдениетінен басталады.",
                title_ru="Национальный дух и современная культура",
                summary_ru="Публицистика о роли интеллигенции, языке и культуре чтения.",
                title_en="National Spirit and Modern Culture",
                summary_en="Publicist reflections on cultural identity, language, and intellectual renewal.",
            ),
            # 6. Эсселер
            Work(
                genre="esseler", year=2021, is_new=False,
                available_languages=["kk", "ru", "en", "fr"],
                title_kk="Әлем – текст",
                summary_kk="Әдебиет пен философияның шекарасын зерттейтін бағдарламалық эссе.",
                content_kk="«Философия – әдебиеттен, әдебиет – философиядан басталады». Бүкіл дүние — үздіксіз оқылатын, қайта жазылатын ұлы Мәтін.",
                title_ru="Мир – текст",
                summary_ru="Философское эссе о взаимосвязи литературы, философии и бытия.",
                title_en="The World as Text",
                summary_en="Philosophical essay exploring how literature and philosophy mirror one another.",
            ),
            # 7. Өлеңдер
            Work(
                genre="olender", year=2019, is_new=False,
                available_languages=["kk", "ru"],
                title_kk="Қарқаралы түндері (лирикалық толғаулар)",
                summary_kk="Туған өлке аспаны, уақыт және жалғыз жолаушы көңіл-күйі туралы өлеңдер топтамасы.",
                content_kk="Қарағайлы таудың баурайында, жұлдызды аспан астында туған лирикалық жырлар.",
                title_ru="Ночи Каркаралы (стихотворения)",
                summary_ru="Лирические стихотворения о родной земле, небе и размышлениях путника.",
                title_en="Karkaraly Nights (Poems)",
                summary_en="Collection of lyrical poems inspired by the pine forests and night skies of Karkaraly.",
            ),
            # 8. Киносценарийлер
            Work(
                genre="kinoscenariyler", year=2009, is_new=False,
                available_languages=["kk", "ru", "en"],
                title_kk="ФЭФ (Философия-экономика факультеті) киносценарийі",
                summary_kk="«Гәкку» көркем фильмінің негізі болған студенттік жылдар мен рухани ізденіс туралы сценарий.",
                content_kk="Тәуелсіздік таңындағы жас философтар буынының өмірі, махаббаты мен ой-толғаныстары.",
                title_ru="Киносценарий «ФЭФ»",
                summary_ru="Киносценарий о студентах философского факультета на заре независимости.",
                title_en="FEF (Screenplay)",
                summary_en="Original feature screenplay capturing the intellectual youth of 1990s Almaty.",
            ),
            # 9. Көркем фильмдері
            Work(
                genre="korkem_filmder", year=2011, is_new=False,
                available_languages=["kk", "ru", "en"],
                title_kk="Гәкку («ФЭФ»)",
                summary_kk="Сценарий авторы Дидар Амантай болған көркем фильм. 90-жылдардағы жастар болмысы.",
                content_kk="«Қазақфильм» киностудиясының аясында түсірілген көркем туынды.",
                title_ru="Гакку («ФЭФ»)",
                summary_ru="Художественный фильм по сценарию Дидара Амантая.",
                title_en="Gakku (Feature Film)",
                summary_en="Feature film written by Didar Amantay portraying contemporary philosophical youth.",
            ),
            Work(
                genre="korkem_filmder", year=2013, is_new=False,
                available_languages=["kk", "ru"],
                title_kk="А-ға оралу / Қарсы бақылау",
                summary_kk="Көркем фильм және телевизиялық сериал сценарийі.",
                content_kk="Қалалық драма мен тұлғааралық күрделі тағдырларды бейнелейтін экрандық туындылар.",
                title_ru="Возвращение в «А» / Контрнаблюдение",
                summary_ru="Художественный фильм и телесериал по сценарию Дидара Амантая.",
                title_en="Return to 'A' / Counter Control",
                summary_en="Feature film and television drama series written for Kazakh cinema.",
            ),
            # 10. Деректі фильмдері
            Work(
                genre="derekti_filmder", year=2012, is_new=False,
                available_languages=["kk", "ru", "en"],
                title_kk="Ұлт тұлғалары: Нұрғиса Тілендиев, Мұхтар Мағауин, Қасым Аманжолов",
                summary_kk="Қазақ руханиятының алыптарына арналған деректі фильмдер циклі (сондай-ақ Әлжаппар Әбішев, Жүсіпбек Елебеков).",
                content_kk="Дидар Амантайдың сценарийімен түсірілген деректі фильмдерде қазақ өнері мен әдебиетінің классиктерінің өмірі мен мұрасы зерттеледі.",
                title_ru="Документальные фильмы о выдающихся деятелях Казахстана",
                summary_ru="Цикл документальных фильмов о Н. Тлендиеве, М. Магауине, К. Аманжолове, А. Абишеве и Ж. Елебекове.",
                title_en="Documentary Series on Kazakh Cultural Icons",
                summary_en="Biographical documentaries written by Didar Amantay dedicated to N. Tlendiyev, M. Magauin, K. Amanzholov, A. Abishev, and Z. Elebekov.",
            ),
            # 11. Телехабарлар
            Work(
                genre="telehabarlar", year=2024, is_new=True,
                available_languages=["kk", "ru"],
                title_kk="Бетпе-бет • Абайтану • Замандастар",
                summary_kk="Авторлық телевизиялық жобалар мен зияткерлік ток-шоулар топтамасы.",
                content_kk="«Хабар» агенттігінде және отандық телеарналарда жүргізілген мәдени, әдеби және қоғамдық-саяси сұхбат бағдарламалары.",
                title_ru="Лицом к лицу • Абаеведение • Современники",
                summary_ru="Авторские телевизионные программы, ток-шоу и интеллектуальные беседы.",
                title_en="Face to Face • Abai Studies • Contemporaries",
                summary_en="Original television talk shows and cultural broadcasts authored and hosted by Didar Amantay.",
            ),
        ]
        db.add_all(works_data)

    if db.query(Quote).count() == 0:
        quotes_data = [
            Quote(
                category="oi",
                text_kk="Қазіргі заманда қатыгездіктің өрістеуі, немқұрайдылықтың көбеюі ұлы романдарды оқымағандықтан, ғұлама персонаждарды танымағандықтан, қамқор образдарды білмегендіктен туындап отыр.",
                text_ru="Рост жестокости и равнодушия в современном мире происходит оттого, что люди перестали читать великие романы и узнавать мудрых, сострадательных героев.",
                text_en="The rise of cruelty and indifference in our era stems from neglecting great novels and forgetting their wise, compassionate characters.",
                source_kk="«Гүлдер мен кітаптар» хақындағы ой-толғам",
            ),
            Quote(
                category="oi",
                text_kk="Философия – әдебиеттен, әдебиет – философиядан басталады.",
                text_ru="Философия начинается с литературы, а литература начинается с философии.",
                text_en="Philosophy begins in literature, and literature begins in philosophy.",
                source_kk="«Қазақ әдебиеті» сұхбатынан",
            ),
            Quote(
                category="oi",
                text_kk="Өзін ашқан тұлға өзгені де ашады. Бір жақты ашықтық жоқ. Ашықтық қашанда жасампаз!",
                text_ru="Личность, открывшая саму себя, открывает и других. Односторонней открытости не бывает — открытость всегда созидательна!",
                text_en="A person who unlocks their own soul unlocks others as well. True openness is always creative.",
                source_kk="Ой-толғаулар жинағы",
            ),
            Quote(
                category="oi",
                text_kk="Жаңа тәсіл ескіні жоймайды, байытады, баптайды. Кешегі жазушылық дәстүріне жаңа жазу мәнері қосылады.",
                text_ru="Новый метод не уничтожает традицию — он обогащает и оттачивает её, добавляя к прежнему мастерству новое дыхание.",
                text_en="New literary form does not erase tradition; it enriches and refines it with a fresh voice.",
                source_kk="Әдеби эсселерден",
            ),
            Quote(
                category="metafora",
                text_kk="Шығарма – кітаби кеңістікте қозғалыссыз қалатын заттық фрагмент болса, мәтін – әрқашан қозғалыста болатын алаң. Оның ғұмыры қысқа гүл болатыны немесе өміршең кітап болатыны тарихтың еншісінде.",
                text_ru="Произведение — неподвижный фрагмент в книжном пространстве, а текст — вечно движущееся поле смысла. Станет ли он мимолетным цветком или бессмертной книгой — решает история.",
                text_en="A work is a still fragment on paper, while text is a living field in motion; whether it becomes a fleeting flower or an enduring book belongs to history.",
                source_kk="«Гүлдер мен кітаптар» романы",
            ),
            Quote(
                category="metafora",
                text_kk="Жорғалап келе жатып ол жердің иісін таныды, кітаптың иісі шығады. Кәдімгі шаң-топырақ басқан сары ала байырғы қағаздың таңсық оқшау иісі тап иегінің астынан аңқып тұр.",
                text_ru="Он узнал запах самой земли — от неё пахло книгой, древней пожелтевшей бумагой, хранящей память поколений.",
                text_en="He recognized the scent of the earth itself—it smelled of ancient books, of weathered yellow pages steeped in memory.",
                source_kk="«Гүлдер мен кітаптар» романы",
            ),
            Quote(
                category="metafora",
                text_kk="Бұл тізім – тағзым тізімі. Әлем әдебиетіндегі данышпандар мен ұлы шығармаларға берілген лайықты баға, көрсетілген құрмет.",
                text_ru="Этот список — список поклонения: дань уважения гениям и великим произведениям мировой литературы.",
                text_en="This catalog is an altar of reverence—a tribute paid to the luminaries and timeless books of world literature.",
                source_kk="«Гүлдер мен кітаптар» романы",
            ),
            Quote(
                category="metafora",
                text_kk="Қаланың кешкі шамдары — оқылмаған кітаптардың жарық беттері секілді, әр терезенің артында аяқталмаған бір новелла жазылып жатады.",
                text_ru="Вечерние огни города — как светящиеся страницы непрочитанных книг: за каждым окном пишется своя незаконченная новелла.",
                text_en="The city lights at dusk resemble illuminated pages of unread books—behind every window, an unfinished novella unfolds.",
                source_kk="«Күзгі рандеву» повесінен",
            ),
        ]
        db.add_all(quotes_data)

    if db.query(PodcastEpisode).count() == 0:
        podcasts_data = [
            PodcastEpisode(
                episode_number=1,
                title_kk="Постмодерн және қазақ романының болашағы",
                title_ru="Постмодернизм и будущее казахского романа",
                title_en="Postmodernism and the Future of the Kazakh Novel",
                description_kk="«Гүлдер мен кітаптар» романының жазылу тарихы, форма ізденістері және әлемдік әдебиетпен диалог.",
                video_url="https://teledidar.kz",
                duration="48:20",
                published_date="2026-10",
            ),
            PodcastEpisode(
                episode_number=2,
                title_kk="«Пұт-кітап» және сөз өнерінің метафизикасы",
                title_ru="«Книга-идол» и метафизика искусства слова",
                title_en="Idol-Book and the Metaphysics of Literature",
                description_kk="Жаңа жинақтағы хикаяттар, тарихи сана және заманауи оқырманның талғамы хақында сұхбат.",
                video_url="https://teledidar.kz",
                duration="54:10",
                published_date="2026-09",
            ),
            PodcastEpisode(
                episode_number=3,
                title_kk="Қазақ кинодраматургиясы: «Қазақфильм» тәжірибесі",
                title_ru="Казахская кинодраматургия: опыт работы в «Казахфильме»",
                title_en="Kazakh Screenwriting: Reflections from Kazakhfilm Studio",
                description_kk="«Гәкку», «А-ға оралу» және ұлы тұлғалар туралы деректі фильмдердің түсірілу сырлары.",
                video_url="https://teledidar.kz",
                duration="41:05",
                published_date="2026-08",
            ),
            PodcastEpisode(
                episode_number=4,
                title_kk="Қарқаралы басындағы ойлар: Эссеистика және философия",
                title_ru="Мысли на вершине Каркаралы: эссеистика и философия",
                title_en="Thoughts from Karkaraly Hills: Essays & Philosophy",
                description_kk="Абай, Шәкәрім, Мағжан мұрасы және бүгінгі жас қаламгерлерге арналған әдеби дәріс.",
                video_url="https://teledidar.kz",
                duration="39:45",
                published_date="2026-07",
            ),
        ]
        db.add_all(podcasts_data)

    if db.query(GalleryItem).count() == 0:
        gallery_data = [
            GalleryItem(
                image_url="/images/didar-amantay.jpg",
                caption_kk="Дидар Амантай — жазушы, кинодраматург, «Дарын» және «Тарлан» сыйлықтарының лауреаты",
                caption_ru="Дидар Амантай — писатель, кинодраматург, лауреат премий «Дарын» и «Тарлан»",
                caption_en="Didar Amantay — Kazakh novelist, screenwriter, and Daryn & Tarlan laureate",
                year="2024",
                category="portrait",
            ),
            GalleryItem(
                image_url="/images/karkaraly-sketch.svg",
                caption_kk="Қарқаралы таулары — қаламгердің туған өлкесі және романдарының рухани бесігі",
                caption_ru="Горы Каркаралы — родина писателя и духовная колыбель его романов",
                caption_en="Karkaraly Mountains — birthplace and spiritual inspiration of his novels",
                year="2010",
                category="homeland",
            ),
            GalleryItem(
                image_url="/images/teledidar-studio.svg",
                caption_kk="Teledidar.kz — әдебиет, философия және кино туралы авторлық подкаст студиясы",
                caption_ru="Teledidar.kz — авторская студия подкастов о литературе, философии и кино",
                caption_en="Teledidar.kz — author's broadcast and podcast studio",
                year="2026",
                category="podcast",
            ),
            GalleryItem(
                image_url="/images/cinema-archive.svg",
                caption_kk="«Қазақфильм» киностудиясының мұрағаты — көркем және деректі фильмдер сценарийлері",
                caption_ru="Киноархив «Казахфильм» — сценарии художественных и документальных фильмов",
                caption_en="Kazakhfilm Cinema Archive — screenplays and documentary productions",
                year="2012",
                category="cinema",
            ),
        ]
        db.add_all(gallery_data)

    if db.query(ReaderReview).count() == 0:
        reviews_data = [
            ReaderReview(
                author_name="Олжас Сүлейменов",
                author_role="Ақын, қоғам қайраткері",
                book_title="Гүлдер мен кітаптар",
                rating=5,
                content="Дидар Амантай — қазақ прозасына жаңа философиялық тыныс, әлемдік әдебиет деңгейіндегі көркем ойлау жүйесін әкелген дарынды қаламгер.",
                is_approved=True,
            ),
            ReaderReview(
                author_name="Айгүл Кемелбаева",
                author_role="Жазушы, әдебиеттанушы",
                book_title="Гүлдер мен кітаптар",
                rating=5,
                content="«Гүлдер мен кітаптар» романы — тәуелсіздік кезеңіндегі қазақ прозасының интеллектуалдық биігі, тілдік және композициялық жаңашылдықтың айқын үлгісі.",
                is_approved=True,
            ),
            ReaderReview(
                author_name="Ерлан Төлеутай",
                author_role="Өнертанушы, оқырман",
                book_title="Майдақоңыр",
                rating=5,
                content="«Майдақоңыр» новеллаларында Қарқаралы даласының рухы мен заманауи қала адамының ішкі жан дүниесі ғажап үйлесім тапқан.",
                is_approved=True,
            ),
            ReaderReview(
                author_name="Дана Орынқызы",
                author_role="Филолог, оқырман",
                book_title="Пұт-кітап",
                rating=5,
                content="2024 жылы жарық көрген «Пұт-кітап» жинағы әр сөйлемі ойландыратын, метафораға бай терең туынды екен.",
                is_approved=True,
            ),
        ]
        db.add_all(reviews_data)

    db.commit()
