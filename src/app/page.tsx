"use client";
import React from "react";
import { Mountain, Map as MapIcon, Car, Info, Download } from "lucide-react";
import { PLACES, DAYS } from "../data/data";
import { LeafletMap } from "../components/LeafletMap";
import { DayCard } from "../components/DayCard";
import { Chip } from "../components/ui";

export default function Page() {
  const [activeDay, setActiveDay] = React.useState(1);
  const [paceByDay, setPaceByDay] = React.useState(
    Object.fromEntries(DAYS.map((d) => [d.id, 33])) as Record<number, number>
  );
  const [focusedIds, setFocusedIds] = React.useState<string[]>([]);
  const [dark, setDark] = React.useState(true);
  const [testResults, setTestResults] = React.useState<
    { name: string; ok: boolean; err?: any }[]
  >([]);
  const [mapStyle, setMapStyle] = React.useState<"OSM" | "Topo" | "CartoLight">(
    "OSM"
  );

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const visible = React.useMemo(() => PLACES, []);
  const activeStops = React.useMemo(
    () => DAYS[activeDay - 1].stops,
    [activeDay]
  );
  const printPDF = () => window.print();
  const pushTest = (name: string, ok: boolean, err?: any) =>
    setTestResults((prev) => [...prev, { name, ok, err }]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-white to-amber-50 dark:from-zinc-950 dark:via-zinc-950 dark:to-black text-zinc-900 dark:text-zinc-100">
      <header className="sticky top-0 z-50 backdrop-blur bg-white/60 dark:bg-black/50 border-b border-black/10 dark:border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-3">
          <Mountain className="h-6 w-6" />
          <div className="font-semibold">
            Interactive Tenerife Planner – Candelaria Base
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => setDark((d) => !d)}
              className="px-3 py-1.5 rounded-full text-xs border border-black/10 dark:border-white/10"
            >
              {dark ? "🌙 Dark" : "☀️ Light"}
            </button>
            <button
              onClick={printPDF}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs border border-black/10 dark:border-white/10"
            >
              <Download className="h-3.5 w-3.5" /> PDF (drukuj)
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 pt-8 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 items-stretch">
          <div className="relative overflow-hidden rounded-3xl border border-black/10 dark:border-white/10 shadow">
            <div className="h-full w-full grid place-items-center bg-gradient-to-br from-sky-300/40 to-amber-300/40">
              <div className="text-3xl md:text-4xl font-extrabold text-black/80 dark:text-white/80">
                Zajebisty plan Teneryfy
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="inline-flex items-center gap-2 text-white/90 text-xs font-medium mb-2">
                <Car className="h-4 w-4" /> 8 osób • 26.09 – 04.10 • Baza:
                Candelaria • Auta: ✅
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
              <li>• Pełna mapa Leaflet + linie tras + linki do Google Maps.</li>
            </ul>
          </div>
        </div>
      </section>

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
                <option value="Topo">Topographic</option>
                <option value="CartoLight">Carto Light</option>
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
          <div className="relative h-[56vh]">
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

      <section className="mx-auto max-w-7xl px-4 pb-20 space-y-8">
        {DAYS.map((d) => (
          <DayCard
            key={d.id}
            day={d}
            pace={paceByDay[d.id]}
            setPace={(val) => setPaceByDay((p) => ({ ...p, [d.id]: val }))}
            onFocusPlaceIds={(ids) => setFocusedIds(ids)}
          />
        ))}
      </section>

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
