/**@jsx jsx */
import { jsx } from "../system"
import chakra from "./chakra"

export default {
  title: "Chakra",
}

// Any html element + chakra = magic!
export const Basic = () => <chakra.h1 color="red.400">Chakra heading</chakra.h1>

// You can add simple interactive styles
export const Interactive1 = () => (
  <chakra.a
    color="gray.300"
    href="#"
    textDecoration="none"
    _hover={{ textDecoration: "underline" }}
    target="__blank"
    rel="noreferrer"
  >
    Chakra anchor
  </chakra.a>
)

// You can add interactive styles anyhow!
export const Interactive2 = () => (
  <chakra.div
    bg="red.500"
    size="200px"
    _hover={{ bg: "red.600", size: "250px" }}
    transition="all 0.3s"
  >
    Expanding Div
  </chakra.div>
)

// You can pull styles from `theme.styles` and apply it to any element
export const Apply = () => (
  <chakra.p apply="styles.h1">
    This is a paragraph, but apply styles from{" "}
    <chakra.code fontFamily="mono">styles.h1</chakra.code>
  </chakra.p>
)

// The `sx` prop requires that you use the jsx pragma at the top of the file
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

export const RtlStyling = () => (
  <article dir="rtl">
    <chakra.h1 textAlign="left" _rtl={{ textAlign: "right", color: "red.200" }}>
      This is a heading
    </chakra.h1>
  </article>
)

// You can create your own components from chakra as well.
const Box = chakra.div

const Flex = Box
Flex.defaultProps = {
  display: "flex",
}

export const MakingComponents = () => (
  <Flex>
    <Box
      color="red.300"
      flex="1"
      sx={{
        margin: 20,
        fontSize: "40px",
      }}
    >
      Div 1
    </Box>
    <Box>Div 2</Box>
  </Flex>
)
