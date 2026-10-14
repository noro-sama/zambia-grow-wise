import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type WeatherData = {
  city: string;
  temp: number;
  description: string;
  humidity: number;
  rainChance: number; // 0-100, next 24h max
  demo: boolean;
};

function demoWeather(city: string): WeatherData {
  // deterministic demo values per city name
  let h = 0;
  for (const c of city.toLowerCase()) h = (h * 31 + c.charCodeAt(0)) % 997;
  return {
    city,
    temp: 26 + (h % 9),
    description: ["clear sky", "few clouds", "scattered clouds", "light rain"][h % 4]!,
    humidity: 30 + (h % 40),
    rainChance: (h * 7) % 85,
    demo: true,
  };
}

export const getWeather = createServerFn({ method: "GET" })
  .inputValidator((input) => z.object({ city: z.string().min(1).max(60) }).parse(input))
  .handler(async ({ data }): Promise<WeatherData> => {
    const key = process.env["OPENWEATHER_API_KEY"] || "111222333444";
    try {
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
        data.city,
      )},ZM&units=metric&cnt=8&appid=${key}`;
      const res = await fetch(url);
      if (!res.ok) return demoWeather(data.city);
      const json: any = await res.json();
      const first = json.list?.[0];
      if (!first) return demoWeather(data.city);
      const pop = Math.max(...json.list.map((i: any) => i.pop ?? 0));
      return {
        city: json.city?.name ?? data.city,
        temp: Math.round(first.main.temp),
        description: first.weather?.[0]?.description ?? "",
        humidity: first.main.humidity,
        rainChance: Math.round(pop * 100),
        demo: false,
      };
    } catch {
      return demoWeather(data.city);
    }
  });
