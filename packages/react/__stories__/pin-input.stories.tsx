import type { Meta } from "@storybook/react"
import { Field } from "compositions/ui/field"
import { Box, For, Group, PinInput, useSlotRecipe } from "../src"
import { PlaygroundTable } from "./shared/playground-table"

export default {
  title: "Components / PinInput",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

const DemoPinInput = (props: PinInput.RootProps) => {
  return (
    <PinInput.Root {...props}>
      <PinInput.Control asChild>
        <Group attached>
          {[0, 1, 2].map((id, index) => (
            <PinInput.Input key={id} index={index} />
          ))}
        </Group>
      </PinInput.Control>
    </PinInput.Root>
  )
}

export const Basic = () => {
  return <DemoPinInput />
}

export const Sizes = () => {
  const recipe = useSlotRecipe({ key: "pinInput" })
  return (
    <PlaygroundTable>
      <thead>
        <tr>
          <For each={recipe.variantMap.size}>{(v) => <td key={v}>{v}</td>}</For>
        </tr>
      </thead>
      <tbody>
        <tr>
          <For each={recipe.variantMap.size}>
            {(v) => (
              <td key={v}>
                <DemoPinInput size={v} />
              </td>
            )}
          </For>
        </tr>
      </tbody>
    </PlaygroundTable>
  )
}

export const WithCompleteFn = () => {
  const handleComplete = (value: string[]) => console.log(value)
  return <DemoPinInput onValueComplete={(e) => handleComplete(e.value)} />
}

export const WithField = () => {
  return (
    <Field>
      <PinInput.Root>
        <PinInput.Label>Enter your pin</PinInput.Label>
        <PinInput.Control mt="2" asChild>
          <Group gap="3">
            {[0, 1, 2].map((id, index) => (
              <PinInput.Input key={id} index={index} />
            ))}
          </Group>
        </PinInput.Control>
      </PinInput.Root>
    </Field>
  )
}
