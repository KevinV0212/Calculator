// number of characters that fit in the display
const DISPLAY_SIZE = 22;

// flag that sets when screen will be overwritten when numbers are pressed
let overwrite = false;
let decimalOn = false;
let zeroDivide = false;
let digitsFull = false;
// references to DOM elements
const display = document.querySelector('.display');
const message = document.querySelector('.message');

// add event listeners for all number buttons
const numbers = document.querySelectorAll('.num-btn');
numbers.forEach(number => {
    number.addEventListener('click', (e) => {
        const num = e.target.textContent
        
        // only overwrite the first digit of a number so the rest can be typed
        if (overwrite)
        {
            setDisplay(num);
            resetFlags();
        }
        else
        {
            addDisplay(num)
        }
    })
})
const button = document.querySelector('.op-button');

// add event listener for number input from keyboard
window.addEventListener('keydown', (e) =>{
    const num = e.key
    if (!Number.isInteger(+num))
        return;
    // only overwrite the first digit of a number so the rest can be typed
    if (overwrite)
    {
        setDisplay(num);
        resetFlags();
    }
    else
    {
        addDisplay(num)
    }
})


let num1 = null;
let operator = null;
let num2 = null;

// event listener for operation buttons
const operations = document.querySelectorAll('.op-btn');
operations.forEach(operation => {
    operation.addEventListener('click', (e) => {
        handleOperation(e.target.textContent)
    })
})

// event listener for keyboard operation keys
window.addEventListener('keydown', (e) =>{
    op = e.key;
    if (op === '+' || op === '-' || op === 'x' || op === '*' || 
        op === '/' || op === '=' || op === 'Enter')
    {
        handleOperation(op);
    }
})


// maps and event it to an operation based on 'num1' 'num2' and 'operator'
function handleOperation(op)
{
    // handles '=' button behavior; 'Enter' is for keyboard input
    if (op === '=' || op === 'Enter')
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
        operator = op;
        overwrite = true;
    }
    // a non '=' operator already has been logged
    else if(operator)
    {
        // solves first expression then saves it as an operand for the next
        num2 = +getDisplay();
        num1 = +operate(num1, operator, num2);
        operator = op
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
        
        // second case is for keyboard multiplication operator
        case 'x':
        case '*':
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
    
    // trims retval to fit on display
    if (isTooBig(`${retval}`))
    {
        if (isDecimal(retval))
        {
            return trimDecimal(retval)
        }
        else
        {
            return trimNumber(retval);
        }
    }
    return retval;

}
// adding clear button functionality
const clearBtn = document.querySelector('.clr-btn');
clearBtn.addEventListener('click', () => {
        clearDisplay();
        clearValues();
    })

// adding backspace button functionality 
const backspaceBtn = document.querySelector('.backspace-btn');
backspaceBtn.addEventListener('click', handleBackspace);

// add event listener for keyboard backspace
window.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace')
        handleBackspace();
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

// button style changes and sound when matching key is pressed
window.addEventListener('keydown', (e) => {
    const key = e.key;
    const btn = findButtonMatch(key);
    if (btn)
    {
        btn.classList.add('btn-pressed')
        audio.currentTime = 0;
        audio.play();
    }
})
window.addEventListener('keyup', (e) => {
    const key = e.key;
    const btn = findButtonMatch(key)
    if (btn)
    {
        btn.classList.remove('btn-pressed')
    }
})

// finds a button that matches key
function findButtonMatch(key)
{
    if (key === '*')
        return document.querySelector(`button[data-key='x']`);
    else if (key === 'Enter')
        return document.querySelector(`button[data-key='=']`);
    else
    {
        return document.querySelector(`button[data-key='${key}']`);
    }
}

// event listener for decimal button
const decBtn = document.querySelector('.dec-btn')
decBtn.addEventListener('click', (e) => {
    if (!decimalOn)
    {
        addDisplay('.')
        decimalOn = true;
    }
})

// event listener for decimal key on keyboard
window.addEventListener('keydown', (e) => {
    if (e.key === '.')
    {
        if (!decimalOn)
        {
            addDisplay('.')
            decimalOn = true;
        }
    }
       
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
    if (isDisplayFull()){
        handleMessages();
    }
    else
    {
        display.textContent += content;
        handleMessages();
    }
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
    resetFlags();
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
    else if (isDisplayFull()) setMessage('TOO BIG')
    else if (text === '69') setMessage('nice');
    else if (text === '420') setMessage('blaze it');
    else if (text === '80085') setMessage('( ͡° ͜ʖ ͡°)')
    else if (text === '42') setMessage('= life')
    else if (text === '666') setMessage('el diablo')
    else if (text === '777') setMessage('jackpot')
    else if (text === '69420' || text === '42069') setMessage('wowiezowie')
    else if (text === '911') setMessage('police!')
    else if (text === '13') setMessage('unlucky')
    else if (text === '404') setMessage('not found')
    else if (text === '3.14') setMessage('pi')
    else if (text === '1225') setMessage('hohoho')
    else setMessage('');
}

// overwrites the value of 'message' div
function setMessage(content){
    message.textContent = content;
}


// checks if 'content' will fit within the displayoed 
function isTooBig(content){
    return content.length >= DISPLAY_SIZE;
}

function isDisplayFull(){
    return isTooBig(display.textContent);
}

// completely completely removes digits that don't fit on display
function trimNumber(num){
    return +numText.slice(0, DISPLAY_SIZE);
}

// checks if number has a decimal
function isDecimal(num){
    const numText = `${num}`
    return numText.includes('.')
}
// rounds a number to a certain number of decimal places FIGURE THIS OUT
function round(num, decimalPlaces = 0)
{
    return Math.round(num * (10 ** decimalPlaces)) / (10 ** decimalPlaces) 
}

// rounds decimal if possible
function trimDecimal(num){
    let retVal;
    const numText = `${num}`
    {
        const decimalIndex = numText.indexOf('.');
        // if the decimal is beyond screen limit, cut off 'num' at screen limit
        if (numText.indexOf('.') >= DISPLAY_SIZE)
        {
            retval = trimNumber(num);
        }
        else
        {
            // rounds to number of digits  left in display after decimal
            retval = round (num, DISPLAY_SIZE - decimalIndex - 1)
        }      
        return retval;
    }
}

function resetFlags(){
    overwrite = false;
    decimalOn = false;
    zeroDivide = false;
    digitsFull = false;
}

function handleBackspace()
{
    const text = getDisplay();
    if (text.length > 0)
    {
        setDisplay(text.slice(0, -1));
    }
}