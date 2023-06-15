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
        setDisplay(symbol)
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
    if (e.target.textContent === '=')
    {
        num2 = getDisplay();
        clearDisplay();
        setDisplay(operate(num1, operator, num2))
    }
    else if (!num1)
    {
        num1 = getDisplay();
        operator = e.target.textContent;
        clearDisplay();
    }
        // call operate with what ever is in the global variables and display.
        
    // if no there are no operands, capture display into num1 and the operation

    // if 'num1' is captured but not 'num2' then:
        // if display is nothing, then return soft error then clear all
        // else, capture 'num2', call operate, then set num1 into the value of operate
    // if 

    // remember to do error checking
}
// returns the result between 2 operands based on an inputted 'operator'
function operate (n1, op, n2)
{
    let retval = 0;
    // if (num1 && (!operator || !num2))
    // {
    //     return num1;
    // }
    // else if (num1 && operator || !num2))
    // {

    // }
    //     return;
    
    // returns output of operation matching 'operator'
    switch (operator)
    {
        case '+':
            retval = (+num1) + (+num2);
            break;
        case '-':
            retval = (+num1) - (+num2);
            break;
        case 'x':
            retval = (+num1) * (+num2);
            break;
        case '/':
            retval = (+num1) / (+num2);
            break;
    }
    num1 = num2 = operand = null;
    return retval;

}

const clearBtn = controlPad.querySelector('.clear-btn');
clearBtn.addEventListener('click', () => {
        clearDisplay();
        clearValues();
    })

// add functions for 4 basic arithmetic operations;
function add()
{

}

function subtract()
{

}

function multiply()
{

}

function divide()
{

}

// functions for interacting with display data
function setDisplay(content)
{
    topBar.textContent += content;
}

function getDisplay()
{
    return topBar.textContent;
}
function clearDisplay(){
    topBar.textContent = '';
}
function clearValues(){
    num1 = num2 = operand = null;
}