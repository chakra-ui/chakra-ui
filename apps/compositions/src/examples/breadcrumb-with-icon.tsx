import { Breadcrumb } from "@chakra-ui/react"
import { LuHouse, LuShirt } from "react-icons/lu"

export const BreadcrumbWithIcon = () => {
  return (
    <Breadcrumb.Root>
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#">
            <LuHouse />
            Home
          </Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />

        <Breadcrumb.Item>
          <Breadcrumb.Link href="#">
            <LuShirt />
            Men Wear
          </Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />

        <Breadcrumb.Item>
          <Breadcrumb.CurrentLink>Trousers</Breadcrumb.CurrentLink>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  )
}
