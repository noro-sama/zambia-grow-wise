import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { AlertBanner, WeatherCard, useWeather } from "@/components/WeatherWidgets";
import { DISTRICTS } from "@/lib/agri";

export const Route = createFileRoute("/weather")({
  head: () => ({
    meta: [
      { title: "Weather by District — AgriSense Zambia" },
      { name: "description", content: "Check current weather for your Zambian district or province." },
      { property: "og:title", content: "Weather by District — AgriSense Zambia" },
      { property: "og:description", content: "Current weather for your district in Zambia." },
    ],
  }),
  component: WeatherPage,
});

function WeatherPage() {
  const [input, setInput] = useState("");
  const [city, setCity] = useState("Lusaka");
  const { data, isLoading } = useWeather(city);
  return (
    <AppShell>
      <h1 className="font-display text-3xl font-bold">Your local weather</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (input.trim()) setCity(input.trim());
        }}
        className="flex gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your district, e.g. Choma"
          aria-label="District or province"
          className="min-w-0 flex-1 rounded-xl border-2 border-input bg-card px-4 py-3 text-lg outline-none focus:border-primary"
        />
        <button className="rounded-xl bg-primary px-4 text-primary-foreground" aria-label="Search">
          <Search className="h-7 w-7" />
        </button>
      </form>
      <div className="flex flex-wrap gap-2">
        {DISTRICTS.map((d) => (
          <button
            key={d}
            onClick={() => setCity(d)}
            className={`rounded-full px-4 py-2 text-base font-semibold ${d === city ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
          >
            {d}
          </button>
        ))}
      </div>
      <WeatherCard weather={data} loading={isLoading} />
      <AlertBanner weather={data} />
    </AppShell>
  );
}
