// ======================= FILE: src/components/DayCard.tsx =======================
import React, { useRef } from "react";
import { useInView, motion } from "framer-motion";
import { CalendarFold, Clock, MapPin, Lightbulb, ExternalLink } from "lucide-react";
import { Day, byId, DETAILS, DAY_VARIANT_OVERRIDES } from "../data/data";
import { Chip, Section } from "./ui";
import Image from "next/image";

export function DayCard({
  day,
  pace,
  setPace,
  onFocusPlaceIds,
  variant,
}: {
  day: Day;
  pace: number;
  setPace: (n: number) => void;
  onFocusPlaceIds: (ids: string[]) => void;
  variant: 'A' | 'B';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px -20% 0px", once: false });
  const dayDetail = ((DETAILS as any)[variant] ?? (DETAILS as any).A)?.find?.(
    (x: any) => x.id === day.id
  );
  const effectiveDay = React.useMemo(() => ({
    ...day,
    ...((DAY_VARIANT_OVERRIDES?.[variant] ?? {})[day.id] ?? {}),
  }), [day, variant]);

  // Google Maps route URL builder (origin = base in El Médano)
  const routeUrl = React.useMemo(() => {
    const BASE_ID = "medano";
    const base = byId[BASE_ID];
    if (!base) return undefined;
    const uniqStops = Array.from(new Set(effectiveDay.stops));
    const targets = uniqStops
      .map((id) => byId[id])
      .filter((p): p is NonNullable<typeof p> => !!p)
      .filter((p) => p.id !== BASE_ID);
    if (targets.length === 0) return undefined;

    const toToken = (p: typeof base) => {
      const g = p.links?.find((l) => l.href.includes("google.com/maps"));
      if (g) {
        try {
          const u = new URL(g.href);
          const q = u.searchParams.get("query");
          if (q) return q; // lat,lon preferred for precision
        } catch {}
      }
      return `${p.name}, Tenerife`;
    };

    const origin = encodeURIComponent(toToken(base));
    const destinationPlace = targets[targets.length - 1];
    const destination = encodeURIComponent(toToken(destinationPlace));
    const waypointsList = targets.slice(0, -1);
    const waypoints = waypointsList.length
      ? "&waypoints=" + encodeURIComponent(waypointsList.map(toToken).join("|"))
      : "";
    return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving${waypoints}`;
  }, [effectiveDay.stops]);
  const tips: string[] = React.useMemo(() => {
    const arr: string[] = [];
    if (dayDetail?.highlights) arr.push(...dayDetail.highlights);
    if (dayDetail?.food) arr.push(...dayDetail.food.map((f: string) => `Jedzenie: ${f}`));
    if (dayDetail?.safety) arr.push(...dayDetail.safety.map((s: string) => `Bezpieczeństwo: ${s}`));
    if (arr.length === 0) {
      // Fallback: show stops without quotes
      return effectiveDay.stops.map((id) => `${byId[id]?.name || id} — kliknij, by zogniskować na mapie.`);
    }
    return arr;
  }, [dayDetail, effectiveDay.stops]);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: inView ? 1 : 0.4, y: inView ? 0 : 8 }}
      transition={{ duration: 0.6 }}
      className="rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 bg-gradient-to-br from-white/80 to-white/40 dark:from-black/40 dark:to-black/20 backdrop-blur shadow-md"
    >
      <div className="aspect-[16/7] w-full relative">
        {effectiveDay.img ? (
          <Image
            key={`${variant}-${day.id}-${effectiveDay.img}`}
            src={effectiveDay.img}
            alt={effectiveDay.title || day.hero}
            fill
            sizes="(max-width: 768px) 100vw, 1024px"
            className="object-cover"
            priority={day.id === 1}
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-sky-300/40 to-amber-300/40">
            <div className="text-3xl font-extrabold opacity-70">{day.hero}</div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0" />
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2 text-white/90 text-sm mb-1">
              <CalendarFold className="h-4 w-4" /> Dzień {day.id}
            </div>
            <h2 className="text-white text-2xl md:text-3xl font-bold drop-shadow">
              {effectiveDay.title}
            </h2>
          </div>
          {routeUrl && (
            <a
              href={routeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs bg-white/90 text-black hover:bg-white shadow"
              title="Otwórz trasę w Google Maps (start: El Médano)"
            >
              <ExternalLink className="h-3.5 w-3.5" /> Trasa Google Maps
            </a>
          )}
        </div>
      </div>
      <div className="p-5 md:p-6 space-y-6">
        <p className="text-sm opacity-80 leading-relaxed">{effectiveDay.summary}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Section
            title="Najważniejsze punkty"
            icon={<MapPin className="h-4 w-4" />}
          >
            <div className="flex flex-wrap gap-2">
              {effectiveDay.stops.map((id) => {
                const place = byId[id];
                const cats = place?.cats?.join(", ");
                const tip = [place?.blurb, cats ? `Kategorie: ${cats}` : ""]
                  .filter(Boolean)
                  .join(" • ");
                return (
                  <Chip
                    key={id}
                    onClick={() => onFocusPlaceIds([id])}
                    title={tip}
                  >
                    {place?.name || id}
                  </Chip>
                );
              })}
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
              {tips.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </Section>
        </div>
      </div>
    </motion.div>
  );
}
