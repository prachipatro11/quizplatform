const params = new URLSearchParams(window.location.search);
const quizId = params.get("id");

const quizData = JSON.parse(localStorage.getItem(quizId));

if (!quizData) {
    document.body.innerHTML = "<h2>Quiz not found</h2>";
} else {
    document.getElementById("quizTitle").innerText =
        quizData.title;

    const form = document.getElementById("quizForm");

    quizData.questions.forEach((q, index) => {
        const div = document.createElement("div");
        div.className = "question-card";

        div.innerHTML = `
            <p><strong>Q${index + 1}.</strong> ${q.question}</p>

            <label>
                <input type="radio" name="q${index}" value="A">
                ${q.options.A}
            </label><br>

            <label>
                <input type="radio" name="q${index}" value="B">
                ${q.options.B}
            </label><br>

            <label>
                <input type="radio" name="q${index}" value="C">
                ${q.options.C}
            </label><br>

            <label>
                <input type="radio" name="q${index}" value="D">
                ${q.options.D}
            </label>
        `;

        form.appendChild(div);
    });

    document
    .getElementById("submitQuiz")
    .addEventListener("click", () => {

        let score = 0;

        quizData.questions.forEach((q, index) => {

            const selected = document.querySelector(
                `input[name="q${index}"]:checked`
            );

            if (
                selected &&
                selected.value === q.correctAnswer
            ) {
                score++;
            }
        });

        document.getElementById("result").innerText =
            `Score: ${score}/${quizData.questions.length}`;

        // Ask participant name
        const participantName = prompt("Enter your name");

        // Create result object
        const result = {
            participantName: participantName,
            score: score,
            date: new Date().toLocaleString()
        };

        // Get old results
        let results = JSON.parse(
            localStorage.getItem("quizResults")
        ) || [];

        // Add new result
        results.push(result);

        // Save back to localStorage
        localStorage.setItem(
            "quizResults",
            JSON.stringify(results)
        );
    });
}