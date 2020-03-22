/**@jsx jsx */
import { chakra, jsx, ThemeProvider, useComponentStyle } from "."
import { ColorModeProvider } from "@chakra-ui/color-mode"
import theme from "./theme.sample"
import { motion } from "framer-motion"

export default {
  title: "styled",
  decorators: [
    (Story: Function) => (
      <ThemeProvider theme={theme}>
        <ColorModeProvider>
          <Story />
        </ColorModeProvider>
      </ThemeProvider>
    ),
  ],
}

interface Props {
  isDisabled?: boolean
}

const Button = chakra<"button", Props>("button", {
  themeKey: "Button",
  attrs: props => ({
    type: "button" as any,
    disabled: props.isDisabled,
  }),
  baseStyle: props => ({
    opacity: props.isDisabled ? 0.4 : 1,
  }),
})

export const Sample = () => {
  return (
    <div>
      <chakra.h1
        as="a"
        href="www.google.com"
        color="green.200"
        margin="20px"
        fontWeight="bold"
        _hover={{ color: "red.200" }}
        marginLeft="30px"
      >
        Welcome home buddy
      </chakra.h1>
      <Button variant="solid" size="sm">
        Click me
      </Button>
      <h1 sx={{ marginTop: 40 }}>Welcome</h1>
    </div>
  )
}

export const WithFramer = () => (
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

export const UseComponentStyle = () => {
  const style = useComponentStyle({
    themeKey: "Button",
    variant: "solid",
  })

  return (
    <chakra.pre fontFamily="mono" fontSize="xs">
      {JSON.stringify(style, null, 4)}
    </chakra.pre>
  )
}
