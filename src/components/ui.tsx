// =========================== FILE: src/components/ui.tsx ===========================
import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export function Chip({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
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
  );
}

export function Section({
  title,
  icon,
  children,
  defaultOpen = true,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/30 backdrop-blur shadow-sm overflow-hidden">
      <button
        className="flex w-full items-center gap-3 px-5 py-4 text-left"
        onClick={() => setOpen((o) => !o)}
      >
        {icon}
        <h3 className="text-lg font-semibold flex-1">{title}</h3>
        {open ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>
      {open && <div className="px-5 pb-5">{children}</div>}
    </div>
  );
}
