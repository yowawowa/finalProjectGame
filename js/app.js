let userScore = 0;
let compScore = 0;

// DOM variables
const userScore_span = document.getElementById('user-score');
const compScore_span = document.getElementById('comp-score');
const scoreboard_div = document.querySelector('.scoreboard');
const winner_span = document.getElementById('winner');
const action_span = document.getElementById('action');
const loser_span = document.getElementById('loser');
const flavour_span = document.getElementById('flavour');
const result_p = document.querySelector('.result > p');
const rock_div = document.getElementById('r');
const paper_div = document.getElementById('p');
const scissors_div = document.getElementById('s');

function convertAction(userChoice, compChoice) {  // select proper wording. depends on selected items
    switch (userChoice + compChoice) {
        case "rs":
            return ' beats ';
        case "pr":
            return ' covers ';
        case "sp":
            return ' cuts ';
        case "rp":
            return ' covers ';
        case "ps":
            return ' cuts ';
        case "sr":
            return ' beats ';
        case "pp":
            return `Paper on Paper. It's a draw!`;
        case "ss":
            return `Scissors on Scissors. It's a draw!`;
        case "rr":
            return `Rock on Rock. It's a draw!`;
    }
}

function convertResult(result) {  // converse single-letter result from both user and computer functions to normal wording
    switch (result) {
        case "r":
            return 'Rock';
        case "s":
            return 'Scissors';
        case "p":
            return 'Paper';
    }
}

function win(userChoice, compChoice) {      // winning function
    userScore++;                            //score increase
    userScore_span.innerHTML = userScore;   // setting scores to apropriate spans in html
    compScore_span.innerHTML = compScore;
    const userChoice_div = document.getElementById(userChoice); // const for clearer code
    result_p.innerHTML = '';                                    // getting rid of welcome message
    //@TODO integrate scss variables
    winner_span.innerHTML = `${convertResult(userChoice)}`;     // placing winner in HTML
    action_span.innerHTML = `${convertAction(userChoice, compChoice)}`; //placing action word in HTML
    loser_span.innerHTML = `${convertResult(compChoice)}`;      // placing loser in HTML
    flavour_span.innerHTML = `. You WIN!!`;                     // adding flavour words
    winner_span.style.color = '#5B8263'; // from scss           // set colours for comp and user. but appropriate to winer or loseer
    loser_span.style.color = '#c17c74'; // from scss
    userChoice_div.classList.add('green-glow');                 // adding winning glow to selected card
    userChoice_div.classList.remove('default-glow');      // removing previous border styling. @TODO scss style conflict
    setTimeout(() => userChoice_div.classList.remove('green-glow'), 1000);  // reverting styles after short delay
    setTimeout(() => userChoice_div.classList.add('default-glow'), 1000);
}

function loss(userChoice, compChoice) {     // pretty much same code but winner and loser change places
    compScore++;
    userScore_span.innerHTML = userScore;
    compScore_span.innerHTML = compScore;
    const userChoice_div = document.getElementById(userChoice);
    result_p.innerHTML = '';
    //@TODO integrate scss variables
    winner_span.style.color = '#c17c74'; // from scss
    loser_span.style.color = '#5B8263'; // from scss
    winner_span.innerHTML = `${convertResult(compChoice)}`;
    action_span.innerHTML = `${convertAction(userChoice, compChoice)}`;
    loser_span.innerHTML = `${convertResult(userChoice)}`;
    flavour_span.innerText = `. You LOST...`;
    userChoice_div.classList.add('red-glow');
    userChoice_div.classList.remove('default-glow');
    setTimeout(() => userChoice_div.classList.remove('red-glow'), 1000);
    setTimeout(() => userChoice_div.classList.add('default-glow'), 1000);
}

function draw(userChoice, compChoice) { // even less code since nmo change in colours. only shadow added
    const userChoice_div = document.getElementById(userChoice);
    result_p.innerHTML = '';
    winner_span.innerHTML = ``;
    action_span.innerHTML = `${convertAction(userChoice, compChoice)}`;
    loser_span.innerHTML = ``;
    flavour_span.innerHTML = '';
    document.getElementById(userChoice).classList.add('grey-glow');
    setTimeout(() => userChoice_div.classList.remove('grey-glow'), 1000);
}

function getComputerChoice() {          // rng for computer
    const choices = ['r', 'p', 's'];
    return choices[Math.floor(Math.random() * 3)]
}

function game(userChoice) {    // decider function. checks both inputs from user and rng and return values in appropriate funcs
    const compChoice = getComputerChoice();
    switch (userChoice + compChoice) {
        case "rs":
        case "pr":
        case "sp":
            win(userChoice, compChoice);
            break;
        case "rp":
        case "ps":
        case "sr":
            loss(userChoice, compChoice);
            break;
        case "rr":
        case "pp":
        case "ss":
            draw(userChoice, compChoice);
            break;
    }
}

function main() { // main app. listens for clicks on imgs
    rock_div.addEventListener('click', function () {
        game("r");
    })
    paper_div.addEventListener('click', function () {
        game("p");
    })
    scissors_div.addEventListener('click', function () {
        game("s");
    })
}

main();
