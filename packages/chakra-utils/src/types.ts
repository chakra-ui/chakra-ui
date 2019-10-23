import * as React from "react";

/**
 * @template T Element type
 */
export type HTMLAttributesWithRef<T = any> = React.HTMLAttributes<T> &
  React.RefAttributes<T>;

/**
 * Merge 2 types. If same keys exists in both, keys in `T2` wins
 *
 * @template T1 First type
 * @template T2 Second type
 */
export type Merge<T1, T2> = Omit<T1, Extract<keyof T1, keyof T2>> & T2;

/**
 * Omit keys `K` that exists in type `T`
 *
 * @template T Object
 * @template K Union of T keys
 */
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/**
 * Render prop type
 * @template P Props
 */
export type RenderProp<P = {}> =
  | { render: (props: P) => JSX.Element }
  | { children: (props: P) => JSX.Element };

export type As<P = any> = React.ReactType<P>;

export type AnyFunction = (...args: any[]) => any;

export type Required<T> = {
  [P in keyof T]-?: T[P];
};
