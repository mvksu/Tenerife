// FILE: app/layout.tsx
import "./globals.css";
export const metadata = {
  title: "Interactive Tenerife Planner",
  description: "Leaflet + Next.js + Tailwind",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
