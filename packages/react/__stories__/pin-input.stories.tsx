import { Box, Field, For, Group, PinInput, useRecipe } from "../src"
import { PlaygroundTable } from "./shared/playground-table"

export default {
  title: "Components / PinInput",
  decorators: [
    (Story: any) => (
      <Box padding="40px">
        <Story />
      </Box>
    ),
  ],
}

const DemoPinInput = (props: PinInput.RootProps) => {
  return (
    <PinInput.Root {...props}>
      <PinInput.Control asChild>
        <Group attached>
          {[0, 1, 2].map((id, index) => (
            <PinInput.Field key={id} index={index} />
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
  const recipe = useRecipe("Badge")
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
  return <DemoPinInput onComplete={handleComplete} />
}

export const WithField = () => {
  return (
    <Field.Root>
      <PinInput.Root>
        <Field.Label asChild>
          <PinInput.Label>Enter your pin</PinInput.Label>
        </Field.Label>
        <PinInput.Control mt="2" asChild>
          <Group gap="3">
            {[0, 1, 2].map((id, index) => (
              <PinInput.Field key={id} index={index} />
            ))}
          </Group>
        </PinInput.Control>
      </PinInput.Root>
    </Field.Root>
  )
}
