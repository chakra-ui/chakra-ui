import prettyNum, { PRECISION_SETTING } from "pretty-num";

/**
 * Checks if the pressed key is a number
 *
 * @param event The keyboard event
 * @returns {Boolean} True or false, obviously :)
 */
export function isNumberKey(event: KeyboardEvent) {
  const keyCode = event.which ? event.which : event.keyCode;

  const isDotKey = keyCode === 190;
  if (isDotKey) return true;

  const isNotKeyboardKey = keyCode > 31 && (keyCode < 48 || keyCode > 57);
  const isNotNumericKeypadKey =
    (keyCode < 96 || keyCode > 105) && keyCode !== 110;

  if (isNotKeyboardKey && isNotNumericKeypadKey) return false;

  return true;
}

export function preventNonNumberKey(event: KeyboardEvent) {
  if (!isNumberKey(event)) {
    event.preventDefault();
  }
}

/**
 * Rounds a number to a specific precision (Alternative to Math.round)
 *
 * @param value The value to convert
 * @param precision The precision to use
 
 * @returns {Number} The rounded value
 */
export function roundToPrecision(value: number, precision: number) {
  return prettyNum(value, {
    precision,
    precisionSetting: PRECISION_SETTING.FIXED,
  });
}

/**
 * Gets the precision of a specified value
 *
 * @param value the number to get precision
 * @returns {Number} the precision
 *
 * @example
 * calculatePrecision(10.34)  // => 2
 */
export function calculatePrecision(value: number) {
  const groups = /[1-9]([0]+$)|\.([0-9]*)/.exec(String(value));
  if (!groups) {
    return 0;
  }
  if (groups[1]) {
    return -groups[1].length;
  }
  if (groups[2]) {
    return groups[2].length;
  }
  return 0;
}

/**
 * Converts a value to it's equivalent percentage based on the min and max
 *
 * @param value The current value
 * @param min The minimum value
 * @param max The maximum value
 *
 * @returns {Number} The percentage value
 */
export function valueToPercent(value: number, min: number, max: number) {
  return ((value - min) * 100) / (max - min);
}

/**
 * Converts a percentage value to it's equivalent value based on the min and max
 *
 * @param percent The percentage value
 * @param min The minimum value
 * @param max The maximum value
 *
 * @returns {Number} The equivalent value
 */
export function percentToValue(percent: number, min: number, max: number) {
  return (max - min) * percent + min;
}

/**
 * Converts a value to a precise version (using the step for precision)
 *
 * @param value The value to make precise
 * @param step The step
 *
 * @returns {Number} The value rounded to the step's precision
 */
function makeValuePrecise(value: number, step: number) {
  const precision = calculatePrecision(step);
  return roundToPrecision(value, precision);
}

export function roundValueToStep(value: number, step: number) {
  return makeValuePrecise(Math.round(value / step) * step, step);
}

/**
 * Clamps the value and keeps it within the `min` and `max`
 *
 * @param value The current value
 * @param min The minimum value
 * @param max The maximum value
 *
 * @returns {Number} The clamped value
 */
export function constrainValue(value: number, min: number, max: number) {
  if (value > max) return max;
  if (value < min) return min;
  return value;
}
