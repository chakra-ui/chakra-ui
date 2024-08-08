import { For, HStack, Span, useSlotRecipe } from "@chakra-ui/react"
import { colorPalettes } from "compositions/lib/color-palettes"
import { PlaygroundTable } from "compositions/lib/playground-table"
import { Avatar } from "compositions/ui/avatar"

export const AvatarVariantTable = () => {
  const recipe = useSlotRecipe("avatar")
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
                    <HStack>
                      <Avatar
                        src="https://bit.ly/dan-abramov"
                        name="Dan Abramov"
                        colorPalette={c}
                        variant={v}
                      />
                      <Avatar name="Dan Abramov" colorPalette={c} variant={v} />
                      <Avatar colorPalette={c} variant={v} />
                    </HStack>
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
