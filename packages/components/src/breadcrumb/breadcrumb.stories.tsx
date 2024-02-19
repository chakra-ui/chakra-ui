import { FaChevronRight } from "react-icons/fa"
import { BrowserRouter, Link } from "react-router-dom"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "."

export default {
  title: "Components / Navigation / Breadcrumb",
}

export const Basic = () => (
  <BrowserRouter>
    <Breadcrumb spacing="4">
      <BreadcrumbItem>
        <BreadcrumbLink asChild>
          <Link to="/home" replace>
            Breadcrumb 1
          </Link>
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

export const WithSeparator = () => (
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

export const WithCustomSeparator = () => (
  <Breadcrumb spacing="8px" separator={<FaChevronRight />}>
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
