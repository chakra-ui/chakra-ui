import { Alert, Box, For, Span, Spinner, useSlotRecipe } from "../src"
import { colorPalettes } from "./shared/color-palettes"
import { PlaygroundTable } from "./shared/playground-table"

export default {
  title: "Feedback / Alert",
  decorators: [(story: Function) => <Box padding="4">{story()}</Box>],
}

export const Variants = () => {
  const recipe = useSlotRecipe("Alert")
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
                    <Alert.Root variant={v} colorPalette={c}>
                      <Alert.Icon />
                      <Box>
                        <Alert.Title>Alert Title</Alert.Title>
                        <Alert.Description>
                          Chakra UI v3 is the greatest! Check it out.
                        </Alert.Description>
                      </Box>
                    </Alert.Root>
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
  const recipe = useSlotRecipe("Alert")
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
                    <Alert.Root size={v} colorPalette={c}>
                      <Alert.Icon />
                      <Box>
                        <Alert.Title>Alert Title</Alert.Title>
                        <Alert.Description>
                          Chakra UI v3 is the greatest! Check it out.
                        </Alert.Description>
                      </Box>
                    </Alert.Root>
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

export const WithSpinner = () => {
  return (
    <Alert.Root
      maxW="xl"
      borderStartWidth="3px"
      borderStartColor="colorPalette.600"
    >
      <Alert.Icon>
        <Spinner size="sm" />
      </Alert.Icon>
      We are loading something
    </Alert.Root>
  )
}
