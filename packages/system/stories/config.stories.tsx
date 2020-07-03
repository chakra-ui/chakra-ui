import * as React from "react"
import useStyleConfig from "../src/use-style-config"
import styled from "../src/styled"

export default {
  title: "config",
}

const getSize = (value: string) => ({
  Content: { maxWidth: value },
})

const Modal = {
  defaultProps: {
    size: "md",
  },
  baseStyle: (props) => ({
    Overlay: {
      bg: "blackAlpha.600",
    },
    Content: {
      borderRadius: "md",
      bg: "red",
      color: "inherit",
      marginY: "3.75rem",
      maxHeight:
        props.scrollBehavior === "inside" ? "calc(100vh - 7.5rem)" : undefined,
      boxShadow: "lg",
    },
    Header: {
      paddingX: 6,
      paddingY: 4,
      fontSize: "xl",
      fontWeight: "semibold",
    },
    Body: {
      paddingX: 6,
      paddingY: 2,
    },
    Footer: {
      paddingX: 6,
      paddingY: 4,
    },
  }),
  sizes: {
    xs: getSize("xs"),
    sm: getSize("sm"),
    md: getSize("md"),
    lg: getSize("lg"),
    xl: getSize("xl"),
    "2xl": getSize("2xl"),
    "3xl": getSize("3xl"),
    "4xl": getSize("4xl"),
    "5xl": getSize("5xl"),
    "6xl": getSize("6xl"),
    full: getSize("full"),
  },
}

const Button = styled("button", { label: "Button" })

export const Example = () => {
  const result = useStyleConfig("Button", {
    scrollBehavior: "inside",
    styleConfig: Modal,
  })
  console.log(result)
  return (
    <Button mt="40px" color="red.400" isTruncated _hover={{ color: "red.500" }}>
      Welcome
    </Button>
  )
}
