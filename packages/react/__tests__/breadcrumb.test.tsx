import { render, screen, testA11y } from "@chakra-ui/test-utils"
import { Breadcrumb } from "../src/components/breadcrumb"

test("passes a11y test", async () => {
  await testA11y(
    <Breadcrumb.Root>
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#">Link 1</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#">Link 2</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isCurrentPage>
          <Breadcrumb.Link>Link 3</Breadcrumb.Link>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>,
  )
})

test("has the proper aria-attributes", () => {
  render(
    <Breadcrumb.Root>
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#">Link 1</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#">Link 2</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isCurrentPage>
          <Breadcrumb.Link>Link 3</Breadcrumb.Link>
        </Breadcrumb.Item>
      </Breadcrumb.List>
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
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#">Link 1</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#">Link 2</Breadcrumb.Link>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>,
  )
  expect(screen.getAllByText("-")).toHaveLength(1)
})

test("breadcrumb link has its href attribute correctly set", () => {
  render(
    <Breadcrumb.Root>
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#">Link 1</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isCurrentPage>
          <Breadcrumb.Link href="#">Link 2</Breadcrumb.Link>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>,
  )

  const link = screen.getByText("Link 1")
  expect(link.getAttribute("href")).toBe("#")
})

test("current page link doesn't have href attribute set", () => {
  render(
    <Breadcrumb.Root>
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#">Link 1</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isCurrentPage>
          <Breadcrumb.Link href="#">Link 2</Breadcrumb.Link>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>,
  )

  const link = screen.getByText("Link 2")
  expect(link.getAttribute("href")).toBe(null)
})
