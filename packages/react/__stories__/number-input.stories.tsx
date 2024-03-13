import { useState } from "react"
import { Box, Field, For, NumberInput, useSlotRecipe } from "../src"
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
      <NumberInput.Field />
      <NumberInput.Control>
        <NumberInput.IncrementTrigger />
        <NumberInput.DecrementTrigger />
      </NumberInput.Control>
    </NumberInput.Root>
  )
}

export const Sizes = () => {
  const recipe = useSlotRecipe("NumberInput")
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
                <DemoNumberInput max={50} min={10} size={v} defaultValue={12} />
              </td>
            )}
          </For>
        </tr>
      </tbody>
    </PlaygroundTable>
  )
}

const format = (val: string) => `$${val}`
const parse = (val: string) => val.replace(/^\$/, "")

export const WithCustomFormat = () => {
  const [value, setValue] = useState("1.53")
  return (
    <DemoNumberInput
      value={format(value)}
      onChange={(valueString) => setValue(parse(valueString))}
      step={0.01}
      precision={2}
      defaultValue={15}
      max={6}
      min={1}
    />
  )
}

export const WithStep = () => (
  <DemoNumberInput step={5} defaultValue={15} min={10} max={30} />
)

export const WithPrecision = () => (
  <DemoNumberInput defaultValue={15} precision={2} step={0.2} />
)

export const WithField = () => {
  return (
    <Field.Root id="amount">
      <Field.Label>Amount</Field.Label>
      <DemoNumberInput defaultValue={20} max={50} min={10} />
    </Field.Root>
  )
}
