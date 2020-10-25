/**@jsx jsx */
import theme from "@chakra-ui/theme"
import { motion } from "framer-motion"
import {
  chakra,
  jsx,
  PropsOf,
  ThemeProvider,
  ThemingProps,
  useProps,
} from "../src"

export default {
  title: "styled",
}

const ChakraMotionDiv = chakra(motion.div)

/**
 * Made this to test that chakra can infer types correctly from framer-motion
 */
const WithChakraFactory = () => (
  <ChakraMotionDiv
    mt="30px"
    mb="30px"
    transition={{ easings: "backInOut", duration: 300 }}
    initial="testing"
  />
)

const MotionBox = motion.custom(chakra.div)

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
  </ThemeProvider>
)

const Comp = (props: PropsOf<typeof chakra.div> & ThemingProps) => {
  const res = useProps("Badge", props)
  return <chakra.div {...res.props} __css={res.styles} />
}

export const WithUseProps = () => {
  return (
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
}
