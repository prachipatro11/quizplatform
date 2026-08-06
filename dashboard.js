// Read saved quiz results
let results = JSON.parse(
    localStorage.getItem("quizResults")
) || [];

const tableBody =
    document.querySelector("#resultTable tbody");

const sortBy =
    document.getElementById("sortBy");

// Display results
function displayResults(data) {

    tableBody.innerHTML = "";

    if (data.length === 0) {

        tableBody.innerHTML = `
        <tr>
            <td colspan="4">
                No Results Found
            </td>
        </tr>
        ;
`
        return;
    }

    data.forEach(result => {

        tableBody.innerHTML += `
        <tr>
            <td>${result.participantName}</td>
            <td>Quiz</td>
            <td>${result.score}</td>
            <td>${result.date}</td>
        </tr>
        `;
    });
}

// Initial load
displayResults(results);

// Sorting
sortBy.addEventListener("change", function () {

    if (this.value === "name") {

        results.sort((a, b) =>
            a.participantName.localeCompare(
                b.participantName
            )
        );

    } else if (this.value === "score") {

        results.sort((a, b) =>
            b.score - a.score
        );

    } else if (this.value === "date") {

        results.sort((a, b) =>
            new Date(b.date) - new Date(a.date)
        );
    }

    displayResults(results);
});