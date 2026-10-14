import { Link } from "@tanstack/react-router";
import { Home, CloudSun, Sprout, Info } from "lucide-react";
import type { ReactNode } from "react";

const NAV = [
  { to: "/", label: "Home", icon: Home },
  { to: "/weather", label: "Weather", icon: CloudSun },
  { to: "/crops", label: "Crops", icon: Sprout },
  { to: "/about", label: "About", icon: Info },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background pb-28">
      <header className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-xl items-center gap-3 px-5 py-4">
          <Sprout className="h-8 w-8" aria-hidden />
          <div>
            <p className="font-display text-2xl font-bold leading-none">AgriSense Zambia</p>
            <p className="text-sm opacity-90">Smart Farming · Food Security</p>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-xl space-y-5 px-4 py-5">{children}</main>
      <nav className="fixed inset-x-0 bottom-0 z-10 border-t border-border bg-card">
        <ul className="mx-auto grid max-w-xl grid-cols-4">
          {NAV.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <Link
                to={to}
                activeOptions={{ exact: true }}
                className="flex flex-col items-center gap-1 py-3 text-base text-muted-foreground"
                activeProps={{ className: "text-primary font-bold" }}
              >
                <Icon className="h-7 w-7" aria-hidden />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string | undefined }) {
  return <section className={`rounded-2xl border border-border bg-card p-5 shadow-card ${className}`}>{children}</section>;
}
