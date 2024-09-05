const url = 'http://localhost:3030/jsonstore/messenger';
const messages = document.getElementById('messages');

function attachEvents() {
    document.getElementById('submit').addEventListener('click', postMessage);
    document.getElementById('refresh').addEventListener('click', loadAllMessages);
}

async function postMessage() {
    const [author, content] = [document.querySelector('input[name="author"]'), document.querySelector('input[name="content"]')];

    if(author.value !== '' || content.value !== '') {
        await request(url, {author: author.value, content: content.value}); // This is the parameter, which we use in 'option'. In this case 'option' is object.

        author.value = '';
        content.value = '';
    }
}

async function loadAllMessages() {
    const response = await fetch(url);
    const data = await response.json();

    messages.value = Object.values(data).map(({author, content}) => `${author}: ${content}`).join('\n');
}

async function request(url, option) { // Here 'option' is like 'body'.

    if(option) {
        option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(option) // The 'option' from 'async function request(url, option)' comes here.
        }
    }

    const response = await fetch(url, option); // If we don't use the 'option' here, we won't make 'POST' request, but 'GET' request.
    const data = response.json();

    return data;
}

attachEvents();