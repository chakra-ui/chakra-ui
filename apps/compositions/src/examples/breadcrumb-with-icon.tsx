import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
} from "compositions/ui/breadcrumb"
import { LuHome, LuShirt } from "react-icons/lu"

export const BreadcrumbWithIcon = () => {
  return (
    <BreadcrumbRoot>
      <BreadcrumbLink href="#">
        <LuHome /> Home
      </BreadcrumbLink>
      <BreadcrumbLink href="#">
        <LuShirt /> Men Wear
      </BreadcrumbLink>
      <BreadcrumbCurrentLink>Trousers</BreadcrumbCurrentLink>
    </BreadcrumbRoot>
  )
}
