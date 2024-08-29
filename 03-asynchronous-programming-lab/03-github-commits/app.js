// <----------- FIRST SOLUTION ----------->
// async function loadCommits() {
//     const userInputEl = document.getElementById('username');
//     const repoInputEl = document.getElementById('repo');
//     const ulElement = document.getElementById('commits');

//     try {
//         ulElement.innerHTML = '';
//         let url = await fetch(`https://api.github.com/repos/${userInputEl.value}/${repoInputEl.value}/commits`);

//         if (!url.ok) { // <-- With 'response.ok' we check whether the response was successful or there was a problem.
//             throw new Error(`${url.status} (Not Found)`); // <-- 'throw new Error()' will not execute the code down, but will go straight to 'catch()'.
//         }

//         let data = await url.json(); // <-- Only after the data from the link has passed successfully do we convert it to JSON.

//         Object.values(data)
//             .forEach(repo => {
//                 let liElement = document.createElement('li');
//                 liElement.textContent = `${repo.commit.author.name}: ${repo.commit.message}`;
//                 ulElement.appendChild(liElement);
//             })

//     } catch (error) {
//         ulElement.innerHTML = '';
//         let liElement = document.createElement('li');
//         liElement.textContent = error;
//         ulElement.appendChild(liElement);
//     }
// }

// <----------- SECOND SOLUTION ----------->
function loadCommits() {
    const userInputEl = document.getElementById('username');
    const repoInputEl = document.getElementById('repo');
    const ulElement = document.getElementById('commits');

    fetch(`https://api.github.com/repos/${userInputEl.value}/${repoInputEl.value}/commits`)
    .then(res => res.json())
    .then(data => {
        data.forEach(repo => {
            let liElement = document.createElement('li');
            liElement.textContent = `${repo.commit.author.name}: ${repo.commit.message}`;
            ulElement.appendChild(liElement);
        })
    })
    .catch(err => {
        ulElement.innerHTML = '';
        let liElement = document.createElement('li');
        liElement.textContent = err;
        ulElement.appendChild(liElement);
    })
}