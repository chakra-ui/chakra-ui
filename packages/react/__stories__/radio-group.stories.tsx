import {
  Box,
  Button,
  Field,
  For,
  HStack,
  Input,
  Span,
  Stack,
  useSlotRecipe,
} from "../src"
import { RadioGroup } from "../src/components/radio-group"
import { colorPalettes } from "./shared/color-palettes"
import { PlaygroundTable } from "./shared/playground-table"

export default {
  title: "Components / Radio Group",
  decorators: [(story: Function) => <Box padding="40px">{story()}</Box>],
}

const DemoRadio = (props: RadioGroup.ItemProps) => {
  const { children, ...rest } = props
  return (
    <RadioGroup.Item {...rest}>
      <RadioGroup.ItemControl />
      <RadioGroup.ItemText>{children}</RadioGroup.ItemText>
    </RadioGroup.Item>
  )
}

export const Variants = () => {
  const recipe = useSlotRecipe("Radio")
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
                    <RadioGroup.Root defaultValue="1" minWidth="200px">
                      <HStack gap="4">
                        <DemoRadio colorPalette={c} variant={v} value="1">
                          Radio
                        </DemoRadio>
                        <DemoRadio colorPalette={c} variant={v} value="2">
                          Radio
                        </DemoRadio>
                      </HStack>
                    </RadioGroup.Root>
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
  const recipe = useSlotRecipe("Radio")
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
                    <RadioGroup.Root defaultValue="1" minWidth="200px">
                      <HStack gap="4">
                        <DemoRadio colorPalette={c} size={v} value="1">
                          Radio
                        </DemoRadio>
                        <DemoRadio colorPalette={c} size={v} value="2">
                          Radio
                        </DemoRadio>
                      </HStack>
                    </RadioGroup.Root>
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

export const WithForm = () => {
  return (
    <Stack maxW="sm" gap="4">
      <Field.Root>
        <Field.Label>Name</Field.Label>
        <Input />
      </Field.Root>

      <Field.Root>
        <Field.Label>What's your favorite Anime?</Field.Label>
        <RadioGroup.Root defaultValue="1">
          <Stack gap="2">
            <DemoRadio value="1">Naruto</DemoRadio>
            <DemoRadio value="2">Dragon Ball</DemoRadio>
            <DemoRadio value="3">One Piece</DemoRadio>
          </Stack>
        </RadioGroup.Root>
      </Field.Root>

      <Button alignSelf="flex-start" variant="solid" mt="3">
        Submit
      </Button>
    </Stack>
  )
}
