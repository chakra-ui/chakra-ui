export * from "./utils";

export type Merge<T, V> = Omit<T, Extract<keyof T, keyof V>> & V;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type Void = () => void;

export type Dictionary<T = any> = {
  [key: string]: T;
};
