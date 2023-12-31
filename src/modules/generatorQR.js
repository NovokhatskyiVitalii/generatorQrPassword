import QrCode from "./qr-code";

const navItems = document.querySelectorAll("nav div"),
  containers = document.querySelectorAll(".container");

const customPicker = document.querySelectorAll(".custom-picker"),
  colorPicker = document.querySelectorAll(".color-picker");

const uploadElem = document.querySelector(".upload-img"),
  uploadImgInput = document.querySelector("#upload-img-input");

const customDropdown = document.querySelectorAll(".custom-dropdown");

const generateBtn = document.querySelector(".generate-btn"),
  container = document.querySelector(".qr-code-img");

const width = document.querySelector("#size"),
  height = document.querySelector("#size"),
  data = document.querySelector("#text"),
  foregroundColor = document.querySelector("#fg-color"),
  backgroundColor = document.querySelector("#bg-color"),
  cornerColor = document.querySelector("#corner-color"),
  imageRadios = document.querySelectorAll('input[name="logo"]'),
  dotsStyle = document.querySelector("#dots-style"),
  cornerSquaresStyle = document.querySelector("#corner-squares-style"),
  cornerDotsStyle = document.querySelector("#corner-dots-style");

const downloadPng = document.querySelector("#download-png"),
  downloadJpg = document.querySelector("#download-jpg"),
  downloadSvg = document.querySelector("#download-svg");

const range = document.querySelector(".custom-slider input"),
  tooltip = document.querySelector(".custom-slider span");

let name;

//move toolTip with the slider
function setValue() {
  const newValue = Number(
      ((range.value - range.min) * 100) / (range.max - range.min)
    ),
    newPosition = 16 - newValue * 0.32;
  tooltip.innerHTML = range.value + " x " + range.value;
  tooltip.style.left = `calc(${newValue}% + (${newPosition}px))`;
}

//function to generate QR
function generateQRCode() {
  let imageRadio = document.querySelector('input[name="logo"]:checked');
  let image = document.getElementById(imageRadio.value);
  const qr = new QrCode({
    width: width.value,
    height: height.value,
    type: "canvas",
    data: data.value,
    image: image.src,
    imageOptions: {
      saveAsBlob: true,
      crossOrigin: "anonymous",
      margin: 5,
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
  window.qr = qr;
  container.innerHTML = "";
  qr.append(container);
}

generateQRCode();

//add event listener on all nav items
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    //click nav item remove active from other
    navItems.forEach((item) => {
      item.classList.remove("active");
    });
    //add active to clicked
    item.classList.add("active");
    //show the relative container
    containers.forEach((container) => {
      container.classList.remove("active");
    });
    //get id from clicked nav item add -container then select that container and add active
    document.querySelector(`#${item.id}-container`).classList.add("active");
  });
});

customPicker.forEach((item) => {
  item.addEventListener("click", () => {
    item.querySelector(".color-picker").click();
  });
});

colorPicker.forEach((item) => {
  item.addEventListener("change", (e) => {
    color = e.target.value;
    span = item.parentElement.querySelector("span");
    input = item.parentElement.querySelector("input[type=text]");
    span.style.backgroundColor = color;
    input.value = color;
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
    generateQRCode();
  };
});

document.addEventListener("DOMContentLoaded", setValue);
range.addEventListener("input", setValue);

//add event listeners on all option inside custom dropdown
customDropdown.forEach((item) => {
  //  select all options inside a custom dropdown
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
      generateQRCode();
    });
  });
});

//generate code when any value change
width.addEventListener("change", generateQRCode);
height.addEventListener("change", generateQRCode);
data.addEventListener("input", generateQRCode);
foregroundColor.addEventListener("change", generateQRCode);
backgroundColor.addEventListener("change", generateQRCode);
cornerColor.addEventListener("change", generateQRCode);
generateBtn.addEventListener("click", generateQRCode);
imageRadios.forEach((radio) => {
  radio.addEventListener("change", generateQRCode);
});

//download functionality
downloadPng.addEventListener("click", () => {
  qr.download({
    name: "qrCode-" + Date.now(),
    extension: "png",
  });
});

downloadJpg.addEventListener("click", () => {
  qr.download({
    name: "qrCode-" + Date.now(),
    extension: "jpg",
  });
});

downloadSvg.addEventListener("click", () => {
  qr.download({
    name: "qrCode-" + Date.now(),
    extension: "svg",
  });
});
