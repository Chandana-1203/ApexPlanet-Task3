// script.js
const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: "Paris"
    },
    {
        question: "Which language is used for web development?",
        options: ["Python", "HTML", "Java", "C++"],
        answer: "HTML"
    },
    {
        question: "Who wrote 'Hamlet'?",
        options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
        answer: "William Shakespeare"
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Jupiter"
    },
    {
        question: "Which country is known as the Land of the Rising Sun?",
        options: ["China", "Japan", "South Korea", "India"],
        answer: "Japan"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timerInterval;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const submitButton = document.getElementById("submit");
const resultElement = document.getElementById("result");
const retryButton = document.getElementById("retry");
const timerElement = document.getElementById("time");

function loadQuestion() {
    clearInterval(timerInterval);
    timeLeft = 30;
    timerElement.textContent = timeLeft;
    startTimer();

    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = "";

    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.classList.add("option");
        button.textContent = option;
        button.onclick = () => selectAnswer(option);
        optionsElement.appendChild(button);
    });
}

function selectAnswer(selectedOption) {
    const correctAnswer = quizData[currentQuestionIndex].answer;
    if (selectedOption === correctAnswer) {
        score++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    questionElement.classList.add("hide");
    optionsElement.classList.add("hide");
    submitButton.classList.add("hide");
    resultElement.textContent = `Your score: ${score}/${quizData.length}`;
    resultElement.classList.remove("hide");
    retryButton.classList.remove("hide");
}

retryButton.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    resultElement.classList.add("hide");
    retryButton.classList.add("hide");
    questionElement.classList.remove("hide");
    optionsElement.classList.remove("hide");
    submitButton.classList.remove("hide");
    loadQuestion();
});

loadQuestion();