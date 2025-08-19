const catalogSection = document.getElementById('catalog'); // This variables are in global scope, but only in module 'catalog'.
const table = catalogSection.querySelector('#table');
const loading = document.createElement('p');
loading.textContent = 'Loading...'; // or 'loading.innerHTML = 'Loading &hellip;'
const catalogUrl = 'thhp://localhost:3030/data/autoparts';

export async function showCatalog() {
    document.querySelector('main').replaceChildren(catalogSection);
    table.replaceChildren(loading); // We write this because when we access the page the catalog will be empry and it will take some time to load the table info.

    try {
        const token = localStorage.getItem('accessToken');
        const options = {
            method: 'GET',
            headers: {}
        }

        if (token != null) { // If we don't have token, it will be ordinary GET request
            options.headers['X-Authorization'] = token;
        }

        const response = await fetch(catalogUrl, options);

        if (response.ok === false) {
            const error = await response.json(); // Like this we take the current error and give it to 'catch'.
            throw error;
        }

        const data = await response.json();
        table.replaceChildren(data.map(createRow)); // For every element invoke 'createRow' function. Here we should use '...', because it works only with list of items, but not with array.

    } catch (error) {
        alert(error.message);
    }
}

function createRow(record) {
    const element = document.createElement('tr');
    element.innerHTML = `
    <td>${record.label}</td>
    <td>$ ${record.price}</td>
    <td><a href="javascript:void(0)" data-id="${record._id}">Details</a></td>
    `;

    return element;
}