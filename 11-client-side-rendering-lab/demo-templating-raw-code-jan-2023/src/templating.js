// This function will generate html template from file 'user-block.html'. The function should be asyncronous because we want to load the file.

const templateCache = {}; // We put elements in object, because we want to load all of them, but not one by one.

// String replace заменя само първото съвпадение, но ние искаме да заменим всички.
const pattern = /%%([^%]+)%%/g;

export async function getTemplate(name, data) {
    if (templateCache[name] == undefined) {
        const request = await fetch(`/templates/${name}.html`);
        const result = await request.text(); // Like this we will load the html code.

        templateCache[name] = result;
    }
    // ^ Make this because we want to use the template for different users, but not only for one. And load the template only one.

    let template = templateCache[name];
    
    template = template.replace(pattern, replacer);

    return template;

    function replacer(match, propName) {
        return data[propName];
    }
}