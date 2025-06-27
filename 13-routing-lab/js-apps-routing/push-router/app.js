const homeTemplate = () => `
    <h1>Home</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, exercitationem?</p>
`;

const articlesTemplate = () => `
    <h1>Articles</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, exercitationem?</p>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, exercitationem?</p>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, exercitationem?</p>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, exercitationem?</p>
`;

const aboutTemplate = () => `
    <h1>About</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, exercitationem?</p>
`;

const notFoundTemplate = () => `
    <h1>Page not found</h1>
`;

const routes = {
    '/': homeTemplate, // За да се стратира началната страница и при /
    '/home': homeTemplate,
    '/articles': articlesTemplate,
    '/about': aboutTemplate,
};

const root = document.getElementById('root');

const navigate = (pathname, pushState = true) => {
    if (pushState) {
        history.pushState({}, '', pathname);
    }

    let template = routes[pathname];

    if (!template) {
        template = notFoundTemplate;
    }

    root.innerHTML = template();
}

document.body.addEventListener('click', (e) => {
    if (e.target.tagName == 'A') { // Така правим всички линкове да се активират тук, за да не се презарежда страницата
        e.preventDefault();

        let url = new URL(e.target.href); // така взимаме URL-а на страницата като обект

        navigate(url.pathname); // взимаме името на пътя
    }
});

window.addEventListener('popstate', (e) => {
    navigate(location.pathname, false);
});

navigate(location.pathname, false); // Искам да заредиш инфото още в началото
