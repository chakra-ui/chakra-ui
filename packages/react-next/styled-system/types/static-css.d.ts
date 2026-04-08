/* eslint-disable */
interface ConditionOptions {
  /**
   * The conditions to generate for the rule.
   * @example ['hover', 'focus']
   */
  conditions?: string[]
  /**
   * Whether to generate responsive styles for the rule.
   */
  responsive?: boolean
}

export interface CssRule extends ConditionOptions {
  /**
   * The css properties to generate utilities for.
   * @example ['margin', 'padding']
   */
  properties: {
    [property: string]: Array<string | number>
  }
}

interface RecipeRuleVariants {
  [variant: string]: boolean | string[]
}

export type RecipeRuleObject = RecipeRuleVariants & ConditionOptions
export type RecipeRule = "*" | RecipeRuleObject

export type PatternRule = "*" | CssRule

export interface StaticCssOptions {
  /**
   * The css utility classes to generate.
   */
  css?: CssRule[]
  /**
   * The css recipes to generate.
   */
  recipes?:
    | "*"
    | {
        [recipe: string]: RecipeRule[]
      }
  /**
   * The css patterns to generate.
   */
  patterns?: {
    [pattern: string]: PatternRule[]
  }
  /**
   * The CSS themes to generate
   */
  themes?: string[]
}
