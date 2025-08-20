export const getContacts = () => {
    return fetch('http://localhost:3030/jsonstore/contacts')
        .then(res => res.json())
        .then(result => Object.values(result));
    // Функцията връща масив, под формата на Promise, затова във файл app.js пишем const contacts = await getContacts();; 
};