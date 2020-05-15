import { SystemProps } from "@chakra-ui/parser"
import { ValidHTMLProps } from "./should-forward-prop"
import { ColorMode } from "@chakra-ui/color-mode"

export interface Options<T extends As, P> {
  /**
   * The key of this component in `theme.components`.
   */
  themeKey?: string
  /**
   * Additional props to attach to the component
   * You can use a function to make it dynamic.
   *
   * NB: Adding `P` to this type leads to weird issues,
   * so we types `props` in `Attrs` to be any for now.
   */
  attrs?: Attrs<T>
  /**
   * Base style object to apply to this component
   * NB: This style is theme-aware so you can use all style props
   */
  baseStyle?: BaseStyle<P>
  /**
   * A boolean indicating if the component should avoid re-rendering
   * when props haven't changed. This uses `React.memo(...)`
   */
  pure?: boolean
  /**
   * Whether we should forward prop to the underlying component.
   *
   * Useful when using `createChakra` with custom components, or using
   * custom prop name to control component styles.
   */
  shouldForwardProp?(prop: string): boolean
  /**
   * The component's visual style variants
   */
  variants?: ModifierStyle<P>
  /**
   * The component's size variations
   */
  sizes?: ModifierStyle<P>
}

type ColorModeProps = { colorMode?: ColorMode }

type BaseStyle<P> =
  | SystemProps
  | ((props: P & ThemingProps & ColorModeProps) => SystemProps)

type Attrs<T extends As> = PropsOf<T> | ((props: any) => PropsOf<T>)

export type ThemingProps = {
  /**
   * The variant (or visual style) of the component.
   * Components can have multiple variants.
   */
  variant?: string
  /**
   * The size of the component.
   * Components can come in different sizes.
   */
  size?: string
  /**
   * The color scheme of the component.
   * Mostly used to style component `variants`
   */
  colorScheme?: string
  /**
   * The orientation of the component.
   * Mostly used to change component `baseStyle`
   * or `variants` style
   */
  orientation?: "vertical" | "horizontal"
}

export interface ApplyProp {
  /**
   * Reference styles from any component or key in the theme.
   *
   * @example
   *
   * ```jsx
   * <chakra.div apply="styles.h3">This is a div</chakra.div>
   * ```
   *
   * This will apply styles defined in `theme.styles.h3`
   */
  apply?: string
}

interface TruncateProps {
  /**
   * if `true`, it'll render an ellipsis when the text exceeds the width of the viewport or maxWidth set.
   */
  isTruncated?: boolean
  /**
   * Used to truncate text at a specific number of lines
   */
  noOfLines?: number
}

interface LayerStyles {
  /**
   * apply styles defined in `theme.layerStyles`
   */
  layerStyle?: string
  /**
   * apply styles defined in `theme.textStyles`
   */
  textStyle?: string
}

export interface ChakraProps
  extends SystemProps,
    TruncateProps,
    ValidHTMLProps,
    ThemingProps,
    ApplyProp,
    LayerStyles {
  children?: React.ReactNode
}

export type As = React.ElementType<any>

/**
 * Extract the props of a React element or component
 */
export type PropsOf<T extends As> = React.ComponentPropsWithRef<T>

export type WithAs<P, T extends As> = P &
  Omit<PropsOf<T>, "as" | keyof P> & {
    as?: T
  }

/**
 * Integrating with `framer-motion` makes transition prop throw
 * an error, since `transition` is part of Chakra's props.
 *
 * To support `framer-motion`, we'll omit transition prop from chakra props
 * if you do this `chakra(motion.div)`
 */
export type WithChakra<P> = P extends { transition?: any }
  ? P & Omit<ChakraProps, "transition">
  : P & ChakraProps

/**
 * This is most clunky part of the types :), bare with me.
 *
 * Here's the thing, to support the `as` polymorphic prop we need to express
 * any component as a regular component that takes chakra props, and
 * an extensible component that can expand it's types based on the `as` prop
 */

/**
 * Regular component means:
 *
 * - Read the props of the component using the `PropsOf` utility
 * - Add Chakra props to it using `withChakra`
 * - Add the `as` prop. in this case, it doesn't do anything special.
 * - Return a JSX Element
 */
type RegularComponent<T extends As, P> = (
  props: WithChakra<PropsOf<T>> & P & { as?: As },
) => JSX.Element

/**
 * Extensible component means:
 *
 * - Read the props of the component using the `PropsOf` utility
 * - Use a typescript generic `TT` to store the component passed in the `as` prop
 * - Use the `WithAs` to merge the base component prop with `as` component prop
 * - Add Chakra props to the resulting types.
 */
type ExtensibleComponent<T extends As, P> = <TT extends As = T>(
  props: WithChakra<WithAs<PropsOf<T>, TT>> & P,
) => JSX.Element

type Component<T extends As, P> =
  | RegularComponent<T, P>
  | ExtensibleComponent<T, P>

export type ChakraComponent<T extends As, P = {}> = Component<T, P> & {
  displayName?: string
  propTypes?: React.WeakValidationMap<PropsOf<T> & P>
  defaultProps?: Partial<PropsOf<T> & P & ChakraProps>
}

/**
 * Extracts the component theming (variant, size) props that
 * should be used.
 *
 * @template T the theme object
 * @template K the theme key of the component
 */
export type ExtractThemingProps<
  T extends { components: any },
  K
> = K extends string
  ? T["components"][K] extends undefined
    ? undefined
    : T["components"][K] extends {
        variants: infer V
      }
    ? T["components"][K] extends { sizes: infer S }
      ? { variant?: keyof V; size?: keyof S }
      : { variant?: keyof V }
    : T["components"][K] extends { sizes: infer S }
    ? { size?: keyof S }
    : undefined
  : undefined

/**
 * The component style can either be a style object or  a function that returns a
 * style object.
 */
type ModifierStyle<P> =
  | StyleProps
  | ((props: ModifierProps & Required<P>) => StyleProps)

type StyleProps = SystemProps | { [component: string]: SystemProps }

interface ModifierProps {
  colorScheme: string
  orientation: "horizontal" | "vertical"
  colorMode: "light" | "dark"
  theme: Record<string, any>
}
