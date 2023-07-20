const customPicker = document.querySelectorAll(".custom-picker");
const colorPicker = document.querySelectorAll(".color-picker");

customPicker.forEach((item) => {
  item.addEventListener("click", () => {
    item.querySelector(".color-picker").click();
  });
});

colorPicker.forEach((item) => {
  item.addEventListener("change", (e) => {
    let color = e.target.value;
    let span = item.parentElement.querySelector("span");
    let input = item.parentElement.querySelector("input[type=text]");
    span.style.backgroundColor = color;
    input.value = color;
  });
});
