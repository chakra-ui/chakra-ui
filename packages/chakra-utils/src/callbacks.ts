export function runCallback(callback: any, ...args: any[]) {
  if (callback && typeof callback === "function") {
    callback(...args);
  }
}
