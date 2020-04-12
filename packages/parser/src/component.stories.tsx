/**@jsx jsx */
import { jsx } from "@emotion/core"
import { getComponentStyles } from "."

export default {
  title: "Component",
}

export const Test = () => {
  const result = getComponentStyles(
    {
      theme: {
        components: {
          button: {
            variants: {
              ghost: {
                bg: "transparent",
                color: "blue",
              },
            },
          },
        },
      },
      variant: "solid",
      size: "sm",
    },
    {
      themeKey: "button",
      variants: {
        solid: {
          bg: "red",
          color: "white",
        },
      },
      sizes: {
        sm: {
          padding: "20px",
        },
        md: {
          padding: "40px",
        },
      },
    },
  )

  console.log(result)

  return <div>Testing</div>
}
