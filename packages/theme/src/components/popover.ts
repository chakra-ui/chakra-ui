import { mode } from "@chakra-ui/theme-tools"

const parts = {
  content: "the popover's content wrapper",
  header: "the popover heading",
  body: "the popover main content",
  footer: "the action footers for popover",
}

function baseStyleContent(props: Record<string, any>) {
  return {
    bg: mode("white", "gray.700")(props),
    border: "1px solid",
    borderColor: "inherit",
    borderRadius: "md",
    boxShadow: "sm",
    w: "100%",
    maxW: "xs",
    zIndex: "1",
    _focus: {
      outline: 0,
      boxShadow: "outline",
    },
  }
}

const baseStyleHeader = {
  px: 3,
  py: 2,
  borderBottomWidth: "1px",
}

const baseStyleBody = {
  px: 3,
  py: 2,
}

const baseStyleFooter = {
  px: 3,
  py: 2,
  borderTopWidth: "1px",
}

const baseStyle = function (props: Record<string, any>) {
  return {
    content: baseStyleContent(props),
    header: baseStyleHeader,
    body: baseStyleBody,
    footer: baseStyleFooter,
  }
}

const popover = {
  parts,
  baseStyle,
}

export default popover
