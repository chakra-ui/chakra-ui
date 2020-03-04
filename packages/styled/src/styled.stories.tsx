import * as React from "react"
import { chakra } from "./styled"

export default {
  title: "styled",
}

const theme = {
  components: {
    Button: {
      defaultProps: {
        variant: "solid",
        size: "small",
      },
      sizes: {
        small: {
          fontSize: 12,
          padding: "8px",
        },
        large: {},
        xlarge: {},
      },
      variants: {
        outline: {
          border: "2px solid",
          borderColor: "red.400",
        },
        solid: {
          bg: "tomato",
          color: "white",
          _hover: {
            bg: "green",
          },
        },
      },
    },
    Checkbox: {
      sizes: {
        sm: {},
        lg: {},
      },
      variants: {
        error: {},
        success: {},
      },
    },
  },
}

const { styled, ThemeProvider } = chakra(theme)

const Button = styled("button", { themeKey: "Button" })

export const SampleButton = () => (
  <ThemeProvider>
    <div>
      <Button
        size="small"
        variant="solid"
        data-sdfdfd=""
        onClick={() => {
          console.log("clicked")
        }}
        _active={{ bg: "yellow", color: "black" }}
      >
        Theme Button
      </Button>

      <styled.h1 isTruncated marginX="20px" fontSize="40px" color="pink">
        Welcome truncate Welcome truncateWelcome truncateWelcome truncateWelcome
        truncateWelcome truncateWelcome truncateWelcome truncateWelcome truncate
      </styled.h1>
      <styled.button
        bg="pink"
        disabled
        color="white"
        padding="8px 12px"
        type="submit"
        _active={{ bg: "red", cursor: "pointer" }}
        onClick={() => {
          console.log("clicked")
        }}
      >
        Welcome home
      </styled.button>
      <styled.ul>
        <styled.li>This is the same</styled.li>
      </styled.ul>
    </div>
  </ThemeProvider>
)
