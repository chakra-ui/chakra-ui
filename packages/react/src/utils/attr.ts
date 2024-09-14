type Booleanish = boolean | "true" | "false"

export const dataAttr = (condition: boolean | undefined) =>
  (condition ? "" : undefined) as Booleanish
