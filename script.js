// const RANDOM_QUOTE_API_URL = "http://api.quotable.io/random";
const quoteDisplayElement = document.getElementById("quote-display");
const quoteInput = document.getElementById("quoteInput");
const timer = document.getElementById("timer");
const bestTime = document.getElementById("BestTime");

quoteInput.addEventListener("input", () => {
  const allQuoteChars = document.querySelectorAll(".eachChar");
  const allInputChars = quoteInput.value.split("");

  let allCorrect = true;

  allQuoteChars.forEach((eQuoteChar, idx) => {
    if (!allInputChars[idx]) {
      console.log(
        "allChars are not complete : ",
        eQuoteChar.value,
        " - ",
        allInputChars[idx]
      );
      console.log(allInputChars);
      eQuoteChar.classList.remove("correct");
      eQuoteChar.classList.remove("incorrect");
      allCorrect = false;
    } else if (allInputChars[idx] == eQuoteChar.innerText) {
      eQuoteChar.classList.add("correct");
      eQuoteChar.classList.remove("incorrect");
    } else if (allInputChars[idx] != eQuoteChar.innerText) {
      console.log(
        "Mismatch in chars ",
        allInputChars[idx],
        " - ",
        eQuoteChar.innerText
      );
      eQuoteChar.classList.remove("correct");
      eQuoteChar.classList.add("incorrect");
      allCorrect = false;
    }
  });

  console.log(allCorrect);

  if (allCorrect) {
    const leastTime = window.localStorage.getItem("leastTime");
    if (!leastTime || leastTime == "undefined") {
      const val = parseInt(timer.innerText);
      window.localStorage.setItem("leastTime", val);
      bestTime.innerText = val;
    } else {
      const currTime = parseInt(timer.innerText);
      if (currTime < leastTime) {
        window.localStorage.setItem("leastTime", currTime);
        bestTime.innerText = currTime;
      }
    }
    quoteDisplayElement.innerHTML= '';
    getNextQuote();
  }
});

const getRandomQuote = () => {
  // return fetch(RANDOM_QUOTE_API_URL)
  //   .then((resp) => resp.json())
  //   .then((finalResp) => finalResp.content);
};

async function getNextQuote() {
  // const quote = await getRandomQuote();
  // quoteDisplayElement.innerHTML = "";
  // quoteInput.value = "";
  const quote=  'Hello User, Start Typing to improve your typing skills today';
  quoteInput.value='';  
  const quoteCharsArray = quote.split("");

  quoteCharsArray.forEach((eChar) => {
    const charSpan = document.createElement("span");
    charSpan.classList.add("eachChar");
    charSpan.innerText = eChar;
    quoteDisplayElement.appendChild(charSpan);
  });

  startTimer();
}

let startTime;
function startTimer() {
  timer.innerText = "0";
  startTime = new Date();
  setInterval(() => {
    let secsComp = parseInt((new Date() - startTime) / 1000);
    timer.innerText = secsComp;
  }, 1000);
}

getNextQuote();

const currLeastTime = window.localStorage.getItem("leastTime");
if (currLeastTime != "undefined" && currLeastTime != null) {
  console.log(currLeastTime);
  bestTime.innerText = currLeastTime;
}
