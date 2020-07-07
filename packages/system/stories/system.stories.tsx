/**@jsx jsx */
import { chakra, jsx } from "../src"

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
