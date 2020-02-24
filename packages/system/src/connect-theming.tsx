import * as React from "react"
import { getDisplayName } from "./createChakra/create-chakra.utils"

export interface ThemingProps {
  variantSize?: string
  variant?: string
  variantColor?: string
}

/**
 * Sync the common theme props between parent,
 * and child.
 *
 * @example
 * ```jsx
 * const ThemingContext = React.createContext<ThemingProps>({})
 *
 * const DivParent = syncParent(Div)(ThemingContext)
 * const DivChild = syncChild(Child)(ThemingContext)
 *
 * Now passing either variant, variantColor, or size, will affect both
 * DivParent and DivChild
 * ```
 */
export function syncParent<P>(Component: React.ComponentType<P>) {
  return function<C extends ThemingProps>(ctx: React.Context<C>) {
    type NewParentProps = ThemingProps & P & { children?: React.ReactNode }

    const NewParent = (props: NewParentProps) => {
      const { variantSize, variant, variantColor, ...htmlProps } = props
      const themingProps = { variantSize, variant, variantColor }

      return (
        //@ts-ignore
        <Component {...themingProps} {...htmlProps}>
          <ctx.Provider value={themingProps as any}>
            {props.children}
          </ctx.Provider>
        </Component>
      )
    }

    // @ts-ignore
    ctx.Provider.displayName = `${getDisplayName(Component)}Sync`

    return NewParent
  }
}

export function syncChild<P>(Component: React.ComponentType<P>) {
  return function<C extends ThemingProps>(ctx: React.Context<C>) {
    //@ts-ignore
    const NewChild = React.forwardRef((props: P, ref: P["ref"]) => {
      const themingProps = React.useContext(ctx)
      return <Component ref={ref} {...themingProps} {...props} />
    })

    return NewChild as React.FC<P>
  }
}
