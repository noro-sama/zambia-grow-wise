import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, CalendarDays } from "lucide-react";
import { AppShell, Card } from "@/components/AppShell";
import { AlertBanner, WeatherCard, useWeather } from "@/components/WeatherWidgets";
import { RainfallChart } from "@/components/RainfallChart";
import { recommendCrop } from "@/lib/agri";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AgriSense Zambia — Climate-smart farming dashboard" },
      { name: "description", content: "Weather alerts and El Niño-aware crop advice for Zambian smallholder farmers." },
      { property: "og:title", content: "AgriSense Zambia — Climate-smart farming" },
      { property: "og:description", content: "Weather alerts and El Niño-aware crop advice for Zambian farmers." },
    ],
  }),
  component: Index,
});

function Index() {
  const { data, isLoading } = useWeather("Lusaka");
  const crop = recommendCrop(data);
  return (
    <AppShell>
      <AlertBanner weather={data} />
      <WeatherCard weather={data} loading={isLoading} />
      <Card className="border-2 border-primary">
        <div className="flex items-center gap-2 text-primary">
          <Sparkles className="h-7 w-7" aria-hidden />
          <h2 className="font-display text-2xl font-bold">AI Recommendation</h2>
        </div>
        <p className="mt-3 text-xl leading-relaxed">
          Based on current El Niño patterns, we recommend planting{" "}
          <strong className="text-primary">{crop.emoji} {crop.name}</strong>.
        </p>
        <p className="mt-3 flex items-center gap-2 text-lg">
          <CalendarDays className="h-6 w-6 text-earth" aria-hidden />
          Best planting window: <strong>{crop.planting}</strong>
        </p>
        <Link to="/crops" className="mt-4 inline-block rounded-xl bg-primary px-5 py-3 text-lg font-bold text-primary-foreground">
          See all crops
        </Link>
      </Card>
      <RainfallChart />
    </AppShell>
  );
}
