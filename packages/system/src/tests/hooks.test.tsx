import { render } from "@chakra-ui/test-utils"
import * as React from "react"
import { useComponentStyle, useThemeDefaultProps, useChakra } from ".."

test("should get component style", () => {
  const Style = () => {
    const test = useComponentStyle({
      size: "sm",
      variant: "bold",
      themeKey: "Button",
    })
    return <React.Fragment>{JSON.stringify(test, null, 2)}</React.Fragment>
  }
  const tools = render(<Style />)

  expect(tools.asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      {
      "lineHeight": "1.2",
      "borderRadius": "0.25rem",
      "fontWeight": 600,
      "&:focus, &[data-focus], &[data-state=focused]": {
        "boxShadow": "0 0 0 3px rgba(66, 153, 225, 0.6)"
      },
      "&[disabled], &[disabled]:focus, &[disabled]:hover, &[aria-disabled=true], &[aria-disabled=true]:focus, &[aria-disabled=true]:hover, &[data-disabled], &[data-disabled]:focus, &[data-disabled]:hover, &[data-state=disabled], &[data-state=disabled]:focus, &[data-state=disabled]:hover": {
        "opacity": 0.4,
        "cursor": "not-allowed",
        "boxShadow": "none"
      },
      "height": "2rem",
      "minWidth": "2rem",
      "fontSize": "0.875rem",
      "paddingLeft": "0.75rem",
      "paddingRight": "0.75rem"
    }
    </DocumentFragment>
  `)
})

test("should get component default props in theme", () => {
  const Component = () => {
    const defaults = useThemeDefaultProps("Button")
    return <React.Fragment>{JSON.stringify(defaults)}</React.Fragment>
  }
  const tools = render(<Component />)
  expect(tools.asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      {"variant":"solid","size":"md","colorScheme":"gray"}
    </DocumentFragment>
  `)
})

test("should get color mode and theme", () => {
  const Component = () => {
    const chakra = useChakra()
    return (
      <React.Fragment>
        {JSON.stringify(Object.keys(chakra), null, 2)}
      </React.Fragment>
    )
  }
  const tools = render(<Component />)
  expect(tools.asFragment()).toMatchSnapshot()
})
