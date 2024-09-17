// Judge: 75/100

const baseUrl = 'http://localhost:3030/jsonstore/collections/books';

start();

function start() {
    toggleEditors();

    document.getElementById('loadBooks').addEventListener('click', loadBooks);
    document.getElementById('submit-form').addEventListener('submit', addBook);
    document.getElementById('table-body').addEventListener('click', tableAction);
    // document.getElementById('save-btn').addEventListener('click', editContent);
    document.getElementById('save-form').addEventListener('submit', editContent);
}

async function loadBooks() {
    const tableBody = document.querySelector('#book-table tbody');

    try {
        const response = await fetch(baseUrl);

        if (!response.ok) {
            throw new Error('Error');
        }

        const data = await response.json();

        let bigArr = Object.entries(data);

        bigArr.map(el => {
            let idKey = el[0];
            let bookInfo = el[1];

            if (bookInfo['_id'] === undefined) {
                bookInfo['_id'] = idKey
            }
        });

        const rows = Object.values(data).map(createRow);
        tableBody.replaceChildren(...rows);

    } catch (error) {
        alert(error.message);
    }
}

function createRow(record) {
    const element = document.createElement('tr');

    element.innerHTML = `
    <td>${record.title}</td>
    <td>${record.author}</td>
    <td>
        <button data-id="${record._id}" class="edit_btn">Edit</button>
        <button data-id="${record._id}" class="delete_btn">Delete</button>
    </td>`;

    return element;
}

async function addBook(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const author = formData.get('author');
    const title = formData.get('title');

    try {
        if (!author || !title) {
            throw new Error('All fields must be filled!');
        }

        const partData = {
            author: author,
            title: title
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(partData)
        }

        const response = await fetch(baseUrl, options);

        if (!response.ok) {
            throw new Error('Error');
        }

        const data = await response.json();

        loadBooks();
        event.target.reset();

    } catch (error) {
        alert(error.message);
    }
}

function tableAction(event) {
    const target = event.target;

    if (target.tagName == 'BUTTON') {
        if (target.classList.contains('delete_btn')) {
            deleteContent(target.dataset.id);
        } else if (target.classList.contains('edit_btn')) {
            loadCurrentBook(target.dataset.id);
        }
    }
}

async function deleteContent(recordId) {
    const url = `${baseUrl}/${recordId}`;

    try {
        const options = {
            method: 'DELETE'
        }

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error('Error');
        }

        loadBooks();

    } catch (error) {
        alert(error.message);
    }
}

async function loadCurrentBook(recordId) {
    const url = `${baseUrl}/${recordId}`;
    sessionStorage.setItem('bookId', recordId);

    document.getElementById('submit-form').style.display = 'none';
    document.getElementById('save-form').style.display = 'block';

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Error');
        }

        const data = await response.json();

        // document.getElementById('edit-part-id').value = data._id; // This is for 'input' with type="hidden" and id="edit-part-id" from index.html.
        // document.getElementById('title-field').value = data.title;
        // document.getElementById('author-field').value = data.author;

        document.querySelector('#save-form [name="title"]').value = data.title;
        document.querySelector('#save-form [name="author"]').value = data.author;

    } catch (error) {
        alert(error.message);
    }
}

async function editContent(event) {
    event.preventDefault();
    // console.log(event.target); // The edit form
    const id = sessionStorage.getItem('bookId');

    const formData = new FormData(event.target);
    const author = formData.get('author');
    const title = formData.get('title');

    const record = {};
    record._id = id;
    // record.title = document.getElementById('title-field').value;
    // record.author = document.getElementById('author-field').value;
    record.title = title;
    record.author = author;

    try {
        if (!record.author || !record.title) {
            throw new Error('All fields must be filled!');
        }

        const url = `${baseUrl}/${record._id}`;

        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(record)
        }

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error('Error');
        }

        const data = await response.json();

        toggleEditors();
        loadBooks();

    } catch (error) {
        alert(error.message);
    }
}

function toggleEditors() {
    document.getElementById('submit-form').style.display = 'block';
    document.getElementById('save-form').style.display = 'none';
}
