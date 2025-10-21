document.addEventListener("DOMContentLoaded", () => {
  const enterButton = document.getElementById("enterSite");
  const overlay = document.querySelector(".popup-overlay");
  const progressFill = document.querySelector(".progress-fill");

  // ✅ Only show if user hasn't entered before
  if (localStorage.getItem("mintchaPopupShown")) {
    window.location.href = "../index.html";
    return;
  }

  // ✅ Animate progress bar
  progressFill.style.width = "0%";
  setTimeout(() => {
    progressFill.style.transition = "width 4s ease-in-out";
    progressFill.style.width = "100%";
  }, 100);

  // ✅ Auto redirect after progress finishes
  setTimeout(() => {
    if (!localStorage.getItem("mintchaPopupShown")) {
      fadeOutAndRedirect();
    }
  }, 4200);

  // ✅ Manual click
  enterButton.addEventListener("click", () => fadeOutAndRedirect());

  function fadeOutAndRedirect() {
    overlay.style.transition = "opacity 0.8s ease";
    overlay.style.opacity = "0";
    localStorage.setItem("mintchaPopupShown", "true");
    setTimeout(() => {
      window.location.href = "../index.html";
    }, 800);
  }
});
