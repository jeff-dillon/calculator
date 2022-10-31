/**
 * simple calculator application
 * 
 * Requirements:
 * https://www.theodinproject.com/lessons/foundations-calculator
 * 
 */

/*************************************
 * 
 * Operator Functions
 * 
**************************************/


/**
 * Add two numbers together.
 * @param {Number} a - First number.
 * @param {Number} b - Second number.
 * @returns Result of addition.
 */
 const add = function(a, b) {
    if(isNaN(a) || isNaN(b)) {
        throw new Error('Arguments must be numbers.');
    }
    return a + b;
};

/**
 * Subtract one number (b) from another (a).
 * @param {Number} a - Number ot be subtracted from.
 * @param {Number} b - Number to subtract.
 * @returns Result of subtraction.
 */
const subtract = function(a, b) {
    if(isNaN(a) || isNaN(b)) {
        throw new Error('Arguments must be numbers.');
    }
    return a - b;
};

/**
 * Multiply one number by another.
 * @param {Number} a - First number.
 * @param {Number} b - Second number.
 * @returns Result of multiplication.
 */
const multiply = function(a,b) {
    if(isNaN(a) || isNaN(b)) {
        throw new Error('Arguments must be numbers.');
    }
    return a * b;
};

/**
 * Divide one number (a) by another (b).
 * @param {Number} a - The number to be divided.
 * @param {Number} b - The number to divide by.
 * @returns Result of division.
 */
const divide = function(a, b) {
    if(isNaN(a) || isNaN(b)) {
        throw new Error('Arguments must be numbers.');
    }
    return a / b;
};

const operate = function(operator, a, b) {
    let returnValue = 0;
    switch(operator) {
        case '+':
            returnValue = add(a, b);
            break;
        case '-':
            returnValue = subtract(a, b);
            break;
        case '*':
            returnValue = multiply(a, b);
            break;
        case '/':
            returnValue = divide(a, b);
            break;
    }
    return returnValue;

};


/****************************
 *
 * UI Code 
 * 
 ****************************/
 let firstNumber = "";
 let operator = "";
 let secondNumber = "";
 let displayText = "";

 /**
 * Add the highlight to the target element.
 * @param {Element} element 
 */
function addHighlight(element) {
    element.classList.add('pressed');
}

/**
 * Remove the highlight from the target element.
 * @param {element} element 
 */
function removeHighlight(element) {
    element.classList.remove('pressed');
}
 
/**
 * Highlight a key on the calculator.
 * @param {Event} e 
 */
function handleClick(e){
    addHighlight(e.target);
    if(e.target.textContent == 'AC') {
        clearScreen();
    } else {
        updateScreen(e.target.textContent);
    }
}



/**
 * Remove the highlight from a key on the calculator.
 * @param {Event} e 
 */
function handleTransition(e) {
    if(e.propertyName !== 'background-color') return;
    removeHighlight(e.target);
}

/**
 * Update the calculator screen based on key press.
 * @param {Event} e 
 * @returns 
 */
function handleKeyPress(e) {
    let selectedKey = e.keyCode;
    if(e.shiftKey) {
        selectedKey = "shift-" + e.keyCode;
    }
    const key = document.querySelector(`button[data-key="${selectedKey}"`);
    if(!key) return;
    addHighlight(key)
    if(key.textContent == 'AC') {
        clearScreen();
    } else {
        updateScreen(key.textContent);
    }
}

/**
 * Update the screen with a new character.
 * @param {String} newChar 
 */
function updateScreen(newChar) {
    console.log(newChar);
    const operators = ["+","−","×","÷", "="];
    const screen = document.querySelector('.screen');
    if(operators.includes(newChar)) {
         screen.textContent = screen.textContent + " " + newChar + " ";
    } else {
        screen.textContent = screen.textContent + newChar;
    }
}

/**
 * Clear the screen.
 */
function clearScreen() {
    const screen = document.querySelector('.screen');
    screen.textContent = "";
}

try {
    const buttons = Array.from(document.querySelectorAll('.button'));
    buttons.forEach(button => {
        button.addEventListener('click', handleClick);
        button.addEventListener('transitionend', handleTransition);
    });
    
    window.addEventListener('keydown', handleKeyPress);
    
    updateScreen(displayText);

} catch(err) {
    if(err.name != 'ReferenceError') {
        throw new Error(err);
    }
}


// Module exports used for jest testing, throws ReferenceError when run in browser.
try {
    module.exports = {add, subtract, multiply, divide, operate};
} catch(err) {
    if(err.name != 'ReferenceError') {
        throw new Error(err);
    }
}


