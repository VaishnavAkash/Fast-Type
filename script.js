const randomQuote = 'https://api.quotable.io/random';
const quoteDisplay = document.getElementById('quote-display');
const quoteInput = document.getElementById('quoteInput');
const timer = document.getElementById('timer');
function getRandomQuote() {
    return fetch(randomQuote)
        .then(resp => { return resp.json() })
        .then(finalResp => {
            return finalResp.content;
    })
}

quoteInput.addEventListener('input', () => {
    const allQuoteChars = document.querySelectorAll('.eachChar');
    const allInputChars = quoteInput.value.split('');
    let correct = true;
    allQuoteChars.forEach((eChar, idx) => {
        if (!allInputChars[idx]) {
            eChar.classList.remove('correct');
            eChar.classList.remove('incorrect');
            correct = false;
        }
        else if (eChar.innerText == allInputChars[idx]) {
            eChar.classList.add('correct');
            eChar.classList.remove('incorrect');
        }
        else if (eChar.innerText != allInputChars[idx]) {
            eChar.classList.remove('correct');
            eChar.classList.add('incorrect');
            correct = false;
        }
    })
    if (correct) getNextQuote();
});
async function getNextQuote() {
    const quote = await getRandomQuote();
    quoteDisplay.innerHTML = '';
    const quoteArray = quote.split('');
    quoteArray.forEach((char) => {
        const charSpan = document.createElement('span');
        charSpan.classList.add('eachChar');
        charSpan.innerText = char;
        quoteDisplay.appendChild(charSpan);
    })
    quoteInput.value = '';
    startTimer();
}
let key;
let startTime;
function startTimer() {
    timer.innerText = '0';
    startTime = new Date();
    key= setInterval(() => {
        let currSec = parseInt(((new Date() - startTime))/1000);
        timer.innerText = currSec;
    },1000);
}           
getNextQuote();
 
