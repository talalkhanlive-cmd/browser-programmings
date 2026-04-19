/* ============================================================
   weather.js — Weather App
   TALAL KHAN
   Uses: async/await, fetch(), try/catch, response.ok
   API:  https://open-meteo.com (free, no API key needed)
   ============================================================ */

/* ── DOM references ─────────────────────────────────────────── */
const cityText        = document.getElementById('city');
const temperatureText = document.getElementById('temperature');
const windText        = document.getElementById('wind');
const updatedText     = document.getElementById('updated-time');
const weatherBox      = document.getElementById('weatherBox');
const weatherStatus   = document.getElementById('weatherStatus');
const weatherIcon     = document.getElementById('weather-icon');
const output          = document.getElementById('output');

/* ── Log helpers ─────────────────────────────────────────────── */
function log(message) {
  output.textContent += message + '\n';
}

function clearOutput() {
  output.textContent = '';
}

/* ── Show / hide status message ──────────────────────────────── */
function showStatus(html) {
  weatherStatus.innerHTML = html;
}

function clearStatus() {
  weatherStatus.innerHTML = '';
}

/* ── Pick a weather emoji based on temperature ───────────────── */
function getWeatherIcon(tempC) {
  if (tempC <= 0)  return '🥶';
  if (tempC <= 10) return '🧥';
  if (tempC <= 18) return '🌤️';
  if (tempC <= 25) return '☀️';
  return '🔥';
}

/* ── Format the API timestamp for display ────────────────────── */
function formatTime(isoString) {
  const d = new Date(isoString);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

/* ── City button wiring ──────────────────────────────────────── */
document.getElementById('btnKuopio').onclick   = () => loadWeatherByCity('Kuopio',   62.8924, 27.6770);
document.getElementById('btnHelsinki').onclick = () => loadWeatherByCity('Helsinki', 60.1699, 24.9384);
document.getElementById('btnTampere').onclick  = () => loadWeatherByCity('Tampere',  61.4978, 23.7610);
document.getElementById('btnOulu').onclick     = () => loadWeatherByCity('Oulu',     65.0121, 25.4651);
document.getElementById('btnTurku').onclick    = () => loadWeatherByCity('Turku',    60.4518, 22.2666);

/* ── Main async function ─────────────────────────────────────── */

// Why async/await?
//   fetch() returns a Promise — the network result is not instant.
//   async/await lets us wait for it and write the code in a clear,
//   top-to-bottom order instead of chaining .then() callbacks.

// Why response.ok?
//   fetch() only throws on network failures. If the server replies
//   with a 404 or 500, fetch() does NOT throw — it just returns
//   a Response with ok = false. Checking response.ok lets us
//   catch those HTTP errors and handle them properly.

// Why try/catch?
//   Anything can go wrong with a network request: no connection,
//   server down, bad JSON, or our own response.ok throw.
//   try/catch catches all of those in one place and shows the user
//   a clear error message instead of silently breaking the page.

async function loadWeatherByCity(cityName, latitude, longitude) {
  clearOutput();
  clearStatus();

  // Hide old result card while loading
  weatherBox.classList.add('hidden');

  // Show spinner immediately so the user knows something is happening
  showStatus(`
    <div class="api-status">
      <span class="spinner" aria-hidden="true"></span>
      Loading weather for ${cityName}…
    </div>`);

  // Build the Open-Meteo URL
  const url =
    'https://api.open-meteo.com/v1/forecast' +
    '?latitude='  + latitude +
    '&longitude=' + longitude +
    '&current=temperature_2m,wind_speed_10m';

  try {
    // async/await: pause here until the HTTP response arrives
    const response = await fetch(url);

    // response.ok is false for 4xx / 5xx — fetch() won't throw on its own
    if (!response.ok) {
      throw new Error('HTTP error: ' + response.status);
    }

    // Parse the JSON body into a JavaScript object
    const data = await response.json();

    const temperature = data.current.temperature_2m;
    const wind        = data.current.wind_speed_10m;
    const time        = data.current.time;

    // Update the DOM with live data
    cityText.textContent        = cityName;
    temperatureText.textContent = temperature + ' °C';
    windText.textContent        = wind + ' km/h';
    updatedText.textContent     = formatTime(time);
    weatherIcon.textContent     = getWeatherIcon(temperature);

    // Show the result card with animation
    weatherBox.classList.remove('hidden');
    clearStatus();

    // Write to the debug log
    log('City:        ' + cityName);
    log('Latitude:    ' + latitude);
    log('Longitude:   ' + longitude);
    log('Temperature: ' + temperature + ' °C');
    log('Wind Speed:  ' + wind + ' km/h');
    log('Time:        ' + time);
    log('URL:         ' + url);

  } catch (error) {
    // try/catch handles: network failure, bad status, JSON parse errors
    showStatus(`
      <div class="api-status error">
        ⚠️ Error loading data — ${error.message}
      </div>`);

    log('Error: ' + error.message);
  }
}

/* ── Theme toggle (mirrors portfolio behaviour) ──────────────── */
const themeBtn = document.getElementById('theme-toggle');
let isDark = localStorage.getItem('portfolio_theme') === 'dark';

function applyTheme(dark) {
  isDark = dark;
  document.body.classList.toggle('dark', isDark);
  themeBtn.setAttribute('aria-pressed', String(isDark));
  themeBtn.textContent = isDark ? '☀️ Toggle Theme' : '🌙 Toggle Theme';
}

// Apply saved theme on load so it matches the main portfolio
applyTheme(isDark);

themeBtn.addEventListener('click', () => {
  applyTheme(!isDark);
  localStorage.setItem('portfolio_theme', isDark ? 'dark' : 'light');
});
