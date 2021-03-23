import React from "react"
import theme from "@chakra-ui/theme"
import { Text } from "@chakra-ui/layout"
import { motion } from "framer-motion"
import {
  chakra,
  PropsOf,
  ThemeProvider,
  ThemingProps,
  useProps,
  useStyleConfig,
} from "../src"

export default {
  title: "System",
}

const MotionBox = motion(chakra.div)

export const WithFramerMotion = () => (
  <MotionBox
    mt="40px"
    w="40px"
    h="40px"
    bg="red.200"
    ml="60px"
    animate={{
      scale: [1, 2, 2, 1, 1],
      rotate: [0, 0, 270, 270, 0],
      borderRadius: ["20%", "20%", "50%", "50%", "20%"],
    }}
  />
)

export const ApplyProp = () => (
  <chakra.p>
    This is a paragraph, but apply styles from{" "}
    <chakra.code fontFamily="mono">styles.h1</chakra.code>
  </chakra.p>
)

export const withHeading = () => (
  <div>
    <chakra.h1
      fontSize={["50px", "80px", "100px"]}
      color="tomato"
      sx={{ color: "teal.500" }}
    >
      Welcome
    </chakra.h1>
  </div>
)

export const withTextStyles = () => (
  <ThemeProvider
    theme={{
      ...theme,
      textStyles: {
        h1: {
          fontSize: ["48px", "72px"],
          fontWeight: "bold",
          lineHeight: "110%",
          letterSpacing: "-0.01em",
        },
        h2: {
          fontSize: ["36px", "48px"],
          fontWeight: "light",
          lineHeight: "110%",
          letterSpacing: "-0.01em",
        },
      },
    }}
  >
    <chakra.h1 textStyle="h2" color="red.300">
      Welcome
    </chakra.h1>
    <Text textStyle="h1" color="green.200">
      Welcome text
    </Text>
  </ThemeProvider>
)

const Comp = (props: PropsOf<typeof chakra.div> & ThemingProps) => {
  const res = useProps("Badge", props)
  return <chakra.div {...res.props} __css={res.styles} />
}

export const WithUseProps = () => (
  <Comp
    bg="green.500"
    d="inline-block"
    color="white"
    textTransform="lowercase"
    onClick={() => {
      console.log("welcome home")
    }}
  >
    Welcome home
  </Comp>
)

export const WithGradient = () => (
  <>
    <chakra.div
      bgGradient="linear(to-r, pink.300, blue.500)"
      w="500px"
      h="64px"
    />
    <chakra.span
      bgGradient="linear(to-r, red.200, papayawhip)"
      bgClip="text"
      fontSize="7xl"
      fontWeight="extrabold"
    >
      Welcome to Chakra UI
    </chakra.span>
  </>
)

export const WithRgbGradient = () => (
  <>
    <chakra.div
      bgGradient="linear(to-r, rgb(0,0,0), rgb(230,230,230))"
      w="500px"
      h="64px"
    />
  </>
)

export const WithLayerStyle = () => (
  <ThemeProvider
    cssVarsRoot="#root"
    theme={{
      space: { 2: "4px" },
      layerStyles: {
        base: {
          bg: "pink",
          color: "red",
        },
      },
      textStyles: {
        caps: {
          textTransform: "uppercase",
          fontWeight: "bold",
        },
      },
    }}
  >
    <chakra.div layerStyle="base" textStyle="caps" color="white" px="2">
      Welcome
    </chakra.div>
  </ThemeProvider>
)

const Div: React.FC = ({ children }) => {
  const styles = useStyleConfig("Div")
  return <chakra.div sx={styles}>{children}</chakra.div>
}

export const WithLayerStyleInComponentTheme = () => (
  <ThemeProvider
    theme={{
      textStyles: {
        caps: {
          textTransform: "uppercase",
          fontWeight: "bold",
        },
      },
      components: {
        Div: {
          baseStyle: {
            textStyle: "caps",
            bg: "red",
          },
        },
      },
    }}
  >
    <Div>Welcome</Div>
  </ThemeProvider>
)

export const WithCSSVarToken = () => {
  return (
    <chakra.div
      sx={{
        "--banner-height": "sizes.md",
        ".banner": {
          height: "var(--banner-height)",
          bg: "red.200",
        },
      }}
    >
      <div className="banner">banner</div>
    </chakra.div>
  )
}
