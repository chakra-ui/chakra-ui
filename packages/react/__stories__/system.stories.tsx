import { Meta } from "@storybook/react"
import { motion } from "framer-motion"
import { chakra } from "../src/styled-system/factory"
import { fixtureConfig as sys } from "../src/styled-system/fixture"
import {
  SystemProvider,
  useRecipe,
  useSlotRecipe,
} from "../src/styled-system/provider"

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

export const WithAsChild = () => {
  return (
    <chakra.button bg="red" padding="20px" asChild>
      <a href="dfd">sdfsd</a>
    </chakra.button>
  )
}

export const WithFramerMotion = () => {
  return (
    <chakra.div mt="40px" w="40px" h="40px" bg="red" ml="60px" asChild>
      <motion.div
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 270, 270, 0],
          borderRadius: ["20%", "20%", "50%", "50%", "20%"],
        }}
      />
    </chakra.div>
  )
}

const Flex = chakra("div", {
  base: {
    display: "flex",
  },
  variants: {
    direction: {
      row: { flexDirection: "row" },
      column: { flexDirection: "column" },
    },
    align: {
      start: { alignItems: "flex-start" },
      center: { alignItems: "center" },
      end: { alignItems: "flex-end" },
    },
    justify: {
      start: { justifyContent: "flex-start" },
      center: { justifyContent: "center" },
      end: { justifyContent: "flex-end" },
    },
  },
})

export const WithRecipe = () => {
  const button = useRecipe("Button")
  return (
    <Flex align="center" gap="40px">
      <button>Welcome</button>
      <chakra.button className="reset" css={button({ size: "md" })}>
        Welcome
      </chakra.button>
    </Flex>
  )
}

export const WithSlotRecipe = () => {
  const alert = useSlotRecipe("Alert")
  const styles = alert({ variant: "solid" })
  return (
    <chakra.button className="reset" css={styles.root}>
      Welcome
    </chakra.button>
  )
}
