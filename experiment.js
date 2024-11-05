const wordLength = 0;
const wordEndIndex = [4, 9, 14, 19, 24];
let currWord = ""; // Current word bucket

const inputs = Array.from(document.querySelectorAll(".Letterspace"));

inputs.forEach((input) => {
  input.addEventListener("keyup", (event) => {
    const currInput = event.target;

    if (isLetter(event.key)) {
      currWord += currInput.value;

      if (wordEndIndex.includes(inputs.indexOf(currInput))) {
        // Check/Style Word Function
        alert("Incorrect Word");
        focusNext();
        console.log(GetWord());
        currWord = "";
      } else {
        focusNext();
      }
    } else if (event.key === "Backspace") {
      currWord = currWord.slice(0, -1);
      focusBack();
    } else {
      event.preventDefault();
    }
  });
});

const WordOfTheDay = "https://cors-anywhere.herokuapp.com/https://words.dev-apis.com/wordof-the-day/get-word-of-the-day?random=1";
const ValidateWord = "https://words.dev-apis.com/validate-word";

async function GetWord() {
  try {
    const response = await fetch(WordOfTheDay);
    const data = await response.json();
    console.log(data.message);
  } catch (error) {
    console.error("Error fetching the word:", error);
  }
}

function focusNext() {
  const currInput = document.activeElement;
  const currInputIndex = inputs.indexOf(currInput);
  const nextInputIndex = (currInputIndex + 1) % inputs.length;
  inputs[nextInputIndex].focus();
}

function focusBack() {
  const currInput = document.activeElement;
  const currInputIndex = inputs.indexOf(currInput);
  const lastInputIndex = (currInputIndex - 1 + inputs.length) % inputs.length;
  const input = inputs[lastInputIndex];
  input.value = ""; // Clear current input
  input.focus();
}

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

document.addEventListener("click", GetWord);
