import qrCode from "./qr-code";

const customPicker = document.querySelectorAll(".custom-picker");
const colorPicker = document.querySelectorAll(".color-picker");
const customDropDown = document.querySelectorAll(".custom-dropdown");
const uploadElem = document.querySelector(".upload-img");
const uploadImgInput = document.querySelector("#upload-img-input");
const range = document.querySelector(".custom-slider input");
const toolTip = document.querySelector(".custom-slider span");

const generateBtn = document.querySelector(".generate-btn");
const container = document.querySelector(".qr-code-img");

const width = document.getElementById("size"),
  height = document.getElementById("size"),
  data = document.getElementById("text"),
  foregroundColor = document.getElementById("fg-color"),
  backgroundColor = document.getElementById("bg-color"),
  cornerColor = document.getElementById("corner-color"),
  imageRadios = document.querySelectorAll('input[name="logo"]'),
  dotsStyle = document.getElementById("dots-style"),
  cornerSquaresStyle = document.getElementById("corner-squares-style"),
  cornerDotsStyle = document.getElementById("corner-dots-style");

//generate code when any value change
width.addEventListener("change", generateQrCode);
height.addEventListener("change", generateQrCode);
data.addEventListener("input", generateQrCode);
foregroundColor.addEventListener("change", generateQrCode);
backgroundColor.addEventListener("change", generateQrCode);
cornerColor.addEventListener("change", generateQrCode);
generateBtn.addEventListener("click", generateQrCode);
imageRadios.forEach((item) => {
  item.addEventListener("change", generateQrCode);
});

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

//function to generate QR
function generateQrCode() {
  let imageRadio = document.querySelector('input[name="logo"]:checked');
  let image = document.getElementById(imageRadio.value);
  const qr = new qrCode({
    width: width.value,
    height: height.value,
    type: "canvas",
    data: data.value,
    image: image.src,
    imageOptions: {
      saveAsBlob: true,
      crossOrigin: "anonymous",
      margin: 2,
    },
    dotsOptions: {
      color: foregroundColor.value,
      type: dotsStyle.innerHTML,
    },
    backgroundOptions: {
      color: backgroundColor.value,
    },
    cornersSquareOptions: {
      color: cornerColor.value,
      type: cornerSquaresStyle.innerHTML,
    },
    cornersDotOptions: {
      color: cornerColor.value,
      type: cornerDotsStyle.innerHTML,
    },
  });
  container.innerHTML = "";
  qr.append(container);
}

generateQrCode();
