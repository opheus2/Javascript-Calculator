"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Calculator =
/*#__PURE__*/
function () {
  function Calculator(previousOperandTextElement, currentOperandTextElement) {
    _classCallCheck(this, Calculator);

    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  _createClass(Calculator, [{
    key: "clear",
    value: function clear() {
      this.currentOperand = '';
      this.previousOperand = '';
      this.operation = undefined;
    }
  }, {
    key: "delete",
    value: function _delete() {
      this.currentOperand = this.currentOperand.slice(0, -1);
    }
  }, {
    key: "appendNumber",
    value: function appendNumber(number) {
      if (number === '.' && this.currentOperand.includes('.')) return;
      this.currentOperand = this.currentOperand + number;
    }
  }, {
    key: "chooseOperation",
    value: function chooseOperation(operation) {
      if (this.operation != null && this.operation != operation) {
        this.operation = operation;
      }

      if (this.currentOperand === '') return;

      if (this.previousOperand !== '') {
        this.compute();
      }

      this.operation = operation;
      this.previousOperand = this.currentOperand;
      this.currentOperand = '';
    }
  }, {
    key: "compute",
    value: function compute() {
      var computation;
      var prev = parseFloat(this.previousOperand);
      var current = parseFloat(this.currentOperand);
      if (isNaN(prev) || isNaN(current)) return;

      switch (this.operation) {
        case '+':
          computation = prev + current;
          break;

        case '-':
          computation = prev - current;
          break;

        case '*':
          computation = prev * current;
          break;

        case '/':
          computation = prev / current;
          console.log(computation);
          break;

        default:
          return;
      }

      this.currentOperand = computation;
      this.operation = undefined;
      this.previousOperand = '';
    }
  }, {
    key: "getDisplayNumber",
    value: function getDisplayNumber(number) {
      var decimalString = number.toString();

      if (decimalString.includes('.') && !isNaN(parseFloat(decimalString.split('.')[0]))) {
        return decimalString.split('.')[0].replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '.' + decimalString.split('.')[1];
      }

      return number.toString().replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }, {
    key: "updateDisplay",
    value: function updateDisplay() {
      this.currentOperandTextElement.value = this.getDisplayNumber(this.currentOperand);

      if (this.operation != null) {
        this.previousOperandTextElement.innerHTML = "".concat(this.getDisplayNumber(this.previousOperand), " ").concat(this.operation);
      } else {
        this.previousOperandTextElement.innerHTML = '';
      }
    }
  }]);

  return Calculator;
}();

var keypads = document.querySelectorAll('.pad');
var previousOperandTextElement = document.querySelector('#history');
var currentOperandTextElement = document.querySelector('#input');
var calculator = new Calculator(previousOperandTextElement, currentOperandTextElement); //keypad events

keypads.forEach(function (keypad) {
  keypad.addEventListener('click', function (e) {
    if (e.target.className.includes('reset')) {
      //reset
      calculator.clear();
      calculator.updateDisplay();
    } else if (e.target.className.includes('equal')) {
      //equal
      calculator.compute();
      calculator.updateDisplay();
    } else if (e.target.className.includes('multiplication')) {
      //multiply
      calculator.chooseOperation('*');
      calculator.updateDisplay();
    } else if (e.target.className.includes('addition')) {
      //addition
      calculator.chooseOperation('+');
      calculator.updateDisplay();
    } else if (e.target.className.includes('substraction')) {
      //substraction
      calculator.chooseOperation('-');
      calculator.updateDisplay();
    } else if (e.target.className.includes('division')) {
      //division
      calculator.chooseOperation('/');
      calculator.updateDisplay();
    } else if (e.target.className.includes('delete')) {
      //delete
      calculator["delete"]();
      calculator.updateDisplay();
    } else {
      calculator.appendNumber(e.target.outerText);
      calculator.updateDisplay();
    }
  });
}); // add keyboard events

window.addEventListener("keydown", function (event) {
  if (parseInt(event.key) >= 0 || parseInt(event.key) <= 9) {
    calculator.appendNumber(event.key);
    calculator.updateDisplay();
  } else {
    var operation = undefined;

    switch (event.key) {
      case '+':
        operation = event.key;
        break;

      case '-':
        operation = event.key;
        break;

      case '*':
        operation = event.key;
        break;

      case '/':
        operation = event.key;
        break;

      case '=':
      case 'Enter':
        calculator.compute();
        calculator.updateDisplay();
        break;

      case 'Backspace':
      case 'Delete':
        calculator["delete"]();
        calculator.updateDisplay();
        break;

      case 'Escape':
        calculator.clear();
        calculator.updateDisplay();
        break;

      default:
        break;
    }

    if (operation != null) {
      calculator.chooseOperation(operation);
      calculator.updateDisplay();
    }
  }
}, true); // Theme change section

rangeInput = document.getElementById("theme-switcher");
rangeInput.addEventListener('mouseup', changeTheme, false);
var isTouchDevice = 'ontouchstart' in document.documentElement;

if (isTouchDevice && isTouchDevice != false) {
  rangeInput.addEventListener('touchend', changeTheme, false);
}

function changeTheme(e) {
  if (e.target.value == 3) {
    localStorage.setItem('theme', 3);
    changeCSS('theme-3.css');
  } else if (e.target.value == 2) {
    localStorage.setItem('theme', 2);
    changeCSS('theme-2.css');
  } else {
    localStorage.setItem('theme', 1);
    changeCSS('theme-1.css');
  }
}

function changeCSS(filename) {
  var oldCss = document.getElementById("theme");
  oldCss.href = "./dist/".concat(filename);
}

var themeStorage = localStorage.getItem('theme');

if (themeStorage == null) {
  localStorage.setItem('theme', 1);
  rangeInput.value = 1;
} else {
  changeCSS("theme-".concat(localStorage.getItem('theme'), ".css"));
  rangeInput.value = localStorage.getItem('theme');
}