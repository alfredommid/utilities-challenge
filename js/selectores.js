export const formulario = document.querySelector('#formulario'),
             container = document.querySelector('#container'),
             divaffirmation = document.querySelector('#confirmation'),
             spinner = document.querySelector('.spinner'),
             correctBonus = 10,
             question = document.querySelector('#question'),
             answers = Array.from(document.getElementsByClassName('answer')),
             questionCounterText = document.querySelector('#questionCounter'),
             scoreText = document.getElementById('score'),
             summary = document.getElementById('summary');
             //booleanDiv = document.getElementById('boolean'),
             //booleanDiv1 = document.getElementById('boolean1');

export var currentQuestion = {},
           acceptingAnswers = true,
           score = 0,
           questionCounter = 0,
           availableQuestions = [],

           questions = [];

