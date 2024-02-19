import { render, screen, testA11y } from "@chakra-ui/test-utils"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "."

test("passes a11y test", async () => {
  await testA11y(
    <Breadcrumb.Root>
      <Breadcrumb.List>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Link 1</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Link 2</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>Link 3</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb.List>
    </Breadcrumb.Root>,
  )
})

test("has the proper aria-attributes", () => {
  render(
    <Breadcrumb.Root>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Link 1</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Link 2</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink>Link 3</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb.Root>,
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
    <Breadcrumb.Root>
      <Breadcrumb.List separator="-">
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Link 1</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Link 2</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb.List>
    </Breadcrumb.Root>,
  )
  expect(screen.getAllByText("-")).toHaveLength(1)
})

test("breadcrumb link has its href attribute correctly set", () => {
  render(
    <Breadcrumb.Root>
      <Breadcrumb.List>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Link 1</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#">Link 2</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb.List>
    </Breadcrumb.Root>,
  )
  const breadcrumbLink = screen.getByText("Link 1")
  expect(breadcrumbLink.getAttribute("href")).toBe("#")
})

test("current page link doesn't have href attribute set", () => {
  render(
    <Breadcrumb.Root>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Link 1</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink href="#">Link 2</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb.Root>,
  )
  const currentPageLink = screen.getByText("Link 2")
  expect(currentPageLink.getAttribute("href")).toBe(null)
})
