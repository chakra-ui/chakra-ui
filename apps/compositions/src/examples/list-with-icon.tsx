import { List } from "@chakra-ui/react"
import { LuCircleCheck, LuCircleDashed } from "react-icons/lu"

export const ListWithIcon = () => {
  return (
    <List.Root gap="2" variant="plain" align="center">
      <List.Item>
        <List.Indicator asChild color="green.500">
          <LuCircleCheck />
        </List.Indicator>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit
      </List.Item>
      <List.Item>
        <List.Indicator asChild color="green.500">
          <LuCircleCheck />
        </List.Indicator>
        Assumenda, quia temporibus eveniet a libero incidunt suscipit
      </List.Item>
      <List.Item>
        <List.Indicator asChild color="green.500">
          <LuCircleDashed />
        </List.Indicator>
        Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
      </List.Item>
    </List.Root>
  )
}
