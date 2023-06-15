// references to DOM elements
const numPad = document.querySelector('.num-pad');
const topBar = document.querySelector('.top-bar');
const opPad = document.querySelector('.op-pad');
const controlPad = document.querySelector('.control-pad');
// add event listeners for all numbers
const numbers = numPad.querySelectorAll('.num-btn');
numbers.forEach(number => {
    number.addEventListener('click', (e) => {
        const symbol = e.target.textContent
        addDisplay(symbol)
        })

    })
const button = opPad.querySelector('.op-button');
// concatenates content to existing text in display bar    



let num1 = null;
let operator = null;
let num2 = null;

const operations = opPad.querySelectorAll('.op-btn');
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
    }
       
}
// returns the result between 2 operands based on an inputted 'operator'
function operate(n1, op, n2)
{
    // if there is only the first operand present
    if (n1 && !op && !n2)
    {
        return n1;
    }
    // if the second operand is missing
    else if (n1 && op && !n2)
    {
        return ("ERROR");

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

const clearBtn = controlPad.querySelector('.clear-btn');
clearBtn.addEventListener('click', () => {
        clearDisplay();
        clearValues();
    })

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
    topBar.textContent += content;
}
function setDisplay(content){
    topBar.textContent = content;
}

function getDisplay()
{
    return topBar.textContent;
}
function clearDisplay(){
    topBar.textContent = '';
}
function clearValues(){
    num1 = num2 = operator = null;
}