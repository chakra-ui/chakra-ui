import * as React from "react"
import { render, screen, testA11y } from "@chakra-ui/test-utils"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "../src"

test("matches snapshot", () => {
  const { asFragment } = render(
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Link 1</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Link 2</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink>Link 3</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>,
  )
  expect(asFragment()).toMatchSnapshot()
})

it("passes a11y test", async () => {
  await testA11y(
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Link 1</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Link 2</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink>Link 3</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>,
  )
})

test("has the proper aria-attributes", () => {
  render(
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Link 1</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Link 2</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink>Link 3</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>,
  )

  // surrounding `nav` has aria-label="breadcrumb"
  screen.getByLabelText("breadcrumb", { selector: "nav" })

  // `isCurrentPage` link has aria-current="page"
  const currentPageLink = screen.getByText("Link 3")
  expect(currentPageLink).toHaveAttribute("aria-current", "page")

  // separator receives presentation="role"
  expect(screen.getAllByRole("presentation")).toHaveLength(2)
})

test("separator can be changed", () => {
  render(
    <Breadcrumb separator="-">
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Link 1</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Link 2</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>,
  )
  expect(screen.getAllByText("-")).toHaveLength(1)
})
