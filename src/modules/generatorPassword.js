const copyBtn = document.querySelector("#copy-btn");
const generateBtn = document.querySelector("#generate-btn");
const passwordDisplay = document.querySelector("#password-display");

const lengthInput = document.querySelector("#length-input"),
  lengthSlider = document.querySelector("#length-slider");

const upperCaseCheck = document.querySelector("#uppercase"),
  lowerCaseCheck = document.querySelector("#lowercase"),
  numbersCheck = document.querySelector("#numbers"),
  symbolsCheck = document.querySelector("#symbols");

//function to get random lower , upper , number or symbol in a array
const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

// function to get random lowercase charter
function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function generatePassword() {
  // get value of all 4 checkboxes
  const lower = lowerCaseCheck.checked;
  const upper = upperCaseCheck.checked;
  const number = numbersCheck.checked;
  const symbol = symbolsCheck.checked;
  const length = lengthInput.value;

  let generatedPassword = "";

  const typesCount = lower + upper + number + symbol;
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );
  // getting the selected options

  if (typesCount === 0) {
    // if no checkbox selected
    passwordDisplay.value = " Please select atleast one option below...";
    return;
  }
  // if atleast one is checked
  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      // get function name of selected options
      // run that function which will give a random char the add in generated password variable
      generatedPassword += randomFunc[funcName]();
    });
  }
  // slice it to make equal to length
  const finalPassword = generatedPassword.slice(0, length);
  // update display
  passwordDisplay.value = finalPassword;
}

// run the function on startup
generatePassword();

//character length tracking
lengthInput.addEventListener("input", () => {
  lengthSlider.value = lengthInput.value;
  // generate on length change
  generatePassword();
});

lengthSlider.addEventListener("input", () => {
  lengthInput.value = lengthSlider.value;
  // generate on length change
  generatePassword();
});

//generate on button click
generateBtn.addEventListener("click", () => {
  generatePassword();
});

// generate on option change
upperCaseCheck.addEventListener("change", () => {
  generatePassword();
});
lowerCaseCheck.addEventListener("change", () => {
  generatePassword();
});
numbersCheck.addEventListener("change", () => {
  generatePassword();
});
symbolsCheck.addEventListener("change", () => {
  generatePassword();
});

//copy button to copy password
copyBtn.addEventListener("click", () => {
  const password = passwordDisplay.value;
  // return if nothing is in password input
  if (!password) {
    return;
  }
  // create a textarea on page then add value yo text area then copy that
  const textarea = document.createElement("textarea");
  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
});
