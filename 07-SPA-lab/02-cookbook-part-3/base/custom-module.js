// BONUS MODULES

// import { sum, mult } from './utils.js';
// console.log(sum(10, 20));
// console.log(mult(10, 20));


// Here we take both the default and named exports: 'calculator' is default export and '{ sum, mult }' are named exports.
// import calculator, { sum, mult } from './utils.js';


// Default export
// import calculator from './utils.js';
// console.log(calculator.sum(10, 20));
// console.log(calculator.mult(10, 20));


// Give me all named exports and put them in object named 'calc'.
import * as calc from './utils.js';
console.log(calc.sum(10, 20));
console.log(calc.mult(10, 20));