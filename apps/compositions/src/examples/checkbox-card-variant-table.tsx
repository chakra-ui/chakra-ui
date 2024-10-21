"use client"

import {
  type CheckboxCardRootProps,
  For,
  Span,
  Stack,
  useSlotRecipe,
} from "@chakra-ui/react"
import { colorPalettes } from "compositions/lib/color-palettes"
import { PlaygroundTable } from "compositions/lib/playground-table"
import { CheckboxCard } from "compositions/ui/checkbox-card"

export const CheckboxCardVariantTable = () => {
  const recipe = useSlotRecipe({ key: "checkboxCard" })
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
                    <Stack gap="4">
                      <DemoCheckboxCard variant={v} colorPalette={c} />
                      <DemoCheckboxCard
                        variant={v}
                        colorPalette={c}
                        defaultChecked
                      />
                      <DemoCheckboxCard
                        variant={v}
                        colorPalette={c}
                        defaultChecked
                        disabled
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

const DemoCheckboxCard = (props: CheckboxCardRootProps) => {
  return (
    <CheckboxCard
      label="Next.js"
      description="Best for apps"
      maxW="240px"
      {...props}
    />
  )
}
