// FILE: app/page.tsx
"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Mountain, Map as MapIcon, Car, Info, Download } from "lucide-react";


import { DETAILS, TIPS, PLACES, DAYS, DAY_VARIANT_OVERRIDES } from "../data/data";
import { DayDetailCard, TripTipsPanel } from "../components/TripInfo";
import { DayCard } from "../components/DayCard";
import { Chip } from "../components/ui";

// Leaflet musi być tylko po stronie klienta:
const LeafletMap = dynamic(
  () => import("../components/LeafletMap").then((m) => m.LeafletMap),
  { ssr: false }
);

export default function Page() {
  const [activeDay, setActiveDay] = React.useState(1);
  const [paceByDay, setPaceByDay] = React.useState<Record<number, number>>(
    Object.fromEntries(DAYS.map((d) => [d.id, 33])) as Record<number, number>
  );
  const [focusedIds, setFocusedIds] = React.useState<string[]>([]);
  const [dark, setDark] = React.useState(true);
  const [variant, setVariant] = React.useState<'A' | 'B'>('A');
  const [testResults, setTestResults] = React.useState<
    { name: string; ok: boolean; err?: any }[]
  >([]);
  const [mapStyle, setMapStyle] = React.useState<"OSM" | "CartoLight">(
    "CartoLight"
  );

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const visible = React.useMemo(() => PLACES, []);
  const activeStops = React.useMemo(() => {
    const base = DAYS[activeDay - 1].stops;
    const ov = (DAY_VARIANT_OVERRIDES?.[variant] ?? {})[activeDay]?.stops as
      | string[]
      | undefined;
    return ov ?? base;
  }, [activeDay, variant]);

  const printPDF = () => window.print();
  const pushTest = (name: string, ok: boolean, err?: any) =>
    setTestResults((prev) => [...prev, { name, ok, err }]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-white to-amber-50 dark:from-zinc-950 dark:via-zinc-950 dark:to-black text-zinc-900 dark:text-zinc-100">
      {/* HEADER */}
      <header className="sticky top-0 z-50 backdrop-blur bg-white/60 dark:bg-black/50 border-b border-black/10 dark:border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-3">
          <Mountain className="h-6 w-6" />
          <div className="font-semibold">
            Babilon Tenerife Planner 
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => setDark((d) => !d)}
              className="px-3 py-1.5 rounded-full text-xs border border-black/10 dark:border-white/10"
            >
              {dark ? "🌙 Dark" : "☀️ Light"}
            </button>
            <div className="inline-flex items-center text-xs rounded-full overflow-hidden border border-black/10 dark:border-white/10">
              <button
                onClick={() => setVariant('A')}
                className={`px-3 py-1.5 ${variant === 'A' ? 'bg-black/80 text-white dark:bg-white/80 dark:text-black' : 'bg-transparent'}`}
                title="Wariant A"
              >
                Wariant A
              </button>
              <button
                onClick={() => setVariant('B')}
                className={`px-3 py-1.5 border-l border-black/10 dark:border-white/10 ${variant === 'B' ? 'bg-black/80 text-white dark:bg-white/80 dark:text-black' : 'bg-transparent'}`}
                title="Wariant B"
              >
                Wariant B
              </button>
            </div>
            <button
              onClick={printPDF}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs border border-black/10 dark:border-white/10"
            >
              <Download className="h-3.5 w-3.5" /> PDF (drukuj)
            </button>
          </div>
        </div>
      </header>

      {/* HERO + ZAŁOŻENIA */}
      <section className="mx-auto max-w-7xl px-4 pt-8 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 items-stretch">
          <div className="relative overflow-hidden rounded-3xl border border-black/10 dark:border-white/10 shadow">
            <div className="h-full w-full grid place-items-center bg-gradient-to-br from-sky-300/40 to-amber-300/40">
              <div className="text-3xl md:text-4xl font-extrabold text-black/80 dark:text-white/80">
                
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="inline-flex items-center gap-2 text-white/90 text-xs font-medium mb-2">
                <Car className="h-4 w-4" /> 8 osób • 26.09 – 04.10 • Baza: El
                Médano • Auta: ✅
              </div>
              <p className="text-white/90 text-sm mt-1 max-w-xl">
                Priorytet: Teide. Miks: Anaga, kolonialne miasteczka, Los
                Gigantes, naturalne baseny, dzikie plaże i nightlife.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/30 backdrop-blur p-5 shadow flex flex-col gap-4">
            <div className="flex items-center gap-2 text-sm opacity-80">
              <Info className="h-4 w-4" /> Założenia
            </div>
            <ul className="text-sm space-y-2">
              <li>
                • Spokojne tempo (2–3 atrakcje/dzień) + mocny dzień na Teide.
              </li>
              <li>
                • Część ekipy może odpuścić długi trek – jest wariant kolejką.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* MAPA */}
      <section className="mx-auto max-w-7xl px-4 pb-8">
        <div className="rounded-3xl border border-black/10 dark:border-white/10 overflow-hidden shadow bg-white/60 dark:bg-black/30 backdrop-blur">
          <div className="flex items-center justify-between px-4 py-3 border-b border-black/10 dark:border-white/10">
            <div className="flex items-center gap-2 text-sm opacity-80">
              <MapIcon className="h-4 w-4" /> Mapa – Leaflet (OSM / Topo / Carto
              Light)
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <select
                value={mapStyle}
                onChange={(e) => setMapStyle(e.target.value as any)}
                className="text-xs border rounded px-2 py-1 bg-white/90 dark:bg-black/40"
              >
                <option value="OSM">OSM</option>
                <option value="CartoLight">Carto Dark</option>
              </select>
              {DAYS.map((d) => (
                <Chip
                  key={d.id}
                  active={activeDay === d.id}
                  onClick={() => setActiveDay(d.id)}
                >
                  D{d.id}
                </Chip>
              ))}
            </div>
          </div>
          {/* Dajemy stałą wysokość, żeby Leaflet miał miejsce do pomiaru */}
          <div className="relative h-[65vh] min-h-[420px]">
            <LeafletMap
              points={visible}
              focusId={focusedIds[0]}
              onFocus={(id) => setFocusedIds([id])}
              activeDayIds={activeStops}
              mapStyle={mapStyle}
              onInit={(st) =>
                pushTest("Leaflet init", !!(st && st.ok), st && st.error)
              }
              onStatus={(ev) => {
                if (ev.type === "style") pushTest(`Style → ${ev.style}`, true);
                if (ev.type === "route")
                  pushTest("Route drawn (count=1)", ev.count === 1, ev.count);
                if (ev.type === "focus") pushTest(`Focus → ${ev.id}`, true);
              }}
            />
          </div>
        </div>
      </section>

      {/* KARTY DNI + SZCZEGÓŁY TYLKO DLA AKTYWNEGO DNIA (z PDF) */}
      <section className="mx-auto max-w-7xl px-4 pb-20 space-y-8">
        {DAYS.map((d) => (
          <div key={`${variant}-${d.id}`} className="space-y-4">
            <DayCard
              day={d}
              pace={paceByDay[d.id]}
              setPace={(val) => setPaceByDay((p) => ({ ...p, [d.id]: val }))}
              onFocusPlaceIds={(ids) => setFocusedIds(ids)}
              variant={variant}
            />
            <div className="rounded-3xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/30 backdrop-blur p-5">
              {/* DETAILS to teraz obiekt z kluczem 'A' lub 'B' w niektórych moich wcześniejszych propozycjach.
                 Jeśli u Ciebie DETAILS jest jednym zestawem, zostaw poniżej bez '[A]'. */}
              <DayDetailCard
                d={
                  ((DETAILS as any)[variant] ?? (DETAILS as any).A)?.find?.(
                    (x: any) => x.id === d.id
                  ) ?? (DETAILS as any).find?.((x: any) => x.id === d.id)
                }
              />
            </div>
          </div>
        ))}
      </section>

      {/* TIPY GLOBALNE (z PDF) */}
      <section className="mx-auto max-w-7xl px-4 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-3xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/30 backdrop-blur p-6">
            <h3 className="text-lg font-semibold mb-3">
              Dlaczego te kolejności?
            </h3>
            <p className="text-sm opacity-80">
              Z El Médano dojazdy na północ są ~30 min dłuższe vs Candelaria,
              dlatego akcentujemy południe i Teide wcześnie, a dni z długimi
              serpentynami (Anaga, Masca) planujemy po aklimatyzacji.
            </p>
            <p className="text-sm opacity-80 mt-2">
              Dla Teide uwzględniamy bufor (zamiana dni), bo kolejka bywa
              wstrzymana przez wiatr. Bez permitu szczyt niedostępny — zostają
              miradory z ramblety, które i tak dają epicki widok.
            </p>
          </div>
          <div className="rounded-3xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/30 backdrop-blur p-6">
            <TripTipsPanel tips={TIPS} />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-black/10 dark:border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-8 text-xs opacity-70 space-y-2">
          <div>
            ⚠️ Bezpieczeństwo: silne fale na dzikich plażach (Benijo, Almáciga),
            kręte drogi górskie; na Teide chłodno i ostre słońce.
          </div>
          <div>
            ℹ️ Tip: kolejkę na Teide sprawdź pod kątem wiatru. Choroba
            wysokościowa bywa zdradliwa – nawadniajcie się.
          </div>
        </div>
      </footer>
    </div>
  );
}
