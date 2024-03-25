import { mergeWith } from "@chakra-ui/utils"
import {
  GlobalStyleIdentityFn,
  KeyframeIdentityFn,
  SystemStyleIdentityFn,
} from "./css.types"
import { RecipeIdentityFn, SlotRecipeIdentityFn } from "./recipe.types"
import { SemanticTokenDefinition, SystemConfig, TokenDefinition } from "./types"

/* -----------------------------------------------------------------------------
 * Core creators
 * -----------------------------------------------------------------------------*/

export const defineRecipe: RecipeIdentityFn = (v) => v

export const defineSlotRecipe: SlotRecipeIdentityFn = (v) => v

export const defineKeyframes: KeyframeIdentityFn = (v) => v

export const defineGlobalStyles: GlobalStyleIdentityFn = (v) => v

export const defineStyle: SystemStyleIdentityFn = (v) => v

/* -----------------------------------------------------------------------------
 * Token creators
 * -----------------------------------------------------------------------------*/

type ProxyValue<T> = {
  <Value>(definition: Value extends T ? Value : T): Value
} & {
  [K in keyof Required<T>]: <Value>(
    definition: Value extends T[K] ? Value : T[K],
  ) => Value
}

function createProxy<T>(): ProxyValue<T> {
  const identity = (v: unknown) => v
  return new Proxy(identity as any, {
    get() {
      return identity
    },
  })
}

export const defineTokens = /* @__PURE__ */ createProxy<TokenDefinition>()
export const defineSemanticTokens =
  /* @__PURE__ */ createProxy<SemanticTokenDefinition>()

/* -----------------------------------------------------------------------------
 * System creators
 * -----------------------------------------------------------------------------*/

export const defineConfig = (v: SystemConfig) => v

export const mergeConfigs = (
  config: SystemConfig,
  ...configs: SystemConfig[]
): SystemConfig => {
  return mergeWith({}, config, ...configs)
}
