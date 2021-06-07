const RANDOM_QUOTE_API_URL = 'https://quotable.io/random';
let displayElm = document.getElementById('quoteDisplay');
let inputElm = document.getElementById('quoteInput');
let timerElm = document.getElementById('timer');

let startTime;

function getTime() {
    return Math.floor((new Date() - startTime) / 1000);
}

function startTimer() {
    timerElm.innerText = 0;
    startTime = new Date();
    setInterval(() => {
        timerElm.innerText = getTime();
    }, 1000);
}

function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
        .then(response => response.json())
        .then(data => data.content)
}

async function renderNewQuote() {
    const quote = await getRandomQuote()
    console.log(quote);
    displayElm.innerHTML = '';
    quote.split('').forEach(char => {
        let charSpan = document.createElement('span');
        charSpan.innerText = char;
        displayElm.appendChild(charSpan);
    });
    inputElm.value = null;
    startTimer();
}

inputElm.addEventListener('input', () => {
    let arrQ = displayElm.querySelectorAll('span');
    let arri = inputElm.value.split('');
    let correct = true;

    arrQ.forEach((charspan, ind) => {
        let character = arri[ind];
        if (character == null) {
            charspan.classList.remove('correct');
            charspan.classList.remove('incorrect');
            correct = false;

        } else if (character === charspan.innerText) {
            charspan.classList.add('correct');
            charspan.classList.remove('incorrect');
        } else {
            charspan.classList.add('incorrect');
            charspan.classList.remove('correct');
            correct = false;
        }
    });
    if (correct) {
        let cnttime = parseInt(timerElm.innerText);
        console.log(cnttime);
        renderNewQuote();
    }
});


renderNewQuote();