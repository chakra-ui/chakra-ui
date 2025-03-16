import { Avatar, For, HStack, Span, useSlotRecipe } from "@chakra-ui/react"
import { colorPalettes } from "compositions/lib/color-palettes"
import { PlaygroundTable } from "compositions/lib/playground-table"

export const AvatarVariantTable = () => {
  const recipe = useSlotRecipe({ key: "avatar" })
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
                    <HStack>
                      <Avatar.Root colorPalette={c} variant={v}>
                        <Avatar.Image src="https://bit.ly/dan-abramov" />
                        <Avatar.Fallback name="Dan Abramov" />
                      </Avatar.Root>
                      <Avatar.Root colorPalette={c} variant={v}>
                        <Avatar.Fallback name="Dan Abramov" />
                      </Avatar.Root>
                      <Avatar.Root colorPalette={c} variant={v}>
                        <Avatar.Fallback />
                      </Avatar.Root>
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
