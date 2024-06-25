import { Alert, Box, For, Span, Spinner, useSlotRecipe } from "../src"
import { colorPalettes } from "./shared/color-palettes"
import { PlaygroundTable } from "./shared/playground-table"

export default {
  title: "Components / Alert",
  decorators: [(story: Function) => <Box padding="4">{story()}</Box>],
}

export const Basic = () => {
  return (
    <Alert.Root>
      <Alert.Indicator />
      <Box>
        <Alert.Title>Alert Title</Alert.Title>
        <Alert.Description>
          Chakra UI v3 is the greatest! Check it out.
        </Alert.Description>
      </Box>
    </Alert.Root>
  )
}

export const Variants = () => {
  const recipe = useSlotRecipe("alert")
  return (
    <PlaygroundTable>
      <thead>
        <tr>
          <td />
          <For each={recipe.variantMap.variant}>
            {(v) => <td key={v}>{v}</td>}
          </For>
        </tr>
      </thead>
      <tbody>
        <For each={colorPalettes}>
          {(c) => (
            <tr key={c}>
              <td>
                <Span fontSize="sm" color="fg.muted" minW="8ch">
                  {c}
                </Span>
              </td>
              <For each={recipe.variantMap.variant}>
                {(v) => (
                  <td key={v}>
                    <Alert.Root variant={v} colorPalette={c}>
                      <Alert.Indicator />
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
  const recipe = useSlotRecipe("alert")
  return (
    <PlaygroundTable>
      <thead>
        <tr>
          <td />
          <For each={recipe.variantMap.size}>{(v) => <td key={v}>{v}</td>}</For>
        </tr>
      </thead>
      <tbody>
        <For each={colorPalettes}>
          {(c) => (
            <tr key={c}>
              <td>
                <Span fontSize="sm" color="fg.muted" minW="8ch">
                  {c}
                </Span>
              </td>
              <For each={recipe.variantMap.size}>
                {(v) => (
                  <td key={v}>
                    <Alert.Root size={v} colorPalette={c}>
                      <Alert.Indicator />
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
      <Alert.Indicator>
        <Spinner size="sm" />
      </Alert.Indicator>
      We are loading something
    </Alert.Root>
  )
}
