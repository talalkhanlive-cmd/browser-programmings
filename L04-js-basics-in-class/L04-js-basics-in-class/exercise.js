console.log("JS connected ✅");

/* Exercise 9 — Grade */
const scoreInput = document.getElementById("scoreInput");
const btnGrade = document.getElementById("btnGrade");
const gradeOut = document.getElementById("gradeOut");

btnGrade.onclick = function () {
  const score = Number(scoreInput.value);
  let grade = "";

  if (score < 0 || score > 100 || isNaN(score)) grade = "Invalid";
  else if (score >= 90) grade = "A";
  else if (score >= 80) grade = "B";
  else if (score >= 70) grade = "C";
  else if (score >= 60) grade = "D";
  else grade = "F";

  gradeOut.innerText = "Grade: " + grade;
};

/* Exercise 10 — Even / Odd */
function isEven(n) {
  return n % 2 === 0;
}

const numEvenOdd = document.getElementById("numEvenOdd");
const btnEvenOdd = document.getElementById("btnEvenOdd");
const evenOddOut = document.getElementById("evenOddOut");

btnEvenOdd.onclick = function () {
  const n = Number(numEvenOdd.value);
  evenOddOut.innerText = isEven(n) ? "Result: EVEN" : "Result: ODD";
};

/* Exercise 11 — Countdown */
const countdownInput = document.getElementById("countdownInput");
const btnCountdown = document.getElementById("btnCountdown");
const countdownOut = document.getElementById("countdownOut");

btnCountdown.onclick = function () {
  let start = Number(countdownInput.value);
  let text = "";
  for (let i = start; i >= 0; i--) {
    text += i + " ";
  }
  countdownOut.innerText = text;
};

/* Exercise 12 — Sum 1..N */
function sumToN(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) sum += i;
  return sum;
}

const nSumInput = document.getElementById("nSumInput");
const btnSumN = document.getElementById("btnSumN");
const sumNOut = document.getElementById("sumNOut");

btnSumN.onclick = function () {
  const n = Number(nSumInput.value);
  sumNOut.innerText = "Sum: " + sumToN(n);
};

/* Exercise 13 — Repeat Text */
const repeatText = document.getElementById("repeatText");
const repeatCount = document.getElementById("repeatCount");
const btnRepeat = document.getElementById("btnRepeat");
const repeatOut = document.getElementById("repeatOut");

btnRepeat.onclick = function () {
  let result = "";
  for (let i = 0; i < Number(repeatCount.value); i++) {
    result += repeatText.value + " ";
  }
  repeatOut.innerText = result;
};

/* Exercise 14 — Login */
const correctUser = "student";
const correctPass = "1234";

const loginUser = document.getElementById("loginUser");
const loginPass = document.getElementById("loginPass");
const btnLogin = document.getElementById("btnLogin");
const loginOut = document.getElementById("loginOut");

btnLogin.onclick = function () {
  if (
    loginUser.value.trim() === correctUser &&
    loginPass.value.trim() === correctPass
  ) {
    loginOut.innerText = "Status: Welcome ✅";
    loginOut.style.color = "green";
  } else {
    loginOut.innerText = "Status: Wrong login ❌";
    loginOut.style.color = "red";
  }
};

/* Exercise 15 — Min / Max */
function min3(a, b, c) {
  let m = a;
  if (b < m) m = b;
  if (c < m) m = c;
  return m;
}

function max3(a, b, c) {
  let m = a;
  if (b > m) m = b;
  if (c > m) m = c;
  return m;
}

const xInput = document.getElementById("x");
const yInput = document.getElementById("y");
const zInput = document.getElementById("z");
const btnMinMax = document.getElementById("btnMinMax");
const minMaxOut = document.getElementById("minMaxOut");

btnMinMax.onclick = function () {
  const a = Number(xInput.value);
  const b = Number(yInput.value);
  const c = Number(zInput.value);

  minMaxOut.innerText =
    "Min: " + min3(a, b, c) + " | Max: " + max3(a, b, c);
};

/* Exercise 16 — Multiplication Table */
function makeTable(n) {
  let result = "";
  for (let i = 1; i <= 10; i++) {
    result += n + " × " + i + " = " + n * i + " | ";
  }
  return result;
}

const tableN = document.getElementById("tableN");
const btnTable = document.getElementById("btnTable");
const tableOut = document.getElementById("tableOut");

btnTable.onclick = function () {
  tableOut.innerText = makeTable(Number(tableN.value));
};
