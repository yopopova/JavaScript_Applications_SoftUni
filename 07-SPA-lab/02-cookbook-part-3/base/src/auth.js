const guestNavigation = document.querySelector('#guest');
const userNavigation = document.querySelector('#user');

export function updateAuth() {
    let serializedUser = localStorage.getItem('user');

    if(serializedUser) {
        // let user = JSON.parse(serializedUser); // обръщаме го в user

        userNavigation.style.display = 'inline'; // ако има user, покажи навигацията за юзъра и скрий тази за госта
        guestNavigation.style.display = 'none';
    } else {
        userNavigation.style.display = 'none';
        guestNavigation.style.display = 'inline';
    }
}

export function logout() {
    localStorage.removeItem('user');
    updateAuth(); // за да сменим бутоните, които трябва да виждаме
}

export function getToken() {
    let serializedUser = localStorage.getItem('user');

    if(serializedUser) {
        let user = JSON.parse(serializedUser); // важно е да се направи, защото ако се опитаме да парснем нещо с undefined ще гръмне
        // ако не е с проверка трябва да е с try/catch
        return user.accessToken;
    }
}