async function solution() {
    let main = document.getElementById('main');

    const url = 'http://localhost:3030/jsonstore/advanced/articles/list';
    const response = await fetch(url);
    const data = await response.json();

    data.forEach(article => {
        let divAccordion = createElement('div', '', ['class', 'accordion']);
        
        let divHead = createElement('div', '', ['class', 'head']);
        let span = createElement('span', article.title);
        let button = createElement('button', 'More', ['class', 'button', 'id', article._id]);
        button.addEventListener('click', toggle);

        let divExtra = createElement('div', '', ['class', 'extra']);
        let p = createElement('p');
        
        divExtra.appendChild(p);
        divAccordion.appendChild(divExtra);

        divHead.appendChild(button);
        divHead.appendChild(span);
        divAccordion.appendChild(divHead);
        main.appendChild(divAccordion);
    });

    async function toggle(ev) {
        // console.log(ev.target.id); // Here we check if we catch the correct button 'id'.

        const accordion = ev.target.parentNode.parentNode;
        const p = ev.target.parentNode.parentNode.children[0].children[0];
        const extra = ev.target.parentNode.parentNode.children[0];

        const id = ev.target.id; // Here we take the button 'id'.
        let url = `http://localhost:3030/jsonstore/advanced/articles/details/${id}`;
        const response = await fetch(url);
        const data = await response.json();

        p.textContent = data.content;
        const hidden = ev.target.textContent === 'More';

        extra.style.display = hidden ? 'block' : 'none'; // If 'hidden' is true, you will be 'block'. If not - 'none'.
        ev.target.textContent = hidden ? 'Less' : 'More';
    }

    function createElement(type, content, attributes = []) { // The 'attributes' will be array.
        const element = document.createElement(type);

        if (content) {
            element.textContent = content;
        }

        if (attributes.length > 0) { // If we have attributes in the array.
            for (let i = 0; i < attributes.length; i += 2) {
                element.setAttribute(attributes[i], attributes[i + 1]);
                // ^ 'attributes[i]' is the name of the attribute and 'attributes[i + 1]' is the attribute value.
            }
        }

        return element;
    }
}

solution()