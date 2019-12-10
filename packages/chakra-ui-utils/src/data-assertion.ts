export const isArray = (value: any) => Array.isArray(value);

export const isEmptyArray = (value: any) =>
  isArray(value) && value.length === 0;

export const isFunction = (obj: any): obj is Function =>
  typeof obj === "function";

export const isDefined = (value: any) =>
  typeof value !== "undefined" && value != undefined;

export const isObject = (obj: any): obj is Record<string, any> =>
  obj !== null && typeof obj === "object";

export const isEmptyObject = (value: any) =>
  isObject(value) && Object.keys(value).length === 0;

export const isInteger = (obj: any): boolean =>
  String(Math.floor(Number(obj))) === obj;

export const isString = (obj: any): obj is string =>
  Object.prototype.toString.call(obj) === "[object String]";

export const isNaN = (obj: any): boolean => obj !== obj;

export const isInputEvent = (value: any): value is React.SyntheticEvent<any> =>
  value && isObject(value) && isObject(value.target);
