const wordEndIndex = [4, 9, 14, 19, 24];
let myWord = "";  // String to store the user's input progressively
let Word = "";  // The actual word of the day (to be fetched)
let isWordCompleted = false;  // Flag to track if the word has been completed

const inputs = Array.from(document.querySelectorAll(".Letterspace"));
const WordOfTheDay = "https://random-word-api.herokuapp.com/word?length=5";

async function GetWord() {
  try {
    const response = await fetch(WordOfTheDay);
    const data = await response.json();
    Word = data[0].toUpperCase();  // Make sure the word is in uppercase for uniformity
    console.log("Word of the Day:", Word); 
    setupInputListeners();  // Set up event listeners after fetching the word
  } catch (error) {
    console.error("Error fetching the word:", error);
  }
}

function setupInputListeners() {
  inputs.forEach((input) => {
    input.addEventListener("keyup", (event) => {
      if (isWordCompleted) {
        // Prevent any input or Backspace if the word is already completed
        event.preventDefault();
        return;
      }

      const currInput = event.target;
      const currInputIndex = inputs.indexOf(currInput);
      
      if (isLetter(event.key)) {
        myWord += currInput.value.toUpperCase();  // Append input to the word
        
        if (wordEndIndex.includes(currInputIndex)) {
          colorCodeInputs(currInputIndex - 4, currInputIndex);  // Color-code based on input indices
          
          if (myWord === Word) {
            alert("Correct Word!");
            disableInputs();  // Disable inputs when the word is correct
            isWordCompleted = true;  // Mark word as completed
          } else {
            alert("Incorrect Word");
            focusNext();  // Move focus to the next input
          }
          myWord = "";  // Reset myWord for the next try
        } else {
          focusNext();  // Focus on the next input if we haven't reached the end of the word
        }
      } else if (event.key === "Backspace") {
        myWord = myWord.slice(0, -1);  // Remove the last character from the input string
        focusBack();  // Focus on the previous input
      } else {
        event.preventDefault();  // Prevent invalid keys
      }
    });
  });
}

// Function to color-code the current word section
function colorCodeInputs(startIndex, endIndex) {
  const currentWordSection = myWord.split("");  // Split the input word into letters

  // Iterate over the letters of the input word and color code
  currentWordSection.forEach((letter, i) => {
    const input = inputs[startIndex + i];
    if (Word[i] === letter) {
      // Correct position
      input.style.backgroundColor = "green";
    } else if (Word.includes(letter)) {
      // Letter in word but wrong position
      input.style.backgroundColor = "yellow";
    } else {
      // Letter not in word
      input.style.backgroundColor = "lightgray";
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
  inputs[lastInputIndex].value = "";  // Clear the value of the previous input
  inputs[lastInputIndex].focus();  // Focus back on the last input
}

// Clear all inputs for a new attempt
function clearInputs() {
  inputs.forEach(input => {
    input.value = "";
    input.style.backgroundColor = "";  // Reset background color
  });
  myWord = "";  // Reset the user's input
  isWordCompleted = false;  // Reset the completion flag
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
