function isNotNumber(val: any) {
  return typeof val !== "number" || isNaN(val) || !isFinite(val);
}

export const minSafeInteger = Number.MIN_SAFE_INTEGER || -9007199254740991;
export const maxSafeInteger = Number.MAX_SAFE_INTEGER || 9007199254740991;

function toNumber(value: any) {
  let num = parseFloat(value);
  return isNotNumber(num) ? 0 : num;
}

export function roundToPrecision(value: number, precision: number) {
  let nextValue: string | number = toNumber(value);
  const quotient = Math.pow(10, precision == null ? 10 : precision);

  nextValue = Math.round(nextValue * quotient) / quotient;
  nextValue = precision ? nextValue.toFixed(precision) : nextValue;
  return String(nextValue);
}

export function calculatePrecision(value: number) {
  const groups = /[1-9]([0]+$)|\.([0-9]*)/.exec(String(value));
  if (!groups) return 0;
  if (groups[1]) return -groups[1].length;
  if (groups[2]) return groups[2].length;
  return 0;
}

export function valueToPercent(value: number, min: number, max: number) {
  return ((value - min) * 100) / (max - min);
}

export function percentToValue(percent: number, min: number, max: number) {
  return (max - min) * percent + min;
}

export function roundValueToStep(value: number, step: number) {
  const nextValue = Math.round(value / step) * step;
  const precision = calculatePrecision(step);
  return roundToPrecision(nextValue, precision);
}

interface StepValue {
  value: number;
  stepBy: number;
  noOfSteps: number;
  precision: number;
  constrain: boolean;
  min: number;
  max: number;
}

export function stepValue({
  value,
  stepBy,
  noOfSteps = 1,
  precision,
  constrain,
  min,
  max,
}: StepValue) {
  const step = stepBy * noOfSteps;
  let nextValue = toNumber(value + step);
  if (constrain) nextValue = constrainValue(nextValue, min, max);
  return roundToPrecision(nextValue, precision);
}

export function constrainValue(value: number, min: number, max: number) {
  if (value > max) return max;
  if (value < min) return min;
  return value;
}
