/* ================= USER ================= */
const saveuser = JSON.parse(localStorage.getItem("user")) || {};
const puserEl = document.querySelector(".puser");
if (puserEl && saveuser.username) {
  puserEl.textContent = saveuser.username;
}

/* ================= DATE ================= */
const currentDate = document.getElementById("currentDate");
if (currentDate) {
  currentDate.textContent = new Date().toLocaleString("default", {
    month: "long",
    year: "numeric"
  });
}

/* ================= PROFILE IMAGE ================= */
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
