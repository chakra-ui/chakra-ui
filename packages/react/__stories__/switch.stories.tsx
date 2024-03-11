import { Box, Field, For, HStack, Span, Switch, useSlotRecipe } from "../src"
import { colorPalettes } from "./shared/color-palettes"
import { PlaygroundTable } from "./shared/playground-table"

export default {
  title: "Components / Switch",
  decorators: [(story: Function) => <Box padding="40px">{story()}</Box>],
}

const DemoSwitch = (props: Switch.RootProps) => {
  return (
    <Switch.Root {...props}>
      <Switch.Track>
        <Switch.Thumb />
      </Switch.Track>
      {props.children && <Switch.Label>{props.children}</Switch.Label>}
    </Switch.Root>
  )
}

export const Variants = () => {
  const recipe = useSlotRecipe("Switch")
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
                      <DemoSwitch variant={v} colorPalette={c} />
                      <DemoSwitch variant={v} colorPalette={c} defaultChecked />
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

export const Sizes = () => {
  const recipe = useSlotRecipe("Switch")
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
                    <HStack>
                      <For each={recipe.variantMap.variant}>
                        {(t) => (
                          <DemoSwitch
                            variant={t}
                            size={v}
                            colorPalette={c}
                            defaultChecked
                          />
                        )}
                      </For>
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

export const WithLabel = () => (
  <Field.Root id="email-alerts">
    <HStack>
      <DemoSwitch colorPalette="green" id="email-alerts" />
      <Field.Label htmlFor="email-alerts">Enable email alerts?</Field.Label>
    </HStack>
  </Field.Root>
)
