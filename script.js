const questions = [
    {
        question: "Which language is used to create the structure of a webpage?",
        options: ["HTML", "CSS", "Python", "Java"],
        answer: "HTML"
    },
    {
        question: "Which language is mainly used for styling webpages?",
        options: ["HTML", "CSS", "C", "Java"],
        answer: "CSS"
    },
    {
        question: "Which language is used to add interactivity to webpages?",
        options: ["JavaScript", "HTML", "CSS", "SQL"],
        answer: "JavaScript"
    },
    {
        question: "What does CPU stand for?",
        options: [
            "Central Processing Unit",
            "Computer Personal Unit",
            "Central Program Utility",
            "Control Processing Unit"
        ],
        answer: "Central Processing Unit"
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        options: ["//", "##", "<!--", "**"],
        answer: "//"
    },
    {
        question: "Which one is a programming language?",
        options: ["Python", "Chrome", "Windows", "Google"],
        answer: "Python"
    },
    {
        question: "What does RAM stand for?",
        options: [
            "Random Access Memory",
            "Read Access Memory",
            "Rapid Access Machine",
            "Run Access Memory"
        ],
        answer: "Random Access Memory"
    },
    {
        question: "Which company developed the Android operating system?",
        options: ["Google", "Microsoft", "Apple", "IBM"],
        answer: "Google"
    },
    {
        question: "Which data structure follows FIFO?",
        options: ["Queue", "Stack", "Tree", "Graph"],
        answer: "Queue"
    },
    {
        question: "Which HTML tag is used to create a hyperlink?",
        options: ["<a>", "<p>", "<h1>", "<img>"],
        answer: "<a>"
    }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timer;


// START QUIZ
function startQuiz() {
    currentQuestion = 0;
    score = 0;
    timeLeft = 30;

    showQuestion();
}


// SHOW QUESTION
function showQuestion() {

    clearInterval(timer);

    const container = document.querySelector(".container");
    const question = questions[currentQuestion];

    container.innerHTML = `
        <h2>Question ${currentQuestion + 1} / ${questions.length}</h2>

        <div class="timer">
            ⏱️ Time: <span id="time">${timeLeft}</span>s
        </div>

        <h3>${question.question}</h3>

        <div class="options" id="options"></div>

        <p id="message"></p>
    `;

    const optionsContainer = document.getElementById("options");

    question.options.forEach(option => {

        const button = document.createElement("button");

        button.className = "option-btn";
        button.textContent = option;

        button.addEventListener("click", function () {
            checkAnswer(button, option);
        });

        optionsContainer.appendChild(button);
    });

    startTimer();
}


// TIMER
function startTimer() {

    clearInterval(timer);

    timer = setInterval(() => {

        timeLeft--;

        const timeElement = document.getElementById("time");

        if (timeElement) {
            timeElement.textContent = timeLeft;
        }

        if (timeLeft <= 0) {

            clearInterval(timer);

            nextQuestion();
        }

    }, 1000);
}


// CHECK ANSWER
function checkAnswer(button, selectedAnswer) {

    clearInterval(timer);

    const correctAnswer = questions[currentQuestion].answer;

    const buttons = document.querySelectorAll(".option-btn");

    buttons.forEach(btn => {
        btn.disabled = true;
    });


    if (selectedAnswer === correctAnswer) {

        score++;

        button.classList.add("correct");

        document.getElementById("message").textContent =
            "✅ Correct!";

    } else {

        button.classList.add("wrong");

        document.getElementById("message").textContent =
            "❌ Wrong!";

        buttons.forEach(btn => {

            if (btn.textContent === correctAnswer) {
                btn.classList.add("correct");
            }

        });
    }


    setTimeout(() => {
        nextQuestion();
    }, 1000);
}


// NEXT QUESTION
function nextQuestion() {

    clearInterval(timer);

    currentQuestion++;
    timeLeft = 30;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        showResult();
    }
}


// SHOW RESULT
function showResult() {

    clearInterval(timer);

    const container = document.querySelector(".container");

    container.innerHTML = `
        <h1>🎉 Quiz Completed!</h1>

        <h2>Your Score</h2>

        <div class="score">
            ${score} / ${questions.length}
        </div>

        <p>
            ${getResultMessage()}
        </p>

        <button id="startBtn">
            🔄 Play Again
        </button>
    `;

    document.getElementById("startBtn").addEventListener("click", startQuiz);
}


// RESULT MESSAGE
function getResultMessage() {

    if (score >= 8) {
        return "🌟 Excellent! Great job!";
    }

    if (score >= 5) {
        return "👍 Good attempt! Keep learning!";
    }

    return "💪 Keep practicing and try again!";
}
