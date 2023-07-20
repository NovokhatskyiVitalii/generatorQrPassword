const customPicker = document.querySelectorAll(".custom-picker");
const colorPicker = document.querySelectorAll(".color-picker");
const customDropDown = document.querySelectorAll(".custom-dropdown");

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

customDropDown.forEach((item) => {
  //select all options inside a custom dropdown
  let options = item.querySelectorAll(".option");
  //add event listener on all options
  options.forEach((option) => {
    option.addEventListener("click", () => {
      //select all options of current options to remove active class
      let allOptions = option.parentElement.querySelectorAll(".option");
      allOptions.forEach((item) => {
        item.classList.remove("active");
      });
      //add active on click
      option.classList.add("active");
      //update selected text
      item.querySelector(".selected").innerHTML = option.innerHTML;
    });
  });
});
