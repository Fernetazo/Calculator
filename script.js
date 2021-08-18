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

function userInput(e) {
    let input = (e.keyCode || e.target.textContent);
    let type = e.target.classList[0]

    // TO DO: Keep in mind the result variable
    if (type == "modifier") {
        if (input == ".") {
            if (!display.textContent.includes(".")) {
                if (num1 && !num2) {
                    num1 = num1 + ".";
                } else {
                    num2 = num2 + ".";
                }
                display.textContent = display.textContent + ".";
            }
        }
        if (input == "+/-") {
            if (display.textContent.includes("-")) {
                if (num1 && !num2) {
                    num1 = num1.replace("-", "");
                } else {
                    num2 = num2.replace("-", "");
                }
                display.textContent = display.textContent.replace("-", "");
            } else {
                if (num1 && !num2) {
                    num1 = "-" + num1
                } else {
                    num2 = "-" + num2;
                }
                display.textContent = "-" + display.textContent;
            }
        }
    }

    if (type == "number") {
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
                if (inputtedOperation == "+") {
                    result = add(num1, num2);
                } else if (inputtedOperation == "-") {
                    result = sub(num1, num2);
                } else if (inputtedOperation == "*") {
                    result = multi(num1, num2);
                } else if (inputtedOperation == "/") {
                    result = divi(num1, num2);
                } else if (inputtedOperation == "xⁿ") {
                    result = pow(num1, num2);
                } else if (inputtedOperation == "ⁿ√") {
                    result = root(num1, num2);
                } else if (inputtedOperation == "%") {
                    result = percent(num1, num2);
                }
                display.textContent = result;
                num1 = result;
                num2 = null;
                operator = true;
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
            if (inputtedOperation == "+") {
                result = add(num1, num2);
            } else if (inputtedOperation == "-") {
                result = sub(num1, num2);
            } else if (inputtedOperation == "*") {
                result = multi(num1, num2);
            } else if (inputtedOperation == "/") {
                result = divi(num1, num2);
            } else if (inputtedOperation == "xⁿ") {
                result = pow(num1, num2);
            } else if (inputtedOperation == "ⁿ√") {
                result = root(num1, num2);
            } else if (inputtedOperation == "%") {
                result = percent(num1, num2);
            }
            display.textContent = result;
            num1 = null;
            num2 = null;
            operator = false;
        }
    }
}

const buttons = document.querySelectorAll("button");
buttons.forEach(button => button.addEventListener('click', buttonClicked))
window.addEventListener('keyup', buttonPressed);