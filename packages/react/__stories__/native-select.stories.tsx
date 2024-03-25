import { Box, For, NativeSelect as Select, Span, useSlotRecipe } from "../src"
import { PlaygroundTable } from "./shared/playground-table"

export default {
  title: "Components / Select - Native",
  decorators: [
    (Story: React.ElementType) => (
      <Box padding="40px">
        <Story />
      </Box>
    ),
  ],
}

const DemoSelect = (props: Select.RootProps) => (
  <Select.Root {...props}>
    <Select.Field placeholder="Select option">
      <option value="Option 1">Option 1</option>
      <option value="Option 2">Option 2</option>
      <option value="Option 3">Option 3</option>
    </Select.Field>
    <Select.Indicator />
  </Select.Root>
)

export const Variants = () => {
  const recipe = useSlotRecipe("NativeSelect")
  return (
    <PlaygroundTable>
      <tbody>
        <For each={recipe.variantMap.variant}>
          {(v) => (
            <tr>
              <td>
                <Span fontSize="sm" color="fg.muted" minW="8ch">
                  {v}
                </Span>
              </td>
              <td>
                <DemoSelect variant={v} minW="300px" />
              </td>
            </tr>
          )}
        </For>
      </tbody>
    </PlaygroundTable>
  )
}

export const Sizes = () => {
  const recipe = useSlotRecipe("NativeSelect")
  return (
    <PlaygroundTable>
      <tbody>
        <For each={recipe.variantMap.size}>
          {(v) => (
            <tr>
              <td>
                <Span fontSize="sm" color="fg.muted" minW="8ch">
                  {v}
                </Span>
              </td>
              <td>
                <DemoSelect size={v} minW="300px" />
              </td>
            </tr>
          )}
        </For>
      </tbody>
    </PlaygroundTable>
  )
}

// export const Invalid = () => (
//   <Select.Root invalid>
//     <Select.Field placeholder="Select option">
//       <option value="Option 1">Option 1</option>
//       <option value="Option 2">Option 2</option>
//       <option value="Option 3">Option 3</option>
//     </Select.Field>
//     <Select.Indicator />
//   </Select.Root>
// )
