document.addEventListener("DOMContentLoaded", () => {
  const enterButton = document.getElementById("enterSite");

  // ✅ Only show once per browser session
  const shown = sessionStorage.getItem("mintchaPopupShown");
  if (shown) {
    window.location.href = "../index.html";
  }

  // ✅ Auto animation: redirect after loading bar finishes if user waits
  setTimeout(() => {
    if (!sessionStorage.getItem("mintchaPopupShown")) {
      fadeOutAndRedirect();
    }
  }, 5000); // auto-enter after 5 seconds

  // ✅ Manual button click
  enterButton.addEventListener("click", () => fadeOutAndRedirect());

  // 🔄 Smooth fade-out + redirect
  function fadeOutAndRedirect() {
    const overlay = document.querySelector(".popup-overlay");
    overlay.style.opacity = "0";
    sessionStorage.setItem("mintchaPopupShown", "true");
    setTimeout(() => {
      window.location.href = "../index.html";
    }, 800);
  }
});
