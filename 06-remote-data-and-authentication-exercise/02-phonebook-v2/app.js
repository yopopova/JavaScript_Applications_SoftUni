function attachEvents() {
    document.getElementById('btnLoad').addEventListener('click', onLoadAllRecords); // with this function we load all the records
    document.getElementById('btnCreate').addEventListener('click', handleCreateRecord);
}

function handleCreateRecord() {
    const personEl = document.getElementById('person');
    const phoneEl = document.getElementById('phone');

    onCreateRecord(personEl.value, phoneEl.value);

    personEl.value = '';
    phoneEl.value = '';
}

function renderRecord(data) {
    const ul = document.getElementById('phonebook');
    ul.innerHTML = '';

    Object.values(data).forEach(rec => {
        const li = document.createElement('li');
        li.textContent = `${rec.person}: ${rec.phone}`;
        li.setAttribute('data-id', rec._id);

        const btn = document.createElement('button');
        btn.textContent = 'Delete';
        btn.addEventListener('click', handleDelete);
        li.appendChild(btn);

        ul.appendChild(li);
    });
}

function handleDelete(e) {
    const li = e.target.parentElement;
    const id = li.getAttribute('data-id');
    
    onDeleteRecord(id);
    li.remove(); // we should also clear the li element
}

async function onLoadAllRecords() {
    const url = 'http://localhost:3030/jsonstore/phonebook';
    const response = await fetch(url);
    const data = await response.json();
    return renderRecord(data);
}

async function onCreateRecord(person, phone) {
    const url = 'http://localhost:3030/jsonstore/phonebook';

    const body = {
        person,
        phone
    }

    const headers = getHeader('POST', body);
    const response = await fetch(url, headers);
    const data = await response.json();

    onLoadAllRecords(); // when u create the recprd invoke the refresher; this way we automacally load the new created record to the ul item
    return data;
}

async function onDeleteRecord(id) {
    const url = `http://localhost:3030/jsonstore/phonebook/${id}`;
    const headers = getHeader('DELETE', null);
    const response = await fetch(url, headers);
    const data = await response.json();
    return data;
}

function getHeader(method, body) {
    return {
        method: `${method}`,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
}

attachEvents();