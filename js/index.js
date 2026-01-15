/* ================= DASHBOARD ELEMENTS ================= */
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const balanceEl = document.getElementById("balance");
const txCountEl = document.getElementById("txCount");

const add = document.getElementById("add");
const expenseBox = document.getElementById("ad");

/* ================= DATE ================= */
const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = now.getMonth();
/* ================= USER ================= */
const saveuser = JSON.parse(localStorage.getItem("user")) || {};
const puserEl = document.querySelector(".puser");
if (puserEl && saveuser.username) {
  puserEl.textContent = saveuser.username;
}

/* ================= STORAGE ================= */
const store = JSON.parse(localStorage.getItem("verdent")) || {};
if (!store[currentYear]) store[currentYear] = {};
if (!store[currentYear][currentMonth]) {
  store[currentYear][currentMonth] = { income: 0, expenses: 0, tx: [] };
}

/* ================= INCOME ================= */
function setIncome() {
  if (!add || !incomeInput) return;

  add.style.display = "none";
  store[currentYear][currentMonth].income = Number(incomeInput.value) || 0;
  save();
  renderDashboard();
}

function butt() {
  if (add) add.style.display = "block";
}

/* ================= EXPENSE ================= */
function addExpense() {
  if (!amount || !category) return;
  if (expenseBox) expenseBox.style.display = "none";

  const amt = Number(amount.value);
  if (amt <= 0) return;

  store[currentYear][currentMonth].expenses += amt;
  store[currentYear][currentMonth].tx.unshift({
    text: `${category.value} - ₹${amt}`,
    date: new Date().toLocaleDateString()
  });

  save();
  renderDashboard();
}

function ad() {
  if (expenseBox) expenseBox.style.display = "block";
}

/* ================= DASHBOARD RENDER ================= */
function renderDashboard() {
  const data = store[currentYear][currentMonth];
  if (!data) return;

  incomeEl.textContent = `₹${data.income}`;
  expenseEl.textContent = `₹${data.expenses}`;
  balanceEl.textContent = `₹${data.income - data.expenses}`;
  txCountEl.textContent = data.tx.length;

  renderAnalysisChart();
}

/* ================= ANALYSIS CHART ================= */
function renderAnalysisChart() {
  const canvas = document.getElementById("analysisChart");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const data = store[currentYear][currentMonth];

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const max = Math.max(data.income, data.expenses, 1);
  const barHeight = 80;
  const baseY = 100;

  ctx.fillStyle = "#16a34a";
  ctx.fillRect(40, baseY - (data.income / max) * barHeight, 60, (data.income / max) * barHeight);

  ctx.fillStyle = "#dc2626";
  ctx.fillRect(140, baseY - (data.expenses / max) * barHeight, 60, (data.expenses / max) * barHeight);

  ctx.fillStyle = "#000";
  ctx.fillText("Income", 48, 115);
  ctx.fillText("Expense", 140, 115);

  const analysisText = document.getElementById("analysisText");
  if (analysisText) {
    analysisText.textContent =
      data.expenses > data.income
        ? "⚠ Expenses exceeded income this month."
        : "✅ Spending is under control this month.";
  }
}

/* ================= SAVE ================= */
function save() {
  localStorage.setItem("verdent", JSON.stringify(store));
}

/* ================= INIT ================= */
renderDashboard();
const profileImg = document.getElementById("profileImg");
const imgInput = document.getElementById("imgInput");

if (profileImg) {
  profileImg.src = localStorage.getItem("profileImage") || "assets/image.png";
}

function openImagePicker() {
  if (imgInput) imgInput.click();
}

if (imgInput && profileImg) {
  imgInput.addEventListener("change", () => {
    const reader = new FileReader();
    reader.onload = () => {
      profileImg.src = reader.result;
      localStorage.setItem("profileImage", reader.result);
    };
    reader.readAsDataURL(imgInput.files[0]);
  });
}
