import { TableOfContents } from "@chakra-ui/react"
import { render } from "./core/render"

describe("TableOfContents", () => {
  it("renders semantic navigation and links items to headings", () => {
    const { getByRole } = render(
      <TableOfContents.Root defaultValue={["overview"]}>
        <TableOfContents.Title>On this page</TableOfContents.Title>
        <TableOfContents.List>
          <TableOfContents.Item value="overview">
            <TableOfContents.Link>Overview</TableOfContents.Link>
          </TableOfContents.Item>
        </TableOfContents.List>
      </TableOfContents.Root>,
    )

    expect(getByRole("navigation", { name: "Table of contents" })).toBeVisible()
    expect(getByRole("link", { name: "Overview" })).toHaveAttribute(
      "href",
      "#overview",
    )
    expect(getByRole("link", { name: "Overview" })).toHaveAttribute(
      "aria-current",
      "location",
    )
  })

  it("exposes nesting depth and allows a custom href", () => {
    const { getByRole } = render(
      <TableOfContents.Root>
        <TableOfContents.List>
          <TableOfContents.Item value="installation" depth={2}>
            <TableOfContents.Link href="/docs#installation">
              Installation
            </TableOfContents.Link>
          </TableOfContents.Item>
        </TableOfContents.List>
      </TableOfContents.Root>,
    )

    const link = getByRole("link", { name: "Installation" })
    expect(link).toHaveAttribute("href", "/docs#installation")
    expect(link.parentElement).toHaveAttribute("data-depth", "2")
    expect(link.parentElement).toHaveStyle("--table-of-contents-depth: 2")
  })
})
