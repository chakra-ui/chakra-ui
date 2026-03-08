import type { ConditionalValue } from "./css.types"
import type { AnyNumber, AnyString } from "./escape-hatch.types"
import type { Token } from "./register"

export type CssVars = `var(--${string})`
export type CssVarValue = ConditionalValue<
  Token | CssVars | AnyString | AnyNumber
>
export type CssVarKey = `--${string}`
export type CssVarProperties = {
  [key in CssVarKey]?: CssVarValue | undefined
}
