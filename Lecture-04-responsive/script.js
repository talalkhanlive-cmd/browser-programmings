// Make sure the HTML is fully loaded first
document.addEventListener("DOMContentLoaded", function () {

    // State variables
    let isDarkMode = false;
    let clickCount = 0;

    // Get buttons
    const themeBtn = document.getElementById("themeBtn");
    const clickBtn = document.getElementById("clickBtn");

    // Toggle theme button
    themeBtn.addEventListener("click", function () {
        isDarkMode = !isDarkMode;
        document.body.classList.toggle("dark");

        if (isDarkMode) {
            alert("Dark mode ON");
        } else {
            alert("Dark mode OFF");
        }
    });

    // Click counter button
    clickBtn.addEventListener("click", function () {
        clickCount++;
        alert("Click Me button pressed " + clickCount + " times");
    });

});

