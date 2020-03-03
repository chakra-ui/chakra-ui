import { SystemProps } from "@chakra-ui/parser"

type StyleFnProps = {
  colorMode: "light" | "dark"
  theme: object
  colorScheme: string
}

export type ObjectOrFunction = object | ((props: StyleFnProps) => object)

type ValueType<T> = T extends (...args: any) => any ? ReturnType<T> : T

export interface Component {
  /**
   * The display name of the component, Pascal cased
   */
  name?: string
  /**
   * The initial styles to be applied to the component
   */
  baseStyles?: object
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

export interface BaseTheme {
  components: { [name: string]: Component }
}

export interface StyledOptions<T extends BaseTheme> {
  /**
   * The key of this component in `theme.components`.
   * Ideally, this should be the name of the component
   */
  themeKey?: keyof T["components"]
  /**
   * Additional props to attach to the component
   * You can use a function to make it dynamic
   */
  attrs?: React.AllHTMLAttributes<any>
  /**
   * Base style object to apply to this component
   * NB: This style is theme-aware so you can use all style props
   */
  baseStyle?: SystemProps<T>
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

/**
 * Extract the props of any element or component
 */
export type PropsOf<
  E extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>
> = JSX.LibraryManagedAttributes<E, React.ComponentPropsWithRef<E>>

export type As<P = any> = React.ElementType<P>

type JSXElements = keyof JSX.IntrinsicElements

/**
 * The styled function or object
 */
export type Styled<T> = T &
  {
    [Tag in JSXElements]: React.ForwardRefExoticComponent<PropsOf<Tag>>
  }

/**
 * Extract component's theming props
 */
export type ThemingProps<T extends BaseTheme, O> = O extends {
  themeKey: string
}
  ? T["components"][O["themeKey"]] extends undefined
    ? undefined
    : T["components"][O["themeKey"]] extends {
        variants: infer V
      }
    ? T["components"][O["themeKey"]] extends { sizes: infer S }
      ? { variant?: keyof V; size?: keyof S }
      : { variant?: keyof V }
    : T["components"][O["themeKey"]] extends { sizes: infer S }
    ? { size?: keyof S }
    : undefined
  : undefined

/**
 * Merge theming props with component props (if theming props exists)
 */
export type AllProps<
  C extends As,
  T extends BaseTheme,
  O
> = object extends ThemingProps<T, O>
  ? PropsOf<C> & { children?: React.ReactNode } & ThemingProps<T, O>
  : PropsOf<C> & { children?: React.ReactNode }

export interface ChakraComponent<C extends As, T extends BaseTheme, O> {
  (props: AllProps<C, T, O> & SystemProps<{}>): JSX.Element
  displayName?: string
  defaultProps?: Partial<PropsOf<C> & SystemProps<{}>>
  propTypes?: {
    [prop: string]: React.Validator<any>
  }
}
