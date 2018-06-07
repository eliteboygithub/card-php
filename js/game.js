// Get the modal
var startModal = document.getElementById('StartModal');


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// cards array holds all cards
let card;
let cards;
//user name
var user_name;

// deck of all cards in game
const deck = document.getElementById("card-deck");

// declaring move variable
let moves = 0;
let counter = document.querySelector(".moves");
// end game matched number
var match_num;
// declare variables for star icons
const stars = document.querySelectorAll(".fa-star");

// declaring variable of matchedCards
let matchedCard = document.getElementsByClassName("match");

// declare modal
let modal = document.getElementById("popup1");

// array for opened cards
var openedCards = [];
// current level
var level;

// get the timer element.
var timer = document.querySelector(".timer");

cars = ["aston-martin","audi","bentley","bmw","ferrari","honda","hyundai","jaguar","lamborghini","mercedes","mitsubishi","porsche","skoda","toyoda","volkswagen"];

buildLayout(30);


function startGame(){
    handleStart();


    moves = 0;
    counter.innerHTML = moves;

    second = 0;
    minute = 0;
    hour = 0;

    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);

    // shuffle deck
    cards = shuffle(cards);
    // remove all exisiting classes from each card
    for (var i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
};


function handleStart()
{
    document.getElementById('start-modal').style.display = "none";
    var selectWidget = document.getElementById("memory-options").valueOf();

    user_name = document.getElementById("name-text").value;
    document.getElementById("title").innerText = "Memory Game - " +user_name;
    var grid = selectWidget.options[selectWidget.selectedIndex].value;
    var gridValues = grid.split('x');

    var numX = gridValues[0];
    var numY = gridValues[1];
    openedCards = [];
    var cardNum = numX * numY;
    match_num = cardNum;
    level = numX;
    hideCards(numX, numY);
}

// @description shuffles cards
// @param {array}
// @returns shuffledarray
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};



// Build grid of cards
function buildLayout(cards_num)
{
    var card_arr = [];
    if (cards_num < 1 ) {
        return;
    }
    var cardElement = document.createElement("LI");
    cardElement.classList.add('card');

    for (var i = 1; i < cards_num+1; i++) {

        var j = Math.round((i  / 2)) - 1;
        var cln = cardElement.cloneNode(true);
        cln.id = "card"+ i;
        cln.type = cars[j];
        card_arr.push(cln);
    }
    card_arr = shuffle(card_arr);

    [].forEach.call(card_arr, function(item) {
        deck.appendChild(item);
    });



}

// hide unusable cards
function hideCards(numX, numY) {
    var fnum = (numX * numY)+1;
    console.log(numX+" : " + numY);
    deck.classList.add("deck-"+ numX);
    for (var i = fnum; i < 31; i++) {
        var cardToDelete = document.getElementById('card'+ i);
        cardToDelete.style.display = "none";
    }
}

// get the elements
card = document.getElementsByClassName("card");
cards = [...card]

// @description toggles open and show class to display cards
var displayCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};



// loop to add event listeners to each card
for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click",congratulations);
};

// @description add opened cards to OpenedCards list and check if cards are match or not
function cardOpen() {

    openedCards.push(this);
    var len = openedCards.length;
    if(len === 2){
        moveCounter();
        if(openedCards[0].type === openedCards[1].type){
            matched();
        } else {
            unmatched();
        }
    }
};


// @description when cards match
function matched(){
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open", "no-event");
    openedCards[1].classList.remove("show", "open", "no-event");
    openedCards = [];
}


// description when cards don't match
function unmatched(){
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove("show", "open", "no-event","unmatched");
        openedCards[1].classList.remove("show", "open", "no-event","unmatched");
        enable();
        openedCards = [];
    },500);
}


// @description disable cards temporarily
function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}


// @description enable cards and disable matched cards
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}


// @description count player's moves
function moveCounter(){

    moves++;
    counter.innerHTML = moves;
    //start timer on first click
    if(moves == 1){
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }
    // setting rates based on moves
    if (moves > 8 && moves < 12){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 13){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
        }
    }
}


// @description game timer
var second = 0, minute = 0; hour = 0;
// var timer = document.getElementsByClassName("timer");

var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+" mins "+second+" secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}




// @desciption for user to play Again
function playAgain(){
    if(level == 5){
        startGame();
    }
    modal.classList.remove("show");
    NextLevel(level);
}

// go to next level
function NextLevel(cur_level) {
    console.log(cur_level);
    var new_level = Number(cur_level) + 1;
    moves = 0;
    counter.innerHTML = moves;

    second = 0;
    minute = 0;
    hour = 0;

    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);

    // shuffle deck
    cards = shuffle(cards);
    // remove all exisiting classes from each card
    for (var i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
        cards[i].style.display = "block";
    }

    openedCards = [];
    var cardNum = new_level * (new_level + 1);
    match_num = cardNum;
    console.log(match_num);
    level = new_level;
    hideCards(new_level, (new_level + 1));

}


// loop to add event listeners to each card
for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click",congratulations);
};

function showMenu() {
    location.reload();
}


// @description congratulations when all cards match, show modal and moves, time and rating
function congratulations(){
    if (matchedCard.length == match_num){
        clearInterval(interval);
        var finalTime = timer.innerHTML;

        // show congratulations modal
        modal.classList.add("show");
        //if it is lastlevel. change the button to Play again
        if(level == 5){
            document.getElementById("play-again").innerHTML = "Play Again 😄";
        }

        //showing move, rating, time on modal
        document.getElementById("cong-header").innerHTML = "Congratulations!!! 👍🏻 "+user_name;
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("totalTime").innerHTML = finalTime;


    };
}