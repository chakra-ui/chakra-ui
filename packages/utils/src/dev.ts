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

function parseResponsiveProp(
  value: any[] | Dict | string | number,
  resolver: (val: any) => any,
) {
  if (isArray(value)) {
    return value.map(resolver);
  }

  if (isObject(value)) {
    return Object.keys(value).reduce((result: Dict, key) => {
      result[key] = resolver(value[key]);
      return result;
    }, {});
  }

  if (value != null) {
    return resolver(value);
  }

  return null;
}

export { default as invariant } from "tiny-invariant";
