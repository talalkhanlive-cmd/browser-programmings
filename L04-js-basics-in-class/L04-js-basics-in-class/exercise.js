console.log("JS connected ✅");

/* Exercise 9 */
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

/* Exercise 10 */
function isEven(n) {
  return n % 2 === 0;
}

btnEvenOdd.onclick = function () {
  const n = Number(numEvenOdd.value);
  evenOddOut.innerText = isEven(n) ? "Result: EVEN" : "Result: ODD";
};

/* Exercise 11 */
btnCountdown.onclick = function () {
  let start = Number(countdownInput.value);
  let text = "";
  for (let i = start; i >= 0; i--) text += i + " ";
  countdownOut.innerText = text;
};

/* Exercise 12 */
function sumToN(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) sum += i;
  return sum;
}

btnSumN.onclick = function () {
  sumNOut.innerText = "Sum: " + sumToN(Number(nSumInput.value));
};

/* Exercise 13 */
btnRepeat.onclick = function () {
  let result = "";
  for (let i = 0; i < Number(repeatCount.value); i++) {
    result += repeatText.value + " ";
  }
  repeatOut.innerText = result;
};

/* Exercise 14 */
btnLogin.onclick = function () {
  if (loginUser.value === "student" && loginPass.value === "1234") {
    loginOut.innerText = "Status: Welcome ✅";
    loginOut.style.color = "green";
  } else {
    loginOut.innerText = "Status: Wrong login ❌";
    loginOut.style.color = "red";
  }
};

/* Exercise 15 */
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

btnMinMax.onclick = function () {
  minMaxOut.innerText =
    "Min: " + min3(x.value, y.value, z.value) +
    " | Max: " + max3(x.value, y.value, z.value);
};

/* Exercise 16 */
function makeTable(n) {
  let result = "";
  for (let i = 1; i <= 10; i++) {
    result += n + " × " + i + " = " + n * i + " | ";
  }
  return result;
}

btnTable.onclick = function () {
  tableOut.innerText = makeTable(Number(tableN.value));
};
