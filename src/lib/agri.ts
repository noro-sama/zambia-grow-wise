import type { WeatherData } from "./weather.functions";

export type Level = "High" | "Medium" | "Low";
export type Crop = {
  id: string;
  name: string;
  emoji: string;
  resilience: Level;
  water: Level;
  planting: string;
  tip: string;
};

export const CROPS: Crop[] = [
  {
    id: "sorghum",
    name: "Sorghum",
    emoji: "🌾",
    resilience: "High",
    water: "Low",
    planting: "Mid-November to mid-December",
    tip: "Thrives in dry spells. A strong choice for food security in Southern and Western provinces.",
  },
  {
    id: "groundnuts",
    name: "Groundnuts",
    emoji: "🥜",
    resilience: "High",
    water: "Low",
    planting: "Late November to mid-December",
    tip: "Fixes nitrogen and tolerates short dry spells. Plant early with the first good rains.",
  },
  {
    id: "soybeans",
    name: "Soybeans",
    emoji: "🫘",
    resilience: "Medium",
    water: "Medium",
    planting: "Late November to December",
    tip: "Choose early-maturing varieties to finish before the rains end.",
  },
  {
    id: "maize",
    name: "Maize",
    emoji: "🌽",
    resilience: "Low",
    water: "High",
    planting: "November, after 25mm+ of rain",
    tip: "Use drought-tolerant, early-maturing seed and conservation farming (ripping, mulching) to protect your yield.",
  },
];

export const DISTRICTS = [
  "Lusaka", "Ndola", "Kitwe", "Kabwe", "Livingstone", "Choma", "Chipata",
  "Kasama", "Mongu", "Solwezi", "Mansa", "Mazabuka",
];

export type AlertLevel = "good" | "caution" | "risk";

export function alertFor(w?: WeatherData | undefined): { level: AlertLevel; title: string; message: string } {
  if (!w) return { level: "caution", title: "Checking conditions…", message: "Loading the latest weather." };
  if (w.rainChance < 25 && w.temp >= 30)
    return {
      level: "risk",
      title: "El Niño Risk: Prepare for dry spells",
      message: "Choose drought-resistant crops and save soil moisture with mulch.",
    };
  if (w.rainChance < 50)
    return {
      level: "caution",
      title: "Caution: Uneven rains expected",
      message: "Plant early-maturing seed and stagger your planting.",
    };
  return { level: "good", title: "Good conditions for planting", message: "Rains look steady. A good time to prepare your fields." };
}

export function recommendCrop(w?: WeatherData | undefined): Crop {
  const a = alertFor(w).level;
  if (a === "risk") return CROPS[0];
  if (a === "caution") return CROPS[1];
  return CROPS[2];
}

export const RAINFALL = [
  { month: "Oct", historical: 18, predicted: 10 },
  { month: "Nov", historical: 90, predicted: 62 },
  { month: "Dec", historical: 190, predicted: 140 },
  { month: "Jan", historical: 220, predicted: 150 },
  { month: "Feb", historical: 180, predicted: 120 },
  { month: "Mar", historical: 95, predicted: 70 },
];
