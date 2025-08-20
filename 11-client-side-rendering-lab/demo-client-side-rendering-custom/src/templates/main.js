import navbarTemplate from './navbar.js'; // 'navbarTemplate' е функция, която е темплейт и връща стринг
import contactListTemplate from './contactList.js';

const mainTemplate = (data) => `
    <header>
        ${navbarTemplate()}
    </header>

    <main>
        ${contactListTemplate(data.contacts)}
    </main>
`;

export default mainTemplate;