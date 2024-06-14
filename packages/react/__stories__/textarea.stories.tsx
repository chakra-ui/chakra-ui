import {
  Box,
  Button,
  Field,
  For,
  HelpText,
  Label,
  Span,
  Stack,
  Textarea,
  useRecipe,
} from "../src"
import { PlaygroundTable } from "./shared/playground-table"

export default {
  title: "Components / Textarea",
  decorators: [(story: Function) => <Box padding="40px">{story()}</Box>],
}

export const Variants = () => {
  const recipe = useRecipe("input")
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
                <Textarea variant={v} placeholder="Placeholder" />
              </td>
            </tr>
          )}
        </For>
        <tr>
          <td>
            <Span fontSize="sm" color="fg.muted" minW="8ch">
              unstyled
            </Span>
          </td>
          <td>
            <Textarea minW="320px" placeholder="Placeholder" />
          </td>
        </tr>
      </tbody>
    </PlaygroundTable>
  )
}

export const Sizes = () => {
  const recipe = useRecipe("input")
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
                <Stack minW="320px">
                  <Textarea size={v} placeholder="Placeholder" />
                  <Textarea
                    variant="filled"
                    size={v}
                    placeholder="Placeholder"
                  />
                </Stack>
              </td>
            </tr>
          )}
        </For>
      </tbody>
    </PlaygroundTable>
  )
}

export const WithLabel = () => {
  return (
    <Stack maxW="sm" gap="4">
      <Field>
        <Label>Issue Details</Label>
        <Textarea placeholder="Type your message here..." />
        <HelpText>
          You can @mention people and refer to issues and pull requests.
        </HelpText>
      </Field>
      <Button alignSelf="flex-start" variant="solid" mt="3">
        Submit
      </Button>
    </Stack>
  )
}
