const display = document.querySelector('.display');
const history = document.querySelector('.history');

let current = '0';
let previous = null;
let operator = null;
let waitingForOperand = false;

const formatNumber = (value) => {
  const [integer, decimal] = String(value).split('.');
  const formattedInteger = Number(integer).toLocaleString('en-US');
  return decimal !== undefined ? `${formattedInteger}.${decimal}` : formattedInteger;
};

function updateDisplay() {
  display.textContent = formatNumber(current);
  history.textContent = previous !== null && operator
    ? `${formatNumber(previous)} ${operator}`
    : '';
}

function inputDigit(digit) {
  if (waitingForOperand) {
    current = digit;
    waitingForOperand = false;
  } else {
    current = current === '0' ? digit : current + digit;
  }
}

function inputDecimal() {
  if (waitingForOperand) {
    current = '0.';
    waitingForOperand = false;
  } else if (!current.includes('.')) {
    current += '.';
  }
}

function calculate(first, second, operation) {
  switch (operation) {
    case '+': return first + second;
    case '−': return first - second;
    case '×': return first * second;
    case '÷': return second === 0 ? null : first / second;
    default: return second;
  }
}

function chooseOperator(nextOperator) {
  const inputValue = Number(current);

  if (operator && waitingForOperand) {
    operator = nextOperator;
    return;
  }

  if (previous === null) {
    previous = inputValue;
  } else if (operator) {
    const result = calculate(previous, inputValue, operator);
    if (result === null) {
      current = 'Ошибка';
      previous = null;
      operator = null;
      waitingForOperand = true;
      return;
    }
    current = String(Number(result.toFixed(12)));
    previous = result;
  }

  operator = nextOperator;
  waitingForOperand = true;
}

function clearCalculator() {
  current = '0';
  previous = null;
  operator = null;
  waitingForOperand = false;
}

function handleAction(action) {
  if (action === 'clear') clearCalculator();
  if (action === 'sign' && current !== '0' && current !== 'Ошибка') current = String(-Number(current));
  if (action === 'percent' && current !== 'Ошибка') current = String(Number(current) / 100);
  if (action === 'equals' && operator && previous !== null) {
    const result = calculate(previous, Number(current), operator);
    current = result === null ? 'Ошибка' : String(Number(result.toFixed(12)));
    previous = null;
    operator = null;
    waitingForOperand = true;
  }
}

document.querySelector('.calculator').addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;

  if (button.dataset.number) inputDigit(button.dataset.number);
  if (button.dataset.decimal) inputDecimal();
  if (button.dataset.operator) chooseOperator(button.dataset.operator);
  if (button.dataset.action) handleAction(button.dataset.action);
  updateDisplay();
});

document.addEventListener('keydown', (event) => {
  if (/^\d$/.test(event.key)) inputDigit(event.key);
  else if (event.key === '.' || event.key === ',') inputDecimal();
  else if ({ '+': '+', '-': '−', '*': '×', '/': '÷' }[event.key]) chooseOperator({ '+': '+', '-': '−', '*': '×', '/': '÷' }[event.key]);
  else if (event.key === 'Enter' || event.key === '=') handleAction('equals');
  else if (event.key === 'Escape') handleAction('clear');
  else if (event.key === 'Backspace') current = current.length > 1 ? current.slice(0, -1) : '0';
  else return;
  event.preventDefault();
  updateDisplay();
});

updateDisplay();
