alert("JS IS LOADED"); // 🔴 MUST SHOW POPUP
console.log("JS connected");

/* Exercise 9 — Grade */
document.getElementById("btnGrade").onclick = function () {
  const score = Number(document.getElementById("scoreInput").value);
  let grade = "F";

  if (score < 0 || score > 100 || isNaN(score)) grade = "Invalid";
  else if (score >= 90) grade = "A";
  else if (score >= 80) grade = "B";
  else if (score >= 70) grade = "C";
  else if (score >= 60) grade = "D";

  document.getElementById("gradeOut").innerText = "Grade: " + grade;
};

/* Exercise 10 — Even / Odd */
document.getElementById("btnEvenOdd").onclick = function () {
  const n = Number(document.getElementById("numEvenOdd").value);
  document.getElementById("evenOddOut").innerText =
    n % 2 === 0 ? "Result: EVEN" : "Result: ODD";
};

/* Exercise 11 — Countdown */
document.getElementById("btnCountdown").onclick = function () {
  let start = Number(document.getElementById("countdownInput").value);
  let text = "";
  for (let i = start; i >= 0; i--) text += i + " ";
  document.getElementById("countdownOut").innerText = text;
};

/* Exercise 12 — Sum */
document.getElementById("btnSumN").onclick = function () {
  const n = Number(document.getElementById("nSumInput").value);
  let sum = 0;
  for (let i = 1; i <= n; i++) sum += i;
  document.getElementById("sumNOut").innerText = "Sum: " + sum;
};

/* Exercise 13 — Repeat */
document.getElementById("btnRepeat").onclick = function () {
  const text = document.getElementById("repeatText").value;
  const times = Number(document.getElementById("repeatCount").value);
  let result = "";
  for (let i = 0; i < times; i++) result += text + " ";
  document.getElementById("repeatOut").innerText = result;
};

/* Exercise 14 — Login */
document.getElementById("btnLogin").onclick = function () {
  const u = document.getElementById("loginUser").value;
  const p = document.getElementById("loginPass").value;

  if (u === "student" && p === "1234") {
    document.getElementById("loginOut").innerText = "Status: Welcome ✅";
  } else {
    document.getElementById("loginOut").innerText = "Status: Wrong ❌";
  }
};

/* Exercise 15 — Min / Max */
document.getElementById("btnMinMax").onclick = function () {
  const a = Number(document.getElementById("x").value);
  const b = Number(document.getElementById("y").value);
  const c = Number(document.getElementById("z").value);

  let min = a;
  if (b < min) min = b;
  if (c < min) min = c;

  let max = a;
  if (b > max) max = b;
  if (c > max) max = c;

  document.getElementById("minMaxOut").innerText =
    "Min: " + min + " | Max: " + max;
};

/* Exercise 16 — Table */
document.getElementById("btnTable").onclick = function () {
  const n = Number(document.getElementById("tableN").value);
  let result = "";
  for (let i = 1; i <= 10; i++) {
    result += n + " × " + i + " = " + n * i + " | ";
  }
  document.getElementById("tableOut").innerText = result;
};


