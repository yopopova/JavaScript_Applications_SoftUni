function loadRepos() {
   let divElement = document.getElementById('res');
   let url = 'https://api.github.com/users/testnakov/repos';

   const httpRequest = new XMLHttpRequest;
   httpRequest.addEventListener('readystatechange', checkStatus);

   function checkStatus() {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
         divElement.textContent = httpRequest.responseText;
      }
   }
   
   httpRequest.open('GET', url); 
   httpRequest.send(); 


   // <--- readyState XHR Phases --->

   // let xhr = new XMLHttpRequest();
   // console.log('UNSENT', xhr.readyState); // readyState will be 0

   // xhr.open('GET', '/api', true);
   // console.log('OPENED', xhr.readyState); // readyState will be 1

   // xhr.onprogress = function () {
   //    console.log('LOADING', xhr.readyState); // readyState will be 3
   // };

   // xhr.onload = function () {
   //    console.log('DONE', xhr.readyState); // readyState will be 4
   // };

   // xhr.send(null);
}