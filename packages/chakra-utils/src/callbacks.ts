export function runCallback(callback: any, ...args: any[]) {
  if (typeof callback === "function") {
    callback(...args);
  }
}

export function resolveCallback<T, U>(callback: T, arg?: U) {
  if (typeof callback === "function") {
    return arg ? callback(arg) : callback();
  }
  return callback;
}
