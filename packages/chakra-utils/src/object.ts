import { Omit } from "./types";

export function omit<T extends Record<string, any>, K extends keyof T>(
  object: T,
  keys: K[],
) {
  const result: Record<string, any> = {};

  for (const key in object) {
    if (keys.includes(key as any)) continue;
    result[key] = object[key];
  }

  return result as Omit<T, K>;
}

export function pick<T extends Record<string, any>, K extends keyof T>(
  object: T,
  keys: K[],
) {
  const result = {} as { [P in K]: T[P] };
  for (const key of keys) {
    if (key in object) {
      result[key] = object[key];
    }
  }
  return result;
}

export function split<T extends Record<string, any>, K extends keyof T>(
  object: T,
  keys: K[],
) {
  const picked: Record<string, any> = {};
  const omitted: Record<string, any> = {};

  for (const key in object) {
    if (keys.includes(key as T[K])) {
      picked[key] = object[key];
    } else {
      omitted[key] = object[key];
    }
  }

  return [picked, omitted] as [{ [P in K]: T[P] }, Omit<T, K>];
}
