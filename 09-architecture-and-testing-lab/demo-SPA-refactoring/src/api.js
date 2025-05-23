const host = 'http://localhost:3030';

// We don't write 'export' in front of function because we export all cases at the end of the file.
async function request(method, url, data) {

    const options = {
        method,
        headers: {}
    }

    if (data !== undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const token = sessionStorage.getItem('accessToken');

    if (token) {
        options.headers['X-Authorization'] = token;
    }

    try {
        const response = await fetch(host + url, options);

        if (response.ok != true) {
            const error = await response.json();
            throw new Error(error.message);
        }

        if (response.status == 204) {
            return response;
        }

        return response.json();

    } catch(error) {
        alert(error.message);
        throw error; // We write this roll because we don't want the program to return false data in another file.
    }
}

// We write this because we don't want to write the method everytime
export const get = request.bind(null, 'GET');
export const post = request.bind(null, 'POST');
export const put = request.bind(null, 'PUT');
export const del = request.bind(null, 'DELETE');