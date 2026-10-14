import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Droplet, Shield, CalendarDays } from "lucide-react";
import { AppShell, Card } from "@/components/AppShell";
import { CROPS, type Level } from "@/lib/agri";

export const Route = createFileRoute("/crops")({
  head: () => ({
    meta: [
      { title: "Crop Advisor — AgriSense Zambia" },
      { name: "description", content: "El Niño resilience, planting times and water needs for Zambian crops." },
      { property: "og:title", content: "Crop Advisor — AgriSense Zambia" },
      { property: "og:description", content: "Choose climate-resilient crops for this season." },
    ],
  }),
  component: Crops,
});

const levelCls: Record<Level, string> = {
  High: "bg-alert-good text-alert-good-foreground",
  Medium: "bg-alert-caution text-alert-caution-foreground",
  Low: "bg-alert-risk text-alert-risk-foreground",
};

function Crops() {
  const [open, setOpen] = useState<string | null>(CROPS[0]!.id);
  return (
    <AppShell>
      <h1 className="font-display text-3xl font-bold">Crop Advisor</h1>
      <p className="text-lg text-muted-foreground">Tap a crop to see how it handles El Niño dry spells.</p>
      {CROPS.map((c) => {
        const isOpen = open === c.id;
        return (
          <Card key={c.id} className="p-0">
            <button
              onClick={() => setOpen(isOpen ? null : c.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center gap-4 p-5 text-left"
            >
              <span className="text-4xl" aria-hidden>{c.emoji}</span>
              <span className="flex-1 font-display text-2xl font-bold">{c.name}</span>
              <ChevronDown className={`h-7 w-7 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>
            {isOpen && (
              <div className="space-y-3 border-t border-border p-5 text-lg">
                <Row Icon={Shield} label="El Niño Resilience">
                  <span className={`rounded-full px-3 py-1 font-bold ${levelCls[c.resilience]}`}>{c.resilience}</span>
                </Row>
                <Row Icon={Droplet} label="Water Requirement">
                  <span className="font-bold">{c.water}</span>
                </Row>
                <Row Icon={CalendarDays} label="Plant">
                  <span className="text-right font-bold">{c.planting}</span>
                </Row>
                <p className="rounded-xl bg-secondary p-4">{c.tip}</p>
              </div>
            )}
          </Card>
        );
      })}
    </AppShell>
  );
}

function Row({ Icon, label, children }: { Icon: typeof Shield; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="flex items-center gap-2"><Icon className="h-6 w-6 text-primary" />{label}</span>
      {children}
    </div>
  );
}
