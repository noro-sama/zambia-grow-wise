# Zambia Grow Wise

Prompt for Lovable:

"Build a mobile-first web application called 'AgriSense Zambia'. The goal is to help smallholder farmers make climate-resilient farming decisions based on El Niño weather patterns.

Design Style:

Clean, green, and earthy tones (greens, browns, whites).
Large, readable text (for farmers in rural areas).
Simple, intuitive icons.
Use a 'Card-based' layout for information.
Core Features & Pages:

Home Dashboard:
A prominent 'Weather Alert' banner that changes color based on conditions (Green for Good, Yellow for Caution, Red for El Niño Risk).
Current Location Weather (Temperature, Rainfall Probability).
'AI Recommendation' section: A simple card that says: 'Based on current El Niño patterns, we recommend planting [Crop Name]. Best planting window: [Date Range].'
Weather Input:
A search bar where users can enter their District/Province in Zambia (e.g., Lusaka, Copperbelt, Southern).
Display current weather data fetched from OpenWeatherMap API.
Crop Advisor (Static Data for Demo):
A list of common Zambian crops (Maize, Soybeans, Groundnuts).
When a user clicks a crop, show:
'El Niño Resilience Score' (High/Medium/Low).
'Recommended Planting Time' based on current season.
'Water Requirement' (Low/Medium/High).
About/Impact Section:
Brief text: 'Using AI and Climate Data to Nourish Tomorrow. Plant. Protect. Provide.'
Mention this is an innovation for the Pachipanda Challenge.
Technical Requirements:

Use React with Tailwind CSS.
Use Recharts for a simple graph showing 'Historical Rainfall vs. Current Prediction'.
API Integration: Integrate OpenWeatherMap API. Use this placeholder key for now: [111222333444]. Fetch weather data by city name (e.g., 'Lusaka').
Make it responsive for mobile phones.
Key Message:

Focus on removing fear: Instead of just saying 'Drought', say 'Prepare for dry spells by choosing drought-resistant crops.'
Highlight 'Smart Farming' and 'Food Security'."

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://zambia-grow-wise.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c330ccf9-7b91-4579-941b-dfd8a2a134ca).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
