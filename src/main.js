// * 🚃The DOMS
// const difficultyButtons = document.querySelectorAll('input[name="difficulty"]');
const startBtn = document.querySelector("#myForm button");
const difficultyLevel = document.querySelector("#myForm");
const Input = document.querySelector(".js-input");
const TrySubmit = document.querySelector(".js-submitBtn");
// * 🌍The Global Vars
let difficulty;
let RandomValue;
// * 🏳️The Global flags
let SELECTED_DIFICULTY = false;
let TOTAL_TRY = 4;
let CLICK_COUNT = 0;
let WIN_FLAG = false;
// Am goint to use it to stop changing the difficulty while playing.
// May be going to add the debouncing property to the submit button for the radio buttons.
// * 🧑‍💻The functions
// *👨‍🌾 The some Random updates
// *⚙️ The core logic

function generateRandom(difficulty) {
  const maxValues = { Easy: 10, Normal: 50, Hard: 100 };
  return Math.floor(Math.random() * maxValues[difficulty]);
}

function GetResult(difficulty, difference) {
  let max;
  if (difficulty === "Easy") {
    max = 10;
  } else if (difficulty === "Normal") {
    max = 50;
  } else if (difficulty === "Hard") {
    max = 100;
  }

  const percent = (difference / max) * 100;
  if (percent === 0) return "Got it";
  else if (percent <= 10) return "Almost There";
  else if (percent <= 25) return "You're close";
  else if (percent <= 40) return "Not so close";
  else return "Bruh";
}

startBtn.addEventListener("click", () => {
  if (!SELECTED_DIFICULTY) {
    const formdata = new FormData(difficultyLevel);
    difficulty = formdata.get("difficulty");

    SELECTED_DIFICULTY = true;
    RandomValue = generateRandom(difficulty);
    console.log(`Difficulty: ${difficulty}, Random Value: ${RandomValue}`);
  } else {
    alert(`You Already selected a level: ${difficulty}`);
  }
});

TrySubmit.addEventListener("click", () => {
  if (!SELECTED_DIFICULTY) {
    alert("Please select a difficulty first!");
    return;
  }
  CLICK_COUNT++;
  if (CLICK_COUNT <= TOTAL_TRY) {
    let Guess = Number(Input.value);
    Input.value = "";
    let difference = Math.abs(RandomValue - Guess);
    const conclusion = GetResult(difficulty, difference);
    console.log(conclusion);
  }
  if (CLICK_COUNT === TOTAL_TRY) {
    TrySubmit.disabled = true;
    TrySubmit.classList.add("opacity-50", "cursor-not-allowed");
  }
});
if (TrySubmit.disabled) {
  console.log("wait what!!");
}
