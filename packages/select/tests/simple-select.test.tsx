import * as React from "react"
import { render, testA11y } from "@chakra-ui/test-utils"
import { FormControl } from "@chakra-ui/form-control"
import { ChakraProvider, extendTheme, theme } from "@chakra-ui/react"
import { SimpleSelect } from "../src"

test("should pass a11y check", async () => {
  const { container } = render(
    <SimpleSelect aria-label="Select Food" placeholder="Select an option">
      <option value="a">A</option>
      <option value="b">B</option>
      <option value="c">C</option>
    </SimpleSelect>,
  )
  await testA11y(container)
})

test("renders a placeholder option", () => {
  const { container } = render(<SimpleSelect placeholder="Select an option" />)
  const option = container.querySelector("option[value='']") as HTMLElement

  expect(option).toBeInTheDocument()
  expect(option.textContent).toEqual("Select an option")
})

test("renders an icon by default", () => {
  const { getByRole } = render(<SimpleSelect />)
  const icon = getByRole("presentation", { hidden: true })

  expect(icon).toHaveAttribute("aria-hidden", "true")
  expect(icon).toHaveClass("chakra-select__icon")
})

test("renders in disabled state if isDisabled is true", () => {
  const { container } = render(
    <SimpleSelect isDisabled placeholder="Select an option" />,
  )
  const select = container.querySelector("select") as HTMLElement
  const iconWrapper = container.querySelector(
    ".chakra-select__icon-wrapper",
  ) as HTMLElement
  expect(select).toBeDisabled()
  expect(iconWrapper).toHaveAttribute("data-disabled", "")
})

test("doesn't renders in disabled state if isDisabled is false", () => {
  const { container } = render(
    <SimpleSelect isDisabled={false} placeholder="Select an option" />,
  )
  const select = container.querySelector("select") as HTMLElement
  const iconWrapper = container.querySelector(
    ".chakra-select__icon-wrapper",
  ) as HTMLElement
  expect(select).not.toBeDisabled()
  expect(iconWrapper).not.toHaveAttribute("data-disabled")
})

test("renders in disabled state if wrapped by FormControl with isDisabled=true", () => {
  const { container } = render(
    <FormControl isDisabled>
      <SimpleSelect placeholder="Select an option" />,
    </FormControl>,
  )
  const select = container.querySelector("select") as HTMLElement
  const iconWrapper = container.querySelector(
    ".chakra-select__icon-wrapper",
  ) as HTMLElement
  expect(select).toBeDisabled()
  expect(iconWrapper).toHaveAttribute("data-disabled", "")
})

describe.each(Object.keys(theme.components.Select.sizes))(
  "icon spacing for '%s' size",
  (size) => {
    const defaultSpacing = "2rem"

    test("defaults icon spacing in theme", () => {
      const { container } = render(<SimpleSelect size={size} />)
      const select = container.querySelector("select") as HTMLElement

      expect(select).toHaveStyle({ "padding-inline-end": defaultSpacing })
    })

    test("defaults icon spacing in component", () => {
      const theme = extendTheme({
        components: {
          Select: {
            sizes: {
              lg: { field: { paddingInlineEnd: null, px: null } },
              md: { field: { paddingInlineEnd: null, px: null } },
              sm: { field: { paddingInlineEnd: null, px: null } },
              xs: { field: { paddingInlineEnd: null, px: null } },
            },
          },
        },
      })
      const { container } = render(
        <ChakraProvider theme={theme}>
          <SimpleSelect />
        </ChakraProvider>,
      )
      const select = container.querySelector("select") as HTMLElement

      expect(select).toHaveStyle({ "padding-inline-end": defaultSpacing })
    })

    test("allows icon spacing to be overridden in theme", () => {
      const sizes = {
        lg: { field: { paddingInlineEnd: "8px" } },
        md: { field: { paddingInlineEnd: "6px" } },
        sm: { field: { paddingInlineEnd: "4px" } },
        xs: { field: { paddingInlineEnd: "2px" } },
      }
      const theme = extendTheme({ components: { Select: { sizes } } })
      const { container } = render(
        <ChakraProvider theme={theme}>
          <SimpleSelect size={size} />
        </ChakraProvider>,
      )
      const select = container.querySelector("select") as HTMLElement

      expect(select).toHaveStyle({
        "padding-inline-end":
          sizes[size as keyof typeof sizes].field.paddingInlineEnd,
      })
    })
  },
)
