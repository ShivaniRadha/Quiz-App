const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');

// PYTHON QUIZ QUESTIONS
const quiz = [
    {
        question: "Q. Which of the following is used to define a block of code in Python?",
        choices: ["Curly braces {}", "Parentheses ()", "Indentation", "Square brackets []"],
        answer: "Indentation"
    },
    {
        question: "Q. What is the output of: print(type([]))?",
        choices: ["list", "<class 'list'>", "tuple", "array"],
        answer: "<class 'list'>"
    },
    {
        question: "Q. Which keyword is used to create a function in Python?",
        choices: ["function", "fun", "def", "lambda"],
        answer: "def"
    },
    {
        question: "Q. What is the correct file extension for Python files?",
        choices: [".pyt", ".pt", ".py", ".python"],
        answer: ".py"
    },
    {
        question: "Q. What is the output of: print(10//3)?",
        choices: ["3.33", "3", "4", "3.0"],
        answer: "3"
    },
    {
        question: "Q. Which of the following is NOT a Python data type?",
        choices: ["list", "string", "boolean", "character"],
        answer: "character"
    },
    {
        question: "Q. How do you insert a comment in Python?",
        choices: ["// comment", "<!-- comment -->", "# comment", "/* comment */"],
        answer: "# comment"
    },
    {
        question: "Q. Which of these is used to create an object in Python?",
        choices: ["object()", "class()", "constructor()", "You must create a class first"],
        answer: "You must create a class first"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerID = null;

// Show Question
const showQuestions = () => {
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;

    choicesBox.textContent = "";
    questionDetails.choices.forEach(choice => {
        const div = document.createElement('div');
        div.textContent = choice;
        div.classList.add('choice');
        choicesBox.appendChild(div);

        div.addEventListener('click', () => {
            document.querySelectorAll(".choice").forEach(c => c.classList.remove("selected"));
            div.classList.add("selected");
        });
    });

    startTimer();
};

// Check Answer
const checkAnswer = () => {
    const selected = document.querySelector('.choice.selected');

    if (!selected) {
        displayAlert("Please select an answer");
        return;
    }

    if (selected.textContent === quiz[currentQuestionIndex].answer) {
        score++;
        displayAlert("Correct Answer!");
    } else {
        displayAlert(`Wrong Answer! Correct: ${quiz[currentQuestionIndex].answer}`);
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < quiz.length) {
        timeLeft = 15;
        showQuestions();
    } else {
        stopTimer();
        showScore();
    }
};

// Show Score
const showScore = () => {
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = `You scored ${score} out of ${quiz.length}!`;
    nextBtn.textContent = "Play Again";
    quizOver = true;
    timer.style.display = "none";
};

// Alert
const displayAlert = (msg) => {
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(() => alert.style.display = "none", 2000);
};

// Timer
const startTimer = () => {
    clearInterval(timerID);
    timer.textContent = timeLeft;

    timerID = setInterval(() => {
        timeLeft--;
        timer.textContent = timeLeft;

        if (timeLeft === 0) {
            stopTimer();
            displayAlert("Time Up!");
            showScore();
        }
    }, 1000);
};

const stopTimer = () => clearInterval(timerID);

// Shuffle Questions
const shuffleQuestions = () => {
    for (let i = quiz.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
    currentQuestionIndex = 0;
    showQuestions();
};

// Start Quiz
const startQuiz = () => {
    score = 0;
    timeLeft = 15;
    timer.style.display = "flex";
    shuffleQuestions();
};

// Start Button
startBtn.addEventListener('click', () => {
    startBtn.style.display = "none";
    container.style.display = "block";
    startQuiz();
});

// Next Button
nextBtn.addEventListener('click', () => {
    if (quizOver) {
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        quizOver = false;
        startQuiz();
    } else {
        checkAnswer();
    }
});
