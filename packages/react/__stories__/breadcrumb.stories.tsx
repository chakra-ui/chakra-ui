import { BreadcrumbBasic } from "compositions/examples/breadcrumb-basic"
import { BreadcrumbSizeTable } from "compositions/examples/breadcrumb-size-table"
import { BreadcrumbVariantTable } from "compositions/examples/breadcrumb-variant-table"
import { BreadcrumbWithEllipsis } from "compositions/examples/breadcrumb-with-ellipsis"
import { BreadcrumbWithIcon } from "compositions/examples/breadcrumb-with-icon"
import { BreadcrumbWithMenu } from "compositions/examples/breadcrumb-with-menu"
import { BreadcrumbWithSeparator } from "compositions/examples/breadcrumb-with-separator"

export default {
  title: "Components / Breadcrumb",
}

export const Basic = () => {
  return <BreadcrumbBasic />
}

export const WithEllipsis = () => {
  return <BreadcrumbWithEllipsis />
}

export const WithIcon = () => {
  return <BreadcrumbWithIcon />
}

export const WithMenu = () => {
  return <BreadcrumbWithMenu />
}

export const WithSeparator = () => {
  return <BreadcrumbWithSeparator />
}

export const Variants = () => {
  return <BreadcrumbVariantTable />
}

export const Sizes = () => {
  return <BreadcrumbSizeTable />
}
