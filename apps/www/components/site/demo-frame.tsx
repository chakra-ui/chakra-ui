"use client"

import { Center, CenterProps, chakra } from "@chakra-ui/react"

export const DemoFrame = chakra(
  "div",
  {
    base: {
      borderWidth: "0.5px",
      borderColor: { _light: "border", _dark: "#001B18" },
      width: "400px",
      flexShrink: "0",
      height: "100%",
      position: "relative",
      userSelect: "none",
      pb: "4",
      focusRing: "inside",
    },
  },
  {
    defaultProps: {
      tabIndex: 0,
      onFocusCapture(e: React.FocusEvent<HTMLDivElement>) {
        const activeEl = document.activeElement
        if (activeEl === e.currentTarget) {
          e.currentTarget?.scrollIntoView({
            inline: "nearest",
            block: "nearest",
          })
        }
      },
    },
  },
)

export const DemoFrameText = chakra("div", {
  base: {
    textStyle: "sm",
    color: "fg.muted",
    fontFamily: "mono",
    textAlign: "center",
  },
})

export const DemoFrameContent = (props: CenterProps) => {
  const { children, ...rest } = props
  return (
    <Center mx="auto" maxW="200px" minH="240px" {...rest}>
      {children}
    </Center>
  )
}
