import * as UI from './selectores.js';
import {alertaError} from './app.js';

class API {
    constructor(category, difficulty, type){
        this.category = category;
        this.difficulty = difficulty;
        this.type = type;
    }

    runAPI(){
        const url = `https://opentdb.com/api.php?amount=10&category=${this.category}&difficulty=${this.difficulty}&type=${this.type}`;

        console.log(url);

        //Hacer el fetch
        fetch(url)
            .then(resp => resp.json()) 
            .then(data => {
                console.log(data);

                if(data.response_code != 0){
                    //createelement div de error y append a resultado o confirmation
                    alertaError('No se pudo realizar la búsqueda con esos parámetros. Intenta otra vez.')
                } else {
                    //Esconder el main
                    UI.container.classList.add('collapse');
                    //Agregar Spinner
                    UI.spinner.classList.remove('collapse');
                    setTimeout(() => {
                        UI.spinner.classList.add('collapse');
                        if(this.type === 'multiple'){
                            runFetch(data);
                        } else {
                            printBoolean(data);
                        }
                        
                    }, 2000);
                }
                
            })
    }
}

let currentQuestion = {},
    acceptingAnswers = false,
    score = 0,
    questionCounter = 0,
    availableQuestions = [],

    questions = [];

const runFetch = (loadedQuestions) => {
    const {results} = loadedQuestions;

        questions = results.map(loadedQuestions => {
            const {question, incorrect_answers, correct_answer} = loadedQuestions;
            const formattedQuestion = {
                question: question
            };

            const answerChoices = [... incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random() * 3)+ 1;
            answerChoices.splice(formattedQuestion.answer -1, 0, correct_answer) 

            answerChoices.forEach((choice, index) => {
                formattedQuestion["choice" + (index + 1)] = choice;
            })

            return formattedQuestion;
        });
        startGame()
}

function printBoolean(loadedQuestions){
    const {results} = loadedQuestions;

        questions = results.map(loadedQuestions => {
            const {question, incorrect_answers, correct_answer, type} = loadedQuestions;
            const formattedQuestion = {
                question: question,
                type: type
            };

            const answerChoices = [... incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random() * 1)+ 1;
            answerChoices.splice(formattedQuestion.answer -1, 0, correct_answer) 

            answerChoices.forEach((choice, index) => {
                formattedQuestion["choice" + (index + 1)] = choice;
            })
            console.log(formattedQuestion);
            return formattedQuestion;
        });
        startGame()
}

const startGame = () => {
        UI.divaffirmation.classList.remove('collapse');
        questionCounter = 0;
        score = 0;
        availableQuestions = [... questions];
        getNewQuestion();
}

const getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter >= 10){
        //return window.location.assign("/end.html");
        let html = '';
        UI.divaffirmation.classList.add('collapse');
        UI.summary.classList.remove('collapse');

        html+= `
            <div class="card text-center my-3">
            <div class="card-body">
                <h5 class="card-title my-2">Score</h5>
                <p>${score}</p>
            <div class="card-footer text-muted">Thank you for playing</div>
            </div>
        `
        return;
        // TODO función para dar el score y recargar la página para jugar de nuevo.
    }

    questionCounter++;
    UI.questionCounterText.innerText = `${questionCounter}/10`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);//max = length of array por que va descreciendo

    currentQuestion = availableQuestions[questionIndex];

    question.innerText = currentQuestion.question;
//----------------------------------------------------------------------
    UI.answers.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });
    
    availableQuestions.splice(questionIndex, 1)
    acceptingAnswers = true;
}

UI.answers.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = selectedAnswer == currentQuestion.answer ? "btn-success" : "btn-danger";

        selectedChoice.classList.add(classToApply);

        if(classToApply == 'btn-success'){
            incrementScore(10);
        }
        setTimeout(() => {
            selectedChoice.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
        

    
    })
})

const incrementScore = num => {
    score += num;
    UI.scoreText.innerText = score;
}

/*

let html = '';
    const {results} = data;
    results.forEach(arreglo => {
        const {question, incorrect_answers, correct_answer, category, type, difficulty} = arreglo;
        //Aquí puedo llamar la función de imprimir la card con los 3 parámetros
        
        if(type === 'boolean'){
            html += `
            <div class="card text-center my-3">
                <div class="card-header">
                    <span style="font-weight:bold">Category:</span> ${category}  <span style="font-weight:bold">Type:</span> ${type}  <span style="font-weight:bold">Difficulty:</span> ${difficulty} 
                </div>
                <div class="card-body">
                    <h5 class="card-title my-2">${question}</h5>
                    <a href="#" class="btn btn-primary mt-4 mx-2">${incorrect_answers}</a>
                    <a href="#" class="btn btn-primary mt-4 mx-2">${correct_answer}</a>
                </div>
                <div class="card-footer text-muted">${category}</div>
            </div>
            `;
            UI.divaffirmation.innerHTML = html;
            UI.divaffirmation.classList.remove('collapse');
        } else {
            html += `
            <div class="card text-center my-3">
                <div class="card-header">
                    <span style="font-weight:bold">Category:</span> ${category}  <span style="font-weight:bold">Type:</span> ${type}  <span style="font-weight:bold">Difficulty:</span> ${difficulty} 
                </div>
                <div class="card-body">
                    <h5 class="card-title my-2">${question}</h5>
                    <a href="#" class="btn btn-primary mt-4 mx-2">${incorrect_answers[0]}</a>
                    <a href="#" class="btn btn-primary mt-4 mx-2">${incorrect_answers[1]}</a>
                    <a href="#" class="btn btn-primary mt-4 mx-2">${incorrect_answers[2]}</a>
                    <a href="#" class="btn btn-primary mt-4 mx-2">${correct_answer}</a>
                </div>
                <div class="card-footer text-muted">${category}</div>
            </div>
            `;
            UI.divaffirmation.innerHTML = html;
            UI.divaffirmation.classList.remove('collapse');
        }
        
    });

*/

// UI.divaffirmation.textContent = pregunta.question;

//TODO Presentar el resumen de los valores elegidos para confirmar y correr la función de arranque
//TODO Crear un If para comprobar el tipo de pregunta e imprimir 2 o 4 botones para las opciones de respuesta
//TODO Presentar las preguntas una por una
//TODO Crear función para correcto o incorrecto

export default API;