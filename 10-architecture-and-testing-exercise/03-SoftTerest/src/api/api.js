// This file will take responsibility for API requests.

const host = 'http://localhost:3030/';

async function requester(method, url, data) {
    const user = JSON.parse(sessionStorage.getItem('user'));

    const options = {
        method: method,
        headers: {}
    }

    if (data) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    if (user) {
        const token = user.accessToken; // This is out token.
        options.headers['X-Authorization'] = token;
    }

    try {
        const response = await fetch(host + url, options);

        if (!response.ok) {

            if (response.status === 403) { // We are not logged in, but we keep the auth token.
                sessionStorage.removeItem('user'); // This will remove the information.
            }

            const err = await response.json(); // Like this we will take the current error.
            throw new Error(err.message); // This will send the current error in 'catch'.
        }

        if (response.status === 204) { // If the response is empty.
            return response;
        } else {
            return response.json();
        }

    } catch (error) {
        alert(error.message);
        throw error;
    }
}

// The 'null' parameter is for the context
const get = requester.bind(null, 'GET');
const post = requester.bind(null, 'POST');
const put = requester.bind(null, 'PUT');
const del = requester.bind(null, 'DELETE');

export {
    get,
    post,
    put,
    del
}