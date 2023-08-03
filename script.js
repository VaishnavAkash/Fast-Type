const endPoint = 'https://api.quotable.io/random';
const quoteDisplay = document.getElementById('quote-display');
const timeDisplay = document.getElementById('timer');
const quoteInput = document.getElementById('quoteInput');
const bestTime = document.getElementById('bestTime');
async function getnewText() {
    // const text = await fetchValue(endPoint);
    const text= 'Hello User, Start Typing to improve your typing skills today'
    const textArray = text.split('');
    quoteDisplay.innerHTML = '';
    quoteInput.value = '';
    textArray.forEach((val) => {
        const spanTag = document.createElement('span');
        spanTag.classList.add('eachChar');
        spanTag.innerText = val;
        quoteDisplay.appendChild(spanTag);
    })
    timer();
}

let correct = true;

quoteInput.addEventListener('input', () => {
    const charArray = document.querySelectorAll('.eachChar');
    const inputArray = quoteInput.value.split('');
    charArray.forEach((val, idx) => {
        if (!inputArray[idx]) {
            val.classList.remove('correct');
            val.classList.remove('incorrect');
            correct = false;
        }
        else if (charArray[idx].innerText == inputArray[idx]) {
            val.classList.add('correct');
            val.classList.remove('incorrect');
        } else if(charArray[idx]!= inputArray[idx]) {
            val.classList.add('incorrect');
            val.classList.remove('correct');
            correct = false;
        }
    })
    if (correct) {
        updateTime(currTime);
        clearInterval(key);
        getnewText();
    }
})
let key;
let currTime;
function timer() {
    const start = new Date();
    key= setInterval(() => {
        currTime = parseInt((new Date() - start) / 1000);
        timeDisplay.innerText = currTime;
    })
}

function updateTime() {
    if (!window.localStorage.getItem('currTime')) {
        window.localStorage.setItem('currTime', currTime);
        bestTime.innerText= window.localStorage.getItem('currTime')
        return;
    }
        const value = Math.min(currTime,parseInt(window.localStorage.getItem('currTime')));
        window.localStorage.setItem('currTime', value);
        bestTime.innerText = value;
}
function fetchValue(endPoint) {
    // return fetch(endPoint).then(res=>{return res.json()}).then(res=>{return res.content})
}

getnewText();

const updateRefreshTime = window.localStorage.getItem('currTime');
if (updateRefreshTime) {
    bestTime.innerText = parseInt(window.localStorage.getItem('currTime'));
}
