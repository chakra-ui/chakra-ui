import {
  BreadcrumbCurrentLink,
  BreadcrumbEllipsis,
  BreadcrumbLink,
  BreadcrumbRoot,
} from "compositions/ui/breadcrumb"

export const BreadcrumbWithEllipsis = () => {
  return (
    <BreadcrumbRoot>
      <BreadcrumbLink href="#">Docs</BreadcrumbLink>
      <BreadcrumbLink href="#">Components</BreadcrumbLink>
      <BreadcrumbEllipsis />
      <BreadcrumbCurrentLink>Props</BreadcrumbCurrentLink>
    </BreadcrumbRoot>
  )
}
