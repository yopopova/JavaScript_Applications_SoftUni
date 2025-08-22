import { render } from 'https://unpkg.com/lit-html?module';
import { table } from './table.js';

// DEMO
// const p = (name, className) => html`<p class=${className}>Hello, ${name}!</p>`;
// const input = (disabled) => html`<input ?disabled=${disabled}>`
// const anotherInput = (value) => html`<input .value=${value}>`


// render(p('world', 'greeting'), document.querySelector('main'));
// render(p('Peter', 'content'), document.querySelector('nav'));

// render(input(false), document.querySelector('nav'));

// render(anotherInput('hello'), document.querySelector('nav'));
// DEMO

// RENDER remove the old content and load the new one.

// SECOND DEMO
// const timer = (time) => html`
// <p>The time is ${time}</p>
// <p>Have a nice day!</p>`;

// const message = () => html`<p>Static message.</p>`;
// const root = document.querySelector('main');

// function show() {
//     render(message(), root);
// }

// function update() {
//     render(timer(new Date), root);
// }

// document.querySelector('button').addEventListener('click', update);

// setInterval(update, 1000);

// window.update = update;
// window.show = show;
// SECOND DEMO

// THIRD DEMO: ADD EVENT LISTENER TO BUTTON

const data = [
    {
        name: 'Peter',
        id: 'asd1',
        canEdit: false,
        style: {
            color: 'red',
            border: '1px solid black'
        }
    },
    {
        name: 'Mary',
        id: 'asd2',
        canEdit: true,
        highlight: {
            active: true,
            content: true
        }
    },
    {
        name: 'John',
        id: 'asd3',
        canEdit: false
    }
];

const root = document.querySelector('main');

update();

// render(table(data), root);

function onClick(id) {
    const index = data.findIndex(i => i.id == id);
    data.splice(index, 1);
    update();
}

function update() {
    render(table(data, onClick), root);
}
// THIRD DEMO: ADD EVENT LISTENER TO BUTTON