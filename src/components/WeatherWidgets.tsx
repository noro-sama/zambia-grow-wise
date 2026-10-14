import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { AlertTriangle, CheckCircle2, CloudRain, Droplets, ShieldAlert, Thermometer } from "lucide-react";
import { getWeather, type WeatherData } from "@/lib/weather.functions";
import { alertFor } from "@/lib/agri";
import { Card } from "./AppShell";

export function useWeather(city: string) {
  const fn = useServerFn(getWeather);
  return useQuery({ queryKey: ["weather", city], queryFn: () => fn({ data: { city } }), staleTime: 600_000 });
}

const STYLES = {
  good: { cls: "bg-alert-good text-alert-good-foreground", Icon: CheckCircle2 },
  caution: { cls: "bg-alert-caution text-alert-caution-foreground", Icon: AlertTriangle },
  risk: { cls: "bg-alert-risk text-alert-risk-foreground", Icon: ShieldAlert },
};

export function AlertBanner({ weather }: { weather?: WeatherData }) {
  const a = alertFor(weather);
  const { cls, Icon } = STYLES[a.level];
  return (
    <div role="status" className={`flex gap-4 rounded-2xl p-5 ${cls}`}>
      <Icon className="h-10 w-10 shrink-0" aria-hidden />
      <div>
        <p className="text-sm font-bold uppercase tracking-wide opacity-90">Weather Alert</p>
        <p className="font-display text-2xl font-bold leading-tight">{a.title}</p>
        <p className="mt-1 text-lg">{a.message}</p>
      </div>
    </div>
  );
}

export function WeatherCard({ weather, loading }: { weather?: WeatherData; loading: boolean }) {
  return (
    <Card>
      <div className="flex items-baseline justify-between">
        <h2 className="font-display text-2xl font-bold">{weather?.city ?? "…"}</h2>
        <span className="text-lg capitalize text-muted-foreground">{weather?.description}</span>
      </div>
      {loading ? (
        <p className="mt-4 text-lg text-muted-foreground">Loading weather…</p>
      ) : weather ? (
        <div className="mt-4 grid grid-cols-3 gap-3 text-center">
          <Stat Icon={Thermometer} value={`${weather.temp}°C`} label="Temperature" />
          <Stat Icon={CloudRain} value={`${weather.rainChance}%`} label="Rain chance" />
          <Stat Icon={Droplets} value={`${weather.humidity}%`} label="Humidity" />
        </div>
      ) : (
        <p className="mt-4 text-lg">Could not load weather.</p>
      )}
      {weather?.demo && (
        <p className="mt-4 text-sm text-muted-foreground">Showing sample data — live weather appears once a valid OpenWeatherMap key is added.</p>
      )}
    </Card>
  );
}

function Stat({ Icon, value, label }: { Icon: typeof Thermometer; value: string; label: string }) {
  return (
    <div className="rounded-xl bg-secondary p-3">
      <Icon className="mx-auto h-7 w-7 text-primary" aria-hidden />
      <p className="mt-1 text-2xl font-bold">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
