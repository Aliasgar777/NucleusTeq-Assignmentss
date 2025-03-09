// to find out category code for different categories 
const category_map = new Map([
    ["", null],
    ["General Knowledge", 9], 
    ["Books", 10],
    ["Films", 11],
    ["Music", 12],
    ["TeleVision", 14],
    ["Video Games", 15],
    ["Mythology", 20] ]);

// to store the category and level selected by the user
let level = ""; 
let category = "";
let category_code = null;
let url = "";
// to store the index of the question
let index = 0;
let score = 0;
let question_no = 1;


const categoryEls = document.querySelector('#categories');
// to get the category selected by the user
categoryEls.addEventListener('change', (e) => {
    category = e.target.value;  
    category_code = category_map.get(category);
    console.log(category_code);
})


const levelEls = document.querySelector('#levels');
// to get the level selected by the user
levelEls.addEventListener('change', (e) => {
    level = e.target.value;  
    console.log(level);
})


const start_btnEl = document.querySelector('#start_btn');
// to start the quiz
start_btnEl.addEventListener("click", () => {
    if(category_code !== null && level !== ""){
        url = `https://opentdb.com/api.php?amount=10&category=${category_code}&difficulty=${level}&type=multiple`; 
        get_questions();
    }
    else{
        alert('Please select both Category and Level');
    }
})

// to get the questions from the api
async function get_questions(){
    try{
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        display_questions(data);
    }
    catch(e){
        location.reload();
        alert("error message : ", e);
    }
}


let interval;
const timerEl = document.querySelector('#timer');
// to show the countdown timer
function showCountDown(questions_array, index){
    let time = 14;
    interval = setInterval(() => {
        timerEl.innerText = time;
        if(time === 0){
            clearInterval(interval);
            setColors(questions_array, index, null);
        }
        time--;
    }, 1000);

}


const end_screen_containerEl = document.querySelector('.end_screen_container');
const final_scoreEl = document.querySelector('#final_score');
const containerEl = document.querySelector('.container');
const nextEl = document.querySelector('#next');

// to display the questions
function display_questions(data){
    const questions_array = data.results;
    containerEl.classList.add('deactivate');

    const questionsEl = document.querySelector('.questions');

    const question_containerEl = document.querySelector('.question_container');
    question_containerEl.classList.add('active_any_container');

    display_single_question(questions_array, questionsEl, index);

    // to move to the next question
    nextEl.addEventListener( 'click', () => {
        clearInterval(interval);
        index++;
        questionsEl.innerHTML = "";
        if(index > 9){
            question_containerEl.classList.remove('active_any_container');
            end_screen_containerEl.classList.add('active_any_container');
            final_scoreEl.innerText = `${score} / 15`;
        }
        else display_single_question(questions_array, questionsEl, index);
    })

}

// to display a single question
function display_single_question(questions_array, questionsEl, index){

    nextEl.disabled = true;
    nextEl.classList.add('disabled');

    timerEl.innerText = 15;
    showCountDown(questions_array, index);

    const question_div = document.createElement('div');
    question_div.innerText = `${question_no}.${questions_array[index].question}`;
    question_no++;

    question_div.classList.add('question_itself');

    const answer_div = document.createElement('div');
    answer_div.classList.add('answers')
    
    display_options(questions_array, answer_div, index);

    questionsEl.appendChild(question_div);
    questionsEl.appendChild(answer_div);

    const optionsEls = document.querySelectorAll('.options');
    selectOption(optionsEls, questions_array, index);

}

// to display the options
function display_options(questions_array, answer_div, index){

    const ans_array = questions_array[index].incorrect_answers;
    ans_array.push(questions_array[index].correct_answer);

    // to shuffle the options
    const set = new Set();
    while(set.size < 4){
        set.add(Math.floor(Math.random() * 4))
    }
    console.log(set)

    // to display the options
    let n = 0;
    for(const value of set){
        const option = document.createElement('p');
        option.innerText = ans_array[value];
        n++;
        option.classList.add('options');
        answer_div.appendChild(option);

    }
}


const scoreEl = document.querySelector('#score');
// to select the option
function selectOption(optionsEls, questions_array, index){
    let clicked = false;
    optionsEls.forEach( (option) => {
        option.addEventListener("click", (e) => {
            if(!clicked){
                if(e.target.innerText === questions_array[index].correct_answer){
                    score++;
                    scoreEl.innerHTML = score;
                }
                setColors(questions_array, index, e);
                clicked = true;
            }
        });
    })
}

// to set the colors of the options
function setColors(questions_array, index, e){
    const optionsEls = document.querySelectorAll('.options');
    optionsEls.forEach((option) => {
        if(option.innerText === questions_array[index].correct_answer){
            option.style.backgroundColor = 'green';
            option.style.color = 'beige';
        }
        if(e !== null && e.target.innerText === option.innerText && e.target.innerText !== questions_array[index].correct_answer){
            option.style.backgroundColor = 'red';
            option.style.color = 'beige';
        } 
    })
    nextEl.disabled = false;
    nextEl.classList.remove('disabled');
    clearInterval(interval);
}


const play_again_btnEl = document.querySelector('#play_again');
// to play the quiz again
play_again_btnEl.addEventListener('click', () => {
    location.reload();
})