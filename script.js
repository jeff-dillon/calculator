/**
 * Simple calculator application
 * 
 * Requirements:
 * https://www.theodinproject.com/lessons/foundations-calculator
 * 
 */





/*************************************
 * 
 * Calculator Operator Functions
 * 
**************************************/


/**
 * Add one addend (addend1) with another addend (addend2) and return the sum.
 * @param {Number} addend1 - First number.
 * @param {Number} addend2 - Second number.
 * @returns Sum resulting from addition.
 */
 const add = function(addend1, addend2) {
    if(isNaN(addend1) || isNaN(addend2)) {
        throw new Error('Arguments must be numbers.');
    }
    return addend1 + addend2;
};

/**
 * Subtract the subtrahend (b) from the minuhend (a) and return the difference.
 * @param {Number} minuend - The minuend.
 * @param {Number} subtrahend - The subtrahend.
 * @returns Difference resuting from subtraction.
 */
const subtract = function(minuend, subtrahend) {
    if(isNaN(minuend) || isNaN(subtrahend)) {
        throw new Error('Arguments must be numbers.');
    }
    return minuend - subtrahend;
};

/**
 * Multiply the first factor (a) by the second factor (b) and return the product.
 * @param {Number} factor1 - First factor.
 * @param {Number} factor2 - Second factor.
 * @returns Product resulting from multiplication.
 */
const multiply = function(factor1,factor2) {
    if(isNaN(factor1) || isNaN(factor2)) {
        throw new Error('Arguments must be numbers.');
    }
    return factor1 * factor2;
};

/**
 * Divide the dividend (a) by the divisor (b) and return the quotient.
 * @param {Number} dividend - The dividend.
 * @param {Number} divisor - The divisor.
 * @returns Quotient resulting from division.
 */
const divide = function(dividend, divisor) {
    if(isNaN(dividend) || isNaN(divisor)) {
        throw new Error('Arguments must be numbers.');
    }
    return dividend / divisor;
};

/**
 * Wrapper function for add, subtract, multiply, and divide.
 * @param {*} operator 
 * @param {*} number1 
 * @param {*} number2 
 * @returns Result of the operation rounded to max 4 decimals if the result is not an integer.
 */
const operate = function(operator, number1, number2) {
    let returnValue = 0;
    switch(operator) {
        case '+':
            returnValue = add(number1, number2);
            break;
        case '-':
            returnValue = subtract(number1, number2);
            break;
        case '*':
            returnValue = multiply(number1, number2);
            break;
        case '/':
            returnValue = divide(number1, number2);
            break;
    }
    if(!Number.isInteger(returnValue)) {
        returnValue = Number(returnValue.toFixed(4));
    }
    return returnValue;

};





/****************************
 *
 * UI Functions 
 * 
 ****************************/


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
 * Add the highlight to the selected Operator button.
 * @param {Element} element - the selected Operator button.
 */
function addHighlightOperator(element) {
    element.classList.add('pressed-operator');
}

/**
 * Remove the highlight from all Operator buttons
 */
function removeHighlightOperator() {
    const buttons = Array.from(document.querySelectorAll('.operator'));
    buttons.forEach(button => {
        button.classList.remove('pressed-operator');
    });
}

/**
 * Update the screen with a new number.
 * @param {String} newNumber - the number to be displayed. 
 */
 function updateScreen(newNumber) {
    const screen = document.querySelector('.screen');
    screen.textContent = newNumber;
}

function updateEquation(newEquation) {
    const equation = document.querySelector('.equation');
    equation.textContent = newEquation;
}

/**
 * Clear the screen.
 */
function clearScreen() {
    const screen = document.querySelector('.screen');
    screen.textContent = '0';
    const equation = document.querySelector('.equation');
    equation.textContent = '';
}

function toggleDisableDecimal() {
    const decimal = document.querySelector('button[data-key="190"');
    console.log(decimal);
    if(decimal.disabled) {
        decimal.disabed = false;
        decimal.removeAttribute('disabled');
        console.log('here');
    } else {
        decimal.disabled = true;
    }
}

/**
 * Event handler. Handle a button click event.
 * @param {Event} e 
 */
 function handleClick(e){
    calculatorController(e.target);
}


/**
 * Event handler. Remove the highlight from a key on the calculator.
 * @param {Event} e 
 */
function handleTransition(e) {
    if(e.propertyName !== 'background-color') return;
    removeHighlight(e.target);
}

/**
 * Event handler. Handle a key press event.
 * @param {Event} e 
 * @returns 
 */
function handleKeyPress(e) {
    let selectedKeyCode = e.keyCode;

    if(e.shiftKey) {
        selectedKeyCode = `shift-${e.keyCode}`;
    }
    const selectedButton = document.querySelector(`button[data-key="${selectedKeyCode}"`);
    if(!selectedButton) return;
    calculatorController(selectedButton);
    
}





/****************************************
 * 
 * Calculator Logic Functions
 * 
 ****************************************/


// The global calc object holds and operates on the state of the calculator.
const calc = {
    firstNumber: 0,
    secondNumber: 0,
    calculationResult: 0,
    operator: '',
    calculationString: '',
    currentNumber: 'first',
    isDecimal: false,

    reset: function () {
        this.firstNumber = 0;
        this.secondNumber = 0;
        this.calculationResult = 0;
        this.operator = '';
        this.currentNumber = 'first';
        this.calculationString = ''
        this.isDecimal = false;
    },

    evaluateExpression: function () {
        this.calculationResult = operate(this.operator, this.firstNumber, this.secondNumber);
        this.calculationString = this.toString();
        this.firstNumber = this.calculationResult;
        this.currentNumber = 'first';
        this.operator = '';
        this.secondNumber = 0;
    },

    toggleDecimal: function () {
        if(this.isDecimal) {
            this.isDecimal = false;
        } else {
            this.isDecimal = true;
        }
    },

    getCurrentNumber: function() {
        if(this.currentNumber == 'first') {
            return this.firstNumber;
        } else {
            return this.secondNumber;
        }
    }, 

    setCurrentNumber: function(num) {
        if(this.currentNumber == 'first') {
            this.firstNumber = num;
        } else {
            this.secondNumber = num;
        }
    },

    changeSign: function () {
        if(this.currentNumber == 'first') {
            this.firstNumber = this.firstNumber * -1;
        } else {
            this.secondNumber = this.secondNumber * -1;
        }
    },

    evaluateOperator: function(o) {
        if(this.operator == '') {
            this.currentNumber = 'second';
            this.operator = o;
        }
    },

    evaluateNumber: function(num) {
        if(this.currentNumber == 'first' && this.isDecimal && Number.isInteger(this.firstNumber)) {
            this.firstNumber = Number(`${this.firstNumber.toString()}\.${num}`);
            this.toggleDecimal();
        } else if(this.currentNumber == 'first' && !this.isDecimal) {
            this.firstNumber = Number(this.firstNumber.toString() + num);
        } else if(this.currentNumber == 'second' && this.isDecimal) {
            this.secondNumber = Number(`${this.secondNumber.toString()}\.${num}`);
            this.toggleDecimal();
        } else {
            this.secondNumber = Number(this.secondNumber.toString() + num);
        }
    },

    toString: function() {
        if(this.operator == '') {
            return '';
        } else {
            return `${this.firstNumber}  ${this.operator} ${this.secondNumber} = ${this.calculationResult}`;
        }
    }
};



/**
 * Main logic for the calculator. Performs functions depending on which button
 * was pressed. This ties the View (UI) to the Model (calc object).
 * @param {Element} selectedButton 
 */
function calculatorController(selectedButton) {
    
    const numbers = ['1','2','3','4','5','6','7','8','9','0'];
    const operators = ['+','−','×','÷'];

    buttonText = selectedButton.textContent;

    if(buttonText == 'AC') {
        calc.reset();
        clearScreen();
        addHighlight(selectedButton);
        removeHighlightOperator(selectedButton);
    } else if(buttonText == '+/-') { 
        calc.changeSign();
        updateScreen(calc.getCurrentNumber());
        addHighlight(selectedButton);
    } else if(buttonText == '=') { 
        calc.evaluateExpression();
        toggleDisableDecimal();
        updateScreen(calc.getCurrentNumber());
        updateEquation(calc.calculationString);
        addHighlight(selectedButton);
        removeHighlightOperator();
    } else if(buttonText == '.') {
        calc.toggleDecimal();
        toggleDisableDecimal();
        addHighlight(selectedButton);
        updateScreen(calc.getCurrentNumber());
    }else if(numbers.includes(buttonText)) { 
        calc.evaluateNumber(buttonText);
        updateScreen(calc.getCurrentNumber());
        addHighlight(selectedButton);
    } else if(operators.includes(buttonText)) { 
        toggleDisableDecimal();
        if(calc.operator == '') {
            addHighlightOperator(selectedButton);
            calc.evaluateOperator(selectedButton.dataset.operator);
        }
    }
}






/*********************************************************
 * 
 * Register the event handler functions with the UI
 * 
 **********************************************************/

try {
    const buttons = Array.from(document.querySelectorAll('.button'));
    buttons.forEach(button => {
        button.addEventListener('click', handleClick);
        button.addEventListener('transitionend', handleTransition);
    });
    
    window.addEventListener('keydown', handleKeyPress);
    
    updateScreen('0');

} catch(err) {
    // Hack to surpress errors when running jest automated tests.
    // There is no "document" available when running in jest.
    if(err.name != 'ReferenceError') {
        throw new Error(err);
    }
}





/***************************************************************
 * 
 * Make the operator functions available for unit testing. 
 * 
 ****************************************************************/


try {
    module.exports = {add, subtract, multiply, divide, operate};
} catch(err) {
    // Hack to surpress errors when running script in browser.
    // There is no "module" available when running in browser.
    if(err.name != 'ReferenceError') {
        throw new Error(err);
    }
}
