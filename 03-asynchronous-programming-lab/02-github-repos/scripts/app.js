// <----------- FIRST SOLUTION ----------->
// async function loadRepos() {
// 	const inputElement = document.getElementById('username');
// 	const ulElement = document.getElementById('repos');

// 	try {
// 		const url = await fetch(`https://api.github.com/users/${inputElement.value}/repos`);

// 		if (!url.ok) {
// 			throw new Error(`${url.status} (Not Found)`);
// 		}

// 		const data = await url.json();
// 		ulElement.innerHTML = '';

// 		data.forEach(({ full_name, html_url }) => {
// 			let liElement = document.createElement('li');
// 			ulElement.appendChild(liElement);

// 			let aElement = document.createElement('a');
// 			aElement.href = html_url;
// 			aElement.target = '_blank';
// 			aElement.textContent = full_name;
// 			liElement.appendChild(aElement);
// 		})

// 	} catch (error) {
// 		ulElement.innerHTML = '';
// 		let liElement = document.createElement('li');
// 		liElement.textContent = error;
// 		ulElement.appendChild(liElement);
// 	}
// }

// <----------- SECOND SOLUTION ----------->
function loadRepos() {
	const inputElement = document.getElementById('username');
	const ulElement = document.getElementById('repos');

	fetch(`https://api.github.com/users/${inputElement.value}/repos`)
	.then(res => res.json())
	.then(data => {
		ulElement.innerHTML = '';

		data.map(({ full_name, html_url }) => {
			let liElement = document.createElement('li');
			ulElement.appendChild(liElement);

			let aElement = document.createElement('a');
			aElement.href = html_url;
			aElement.target = '_blank';
			aElement.textContent = full_name;
			liElement.appendChild(aElement);
		})
	})
	.catch(err => { // Try with 'kuche' in the input field
		ulElement.innerHTML = '';
		let errorLiElement = document.createElement('li');
		errorLiElement.textContent = err;
		ulElement.appendChild(errorLiElement);
	})
}