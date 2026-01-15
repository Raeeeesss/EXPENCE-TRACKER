
/* ================= USER ================= */
// TEMP: take first user (until session logic is added)
const users = JSON.parse(localStorage.getItem("users")) || [];
const saveuser = users[0] || {};

const puserEl = document.querySelector(".puser");
if (puserEl && saveuser.username) {
  puserEl.textContent = saveuser.username;
}

/* ================= STORAGE ================= */
// If verdent does not exist, create empty structure
let store = JSON.parse(localStorage.getItem("verdent"));

if (!store) {
  store = {};
  localStorage.setItem("verdent", JSON.stringify(store));
}

/* ================= ELEMENTS ================= */
const historyEl = document.getElementById("history");
const txList = document.getElementById("transactions");

if (historyEl && txList) {
  renderHistory();
}

/* ================= HISTORY ================= */
function renderHistory() {
  historyEl.innerHTML = "";
  txList.innerHTML = "";

  if (Object.keys(store).length === 0) {
    historyEl.innerHTML = "<p>No transactions yet</p>";
    return;
  }

  Object.keys(store).forEach(year => {
    Object.keys(store[year]).forEach(month => {
      createMonthBox(year, month, store[year][month].tx);
    });
  });
}

function createMonthBox(year, month, txArray) {
  if (!txArray || txArray.length === 0) return;

  let yearBlock = document.getElementById(`year-${year}`);
  if (!yearBlock) {
    yearBlock = document.createElement("div");
    yearBlock.id = `year-${year}`;
    yearBlock.className = "year-block";

    const title = document.createElement("div");
    title.className = "year-title";
    title.textContent = year;

    const grid = document.createElement("div");
    grid.className = "month-grid";

    yearBlock.append(title, grid);
    historyEl.appendChild(yearBlock);
  }

  const grid = yearBlock.querySelector(".month-grid");
  const box = document.createElement("div");

  box.className = "month-box";
  box.textContent =
    new Date(year, month).toLocaleString("default", { month: "long" });

  box.onclick = () => showTransactions(txArray, box);

  grid.appendChild(box);
}

function showTransactions(txArray, activeBox) {
  document.querySelectorAll(".month-box").forEach(b =>
    b.classList.remove("active")
  );
  activeBox.classList.add("active");

  txList.innerHTML = "";
  txArray.forEach(t => {
    const li = document.createElement("li");
    li.textContent = `${t.text} (${t.date})`;
    txList.appendChild(li);
  });
}

/* ================= PROFILE IMAGE ================= */
const profileImg = document.getElementById("profileImg");
const imgInput = document.getElementById("imgInput");

if (profileImg) {
  profileImg.src =
    localStorage.getItem("profileImage") || "assets/image.png";
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

