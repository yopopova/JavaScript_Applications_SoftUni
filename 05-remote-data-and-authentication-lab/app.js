start();

function start() {
    const email = localStorage.getItem('email');

    if(email != null) {
        document.getElementById('welcome').textContent = `Welcome back, ${email}!`;
        // ^ We make this to show message on screen for logged user.
    }

    document.getElementById('editor_create').addEventListener('submit', postData);
    document.getElementById('save_btn').addEventListener('click', savePart);
    document.getElementById('load_btn').addEventListener('click', loadData);
    document.getElementById('table_body').addEventListener('click', tableAction); // In 'deleteRecord' function we have delegation, so we have to know where the user clicked.
    document.getElementById('cancel_btn').addEventListener('click', toggleEditors);
}

// Task 2: Load and display
async function loadData() {
    const url = 'http://localhost:3030/jsonstore/autoparts';
    const response = await fetch(url);
    const data = await response.json();

    // console.log(data);

    const rows = Object.values(data).map(createRow); // If we print this in 'createRow' function, it will return all the elements on the server.
    document.getElementById('table_body').replaceChildren(...rows); // '.replaceChildren()' accept array, so we write '...'.
}

function createRow(record) {
    // console.log(record);
    const element = document.createElement('tr');
    element.innerHTML = `
    <td>${record._id}</td>
    <td>${record.label}</td>
    <td>$${record.price}</td>
    <td>${record.qty}</td>
    <td>
        <button data-id="${record._id}" class="delete_btn">Delete</button>
        <button data-id="${record._id}" class="edit_btn">Edit</button>
    </td>`;
    // ^ We also add the id to the button with 'data-id' attribute.

    return element;
}

// Task 1: Post data
async function postData(event) {
    event.preventDefault(); // Every button in HTML refresh the page!!!

    const formData = new FormData(event.target);

    // Here we should check for errors, because here we interact with the user and he can add empty fields !!! Use 'if'.
    // In .get() we write the 'name' attribute value.
    const partData = {
        label: formData.get('label'),
        price: Number(formData.get('price')),
        qty: Number(formData.get('qty'))
    }
    // Here we should check for errors, because here we interact with the user and he can add empty fields !!! Use 'if'.

    // ------------------- This is equivalent to form data -------------------
    // const label = document.getElementById('part_label').value;
    // const price = Number(document.getElementById('part_price').value);
    // const qty = Number(document.getElementById('part_qty').value);

    // const partData = {
    //     label,
    //     price,
    //     qty
    // }
    // ------------------- This is equivalent to form data -------------------


    const url = 'http://localhost:3030/jsonstore/autoparts';

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(partData)
    }

    // Here is the second place where we can have error, but with the server !!! Use try/catch.
    // We should also try if the response is ok!
    const response = await fetch(url, options);
    const result = await response.json();
    // Here is the second place where we can have error, but with the server !!!

    loadData(); // Like this we refresh the data after 'delete' request.
    event.target.reset(); // Like this we clear the form fields.
}

// Task 3: Event delegation
function tableAction(event) { // It will leads to table body and delete or edit the request.
    const target = event.target;

    if (target.tagName == 'BUTTON') {
        if (target.classList.contains('delete_btn')) {
            // const itemId = target.dataset.id;
            // console.log(itemId);
            deleteRecord(target.dataset.id); // With 'dataset' we take the id of the element and give it to 'deleteRecord' function.
            // 'dataset' returns string
        } else if (target.classList.contains('edit_btn')) {
            loadForEditing(target.dataset.id);
        }
    }
}

// Task 4: Delete data
async function deleteRecord(recordId) {
    const choice = confirm('Are you sure?'); // Similar like 'alert()', but also have 'cancel'. This blocks the browser.
    // We make it because we don't want to delete current element immediatelly, we want ot ask first.

    if(choice == false) { // If the coice is false, we don't want to execute the next code.
        return;
    }

    const url = 'http://localhost:3030/jsonstore/autoparts/' + recordId;

    const options = {
        method: 'DELETE'
    }

    const response = await fetch(url, options);
    loadData(); // Like this we refresh the data after 'delete' request.
}

// Task 5: Edit part
async function loadForEditing(recordId) {
    const url = 'http://localhost:3030/jsonstore/autoparts/' + recordId;

    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    document.getElementById('editor_create').style.display = 'none';
    document.getElementById('editor_edit').style.display = 'block';

    // --------------- We cannot make this part of code with form data ---------------
    document.getElementById('edit_part_id').value = data._id; // We make this because we want to have access to element id.
    document.getElementById('edit_part_label').value = data.label;
    document.getElementById('edit_part_price').value = data.price;
    document.getElementById('edit_part_qty').value = data.qty;
    // --------------- We cannot make this part of code with form data ---------------
    // We should change these fields !!!
}

async function savePart() {
    const record = {};

    record._id = document.getElementById('edit_part_id').value;
    record.label = document.getElementById('edit_part_label').value;
    record.price = Number(document.getElementById('edit_part_price').value);
    record.qty = Number(document.getElementById('edit_part_qty').value);

    const url = 'http://localhost:3030/jsonstore/autoparts/' + record._id;

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(record)
    }

    const response = await fetch(url, options);
    const result = await response.json();

    toggleEditors();
    loadData(); // Like this we refresh the data after 'delete' request.
}

function toggleEditors() {
    document.getElementById('editor_create').style.display = 'block';
    document.getElementById('editor_edit').style.display = 'none';
}