export default function render(html, parent) { // Тук html е все още стринг
    // подаваме HTML елемента на парента, който е реален елемент от дървото, например контейнер.

    // Parse HTML and generate element

    const template = document.createElement('template');
    template.innerHTML = html; // Don't do this at home

    // parent.innerHTML = '';
    parent.replaceChildren(template.content); // Пишем .content, защото иначе няма да ни визуализира HTML-а в браузъра
}