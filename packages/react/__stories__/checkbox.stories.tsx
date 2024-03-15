import { HiCheck } from "react-icons/hi"
import {
  Box,
  Button,
  Checkbox,
  Field,
  For,
  Input,
  Span,
  Stack,
  useSlotRecipe,
} from "../src"
import { colorPalettes } from "./shared/color-palettes"
import { PlaygroundTable } from "./shared/playground-table"

export default {
  title: "Components / Checkbox",
  decorators: [(story: Function) => <Box padding="40px">{story()}</Box>],
}

const DemoCheckbox = (props: Checkbox.RootProps) => {
  return (
    <Checkbox.Root {...props}>
      <Checkbox.Control />
      <Checkbox.Label>{props.children}</Checkbox.Label>
    </Checkbox.Root>
  )
}

export const Variants = () => {
  const recipe = useSlotRecipe("Checkbox")
  return (
    <PlaygroundTable>
      <thead>
        <tr>
          <td />
          <For each={recipe.variantMap.variant}>{(v) => <td>{v}</td>}</For>
        </tr>
      </thead>
      <tbody>
        <For each={colorPalettes}>
          {(c) => (
            <tr>
              <td>
                <Span fontSize="sm" color="fg.muted" minW="8ch">
                  {c}
                </Span>
              </td>
              <For each={recipe.variantMap.variant}>
                {(v) => (
                  <td>
                    <Stack>
                      <DemoCheckbox colorPalette={c} variant={v}>
                        Checkbox
                      </DemoCheckbox>
                      <DemoCheckbox colorPalette={c} variant={v} defaultChecked>
                        Checkbox
                      </DemoCheckbox>
                      <DemoCheckbox
                        colorPalette={c}
                        variant={v}
                        disabled
                        defaultChecked
                      >
                        Checkbox
                      </DemoCheckbox>
                    </Stack>
                  </td>
                )}
              </For>
            </tr>
          )}
        </For>
      </tbody>
    </PlaygroundTable>
  )
}

export const Sizes = () => {
  const recipe = useSlotRecipe("Checkbox")
  return (
    <PlaygroundTable>
      <thead>
        <tr>
          <td />
          <For each={recipe.variantMap.size}>{(v) => <td>{v}</td>}</For>
        </tr>
      </thead>
      <tbody>
        <For each={colorPalettes}>
          {(c) => (
            <tr>
              <td>
                <Span fontSize="sm" color="fg.muted" minW="8ch">
                  {c}
                </Span>
              </td>
              <For each={recipe.variantMap.size}>
                {(v) => (
                  <td>
                    <Stack>
                      <DemoCheckbox colorPalette={c} size={v}>
                        Checkbox
                      </DemoCheckbox>
                      <DemoCheckbox colorPalette={c} size={v} defaultChecked>
                        Checkbox
                      </DemoCheckbox>
                    </Stack>
                  </td>
                )}
              </For>
            </tr>
          )}
        </For>
      </tbody>
    </PlaygroundTable>
  )
}

export const WithStates = () => (
  <Stack align="start">
    <DemoCheckbox disabled>Disabled</DemoCheckbox>
    <DemoCheckbox readOnly>Readonly</DemoCheckbox>
    <DemoCheckbox invalid>Invalid</DemoCheckbox>
  </Stack>
)

export const WithCustomIcon = () => {
  return (
    <Checkbox.Root>
      <Checkbox.Control>
        <Checkbox.Indicator checked={<HiCheck />} />
      </Checkbox.Control>
      <Checkbox.Label>Checkbox</Checkbox.Label>
    </Checkbox.Root>
  )
}

export const WithGroup = () => {
  return (
    <Checkbox.Group
      defaultValue={["one", "two"]}
      onChange={(value) => console.log(value)}
    >
      <Stack align="start">
        <DemoCheckbox value="one">One</DemoCheckbox>
        <DemoCheckbox value="two">Two</DemoCheckbox>
        <DemoCheckbox value="three">Three</DemoCheckbox>
      </Stack>
    </Checkbox.Group>
  )
}

export const WithForm = () => {
  return (
    <Stack maxW="sm" gap="4">
      <Field.Root>
        <Field.Label>User name</Field.Label>
        <Input />
      </Field.Root>
      <Field.Root>
        <Field.Label>Password</Field.Label>
        <Input />
      </Field.Root>

      <DemoCheckbox value="one" alignSelf="flex-start">
        Remember me
      </DemoCheckbox>

      <Button alignSelf="flex-start" variant="solid" mt="3">
        Submit
      </Button>
    </Stack>
  )
}
