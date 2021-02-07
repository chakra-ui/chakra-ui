import {
  chakra,
  forwardRef,
  omitThemingProps,
  pickThemingProps,
  StylesProvider,
  ThemingPropsProvider,
  ThemingProps,
  useMultiStyleConfig,
  HTMLChakraProps,
} from "@chakra-ui/system"
import { cx, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import { BorderProps, SpaceProps } from "@chakra-ui/styled-system"

export interface InputGroupProps
  extends HTMLChakraProps<"div">,
    ThemingProps<"Input"> {
  leftAddonBorderLeftRadius?: BorderProps["borderLeftRadius"]
  righAddonBorderRightRadius?: BorderProps["borderLeftRadius"]
  leftElementWidth?: SpaceProps["paddingStart"]
  rightElementWidth?: SpaceProps["paddingEnd"]
}

export const InputGroup = forwardRef<InputGroupProps, "div">((props, ref) => {
  const styles = useMultiStyleConfig("Input", props)
  const {
    children,
    className,
    leftElementWidth,
    rightElementWidth,
    leftAddonBorderLeftRadius,
    righAddonBorderRightRadius,
    ...rest
  } = omitThemingProps(props)
  const themingProps = pickThemingProps(props)

  const _className = cx("chakra-input__group", className)

  return (
    <chakra.div
      className={_className}
      ref={ref}
      __css={{
        width: "100%",
        display: "flex",
        position: "relative",
        ".chakra-input__left-addon ~ .chakra-input": {
          borderLeftRadius: leftAddonBorderLeftRadius ?? 0,
        },
        ".chakra-input__right-addon ~ .chakra-input": {
          borderRightRadius: righAddonBorderRightRadius ?? 0,
        },
        ".chakra-input__left-element ~ .chakra-input": {
          paddingStart:
            leftElementWidth ?? styles.field?.h ?? styles.field?.height,
        },
        ".chakra-input__right-element ~ .chakra-input": {
          paddingEnd:
            rightElementWidth ?? styles.field?.h ?? styles.field?.height,
        },
      }}
      {...rest}
    >
      <ThemingPropsProvider value={themingProps}>
        <StylesProvider value={styles}>{children}</StylesProvider>
      </ThemingPropsProvider>
    </chakra.div>
  )
})

if (__DEV__) {
  InputGroup.displayName = "InputGroup"
}
