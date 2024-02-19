import type {
  ResponsiveValue,
  SystemProps,
  SystemStyleObject,
} from "@chakra-ui/styled-system"
import type { Interpolation } from "@emotion/react"
import { ElementType } from "react"

export interface ChakraProps extends SystemProps {
  /**
   * Used to truncate text at a specific number of lines
   */
  noOfLines?: ResponsiveValue<number>
  /**
   * Used for internal css management
   * @private
   */
  __css?: SystemStyleObject
  /**
   * Used to pass theme-aware style props.
   * NB: This is the public API for user-land
   */
  sx?: SystemStyleObject
  /**
   * The emotion's css style object
   */
  css?: Interpolation<{}>
}

export interface AsChildProps {
  asChild?: boolean
}

export interface AsProps<T extends ElementType = ElementType> {
  /**
   * @deprecated - This prop is deprecated and will be removed in a future release
   * Switch to the `asChild` prop instead
   */
  as?: T
}

/**
 * Extract the props of a React element or component
 */
export type PropsOf<T extends ElementType> = React.ComponentPropsWithoutRef<T> &
  AsProps

export type OmitCommonProps<
  Target,
  OmitAdditionalProps extends keyof any = never,
> = Omit<
  Target,
  "transition" | "as" | "color" | "translate" | OmitAdditionalProps
> & {
  htmlTranslate?: "yes" | "no" | undefined
}

export type RightJoinProps<
  SourceProps extends object = {},
  OverrideProps extends object = {},
> = OmitCommonProps<SourceProps, keyof OverrideProps> & OverrideProps

type Assign<T, U> = Omit<T, keyof U> & U

export type MergeWithAs<
  ComponentProps extends object,
  AsProps extends object,
  AdditionalProps extends object = {},
  AsComponent extends ElementType = ElementType,
> = (
  | RightJoinProps<ComponentProps, AdditionalProps>
  | RightJoinProps<AsProps, AdditionalProps>
) & {
  as?: AsComponent
}

export type ComponentWithAs<
  Component extends ElementType,
  Props extends object = {},
> = {
  <AsComponent extends ElementType = Component>(
    props: MergeWithAs<
      React.ComponentProps<Component> & AsChildProps,
      React.ComponentProps<AsComponent>,
      Props,
      AsComponent
    >,
  ): JSX.Element

  displayName?: string
  propTypes?: React.WeakValidationMap<any>
  contextTypes?: React.ValidationMap<any>
  defaultProps?: Partial<any>
  id?: string
}

export interface ChakraComponent<T extends ElementType, P extends object = {}>
  extends ComponentWithAs<T, Assign<ChakraProps, P>> {}
