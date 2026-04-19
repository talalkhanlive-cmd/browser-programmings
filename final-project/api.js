// api.js — all data fetching lives here

const GEO_URL     = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';

const WEATHER_PARAMS = [
  'temperature_2m',
  'relative_humidity_2m',
  'apparent_temperature',
  'wind_speed_10m',
  'precipitation',
  'weather_code',
].join(',');

const HOURLY_PARAMS = 'temperature_2m,precipitation';

const DAILY_PARAMS = [
  'weather_code',
  'temperature_2m_max',
  'temperature_2m_min',
  'precipitation_sum',
].join(',');

async function geocodeCity(cityName) {
  const url = `${GEO_URL}?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Geocoding failed (${response.status})`);
  const data = await response.json();
  if (!data.results || data.results.length === 0)
    throw new Error(`City "${cityName}" not found. Try a different spelling.`);
  const { name, country, latitude, longitude } = data.results[0];
  return { name, country, latitude, longitude };
}

async function fetchWeather(latitude, longitude) {
  const params = new URLSearchParams({
    latitude, longitude,
    current: WEATHER_PARAMS,
    hourly: HOURLY_PARAMS,
    daily: DAILY_PARAMS,
    forecast_days: 7,
    timezone: 'auto',
  });
  const response = await fetch(`${WEATHER_URL}?${params}`);
  if (!response.ok) throw new Error(`Weather fetch failed (${response.status})`);
  return response.json();
}

async function reverseGeocode(latitude, longitude) {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
  const res = await fetch(url, { headers: { 'Accept-Language': 'en' } });
  if (!res.ok) return { name: 'Your location', country: '' };
  const data = await res.json();
  const name = data.address?.city || data.address?.town || data.address?.village || 'Your location';
  const country = data.address?.country || '';
  return { name, country, latitude, longitude };
}

async function getWeatherForCity(cityName) {
  const location = await geocodeCity(cityName);
  const weather  = await fetchWeather(location.latitude, location.longitude);
  return { location, weather };
}

async function getWeatherByCoords(latitude, longitude) {
  const [location, weather] = await Promise.all([
    reverseGeocode(latitude, longitude),
    fetchWeather(latitude, longitude),
  ]);
  return { location, weather };
}
