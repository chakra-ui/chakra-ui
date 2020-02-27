import { DOMElements } from "./styled.utils"

type StyleFnProps = {
  colorMode: "light" | "dark"
  theme: object
  colorScheme: string
}

export type ObjectOrFunction = object | ((props: StyleFnProps) => object)

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
  themeKey?: keyof T["components"]
  attrs?: React.AllHTMLAttributes<any>
}

/**
 * Extract the props of any element or component
 */
export type PropsOf<
  E extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>
> = JSX.LibraryManagedAttributes<E, React.ComponentPropsWithRef<E>>

export type As<P = any> = React.ElementType<P>

/**
 * The styled function or object
 */
export type Styled<T> = T &
  { [Tag in DOMElements]: React.ForwardRefExoticComponent<PropsOf<Tag>> }

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
