async function lockedProfile() {
    const main = document.getElementById('main');

    try {
        const url = 'http://localhost:3030/jsonstore/advanced/profiles';
        const response = await fetch(url);
        const data = await response.json();

        Object.values(data).forEach(card => {
            const divProfile = createCard('div', '', ['class', 'profile']);
            main.appendChild(divProfile);

            const pic = createCard('img', '', ['src', 'iconProfile2.png', 'class', 'userIcon']);
            divProfile.appendChild(pic);

            const labelLocked = createCard('label', 'Lock');
            divProfile.appendChild(labelLocked);

            const inputLock = createCard('input', '', ['type', 'radio', 'name', 'user1Locked', 'value', 'lock', 'checked', 'true']);
            divProfile.appendChild(inputLock);

            const labelUnlocked = createCard('label', 'Unlock');
            divProfile.appendChild(labelUnlocked);

            const inputUnlock = createCard('input', '', ['type', 'radio', 'name', 'user1Locked', 'value', 'unlock']);
            divProfile.appendChild(inputUnlock);

            const breakTag = createCard('br');
            divProfile.appendChild(breakTag);

            const lineH = createCard('hr');
            divProfile.appendChild(lineH);

            const labelUsername = createCard('label', 'Username');
            divProfile.appendChild(labelUsername);

            const inputUsername = createCard('input', '', ['type', 'text', 'name', 'user1Username', 'value', card.username, 'disabled', 'true', 'readonly', 'true']);
            divProfile.appendChild(inputUsername);

            // Div with hidden info
            const divExtraInfo = createCard('div', '', ['class', 'user1Username']);
            divExtraInfo.style.display = 'none';
            divProfile.appendChild(divExtraInfo);

            const horizontalLine = createCard('hr');
            divExtraInfo.appendChild(horizontalLine);

            const labelEmail = createCard('label', 'Email:');
            divExtraInfo.appendChild(labelEmail);

            const inputEmail = createCard('input', '', ['type', 'email', 'name', 'user1Email', 'value', card.email, 'disabled', 'true', 'readonly', 'true']);
            divExtraInfo.appendChild(inputEmail);

            const labelAge = createCard('label', 'Age:');
            divExtraInfo.appendChild(labelAge);

            const inputAge = createCard('input', '', ['type', 'email', 'name', 'user1Age', 'value', card.age, 'disabled', 'true', 'readonly', 'true']);
            // ^ Here the input type SHOULD BE 'email'.
            divExtraInfo.appendChild(inputAge);

            const btn = createCard('button', 'Show more');
            btn.addEventListener('click', toggle);
            divProfile.appendChild(btn);
        })
    } catch (error) {
        console.log(error);
    }
}

function toggle(event) {
    const profile = event.target.parentElement;
    let isActive = profile.querySelector('input[value="unlock"]').checked;

    if (isActive) {
        const hiddenContent = profile.querySelector('div');

        if (event.target.textContent === 'Show more') {
            event.target.textContent = 'Hide it';
            hiddenContent.style.display = 'block';
        } else {
            event.target.textContent = 'Show more';
            hiddenContent.style.display = 'none';
        }
    }
}

// This is a template function which helps us to create our profile cards.
function createCard(tag, content, attributes = []) {
    const element = document.createElement(tag);

    if (content) {
        element.textContent = content;
    }

    if (attributes.length > 0) {
        for (let i = 0; i < attributes.length; i += 2) {
            element.setAttribute(attributes[i], attributes[i + 1]);
        }
    }

    return element;
}
