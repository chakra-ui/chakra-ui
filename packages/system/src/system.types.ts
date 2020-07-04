import { ColorMode } from "@chakra-ui/color-mode"
import { SystemProps } from "@chakra-ui/parser"
import { Dict } from "@chakra-ui/utils"
import * as React from "react"
import { SystemStyleObject } from "@chakra-ui/css"

export interface UseStyleConfigOptions<P = {}> {
  parts?: string[]
  baseStyle?: BaseStyle<P>
  variants?: ModifierStyle<P>
  sizes?: ModifierStyle<P>
}

interface ColorModeProps {
  colorMode?: ColorMode
}

type BaseStyle<P> =
  | SystemProps
  | ((props: P & ThemingProps & ColorModeProps) => SystemProps)

export interface ThemingProps {
  variant?: string
  size?: string
  colorScheme?: string
  orientation?: "vertical" | "horizontal"
}

interface ValidHTMLProps {
  htmlWidth?: string | number
  htmlHeight?: string | number
  htmlSize?: string | number
}

export interface ChakraProps extends SystemProps, ValidHTMLProps {
  children?: React.ReactNode
  /**
   * apply styles defined in `theme.layerStyles`
   */
  layerStyle?: string
  /**
   * apply styles defined in `theme.textStyles`
   */
  textStyle?: string
  /**
   * Reference styles from any component or key in the theme.
   *
   * @example
   * ```jsx
   * <Box apply="styles.h3">This is a div</Box>
   * ```
   *
   * This will apply styles defined in `theme.styles.h3`
   */
  apply?: string
  /**
   * if `true`, it'll render an ellipsis when the text exceeds the width of the viewport or maxWidth set.
   */
  isTruncated?: boolean
  /**
   * Used to truncate text at a specific number of lines
   */
  noOfLines?: number
  /**
   * Used for internal css management
   * @private
   */
  __css?: SystemStyleObject
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
 * an TS error, since `transition` is part of Chakra's props.
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
  props: WithChakra<Omit<PropsOf<T>, "size" | "as" | keyof P>> &
    P & { as?: As },
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

type Comp<T extends As, P> = RegularComponent<T, P> | ExtensibleComponent<T, P>

export type ChakraComponent<T extends As, P extends Dict = {}> = Comp<T, P> & {
  displayName?: string
  propTypes?: React.WeakValidationMap<Omit<PropsOf<T>, "size"> & P>
  defaultProps?: Partial<Omit<PropsOf<T>, "size"> & P & ChakraProps>
}

type Merge<T extends As, P> = P & Omit<PropsOf<T>, keyof P>

type Exotic<P> =
  | (<T>(props: { as?: T } & (T extends As ? Merge<T, P> : P)) => JSX.Element)
  | ((props: P & { as?: As }) => JSX.Element)

export type ForwardRefComponent<P> = Exotic<P> & {
  displayName?: string
  propTypes?: React.WeakValidationMap<P>
  defaultProps?: Partial<P>
}

/**
 * The component style can either be a style object or  a function that returns a
 * style object.
 */
type ModifierStyle<P> =
  | StyleProps
  | ((props: ModifierProps & Required<P>) => StyleProps)

type StyleProps =
  | SystemProps
  | {
      [component: string]: SystemProps
    }

interface ModifierProps {
  colorScheme: string
  orientation: "horizontal" | "vertical"
  colorMode: "light" | "dark"
  theme: Dict
}
