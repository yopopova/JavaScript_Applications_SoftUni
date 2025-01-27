// window.addEventListener('load', () => { // С window какзваме, когато се зареди всичко
//     const homeSection = document.querySelector('.home');
//     homeSection.style.display = 'block'; // При зареждане включваме да се вижда главната страница
// });

// С window е старият начин да се зарежда съдържанието

// const homeSection = document.querySelector('.home');
// homeSection.style.display = 'inline'; // При зареждане включваме да се вижда главната страница

import { router } from './router.js';
import { updateAuth } from './auth.js';

updateAuth(); // извикваме го, защото се случва при зареждане на страницата, за да може още в началото да сетне правилните бутони
router('/'); // пишем го, за да не ни презарежда браузъра всеки път страница, з ада не изгубим съдържанието, а да го извика всеки път с базовата страница

// const guestNavigation = document.querySelector('#guest');
// const userNavigation = document.querySelector('#user');

// guestNavigation.style.display = 'inline';
// userNavigation.style.display = 'inline';

const navigationElement = document.querySelector('.navigation');
navigationElement.addEventListener('click', (e) => {
    e.preventDefault();

    if(e.target.tagName == 'A') { // Тук е 'A', заради таговете с линка; това предотвратява да се случи нещо, ако натиснем в полето на самата навигация, а не върху линк таг
        // console.log(e.target.href);
        let url = new URL(e.target.href); // Вградена функция
        // console.log(url);

        document.querySelector('.active').classList.remove('active'); // намери този елемент, който има клас active и го премахни
        e.target.classList.add('active'); // Сложи active клас на текущия таргет; така бутонът/линкът, който е натиснат светва в зелено

        router(url.pathname);
    }
})