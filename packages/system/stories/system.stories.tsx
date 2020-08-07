/**@jsx jsx */
import { chakra, jsx, ThemeProvider } from "../src"
import theme from "@chakra-ui/theme"

export default {
  title: "styled",
}

/**
 * Just like theme-ui, you can use the `cx` prop to style
 * regular jsx elements.
 *
 * PS: This requires the jsx pragma at the top of your file
 */
export const SxProp = () => (
  <h1
    sx={{
      color: "red.100",
      transition: "all 0.3s",
      padding: "30px",
      _hover: {
        color: "red.300",
      },
      _active: {
        color: "red.400",
      },
    }}
  >
    This is a heading
  </h1>
)

/**
 * All chakra's component can use the `apply` prop.
 * It's used to pull styles from `theme.styles` and
 * apply it to any element
 */
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
