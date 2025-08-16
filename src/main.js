// * Imports
import { GetResult } from "./percentage.js";

// * 🚃The DOMS
// const difficultyButtons = document.querySelectorAll('input[name="difficulty"]');
const startBtn = document.querySelector("#myForm button");
const difficultyLevel = document.querySelector("#myForm");
const Input = document.querySelector(".js-input");
const TrySubmit = document.querySelector(".js-submitBtn");
const renderArea = document.querySelector(".heroSection");
// let popupClose;
// * 🌍The Global Vars
let difficulty;
let RandomValue;
let remaininTry;
// * 🏳️The Global flags
let SELECTED_DIFICULTY = false;
let TOTAL_TRY = 6;
let CLICK_COUNT = 0;
export let WIN_FLAG = false;
// Am goint to use it to stop changing the difficulty while playing.
// May be going to add the debouncing property to the submit button for the radio buttons.
// * 🧑‍💻The functions
// *👨‍🌾 The some Random updates
// *⚙️ The core logic

function generateRandom(difficulty) {
  const maxValues = { Easy: 10, Normal: 50, Hard: 100 };
  return Math.floor(Math.random() * maxValues[difficulty]);
}

startBtn.addEventListener("click", () => {
  if (!SELECTED_DIFICULTY) {
    const formdata = new FormData(difficultyLevel);
    difficulty = formdata.get("difficulty");

    SELECTED_DIFICULTY = true;
    RandomValue = generateRandom(difficulty);
    console.log(`Difficulty: ${difficulty}, Random Value: ${RandomValue}`);
    remaininTry = TOTAL_TRY - 1;
  } else {
    alert(`You Already selected a level: ${difficulty}`);
  }
});

TrySubmit.addEventListener("click", () => {
  let conclusion;
  if (!SELECTED_DIFICULTY) {
    alert("Please select a difficulty first!");
    return;
  }
  CLICK_COUNT++;
  if (CLICK_COUNT <= TOTAL_TRY) {
    let Guess = Number(Input.value);
    Input.value = "";
    let difference = Math.abs(RandomValue - Guess);
    conclusion = GetResult(difficulty, difference, WIN_FLAG);
    WIN_FLAG = conclusion.flag;
  }

  updateDisplay(conclusion.msg, conclusion.percent);
  remaininTry--;
  const popup = document.querySelector(".closePopup");
  const popupClose = document.querySelector(".closebtn");

  if (CLICK_COUNT === TOTAL_TRY) {
    TrySubmit.disabled = true;
    TrySubmit.classList.add("opacity-50", "cursor-not-allowed");
    console.log(WIN_FLAG);
    popup.classList.toggle("hidden");
    popupClose.onclick = () => {
      crossFunctionalities();
    };
    return;
  }
  if (WIN_FLAG === true) {
    TrySubmit.disabled = true;
    TrySubmit.classList.toggle("opacity-50", "cursor-not-allowed");
    console.log(WIN_FLAG);
    popup.classList.toggle("hidden");
    popupClose.onclick = () => {
      crossFunctionalities();
    };
  }
  function crossFunctionalities() {
    popup.classList.toggle("hidden");
    TrySubmit.disabled = false;
    TrySubmit.classList.toggle("opacity-50", "cursor-not-allowed");
    renderArea.innerHTML = "";
    document.querySelector(".footer").classList.add("fixed");
    //* flags changed to original pos.
    SELECTED_DIFICULTY = false;
    TOTAL_TRY = 6;
    CLICK_COUNT = 0;
    WIN_FLAG = false;
  }
});

function updateDisplay(A, B) {
  document.querySelector(".footer").classList.remove("fixed");
  let renderHTML = `
  <!-- ! this what i have to render using the js -->
<div class="bg-slate-300 w-full h-auto flex flex-col items-center gap-4 mb-5">
  <!-- ? Progress Bar -->
  <div class="progressBar w-2/3 sm:w-1/3 mt-10">
    <div
      class="relative w-full h-6 bg-white rounded-full overflow-hidden shadow-inner"
    >
      <!-- Gradient fill -->
      <div
        class="absolute top-0 left-0 h-6 bg-gradient-to-r from-red-500 via-yellow-200 to-green-500 transition-all duration-500"
        style="width: ${100 - B}%"
      ></div>
      <!-- Percentage text -->
      <span class="absolute w-full text-center text-black font-semibold top-0.5"
        >${100 - B}%</span
      >
    </div>
  </div>
  <!-- Remaining attemps and others-->
  <div
    class="mainDisplayArea mt-10 relative border-2 w-9/10 h-auto bg-stone-500/30 rounded-2xl flex flex-col items-center"
  >
    <span class="p-3 font-semibold font-mono"> Remaining Ateemps: ${remaininTry}</span>
    <span class="p-2 font-semibold font-mono text-xl">
      ${A}
    </span>
    <span class="p-2 font-semibold font-mono">
      Try out different difficulties
    </span>
    <!-- ?🧨 Should I add some Thank u or what ?
            -->
  </div>
  <!--?🖼️ Images and Popups -->
  <div
    class="closePopup fixed inset-0 bg-gray-600/30 backdrop-blur-md flex justify-center items-center z-[999] hidden"
  >
    <div class="relative bg-white w-80 max-w-md h-auto p-6 border-2 rounded-lg">
      <button
        class="closebtn absolute bg-red -300 px-4 py-1 rounded-xl top-3 right-1"
        
      >
        ❌
      </button>
      <img src="./public/images/Correct.png" alt="" />
      <p class="text-center font-mono">You Guessed It</p>
      <p class="text-center font-mono">Thanks for Playing the game.</p>
    </div>
  </div>
</div>
  
  
  `;
  renderArea.innerHTML = renderHTML;
}
