/* ================= USER ================= */
const saveuser = JSON.parse(localStorage.getItem("user")) || {};
const puserEl = document.querySelector(".puser");
if (puserEl && saveuser.username) {
  puserEl.textContent = saveuser.username;
}


function sendmail() {
  const params = {
    name: name.value,
    phone: phone.value,
    message: message.value
  };

  emailjs.send("service_s2nz36n", "template_6avvg9j", params)
    .then(() => {
      alert("Message sent successfully");
      myform.reset();
    })
    .catch(err => console.log("Email failed", err));
}
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
