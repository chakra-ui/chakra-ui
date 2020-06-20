/**@jsx jsx */
import { motion } from "framer-motion"
import { chakra, jsx, useComponentStyle } from "../src"

export default {
  title: "styled",
}

const Heading = chakra("h1", { themeKey: "Heading" })

const Btn = chakra("button", {
  themeKey: "Button",
  baseStyle: { outline: 0 },
})

export const withHeading = () => (
  <div>
    <Heading fontSize={["50px", "50px", "100px"]}>Welcome</Heading>
    <Btn height="60px" minWidth="400px" fontSize="20px">
      Welcome
    </Btn>
  </div>
)

export const LineClamp = () => (
  <chakra.div noOfLines={2}>
    Used to truncate the text with an ellipsis after computing the text layout,
    including line wrapping, such that the total number of lines does not exceed
    this number.
  </chakra.div>
)

const ThemedButton = chakra("button", {
  variants: {
    solid: {
      bg: "green.500",
      color: "white",
      _active: {
        bg: "green.600",
      },
    },
    outline: {
      border: "2px solid",
      borderColor: "green.200",
      _active: {
        borderColor: "green.300",
      },
    },
  },
  sizes: {
    small: {
      padding: 2,
      fontSize: "sm",
    },
    big: {
      padding: 4,
      fontSize: "md",
    },
  },
})

ThemedButton.defaultProps = {
  variant: "solid",
  size: "small",
}

export const InlineVariants = () => <ThemedButton>Click me</ThemedButton>

/**
 * Chakra UI works on most jsx elements,
 * so you can simple do `chakra.<element>`
 * to give the component some super-powers!
 */
export const Basic = () => <chakra.h1 color="red.400">Chakra heading</chakra.h1>

/**
 * Chakra provides interactive style prop
 * to make it easy to style common states
 *
 * here we're styling the hover state of the link
 * using `_hover` prop
 */
export const InteractiveStyles = () => (
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

/**
 * TypeScript
 * ==
 *
 * Chakra makes it possible to create styled chakra components
 * from your existing component.
 *
 * You can also pass custom prop interface, use those props to style
 * your components and pass props to the component.
 *
 * Components created this way have access to theming. You can
 * pass modifier props (size, variant) to change the styling.
 */
interface Props {
  isDisabled?: boolean
}

const Button = chakra<"button", Props>("button", {
  themeKey: "Button",
  attrs: (props) => ({
    type: "button",
    disabled: props.isDisabled,
  }),
  baseStyle: (props) => ({
    opacity: props.isDisabled ? 0.4 : 1,
  }),
})

export const TypeScript = () => (
  <Button variant="solid" size="sm">
    Click me
  </Button>
)

/**
 * Chakra integrates pretty well with other libraries,
 * like react-router, framer-motion, etc.
 *
 * You can leverage the `as` prop to combine chakra's
 * styles with other libraries.
 */
export const FramerIntegration = () => (
  <chakra.div
    width="40px"
    height="40px"
    mx="auto"
    mt="60px"
    bg="tomato"
    as={motion.div}
    animate={{
      scale: [1, 2, 2, 1, 1],
      rotate: [0, 0, 270, 270, 0],
      borderRadius: ["20%", "20%", "50%", "50%", "20%"],
    }}
    whileHover={{
      scale: 1.4,
    }}
  />
)

/**
 * Let's make a button with Chakra jsx elements
 */
export const AtlasKitButton = () => {
  return (
    <chakra.button
      type="button"
      height="2.3em"
      lineHeight="2.3em"
      bg="rgb(0, 82, 204)"
      borderRadius="3px"
      px="12px"
      fontWeight="bold"
      _hover={{ bg: "rgb(0, 101, 255)" }}
      _active={{ bg: "rgb(7, 71, 166)" }}
      outline="0"
      _focus={{
        boxShadow: "0 0 0 2px rgba(38, 132, 255, 0.6)",
      }}
      transition="background 0.1s ease-out 0s, box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38) 0s;"
      css={{ marginTop: "50px" }}
    >
      Atlaskit
    </chakra.button>
  )
}

/**
 * You can get access to the styles of a
 * specific component for use in your app.
 */
export const UseComponentStyle = () => {
  const style = useComponentStyle({
    themeKey: "Button",
    variant: "solid",
    size: "lg",
  })

  return (
    <chakra.pre fontFamily="mono" fontSize="xs">
      {JSON.stringify(style, null, 4)}
    </chakra.pre>
  )
}

/**
 * Just like theme-ui, you can use the `cx` prop to style
 * regular jsx elements.
 *
 * PS: This requires the jsx pragma at the top of your file
 */
export const SxProp = () => (
  <h1
    __css={{
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
  <chakra.p apply="styles.h1">
    This is a paragraph, but apply styles from{" "}
    <chakra.code fontFamily="mono">styles.h1</chakra.code>
  </chakra.p>
)
