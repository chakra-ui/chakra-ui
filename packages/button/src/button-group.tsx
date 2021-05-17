import {
  chakra,
  forwardRef,
  SystemProps,
  SystemStyleObject,
  ThemingProps,
  HTMLChakraProps,
} from "@chakra-ui/system"
import { cx, __DEV__ } from "@chakra-ui/utils"
import { createContext } from "@chakra-ui/react-utils"
import * as React from "react"

export interface ButtonGroupProps
  extends HTMLChakraProps<"div">,
    ThemingProps<"Button"> {
  /**
   * If `true`, the borderRadius of button that are direct children will be altered
   * to look flushed together
   */
  isAttached?: boolean
  /**
   * If `true`, all wrapped button will be disabled
   */
  isDisabled?: boolean
  /**
   * The spacing between the buttons
   * @default '0.5rem'
   * @type SystemProps["marginRight"]
   */
  spacing?: SystemProps["marginRight"]
}

interface ButtonGroupContext extends ThemingProps<"ButtonGroup"> {
  isDisabled?: boolean
}

const [ButtonGroupProvider, useButtonGroup] = createContext<ButtonGroupContext>(
  {
    strict: false,
    name: "ButtonGroupContext",
  },
)

export { useButtonGroup }

export const ButtonGroup = forwardRef<ButtonGroupProps, "div">((props, ref) => {
  const {
    size,
    colorScheme,
    variant,
    className,
    spacing = "0.5rem",
    isAttached,
    isDisabled,
    ...rest
  } = props

  const _className = cx("chakra-button__group", className)

  const context = React.useMemo(
    () => ({ size, colorScheme, variant, isDisabled }),
    [size, colorScheme, variant, isDisabled],
  )

  let groupStyles: SystemStyleObject = {
    display: "inline-flex",
  }

  if (isAttached) {
    groupStyles = {
      ...groupStyles,
      "> *:first-of-type:not(:last-of-type)": { borderEndRadius: 0 },
      "> *:not(:first-of-type):not(:last-of-type)": { borderRadius: 0 },
      "> *:not(:first-of-type):last-of-type": { borderStartRadius: 0 },
    }
  } else {
    groupStyles = {
      ...groupStyles,
      "& > *:not(style) ~ *:not(style)": { marginStart: spacing },
    }
  }

  return (
    <ButtonGroupProvider value={context}>
      <chakra.div
        ref={ref}
        role="group"
        __css={groupStyles}
        className={_className}
        {...rest}
      />
    </ButtonGroupProvider>
  )
})

if (__DEV__) {
  ButtonGroup.displayName = "ButtonGroup"
}
