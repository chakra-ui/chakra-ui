import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
} from "compositions/ui/breadcrumb"
import { LiaSlashSolid } from "react-icons/lia"

export const BreadcrumbWithSeparator = () => {
  return (
    <BreadcrumbRoot separator={<LiaSlashSolid />}>
      <BreadcrumbLink href="#">Docs</BreadcrumbLink>
      <BreadcrumbLink href="#">Components</BreadcrumbLink>
      <BreadcrumbCurrentLink>Props</BreadcrumbCurrentLink>
    </BreadcrumbRoot>
  )
}
