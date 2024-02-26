import { SystemProps } from "@chakra-ui/styled-system"

export interface ButtonGroupOptions {
  /**
   * If `true`, the borderRadius of button that are direct children will be altered
   * to look flushed together
   *
   * @default false
   */
  isAttached?: boolean
  /**
   * If `true`, all wrapped button will be disabled
   *
   * @default false
   */
  isDisabled?: boolean
  /**
   * The spacing between the buttons
   * @default '0.5rem'
   * @type SystemProps["marginRight"]
   */
  spacing?: SystemProps["marginRight"]
}

export interface ButtonOptions {
  /**
   * If `true`, the button will be styled in its active state.
   * @default false
   */
  isActive?: boolean
  /**
   * If `true`, the button will be disabled.
   * @default false
   */
  isDisabled?: boolean
}

export interface ButtonSpinnerOptions {
  label?: React.ReactNode
  /**
   * @type SystemProps["margin"]
   */
  spacing?: SystemProps["margin"]
  placement?: "start" | "end"
}
