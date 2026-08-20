const questions = [
    {
        question: "Which language is used to structure a webpage?",
        options: ["CSS", "HTML", "JavaScript", "Python"],
        answer: 1
    },
    {
        question: "Which CSS property is used to change text color?",
        options: ["font-color", "text-color", "color", "background-color"],
        answer: 2
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        options: ["var", "let", "const", "All of the above"],
        answer: 3
    },
    {
        question: "Which symbol is used for single-line comments in JavaScript?",
        options: ["<!-- -->", "//", "/* */", "#"],
        answer: 1
    },
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyper Tool Markup Language",
            "Hyperlinks Text Markup Language"
        ],
        answer: 0
    },
    {
        question: "Which function is used to print messages in browser console?",
        options: ["console.print()", "console.write()", "console.log()", "print()"],
        answer: 2
    },
    {
        question: "Which CSS property changes font size?",
        options: ["font-style", "text-size", "font-size", "text-style"],
        answer: 2
    },
    {
        question: "Which HTML attribute defines inline styles?",
        options: ["class", "style", "styles", "font"],
        answer: 1
    },
    {
        question: "Which array method adds an element to the end of an array?",
        options: ["pop()", "push()", "shift()", "unshift()"],
        answer: 1
    },
    {
        question: "What is the correct extension for JavaScript files?",
        options: [".java", ".js", ".script", ".jsx"],
        answer: 1
    }
];

let currentQuestionIndex = 0;
let userAnswers = new Array(questions.length).fill(null);
let studentName = "";
let timeLeft = 300;
let timerInterval = null;

function startExam() {
    const nameInput = document.getElementById("student-name").value.trim();
    if (nameInput === "") {
        document.getElementById("error-message").innerText = "Please enter your name";
        return;
    }

    studentName = nameInput;
    document.getElementById("error-message").innerText = "";
    document.getElementById("student-display").innerText = studentName;

    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("exam-screen").classList.remove("hidden");

    startTimer();
    showQuestion();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;

        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;

        if (minutes < 10) minutes = "0" + minutes;
        if (seconds < 10) seconds = "0" + seconds;

        document.getElementById("timer-display").innerText = `${minutes}:${seconds}`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Time is up! Your exam has been submitted.");
            submitExam(true);
        }
    }, 1000);
}

function showQuestion() {
    const currentQ = questions[currentQuestionIndex];

    document.getElementById("question-count").innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;
    document.getElementById("progress-fill").style.width = `${progressPercent}%`;

    document.getElementById("question-text").innerText = `${currentQuestionIndex + 1}. ${currentQ.question}`;

    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";

    currentQ.options.forEach((optionText, index) => {
        const optionBtn = document.createElement("button");
        optionBtn.className = "option-btn";
        if (userAnswers[currentQuestionIndex] === index) {
            optionBtn.classList.add("selected");
        }
        optionBtn.innerText = optionText;
        optionBtn.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(optionBtn);
    });

    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const submitBtn = document.getElementById("submit-btn");

    if (currentQuestionIndex === 0) {
        prevBtn.style.visibility = "hidden";
    } else {
        prevBtn.style.visibility = "visible";
    }

    if (currentQuestionIndex === questions.length - 1) {
        nextBtn.classList.add("hidden");
        submitBtn.classList.remove("hidden");
    } else {
        nextBtn.classList.remove("hidden");
        submitBtn.classList.add("hidden");
    }
}

function selectAnswer(index) {
    userAnswers[currentQuestionIndex] = index;
    showQuestion();
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
    }
}

function submitExam(forceSubmit = false) {
    if (!forceSubmit && !confirm("Are you sure you want to submit the exam?")) {
        return;
    }

    clearInterval(timerInterval);

    let correctCount = 0;
    userAnswers.forEach((ans, idx) => {
        if (ans === questions[idx].answer) {
            correctCount++;
        }
    });

    const total = questions.length;
    const wrongCount = total - correctCount;
    const percentage = Math.round((correctCount / total) * 100);

    document.getElementById("res-score").innerText = `${correctCount} / ${total}`;
    document.getElementById("res-percentage").innerText = `${percentage}%`;
    document.getElementById("res-correct").innerText = correctCount;
    document.getElementById("res-wrong").innerText = wrongCount;

    document.getElementById("exam-screen").classList.add("hidden");
    document.getElementById("result-screen").classList.remove("hidden");
}

function resetExam() {
    currentQuestionIndex = 0;
    userAnswers = new Array(questions.length).fill(null);
    timeLeft = 300;
    document.getElementById("student-name").value = "";

    document.getElementById("result-screen").classList.add("hidden");
    document.getElementById("start-screen").classList.remove("hidden");
}
