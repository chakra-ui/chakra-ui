import * as React from "react"
import { chakra } from "./styled"

export default {
  title: "styled",
}

const theme = {
  components: {
    Button: {
      sizes: {
        small: {},
        large: {},
        xlarge: {},
      },
      variants: {
        outline: {},
        solid: {},
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

const { styled } = chakra(theme)

const Button = styled("button", { themeKey: "Button" })

export const SampleButton = () => (
  <div>
    <Button
      size="small"
      variant="outline"
      data-sdfdfd=""
      onClick={() => {
        console.log("clicked")
      }}
    >
      Welcome
    </Button>

    <styled.h1 style={{ fontSize: 40, color: "red" }}>Welcome</styled.h1>
    <styled.button
      ref={node => {
        console.log(node)
      }}
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
