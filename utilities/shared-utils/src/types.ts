export type FunctionArguments<T extends Function> = T extends (
  ...args: infer R
) => any
  ? R
  : never
