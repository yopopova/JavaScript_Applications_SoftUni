const url = 'http://localhost:3030/jsonstore/phonebook';

const ul = document.getElementById('phonebook');
const person = document.getElementById('person');
const phone = document.getElementById('phone');

function attachEvents() {
    document.getElementById('btnLoad').addEventListener('click', onClickLoad); // With this function we load all the records.
    document.getElementById('btnCreate').addEventListener('click', onClickCreate); // With this function we create a record.
}

async function onClickCreate() {

    if(person.value !== '' && phone.value !== '') {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({person: person.value, phone: phone.value}) // Or we can add them to object, named 'data' and add the 'data' here.
        });

        person.value = '';
        phone.value = '';
    }
}

async function onClickLoad() {
    ul.innerHTML = ''; // Here we can also use '.replaceChildren()'.

    const response = await fetch(url);
    const data = await response.json();
    
    Object.values(data).forEach(x => {
        const {person, phone, _id} = x;
        const li = createElement('li', `${person}: ${phone}`, ul);
        li.setAttribute('id', _id);

        const deleteBtn = createElement('button', 'Delete', li);
        deleteBtn.setAttribute('id', 'btnDelete');
        deleteBtn.addEventListener('click', onClickDelete);
    });
}

async function onClickDelete(ev) {
    const id = ev.target.parentNode.id;
    ev.target.parentNode.remove();

    const deleteResponce = await fetch(`${url}/${id}`, {
        method: 'DELETE'
    });
}

// This function creates an HTML element.
function createElement(type, text, appender) {
    const result = document.createElement(type);
    result.textContent = text;
    appender.appendChild(result);
    return result;
}

attachEvents();