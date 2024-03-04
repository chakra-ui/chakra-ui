import { FaChevronRight } from "react-icons/fa"
import { BrowserRouter, Link } from "react-router-dom"
import { Breadcrumb } from "../src/components/breadcrumb"

export default {
  title: "Navigation / Breadcrumb",
}

export const Basic = () => (
  <BrowserRouter>
    <Breadcrumb.Root>
      <Breadcrumb.List spacing="4">
        <Breadcrumb.Item>
          <Breadcrumb.Link asChild>
            <Link to="/home" replace>
              Breadcrumb 1
            </Link>
          </Breadcrumb.Link>
        </Breadcrumb.Item>

        <Breadcrumb.Item>
          <Breadcrumb.Link href="#">Breadcrumb 2</Breadcrumb.Link>
        </Breadcrumb.Item>

        <Breadcrumb.Item isCurrentPage>
          <Breadcrumb.Link href="#">Breadcrumb 3</Breadcrumb.Link>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  </BrowserRouter>
)

export const WithSeparator = () => (
  <Breadcrumb.Root>
    <Breadcrumb.List separator=">">
      <Breadcrumb.Item>
        <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
      </Breadcrumb.Item>

      <Breadcrumb.Item>
        <Breadcrumb.Link href="#">About</Breadcrumb.Link>
      </Breadcrumb.Item>

      <Breadcrumb.Item isCurrentPage>
        <Breadcrumb.Link href="#">Current</Breadcrumb.Link>
      </Breadcrumb.Item>
    </Breadcrumb.List>
  </Breadcrumb.Root>
)

export const WithCustomSeparator = () => (
  <Breadcrumb.Root>
    <Breadcrumb.List spacing="8px" separator={<FaChevronRight />}>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
      </Breadcrumb.Item>

      <Breadcrumb.Item>
        <Breadcrumb.Link href="/about">About</Breadcrumb.Link>
      </Breadcrumb.Item>

      <Breadcrumb.Item isCurrentPage>
        <Breadcrumb.Link href="/contact">Contact</Breadcrumb.Link>
      </Breadcrumb.Item>
    </Breadcrumb.List>
  </Breadcrumb.Root>
)
