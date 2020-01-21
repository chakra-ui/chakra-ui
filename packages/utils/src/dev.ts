import { isArray, isObject } from "./assertion";
import { Dict } from "./types";

const spacesAndTabs = /[ \t]{2,}/g;
const lineStartWithSpaces = /^[ \t]*/gm;

export function dedent(value: string) {
  return value
    .replace(spacesAndTabs, " ")
    .replace(lineStartWithSpaces, "")
    .trim();
}

export function resolveProp(prop: any, fn: (val: any) => any) {
  if (isArray(prop)) {
    return prop.map(val => fn(val));
  }

  if (isObject(prop)) {
    const result: Dict<string> = {};
    for (const key in prop) {
      result[key] = fn(prop[key]);
    }
    return result;
  }

  if (prop != null) {
    return fn(prop);
  }

  return null;
}

export { default as invariant } from "tiny-invariant";
