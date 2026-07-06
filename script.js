let subjects = [];

function addSubject() {

    const subject = document.getElementById("subject").value.trim();
    const credits = Number(document.getElementById("credits").value);
    const grade = Number(document.getElementById("grade").value);

    if(subject === "" || credits <= 0){
        alert("Please enter valid subject and credits.");
        return;
    }

    subjects.push({
        subject,
        credits,
        grade
    });

    displaySubjects();

    document.getElementById("subject").value = "";
    document.getElementById("credits").value = "";
    document.getElementById("grade").selectedIndex = 0;
}

function displaySubjects(){

    const table = document.getElementById("tableBody");

    table.innerHTML = "";

    subjects.forEach(item=>{

        table.innerHTML += `
            <tr>
                <td>${item.subject}</td>
                <td>${item.credits}</td>
                <td>${item.grade}</td>
            </tr>
        `;

    });

}

function calculateCGPA(){

    if(subjects.length===0){
        alert("Add at least one subject.");
        return;
    }

    let totalCredits=0;
    let totalPoints=0;

    subjects.forEach(item=>{

        totalCredits += item.credits;
        totalPoints += item.credits * item.grade;

    });

    const cgpa = totalPoints / totalCredits;

    document.getElementById("result").innerHTML =
        "CGPA : " + cgpa.toFixed(2);
}
