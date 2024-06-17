import { Box, For, NumberInput, useSlotRecipe } from "../src"
import { PlaygroundTable } from "./shared/playground-table"

export default {
  title: "Components / NumberInput",
  decorators: [
    (Story: any) => (
      <Box padding="40px">
        <Story />
      </Box>
    ),
  ],
}

const DemoNumberInput = (props: NumberInput.RootProps) => {
  return (
    <NumberInput.Root {...props}>
      <NumberInput.Input />
      <NumberInput.Control>
        <NumberInput.IncrementTrigger />
        <NumberInput.DecrementTrigger />
      </NumberInput.Control>
    </NumberInput.Root>
  )
}

export const Sizes = () => {
  const recipe = useSlotRecipe("numberInput")
  return (
    <PlaygroundTable>
      <thead>
        <tr>
          <For each={recipe.variantMap.size}>{(v) => <td>{v}</td>}</For>
        </tr>
      </thead>
      <tbody>
        <tr>
          <For each={recipe.variantMap.size}>
            {(v) => (
              <td>
                <DemoNumberInput max={50} min={10} size={v} defaultValue="12" />
              </td>
            )}
          </For>
        </tr>
      </tbody>
    </PlaygroundTable>
  )
}

export const WithFormatOptions = () => {
  return (
    <DemoNumberInput
      step={0.5}
      defaultValue="10"
      formatOptions={{
        style: "currency",
        currency: "USD",
      }}
    />
  )
}
