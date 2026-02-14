alert("JavaScript is running");
console.log("JS connected ✅");

/* ========= Exercise 9 — Grade ========= */
const scoreInput = document.getElementById("scoreInput");
const btnGrade = document.getElementById("btnGrade");
const gradeOut = document.getElementById("gradeOut");

btnGrade.onclick = function () {
  const score = Number(scoreInput.value);
  let grade = "";

  if (isNaN(score) || score < 0 || score > 100) grade = "Invalid";
  else if (score >= 90) grade = "A";
  else if (score >= 80) grade = "B";
  else if (score >= 70) grade = "C";
  else if (score >= 60) grade = "D";
  else grade = "F";

  gradeOut.innerText = "Grade: " + grade;
};

/* ========= Exercise 10 — Even / Odd ========= */
const numEvenOdd = document.getElementById("numEvenOdd");
const btnEvenOdd = document.getElementById("btnEvenOdd");
const evenOddOut = document.getElementById("evenOddOut");

function isEven(n) {
  return n % 2 === 0;
}

btnEvenOdd.onclick = function () {
  const n = Number(numEvenOdd.value);
  evenOddOut.innerText = isEven(n)
    ? "Result: EVEN"
    : "Result: ODD";
};

/* ========= Exercise 11 — Countdown ========= */
const countdownInput = document.getElementById("countdownInput");
const btnCountdown = document.getElementById("btnCountdown");
const countdownOut = document.getElementById("countdownOut");

btnCountdown.onclick = function () {
  let start = Number(countdownInput.value);
  let text = "";

  for (let i = start; i >= 0; i--) {
    text += i + " ";
  }

  countdownOut.innerText = text.trim();
};

/* ========= Exercise 12 — Sum 1..N ========= */
const nSumInput = document.getElementById("nSumInput");
const btnSumN = document.getElementById("btnSumN");
const sumNOut = document.getElementById("sumNOut");

function sumToN(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) sum += i;
  return sum;
}

btnSumN.onclick = function () {
  sumNOut.innerText = "Sum: " + sumToN(Number(nSumInput.value));
};

/* ========= Exercise 13 — Repeat Text ========= */
const repeatText = document.getElementByI

