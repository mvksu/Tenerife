"use client"
import React, { useEffect, useMemo, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { MapPin, Mountain, Waves, UtensilsCrossed, PartyPopper, Car, CalendarFold, Info, ChevronDown, ChevronUp, Download, Filter, Compass, Lightbulb, Clock, Globe2, Map as MapIcon } from "lucide-react"

/**
 * Interactive Tenerife Planner – Leaflet basemap + routes + style switch
 * ----------------------------------------------------------------------
 * This version implements:
 *  - Full Leaflet tile map (local NPM import, no CDN JS) ✅
 *  - Day route polylines (ordered by `DAYS[x].stops`) ✅
 *  - Basemap style switcher (OSM / OpenTopo / Carto Light) ✅
 *  - Google Maps link in each POI popup ✅
 *  - Non-blocking runtime tests surfaced in a Dev/Test panel ✅
 *
 * If `leaflet` is not installed in your local project, install it:
 *    npm i leaflet
 * The CSS for Leaflet controls is optionally pulled from a public CDN for styling
 * only. If your environment blocks it, the map still works (controls might look
 * unstyled). You can instead import local CSS in your bundler build if preferred.
 */

// ------------------------------ Data layer ----------------------------------

const CATS = {
  nature: { label: "Nature", icon: <Mountain className="h-4 w-4" /> },
  beach: { label: "Beach", icon: <Waves className="h-4 w-4" /> },
  culture: { label: "Culture", icon: <Globe2 className="h-4 w-4" /> },
  food: { label: "Food", icon: <UtensilsCrossed className="h-4 w-4" /> },
  nightlife: { label: "Nightlife", icon: <PartyPopper className="h-4 w-4" /> },
  scenic: { label: "Scenic", icon: <Compass className="h-4 w-4" /> },
}

const place = (id, name, lat, lon, cats, blurb) => ({ id, name, lat, lon, cats, blurb })

const PLACES = [
  // Base & cities
  place("candelaria", "Candelaria (base)", 28.3549, -16.3716, ["culture", "food"], "Baza noclegowa; bazylika i posągi guanczańskich królów."),
  place("santacruz", "Santa Cruz de Tenerife", 28.4636, -16.2518, ["culture", "nightlife"], "Stolica wyspy: Auditorio, port, nightlife i zakupy."),
  place("laguna", "San Cristóbal de La Laguna (UNESCO)", 28.4874, -16.3159, ["culture", "nightlife", "food"], "Kolonialna starówka, studenckie bary, drewniane balkony."),

  // Anaga day
  place("cruzcarmen", "Centro Visitantes / Cruz del Carmen (Anaga)", 28.5245, -16.3009, ["nature", "scenic"], "Start na Sendero de los Sentidos i świetny mirador."),
  place("picoingles", "Mirador Pico del Inglés (Anaga)", 28.5242, -16.2678, ["scenic", "nature"], "Panorama obu wybrzeży i morze chmur."),
  place("taganana", "Taganana", 28.5683, -16.1906, ["culture", "scenic"], "Stara wioska na końcu świata."),
  place("benijo", "Playa de Benijo", 28.5676, -16.1978, ["nature", "beach", "scenic"], "Dzika czarna plaża; silne fale – ostrożnie."),
  place("almaciga", "Playa de Almáciga", 28.5632, -16.1974, ["beach", "nature"], "Czarny piasek, surferzy, fotomiejscówka."),

  // Culture & north
  place("humboldt", "Mirador de Humboldt", 28.4108, -16.5116, ["scenic"], "Widok na dolinę La Orotava i Teide."),
  place("orotava", "La Orotava", 28.3908, -16.5230, ["culture", "food"], "Kolonialna perła z kanaryjskimi balkonami."),
  place("puerto", "Puerto de la Cruz / Lago Martiánez", 28.415, -16.545, ["beach", "culture", "food"], "Kurort, ogrody Manrique, promenada."),
  place("icod", "Icod de los Vinos – Drago Milenario", 28.3665, -16.7169, ["culture", "nature"], "Słynne smocze drzewo, winiarskie tradycje."),
  place("garachico", "Garachico – El Caletón (baseny)", 28.3725, -16.762, ["beach", "nature", "culture"], "Lawowe baseny – kąpiel gdy spokojny ocean."),
  place("sauzal", "Casa del Vino – El Sauzal", 28.432, -16.447, ["food", "culture"], "Muzeum wina i degustacje."),

  // Teide day
  place("teleferico_base", "Teleférico del Teide – stacja dolna", 28.2511, -16.6256, ["nature", "scenic"], "Wjazd kolejką na 3555 m – opcja dla całej ekipy."),
  place("rambleta", "La Rambleta – stacja górna (3555 m)", 28.2716, -16.6425, ["nature", "scenic"], "Miradory Pico Viejo / La Fortaleza."),
  place("pico", "Pico del Teide (3718 m)", 28.2724, -16.6426, ["nature", "scenic"], "Wejście na czubek tylko z permitami."),
  place("mblanca", "Montaña Blanca – parking/szlak #7", 28.2507, -16.5983, ["nature", "scenic"], "Start długiego trekkingu (dla chętnych)."),
  place("roques", "Roques de García / Parador", 28.2165, -16.6405, ["nature", "scenic"], "1h pętla wśród formacji skalnych."),
  place("ucanca", "Mirador Llano de Ucanca", 28.217, -16.651, ["scenic"], "Rozległa równina kaldery."),
  place("samara", "Mirador Samara / TF-38", 28.239, -16.773, ["scenic"], "Stożki wulkaniczne, piękne zachody."),
  place("vilaflor", "Vilaflor", 28.160, -16.639, ["culture", "food"], "Najwyżej położona wioska; winnice."),

  // South chill
  place("siam", "Siam Park (Adeje)", 28.0798, -16.7247, ["nightlife", "beach"], "Najlepszy park wodny – adrenalina i chill."),
  place("medano", "El Médano", 28.046, -16.536, ["beach", "food"], "Surferskie miasteczko, szkoły kite/surf."),
  place("tejita", "Playa La Tejita", 28.045, -16.555, ["beach", "nature"], "Długa złota plaża pod Montaña Roja."),
  place("mroja", "Montaña Roja (171 m)", 28.042, -16.557, ["nature", "scenic"], "Krótka wspinaczka z panoramą na ocean."),
  place("duque", "Playa del Duque (Adeje)", 28.0957, -16.738, ["beach", "nightlife", "food"], "Premium plaża, beach cluby."),
  place("americas", "Playa de Las Américas (Verónicas)", 28.065, -16.73, ["nightlife", "beach"], "Pas klubów i imprezownie."),
  place("loscrist", "Los Cristianos", 28.055, -16.718, ["beach", "food"], "Promenada, port i restauracje."),
  place("amarilla", "Montaña Amarilla – snorkeling", 28.003, -16.6529, ["beach", "nature"], "Krystaliczna woda, bar na klifie."),

  // West – Gigantes & Masca
  place("gigantes", "Los Gigantes – klify / marina", 28.243, -16.841, ["nature", "scenic", "beach"], "Rejsy z delfinami; kąpiel z łodzi."),
  place("masca", "Masca (wioska)", 28.306, -16.833, ["nature", "scenic", "culture"], "Najpiękniejsza wioska; serpentyny TF-436."),
  place("teno", "Punta de Teno (latarnia)", 28.346, -16.929, ["scenic", "nature"], "Cypel na zachodzie – dojazd busami."),

  // SE coast gems
  place("abades", "Abades – opuszczone miasteczko", 28.162, -16.437, ["culture", "scenic"], "Leprozorium-widmo, graffiti, plaża."),
  place("puertito", "El Puertito de Adeje – żółwie (bywa)", 28.108, -16.744, ["nature", "beach"], "Kameralna zatoczka; bywa życie pod wodą."),
  place("diego", "Playa Diego Hernández (hippie)", 28.121, -16.746, ["beach", "nature", "nightlife"], "Dzika plaża (20 min dojścia); bębny, zachody."),
]

const DAYS = [
  { id: 1, title: "Dzień 1 – Przylot, Candelaria & soft chill", hero: "Candelaria", summary: "Luźny start: spacer po Candelarii (bazylika), kąpiel i wieczorna kolacja w guachinche.", stops: ["candelaria"] },
  { id: 2, title: "Dzień 2 – Góry Anaga, Taganana, Benijo", hero: "Anaga", summary: "Las wawrzynowy, serpentyny z miradorami i dzika plaża Benijo (spacer + obiad z widokiem).", stops: ["cruzcarmen", "picoingles", "taganana", "benijo", "almaciga", "laguna"] },
  { id: 3, title: "Dzień 3 – La Laguna, La Orotava, wino + północ", hero: "La Orotava", summary: "Kolorowe balkony i miradory; opcja Puerto de la Cruz, Icod (Drago) i Garachico (baseny).", stops: ["laguna", "humboldt", "orotava", "puerto", "icod", "garachico", "sauzal"] },
  { id: 4, title: "Dzień 4 – Park Narodowy Teide (kolejka + Roques)", hero: "Teide", summary: "Kolejką na 3555 m (La Rambleta), miradory Pico Viejo/La Fortaleza, księżycowe Roques de García.", stops: ["teleferico_base", "rambleta", "roques", "ucanca", "samara", "vilaflor"] },
  { id: 5, title: "Dzień 5 – Chill: Siam Park / El Médano / Adeje", hero: "Siam Park", summary: "Adrenalina w Siam Parku albo plażowanie i sporty wodne (El Médano, La Tejita) lub premium chill w Adeje.", stops: ["siam", "medano", "tejita", "mroja", "duque", "americas", "loscrist", "amarilla"] },
  { id: 6, title: "Dzień 6 – Los Gigantes (rejs) + Masca", hero: "Los Gigantes", summary: "Poranny boat trip (delfiny/walenie) wzdłuż klifów, kąpiel w zatoce Masca i serpentyny do wioski.", stops: ["gigantes", "masca", "teno"] },
  { id: 7, title: "Dzień 7 – Sekrety SE: Abades, Diego Hernández, El Puertito", hero: "SE Wybrzeże", summary: "Urbex w Abades, hipisowska plaża Diego Hernández (zachód) i kameralne El Puertito (bywają żółwie).", stops: ["abades", "diego", "puertito"] },
  { id: 8, title: "Dzień 8 – Powrót / luz i pamiątki", hero: "Powrót", summary: "Zakupy, ostatnia kawa nad oceanem, oddanie aut i tankowanie.", stops: ["candelaria", "santacruz"] },
]

const byId = Object.fromEntries(PLACES.map(p => [p.id, p]))

// ------------------------------ UI Primitives -------------------------------

function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-xs font-medium border transition ${
        active
          ? "bg-black/80 text-white dark:bg-white/90 dark:text-black"
          : "bg-white/70 dark:bg-black/40 backdrop-blur border-black/10 dark:border-white/10 hover:bg-white/90 dark:hover:bg-black/60"
      }`}
    >
      {children}
    </button>
  )
}

function Section({ title, icon, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/30 backdrop-blur shadow-sm overflow-hidden">
      <button className="flex w-full items-center gap-3 px-5 py-4 text-left" onClick={() => setOpen(o => !o)}>
        {icon}
        <h3 className="text-lg font-semibold flex-1">{title}</h3>
        {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
      {open && <div className="px-5 pb-5">{children}</div>}
    </div>
  )
}

function DayCard({ day, pace, setPace, onFocusPlaceIds }) {
  const ref = useRef(null)
  const inView = useInView(ref, { margin: "-20% 0px -20% 0px", once: false })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: inView ? 1 : 0.4, y: inView ? 0 : 8 }}
      transition={{ duration: 0.6 }}
      className="rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 bg-gradient-to-br from-white/80 to-white/40 dark:from-black/40 dark:to-black/20 backdrop-blur shadow-md"
    >
      <div className="aspect-[16/7] w-full relative">
        <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-sky-300/40 to-amber-300/40">
          <div className="text-3xl font-extrabold opacity-70">{day.hero}</div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0" />
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2 text-white/90 text-sm mb-1"><CalendarFold className="h-4 w-4" /> Dzień {day.id}</div>
            <h2 className="text-white text-2xl md:text-3xl font-bold drop-shadow">{day.title}</h2>
          </div>
        </div>
      </div>

      <div className="p-5 md:p-6 space-y-6">
        <p className="text-sm opacity-80 leading-relaxed">{day.summary}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Section title="Najważniejsze punkty" icon={<MapPin className="h-4 w-4" />}>
            <div className="flex flex-wrap gap-2">
              {day.stops.map(id => (
                <Chip key={id} active={false} onClick={() => onFocusPlaceIds([id])}>
                  {byId[id]?.name || id}
                </Chip>
              ))}
            </div>
          </Section>

          <Section title="Tempo dnia" icon={<Clock className="h-4 w-4" />}>
            <div className="space-y-2">
              <input type="range" min={0} max={100} value={pace} onChange={e => setPace(Number(e.target.value))} className="w-full accent-black dark:accent-white" aria-label="Pace slider" />
              <div className="text-xs opacity-70">
                {pace < 34 ? "🌿 Bardzo chillowo" : pace < 67 ? "🙂 Spokojnie, 2–3 atrakcje" : "⚡️ Dynamicznie (np. extra trek)"}
              </div>
            </div>
          </Section>

          <Section title="Tipy i uwagi" icon={<Lightbulb className="h-4 w-4" />}>
            <ul className="list-disc pl-5 text-sm space-y-1.5">
              {day.stops.map((id, i) => (
                <li key={i}>"{byId[id]?.name}" – kliknij, by zogniskować na mapie.</li>
              ))}
            </ul>
          </Section>
        </div>
      </div>
    </motion.div>
  )
}

// ------------------------------ Leaflet Map ---------------------------------

function LeafletMap({ points, focusId, onFocus, activeDayIds, onInit, onStatus, mapStyle }) {
  const mapRef = useRef(null)
  const containerRef = useRef(null)
  const markersGroupRef = useRef(null)
  const routeGroupRef = useRef(null)
  const tileLayerRef = useRef(null)
  const markerByIdRef = useRef(new Map())
  const LRef = useRef(null)

  // init map once
  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const mod = await import('leaflet')
        const L = mod.default || mod
        LRef.current = L
        if (!mounted) return

        // Optional CSS for Leaflet controls (non-blocking if offline)
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
        link.crossOrigin = ''
        document.head.appendChild(link)

        const el = containerRef.current
        if (!el) throw new Error('Missing map container')

        const map = L.map(el, {
          center: [28.2916, -16.6291],
          zoom: 9,
          zoomControl: true,
          attributionControl: true,
        })
        mapRef.current = map

        // Layers
        markersGroupRef.current = L.layerGroup().addTo(map)
        routeGroupRef.current = L.layerGroup().addTo(map)

        // First tile layer
        const tl = createTileLayer(L, mapStyle)
        tileLayerRef.current = tl
        tl.addTo(map)

        // Markers with popups
        markerByIdRef.current.clear()
        points.forEach(p => {
          const popupHtml = `<strong>${escapeHtml(p.name)}</strong><br/>${escapeHtml(p.blurb || '')}<br/><a href="https://www.google.com/maps/search/?api=1&query=${p.lat},${p.lon}" target="_blank" rel="noopener noreferrer">Otwórz w Google Maps</a>`
          const m = L.circleMarker([p.lat, p.lon], { radius: 6, color: '#10b981', weight: 2, fillColor: '#10b981', fillOpacity: 0.9 })
            .addTo(markersGroupRef.current)
            .bindPopup(popupHtml)
          m.on('click', () => onFocus && onFocus(p.id))
          markerByIdRef.current.set(p.id, m)
        })

        // Initial fit + route
        if (activeDayIds && activeDayIds.length) {
          fitToIds(L, map, points, activeDayIds)
          drawRoute(L, routeGroupRef.current, points, activeDayIds)
        }

        onInit && onInit({ ok: true })
      } catch (err) {
        onInit && onInit({ ok: false, error: String(err) })
      }
    })()
    return () => { mounted = false; try { mapRef.current && mapRef.current.remove() } catch (_) {} }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Switch basemap style
  useEffect(() => {
    const L = LRef.current
    const map = mapRef.current
    if (!L || !map) return
    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current)
    }
    const tl = createTileLayer(L, mapStyle)
    tileLayerRef.current = tl
    tl.addTo(map)
    onStatus && onStatus({ type: 'style', style: mapStyle })
  }, [mapStyle])

  // Focus on POI
  useEffect(() => {
    const L = LRef.current
    const map = mapRef.current
    if (!L || !map || !focusId) return
    const m = markerByIdRef.current.get(focusId)
    if (m) {
      map.setView(m.getLatLng(), Math.max(map.getZoom(), 12), { animate: true })
      m.openPopup()
      onStatus && onStatus({ type: 'focus', id: focusId })
    }
  }, [focusId])

  // Fit & redraw route when the day changes
  useEffect(() => {
    const L = LRef.current
    const map = mapRef.current
    if (!L || !map || !activeDayIds || activeDayIds.length === 0) return
    routeGroupRef.current.clearLayers()
    fitToIds(L, map, points, activeDayIds)
    const count = drawRoute(L, routeGroupRef.current, points, activeDayIds)
    onStatus && onStatus({ type: 'route', count })
  }, [activeDayIds?.join(',')])

  return <div ref={containerRef} className="absolute inset-0" />
}

function escapeHtml(str) {
  return String(str).replace(/[&<>'"]/g, s => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '\'': '&#39;', '"': '&quot;' }[s]))
}

function createTileLayer(L, style) {
  switch (style) {
    case 'Topo':
      return L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', { maxZoom: 17, attribution: '&copy; OpenTopoMap, &copy; OpenStreetMap' })
    case 'CartoLight':
      return L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { maxZoom: 19, attribution: '&copy; Carto, &copy; OpenStreetMap' })
    default:
      return L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; OpenStreetMap contributors' })
  }
}

function fitToIds(L, map, points, ids) {
  const sel = points.filter(p => ids.includes(p.id))
  if (!sel.length) return 0
  const b = L.latLngBounds(sel.map(p => [p.lat, p.lon]))
  map.fitBounds(b, { padding: [44, 44] })
  return sel.length
}

function drawRoute(L, group, points, ids) {
  const sel = points.filter(p => ids.includes(p.id))
  if (sel.length < 2) return 0
  const latlngs = ids.map(id => {
    const p = points.find(pp => pp.id === id)
    return [p.lat, p.lon]
  })
  const poly = L.polyline(latlngs, { color: '#2563eb', weight: 3, opacity: 0.95 })
  group.addLayer(poly)
  // Optional: add small dots along the route
  latlngs.forEach(ll => group.addLayer(L.circleMarker(ll, { radius: 2, color: '#2563eb', fillColor: '#2563eb', fillOpacity: 1 })))
  return 1
}

// ------------------------------ Main App ------------------------------------

export default function TenerifePlanner() {
  const [activeDay, setActiveDay] = useState(1)
  const [paceByDay, setPaceByDay] = useState(() => Object.fromEntries(DAYS.map(d => [d.id, 33])))
  const [focusedIds, setFocusedIds] = useState([])
  const [dark, setDark] = useState(true)
  const [testResults, setTestResults] = useState([])
  const [mapStyle, setMapStyle] = useState('OSM')

  useEffect(() => { document.documentElement.classList.toggle('dark', dark) }, [dark])

  const visible = useMemo(() => PLACES, [])
  const activeStops = useMemo(() => DAYS[activeDay - 1].stops, [activeDay])
  const printPDF = () => window.print()

  function pushTest(name, ok, err) {
    setTestResults(prev => [...prev, { name, ok, err }])
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-white to-amber-50 dark:from-zinc-950 dark:via-zinc-950 dark:to-black text-zinc-900 dark:text-zinc-100">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur bg-white/60 dark:bg-black/50 border-b border-black/10 dark:border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-3">
          <Mountain className="h-6 w-6" />
          <div className="font-semibold">Interactive Tenerife Planner – Candelaria Base</div>
          <div className="ml-auto flex items-center gap-2">
            <button onClick={() => setDark(d => !d)} className="px-3 py-1.5 rounded-full text-xs border border-black/10 dark:border-white/10">{dark ? '🌙 Dark' : '☀️ Light'}</button>
            <button onClick={printPDF} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs border border-black/10 dark:border-white/10"><Download className="h-3.5 w-3.5" /> PDF (drukuj)</button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pt-8 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 items-stretch">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative overflow-hidden rounded-3xl border border-black/10 dark:border-white/10 shadow">
            <div className="h-full w-full grid place-items-center bg-gradient-to-br from-sky-300/40 to-amber-300/40">
              <div className="text-3xl md:text-4xl font-extrabold text-black/80 dark:text-white/80">Zajebisty plan Teneryfy</div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="inline-flex items-center gap-2 text-white/90 text-xs font-medium mb-2"><Car className="h-4 w-4" /> 8 osób • 26.09 – 04.10 • Baza: Candelaria • Auta: ✅</div>
              <p className="text-white/90 text-sm mt-1 max-w-xl">Priorytet: Teide. Miks: Anaga, kolonialne miasteczka, Los Gigantes, naturalne baseny, dzikie plaże i nightlife.</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="rounded-3xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/30 backdrop-blur p-5 shadow flex flex-col gap-4">
            <div className="flex items-center gap-2 text-sm opacity-80"><Info className="h-4 w-4" /> Założenia</div>
            <ul className="text-sm space-y-2">
              <li>• Spokojne tempo (2–3 atrakcje/dzień) + mocny dzień na Teide.</li>
              <li>• Część ekipy może odpuścić długi trek – jest wariant kolejką.</li>
              <li>• Pełna mapa Leaflet + linie tras + linki do Google Maps.</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Map & day selector */}
      <section className="mx-auto max-w-7xl px-4 pb-8">
        <div className="rounded-3xl border border-black/10 dark:border-white/10 overflow-hidden shadow bg-white/60 dark:bg-black/30 backdrop-blur">
          <div className="flex items-center justify-between px-4 py-3 border-b border-black/10 dark:border-white/10">
            <div className="flex items-center gap-2 text-sm opacity-80"><MapIcon className="h-4 w-4" /> Mapa – Leaflet (OSM / Topo / Carto Light)</div>
            <div className="flex items-center gap-2 flex-wrap">
              <select value={mapStyle} onChange={e => setMapStyle(e.target.value)} className="text-xs border rounded px-2 py-1 bg-white/90 dark:bg-black/40">
                <option value="OSM">OSM</option>
                <option value="Topo">Topographic</option>
                <option value="CartoLight">Carto Light</option>
              </select>
              {DAYS.map(d => (
                <Chip key={d.id} active={activeDay === d.id} onClick={() => setActiveDay(d.id)}>D{d.id}</Chip>
              ))}
            </div>
          </div>

          <div className="relative h-[56vh]">
            <LeafletMap
              points={visible}
              focusId={focusedIds[0]}
              onFocus={(id) => setFocusedIds([id])}
              activeDayIds={activeStops}
              mapStyle={mapStyle}
              onInit={(st) => pushTest('Leaflet init', !!(st && st.ok), st && st.error)}
              onStatus={(ev) => {
                if (ev.type === 'style') pushTest(`Style → ${ev.style}`, true)
                if (ev.type === 'route') pushTest('Route drawn (count=1)', ev.count === 1, ev.count)
                if (ev.type === 'focus') pushTest(`Focus → ${ev.id}`, true)
              }}
            />
          </div>
        </div>
      </section>

      {/* Days */}
      <section className="mx-auto max-w-7xl px-4 pb-20 space-y-8">
        {DAYS.map(d => (
          <DayCard
            key={d.id}
            day={d}
            pace={paceByDay[d.id]}
            setPace={(val) => setPaceByDay(p => ({ ...p, [d.id]: val }))}
            onFocusPlaceIds={(ids) => setFocusedIds(ids)}
          />
        ))}
      </section>

      {/* Footer / Dev tests */}
      <footer className="border-t border-black/10 dark:border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-8 text-xs opacity-70 space-y-2">
          <div>⚠️ Bezpieczeństwo: silne fale na dzikich plażach (Benijo, Almáciga), kręte drogi górskie; na Teide chłodno i ostre słońce.</div>
          <div>ℹ️ Tip: kolejkę na Teide sprawdź pod kątem wiatru. Choroba wysokościowa bywa zdradliwa – nawadniajcie się.</div>
          <details>
            <summary className="cursor-pointer">Dev/Test panel</summary>
            <div className="mt-2 space-y-1">
              <div>Wyniki testów:</div>
              <ul className="list-disc pl-6">
                {testResults.map((t, i) => (
                  <li key={i} className={t.ok ? "text-emerald-600" : "text-red-600"}>
                    {t.ok ? '✔' : '✖'} {t.name}{t.err ? ` – ${t.err}` : ''}
                  </li>
                ))}
              </ul>
            </div>
          </details>
        </div>
      </footer>
    </div>
  )
}
