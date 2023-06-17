// flag that sets when screen will be overwritten when numbers are pressed
let overwrite = false;
let decimalOn = false;
let zeroDivide = false;
// references to DOM elements
const display = document.querySelector('.display');
const message = document.querySelector('.message');

// add event listeners for all numbers
const numbers = document.querySelectorAll('.num-btn');
numbers.forEach(number => {
    number.addEventListener('click', (e) => {
        const symbol = e.target.textContent
        
        // only overwrite the first digit of a number so the rest can be typed
        if (overwrite)
        {
            setDisplay(symbol);
            overwrite = false;
        }
        else
        {
            addDisplay(symbol)
        }
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

        const result = operate(num1, operator, num2)
        if (result)
            setDisplay(result);
        else
        {
            setDisplay("ERROR");
            overwrite = true;
        }
    }
    // first operand has not been set by a non '=' operator
    else if (!num1)
    {
        num1 = +getDisplay();
        operator = e.target.textContent;
        overwrite = true;
    }
    // a non '=' operator already has been logged
    else if(operator)
    {
        // solves first expression then saves it as an operand for the next
        num2 = +getDisplay();
        num1 = +operate(num1, operator, num2);
        operator = e.target.textContent
        num2 = null;

        setDisplay(num1);
        overwrite = true;

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
    else if (n1 && op && !n2 && n2 !== 0)
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
            if (n2 === 0){
                retval = null;
                zeroDivide = true;
            }
            else
            {
                retval = divide(n1, n2);
            }
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

// button style change and sound when pressed
const allButtons = document.querySelectorAll('button');
const audio = document.querySelector('audio');
allButtons.forEach(button => button.addEventListener('mousedown', (e) => {
    e.target.classList.add('btn-pressed')
    audio.currentTime = 0;
    audio.play();
}))
allButtons.forEach(button => {
    button.addEventListener('mouseup', (e) => {
        e.target.classList.remove('btn-pressed')
    })
    button.addEventListener('mouseleave', (e) => {
        e.target.classList.remove('btn-pressed')
    })
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

// concatenates 'content' onto display
function addDisplay(content)
{
    display.textContent += content;
    handleMessages();
}

// overwrites display with 'content'
function setDisplay(content){
    display.textContent = content;
    handleMessages();
}

// returns display content
function getDisplay()
{
    return display.textContent;
}

// clears display content (does not clear underlying values)
function clearDisplay(){
    display.textContent = '';
    message.textContent = '';
}

// clears underlying values
function clearValues(){
    num1 = num2 = operator = null;
}

// sets 'message' div to something depending on the display value
function handleMessages(){
    const text = display.textContent;
    if (zeroDivide)
    {
        zeroDivide = false;
        setMessage('why?!?!?!');
    }
    else if (text === '69') setMessage('nice');
    else if (text === '420') setMessage('blaze it');
    else if (text === '80085') setMessage('( ͡° ͜ʖ ͡°)')
    else if (text === '42') setMessage('= life')
    else setMessage('');
}

// overwrites the value of 'message' div
function setMessage(content){
    message.textContent = content;
}