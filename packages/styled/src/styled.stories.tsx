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
  <div>
    <ThemeProvider>
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
    </ThemeProvider>

    <styled.h1 isTruncated marginX="20px" fontSize="40px" color="pink">
      Welcome truncate Welcome truncateWelcome truncateWelcome truncateWelcome
      truncateWelcome truncateWelcome truncateWelcome truncateWelcome truncate
    </styled.h1>
    <styled.button
      type="submit"
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
)
