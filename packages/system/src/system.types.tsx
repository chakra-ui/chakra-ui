import { SystemProps, SystemStyleObject } from "@chakra-ui/styled-system"
import { Dict } from "@chakra-ui/utils"
import * as React from "react"
import { ComponentWithAs } from "./forward-ref"

export interface ThemingProps {
  variant?: string
  size?: string
  colorScheme?: string
  orientation?: "vertical" | "horizontal"
  styleConfig?: Dict
}

interface ValidHTMLProps {
  htmlWidth?: string | number
  htmlHeight?: string | number
  htmlSize?: string | number
}

export interface ChakraProps extends SystemProps, ValidHTMLProps {
  /**
   * apply layer styles defined in `theme.layerStyles`
   */
  layerStyle?: string
  /**
   * apply typography styles defined in `theme.textStyles`
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
export type PropsOf<T extends As> = React.ComponentProps<T>

export type WithChakra<P> = P & ChakraProps

export interface ChakraComponent<T extends As, P>
  extends ComponentWithAs<T, WithChakra<P>> {}
