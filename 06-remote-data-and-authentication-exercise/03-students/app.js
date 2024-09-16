const url = 'http://localhost:3030/jsonstore/collections/students';
const table = document.querySelector('#results tbody');

async function addStudents() {
    document.getElementById('submit').addEventListener('click', onClickSubmit);

    const response = await fetch(url);
    const data = await response.json();

    Object.values(data).forEach(student => {
        const tr = document.createElement('tr');
        table.appendChild(tr);

        const firstNameCell = tr.insertCell(0);
        firstNameCell.innerText = student.firstName;

        const lastNameCell = tr.insertCell(1);
        lastNameCell.innerText = student.lastName;

        const facultyNumberCell = tr.insertCell(2);
        facultyNumberCell.innerText = student.facultyNumber;

        const gradeCell = tr.insertCell(3);
        gradeCell.innerText = student.grade;
    });
}

async function onClickSubmit(ev) {
    ev.preventDefault();

    const firstNameInput = document.querySelector('input[name="firstName"]');
    const lastNameInput = document.querySelector('input[name="lastName"]');
    const facultyNumberInput = document.querySelector('input[name="facultyNumber"]');
    const gradeInput = document.querySelector('input[name="grade"]');

    if (isNaN(gradeInput.value)) { // isNaN(facultyNumberInput.value) || ...
        alert('Wrong input data!');
    }

    if (firstNameInput.value !== '' && lastNameInput.value !== '' && facultyNumberInput.value !== '' && gradeInput.value !== '') {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: firstNameInput.value,
                lastName: lastNameInput.value,
                facultyNumber: facultyNumberInput.value,
                grade: gradeInput.value
            })
        });

        const tr = document.createElement('tr');
        table.appendChild(tr);

        const firstNameCell = tr.insertCell(0);
        firstNameCell.innerText = firstNameInput.value;

        const lastNameCell = tr.insertCell(1);
        lastNameCell.innerText = lastNameInput.value;

        const facultyNumberCell = tr.insertCell(2);
        facultyNumberCell.innerText = facultyNumberInput.value;

        const gradeCell = tr.insertCell(3);
        gradeCell.innerText = gradeInput.value;
    }

    firstNameInput.value = '';
    lastNameInput.value = '';
    facultyNumberInput.value = '';
    gradeInput.value = '';
}

addStudents();