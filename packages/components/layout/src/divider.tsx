import {
  chakra,
  forwardRef,
  omitThemingProps,
  ThemingProps,
  useStyleConfig,
  HTMLChakraProps,
  SystemStyleObject,
} from "@chakra-ui/system"
import { cx } from "@chakra-ui/shared-utils"
import React from "react"

/**
 * Layout component used to visually separate content in a list or group.
 * It displays a thin horizontal or vertical line, and renders a `hr` tag.
 *
 * @see Docs https://chakra-ui.com/divider
 */
export const Divider = forwardRef<DividerProps, "hr">(function Divider(
  props,
  ref,
) {
  const {
    borderLeftWidth,
    borderBottomWidth,
    borderTopWidth,
    borderRightWidth,
    borderWidth,
    borderStyle,
    borderColor,
    ...styles
  } = useStyleConfig("Divider", props)
  const {
    className,
    orientation = "horizontal",
    __css,
    ...rest
  } = omitThemingProps(props)

  const lineStyles = {
    vertical: {
      borderLeftWidth:
        borderLeftWidth || borderRightWidth || borderWidth || "1px",
      height: "50%",
      left: -"50%",
    },
    horizontal: {
      borderBottomWidth:
        borderBottomWidth || borderTopWidth || borderWidth || "1px",
      width: "50%",
      top: "50%",
    },
  }

  const line: SystemStyleObject = {
    content: '""',
    position: "relative",
    display: "inline-block",
    borderColor,
    borderStyle,
    ...lineStyles[orientation],
  }

  let label: React.ReactElement | null = null
  if (
    React.isValidElement(rest.children) &&
    rest.children.type === DividerLabel
  ) {
    label = React.cloneElement<any>(rest.children, {
      orientation,
    })
  }

  const dividerStyles: SystemStyleObject = {
    display: "flex",
    flexDirection: orientation === "vertical" ? "column" : "row",
    alignItems: "center",
    color: borderColor,
    _before: line,
    _after: line,
    border: 0,
    [orientation === "vertical" ? "height" : "width"]: "100%",
  }

  return (
    <chakra.hr
      ref={ref}
      as={rest.children ? "div" : "hr"}
      role="separator"
      aria-orientation={orientation}
      {...rest}
      __css={{
        ...styles,
        ...dividerStyles,
        ...__css,
      }}
      className={cx("chakra-divider", className)}
    >
      {label}
    </chakra.hr>
  )
})

export interface DividerProps
  extends HTMLChakraProps<"div">,
    ThemingProps<"Divider"> {
  orientation?: "horizontal" | "vertical"
}

export interface DividerLabelProps extends HTMLChakraProps<"span"> {
  orientation?: "horizontal" | "vertical"
}

export const DividerLabel: React.FC<DividerLabelProps> = (props) => {
  const { children, orientation = "horizontal", className, ...rest } = props
  const labelStyles: SystemStyleObject = {
    display: "inline-block",
    flexShrink: 0,
    mx: 2,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    ...(orientation === "vertical"
      ? {
          writingMode: "vertical-rl",
          textOrientation: "mixed",
        }
      : {}),
  }

  return (
    <chakra.span
      {...rest}
      __css={labelStyles}
      className={cx("chakra-divider__label", className)}
    >
      {children}
    </chakra.span>
  )
}

Divider.displayName = "Divider"
