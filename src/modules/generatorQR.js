import QrCode from "./qr-code";

const customPicker = document.querySelectorAll(".custom-picker");
const colorPicker = document.querySelectorAll(".color-picker");
const customDropDown = document.querySelectorAll(".custom-dropdown");
const uploadElem = document.querySelector(".upload-img");
const uploadImgInput = document.querySelector("#upload-img-input");
const range = document.querySelector(".custom-slider input");
const toolTip = document.querySelector(".custom-slider span");

const generateBtn = document.querySelector(".generate-btn");
const container = document.querySelector(".qr-code-img");

const downloadPng = document.querySelector("#download-png"),
  downloadJpg = document.querySelector("#download-jpg"),
  downloadSvg = document.querySelector("#download-svg");

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

const navItems = document.querySelectorAll("nav div"),
  containers = document.querySelectorAll(".container");

const dropZone = document.querySelector(".dropzone"),
  dropZoneInput = document.querySelector("#file"),
  dropZoneText = document.querySelector(".dropzone .text"),
  resultTextArea = document.querySelector("#result"),
  copyBtn = document.querySelector("#copy"),
  openBtn = document.querySelector("#open");

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
      generateQrCode();
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
    generateQrCode();
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

generateQrCode();

//download functionality
downloadPng.addEventListener("click", () => {
  window.qr.download({
    name: "qrCode-" + Date.now(),
    extension: "png",
  });
});

downloadJpg.addEventListener("click", () => {
  window.qr.download({
    name: "qrCode-" + Date.now(),
    extension: "jpg",
  });
});

downloadSvg.addEventListener("click", () => {
  window.qr.download({
    name: "qrCode-" + Date.now(),
    extension: "svg",
  });
});

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
    containers.forEach((item) => {
      item.classList.remove("active");
    });
    //get id from clicked nav item add -container then select that container and add active
    document.querySelector(`#${item.id}-container`).classList.add("active");
  });
});

//functionality of drag and drop
//when a file is hovered on drop zone
const handleDragOver = (e) => {
  //prevent default
  e.preventDefault();
  e.stopPropagation();
  //add highlight class to hight dropzone
  dropZone.classList.add("highlight");
};

//highlight class added lets remove on drag leave
const handleDragLeave = (e) => {
  //prevent default
  e.preventDefault();
  e.stopPropagation();
  //add highlight class to hight dropzone
  dropZone.classList.remove("highlight");
};

const handleDrop = (e) => {
  //prevent default
  e.preventDefault();
  e.stopPropagation();
  //get the file
  const file = e.dataTransfer.files[0];
  //add file tip input file
  dropZoneInput.files = e.dataTransfer.files;
  //if file exists
  if (dropZoneInput.files.length) {
    //if file is empty do nothing
    if (!file) return;
    //if file selected check its image or other file
    if (!checkFile(file)) return;
    //if file valid fetch result
    let formData = new FormData();
    formData.append("file", file);
    fetchRequest(file, formData);
  }
};

//functionality to check file
function checkFile() {
  const validTypes = ["image/jpeg", "image/jpg", "image/png"];
  //if file is one the allowed
  if (validTypes.indexOf(file.type) === -1) {
    //if wrong file change text in drop zone
    dropZoneText.innerHTML = "please select an image file";
    return false;
  }
  //if valid file return true
  return true;
}

//use an api to get qr result
function fetchRequest(file, formData) {
  dropZone.innerHTML = "Scanning QR Code ...";
  fetch("http://api.qrserver.com/v1/read-qr-code/", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((result) => {
      //this will be decoded data
      result = result[0].symbol[0].data;
      dropZoneText.innerHTML = result
        ? "Upload QR Code to Scan"
        : "Couldn`t scan QR Code";
      if (!result) {
        return;
      }
      resultTextArea.innerHTML = result;
      //show buttons only when there is some text in textarea
      document.querySelector("#result-btns").classList.add("active");
      if (!isValidUrl(result)) {
        openBtn.style.display = "none";
      } else {
        openBtn.style.display = "block";
      }
      //show image in dropzone
      updateThumbnail(file);
    })
    .catch(() => {
      reset();
      dropZoneText.innerHTML = "Couldn`t scan QR Code";
    });
}

//reset function
function reset() {
  content = dropZone.querySelector(".content");
  img = dropZone.querySelector("img");
  img.src = "";
  img.classList.remove("show");
  content.classList.add("show");
  resultTextArea.innerText = "";
}

//update thumbnail
function updateThumbnail() {
  let reader = new FileReader();
  reader.readAsDataURL(img);
  reader.onload = () => {
    content = dropZone.querySelector(".content");
    img = dropZone.querySelector("img");
    img.src = reader.result;
    img.classList.add("show");
    content.classList.remove("show");
  };
}

function isValidUrl(urlString) {
  var urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // validate fragment locator
  return !!urlPattern.test(urlString);
}

//add event listener on drag
dropZone.addEventListener("dragover", handleDragOver);
//remove event listener on drag
dropZone.addEventListener("dragleave", handleDragLeave);
//add drop eventlistener
dropZone.addEventListener("drop", handleDrop);
dropZoneInput.addEventListener("change", (e) => {
  if (dropzoneInput.files.length) {
    let file = e.target.files[0];
    if (!file) return;
    if (!checkFile(file)) {
      return;
    }
    let formData = new FormData();
    formData.append("file", file);
    fetchRequest(file, formData);
  }
});

copyBtn.addEventListener("click", () => {
  text = resultTextarea.textContent;
  navigator.clipboard.writeText(text);
});

openBtn.addEventListener("click", () => {
  text = resultTextarea.textContent;
  window.open(text, "_blank");
});
