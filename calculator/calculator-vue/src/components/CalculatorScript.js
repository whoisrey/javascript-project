import { ref } from "vue";

export const buffer = ref("0");

const runningTotal = ref(0);
const previousOperator = ref(null);
const shouldResetBuffer = ref(false);

function handleMath(symbol) {
  if (buffer.value === "0") return;

  const intBuffer = Number.parseInt(buffer.value);
  if (runningTotal.value === 0) {
    runningTotal.value = intBuffer;
  } else {
    flushOperation(intBuffer);
  }
  previousOperator.value = symbol;
  shouldResetBuffer.value = true;
}

function flushOperation(intBuffer) {
  if (previousOperator.value === "+") {
    runningTotal.value += intBuffer;
  } else if (previousOperator.value === "−") {
    runningTotal.value -= intBuffer;
  } else if (previousOperator.value === "×") {
    runningTotal.value *= intBuffer;
  } else if (previousOperator.value === "÷") {
    runningTotal.value /= intBuffer;
  }
}

function handleNumber(numberString) {
  if (buffer.value === "0" || shouldResetBuffer.value) {
    buffer.value = numberString;
    shouldResetBuffer.value = false;
  } else {
    buffer.value += numberString;
  }
}

export const buttonRows = [
  ["7", "8", "9", "×"],
  ["4", "5", "6", "−"],
  ["1", "2", "3", "+"],
  ["0", "="],
];

export function handleButtonClick(value) {
  if (Number.isNaN(value)) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
}

export function handleSymbol(symbol) {
  switch (symbol) {
    case "C":
      clearBuffer();
      break;
    case "=":
      if (previousOperator.value === null) return;
      flushOperation(Number.parseInt(buffer.value));
      previousOperator.value = null;
      buffer.value = runningTotal.value.toString();
      runningTotal.value = 0;
      break;
    case "←":
      backspace();
      break;
    case "+":
    case "−":
    case "×":
    case "÷":
      handleMath(symbol);
      break;
  }
}

export function clearBuffer() {
  buffer.value = "0";
  runningTotal.value = 0;
}

export function backspace() {
  buffer.value = buffer.value.length === 1 ? "0" : buffer.value.slice(0, -1);
}
