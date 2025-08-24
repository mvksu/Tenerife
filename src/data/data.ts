// =============================== FILE: src/data/data.ts ===============================
export type Place = {
  id: string
  name: string
  lat: number
  lon: number
  cats: string[]
  blurb?: string
  img?: string // opcjonalne zdjęcie (URL lub /public/...)
  links?: { label: string; href: string }[] // dodatkowe linki (wiki/oficjalne)
}
export type Day = { id: number; title: string; hero: string; summary: string; stops: string[]; img?: string }

export const PLACES: Place[] = [
  { id: "candelaria", name: "Candelaria", lat: 28.3549, lon: -16.3716, cats: ["culture", "food"], blurb: "Bazylika i posągi guanczańskich królów, przyjemne miasteczko." },
  { id: "santacruz", name: "Santa Cruz de Tenerife", lat: 28.4636, lon: -16.2518, cats: ["culture", "nightlife"], blurb: "Stolica wyspy: Auditorio, port, nightlife i zakupy.", links: [{ label: "Wikipedia", href: "https://en.wikipedia.org/wiki/Santa_Cruz_de_Tenerife" }] },
  { id: "laguna", name: "San Cristóbal de La Laguna (UNESCO)", lat: 28.4874, lon: -16.3159, cats: ["culture", "nightlife", "food"], blurb: "Kolonialna starówka, studenckie bary, drewniane balkony.", links: [{ label: "Wikipedia", href: "https://en.wikipedia.org/wiki/San_Crist%C3%B3bal_de_La_Laguna" }] },
  { id: "cruzcarmen", name: "Centro Visitantes / Cruz del Carmen (Anaga)", lat: 28.5245, lon: -16.3009, cats: ["nature", "scenic"], blurb: "Start na Sendero de los Sentidos i świetny mirador." },
  { id: "picoingles", name: "Mirador Pico del Inglés (Anaga)", lat: 28.5242, lon: -16.2678, cats: ["scenic", "nature"], blurb: "Panorama obu wybrzeży i morze chmur." },
  { id: "taganana", name: "Taganana", lat: 28.5683, lon: -16.1906, cats: ["culture", "scenic"], blurb: "Stara wioska na końcu świata." },
  { id: "benijo", name: "Playa de Benijo", lat: 28.5676, lon: -16.1978, cats: ["nature", "beach", "scenic"], blurb: "Dzika czarna plaża; silne fale – ostrożnie." },
  { id: "almaciga", name: "Playa de Almáciga", lat: 28.5632, lon: -16.1974, cats: ["beach", "nature"], blurb: "Czarny piasek, surferzy, fotomiejscówka." },
  { id: "humboldt", name: "Mirador de Humboldt", lat: 28.4108, lon: -16.5116, cats: ["scenic"], blurb: "Widok na dolinę La Orotava i Teide.", links: [{ label: "Maps", href: "https://www.google.com/maps/search/?api=1&query=28.4108,-16.5116" }] },
  { id: "orotava", name: "La Orotava", lat: 28.3908, lon: -16.5230, cats: ["culture", "food"], blurb: "Kolonialna perła z kanaryjskimi balkonami.", links: [{ label: "Wikipedia", href: "https://en.wikipedia.org/wiki/La_Orotava" }] },
  { id: "puerto", name: "Puerto de la Cruz / Lago Martiánez", lat: 28.415, lon: -16.545, cats: ["beach", "culture", "food"], blurb: "Kurort, ogrody Manrique, promenada.", links: [{ label: "Wikipedia", href: "https://en.wikipedia.org/wiki/Puerto_de_la_Cruz" }] },
  { id: "icod", name: "Icod de los Vinos – Drago Milenario", lat: 28.3665, lon: -16.7169, cats: ["culture", "nature"], blurb: "Słynne smocze drzewo, winiarskie tradycje.", links: [{ label: "Wikipedia", href: "https://en.wikipedia.org/wiki/Icod_de_los_Vinos" }] },
  { id: "garachico", name: "Garachico – El Caletón (baseny)", lat: 28.3725, lon: -16.762, cats: ["beach", "nature", "culture"], blurb: "Lawowe baseny – kąpiel gdy spokojny ocean.", links: [{ label: "Wikipedia", href: "https://en.wikipedia.org/wiki/Garachico" }] },
  { id: "sauzal", name: "Casa del Vino – El Sauzal", lat: 28.432, lon: -16.447, cats: ["food", "culture"], blurb: "Muzeum wina i degustacje." },
  { id: "teleferico_base", name: "Teleférico del Teide – stacja dolna", lat: 28.2511, lon: -16.6256, cats: ["nature", "scenic"], blurb: "Wjazd kolejką na 3555 m – opcja dla całej ekipy.", links: [{ label: "Wikipedia", href: "https://en.wikipedia.org/wiki/Teide_Cable_Car" }] },
  { id: "rambleta", name: "La Rambleta – stacja górna (3555 m)", lat: 28.2716, lon: -16.6425, cats: ["nature", "scenic"], blurb: "Miradory Pico Viejo / La Fortaleza." },
  { id: "pico", name: "Pico del Teide (3718 m)", lat: 28.2724, lon: -16.6426, cats: ["nature", "scenic"], blurb: "Wejście na czubek tylko z permitami." },
  { id: "mblanca", name: "Montaña Blanca – parking/szlak #7", lat: 28.2507, lon: -16.5983, cats: ["nature", "scenic"], blurb: "Start długiego trekkingu (dla chętnych)." },
  { id: "roques", name: "Roques de García / Parador", lat: 28.2165, lon: -16.6405, cats: ["nature", "scenic"], blurb: "1h pętla wśród formacji skalnych.", links: [{ label: "Maps", href: "https://www.google.com/maps/search/?api=1&query=28.2165,-16.6405" }] },
  { id: "ucanca", name: "Mirador Llano de Ucanca", lat: 28.217, lon: -16.651, cats: ["scenic"], blurb: "Rozległa równina kaldery." },
  { id: "samara", name: "Mirador Samara / TF-38", lat: 28.239, lon: -16.773, cats: ["scenic"], blurb: "Stożki wulkaniczne, piękne zachody.", links: [{ label: "Maps", href: "https://www.google.com/maps/search/?api=1&query=28.239,-16.773" }] },
  { id: "vilaflor", name: "Vilaflor", lat: 28.160, lon: -16.639, cats: ["culture", "food"], blurb: "Najwyżej położona wioska; winnice.", links: [{ label: "Wikipedia", href: "https://en.wikipedia.org/wiki/Vilaflor,_Santa_Cruz_de_Tenerife" }] },
  { id: "siam", name: "Siam Park (Adeje)", lat: 28.0798, lon: -16.7247, cats: ["nightlife", "beach"], blurb: "Najlepszy park wodny – adrenalina i chill.", links: [{ label: "Oficjalna strona", href: "https://www.siampark.net/" }, { label: "Wikipedia", href: "https://en.wikipedia.org/wiki/Siam_Park_(Tenerife)" }] },
  { id: "medano", name: "El Médano", lat: 28.046, lon: -16.536, cats: ["beach", "food"], blurb: "Surferskie miasteczko, szkoły kite/surf.", links: [{ label: "Wikipedia", href: "https://en.wikipedia.org/wiki/El_M%C3%A9dano" }] },
  { id: "tejita", name: "Playa La Tejita", lat: 28.045, lon: -16.555, cats: ["beach", "nature"], blurb: "Długa złota plaża pod Montaña Roja." },
  { id: "mroja", name: "Montaña Roja (171 m)", lat: 28.042, lon: -16.557, cats: ["nature", "scenic"], blurb: "Krótka wspinaczka z panoramą na ocean.", links: [{ label: "Maps", href: "https://www.google.com/maps/search/?api=1&query=28.042,-16.557" }] },
  { id: "duque", name: "Playa del Duque (Adeje)", lat: 28.0957, lon: -16.738, cats: ["beach", "nightlife", "food"], blurb: "Premium plaża, beach cluby.", links: [{ label: "Maps", href: "https://www.google.com/maps/search/?api=1&query=28.0957,-16.738" }] },
  { id: "americas", name: "Playa de Las Américas (Verónicas)", lat: 28.065, lon: -16.73, cats: ["nightlife", "beach"], blurb: "Pas klubów i imprezownie.", links: [{ label: "Wikipedia", href: "https://en.wikipedia.org/wiki/Playa_de_las_Am%C3%A9ricas" }] },
  { id: "loscrist", name: "Los Cristianos", lat: 28.055, lon: -16.718, cats: ["beach", "food"], blurb: "Promenada, port i restauracje.", links: [{ label: "Wikipedia", href: "https://en.wikipedia.org/wiki/Los_Cristianos" }] },
  { id: "amarilla", name: "Montaña Amarilla – snorkeling", lat: 28.003, lon: -16.6529, cats: ["beach", "nature"], blurb: "Krystaliczna woda, bar na klifie.", links: [{ label: "Maps", href: "https://www.google.com/maps/search/?api=1&query=28.003,-16.6529" }] },
  { id: "gigantes", name: "Los Gigantes – klify / marina", lat: 28.243, lon: -16.841, cats: ["nature", "scenic", "beach"], blurb: "Rejsy z delfinami; kąpiel z łodzi.", links: [{ label: "Wikipedia", href: "https://en.wikipedia.org/wiki/Los_Gigantes" }] },
  { id: "masca", name: "Masca (wioska)", lat: 28.306, lon: -16.833, cats: ["nature", "scenic", "culture"], blurb: "Najpiękniejsza wioska; serpentyny TF-436.", links: [{ label: "Wikipedia", href: "https://en.wikipedia.org/wiki/Masca" }] },
  { id: "teno", name: "Punta de Teno (latarnia)", lat: 28.346, lon: -16.929, cats: ["scenic", "nature"], blurb: "Cypel na zachodzie – dojazd busami.", links: [{ label: "Wikipedia", href: "https://en.wikipedia.org/wiki/Punta_de_Teno" }] },
  { id: "abades", name: "Abades – opuszczone miasteczko", lat: 28.162, lon: -16.437, cats: ["culture", "scenic"], blurb: "Leprozorium-widmo, graffiti, plaża.", links: [{ label: "Wikipedia", href: "https://en.wikipedia.org/wiki/Abades,_Tenerife" }] },
  { id: "puertito", name: "El Puertito de Adeje – żółwie (bywa)", lat: 28.108, lon: -16.744, cats: ["nature", "beach"], blurb: "Kameralna zatoczka; bywa życie pod wodą.", links: [{ label: "Maps", href: "https://www.google.com/maps/search/?api=1&query=28.108,-16.744" }] },
  { id: "diego", name: "Playa Diego Hernández (hippie)", lat: 28.121, lon: -16.746, cats: ["beach", "nature", "nightlife"], blurb: "Dzika plaża (20 min dojścia); bębny, zachody.", links: [{ label: "Maps", href: "https://www.google.com/maps/search/?api=1&query=28.121,-16.746" }] },
]

export const DAYS: Day[] = [
  { id: 1, title: "Dzień 1 – Przylot, El Médano + La Tejita", hero: "El Médano", summary: "Check-in, spacer promenadą w El Médano, plażowanie na La Tejita lub wejście na Montaña Roja.", stops: ["medano", "tejita", "mroja"], img: "https://upload.wikimedia.org/wikipedia/commons/f/f9/ES7020049_Tenerife_Monta%C3%B1a_Roja%2C_playa_de_El_M%C3%A9dano.jpg" },
  { id: 2, title: "Dzień 2 – Park Narodowy Teide (kolejka + Roques)", hero: "Teide", summary: "Kolejką na 3555 m (La Rambleta), miradory Pico Viejo/La Fortaleza, księżycowe Roques de García.", stops: ["teleferico_base", "rambleta", "roques", "ucanca", "samara", "vilaflor"], img: "https://upload.wikimedia.org/wikipedia/commons/6/6c/Teide_Cable_Car_Carriage.jpg" },
  { id: 3, title: "Dzień 3 – Chill: Siam Park / El Médano / Adeje", hero: "Siam Park", summary: "Adrenalina w Siam Parku albo plażowanie i sporty wodne (El Médano, La Tejita) lub premium chill w Adeje.", stops: ["siam", "medano", "tejita", "mroja", "duque", "americas", "loscrist", "amarilla"], img: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Siamparkentrada1.JPG" },
  { id: 4, title: "Dzień 4 – Góry Anaga, Taganana, Benijo", hero: "Anaga", summary: "Las wawrzynowy, serpentyny z miradorami i dzika plaża Benijo (spacer + obiad z widokiem).", stops: ["cruzcarmen", "picoingles", "taganana", "benijo", "almaciga", "laguna"], img: "https://upload.wikimedia.org/wikipedia/commons/8/85/Benijo_%28Anaga%29.JPG" },
  { id: 5, title: "Dzień 5 – La Laguna, La Orotava, wino + północ", hero: "La Orotava", summary: "Kolorowe balkony i miradory; opcja Puerto de la Cruz, Icod (Drago) i Garachico (baseny).", stops: ["laguna", "humboldt", "orotava", "puerto", "icod", "garachico", "sauzal"], img: "https://upload.wikimedia.org/wikipedia/commons/0/02/Villa_de_La_Orotava_panorama.jpg" },
  { id: 6, title: "Dzień 6 – Los Gigantes (rejs) + Masca", hero: "Los Gigantes", summary: "Poranny boat trip (delfiny/walenie) wzdłuż klifów, kąpiel w zatoce Masca i serpentyny do wioski.", stops: ["gigantes", "masca", "teno"], img: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Los_Gigantes%2C_Teneriffa.JPG" },
  { id: 7, title: "Dzień 7 – Sekrety SE: Abades, Diego Hernández, El Puertito", hero: "SE Wybrzeże", summary: "Urbex w Abades, hipisowska plaża Diego Hernández (zachód) i kameralne El Puertito (bywają żółwie).", stops: ["abades", "diego", "puertito"], img: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Abades%2C_Arico_2022_31.jpg" },
  { id: 8, title: "Dzień 8 – Powrót / luz i pamiątki", hero: "Powrót", summary: "Ostatni spacer po El Médano, kawa nad oceanem, zwrot auta i wylot z TFS.", stops: ["medano"], img: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Canaries_Tenerife_Punta_Roja_Playa_Tejita_-_panoramio.jpg" },
]

export const byId: Record<string, Place> = Object.fromEntries(PLACES.map(p => [p.id, p])) as Record<string, Place>

// Opcjonalne nadpisania dla wariantów A/B (np. inne zdjęcia/tytuły/summary)
export const DAY_VARIANT_OVERRIDES: Partial<Record<'A' | 'B', Partial<Record<number, Partial<Day>>>>> = {
  B: {
    1: {
      img: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Canaries_Tenerife_Punta_Roja_Playa_Tejita_-_panoramio.jpg",
      title: "Dzień 1 – El Médano + Montaña Roja (B)",
    },
    2: {
      img: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Teide_-_from_Mirador_de_los_Roque_de_Garc%C3%ADa_20190327.jpg",
      title: "Dzień 2 – Teide (kolejka) + Roques (B)",
    },
    3: {
      img: "https://upload.wikimedia.org/wikipedia/commons/4/49/Siam_Park_Tenerife_2009.jpg",
      summary: "Wariant B: więcej luzu – Siam Park albo plaże południa.",
    },
    4: {
      img: "https://upload.wikimedia.org/wikipedia/commons/8/85/Benijo_%28Anaga%29.JPG",
      title: "Dzień 4 – Góry Anaga (B)",
    },
    5: {
      img: "https://upload.wikimedia.org/wikipedia/commons/3/30/La_Orotava_-_Tenerife_-_Casa_de_los_Balcones_01.jpg",
    },
    6: {
      img: "https://upload.wikimedia.org/wikipedia/commons/8/83/Acantilados_de_los_Gigantes_05.jpg",
    },
    7: {
      img: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Playa_Diego_Hern%C3%A1ndez%2C_Tenerife%2C_Espa%C3%B1a%2C_2016-12-09%2C_DD_43.jpg",
    },
    8: {
      img: "https://upload.wikimedia.org/wikipedia/commons/6/6f/El_Medano_Promenade_2020.jpg",
    },
  },
}

// app/data/data.ts
export type DayDetail = {
  id: number
  intro: string           // lead dnia
  when: string[]          // okna godzinowe / timing
  driving?: { segment: string; time: string }[] // czasy odcinków
  highlights?: string[]    // najważniejsze przeżycia
  food?: string[]         // jedzenie / lokale
  safety?: string[]       // bezpieczeństwo
  options?: string[]      // warianty / opcjonalne rozszerzenia
}
export type TripTips = {
  packing: string[]
  permits: string[]
  weather: string[]
  driving: string[]
  misc: string[]
}

// --- Szczegółowe opisy D1–D8 na bazie PDF (El Médano jako baza) ---
const DETAILS_A: DayDetail[] = [
    {
      id: 1,
      intro: `Pierwszy dzień przeznaczcie na chillout po przylocie i poznanie okolicy bazy. El Médano to surferskie
miasteczko słynące z ciągłych wiatrów i luzackiej atmosfery . Po zakwaterowaniu możecie zrobić zakupy
(w miasteczku są markety Lidl, Mercadona, HiperDino ) i zjeść kolację w lokalnej knajpce – np. spróbujcie
kanaryjskich papas arrugadas z mojo (ziemniaczki w mundurkach) i świeżych owoców morza w porcie Los
Abrigos obok (mała rybacka wioska z wyśmienitymi restauracjami rybnymi ). Wieczorem proponuję
spacer po plaży w El Médano oraz krótką wędrówkę na pobliską górę Montaña Roja lub przynajmniej pod
nią. Montaña Roja („Czerwona Góra”) to charakterystyczny wulkaniczny stożek przy plaży La Tejita – wejście
na szczyt (~171 m n.p.m.) zajmuje ok. 45 min, a z góry jest przepiękny widok na ocean i całe wybrzeże El
Médano . Jeśli nie wszyscy czują się na siłach wspinać, można równie dobrze podziwiać Montaña Roja
od dołu z plaży Playa La Tejita podczas zachodu słońca. To świetny, luźny start wyjazdu – trochę ruchu
na świeżym powietrzu i pierwsze fotki z Teneryfy, a jednocześnie czas na odpoczynek po podróży.
`,
      when: [
        "Przylot → check-in → lekki spacer promenadą",
        "Plaża: El Médano (łatwy dostęp) lub La Tejita (więcej przestrzeni)",
      ],
      highlights: [
        "Luźny start bez jeżdżenia — zostajecie przy bazie.",
      ],
      food: [
        "Ryby i owoce morza w El Médano; klasyki: papas arrugadas + mojo.",
      ],
    },
    {
      id: 2,
      intro: `Rano wyruszcie wcześnie (np. ok. 7:30) w stronę wulkanu Teide – to około 1–1,5 godz. jazdy z El Médano
krętą szosą przez Vilaflor . Uwaga: zaplanujcie ten dzień przy dobrej pogodzie; jeśli prognozy byłyby złe
(silny wiatr – wtedy kolejka może nie kursować – lub gęste chmury), można zamienić kolejność dni. Jadąc na
1
2
3
4
5
6
7
1
Teide, obserwujcie jak krajobraz się zmienia – od suchych równin południa po lasy sosny kanaryjskiej, aż po
pustynną scenerię kaldery Las Cañadas na wysokości ~2000 m n.p.m. . Po drodze mijacie punkt
widokowy Mirador de San José (panorama kaldery) i Roques de García (słynne skały o fantazyjnych
kształtach). Zaparkujcie przy dolnej stacji kolejki Teleférico del Teide (~2350 m n.p.m.). Bilety na kolejkę
warto kupić online z wyprzedzeniem (najlepiej kilka dni wcześniej) na konkretną godzinę , co pozwoli
uniknąć kolejek. Wjazd trwa 8 minut i wysadza Was na ~3550 m n.p.m. – stąd przy dobrej pogodzie widać
całe Wyspy Kanaryjskie dookoła! Na górze możecie pospacerować bez pozwolenia do dwóch dostępnych
punktów widokowych: Mirador de La Fortaleza (widok na północ wyspy) lub Mirador Pico Viejo (widok na
wielki krater Pico Viejo i zachodnie wybrzeże). Pamiętajcie o cieplejszej odzieży – na tej wysokości bywa tylko
kilka stopni C i silny wiatr, mimo słońca. Zejście na sam szczyt Teide (szlak Telesforo Bravo) jest zamknięte
dla osób bez permitu , dlatego zostajecie na platformach widokowych. Mimo to samo przebywanie
na Teide jest spektakularne – księżycowy krajobraz zastygłej lawy, intensywna barwa nieba i panorama
chmur pod stopami na długo zostaną w pamięci . Spędźcie na górze ok. 1 godzinę (uwaga na objawy
wysokościowe – jeśli kogoś rozboli głowa, niech zejdzie niżej). Zjazd kolejką i przerwa na obiad – polecam w
schronisku/knajpce Parador de Las Cañadas obok Roques de García, gdzie możecie spróbować lokalnej
zupy potaje czy kanaryjskiego gulaszu. Po obiedzie zróbcie krótki trekking wokół Roques de García (łatwa
~1-godzinna pętla, widoki na Teide i formacje skalne ). Po południu, w drodze powrotnej, zatrzymajcie się
jeszcze przy punktach widokowych: Mirador Llano de Ucanca (rozległa równina w kalderze) oraz niżej
Mirador de Chío (ostatnie spojrzenie na Teide). Wieczorem wracacie do El Médano na odpoczynek.
(Opcjonalnie: jeśli macie siłę, możecie tego dnia po kolacji pojechać raz jeszcze w góry samochodem nocą
na Teide na spektakularną obserwację gwiazd – nocne niebo nad Teide jest jednym z najczystszych na
świecie i widać miliony gwiazd gołym okiem . To ekstra przygoda dla fanów astronomii, ale wymaga ok.
1h nocnej jazdy w jedną stronę.)*
`,
      when: [
        "Wyjazd 07:30 z El Médano → Vilaflor TF-21.",
        "Kolejka: rano (wiatr = ryzyko wstrzymania kursów).",
      ],
      driving: [
        { segment: "El Médano → Vilaflor (TF-21)", time: "~1:00" },
      ],
      highlights: [
        "Kolejka na La Rambleta (3555 m), mirador La Fortaleza / Pico Viejo.",
        "Roques de García (krótka pętla ~30–60 min).",
        "Zachód przy Mirador Samara (TF-38).",
      ],
      safety: [
        "UV, okulary, cieplejsza warstwa: ~5°C na górze.",
        "Bez permitów nie wchodzimy na sam wierzchołek (3718 m).",
      ],
    },
    {
      id: 3,
      intro: `Po wczorajszym Teide zróbcie lżejszy, „wakacyjny” dzień. W opcji macie Siam Park —
najlepiej być przed otwarciem, aby szybko zaliczyć największe zjeżdżalnie, a potem na spokojnie
dryfować po leniwej rzece. Alternatywnie zostajecie na południu: plażowanie w El Médano lub
na długiej La Tejita, krótki spacer na Montaña Roja, a dla chętnych snorkel przy Montaña Amarilla
(klarowna woda, łatwe zejście po skałach). Popołudnie można spędzić bardziej „premium” w okolicach
Costa Adeje — promenada, beach cluby i zachód słońca nad Playa del Duque. Wieczorem kolacja
w Los Cristianos lub Las Américas; kto ma jeszcze siłę, może zajrzeć na barowy pasaż Verónicas.`,
      when: ["Siam najlepiej od otwarcia (10:00), by ominąć kolejki."],
      highlights: [
        "Relaks po Teide; alternatywnie plaże Costa Adeje, Los Cristianos.",
      ],
    },
    {
      id: 4,
      intro: `Czas na odkrywanie zachodniej, dzikszej części Teneryfy. Rano wyruszcie ok. 8:00 w kierunku miasteczka
Santiago del Teide (ok. 1 godz. jazdy autostradą TF-1 na zachód, potem w górę TF-82). Za Santiago zaczyna
8
9
1 10
11 12
13
12
14 15
16
2
się słynna kręta droga górska TF-436 do wioski Masca – czeka Was ekscytująca jazda serpentynami z
zapierającymi dech widokami na głębokie doliny Teno . Kierowcy powinni być pewni swoich umiejętności
(wąskie zakręty, mijanie się z autobusami – trochę adrenaliny). Po drodze zatrzymajcie się na punktach
widokowych, np. Mirador de Cherfe (panorama wąwozu Masca). W Masce zaparkujcie na wyznaczonych
miejscach przy wjeździe (parking ograniczony, więc rano macie większą szansę znaleźć miejsce). Wioska
Masca to maleńka osada piratów ukryta w górach (dawniej ponoć schronienie piratów), często nazywana
Machu Picchu Teneryfy ze względu na położenie i widoki . Koniecznie zróbcie krótki spacer po wiosce –
brukowaną ścieżką w dół między palmami do punktu widokowego z widokiem na przepaść wąwozu. Można
tu napić się lokalnej kawy barraquito w maleńkiej kawiarence – to kanaryjska specjalność: warstwowa kawa
z mlekiem skondensowanym i likierem (spróbujcie! ). Wędrówka dnem Wąwozu Masca aż do oceanu
to atrakcja dla wytrenowanych – tylko z rezerwacją (limitowany szlak, bilety ~40 € i permit bezpieczeństwa
) – przy waszej mieszanej kondycji raczej odpuście tę ciężką trasę. Zamiast tego, po kawie i sesji
zdjęciowej w Masce, wróćcie do aut i zjedźcie tą samą drogą z powrotem na dół do skrzyżowania z szosą
TF-1 (lub alternatywnie kontynuujcie dalej krętą drogą przez Buena Vista del Norte i dookoła wyspy – ale
uwaga: Punta de Teno na końcu drogi jest obecnie dostępna tylko autobusem, więc nie wjedziecie tam
autem ). Proponuję wrócić do wybrzeża i udać się do miasteczka Los Gigantes. To miejscowość znana z
majestatycznych klifów Acantilados de Los Gigantes, które pionowo opadają do oceanu z wysokości 500–
600 m . W Los Gigantes zjedzcie lekki lunch (np. tawerna Barco del Nino z kanaryjskimi daniami) i
udajcie się na rejs łodzią – liczne firmy oferują 2-godzinne wycieczki katamaranem wzdłuż klifów
połączone z obserwacją delfinów i grindwali (waleni pilotów). Cena ~20–30 €/os, wypływają kilka razy
dziennie z portu w Los Gigantes lub pobliskiej Marina Puerto Colón. Taki rejs to świetna opcja, by z bliska
      podziwiać monumentalne klify z poziomu oceanu; często towarzyszą łodzi delfiny.
      `,
      when: ["Wyjazd ~07:00 (dłuższy dojazd z El Médano)."],
      driving: [
        { segment: "El Médano → Santa Cruz (TF-1)", time: "50–60 min" },
        { segment: "Santa Cruz → Cruz del Carmen", time: "~30 min (kręto)" },
      ],
      highlights: [
        "Sendero de los Sentidos (10–45 min).",
        "Mirador Pico del Inglés, przejazd granią.",
        "Lunch z widokiem na Benijo (El Mirador).",
      ],
      safety: [
        "Silne fale/prądy na Benijo — podziwiać, nie kąpać się.",
        "Drogi kręte; jedźcie ostrożnie, róbcie fotostopy.",
      ],
    },
    {
      id: 5,
      intro: `Dziś akcent na historię i architekturę północy. Rano spacer po starówce San Cristóbal
de La Laguna (UNESCO): kolorowe kamienice, dziedzińce, kawiarnie i młody, studencki klimat.
Następnie jedziemy do La Orotavy — po drodze szybki przystanek na Mirador de Humboldt z widokiem
na dolinę i Teide. W samej Orotavie zaglądamy do Casa de los Balcones i kręcimy się po brukowanych
uliczkach pełnych kanaryjskich balkonów. Jeśli starczy czasu i energii, zjeżdżamy do Puerto de la Cruz
na spacer po promenadzie i kompleksie Lago Martiánez; alternatywnie odwiedzamy Icod de los Vinos,
by zobaczyć Drago Milenario, i Garachico, gdzie przy spokojnym oceanie można wykąpać się w
najlepszych naturalnych basenach El Caletón. To kulturalny, ale wciąż „lekki” dzień.`,
      when: ["Rano: La Laguna; po południu: Orotava + Mirador Humboldt."],
      highlights: [
        "Kolonialne balkony, Casa de los Balcones.",
        "El Caletón (kąpiel, gdy spokojne morze).",
      ],
    },
    {
      id: 6,
      intro: `Rano wybieramy się do mariny w Los Gigantes na 2–3‑godzinny rejs wzdłuż monumentalnych
klifów. Z dużym prawdopodobieństwem spotkacie delfiny lub grindwale, a załoga często robi postój na
krótką kąpiel w zatoce Masca — warto zabrać ręcznik, strój i ewentualnie tabletki na chorobę morską.
Po rejsie kawa i chwila oddechu, a następnie samochodem wspinamy się serpentynami TF‑436 do wioski
Masca, skąd roztacza się jedna z najbardziej ikonicznych panoram Teneryfy. Jeśli harmonogram i warunki
pozwolą, pod wieczór można jeszcze podjechać w stronę Punta de Teno na widok zachodnich krańców
wyspy (dojazd bywa ograniczony — sprawdźcie aktualne zasady). Dzień pełen „wow‑efektów” i spokojniejszego
tempa po południu.`,
      when: ["Poranny rejs 2h; kąpiel w zatoce Masca; kawa po rejsie."],
      highlights: [
        "Klify do 600 m, częste spotkania delfinów/pilotów.",
        "Panorama z Mirador de Masca; wioska „z innej epoki”.",
      ],
      safety: [
        "Choroba morska? Tabletki przed rejsem.",
        "Droga do Masca wąska i kręta — tylko pewni kierowcy.",
      ],
      options: [
        "Trekking wąwozem Masca tylko z rezerwacją i świetną kondycją — długi czas.",
      ],
    },
    {
      id: 7,
      intro: `Na zakończenie odkrywamy południowo‑wschodnią część wybrzeża. Rano krótkie
urbexowe zwiedzanie opuszczonego miasteczka Abades z charakterystycznym kościołem na wzgórzu
i szeroką, spokojną plażą. Po południu kierujemy się na Playa Diego Hernández — dziką, jasną
zatokę o hippie klimacie; trzeba liczyć ok. 20 minut dojścia ścieżką klifową i pamiętać o wodzie oraz
ochronie przed słońcem. Alternatywą są La Tejita albo snorkel przy Montaña Amarilla. Dzień kończymy
w El Puertito — kameralnej zatoczce idealnej na relaks i zachód słońca. Wieczorem pożegnalna kolacja —
np. ryby i owoce morza w okolicznych miasteczkach.`,
      when: ["Abades rano (~20 min TF-1), plaża/popłudnie zależnie od energii."],
      highlights: [
        "Miasto-duch (leprozorium), widokowy kościół na wzgórzu.",
        "Diego Hernández: 20 min dojście klifową ścieżką, hippie vibe.",
      ],
      safety: [
        "Urbex: gruz, pręty — zachować ostrożność.",
      ],
    },
    {
      id: 8,
      intro: `Ostatni poranek przeznaczcie na niespieszny spacer po El Médano, kawę z widokiem
na ocean i ewentualnie szybki wypad pod Montaña Roja albo na La Tejita, jeśli macie jeszcze godzinę.
Spakujcie się z zapasem czasu, zatankujcie przed zwrotem auta (stacja jest tuż przy TFS) i ruszajcie
na lotnisko — dojazd z bazy zajmuje zwykle około 10 minut. To dobry moment na ostatnie pamiątki i
zdjęcia z plaży. Do zobaczenia na kolejnej kanaryjskiej wyprawie!`,
      when: [
        "TFS ~10 min od bazy; zwrot aut przed lotem (stacja benzynowa tuż przy lotniskiem).",
      ],
      highlights: [
        "Kawa nad oceanem, ewentualnie lunch w Los Abrigos (ryby).",
      ],
    },
]

const DETAILS_B: DayDetail[] = DETAILS_A.map((d) => ({ ...d }));

export const DETAILS: Record<'A' | 'B', DayDetail[]> = {
  A: DETAILS_A,
  B: DETAILS_B,
}

// --- Meta-tipy dla całej wyprawy (do sidebaru) ---
export const TIPS: TripTips = {
  packing: [
    "Na Teide: ciepła warstwa, kurtka przeciwwiatrowa, krem UV, okulary.",
  ],
  permits: [
    "Wejście na czubek Teide (3718 m) wymaga darmowego permitu — bez niego zostają miradory z ramblety.",
  ],
  weather: [
    "Kolejka bywa zamykana przy wietrze — plan ma bufor i możliwość zamiany dni.",
    "Benijo/Atlantyk: silne fale i prądy — ostrożnie lub tylko widok.",
  ],
  driving: [
    "Anaga/Masca: serpentyny, jedźcie spokojnie, róbcie przerwy i fotostopy.",
    "Z El Médano do północy zwykle +~30 min vs Candelaria, dlatego optymalizujemy kolejność.",
  ],
  misc: [
    "Siam Park: bądź przed 10:00 — mniejsze kolejki.",
    "Lotnisko TFS ~10 min od bazy; stacja benzynowa przed oddaniem auta.",
  ],
}

