import type {
  ResponsiveValue,
  SystemProps,
  SystemStyleObject,
} from "@chakra-ui/styled-system"
import type { Interpolation } from "@emotion/react"
import type { ElementType } from "react"
import type { Assign, ComponentWithAs } from "@polymorphic-factory/react"

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

/**
 * @deprecated use React.ElementType instead
 */
export type As = ElementType

export interface ChakraComponent<
  T extends ElementType,
  P extends Record<never, never> = Record<never, never>,
> extends ComponentWithAs<T, Assign<ChakraProps, P>> {}

/**
 * @deprecated type is not used anymore in the chakra codebase
 */
export type OmitCommonProps<
  Target,
  OmitAdditionalProps extends keyof any = never,
> = Omit<
  Target,
  "transition" | "as" | "color" | "translate" | OmitAdditionalProps
> & {
  htmlTranslate?: "yes" | "no" | undefined
}

/**
 * @deprecated type is not used anymore in the chakra codebase
 */
export type RightJoinProps<
  SourceProps extends Record<never, never> = Record<never, never>,
  OverrideProps extends Record<never, never> = Record<never, never>,
> = OmitCommonProps<SourceProps, keyof OverrideProps> & OverrideProps

/**
 * @deprecated type is not used anymore in the chakra codebase
 */
export type MergeWithAs<
  ComponentProps extends Record<never, never>,
  AsProps extends Record<never, never>,
  AdditionalProps extends Record<never, never> = Record<never, never>,
  AsComponent extends As = As,
> = (
  | RightJoinProps<ComponentProps, AdditionalProps>
  | RightJoinProps<AsProps, AdditionalProps>
) & {
  as?: AsComponent
}
