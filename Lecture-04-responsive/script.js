// Wait until HTML is fully loaded
document.addEventListener("DOMContentLoaded", function () {

    // State variables
    let isDarkMode = false;
    let clickCount = 0;

    // Get buttons
    const themeBtn = document.getElementById("themeBtn");
    const clickBtn = document.getElementById("clickBtn");

    // 🔴 SAFETY CHECK (this guarantees buttons exist)
    if (!themeBtn || !clickBtn) {
        alert("Buttons not found in HTML");
        return;
    }

    // Toggle Theme button (already working, keep it)
    themeBtn.addEventListener("click", function () {
        isDarkMode = !isDarkMode;
        document.body.classList.toggle("dark");
    });

    // Click Me button (VISIBLE result)
    clickBtn.addEventListener("click", function () {
        clickCount++;

        // Show result directly on the page
        clickBtn.textContent = "Clicked " + clickCount + " times";
    });

});


