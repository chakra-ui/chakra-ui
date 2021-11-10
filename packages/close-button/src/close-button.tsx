import { Icon, IconProps } from "@chakra-ui/icon"
import {
  chakra,
  forwardRef,
  omitThemingProps,
  SystemStyleObject,
  ThemingProps,
  useStyleConfig,
  HTMLChakraProps,
} from "@chakra-ui/system"
import { __DEV__ } from "@chakra-ui/utils"
import * as React from "react"

const CloseIcon: React.FC<IconProps> = (props) => (
  <Icon focusable="false" aria-hidden {...props}>
    <path
      fill="currentColor"
      d="M.439,21.44a1.5,1.5,0,0,0,2.122,2.121L11.823,14.3a.25.25,0,0,1,.354,0l9.262,9.263a1.5,1.5,0,1,0,2.122-2.121L14.3,12.177a.25.25,0,0,1,0-.354l9.263-9.262A1.5,1.5,0,0,0,21.439.44L12.177,9.7a.25.25,0,0,1-.354,0L2.561.44A1.5,1.5,0,0,0,.439,2.561L9.7,11.823a.25.25,0,0,1,0,.354Z"
    />
  </Icon>
)

export interface CloseButtonProps
  extends HTMLChakraProps<"button">,
    ThemingProps<"CloseButton"> {
  /**
   * If `true`, the close button will be disabled.
   */
  isDisabled?: boolean
}

/**
 * A button with a close icon.
 *
 * It is used to handle the close functionality in feedback and overlay components
 * like Alerts, Toasts, Drawers and Modals.
 */
export const CloseButton = forwardRef<CloseButtonProps, "button">(
  (props, ref) => {
    const styles = useStyleConfig("CloseButton", props)
    const { children, isDisabled, __css, ...rest } = omitThemingProps(props)

    const baseStyle: SystemStyleObject = {
      outline: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    }

    return (
      <chakra.button
        type="button"
        aria-label="Close"
        ref={ref}
        disabled={isDisabled}
        __css={{
          ...baseStyle,
          ...styles,
          ...__css,
        }}
        {...rest}
      >
        {children || <CloseIcon width="1em" height="1em" />}
      </chakra.button>
    )
  },
)

if (__DEV__) {
  CloseButton.displayName = "CloseButton"
}
