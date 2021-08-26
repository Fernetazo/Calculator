/*
TO DO:
    Limit max input to display
    Visual effect when key pressed
    Fix visual bugs (ie root)
    ? = Made by etc
*/

let num1 = null;
let num2 = null;
let operator = false;
let display = document.getElementById("display");
let result = null;
let inputtedOperation = null;

let add = (a, b) => parseFloat(a) + parseFloat(b);
let sub = (a, b) => parseFloat(a) - parseFloat(b);
let multi = (a, b) => parseFloat(a) * parseFloat(b);
let divi = (a, b) => {return (b == "0" ? "W͇̙̫̒͡H͕̯̖̱̑̔̄̈́͟Ȃ̴̩͙̤̱͈ͅŢ̹̻̰̗̫͇̠͍̐̂̓́ ͆҉̼͔A̛͍͎̼̭͑̇̓R͕͇̟̩̤̲͛̇͝Ȩ̞͖̟̭̹̮͔̺̊ ̼̼̥ͧͧ̊͢Y̸̗̙͎͚͉͎ͨͭȮ͚̩̳͈͙̭̼͉͆ͤ̽̀Ų̻̪̱̹̦̦͑ͦ ̌̿̏ͥ͏̹̩̟D̳̤͇̹̣̜̽ͪ̃͠Ǫ̺̘̾I̙͔̳͛̄̅͢N̨̠̱͍̼̙͍͇ͫͥͅG͍̮̪̲̪̍̎̑͗͜!͚̺̻͙́̓͒͞?͎̹̭̿̅͛͌͘" : parseFloat(a) / parseFloat(b))};
let pow = (a, b) => Math.pow(parseFloat(a), parseFloat(b));
let root = (a, b) => Math.pow(parseFloat(b), 1 / parseFloat(a));
let percent = (a, b) => ((parseFloat(b) / 100) * parseFloat(a));

function operate(a, b, operation) {
    switch (operation) {
        case '+': result = add(a, b); break;
        case '-': result = sub(a, b); break;
        case '*': result = multi(a, b); break;
        case '÷': result = divi(a, b); break;
        case 'xⁿ': result = pow(a, b); break;
        case 'ⁿ√x': result = root(a, b); break;
        case '%': result = percent(a, b); break;
    }
    // Prevents floating point precision problem
    return result = parseFloat(result.toFixed(9));
}

let buttonClicked = e => {
    input = e.target.textContent;
    type = e.target.classList[0];
    userInput(input, type);
};

let buttonPressed = e => {
    let key = document.querySelector(`button[data-key="${e.key}"]`);
    if (key) {
        input = key.textContent;
        type = key.classList[0];
        userInput(input, type)
    }
};

function userInput(input, type) {
    if (input == "C") {
        num1 = null;
        num2 = null;
        operator = false;
        display.textContent = "";
        result = null;
        inputtedOperation = null;
    }

    if (input == "DEL") {
        if (/\d/.test(display.textContent)) {
            if (!result) {
                if (num1 && !num2) {
                    num1 = num1.toString().slice(0, -1);
                }
                if (num1 && num2) {
                    num2 = num2.toString().slice(0, -1);
                }
            } else {
                result = result.toString().slice(0, -1);
            }
            display.textContent = display.textContent.slice(0, -1);
            
            // Checks for solitary "-" because Backspacing
            if (num1 == "-" || num2 == "-" || result == "-") {
                display.textContent = "";
                if (num1 == "-") num1 = null;
                if (num2 == "-") num2 = null;
                if (result == "-") result = null;
            }
        } else {
            if (num1 && !num2) {
                display.textContent = num1;
                inputtedOperation = null;
                operator = false;
            }
        }
    }

    if (type == "modifier" && /\d/.test(display.textContent)) {
        if (input == "Copy") {
            navigator.clipboard.writeText(display.textContent);
        }

        if (input == ".") {
            if (!display.textContent.includes(".")) {
                if (num1 && !num2) {
                    num1 = num1 + ".";
                    display.textContent = display.textContent + ".";
                } else if (num1 && num2) {
                    num2 = num2 + ".";
                    display.textContent = display.textContent + ".";
                }
            }
        }
        
        if (input == "+/-") {
            if (display.textContent.includes("-")) {
                if (num1 && !num2) {
                    num1 = num1.toString().replace("-", "");
                } else if (num1 && num2) {
                    num2 = num2.replace("-", "");
                } else {
                    result = result.toString().replace("-", "");
                }
                display.textContent = display.textContent.replace("-", "");
            } else {
                if (num1 && !num2) {
                    num1 = "-" + num1
                } else if (num1 && num2) {
                    num2 = "-" + num2;
                } else {
                    result = "-" + result;
                }
                display.textContent = "-" + display.textContent;
            }
        }
    }

    if (type == "number") {
        result = null;
        if (operator == false) {
            if (num1 == null) {
                num1 = input;
            } else if (num1 != null) {
                num1 = num1 + input;
            }
            display.textContent = num1;
        } else {
            if (num2 == null) {
                num2 = input;
            } else if (num2 != null) {
                num2 = num2 + input;
            }
            display.textContent = num2;
        }
    }
    
    if (type == "operator") {
        if (input != "=") {
            if (num1 && num2) {
                operate (num1, num2, inputtedOperation);
                display.textContent = result;
                num1 = result;
                num2 = null;
                operator = true;
                inputtedOperation = null;
                result = null;
            } else if (result && !num1) {
                num1 = result;
                display.textContent = input;
                operator = true;
            } else if (num1) {
                display.textContent = input;
                operator = true;
            }
            inputtedOperation = input;
        } else if (input == "=") {
            if (num1 && num2) {
                operate (num1, num2, inputtedOperation);
                display.textContent = result;
                num1 = null;
                num2 = null;
                operator = false;
                inputtedOperation = null;
            }
        }
    }
}

// Prevent unwanted inputs from default browser behavior
window.addEventListener('keydown', e => { 
    if (e.key == '/' || e.key == 'Enter' || e.code == 'Space') {
        e.preventDefault() 
    } 
});

const buttons = document.querySelectorAll("button");
buttons.forEach(button => button.addEventListener('click', buttonClicked));
window.addEventListener('keyup', buttonPressed);