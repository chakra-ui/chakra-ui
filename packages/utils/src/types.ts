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

//@ts-ignore
export type SafeMerge<T, P> = P & Omit<T, keyof P>;

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
  | { render: (props: P) => React.ReactNode }
  | { children: (props: P) => React.ReactNode };

export type As<P = any> = React.ReactType<P>;

export type AnyFunction = (...args: any[]) => any;

/**
 * Required
 * @desc Make all types in `T` required
 * @example
 *  type Input = {name?: string; age: number};
 *  type Output = Required<Props>;
 *  // => Result: {name: string; age: number}
 */
export type Required<T> = {
  [P in keyof T]-?: T[P];
};

/**
 * Intersection
 * @desc From `T` pick properties that exist in `U`
 * @example
 *   type Props = { name: string; age: number; visible: boolean };
 *   type DefaultProps = { age: number };
 *   type DuplicateProps = Intersection<Props, DefaultProps>;
 *    // => Result: { age: number; }
 */
export type Intersection<T extends object, U extends object> = Pick<
  T,
  Extract<keyof T, keyof U> & Extract<keyof U, keyof T>
>;

export type SetDifference<A, B> = A extends B ? never : A;

/**
 * Diff
 * @desc From `T` remove properties that exist in `U`
 * @example
 *   type Props = { name: string; age: number; visible: boolean };
 *   type DefaultProps = { age: number };
 *
 *   `Expect: { name: string; visible: boolean; }`
 *   type DiffProps = Diff<Props, DefaultProps>;
 */
export type Diff<T extends object, U extends object> = Pick<
  T,
  SetDifference<keyof T, keyof U>
>;

/**
 * FunctionArguments
 * @desc From `T`, get the types of the function arguments
 * @template T - The function type
 *
 */
export type FunctionArguments<T extends Function> = T extends (
  ...args: infer R
) => any
  ? R
  : never;

export type GenericReactElement<P> = React.ReactElement<P> & {
  displayName: string;
  defaultProps: Partial<P>;
  [key: string]: any;
};
