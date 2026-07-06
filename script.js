let subjects = [];

function addSubject() {

    const subject = document.getElementById("subject").value.trim();
    const credits = Number(document.getElementById("credits").value);
    const semester = Number(document.getElementById("semester").value);
    const grade = Number(document.getElementById("grade").value);

    if (subject === "" || credits <= 0 || semester <= 0) {
        alert("Please enter valid subject, credits and semester.");
        return;
    }

    subjects.push({
        subject,
        credits,
        semester,
        grade
    });

    displaySubjects();
    updateWhatIfSubjects();

    document.getElementById("subject").value = "";
    document.getElementById("credits").value = "";
    document.getElementById("semester").value = "";
    document.getElementById("grade").selectedIndex = 0;
}

function displaySubjects() {

    const table = document.getElementById("tableBody");
    table.innerHTML = "";

    subjects.forEach(item => {

        table.innerHTML += `
        <tr>
            <td>${item.subject}</td>
            <td>${item.credits}</td>
            <td>${item.semester}</td>
            <td>${item.grade}</td>
        </tr>
        `;

    });

}

function calculateCGPA() {

    if (subjects.length === 0) {
        alert("Add at least one subject.");
        return;
    }

    let totalCredits = 0;
    let totalPoints = 0;

    subjects.forEach(item => {

        totalCredits += item.credits;
        totalPoints += item.credits * item.grade;

    });

    const cgpa = totalPoints / totalCredits;

    document.getElementById("result").innerHTML =
        "Overall CGPA : " + cgpa.toFixed(2);

    // Semester-wise GPA
    const semesterMap = {};

    subjects.forEach(item => {

        if (!semesterMap[item.semester]) {
            semesterMap[item.semester] = {
                credits: 0,
                points: 0
            };
        }

        semesterMap[item.semester].credits += item.credits;
        semesterMap[item.semester].points += item.credits * item.grade;

    });

    let semesterText = "";

    for (let sem in semesterMap) {

        const gpa =
            semesterMap[sem].points /
            semesterMap[sem].credits;

        semesterText += `Semester ${sem}: ${gpa.toFixed(2)}<br>`;

    }

    document.getElementById("semesterResult").innerHTML =
        semesterText;

}

function updateWhatIfSubjects() {

    const dropdown = document.getElementById("whatIfSubject");

    dropdown.innerHTML = "";

    subjects.forEach((item, index) => {

        dropdown.innerHTML +=
            `<option value="${index}">
                ${item.subject}
            </option>`;

    });

}

function predictCGPA() {

    if (subjects.length === 0) {
        alert("Add subjects first.");
        return;
    }

    const index = document.getElementById("whatIfSubject").value;

    if (index === "") {
        alert("Select a subject.");
        return;
    }

    const newGrade = Number(document.getElementById("newGrade").value);

    const tempSubjects = subjects.map(item => ({ ...item }));

    tempSubjects[index].grade = newGrade;

    let totalCredits = 0;
    let totalPoints = 0;

    tempSubjects.forEach(item => {

        totalCredits += item.credits;
        totalPoints += item.credits * item.grade;

    });

    const predicted = totalPoints / totalCredits;

    document.getElementById("prediction").innerHTML =
        "Predicted CGPA : " + predicted.toFixed(2);

}
