class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand + number
    }

    chooseOperation(operation) {
        if (this.operation != null && this.operation != operation) {
            this.operation = operation
        }
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '/':
                computation = prev / current
                console.log(computation)
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number) {
        let decimalString = number.toString()
        if (decimalString.includes('.') && !isNaN(parseFloat(decimalString.split('.')[0]))) {
            return decimalString.split('.')[0]
                .replace(/,/g, '')
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                '.' +
                decimalString.split('.')[1]
        }
        return number.toString().replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    updateDisplay() {
        this.currentOperandTextElement.value = this.getDisplayNumber(this.currentOperand)

        if (this.operation != null) {
            this.previousOperandTextElement.innerHTML = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerHTML = ''
        }
    }
}

const keypads = document.querySelectorAll('.pad')
const previousOperandTextElement = document.querySelector('#history')
const currentOperandTextElement = document.querySelector('#input')
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

//keypad events
keypads.forEach((keypad) => {
    keypad.addEventListener('click', (e) => {
        if (e.target.className.includes('reset')) { //reset
            calculator.clear()
            calculator.updateDisplay()
        } else if (e.target.className.includes('equal')) { //equal
            calculator.compute()
            calculator.updateDisplay()
        } else if (e.target.className.includes('multiplication')) { //multiply
            calculator.chooseOperation('*')
            calculator.updateDisplay()
        } else if (e.target.className.includes('addition')) { //addition
            calculator.chooseOperation('+')
            calculator.updateDisplay()
        } else if (e.target.className.includes('substraction')) { //substraction
            calculator.chooseOperation('-')
            calculator.updateDisplay()
        } else if (e.target.className.includes('division')) { //division
            calculator.chooseOperation('/')
            calculator.updateDisplay()
        } else if (e.target.className.includes('delete')) { //delete
            calculator.delete()
            calculator.updateDisplay()
        } else {
            calculator.appendNumber(e.target.outerText)
            calculator.updateDisplay()
        }
    })
})

// add keyboard events
window.addEventListener("keydown", function(event) {
    if (parseInt(event.key) >= 0 || parseInt(event.key) <= 9) {
        calculator.appendNumber(event.key)
        calculator.updateDisplay()
    } else {
        let operation = undefined
        switch (event.key) {
            case '+':
                operation = event.key
                break;
            case '-':
                operation = event.key
                break;
            case '*':
                operation = event.key
                break;
            case '/':
                operation = event.key
                break;
            case '=':
            case 'Enter':
                calculator.compute()
                calculator.updateDisplay()
                break;
            case 'Backspace':
            case 'Delete':
                calculator.delete()
                calculator.updateDisplay()
                break;
            case 'Escape':
                calculator.clear()
                calculator.updateDisplay()
                break;

            default:
                break;
        }
        if (operation != null) {
            calculator.chooseOperation(operation)
            calculator.updateDisplay()
        }
    }

}, true);

// Theme change section
rangeInput = document.getElementById("theme-switcher")

rangeInput.addEventListener('mouseup', changeTheme, false)

let isTouchDevice = 'ontouchstart' in document.documentElement

if (isTouchDevice && isTouchDevice != false) {
    rangeInput.addEventListener('touchend', changeTheme, false)
}

function changeTheme(e) {
    if (e.target.value == 3) {
        localStorage.setItem('theme', 3);
        changeCSS('theme-3.css')
    } else if (e.target.value == 2) {
        localStorage.setItem('theme', 2);
        changeCSS('theme-2.css')
    } else {
        localStorage.setItem('theme', 1);
        changeCSS('theme-1.css')
    }
}

function changeCSS(filename) {
    let oldCss = document.getElementById("theme")
    oldCss.href = `./dist/${filename}`
}

let themeStorage = localStorage.getItem('theme');
if (themeStorage == null) {
    localStorage.setItem('theme', 1);
    rangeInput.value = 1;
} else {
    changeCSS(`theme-${localStorage.getItem('theme')}.css`)
    rangeInput.value = localStorage.getItem('theme');
}