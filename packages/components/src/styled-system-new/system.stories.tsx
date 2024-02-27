import { Global } from "@emotion/react"
import styled from "@emotion/styled"
import { Meta } from "@storybook/react"
import { SystemStyleObject } from "./csstype"
import { systemBase as sys } from "./fixture"

export default {
  title: "System / v3",
  decorators: [
    (Story: any) => (
      <>
        <Story />
        <Global styles={[sys.getTokenCss(), sys.getGlobalCss()]} />
      </>
    ),
  ],
} satisfies Meta

const Box = (props: SystemStyleObject & React.ComponentProps<"div">) => {
  const [cssProps, otherProps] = sys.splitCssProps(props)
  const Comp = styled("div")(sys.css(cssProps) as any)
  return <Comp {...otherProps} />
}

export const Basic = () => {
  return (
    <Box
      bg={{ base: "primary", _hover: "green" }}
      color="pink"
      padding="40px"
      rounded="12px"
    >
      Welcome
      <Box
        w="40px"
        h="40px"
        bg="white/20"
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        animation="spin 2s infinite"
      >
        3
      </Box>
    </Box>
  )
}
