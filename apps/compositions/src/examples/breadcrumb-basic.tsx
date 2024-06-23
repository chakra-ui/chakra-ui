import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
} from "compositions/ui/breadcrumb"

export const BreadcrumbBasic = () => {
  return (
    <BreadcrumbRoot>
      <BreadcrumbLink href="#">Docs</BreadcrumbLink>
      <BreadcrumbLink href="#">Components</BreadcrumbLink>
      <BreadcrumbCurrentLink>Props</BreadcrumbCurrentLink>
    </BreadcrumbRoot>
  )
}
