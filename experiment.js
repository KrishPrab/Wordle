const wordEndIndex = [4, 9, 14, 19, 24];
let myWord = ""; 
let Word = ""; 

const inputs = Array.from(document.querySelectorAll(".Letterspace"));
const WordOfTheDay = "https://random-word-api.herokuapp.com/word?length=5";

async function GetWord() {
  try {
    const response = await fetch(WordOfTheDay);
    const data = await response.json();
    Word = data[0].toUpperCase(); 
    console.log("Word of the Day:", Word); 
    setupInputListeners(); 
  } catch (error) {
    console.error("Error fetching the word:", error);
  }
}

function setupInputListeners() {
  inputs.forEach((input) => {
    input.addEventListener("keyup", (event) => {
      const currInput = event.target;
      const currInputIndex = inputs.indexOf(currInput);

      if (isLetter(event.key)) {
        myWord += currInput.value.toUpperCase(); 
        
        if (wordEndIndex.includes(currInputIndex)) {
          colorCodeInputs(currInputIndex - 4, currInputIndex); 
          if (myWord === Word) {
              alert("Correct Word!");
              disableInputs(); 
         
            } else if (currInputIndex === 24){
              alert("You Lost :(");
            } else {
            alert("Incorrect Word");
            focusNext();
          }
          myWord = ""; 
        } else {
          focusNext();
        }
      } else if (event.key === "Backspace") {
        myWord = myWord.slice(0, -1); 
        focusBack();
      } else {
        event.preventDefault();
      }
    });
  });
}

// Function to color-code the current word section
function colorCodeInputs(startIndex, endIndex) {
  myWord.split("").forEach((letter, i) => {
    const input = inputs[startIndex + i];
    if (Word[i] === letter) {
      // Correct position
      input.style.backgroundColor = "green";
    } else if (Word.includes(letter)) {
      // Letter in word but wrong position
      input.style.backgroundColor = "yellow";
    } else {
      // Letter not in word
      input.style.backgroundColor = "light gray";
    }
  });
}

// Move focus to the next input
function focusNext() {
  const currInput = document.activeElement;
  const currInputIndex = inputs.indexOf(currInput);
  const nextInputIndex = (currInputIndex + 1) % inputs.length;
  inputs[nextInputIndex].focus();
}

// Move focus back to the previous input
function focusBack() {
  const currInput = document.activeElement;
  const currInputIndex = inputs.indexOf(currInput);
  const lastInputIndex = (currInputIndex - 1 + inputs.length) % inputs.length;
  inputs[lastInputIndex].value = ""; // Clear previous input
  inputs[lastInputIndex].focus();
}

// Clear all inputs for a new attempt
function clearInputs() {
  inputs.forEach(input => {
    input.value = "";
    input.style.backgroundColor = ""; // Reset background color
  });
}

// Disable all inputs after a correct guess
function disableInputs() {
  inputs.forEach(input => input.disabled = true);
}

// Check if a character is a letter
function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

// Call GetWord to start the process
GetWord();
