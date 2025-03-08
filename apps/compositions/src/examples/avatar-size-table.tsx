"use client"

import { Avatar, For, HStack, Span, useSlotRecipe } from "@chakra-ui/react"
import { colorPalettes } from "compositions/lib/color-palettes"
import { PlaygroundTable } from "compositions/lib/playground-table"

function omit<T extends string | undefined>(
  arr: T[] | undefined,
  omit: T[],
): T[] {
  return arr?.filter((v) => !omit?.includes(v)) ?? []
}

export const AvatarSizeTable = () => {
  const recipe = useSlotRecipe({ key: "avatar" })
  const sizeMap = omit(recipe.variantMap.size, ["full"])
  return (
    <PlaygroundTable>
      <thead>
        <tr>
          <td />
          <For each={sizeMap}>{(v) => <td key={v}>{v}</td>}</For>
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
              <For each={sizeMap}>
                {(v) => (
                  <td key={v}>
                    <HStack>
                      <Avatar.Root colorPalette={c} size={v}>
                        <Avatar.Image src="https://bit.ly/dan-abramov" />
                        <Avatar.Fallback name="Dan Abramov" />
                      </Avatar.Root>
                      <Avatar.Root colorPalette={c} size={v}>
                        <Avatar.Image />
                        <Avatar.Fallback name="Dan Abramov" />
                      </Avatar.Root>
                      <Avatar.Root colorPalette={c} size={v}>
                        <Avatar.Image />
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
