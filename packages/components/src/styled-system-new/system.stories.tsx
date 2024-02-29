import { Meta } from "@storybook/react"
import { chakra } from "./factory"
import { systemBase as sys } from "./fixture"
import { SystemProvider } from "./provider"

export default {
  title: "System / v3",
  decorators: [
    (Story: any) => (
      <SystemProvider value={sys}>
        <Story />
      </SystemProvider>
    ),
  ],
} satisfies Meta

const Box = chakra("div")

const Alert = chakra("div", {
  base: {
    lineHeight: "1",
    fontSize: "sm",
    rounded: 4,
    paddingX: 20,
    paddingY: 10,
    fontFamily: "Inter",
    color: "white",
  },
  variants: {
    status: {
      default: { bg: "gray" },
      error: { bg: "red" },
      success: { bg: "green" },
      warning: { bg: "orange" },
    },
    caps: {
      true: {
        textTransform: "uppercase",
      },
    },
  },
})

export const Basic = () => {
  return (
    <Box>
      <Alert status="success" caps>
        Welcome
      </Alert>
      <Box
        as="section"
        bg={{ base: "primary", _hover: "green" }}
        color="pink"
        padding="40px"
        rounded="12px"
        mt="40px"
      >
        Welcome
        <Box
          w="40px"
          h="40px"
          bg="white/20"
          color="colorPalette.300"
          borderWidth="4px"
          borderStyle="solid"
          borderColor="colorPalette.300/30"
          colorPalette="green"
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
          animation="spin 2s infinite"
        >
          3
        </Box>
      </Box>
    </Box>
  )
}
