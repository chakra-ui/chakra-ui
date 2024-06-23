import type { Meta } from "@storybook/react"
import { chakra, useRecipe, useSlotRecipe } from "../src/styled-system"

export default {
  title: "Foundations / System",
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

export const TextStyle = () => {
  return (
    <Box
      bg="pink.500"
      px="5"
      py="2"
      rounded="sm"
      textStyle="2xl"
      fontSize="6xl"
      color="white/50"
    >
      Welcome
    </Box>
  )
}

export const LayerStyle = () => {
  return (
    <Box>
      <Box
        layerStyle="indicator.start"
        css={{ "--indicator-offset": "4px" }}
        colorPalette="red"
      >
        <Box mx="5" p="1" _hover={{ layerStyle: "ghost.subtle" }}>
          Welcome
        </Box>
      </Box>
      <Box as="button" layerStyle="fill.surface" colorPalette="pink">
        Click me
      </Box>
      <Box
        as="button"
        layerStyle={{ base: "fill.subtle", _hover: "fill.solid" }}
        textStyle="sm"
        px="3"
        py="2"
        rounded="sm"
        fontWeight="medium"
        colorPalette="blue"
        focusRing="extended"
      >
        Welcome
      </Box>
    </Box>
  )
}

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
  const button = useRecipe("button")
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
  const alert = useSlotRecipe("alert")
  const styles = alert({ variant: "solid" })
  return (
    <chakra.button className="reset" css={styles["root"]}>
      Welcome
    </chakra.button>
  )
}
