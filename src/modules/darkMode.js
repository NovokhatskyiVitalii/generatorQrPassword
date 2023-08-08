const darkModeBtn = document.querySelector("#dark-mode-btn");
const copyBtn = document.querySelector("#copy-btn");

darkModeBtn.addEventListener("change", () => {
  if (darkModeBtn.checked) {
    document.body.classList.add("dark");
    copyBtn.src = "/src/img/copywhite.png";
  } else {
    document.body.classList.remove("dark");
    copyBtn.src = "/src/img/copy.png";
  }
});
