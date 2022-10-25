/**
 * simple calculator application
 * 
 * Requirements:
 * https://www.theodinproject.com/lessons/foundations-calculator
 * 
 */

const add = function(a, b) {
    if(isNaN(a) || isNaN(b)) {
        throw new Error('Arguments must be numbers.');
    }
    return a + b;
};

const subtract = function(a, b) {
    if(isNaN(a) || isNaN(b)) {
        throw new Error('Arguments must be numbers.');
    }
    return a - b;
};

const multiply = function(a,b) {
    if(isNaN(a) || isNaN(b)) {
        throw new Error('Arguments must be numbers.');
    }
    return a * b;
};

const divide = function(a, b) {
    if(isNaN(a) || isNaN(b)) {
        throw new Error('Arguments must be numbers.');
    }
    return a / b;
};

function highlight(e){
    console.log(e);
    e.target.classList.add('pressed');
}

function removeHighlight(e) {
    if(e.propertyName !== 'background-color') return;
    e.target.classList.remove('pressed');
}

const buttons = Array.from(document.querySelectorAll('.button'));
buttons.forEach(button => {
    button.addEventListener('click', highlight);
    button.addEventListener('transitionend', removeHighlight);
});

module.exports = {add, subtract, multiply, divide};