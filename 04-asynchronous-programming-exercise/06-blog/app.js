function attachEvents() {
    document.getElementById('btnLoadPosts').addEventListener('click', loadPosts);
    document.getElementById('btnViewPost').addEventListener('click', viewPost);
}

const posts = [];

async function loadPosts() {
    try {
        const url = 'http://localhost:3030/jsonstore/blog/posts';
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error();
        }

        const data = await response.json();

        document.getElementById('posts').innerHTML = '';

        Object.entries(data).forEach(([key, value]) => {
            const optionElement = document.createElement('option');
            optionElement.value = key; // Here we lock the element 'id'.
            optionElement.textContent = value.title;
            document.getElementById('posts').appendChild(optionElement);
            posts.push({ title: value.title, body: value.body });
        });

    } catch (error) {
        console.log(error);
    }
}

async function viewPost() {
    try {
        const selectedElement = document.getElementById('posts');
        const url = 'http://localhost:3030/jsonstore/blog/comments';

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error();
        }

        const data = await response.json();

        const comments = Object.values(data).filter(el => el.postId === selectedElement.value);
        document.getElementById('post-title').textContent = selectedElement.selectedOptions[0].textContent;
        // ^ With 'selectedOptions' we take the current selected option from the drop-down menu.

        const po = posts.filter(p => p.title === selectedElement.selectedOptions[0].textContent);
        // ^ This return an array with needed element.
        document.getElementById('post-body').innerHTML = `${po[0].body}`;

        document.getElementById('post-comments').innerHTML = '';

        comments.forEach(el => {
            const liElement = document.createElement('li');
            liElement.textContent = el.text;
            document.getElementById('post-comments').appendChild(liElement);
        });

    } catch (error) {
        console.log(error);
    }
}

attachEvents();