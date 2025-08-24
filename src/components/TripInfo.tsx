// app/components/TripInfo.tsx
"use client";
import React from "react";
import { DayDetail, TripTips } from "../data/data";
import { ChevronDown } from "lucide-react";

type AccordProps = { title: React.ReactNode; children: React.ReactNode; defaultOpen?: boolean };
function Accord({ title, children, defaultOpen = false }: AccordProps) {
  const [open, setOpen] = React.useState<boolean>(defaultOpen);
  return (
    <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/30 backdrop-blur">
      <button
        onClick={() => setOpen((o: boolean) => !o)}
        className="w-full flex items-center justify-between px-4 py-3"
      >
        <span className="text-sm font-semibold">{title}</span>
        <ChevronDown
          className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="px-4 pb-4 text-sm space-y-2">{children}</div>}
    </div>
  );
}

export function DayDetailCard({ d }: { d: DayDetail }) {
  const highlights = d.highlights ?? [];
  const options = d.options ?? [];
  const food = d.food ?? [];
  const safety = d.safety ?? [];
  return (
    <div className="space-y-3">
      <Accord title="Opis dnia" defaultOpen>
        <p className="opacity-80 leading-relaxed">{d.intro}</p>
      </Accord>
      {d.when?.length > 0 && (
        <Accord title="Kiedy / rytm dnia" defaultOpen>
          <ul className="list-disc pl-5 space-y-1">
            {d.when.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </Accord>
      )}
      {d.driving && d.driving.length > 0 && (
        <Accord title="Czasy przejazdów">
          <ul className="list-disc pl-5 space-y-1">
            {d.driving.map((s, i) => (
              <li key={i}>
                <strong>{s.segment}:</strong> {s.time}
              </li>
            ))}
          </ul>
        </Accord>
      )}
      {highlights.length > 0 && (
        <Accord title="Najważniejsze punkty">
          <ul className="list-disc pl-5 space-y-1">
            {highlights.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </Accord>
      )}
      {options.length > 0 && (
        <Accord title="Opcje / warianty">
          <ul className="list-disc pl-5 space-y-1">
            {options.map((o, i) => (
              <li key={i}>{o}</li>
            ))}
          </ul>
        </Accord>
      )}
      {food.length > 0 && (
        <Accord title="Jedzenie / przerwy">
          <ul className="list-disc pl-5 space-y-1">
            {food.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </Accord>
      )}
      {safety.length > 0 && (
        <Accord title="Bezpieczeństwo">
          <ul className="list-disc pl-5 space-y-1">
            {safety.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </Accord>
      )}
    </div>
  );
}

export function TripTipsPanel({ tips }: { tips: TripTips }) {
  return (
    <div className="space-y-3">
      <h3 className="text-base font-semibold">Tipy na wyjazd</h3>
      {Object.entries(tips).map(([k, arr]) => (
        <div
          key={k}
          className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-black/30 p-4"
        >
          <div className="text-xs uppercase tracking-wide opacity-60 mb-2">
            {(
              {
                packing: "Pakowanie",
                permits: "Permity / pozwolenia",
                weather: "Pogoda / warunki",
                driving: "Jazda / dojazdy",
                misc: "Różne"
              } as Record<string, string>
            )[k] || k}
          </div>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {arr.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
