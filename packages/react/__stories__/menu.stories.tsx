import { Button, Menu, chakra } from "../src"

export * from "./menu.stories"

export default {
  title: "Components / Menu",
  decorators: [
    (story: Function) => (
      <chakra.div maxWidth="500px" mx="auto" mt="40px">
        {story()}
      </chakra.div>
    ),
  ],
}

export const Basic = () => (
  <Menu.Root>
    <Menu.Trigger asChild>
      <Button variant="solid" colorPalette="green" size="sm">
        Open menu
      </Button>
    </Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content minWidth="240px">
        <Menu.Item>Share...</Menu.Item>
        <Menu.Item>Move...</Menu.Item>
        <Menu.Item disabled>Rename...</Menu.Item>
        <Menu.Item>Delete...</Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
)

export const WithRadioItems = () => (
  <Menu.Root>
    <Menu.Trigger asChild>
      <Button variant="solid" colorPalette="green" size="sm">
        Open menu
      </Button>
    </Menu.Trigger>

    <Menu.Positioner>
      <Menu.Content minWidth="240px">
        <Menu.OptionGroup defaultValue="val-1" type="radio">
          <Menu.GroupLabel>Order</Menu.GroupLabel>
          <Menu.Separator />
          <Menu.OptionItem value="val-1">
            <Menu.OptionItemIndicator />
            Option 1
          </Menu.OptionItem>
          <Menu.OptionItem value="val-2">
            <Menu.OptionItemIndicator />
            Option 2
          </Menu.OptionItem>
        </Menu.OptionGroup>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
)

export const WithChecboxItems = () => (
  <Menu.Root>
    <Menu.Trigger asChild>
      <Button variant="solid" colorPalette="green" size="sm">
        Open menu
      </Button>
    </Menu.Trigger>

    <Menu.Positioner>
      <Menu.Content minWidth="240px">
        <Menu.OptionGroup type="checkbox">
          <Menu.GroupLabel>Order</Menu.GroupLabel>
          <Menu.Separator />
          <Menu.OptionItem value="val-1">
            <Menu.OptionItemIndicator />
            Option 1
          </Menu.OptionItem>
          <Menu.OptionItem value="val-2">
            <Menu.OptionItemIndicator />
            Option 2
          </Menu.OptionItem>
        </Menu.OptionGroup>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
)

// export const WithOverflow = () => {
//   const items = React.useMemo(
//     () => Array.from({ length: 30 }).map((_, i) => `Option ${i}`),
//     [],
//   )
//   return (
//     <Menu.Root>
//       <Menu.Trigger>Choose an option</Menu.Trigger>
//       <Menu.Positioner>
//         <Menu.Content maxHeight="15rem" overflowY="scroll">
//           {items.map((value, i) => (
//             <Menu.Item key={i} value={value}>
//               {value}
//             </Menu.Item>
//           ))}
//         </Menu.Content>
//       </Menu.Positioner>
//     </Menu.Root>
//   )
// }

// export const WithLinkItem = () => (
//   <Menu.Root>
//     <Menu.Trigger asChild>
//       <Button variant="solid">Actions</Button>
//     </Menu.Trigger>
//     <Menu.Positioner>
//       <Menu.Content>
//         <Menu.Item>Download</Menu.Item>
//         <Menu.Item>Create a Copy</Menu.Item>
//         <Menu.Item asChild>
//           <a href="#">Attend a Workshop</a>
//         </Menu.Item>
//       </Menu.Content>
//     </Menu.Positioner>
//   </Menu.Root>
// )
