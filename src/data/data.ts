// =============================== FILE: src/data/data.ts ===============================
export type Place = {
  id: string;
  name: string;
  lat: number;
  lon: number;
  cats: string[];
  blurb?: string;
};
export type Day = {
  id: number;
  title: string;
  hero: string;
  summary: string;
  stops: string[];
};

export const PLACES: Place[] = [
  {
    id: "candelaria",
    name: "Candelaria (base)",
    lat: 28.3549,
    lon: -16.3716,
    cats: ["culture", "food"],
    blurb: "Baza noclegowa; bazylika i posągi guanczańskich królów.",
  },
  {
    id: "santacruz",
    name: "Santa Cruz de Tenerife",
    lat: 28.4636,
    lon: -16.2518,
    cats: ["culture", "nightlife"],
    blurb: "Stolica wyspy: Auditorio, port, nightlife i zakupy.",
  },
  {
    id: "laguna",
    name: "San Cristóbal de La Laguna (UNESCO)",
    lat: 28.4874,
    lon: -16.3159,
    cats: ["culture", "nightlife", "food"],
    blurb: "Kolonialna starówka, studenckie bary, drewniane balkony.",
  },
  {
    id: "cruzcarmen",
    name: "Centro Visitantes / Cruz del Carmen (Anaga)",
    lat: 28.5245,
    lon: -16.3009,
    cats: ["nature", "scenic"],
    blurb: "Start na Sendero de los Sentidos i świetny mirador.",
  },
  {
    id: "picoingles",
    name: "Mirador Pico del Inglés (Anaga)",
    lat: 28.5242,
    lon: -16.2678,
    cats: ["scenic", "nature"],
    blurb: "Panorama obu wybrzeży i morze chmur.",
  },
  {
    id: "taganana",
    name: "Taganana",
    lat: 28.5683,
    lon: -16.1906,
    cats: ["culture", "scenic"],
    blurb: "Stara wioska na końcu świata.",
  },
  {
    id: "benijo",
    name: "Playa de Benijo",
    lat: 28.5676,
    lon: -16.1978,
    cats: ["nature", "beach", "scenic"],
    blurb: "Dzika czarna plaża; silne fale – ostrożnie.",
  },
  {
    id: "almaciga",
    name: "Playa de Almáciga",
    lat: 28.5632,
    lon: -16.1974,
    cats: ["beach", "nature"],
    blurb: "Czarny piasek, surferzy, fotomiejscówka.",
  },
  {
    id: "humboldt",
    name: "Mirador de Humboldt",
    lat: 28.4108,
    lon: -16.5116,
    cats: ["scenic"],
    blurb: "Widok na dolinę La Orotava i Teide.",
  },
  {
    id: "orotava",
    name: "La Orotava",
    lat: 28.3908,
    lon: -16.523,
    cats: ["culture", "food"],
    blurb: "Kolonialna perła z kanaryjskimi balkonami.",
  },
  {
    id: "puerto",
    name: "Puerto de la Cruz / Lago Martiánez",
    lat: 28.415,
    lon: -16.545,
    cats: ["beach", "culture", "food"],
    blurb: "Kurort, ogrody Manrique, promenada.",
  },
  {
    id: "icod",
    name: "Icod de los Vinos – Drago Milenario",
    lat: 28.3665,
    lon: -16.7169,
    cats: ["culture", "nature"],
    blurb: "Słynne smocze drzewo, winiarskie tradycje.",
  },
  {
    id: "garachico",
    name: "Garachico – El Caletón (baseny)",
    lat: 28.3725,
    lon: -16.762,
    cats: ["beach", "nature", "culture"],
    blurb: "Lawowe baseny – kąpiel gdy spokojny ocean.",
  },
  {
    id: "sauzal",
    name: "Casa del Vino – El Sauzal",
    lat: 28.432,
    lon: -16.447,
    cats: ["food", "culture"],
    blurb: "Muzeum wina i degustacje.",
  },
  {
    id: "teleferico_base",
    name: "Teleférico del Teide – stacja dolna",
    lat: 28.2511,
    lon: -16.6256,
    cats: ["nature", "scenic"],
    blurb: "Wjazd kolejką na 3555 m – opcja dla całej ekipy.",
  },
  {
    id: "rambleta",
    name: "La Rambleta – stacja górna (3555 m)",
    lat: 28.2716,
    lon: -16.6425,
    cats: ["nature", "scenic"],
    blurb: "Miradory Pico Viejo / La Fortaleza.",
  },
  {
    id: "pico",
    name: "Pico del Teide (3718 m)",
    lat: 28.2724,
    lon: -16.6426,
    cats: ["nature", "scenic"],
    blurb: "Wejście na czubek tylko z permitami.",
  },
  {
    id: "mblanca",
    name: "Montaña Blanca – parking/szlak #7",
    lat: 28.2507,
    lon: -16.5983,
    cats: ["nature", "scenic"],
    blurb: "Start długiego trekkingu (dla chętnych).",
  },
  {
    id: "roques",
    name: "Roques de García / Parador",
    lat: 28.2165,
    lon: -16.6405,
    cats: ["nature", "scenic"],
    blurb: "1h pętla wśród formacji skalnych.",
  },
  {
    id: "ucanca",
    name: "Mirador Llano de Ucanca",
    lat: 28.217,
    lon: -16.651,
    cats: ["scenic"],
    blurb: "Rozległa równina kaldery.",
  },
  {
    id: "samara",
    name: "Mirador Samara / TF-38",
    lat: 28.239,
    lon: -16.773,
    cats: ["scenic"],
    blurb: "Stożki wulkaniczne, piękne zachody.",
  },
  {
    id: "vilaflor",
    name: "Vilaflor",
    lat: 28.16,
    lon: -16.639,
    cats: ["culture", "food"],
    blurb: "Najwyżej położona wioska; winnice.",
  },
  {
    id: "siam",
    name: "Siam Park (Adeje)",
    lat: 28.0798,
    lon: -16.7247,
    cats: ["nightlife", "beach"],
    blurb: "Najlepszy park wodny – adrenalina i chill.",
  },
  {
    id: "medano",
    name: "El Médano",
    lat: 28.046,
    lon: -16.536,
    cats: ["beach", "food"],
    blurb: "Surferskie miasteczko, szkoły kite/surf.",
  },
  {
    id: "tejita",
    name: "Playa La Tejita",
    lat: 28.045,
    lon: -16.555,
    cats: ["beach", "nature"],
    blurb: "Długa złota plaża pod Montaña Roja.",
  },
  {
    id: "mroja",
    name: "Montaña Roja (171 m)",
    lat: 28.042,
    lon: -16.557,
    cats: ["nature", "scenic"],
    blurb: "Krótka wspinaczka z panoramą na ocean.",
  },
  {
    id: "duque",
    name: "Playa del Duque (Adeje)",
    lat: 28.0957,
    lon: -16.738,
    cats: ["beach", "nightlife", "food"],
    blurb: "Premium plaża, beach cluby.",
  },
  {
    id: "americas",
    name: "Playa de Las Américas (Verónicas)",
    lat: 28.065,
    lon: -16.73,
    cats: ["nightlife", "beach"],
    blurb: "Pas klubów i imprezownie.",
  },
  {
    id: "loscrist",
    name: "Los Cristianos",
    lat: 28.055,
    lon: -16.718,
    cats: ["beach", "food"],
    blurb: "Promenada, port i restauracje.",
  },
  {
    id: "amarilla",
    name: "Montaña Amarilla – snorkeling",
    lat: 28.003,
    lon: -16.6529,
    cats: ["beach", "nature"],
    blurb: "Krystaliczna woda, bar na klifie.",
  },
  {
    id: "gigantes",
    name: "Los Gigantes – klify / marina",
    lat: 28.243,
    lon: -16.841,
    cats: ["nature", "scenic", "beach"],
    blurb: "Rejsy z delfinami; kąpiel z łodzi.",
  },
  {
    id: "masca",
    name: "Masca (wioska)",
    lat: 28.306,
    lon: -16.833,
    cats: ["nature", "scenic", "culture"],
    blurb: "Najpiękniejsza wioska; serpentyny TF-436.",
  },
  {
    id: "teno",
    name: "Punta de Teno (latarnia)",
    lat: 28.346,
    lon: -16.929,
    cats: ["scenic", "nature"],
    blurb: "Cypel na zachodzie – dojazd busami.",
  },
  {
    id: "abades",
    name: "Abades – opuszczone miasteczko",
    lat: 28.162,
    lon: -16.437,
    cats: ["culture", "scenic"],
    blurb: "Leprozorium-widmo, graffiti, plaża.",
  },
  {
    id: "puertito",
    name: "El Puertito de Adeje – żółwie (bywa)",
    lat: 28.108,
    lon: -16.744,
    cats: ["nature", "beach"],
    blurb: "Kameralna zatoczka; bywa życie pod wodą.",
  },
  {
    id: "diego",
    name: "Playa Diego Hernández (hippie)",
    lat: 28.121,
    lon: -16.746,
    cats: ["beach", "nature", "nightlife"],
    blurb: "Dzika plaża (20 min dojścia); bębny, zachody.",
  },
];

export const DAYS: Day[] = [
  {
    id: 1,
    title: "Dzień 1 – Przylot, Candelaria & soft chill",
    hero: "Candelaria",
    summary:
      "Luźny start: spacer po Candelarii (bazylika), kąpiel i wieczorna kolacja w guachinche.",
    stops: ["candelaria"],
  },
  {
    id: 2,
    title: "Dzień 2 – Góry Anaga, Taganana, Benijo",
    hero: "Anaga",
    summary:
      "Las wawrzynowy, serpentyny z miradorami i dzika plaża Benijo (spacer + obiad z widokiem).",
    stops: [
      "cruzcarmen",
      "picoingles",
      "taganana",
      "benijo",
      "almaciga",
      "laguna",
    ],
  },
  {
    id: 3,
    title: "Dzień 3 – La Laguna, La Orotava, wino + północ",
    hero: "La Orotava",
    summary:
      "Kolorowe balkony i miradory; opcja Puerto de la Cruz, Icod (Drago) i Garachico (baseny).",
    stops: [
      "laguna",
      "humboldt",
      "orotava",
      "puerto",
      "icod",
      "garachico",
      "sauzal",
    ],
  },
  {
    id: 4,
    title: "Dzień 4 – Park Narodowy Teide (kolejka + Roques)",
    hero: "Teide",
    summary:
      "Kolejką na 3555 m (La Rambleta), miradory Pico Viejo/La Fortaleza, księżycowe Roques de García.",
    stops: [
      "teleferico_base",
      "rambleta",
      "roques",
      "ucanca",
      "samara",
      "vilaflor",
    ],
  },
  {
    id: 5,
    title: "Dzień 5 – Chill: Siam Park / El Médano / Adeje",
    hero: "Siam Park",
    summary:
      "Adrenalina w Siam Parku albo plażowanie i sporty wodne (El Médano, La Tejita) lub premium chill w Adeje.",
    stops: [
      "siam",
      "medano",
      "tejita",
      "mroja",
      "duque",
      "americas",
      "loscrist",
      "amarilla",
    ],
  },
  {
    id: 6,
    title: "Dzień 6 – Los Gigantes (rejs) + Masca",
    hero: "Los Gigantes",
    summary:
      "Poranny boat trip (delfiny/walenie) wzdłuż klifów, kąpiel w zatoce Masca i serpentyny do wioski.",
    stops: ["gigantes", "masca", "teno"],
  },
  {
    id: 7,
    title: "Dzień 7 – Sekrety SE: Abades, Diego Hernández, El Puertito",
    hero: "SE Wybrzeże",
    summary:
      "Urbex w Abades, hipisowska plaża Diego Hernández (zachód) i kameralne El Puertito (bywają żółwie).",
    stops: ["abades", "diego", "puertito"],
  },
  {
    id: 8,
    title: "Dzień 8 – Powrót / luz i pamiątki",
    hero: "Powrót",
    summary: "Zakupy, ostatnia kawa nad oceanem, oddanie aut i tankowanie.",
    stops: ["candelaria", "santacruz"],
  },
];

export const byId: Record<string, Place> = Object.fromEntries(
  PLACES.map((p) => [p.id, p])
) as Record<string, Place>;
