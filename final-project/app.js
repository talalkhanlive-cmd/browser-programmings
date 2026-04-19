// app.js — UI logic, weather icons, sky animations, DOM manipulation

// ── WMO weather code → label + emoji + sky theme ──────────────────────────
function describeWeatherCode(code, isNight) {
  const night = isNight;
  const map = {
    0:  { label: 'Clear sky',       icon: night ? '🌙' : '☀️',  sky: night ? 'sky-clear-night' : 'sky-clear-day' },
    1:  { label: 'Mainly clear',    icon: night ? '🌙' : '🌤',  sky: night ? 'sky-clear-night' : 'sky-clear-day' },
    2:  { label: 'Partly cloudy',   icon: '⛅',  sky: 'sky-cloudy' },
    3:  { label: 'Overcast',        icon: '☁️',  sky: 'sky-cloudy' },
    45: { label: 'Foggy',           icon: '🌫',  sky: 'sky-fog' },
    48: { label: 'Icy fog',         icon: '🌫',  sky: 'sky-fog' },
    51: { label: 'Light drizzle',   icon: '🌦',  sky: 'sky-rain' },
    53: { label: 'Drizzle',         icon: '🌦',  sky: 'sky-rain' },
    55: { label: 'Heavy drizzle',   icon: '🌧',  sky: 'sky-rain' },
    61: { label: 'Slight rain',     icon: '🌧',  sky: 'sky-rain' },
    63: { label: 'Rain',            icon: '🌧',  sky: 'sky-rain' },
    65: { label: 'Heavy rain',      icon: '🌧',  sky: 'sky-rain' },
    71: { label: 'Light snow',      icon: '🌨',  sky: 'sky-snow' },
    73: { label: 'Snow',            icon: '❄️',  sky: 'sky-snow' },
    75: { label: 'Heavy snow',      icon: '❄️',  sky: 'sky-snow' },
    77: { label: 'Snow grains',     icon: '🌨',  sky: 'sky-snow' },
    80: { label: 'Rain showers',    icon: '🌦',  sky: 'sky-rain' },
    81: { label: 'Rain showers',    icon: '🌧',  sky: 'sky-rain' },
    82: { label: 'Heavy showers',   icon: '⛈',  sky: 'sky-storm' },
    85: { label: 'Snow showers',    icon: '🌨',  sky: 'sky-snow' },
    86: { label: 'Heavy snow',      icon: '❄️',  sky: 'sky-snow' },
    95: { label: 'Thunderstorm',    icon: '⛈',  sky: 'sky-storm' },
    96: { label: 'Thunderstorm',    icon: '⛈',  sky: 'sky-storm' },
    99: { label: 'Severe storm',    icon: '🌩',  sky: 'sky-storm' },
  };
  return map[code] ?? { label: 'Unknown', icon: '🌡', sky: 'sky-cloudy' };
}

// ── Sky animation controller ───────────────────────────────────────────────
const SKY_THEMES = ['sky-clear-day','sky-clear-night','sky-cloudy','sky-rain','sky-snow','sky-storm','sky-fog'];

function applySkyTheme(theme, isNight) {
  SKY_THEMES.forEach(t => document.body.classList.remove(t));
  document.body.classList.add(theme);

  const sun       = document.getElementById('sun');
  const moon      = document.getElementById('moon');
  const stars     = document.getElementById('stars');
  const clouds    = document.getElementById('clouds');
  const rainWrap  = document.getElementById('rain-wrap');
  const snowWrap  = document.getElementById('snow-wrap');

  sun.style.opacity    = (!isNight && (theme === 'sky-clear-day' || theme === 'sky-cloudy')) ? '1' : '0';
  moon.style.opacity   = isNight ? '1' : '0';
  stars.style.opacity  = isNight ? '1' : '0';
  clouds.style.opacity = ['sky-cloudy','sky-rain','sky-storm','sky-fog'].includes(theme) ? '1' : '0.3';

  // Rain
  rainWrap.innerHTML = '';
  if (theme === 'sky-rain' || theme === 'sky-storm') {
    rainWrap.style.opacity = '1';
    const count = theme === 'sky-storm' ? 90 : 55;
    for (let i = 0; i < count; i++) {
      const drop = document.createElement('div');
      drop.className = 'raindrop';
      const h = Math.random() * 18 + 8;
      drop.style.cssText = `
        left:${Math.random()*102}%;
        height:${h}px;
        top:${Math.random()*-30}px;
        --dur:${(Math.random()*0.5+0.6).toFixed(2)}s;
        --delay:-${(Math.random()*1.5).toFixed(2)}s;
        opacity:${(Math.random()*0.4+0.4).toFixed(2)};
      `;
      rainWrap.appendChild(drop);
    }
  } else {
    rainWrap.style.opacity = '0';
  }

  // Snow
  snowWrap.innerHTML = '';
  if (theme === 'sky-snow') {
    snowWrap.style.opacity = '1';
    const flakes = ['❄','❅','❆','✦','·'];
    for (let i = 0; i < 45; i++) {
      const fl = document.createElement('div');
      fl.className = 'snowflake';
      fl.textContent = flakes[Math.floor(Math.random()*flakes.length)];
      fl.style.cssText = `
        left:${Math.random()*102}%;
        --sz:${(Math.random()*10+10)}px;
        --dur:${(Math.random()*4+3).toFixed(1)}s;
        --delay:-${(Math.random()*5).toFixed(1)}s;
        opacity:${(Math.random()*0.5+0.5).toFixed(2)};
      `;
      snowWrap.appendChild(fl);
    }
  } else {
    snowWrap.style.opacity = '0';
  }

  // Lightning flash
  if (theme === 'sky-storm') {
    scheduleLightning();
  }
}

function scheduleLightning() {
  const delay = Math.random() * 5000 + 3000;
  setTimeout(() => {
    const el = document.getElementById('lightning');
    el.classList.add('flash');
    setTimeout(() => el.classList.remove('flash'), 200);
    // Only keep flashing if still storm
    if (document.body.classList.contains('sky-storm')) scheduleLightning();
  }, delay);
}

// Generate stars once
function generateStars() {
  const container = document.getElementById('stars');
  for (let i = 0; i < 120; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const size = Math.random() * 2.5 + 0.8;
    s.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random()*100}%; top:${Math.random()*75}%;
      --d:${(Math.random()*3+2).toFixed(1)}s;
      --delay:-${(Math.random()*4).toFixed(1)}s;
    `;
    container.appendChild(s);
  }
}
generateStars();

// ── Night detection ────────────────────────────────────────────────────────
function isNightTime(timezone) {
  try {
    const now = new Date();
    const local = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
    const h = local.getHours();
    return h < 6 || h >= 20;
  } catch { return false; }
}

// ── Live local clock ───────────────────────────────────────────────────────
let clockInterval = null;
function startClock(timezone) {
  if (clockInterval) clearInterval(clockInterval);
  const el = document.getElementById('local-time');
  function tick() {
    try {
      el.textContent = new Date().toLocaleString('en-GB', {
        timeZone: timezone,
        weekday: 'long', hour: '2-digit', minute: '2-digit', second: '2-digit'
      });
    } catch { el.textContent = ''; }
  }
  tick();
  clockInterval = setInterval(tick, 1000);
}

// ── Helpers ────────────────────────────────────────────────────────────────
function shortDay(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-GB', { weekday: 'short' });
}
function round(val) { return Math.round(val); }

// ── DOM refs ───────────────────────────────────────────────────────────────
const cityInput       = document.getElementById('city-input');
const searchBtn       = document.getElementById('search-btn');
const geoBtn          = document.getElementById('geo-btn');
const errorMsg        = document.getElementById('error-msg');
const heroSection     = document.getElementById('hero');
const forecastSection = document.getElementById('forecast-section');
const skeleton        = document.getElementById('skeleton');
const emptyState      = document.getElementById('empty-state');

const cityNameEl   = document.getElementById('city-name');
const countryEl    = document.getElementById('country-name');
const tempEl       = document.getElementById('current-temp');
const conditionEl  = document.getElementById('condition');
const wxIconEl     = document.getElementById('wx-icon');
const windEl       = document.getElementById('wind');
const humidityEl   = document.getElementById('humidity');
const precipEl     = document.getElementById('precip');
const feelsEl      = document.getElementById('feels-like');
const forecastGrid = document.getElementById('forecast-grid');

let tempChart = null;
let rainChart = null;

// ── State helpers ──────────────────────────────────────────────────────────
function showSkeleton() {
  emptyState.classList.add('hidden');
  heroSection.classList.add('hidden');
  forecastSection.classList.add('hidden');
  errorMsg.classList.add('hidden');
  skeleton.classList.remove('hidden');
}
function hideSkeleton() { skeleton.classList.add('hidden'); }
function showError(msg) {
  hideSkeleton();
  heroSection.classList.add('hidden');
  forecastSection.classList.add('hidden');
  errorMsg.textContent = '⚠ ' + msg;
  errorMsg.classList.remove('hidden');
}

// ── Charts ─────────────────────────────────────────────────────────────────
const chartDefaults = {
  responsive: true,
  plugins: { legend: { display: false }, tooltip: { callbacks: {} } },
  scales: {
    x: { ticks: { color: 'rgba(255,255,255,0.45)', maxTicksLimit: 8, font: { family: 'DM Sans', size: 11 } }, grid: { color: 'rgba(255,255,255,0.06)' }, border: { display: false } },
    y: { ticks: { color: 'rgba(255,255,255,0.45)', font: { family: 'DM Sans', size: 11 } }, grid: { color: 'rgba(255,255,255,0.06)' }, border: { display: false } },
  },
};

function drawTempChart(hourlyTemps, hourlyTimes) {
  const labels = hourlyTimes.slice(0, 24).map(t => t.slice(11, 16));
  const data   = hourlyTemps.slice(0, 24).map(round);
  const ctx    = document.getElementById('temp-chart').getContext('2d');
  if (tempChart) tempChart.destroy();
  tempChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        data,
        borderColor: 'rgba(255,255,255,0.7)',
        backgroundColor: 'rgba(255,255,255,0.06)',
        borderWidth: 2,
        pointRadius: 0, pointHoverRadius: 5,
        fill: true, tension: 0.4,
      }],
    },
    options: {
      ...chartDefaults,
      plugins: {
        ...chartDefaults.plugins,
        tooltip: { callbacks: { label: c => `${c.parsed.y}°C` } },
      },
      scales: {
        ...chartDefaults.scales,
        y: { ...chartDefaults.scales.y, ticks: { ...chartDefaults.scales.y.ticks, callback: v => v + '°' } },
      },
    },
  });
}

function drawRainChart(hourlyRain, hourlyTimes) {
  const labels = hourlyTimes.slice(0, 24).map(t => t.slice(11, 16));
  const data   = hourlyRain.slice(0, 24).map(v => parseFloat(v.toFixed(1)));
  const ctx    = document.getElementById('rain-chart').getContext('2d');
  if (rainChart) rainChart.destroy();
  rainChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: 'rgba(147,197,253,0.55)',
        borderColor: 'rgba(147,197,253,0.9)',
        borderWidth: 1,
        borderRadius: 4,
      }],
    },
    options: {
      ...chartDefaults,
      plugins: {
        ...chartDefaults.plugins,
        tooltip: { callbacks: { label: c => `${c.parsed.y} mm` } },
      },
      scales: {
        ...chartDefaults.scales,
        y: { ...chartDefaults.scales.y, ticks: { ...chartDefaults.scales.y.ticks, callback: v => v + 'mm' } },
      },
    },
  });
}

// Chart tab switching
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const tab = btn.dataset.tab;
    document.getElementById('temp-chart').classList.toggle('hidden', tab !== 'temp');
    document.getElementById('rain-chart').classList.toggle('hidden', tab !== 'rain');
  });
});

// ── Forecast cards ─────────────────────────────────────────────────────────
function renderForecast(daily, timezone) {
  forecastGrid.innerHTML = '';
  const night = isNightTime(timezone);
  daily.time.forEach((day, i) => {
    const { label, icon } = describeWeatherCode(daily.weather_code[i], night);
    const high = round(daily.temperature_2m_max[i]);
    const low  = round(daily.temperature_2m_min[i]);
    const rain = daily.precipitation_sum[i];
    const card = document.createElement('div');
    card.className = 'forecast-card';
    card.innerHTML = `
      <div class="fc-day">${shortDay(day)}</div>
      <div class="fc-icon">${icon}</div>
      <div class="fc-high">${high}°</div>
      <div class="fc-low">${low}°</div>
      ${rain > 0 ? `<div class="fc-rain">💧 ${rain.toFixed(1)}</div>` : ''}
    `;
    forecastGrid.appendChild(card);
  });
}

// ── Main render ────────────────────────────────────────────────────────────
function renderWeather({ location, weather }) {
  const cur    = weather.current;
  const hourly = weather.hourly;
  const daily  = weather.daily;
  const tz     = weather.timezone;

  const night = isNightTime(tz);
  const { label, icon, sky } = describeWeatherCode(cur.weather_code, night);

  // Sky + theme
  applySkyTheme(sky, night);

  // Content
  cityNameEl.textContent  = location.name;
  countryEl.textContent   = location.country;
  tempEl.textContent      = `${round(cur.temperature_2m)}°`;
  wxIconEl.textContent    = icon;
  conditionEl.textContent = label;
  windEl.textContent      = `${round(cur.wind_speed_10m)} km/h wind`;
  humidityEl.textContent  = `${cur.relative_humidity_2m}% humidity`;
  precipEl.textContent    = `${cur.precipitation} mm precip.`;
  feelsEl.textContent     = `${round(cur.apparent_temperature)}° feels like`;

  startClock(tz);
  drawTempChart(hourly.temperature_2m, hourly.time);
  drawRainChart(hourly.precipitation || Array(24).fill(0), hourly.time);
  renderForecast(daily, tz);

  // Reset to temp tab
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('[data-tab="temp"]').classList.add('active');
  document.getElementById('temp-chart').classList.remove('hidden');
  document.getElementById('rain-chart').classList.add('hidden');

  hideSkeleton();
  heroSection.classList.remove('hidden');
  forecastSection.classList.remove('hidden');
}

// ── Search ─────────────────────────────────────────────────────────────────
async function handleSearch() {
  const city = cityInput.value.trim();
  if (!city) return;
  showSkeleton();
  try {
    const data = await getWeatherForCity(city);
    renderWeather(data);
  } catch (err) {
    showError(err.message);
  }
}

// ── Geolocation ────────────────────────────────────────────────────────────
geoBtn.addEventListener('click', () => {
  if (!navigator.geolocation) return showError('Geolocation not supported by your browser.');
  showSkeleton();
  navigator.geolocation.getCurrentPosition(
    async pos => {
      try {
        const { latitude, longitude } = pos.coords;
        const data = await getWeatherByCoords(latitude, longitude);
        renderWeather(data);
      } catch (err) { showError(err.message); }
    },
    () => showError('Location access denied. Please search manually.')
  );
});

// ── Events ─────────────────────────────────────────────────────────────────
searchBtn.addEventListener('click', handleSearch);
cityInput.addEventListener('keydown', e => { if (e.key === 'Enter') handleSearch(); });
