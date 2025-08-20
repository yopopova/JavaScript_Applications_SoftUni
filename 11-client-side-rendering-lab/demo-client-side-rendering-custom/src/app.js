// import navbarTemplate from './templates/navbar.js'; // 'navbarTemplate' е функция, която е темплейт и връща стринг
// import contactListTemplate from './templates/contactList.js';
// import contactTemplate from './templates/contact.js';

import mainTemplate from './templates/main.js';
import render from '../render.js';
import { getContacts } from './api.js';

const rootElement = document.getElementById('root');
// const navbarTemplateResult = navbarTemplate(); // връща резултата от темплейта
// render(navbarTemplateResult, rootElement);

const contacts = await getContacts(); // не се намираме в асинхронна функция, но можем да използваме await в браузъра; await-ваме Promise от файл api.js
// console.log(contacts); // Проверяваме дали се показват контактите

render(mainTemplate({contacts}), rootElement); 

// Don't do this at home
window.addContact = function() {
    fetch('http://localhost:3030/jsonstore/contacts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({person: 'Ivo', phone: '001248700'})
    })
    .then(res => res.json())
    .then(contact => {
        // render(contactTemplate(contact), document.querySelector('.contact-list'));

        render(mainTemplate({contacts: [...contacts, contact]}), rootElement); // Добавяме старите контакти + новие контакт.
        // console.log(contact);
    })
}