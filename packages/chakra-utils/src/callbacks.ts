export function runCallback(callback: any, ...args: any[]) {
  if (typeof callback === "function") {
    callback(...args);
  }
}

export function resolveCallback<T, U>(
  callback: T | ((event: U) => T),
  event?: U,
): T {
  if (typeof callback === "function") {
    //@ts-ignore
    return callback(event);
  }
  return callback;
}
