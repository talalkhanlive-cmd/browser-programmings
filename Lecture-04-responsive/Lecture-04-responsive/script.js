console.log("Page loaded");

let isDarkMode = false;   // state variable
let clickCount = 0;      // state variable

function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle("dark");
    console.log("Dark mode:", isDarkMode);
}

function countClicks() {
    clickCount++;
    console.log("Button clicked", clickCount, "times");
}

document.getElementById("themeBtn").addEventListener("click", toggleTheme);
document.getElementById("clickBtn").addEventListener("click", countClicks);

