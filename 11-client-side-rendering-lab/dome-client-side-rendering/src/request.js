import { getToken } from './auth.js';

const request = (method, url, data) => {
    let options = {};
    let token = getToken();

    if (method != "GET") { // Казваме, когато е различно от GET, защото при останалите методи имаме да добавяме данни
        options = {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
    }

    if(method != 'GET' && token) {
        options.headers['X-Authorization'] = token; // По този начин добавяме token
    }

    return fetch(url, options)
        .then(res => res.json()); // Искаме да върнем само json response
}

// This is for GET request
// export const get = (url) => request('GET', url);
export const get = request.bind(null, 'GET'); // Пишем null, защото не ни интересува контекста

// This is for POST request
export const post = request.bind(null, 'POST');