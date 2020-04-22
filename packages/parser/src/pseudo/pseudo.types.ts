import { Pseudos } from "./pseudo.selector"

interface ContentProp {
  /**
   * The CSS `content` property.
   *
   * NB: Remember to wrap it's value in backticks
   * for it to work correctly.
   *
   * @example
   * content: `"/"`
   */
  content?: string
}

export type PseudoProps<Style> = {
  [K in keyof Pseudos]?: (Style & ContentProp) | PseudoProps<Style>
}
