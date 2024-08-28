// We create promise like this:
let promise = new Promise(function (resolve, reject) { // 'resolve' and 'reject' are also functions and can receive parameters.
    setTimeout(() => {
        if (Math.random() > 0.5) {
            resolve('Just Married...');
        } else {
            reject('Sorry it\'s me')
        }
    }, 3000);
});

console.log(promise);

// We use .then() and .catch() like this:
promise
    .then((result) => {
        console.log(result); // If there is a positive result.
    })
    .catch((reason) => {
        console.log(reason); // If there is a negative result.
    });