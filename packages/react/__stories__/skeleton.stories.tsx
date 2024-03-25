import { useEffect, useState } from "react"
import { Box, Circle, For, HStack, Span, Stack, useRecipe } from "../src"
import { Skeleton } from "../src/components/skeleton"
import { colorPalettes } from "./shared/color-palettes"
import { PlaygroundTable } from "./shared/playground-table"

export default {
  title: "Components / Skeleton",
  decorators: [(Story: any) => <Box padding="40px">{<Story />}</Box>],
}

export const Variants = () => {
  const recipe = useRecipe("Skeleton")
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
                    <HStack gap="4" minW="320px">
                      <Skeleton variant={v} borderRadius="full">
                        <Circle size="20" />
                      </Skeleton>
                      <Stack gap="3.5" width="full">
                        <Skeleton variant={v} h="4" />
                        <Skeleton variant={v} h="4" width="80%" />
                        <Skeleton variant={v} h="4" width="60%" />
                      </Stack>
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

export const WithFade = () => {
  const [hasLoaded, setHasLoaded] = useState(false)

  useEffect(() => {
    setTimeout(() => setHasLoaded(true), 1000)
  }, [])

  return (
    <Skeleton isLoaded={hasLoaded} width="fit-content">
      <span>Chakra ui is cool</span>
    </Skeleton>
  )
}
