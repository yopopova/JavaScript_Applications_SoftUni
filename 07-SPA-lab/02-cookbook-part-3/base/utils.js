// BONUS MODULES

// window.addEventListener('load', () => {
//     console.log('loaded');
// });



// Type named exports (sum, mult). Named exports can be a lot.
export const sum = function(a, b) {
    return a + b;
}
// console.log(sum(1, 12));

export const mult = function(a, b) {
    return a * b;
}
// console.log(sum(3, 4));



// Default export. The name doesn't matter (calc). We can have ONLY ONE default export! Every export should have name!
const calc = {
    sum,
    mult
}

export default calc; // We take the content with 'calc', but in the other file we can named it whatever we want.