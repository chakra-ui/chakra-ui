import { mode } from "@chakra-ui/theme-tools"

const parts = ["popper", "content", "header", "body", "footer", "arrow"]

type Dict = Record<string, any>

const baseStylePopper = {
  w: "100%",
  maxW: "xs",
  zIndex: 10,
}

function baseStyleContent(props: Dict) {
  return {
    bg: mode("white", "gray.700")(props),
    border: "1px solid",
    borderColor: "inherit",
    borderRadius: "md",
    boxShadow: "sm",
    zIndex: "inherit",
    _focus: {
      outline: 0,
      boxShadow: "outline",
    },
  }
}

function baseStyleArrow(props: Dict) {
  return {
    bg: mode("white", "gray.700")(props),
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

const baseStyle = (props: Dict) => {
  return {
    popper: baseStylePopper,
    content: baseStyleContent(props),
    header: baseStyleHeader,
    body: baseStyleBody,
    footer: baseStyleFooter,
    arrow: baseStyleArrow(props),
  }
}

export default {
  parts,
  baseStyle,
}
