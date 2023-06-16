// references to DOM elements
const display = document.querySelector('.display');

// add event listeners for all numbers
const numbers = document.querySelectorAll('.num-btn');
numbers.forEach(number => {
    number.addEventListener('click', (e) => {
        const symbol = e.target.textContent
        addDisplay(symbol)
        })

    })
const button = document.querySelector('.op-button');
// concatenates content to existing text in display bar    



let num1 = null;
let operator = null;
let num2 = null;

const operations = document.querySelectorAll('.op-btn');
operations.forEach(operation => {
    operation.addEventListener('click', handleOperation)
})

function handleOperation(e)
{
    // handles '=' button behavior
    if (e.target.textContent === '=')
    {
        if (!num1)
        {
            return;
        }
        num2 = +getDisplay();
        setDisplay(operate(num1, operator, num2))
    }
    // first operand has not been set by a non '=' operator
    else if (!num1)
    {
        num1 = +getDisplay();
        operator = e.target.textContent;
        clearDisplay();
    }
    // a non '=' operator already has been logged
    else if(operator)
    {
        // solves first expression then saves it as an operand for the next
        num2 = +getDisplay();
        num1 = +operate(num1, operator, num2);
        operator = e.target.textContent
        num2 = null;
        clearDisplay();

        if (!num1){
            setDisplay("ERROR");
            clearValues();
        }
    }
       
}
// returns the result between 2 operands based on an inputted 'operator'
function operate(n1, op, n2)
{
    // if there is only the first operand present
    if (!n1)
    {
        return null;
    }
    else if (n1 && !op && !n2)
    {
        return n1;
    }
    // if the second operand is missing
    else if (n1 && op && !n2)
    {
        return null;

    }

    let retval = 0;
    switch (operator)
    {
        case '+':
            retval = add(n1, n2);
            break;
        case '-':
            retval = subtract(n1, n2);
            break;
        case 'x':
            retval = multiply(n1, n2);
            break;
        case '/':
            retval = divide(n1, n2);
            break;
    }
    clearValues();
    clearDisplay();
    return retval;

}

const clearBtn = document.querySelector('.clr-btn');
clearBtn.addEventListener('click', () => {
        clearDisplay();
        clearValues();
    })

// button style change when pressed
const allButtons = document.querySelectorAll('button');
allButtons.forEach(button => button.addEventListener('mousedown', (e) => {
    e.target.classList.add('btn-pressed')
}))
allButtons.forEach(button => button.addEventListener('mouseup', (e) => {
    e.target.classList.remove('btn-pressed')
}))

// add functions for 4 basic arithmetic operations;
function add(n1, n2)
{
    return n1 + n2;
}

function subtract(n1, n2)
{
    return n1 - n2;
}

function multiply(n1, n2)
{
    return n1 * n2;
}

function divide(n1, n2)
{
    return n1 / n2;
}

// functions for interacting with display data
function addDisplay(content)
{
    display.textContent += content;
}
function setDisplay(content){
    display.textContent = content;
}

function getDisplay()
{
    return display.textContent;
}
function clearDisplay(){
    display.textContent = '';
}
function clearValues(){
    num1 = num2 = operator = null;
}