let alwaysResolvingPromise = Promise.resolve('YES'); // A promise that will always resolve.
let alwaysRejectingPromise = Promise.reject('NO'); // A promise that will always be rejected.

alwaysResolvingPromise
    .then(res => console.log(res))
    .catch((err) => console.log('NEVER USED')) // Since the promise will always be executed, .catch() will never be used.
    .finally(() => {
        console.log('finally'); // 'finally' will always be executed regardless of positive or negative result.
    });

alwaysRejectingPromise
    .catch((reason) => console.log(reason));

let multiplePromises = Promise.all([ // Here we pass an array of any promises.
    alwaysResolvingPromise,
    Promise.resolve('YES 2')
]);

multiplePromises
    .then(res => {
        console.log(res);
    });