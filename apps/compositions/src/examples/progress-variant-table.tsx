"use client"

import {
  For,
  type ProgressRootProps,
  Span,
  Stack,
  useSlotRecipe,
} from "@chakra-ui/react"
import { colorPalettes } from "compositions/lib/color-palettes"
import { PlaygroundTable } from "compositions/lib/playground-table"
import { ProgressBar, ProgressRoot } from "compositions/ui/progress"

export const ProgressVariantTable = () => {
  const recipe = useSlotRecipe({ key: "progress" })
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
                    <Stack minW="200px">
                      <DemoProgress colorPalette={c} variant={v} value={65} />
                      <DemoProgress
                        colorPalette={c}
                        variant={v}
                        striped
                        value={65}
                      />
                      <DemoProgress
                        colorPalette={c}
                        variant={v}
                        striped
                        animated
                        value={65}
                      />
                    </Stack>
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

export const DemoProgress = (props: ProgressRootProps) => {
  return (
    <ProgressRoot {...props}>
      <ProgressBar />
    </ProgressRoot>
  )
}
