/**
 * simple calculator application
 * 
 * Requirements:
 * https://www.theodinproject.com/lessons/foundations-calculator
 * 
 */

const add = function(a, b) {
    if(isNaN(a) || isNaN(b)) {
        return Error('arguments must be numbers');
    }
    return a + b;
};

const subtract = function(a, b) {
    return a - b;
};

const multiply = function(a,b) {
    return a * b;
};

const divide = function(a, b) {
    return a / b;
};

module.exports = {add, subtract, multiply, divide};