import { Omit, Dict } from "./types";

export function omit<T extends Dict, K extends keyof T>(object: T, keys: K[]) {
  const result: Dict = {};

  for (const key in object) {
    if (keys.includes(key as any)) continue;
    result[key] = object[key];
  }

  return result as Omit<T, K>;
}

export function pick<T extends Dict, K extends keyof T>(object: T, keys: K[]) {
  // eslint-disable-next-line
  const result = {} as { [P in K]: T[P] };
  for (const key of keys) {
    if (key in object) {
      result[key] = object[key];
    }
  }
  return result;
}

export function split<T extends Dict, K extends keyof T>(object: T, keys: K[]) {
  const picked: Dict = {};
  const omitted: Dict = {};

  for (const key in object) {
    if (keys.includes(key as T[K])) {
      picked[key] = object[key];
    } else {
      omitted[key] = object[key];
    }
  }

  return [picked, omitted] as [{ [P in K]: T[P] }, Omit<T, K>];
}

export const addKey = (obj: object, key: string, value: any) => {
  (obj[key as keyof typeof obj] as any) = value;
};

export const getKey = (obj: object, key: string): any =>
  obj[key as keyof typeof obj];

export { default as deepEqual } from "dequal";
