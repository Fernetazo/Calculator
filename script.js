/*
TO DO:
    Input by keyboard
    GUI
    On off button?
*/

let num1 = null;
let num2 = null;
let operator = false;
let display = document.getElementById("display");
let result = null;
let inputtedOperation = null;

function buttonClicked(e) {
    userInput(e);
}

function buttonPressed(e) {
    userInput(e);
}

let add = (a, b) => parseFloat(a) + parseFloat(b);

let sub = (a, b) => parseFloat(a) - parseFloat(b);

let multi = (a, b) => parseFloat(a) * parseFloat(b);

let divi = (a, b) => parseFloat(a) / parseFloat(b);

let pow = (a, b) => Math.pow(parseFloat(a), parseFloat(b));

let root = (a, b) => Math.pow(parseFloat(b), 1/parseFloat(a));

let percent = (a, b) => ((parseFloat(b) / 100) * parseFloat(a));

function operate(a, b, operation) {
    if (operation == "+") {
        result = add(a, b);
    } else if (operation == "-") {
        result = sub(a, b);
    } else if (operation == "*") {
        result = multi(a, b);
    } else if (operation == "/") {
        result = divi(a, b);
    } else if (operation == "xⁿ") {
        result = pow(a, b);
    } else if (operation == "ⁿ√") {
        result = root(a, b);
    } else if (operation == "%") {
        result = percent(a, b);
    }
    return result;
}

function userInput(e) {
    let input = (e.keyCode || e.target.textContent);
    let type = e.target.classList[0]
    
    if (input == "Clear") {
        num1 = null;
        num2 = null;
        operator = false;
        display.textContent = "";
        result = null;
        inputtedOperation = null;
    }

    if (input == "Backspace") {
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
            } else {
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

const buttons = document.querySelectorAll("button");
buttons.forEach(button => button.addEventListener('click', buttonClicked))
window.addEventListener('keyup', buttonPressed);