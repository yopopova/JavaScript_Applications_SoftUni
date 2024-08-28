// Synchronous Code
console.log('Hello!');
console.log('Hello!');
console.log('Hello!');


// Asynchronous Code
console.log('Start');

setTimeout(() => { // <-- This is callback function. It goes to the event loop.
    console.log('Done 2');
}, 2000);
// ^ Milliseconds
// ^ It doesn't stop the code, it doesn't freeze, on the contrary it continues its execution, it just sets the function aside.

setTimeout(() => {
    console.log('Done 0');
}, 0);
// ^ After 0 seconds it will enter the queue, and when it will come off the stack is unknown,
// because there may be more events or original code before it that needs to be executed.

console.log('End');

// element.addEvenetListener('click', callback); // <-- Example of using 'callback' function.