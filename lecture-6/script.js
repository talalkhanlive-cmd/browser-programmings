/* ============================================================
   script.js — Lecture 06
   TALAL KHAN Portfolio
   Features:
     1. Theme toggle (light / dark)
     2. Theme persisted with localStorage
     3. Click counter
     4. Last updated date (auto-generated)
     5. External API fetch with async/await + error handling
   ============================================================ */


/* ── Why do we use async/await? ────────────────────────────────
   fetch() is asynchronous — it returns a Promise, meaning the
   result is not ready immediately. Without async/await we would
   need nested .then() callbacks that are harder to read.
   async/await lets us write asynchronous code that looks and
   reads like normal step-by-step code, making it easier
   to understand and maintain.
   ─────────────────────────────────────────────────────────── */

/* ── Why do we check response.ok? ─────────────────────────────
   fetch() does NOT throw an error for HTTP status codes like
   404 (not found) or 500 (server error). It only rejects when
   there is a network failure.
   Checking response.ok makes sure we only process the data
   when the request actually succeeded (status 200–299).
   ─────────────────────────────────────────────────────────── */

/* ── Why do we use try/catch? ──────────────────────────────────
   Network requests can fail for many reasons: no internet,
   server issues, or invalid responses. try/catch helps us
   handle those failures properly by showing an error message
   instead of breaking the page.
   ─────────────────────────────────────────────────────────── */


/* ── 1. State ──────────────────────────────────────────────── */
let isDark = false;
let clickCount = 0;

/* ── 2. DOM references ─────────────────────────────────────── */
const body = document.body;
const themeBtn = document.getElementById('theme-toggle');
const counterBtn = document.getElementById('click-counter');
const countDisplay = document.getElementById('click-count');
const lastUpdated = document.getElementById('last-updated');
const loadDataBtn = document.getElementById('load-data-btn');
const apiResult = document.getElementById('api-result');


/* ── 3. Theme Toggle ───────────────────────────────────────── */
function applyTheme(dark) {
  isDark = dark;
  body.classList.toggle('dark', isDark);
  themeBtn.setAttribute('aria-pressed', String(isDark));
  themeBtn.textContent = isDark ? '☀️ Toggle Theme' : '🌙 Toggle Theme';
}

themeBtn.addEventListener('click', () => {
  applyTheme(!isDark);
  localStorage.setItem('portfolio_theme', isDark ? 'dark' : 'light');
});


/* ── 4. Load saved theme on page load ─────────────────────── */
(function loadSavedTheme() {
  const saved = localStorage.getItem('portfolio_theme');
  if (saved === 'dark') {
    applyTheme(true);
  }
})();


/* ── 5. Click Counter ──────────────────────────────────────── */
counterBtn.addEventListener('click', () => {
  clickCount++;
  countDisplay.textContent = clickCount;
});


/* ── 6. Last Updated (auto-generated, never hardcoded) ─────── */
(function setLastUpdated() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');

  lastUpdated.textContent = `Last updated: ${yyyy}-${mm}-${dd}`;
})();


/* ── 7. External API Fetch ─────────────────────────────────── */

// Helper — clears #api-result and injects new HTML
function setResult(html) {
  apiResult.innerHTML = html;
}

// Helper — builds one labelled row inside the result card
function makeField(label, value) {
  return `
    <div class="api-field">
      <span class="api-label">${label}</span>
      <span class="api-value">${value}</span>
    </div>`;
}

// Main async function — fetches user data and updates the DOM
async function loadUserData() {
  const API_URL = 'https://jsonplaceholder.typicode.com/users/1';

  // Disable button while request is in progress
  loadDataBtn.disabled = true;

  // Show loading message
  setResult(`
    <div class="api-status">
      <span class="spinner" aria-hidden="true"></span>
      Loading...
    </div>`);

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error - status: ${response.status}`);
    }

    const user = await response.json();

    const cardHTML = `
      <div class="api-card">
        <h3>👤 User fetched from JSONPlaceholder API</h3>
        ${makeField('Name', user.name)}
        ${makeField('Email', user.email)}
        ${makeField('Company', user.company.name)}
        ${makeField('Username', user.username)}
        ${makeField('Phone', user.phone)}
        ${makeField('Website', user.website)}
        ${makeField('City', user.address.city)}
      </div>`;

    setResult(cardHTML);

  } catch (error) {
    setResult(`
      <div class="api-status error">
        ⚠️ Error loading data - ${error.message}
      </div>`);
  } finally {
    loadDataBtn.disabled = false;
  }
}

// Button event listener
loadDataBtn.addEventListener('click', loadUserData);
