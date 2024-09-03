document.getElementById('register-form').addEventListener('submit', onRegister);
document.getElementById('login-form').addEventListener('submit', onLogin);
document.getElementById('load-data').addEventListener('click', loadData);

async function onRegister(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const { email, password, repass } = Object.fromEntries(formData.entries()); // Така деструктурираме обекта.

    if (email == '', password == '') { // If we don't have some of the previous two fields, we don't need to include 'repass == '''.
        return alert('All fields are required!');
    }

    if (password != repass) { // The two passwords should be equal!!!
        return alert('Passwords must match!');
    }

    const url = 'http://localhost:3030/users/register';

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    }

    try { // 'try/catch' catches ONLY network errors.
        const response = await fetch(url, options); // Here the server will return object with information.

        if (!response.ok) { // The server returns response, but this response is error.
            const error = await response.json(); // Here we will receive message, but we should decode it with 'json()'.
            throw error;
        }

        const userData = await response.json();
        console.log(userData.accessToken); // Like this we check out the accessToken. 

        localStorage.setItem('email', userData.email);
        localStorage.setItem('accessToken', userData.accessToken); // Like this we take the 'accessToken', because we want to use it in another places and to redirect user to home page.

        location = '/';

    } catch (err) {
        alert(err.message);
    }
}

async function onLogin(event) {
    // При login задължително запазваме токена.
    event.preventDefault();

    const formData = new FormData(event.target);
    const {email, password} = Object.fromEntries(formData.entries());

    const url = 'http://localhost:3030/users/login';

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    }

    try {
        const response = await fetch(url, options);

        if(!response.ok) {
            const error = await response.json();
            throw error;
        }

        const userData = await response.json();

        localStorage.setItem('email', userData.email);
        localStorage.setItem('accessToken', userData.accessToken);

        location = '/';

    } catch(err) {
        alert(err.message);
    }
}

async function loadData() {
    const token = localStorage.getItem('accessToken'); // Here we GET the 'accessToken', because we want to use it in this function.

    if (token == null) {
        return alert('You are not logged in!');
    }

    const url = 'http://localhost:3030/data/recipes';

    const options = {
        method: 'GET',
        headers: {
            'X-Authorization': token
        }
    }

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            const error = await response.json();
            throw error;
        }

        const data = await response.json();

    } catch (err) {
        alert(err.message);
    }
}