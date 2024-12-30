import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
} from "compositions/ui/breadcrumb"
import { LuHouse, LuShirt } from "react-icons/lu"

export const BreadcrumbWithIcon = () => {
  return (
    <BreadcrumbRoot>
      <BreadcrumbLink href="#">
        <LuHouse /> Home
      </BreadcrumbLink>
      <BreadcrumbLink href="#">
        <LuShirt /> Men Wear
      </BreadcrumbLink>
      <BreadcrumbCurrentLink>Trousers</BreadcrumbCurrentLink>
    </BreadcrumbRoot>
  )
}
