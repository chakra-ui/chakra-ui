import { SystemProps } from "@chakra-ui/system"

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
   * If `true`, the button will show a spinner.
   * @default false
   */
  isLoading?: boolean
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
  /**
   * The label to show in the button when `isLoading` is true
   * If no text is passed, it only shows the spinner
   */
  loadingText?: string
  /**
   * The html button type to use.
   */
  type?: "button" | "reset" | "submit"
  /**
   * If added, the button will show an icon before the button's label.
   * @type React.ReactElement
   */
  leftIcon?: React.ReactElement
  /**
   * If added, the button will show an icon after the button's label.
   * @type React.ReactElement
   */
  rightIcon?: React.ReactElement
  /**
   * The space between the button icon and label.
   * @type SystemProps["marginRight"]
   */
  iconSpacing?: SystemProps["marginRight"]
  /**
   * Replace the spinner component when `isLoading` is set to `true`
   * @type React.ReactElement
   */
  spinner?: React.ReactElement
  /**
   * It determines the placement of the spinner when isLoading is true
   * @default "start"
   */
  spinnerPlacement?: "start" | "end"
}

export interface ButtonSpinnerOptions {
  label?: string
  /**
   * @type SystemProps["margin"]
   */
  spacing?: SystemProps["margin"]
  placement?: "start" | "end"
}
