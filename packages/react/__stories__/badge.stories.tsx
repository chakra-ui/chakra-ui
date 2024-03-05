import { HiAtSymbol, HiStar } from "react-icons/hi"
import { Badge, For, Group, Span, Stack, useRecipe } from "../src"
import { colorPalettes } from "./shared/color-palettes"
import { PlaygroundTable } from "./shared/playground-table"

export default {
  title: "Data Display / Badge",
}

export const Variants = () => {
  const recipe = useRecipe("Badge")
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
                    <Badge variant={v} colorPalette={c}>
                      New
                    </Badge>
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
  const recipe = useRecipe("Badge")
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
                    <Badge size={v} colorPalette={c} variant="solid">
                      New
                    </Badge>
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

export const WithIcon = () => {
  return (
    <Stack align="flex-start">
      <Badge variant="solid" colorPalette="purple" size="md">
        <HiStar />
        New
      </Badge>
      <Badge variant="solid" colorPalette="green" size="md">
        New
        <HiAtSymbol />
      </Badge>
    </Stack>
  )
}

export const WithGroup = () => {
  return (
    <Group attached>
      <Badge variant="solid" colorPalette="purple">
        Commit status
      </Badge>
      <Badge variant="solid" colorPalette="green">
        90+
      </Badge>
    </Group>
  )
}
