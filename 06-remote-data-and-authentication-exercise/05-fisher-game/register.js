document.getElementById('user').style.display = 'none'; // We hide the 'Logout' button.
const url = 'http://localhost:3030/users/register';

const registerForm = document.querySelector('form');
registerForm.addEventListener('submit', onUserRegistger);

async function onUserRegistger(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const { email, password, rePass } = Object.fromEntries(formData); // Like this we take the elements from 'formData' from the three fields.

    try {
        if ([...formData.values()].some(el => el === '')) { // If some of the form fields is empty, we should throw an error.
            throw new Error('Input is not correct!');
        } else if (password != rePass) {
            throw new Error('The passwords do not match!');
        }

        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                password,
                rePass
            })
        });

        if (!res.ok) { // Here we check the response.
            const error = await res.json();
            throw new Error(error.message);
        }

        const data = await res.json();
        
        const user = {
            email: data.email,
            id: data._id,
            token: data.accessToken
        }

        localStorage.setItem('userData', JSON.stringify(user)); // 'userData' is the name of the element. The second element is the object with the data.
        window.location = './index.html'; // Like this we redirect the user from register page to home page.
    } catch (error) {
        document.querySelector('form').reset(); // Here we clear the form, if we have error.
        alert(error.message)
    }
}