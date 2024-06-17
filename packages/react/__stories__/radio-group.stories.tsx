import {
  Box,
  Button,
  Field,
  For,
  HStack,
  Input,
  Label,
  RadioGroup,
  Span,
  Stack,
  useSlotRecipe,
} from "../src"
import { colorPalettes } from "./shared/color-palettes"
import { PlaygroundTable } from "./shared/playground-table"

export default {
  title: "Components / Radio Group",
  decorators: [(story: Function) => <Box padding="40px">{story()}</Box>],
}

const RadioItem = (props: RadioGroup.ItemProps) => {
  const { children, ...rest } = props
  return (
    <RadioGroup.Item {...rest}>
      <RadioGroup.ItemHiddenInput />
      <RadioGroup.ItemIndicator />
      <RadioGroup.ItemText>{children}</RadioGroup.ItemText>
    </RadioGroup.Item>
  )
}

export const Basic = () => {
  return (
    <RadioGroup.Root defaultValue="1" colorPalette="red">
      <HStack gap="4">
        <RadioItem value="1">Radio One</RadioItem>
        <RadioItem value="2">Radio Two</RadioItem>
      </HStack>
    </RadioGroup.Root>
  )
}

export const Variants = () => {
  const recipe = useSlotRecipe("radioGroup")
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
                    <RadioGroup.Root
                      defaultValue="1"
                      colorPalette={c}
                      variant={v}
                      readOnly
                      minWidth="200px"
                    >
                      <HStack gap="4">
                        <RadioItem value="1">Radio</RadioItem>
                        <RadioItem value="2">Radio</RadioItem>
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
  const recipe = useSlotRecipe("radioGroup")
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
                    <RadioGroup.Root
                      colorPalette={c}
                      size={v}
                      defaultValue="1"
                      minWidth="200px"
                    >
                      <HStack gap="4">
                        <RadioItem value="1">Radio</RadioItem>
                        <RadioItem value="2">Radio</RadioItem>
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
      <Field>
        <Label>Name</Label>
        <Input />
      </Field>

      <Field>
        <Label>What's your favorite Anime?</Label>
        <RadioGroup.Root defaultValue="1">
          <Stack gap="2">
            <RadioItem value="1">Naruto</RadioItem>
            <RadioItem value="2">Dragon Ball</RadioItem>
            <RadioItem value="3">One Piece</RadioItem>
          </Stack>
        </RadioGroup.Root>
      </Field>

      <Button alignSelf="flex-start" variant="solid" mt="3">
        Submit
      </Button>
    </Stack>
  )
}
