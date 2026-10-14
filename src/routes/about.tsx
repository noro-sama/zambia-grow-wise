import { createFileRoute } from "@tanstack/react-router";
import { Leaf, ShieldCheck, Wheat } from "lucide-react";
import { AppShell, Card } from "@/components/AppShell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About & Impact — AgriSense Zambia" },
      { name: "description", content: "Using AI and climate data to nourish tomorrow. An innovation for the Pachipanda Challenge." },
      { property: "og:title", content: "About AgriSense Zambia" },
      { property: "og:description", content: "Plant. Protect. Provide. An innovation for the Pachipanda Challenge." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <AppShell>
      <section className="rounded-2xl bg-primary p-6 text-primary-foreground">
        <h1 className="font-display text-3xl font-bold leading-tight">Using AI and Climate Data to Nourish Tomorrow.</h1>
        <p className="mt-3 text-2xl font-bold text-earth-light">Plant. Protect. Provide.</p>
      </section>
      <div className="grid gap-4">
        {[
          { Icon: Leaf, t: "Plant", d: "Choose the right crop at the right time for your district." },
          { Icon: ShieldCheck, t: "Protect", d: "Prepare for dry spells early, instead of reacting late." },
          { Icon: Wheat, t: "Provide", d: "Steady harvests for your family and Zambia's food security." },
        ].map(({ Icon, t, d }) => (
          <Card key={t} className="flex gap-4">
            <Icon className="h-10 w-10 shrink-0 text-primary" />
            <div>
              <h2 className="font-display text-2xl font-bold">{t}</h2>
              <p className="text-lg">{d}</p>
            </div>
          </Card>
        ))}
      </div>
      <Card className="bg-secondary">
        <p className="text-lg">
          AgriSense Zambia is an innovation for the <strong>Pachipanda Challenge</strong> — bringing smart farming
          and climate resilience to smallholder farmers.
        </p>
      </Card>
    </AppShell>
  );
}
