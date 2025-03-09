// all the variables
let turn_indicator_pl1 = true; // 'true' meaning its the turn of player 1
let turn_indicator_pl2 = false;
let pl1_total_current_score = 0;
let pl2_total_current_score = 0;
let pl1_total_saved_score = 0;
let pl2_total_saved_score = 0;
let dice_number = 0; // number on dice face

// all the game buttons element
const save_button = document.getElementById("save_button");
const pl1_current_score = document.getElementById("pl1_current_score");
const pl1_saved_score = document.getElementById("pl1_saved_score");
const pl2_current_score = document.getElementById("pl2_current_score");
const pl2_saved_score = document.getElementById("pl2_saved_score");

// name elements of the players
const winner_name = document.getElementById("winner_name");
const pl1_name = document.getElementById("pl1_name");
const pl2_name = document.getElementById("pl2_name");

// the two page elements  
const victory_screenEls = document.getElementById("victory_screen");
const game_display = document.getElementById("game_display");

// this is to denote which players turn it is through colors
function changeColors(){
    const inputEls1 = document.getElementById("pl1_name");
    const inputEls2 = document.getElementById("pl2_name");

    if(turn_indicator_pl1){
        inputEls1.classList.add("active1");
        inputEls2.classList.remove("active1");
        pl1_current_score.classList.add("active1");
        pl2_current_score.classList.remove("active1");
        pl1_saved_score.classList.add("active2");
        pl2_saved_score.classList.remove("active2");
    }
    else{
        inputEls2.classList.add("active1");
        inputEls1.classList.remove("active1");
        pl1_current_score.classList.remove("active1");
        pl2_current_score.classList.add("active1");
        pl1_saved_score.classList.remove("active2");
        pl2_saved_score.classList.add("active2");
    }
}
changeColors();


// this is to save current score to saved score along with changing turns and decalring winners
save_button.addEventListener("click" , () => {

    // this adds total current score to saved score
    if(turn_indicator_pl1){
        pl1_total_saved_score += pl1_total_current_score;
        pl1_saved_score.innerText = pl1_total_saved_score;
    }
    else{
        pl2_total_saved_score += pl2_total_current_score;
        pl2_saved_score.innerText = pl2_total_saved_score;
    }

    // this resets the current score
    pl1_current_score.innerText = 0;
    pl2_current_score.innerText = 0;
    pl1_total_current_score = 0;
    pl2_total_current_score = 0;
    // changing turns
    turn_indicator_pl1 = !turn_indicator_pl1;
    turn_indicator_pl2 = !turn_indicator_pl2;

    // this is to check for the winner
    if(pl1_total_saved_score >= 100 || pl2_total_saved_score >= 100){
        
        if(turn_indicator_pl1){
            winner_name.innerText = pl2_name.value;
        }
        else{
            winner_name.innerText = pl1_name.value;
        } 
        victory_screenEls.classList.add("active_winner");
        game_display.classList.add("active_game");
    }
    // switch colors to denote the turn of another player
    changeColors();
});

// this creats dice itself in the form of a div called dice and returns dice
function createDice(number){
    // this matrix contain each dice face's dot co-ordinates(top, left)
    const dotPositionMatrix = {
        1: [
            [50, 50]
        ],
        2: [
            [20, 20],
            [80, 80]
        ],
        3: [
            [20, 20],
            [50, 50],
            [80, 80]
        ],
        4: [
            [20, 20],
            [20, 80],
            [80, 20],
            [80, 80]
        ],
        5: [
            [20, 20],
            [20, 80],
            [50, 50],
            [80, 20],
            [80, 80]
        ],
        6: [
            [20, 20],
            [20, 80],
            [50, 20],
            [50, 80],
            [80, 20],
            [80, 80]
        ]
    };

    // creats a div 
    const dice = document.createElement("div");

    // adds class to the div
    dice.classList.add('dice');

    // generates dots for each face 
    for(const dotPosition of dotPositionMatrix[number]){
        const dot = document.createElement('div');

        dot.classList.add('dice-dot');
        dot.style.setProperty("--top", dotPosition[0] +'%');
        dot.style.setProperty("--left", dotPosition[1] + '%');

        dice.appendChild(dot);
    }
    // returns the generated dic face
    return dice;
}

// this appends dice div to dice-container div (which is initially empty)
const diceContainer = document.querySelector('.dice-container');
// this initialises the dice with 5 number 
diceContainer.appendChild(createDice(5));

const roll_dice = document.getElementById("roll_dice");
// this generates a random dice face ,adds up current score and switches turns 
roll_dice.addEventListener("click", () => {

    // empties the dice container
    diceContainer.innerHTML = "";

    // generates random number
    let random_number = Math.floor(Math.random()*(6)) + 1;
    dice_number = random_number;

    // according to that random number, generate dice
    diceContainer.appendChild(createDice(dice_number));
 
    if(dice_number === 1){
        if(turn_indicator_pl1){
            pl1_total_current_score = 0;
            pl1_current_score.innerText = 0;
        }
        else {
            pl2_total_current_score = 0;
            pl2_current_score.innerText = 0;
        }
        turn_indicator_pl1 = !turn_indicator_pl1;
        turn_indicator_pl2 = !turn_indicator_pl2;
    }
    else{ 
        if(turn_indicator_pl1){
            pl1_total_current_score += dice_number;
            pl1_current_score.innerText = pl1_total_current_score;
        }
        else{
            pl2_total_current_score += dice_number;
            pl2_current_score.innerText = pl2_total_current_score;
        }

    }
    changeColors();
})

const reset = document.getElementById("reset");
reset.addEventListener("click", () => {
    turn_indicator_pl1 = true;
    turn_indicator_pl2 = false;
    pl1_total_current_score = 0;
    pl1_total_saved_score = 0;
    pl2_total_current_score = 0;
    pl2_total_saved_score = 0;
    dice_number = 0;

    pl1_current_score.innerText = 0;
    pl1_saved_score.innerText = 0;
    pl2_current_score.innerText = 0;
    pl2_saved_score.innerText = 0;

    diceContainer.innerHTML = "";
    diceContainer.appendChild(createDice(5));
    changeColors();
});

// this is the reset button at the winners screen
const reset_winnerEls = document.getElementById("reset_winner");
reset_winnerEls.addEventListener("click", () => {
    turn_indicator_pl1 = true;
    turn_indicator_pl2 = false;
    pl1_total_current_score = 0;
    pl1_total_saved_score = 0;
    pl2_total_current_score = 0;
    pl2_total_saved_score = 0;
    dice_number = 0;

    pl1_current_score.innerText = 0;
    pl1_saved_score.innerText = 0;
    pl2_current_score.innerText = 0;
    pl2_saved_score.innerText = 0;

    diceContainer.innerHTML = "";
    diceContainer.appendChild(createDice(5));
    changeColors();

    victory_screenEls.classList.remove("active_winner");
    game_display.classList.remove("active_game");
})
