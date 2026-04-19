# ☁ Skyvault — Weather Dashboard

A browser-based weather dashboard that lets users search any city and instantly see current conditions, an animated sky background, a 24-hour chart, and a 7-day forecast.

## 🌐 Live Demo

> Replace this with your real URL after deploying:  
> `https://YOUR_USERNAME.github.io/weather-dashboard/`

---

## ✨ Features

- 🔍 Search any city worldwide by name
- 📍 Geolocation — detect your current city automatically
- 🌤 Animated sky background that matches the weather (sun, stars, rain, snow, lightning)
- 🌡 Current temperature, feels-like, wind speed, humidity, and precipitation
- 📈 24-hour temperature line chart + precipitation bar chart (switchable tabs)
- 🗓 7-day forecast cards with weather icons
- 🕐 Live local clock showing real time in the searched city
- 💀 Loading skeleton while data is fetching
- ⚠️ Friendly error messages for invalid cities or network failures
- 📱 Fully responsive — works on mobile and desktop

---

## 🛠 Technologies Used

| Layer        | Technology                                         |
|--------------|----------------------------------------------------|
| Frontend     | HTML5, CSS3, Vanilla JavaScript (ES6+)             |
| Data format  | JSON via public REST APIs                          |
| APIs         | Open-Meteo (weather), Nominatim (reverse geocode)  |
| Chart        | Chart.js 4 (loaded via CDN)                        |
| Fonts        | Google Fonts — DM Serif Display + DM Sans          |
| Geolocation  | Browser Navigator API (built-in)                   |
| Deployment   | GitHub Pages (static hosting, no build step)       |

---

## 📡 APIs Used

### 1. Open-Meteo Geocoding API
- **URL**: `https://geocoding-api.open-meteo.com/v1/search`
- **Purpose**: Converts a city name string into latitude and longitude coordinates
- **API key**: Not required — fully free and open

### 2. Open-Meteo Weather API
- **URL**: `https://api.open-meteo.com/v1/forecast`
- **Purpose**: Returns current weather conditions, hourly temperature/precipitation, and 7-day daily forecast as JSON
- **API key**: Not required — fully free and open

### 3. Nominatim Reverse Geocoding API (OpenStreetMap)
- **URL**: `https://nominatim.openstreetmap.org/reverse`
- **Purpose**: Converts latitude/longitude (from geolocation) back into a human-readable city name
- **API key**: Not required — free and open

> **No backend required.** All three APIs support browser-side requests (CORS enabled) and require no server or API key. This is the documented justification for the no-backend approach as permitted by the project specification.

---

## 🗂 Project Structure

```
weather-dashboard/
├── index.html   — Page structure (semantic HTML5, no inline JS or styles)
├── style.css    — All visual styles, sky themes, animations, responsive layout
├── api.js       — All network requests: geocoding, weather fetch, reverse geocode
├── app.js       — DOM manipulation, event handling, charts, sky animation logic
└── README.md    — This file
```

### Architecture overview

```
User input (search / geolocation)
        ↓
    app.js  ← event listeners, DOM updates, chart rendering
        ↓
    api.js  ← fetch() calls, error throwing, JSON parsing
        ↓
  Open-Meteo APIs  →  JSON response
        ↓
    app.js  ← renderWeather(), applySkyTheme(), drawTempChart()
        ↓
  index.html DOM  ←  style.css themes
```

**Separation of concerns:**
- `index.html` — structure only (what elements exist)
- `style.css` — appearance only (what things look like, including animated sky themes)
- `api.js` — data only (all fetch calls, no DOM access)
- `app.js` — logic only (reads from api.js, writes to DOM, controls animations)

---

## 🚀 Setup & Deployment

### Run locally (no installation needed)
1. Download or clone all files into one folder
2. Open `index.html` directly in any modern browser
3. No server, no npm, no build step required

```bash
git clone https://github.com/YOUR_USERNAME/weather-dashboard.git
cd weather-dashboard
open index.html   # or just double-click it
```

### Deploy to GitHub Pages
1. Create a new **public** GitHub repository
2. Upload all files (`index.html`, `style.css`, `api.js`, `app.js`, `README.md`)
3. Go to **Settings → Pages → Source: Deploy from branch → main / root**
4. Click **Save** — your site goes live at:

```
https://YOUR_USERNAME.github.io/weather-dashboard/
```

> Update the Live Demo link at the top of this README once deployed.

---

## 🤖 AI Tool Usage Summary

**Tools used:** Claude by Anthropic

**What was AI-generated:**
- Initial HTML structure and file scaffolding
- CSS variables, sky theme classes, and keyframe animations
- `api.js` fetch functions and error handling patterns
- Chart.js configuration and tab-switching logic in `app.js`
- Geolocation handler and reverse geocoding integration
- Sky animation controller (`applySkyTheme`, rain/snow DOM injection, lightning scheduler)

**What was manually reviewed and understood:**
- All API endpoints — tested responses in browser DevTools Network tab
- WMO weather code table and how codes map to labels, icons, and sky themes
- How `async/await` works and why it's needed for sequential API calls
- How `try/catch` intercepts fetch errors and surfaces them in the UI
- How `classList.add/remove('hidden')` controls what the user sees
- Chart.js dataset structure and scale configuration
- CSS `@keyframes`, `backdrop-filter`, and `@media` queries
- How `navigator.geolocation.getCurrentPosition()` works

**Reflection:** AI was used to accelerate scaffolding and boilerplate. All code has been read, tested, and understood line by line. Every function can be explained, modified, and debugged independently.

---

## 🔮 Possible Future Improvements

- Cache last searched city using `localStorage` so it persists on refresh
- Add UV index and sunrise/sunset times from the API
- Add a map view using Leaflet.js showing the city location
- Unit toggle between Celsius and Fahrenheit
- PWA support — installable as a mobile app with offline caching
