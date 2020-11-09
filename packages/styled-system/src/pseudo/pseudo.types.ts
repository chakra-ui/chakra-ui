import { Pseudos } from "./pseudo.selector"

interface ContentProp {
  /**
   * The CSS `content` property.
   *
   * NB: Remember to wrap its value in backticks
   * for it to work correctly.
   *
   * @example
   * content: `"/"`
   */
  content?: string
}

export type PseudoProps<P> = {
  [K in keyof Pseudos]?: K extends "_before" | "_after"
    ? (P & ContentProp) | PseudoProps<P>
    : P | PseudoProps<P>
}
