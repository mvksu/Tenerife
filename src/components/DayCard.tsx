// ======================= FILE: src/components/DayCard.tsx =======================
import React, { useRef } from "react";
import { useInView, motion } from "framer-motion";
import { CalendarFold, Clock, MapPin, Lightbulb } from "lucide-react";
import { Day, byId } from "../data/data";
import { Chip, Section } from "./ui";

export function DayCard({
  day,
  pace,
  setPace,
  onFocusPlaceIds,
}: {
  day: Day;
  pace: number;
  setPace: (n: number) => void;
  onFocusPlaceIds: (ids: string[]) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px -20% 0px", once: false });
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
            <div className="flex items-center gap-2 text-white/90 text-sm mb-1">
              <CalendarFold className="h-4 w-4" /> Dzień {day.id}
            </div>
            <h2 className="text-white text-2xl md:text-3xl font-bold drop-shadow">
              {day.title}
            </h2>
          </div>
        </div>
      </div>
      <div className="p-5 md:p-6 space-y-6">
        <p className="text-sm opacity-80 leading-relaxed">{day.summary}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Section
            title="Najważniejsze punkty"
            icon={<MapPin className="h-4 w-4" />}
          >
            <div className="flex flex-wrap gap-2">
              {day.stops.map((id) => (
                <Chip key={id} onClick={() => onFocusPlaceIds([id])}>
                  {byId[id]?.name || id}
                </Chip>
              ))}
            </div>
          </Section>
          <Section title="Tempo dnia" icon={<Clock className="h-4 w-4" />}>
            <div className="space-y-2">
              <input
                type="range"
                min={0}
                max={100}
                value={pace}
                onChange={(e) => setPace(Number(e.target.value))}
                className="w-full accent-black dark:accent-white"
                aria-label="Pace slider"
              />
              <div className="text-xs opacity-70">
                {pace < 34
                  ? "🌿 Bardzo chillowo"
                  : pace < 67
                  ? "🙂 Spokojnie, 2–3 atrakcje"
                  : "⚡️ Dynamicznie (np. extra trek)"}
              </div>
            </div>
          </Section>
          <Section
            title="Tipy i uwagi"
            icon={<Lightbulb className="h-4 w-4" />}
          >
            <ul className="list-disc pl-5 text-sm space-y-1.5">
              {day.stops.map((id, i) => (
                <li key={i}>
                  "{byId[id]?.name}" – kliknij, by zogniskować na mapie.
                </li>
              ))}
            </ul>
          </Section>
        </div>
      </div>
    </motion.div>
  );
}
