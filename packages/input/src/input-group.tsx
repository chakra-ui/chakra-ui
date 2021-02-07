import { SystemStyleObject } from "@chakra-ui/system"
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

export interface InputGroupProps
  extends HTMLChakraProps<"div">,
    ThemingProps<"Input"> {
  leftElementStyles?: SystemStyleObject
  rightElementStyles?: SystemStyleObject
  leftAddonStyles?: SystemStyleObject
  rightAddonStyles?: SystemStyleObject
}

export const InputGroup = forwardRef<InputGroupProps, "div">((props, ref) => {
  const styles = useMultiStyleConfig("Input", props)
  const {
    children,
    className,
    leftElementStyles,
    rightElementStyles,
    leftAddonStyles,
    rightAddonStyles,
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
          borderLeftRadius: 0,
          ...leftAddonStyles,
        },
        ".chakra-input__right-addon ~ .chakra-input": {
          borderRightRadius: 0,
          ...rightAddonStyles,
        },
        ".chakra-input__left-element ~ .chakra-input": {
          paddingStart: styles.field?.h ?? styles.field?.height,
          ...leftElementStyles,
        },
        ".chakra-input__right-element ~ .chakra-input": {
          paddingEnd: styles.field?.h ?? styles.field?.height,
          ...rightElementStyles,
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
