import { SystemProps, TruncateProps } from "@chakra-ui/parser"
import { ValidHTMLProps } from "./should-forward-prop"
import { ColorMode } from "@chakra-ui/color-mode"

export interface ComponentTheme {
  /**
   * The display name of the component, Pascal cased
   */
  name?: string
  /**
   * The initial styles to be applied to the component
   */
  baseStyle?: object
  /**
   * The component's visual style variants
   */
  variants?: object
  /**
   * The component's size variations
   */
  sizes?: object
  /**
   * The default props to apply to the component
   */
  defaultProps?: {
    /**
     * The default variant to use (in variants)
     */
    variant?: string
    /**
     * The default size to use (in sizes)
     */
    size?: string
    /**
     * The default color scheme to use (if variants are defined as functions)
     */
    colorScheme?: string
  }
}

export interface Options<T extends As, P = {}> {
  /**
   * The key of this component in `theme.components`.
   */
  themeKey?: string
  /**
   * Additional props to attach to the component
   * You can use a function to make it dynamic
   */
  attrs?: ComponentAttrs<T>
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
  shouldForwardProp?(propName: string): boolean
}

type ColorModeProps = { colorMode?: ColorMode }

type BaseStyle<P> =
  | SystemProps
  | ((props: P & ThemingProps & ColorModeProps) => SystemProps)

type ComponentAttrs<T extends As> = PropsOf<T> | ((props: any) => PropsOf<T>)

export type ThemingProps = {
  variant?: string
  size?: string
  colorScheme?: string
  orientation?: "vertical" | "horizontal"
}

export type ChakraProps = SystemProps &
  TruncateProps &
  ValidHTMLProps &
  ThemingProps & {
    children?: React.ReactNode
  }

export type As = React.ElementType<any>

export type PropsOf<T extends As> = React.ComponentPropsWithRef<T>

export type PropsWithAs<P, T extends As> = P &
  Omit<PropsOf<T>, "as" | keyof P> & {
    as?: T
  }

type Factory<T extends As, P> =
  | ((props: PropsOf<T> & P & ChakraProps) => JSX.Element)
  | (<TT extends As = T>(
      props: PropsWithAs<PropsOf<T>, TT> & ChakraProps & P,
    ) => JSX.Element)

export type ChakraComponent<T extends As, P = {}> = Factory<T, P> & {
  displayName?: string
  propTypes?: React.WeakValidationMap<PropsOf<T> & P>
  defaultProps?: Partial<PropsOf<T> & P & ChakraProps>
}

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
