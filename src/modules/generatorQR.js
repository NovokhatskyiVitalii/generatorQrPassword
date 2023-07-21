const customPicker = document.querySelectorAll(".custom-picker");
const colorPicker = document.querySelectorAll(".color-picker");
const customDropDown = document.querySelectorAll(".custom-dropdown");
const uploadElem = document.querySelector(".upload-img");
const uploadImgInput = document.querySelector("#upload-img-input");
const range = document.querySelector(".custom-slider input");
const toolTip = document.querySelector(".custom-slider span");

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

uploadElem.addEventListener("click", () => {
  uploadImgInput.click();
});

uploadImgInput.addEventListener("change", (e) => {
  //on change get the file content
  const file = e.target.files[0];
  //reader the file with FileReader
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    //img is next to file input select it and change src
    let img = uploadImgInput.nextSibling.nextSibling;
    img.src = reader.result;
  };
});

//move toolTip with the slider
function setValue() {
  const newValue = Number(
    ((range.value - range.min) * 100) / (range.max - range.min)
  );
  const newPosition = 16 - newValue * 0.32;
  toolTip.innerHTML = range.value + " x " + range.value;
  toolTip.style.left = `calc(${newValue}% + (${newPosition}px)`;
}

document.addEventListener("DOMContentLoaded", setValue);
range.addEventListener("input", setValue);
