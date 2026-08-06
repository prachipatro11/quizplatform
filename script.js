/*====================================
    REGISTRATION FUNCTIONALITY
=====================================*/

// Get registration form
var registerForm = document.getElementById("registerForm");

// Check if register form exists on the page
if (registerForm) {

    registerForm.addEventListener("submit", function (event) {

        // Prevent page refresh
        event.preventDefault();

        // Get input values
        var username = document.getElementById("username").value.trim();
        var email = document.getElementById("email").value.trim();
        var password = document.getElementById("password").value.trim();

        // Get message area
        var registerMessage = document.getElementById("registerMessage");


        /* ==========================
           VALIDATE EMPTY FIELDS
        ========================== */

        if (username === "" || email === "" || password === "") {

            registerMessage.style.color = "red";
            registerMessage.innerHTML = "Please fill all fields.";

            return;
        }


        /* ==========================
           GET EXISTING USERS
        ========================== */

        var users = JSON.parse(localStorage.getItem("users")) || [];


        /* ==========================
           CHECK IF EMAIL EXISTS
        ========================== */

        var emailExists = false;

        for (var i = 0; i < users.length; i++) {

            if (users[i].email === email) {

                emailExists = true;
                break;
            }
        }

        if (emailExists) {

            registerMessage.style.color = "red";
            registerMessage.innerHTML = "Email already registered.";

            return;
        }


        /* ==========================
           CREATE NEW USER OBJECT
        ========================== */

        var newUser = {
            username: username,
            email: email,
            password: password
        };


        /* ==========================
           SAVE USER TO ARRAY
        ========================== */

        users.push(newUser);


        /* ==========================
           SAVE ARRAY TO LOCAL STORAGE
        ========================== */

        localStorage.setItem("users", JSON.stringify(users));


        /* ==========================
           SUCCESS MESSAGE
        ========================== */

        registerMessage.style.color = "green";
        registerMessage.innerHTML = "Registration successful!";

        // Clear form fields
        registerForm.reset();

    });

}



/*====================================
    LOGIN FUNCTIONALITY
=====================================*/

// Get login form
var loginForm = document.getElementById("loginForm");

// Check if login form exists on page
if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        // Prevent page refresh
        event.preventDefault();

        // Get login values
        var email = document.getElementById("loginEmail").value.trim();
        var password = document.getElementById("loginPassword").value.trim();

        // Get message area
        var loginMessage = document.getElementById("loginMessage");


        /* ==========================
           VALIDATE EMPTY FIELDS
        ========================== */

        if (email === "" || password === "") {

            loginMessage.style.color = "red";
            loginMessage.innerHTML = "Please fill all fields.";

            return;
        }


        /* ==========================
           GET USERS FROM STORAGE
        ========================== */

        var users = JSON.parse(localStorage.getItem("users")) || [];


        /* ==========================
           CHECK LOGIN DETAILS
        ========================== */

        var loggedInUser = null;

        for (var i = 0; i < users.length; i++) {

            if (
                users[i].email === email &&
                users[i].password === password
            ) {

                loggedInUser = users[i];
                break;
            }
        }


        /* ==========================
           LOGIN SUCCESS
        ========================== */

        if (loggedInUser) {

            // Save current logged-in user
            console.log(loggedInUser);
            localStorage.setItem(
                "currentUser",
                JSON.stringify(loggedInUser)
            );

            loginMessage.style.color = "green";
            loginMessage.innerHTML = "Login successful!";

            // Redirect to quiz page
            setTimeout(function () {
                window.location.href = "quiz.html";
            }, 1000);

        }

        /* ==========================
           LOGIN FAILED
        ========================== */

        else {

            loginMessage.style.color = "red";
            loginMessage.innerHTML = "Invalid email or password.";
        }

    });

}
let questions = [];

const addQuestionBtn = document.getElementById("addQuestionBtn");
const saveQuizBtn = document.getElementById("saveQuizBtn");
const questionList = document.getElementById("questionList");

addQuestionBtn.addEventListener("click", () => {
    const question = document.getElementById("question").value;
    const optionA = document.getElementById("optionA").value;
    const optionB = document.getElementById("optionB").value;
    const optionC = document.getElementById("optionC").value;
    const optionD = document.getElementById("optionD").value;
    const correctAnswer = document.getElementById("correctAnswer").value;

    if (
        !question ||
        !optionA ||
        !optionB ||
        !optionC ||
        !optionD ||
        !correctAnswer
    ) {
        alert("Please fill all fields");
        return;
    }

    const q = {
        question,
        options: {
            A: optionA,
            B: optionB,
            C: optionC,
            D: optionD
        },
        correctAnswer
    };

    questions.push(q);

    renderQuestions();

    document.getElementById("question").value = "";
    document.getElementById("optionA").value = "";
    document.getElementById("optionB").value = "";
    document.getElementById("optionC").value = "";
    document.getElementById("optionD").value = "";
    document.getElementById("correctAnswer").value = "";
});

function renderQuestions() {
    questionList.innerHTML = "";

    questions.forEach((q, index) => {
        const div = document.createElement("div");

        div.innerHTML = `
            <p><strong>Q${index + 1}:</strong> ${q.question}</p>
        `;

        questionList.appendChild(div);
    });
}

saveQuizBtn.addEventListener("click", () => {
    const quizHeading = document.getElementById("quizHeading").value;

    if (!quizHeading) {
        alert("Enter quiz heading");
        return;
    }

    if (questions.length === 0) {
        alert("Add at least one question");
        return;
    }

    // Unique Quiz Id
    const quizId = "quiz_" + Date.now();

    const quizData = {
        id: quizId,
        title: quizHeading,
        questions: questions
    };

    // Store in localStorage
    localStorage.setItem(quizId, JSON.stringify(quizData));

    const link = `${window.location.origin}/take-quiz.html?id=${quizId}`;

    document.getElementById("quizMessage").innerText =
        "Quiz saved successfully!";

    document.getElementById("quizLink").innerHTML = `
        ${link}
    `;
});
/*====================================
    QUIZ CREATION FUNCTIONALITY
=====================================*/
/*
// Array to store all questions temporarily
var questions = [];


// Get button references
var addQuestionBtn = document.getElementById("addQuestionBtn");
var saveQuizBtn = document.getElementById("saveQuizBtn");


// ====================================
// ADD QUESTION
// ====================================

// Check if Add Question button exists
if (addQuestionBtn) {

    addQuestionBtn.addEventListener("click", function () {

        // Get values from input fields
        var question = document.getElementById("question").value;
        var optionA = document.getElementById("optionA").value;
        var optionB = document.getElementById("optionB").value;
        var optionC = document.getElementById("optionC").value;
        var optionD = document.getElementById("optionD").value;
        var correctAnswer = document.getElementById("correctAnswer").value;


        // ==========================
        // VALIDATE EMPTY FIELDS
        // ==========================

        if (
            question === "" ||
            optionA === "" ||
            optionB === "" ||
            optionC === "" ||
            optionD === "" ||
            correctAnswer === ""
        ) {

            alert("Please fill all question fields.");
            return;
        }


        // ==========================
        // CREATE QUESTION OBJECT
        // ==========================

        var questionObject = {

            question: question,

            options: [
                optionA,
                optionB,
                optionC,
                optionD
            ],

            answer: correctAnswer

        };


        // ==========================
        // ADD QUESTION TO ARRAY
        // ==========================

        questions.push(questionObject);


        // ==========================
        // DISPLAY QUESTION ON SCREEN
        // ==========================

        displayQuestions();


        // ==========================
        // CLEAR INPUT FIELDS
        // ==========================

        document.getElementById("question").value = "";
        document.getElementById("optionA").value = "";
        document.getElementById("optionB").value = "";
        document.getElementById("optionC").value = "";
        document.getElementById("optionD").value = "";
        document.getElementById("correctAnswer").value = "";

    });

}



// ====================================
// DISPLAY ADDED QUESTIONS
// ====================================
/*function displayQuestions() {

    var questionList = document.getElementById("questionList");

    questionList.innerHTML = "";

    for (var i = 0; i < questions.length; i++) {

        questionList.innerHTML +=
            "<p><strong>Question " +
            (i + 1) +
            ":</strong> " +
            questions[i].question +
            "</p>";
    }

}
if (saveQuizBtn) {

    saveQuizBtn.addEventListener("click", function () {

        console.log("Save button clicked");

        var quizHeading =
            document.getElementById("quizHeading").value.trim();

        var quizMessage =
            document.getElementById("quizMessage");

        console.log("Heading:", quizHeading);
        console.log("Questions:", questions);

        if (quizHeading === "") {

            quizMessage.style.color = "red";
            quizMessage.innerHTML =
                "Please enter a quiz heading.";

            return;
        }

        if (questions.length === 0) {

            quizMessage.style.color = "red";
            quizMessage.innerHTML =
                "Please add at least one question.";

            return;
        }

        var currentUser =
            JSON.parse(localStorage.getItem("currentUser"));

        console.log("Current User:", currentUser);

        if (!currentUser) {

            quizMessage.style.color = "red";
            quizMessage.innerHTML =
                "Please login first.";

            return;
        }

        var quiz = {

            id: Date.now(),

            heading: quizHeading,

            createdBy: currentUser.email,

            questions: questions

        };

        var quizzes =
            JSON.parse(localStorage.getItem("quizzes")) || [];

        quizzes.push(quiz);
        var quizLink =
            "takequiz.html?id=" + quiz.id;

        localStorage.setItem(
            "quizzes",
            JSON.stringify(quizzes)
        );

        console.log(
            JSON.parse(localStorage.getItem("quizzes"))
        );

        quizMessage.style.color = "green";
        quizMessage.innerHTML =
            "Quiz Saved Successfully!";

   var linkHtml =
    "<p><strong>Share this link:</strong></p>" +
    "" + quizLink + "" +quizLink +"</a>";

document.getElementById("quizLink").innerHTML = linkHtml;


        document.getElementById("quizHeading").value = "";

        questions = [];

        document.getElementById("questionList").innerHTML = "";

    });

}*/

/*====================================
    TAKE QUIZ FUNCTIONALITY
=====================================*/
// Variables
var selectedQuiz = null;
var currentQuestionIndex = 0;
var score = 0;
// Get HTML Elements
var quizSelect = document.getElementById("quizSelect");
var startQuizBtn = document.getElementById("startQuizBtn");
var questionText = document.getElementById("questionText");
var optionsContainer = document.getElementById("optionsContainer");
var nextBtn = document.getElementById("nextBtn");
var submitBtn = document.getElementById("submitBtn");
var quizContainer = document.getElementById("quizContainer");
var scoreContainer = document.getElementById("scoreContainer");
var finalScore = document.getElementById("finalScore");
var quizHeading = document.getElementById("quizHeading");



/*====================================
    LOAD QUIZZES INTO DROPDOWN
=====================================*/

if (quizSelect) {

    var quizzes =
        JSON.parse(localStorage.getItem("quizzes")) || [];

    for (var i = 0; i < quizzes.length; i++) {

        var option = document.createElement("option");

        option.value = i;
        option.textContent = quizzes[i].heading;

        quizSelect.appendChild(option);
    }
}



/*====================================
    START QUIZ
=====================================*/

if (startQuizBtn) {

    startQuizBtn.addEventListener("click", function () {

        var selectedIndex = quizSelect.value;

        if (selectedIndex === "") {

            alert("Please select a quiz.");
            return;
        }

        var quizzes =
            JSON.parse(localStorage.getItem("quizzes")) || [];

        selectedQuiz = quizzes[selectedIndex];

        currentQuestionIndex = 0;
        score = 0;

        quizContainer.style.display = "block";

        quizHeading.innerHTML = selectedQuiz.heading;

        displayQuestion();

    });
}



/*====================================
    DISPLAY QUESTION
=====================================*/

function displayQuestion() {

    var currentQuestion =
        selectedQuiz.questions[currentQuestionIndex];

    questionText.innerHTML =
        currentQuestion.question;

    optionsContainer.innerHTML = "";

    for (var i = 0; i < currentQuestion.options.length; i++) {

        var optionLetter = "";

        if (i === 0) {
            optionLetter = "A";
        }

        if (i === 1) {
            optionLetter = "B";
        }

        if (i === 2) {
            optionLetter = "C";
        }

        if (i === 3) {
            optionLetter = "D";
        }

        optionsContainer.innerHTML +=

            '<label>' +
            '<input type="radio" ' +
            'name="answer" ' +
            'value="' + optionLetter + '">' +

            optionLetter + ". " +
            currentQuestion.options[i] +

            '</label><br><br>';
    }


    // Last Question

    if (
        currentQuestionIndex ===
        selectedQuiz.questions.length - 1
    ) {

        nextBtn.style.display = "none";
        submitBtn.style.display = "inline-block";

    } else {

        nextBtn.style.display = "inline-block";
        submitBtn.style.display = "none";
    }
}



/*====================================
    NEXT QUESTION
=====================================*/

if (nextBtn) {

    nextBtn.addEventListener("click", function () {

        checkAnswer();

        currentQuestionIndex++;

        displayQuestion();

    });
}



/*====================================
    SUBMIT QUIZ
=====================================*/

if (submitBtn) {

    submitBtn.addEventListener("click", function () {

        checkAnswer();

        showResult();

    });
}



/*====================================
    CHECK ANSWER
=====================================*/

function checkAnswer() {

    var selectedOption =
        document.querySelector(
            'input[name="answer"]:checked'
        );

    if (selectedOption) {

        var selectedAnswer =
            selectedOption.value;

        var correctAnswer =
            selectedQuiz.questions[
                currentQuestionIndex
            ].answer;

        if (selectedAnswer === correctAnswer) {

            score++;
        }
    }
}



/*====================================
    SHOW RESULT
=====================================*/

function showResult() {

    quizContainer.style.display = "none";

    scoreContainer.style.display = "block";

    finalScore.innerHTML =
        "Your Score: " +
        score +
        " / " +
        selectedQuiz.questions.length;

    saveScore();
}



/*====================================
    SAVE SCORE
=====================================*/

function saveScore() {

    // Get Logged-In User

    var currentUser =
        JSON.parse(
            localStorage.getItem("currentUser")
        );

    // Get Previous Scores

    var scores =
        JSON.parse(
            localStorage.getItem("scores")
        ) || [];


    // Create Score Object

    var scoreObject = {

        participantName:
            currentUser.username,

        quizHeading:
            selectedQuiz.heading,

        score:
            score,

        totalQuestions:
            selectedQuiz.questions.length

    };


    // Add Score

    scores.push(scoreObject);


    // Save Score

    localStorage.setItem(
        "scores",
        JSON.stringify(scores)
    );

}
