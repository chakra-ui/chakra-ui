// Number assertions
export const isNumber = (num: any) => typeof num === "number";

export const isNotNumber = (val: any) =>
  typeof val !== "number" || isNaN(val) || !isFinite(val);

export const isInteger = (obj: any): boolean =>
  String(Math.floor(Number(obj))) === obj;

// Array assertions
export const isArray = (value: any) => Array.isArray(value);

export const isEmptyArray = (value: any) =>
  isArray(value) && value.length === 0;

// Function assertions
export const isFunction = (value: any) => typeof value === "function";

// Generic assertions
export const isDefined = (value: any) =>
  typeof value !== "undefined" && value !== undefined;

export const isUndefined = (value: any) =>
  typeof value === "undefined" || value === undefined;

// Object assertions
export const isObject = (value: any) =>
  value !== null && typeof value === "object";

export const isEmptyObject = (value: any) =>
  isObject(value) && Object.keys(value).length === 0;

// String assertions
export const isString = (value: any) =>
  Object.prototype.toString.call(value) === "[object String]";

// Event assertions
export const isInputEvent = (value: any) =>
  value && isObject(value) && isObject(value.target);

// Empty assertions
export const isEmpty = (value: any) => {
  if (isArray(value)) return isEmptyArray(value);
  if (isObject(value)) return isEmptyObject(value);
  if (value == null || value === "") return true;
  return false;
};
