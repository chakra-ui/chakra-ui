import * as React from "react"
import { BrowserRouter, Link } from "react-router-dom"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "../src"
import { ChevronRightIcon } from "@chakra-ui/icons"
import { extendTheme, useTheme, ThemeProvider } from "@chakra-ui/react"

export default {
  title: "Breadcrumb",
}

export const Default = () => (
  <BrowserRouter>
    <Breadcrumb spacing="4">
      <BreadcrumbItem>
        <BreadcrumbLink as={Link} to="/home" replace>
          Breadcrumb 1
        </BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem>
        <BreadcrumbLink href="#">Breadcrumb 2</BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink href="#">Breadcrumb 3</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  </BrowserRouter>
)

export const Separator = () => (
  <Breadcrumb separator=">">
    <BreadcrumbItem>
      <BreadcrumbLink href="#">Home</BreadcrumbLink>
    </BreadcrumbItem>

    <BreadcrumbItem>
      <BreadcrumbLink href="#">About</BreadcrumbLink>
    </BreadcrumbItem>

    <BreadcrumbItem isCurrentPage>
      <BreadcrumbLink href="#">Current</BreadcrumbLink>
    </BreadcrumbItem>
  </Breadcrumb>
)

export const SeparatorV2 = () => (
  <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.300" />}>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>

    <BreadcrumbItem>
      <BreadcrumbLink href="/about">About</BreadcrumbLink>
    </BreadcrumbItem>

    <BreadcrumbItem isCurrentPage>
      <BreadcrumbLink href="/contact">Contact</BreadcrumbLink>
    </BreadcrumbItem>
  </Breadcrumb>
)

export const WithThemeOverrides = () => {
  const currentTheme = useTheme()
  const theme = extendTheme(
    {
      components: {
        Breadcrumb: {
          baseStyle: {
            container: {
              borderWidth: 4,
              padding: 2,
            },
            item: {
              borderWidth: 2,
              borderRadius: "full",
              textTransform: "uppercase",
            },
            link: {
              color: "red.500",
              "&[aria-current=page]": {
                color: "blue.500",
              },
            },
            separator: {
              borderWidth: 4,
              borderColor: "red.300",
            },
          },
        },
      },
    },
    currentTheme,
  )

  return (
    <ThemeProvider theme={theme}>
      <Breadcrumb
        spacing="8px"
        separator={<ChevronRightIcon color="gray.300" />}
      >
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink href="/about">About</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="/contact">Contact</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </ThemeProvider>
  )
}
