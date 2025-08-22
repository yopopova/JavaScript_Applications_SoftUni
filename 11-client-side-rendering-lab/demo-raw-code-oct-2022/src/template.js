const placeholderPattern = /%%(.+?)%%/g; // We add '?', because we don't want the regEx to catch the longest match.

const templates = {

}

export async function render(templateName, ctx) {
    const html = await loadTemplate(templateName);

    const result = html.replace(placeholderPattern, replacer);

    return result;

    function replacer(match, name) {
        const value = ctx[name];

        if (value !== undefined) {
            return escapeHtml(value);
        } else {
            return match;
        }
    }
}

async function loadTemplate(name) {
    if (templates[name] === undefined) {
        const response = await fetch(`/views/${name}.html`);
        templates[name] = await response.text(); // Give me the body, but like text.
    }

    return templates[name];
}

function escapeHtml(html) {
    return html.toString()
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}