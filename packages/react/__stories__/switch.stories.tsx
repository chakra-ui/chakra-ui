import { Box, For, HStack, Span, Switch, useSlotRecipe } from "../src"
import { colorPalettes } from "./shared/color-palettes"
import { PlaygroundTable } from "./shared/playground-table"

export default {
  title: "Components / Switch",
  decorators: [(story: Function) => <Box padding="40px">{story()}</Box>],
}

const DemoSwitch = (props: Switch.RootProps) => {
  return (
    <Switch.Root {...props}>
      <Switch.HiddenInput />
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      {props.children && (
        <Switch.Label fontWeight="medium">{props.children}</Switch.Label>
      )}
    </Switch.Root>
  )
}

export const Variants = () => {
  const recipe = useSlotRecipe("switch")
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
  const recipe = useSlotRecipe("switch")
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
  <DemoSwitch colorPalette="green" id="email-alerts">
    Enable email alerts?
  </DemoSwitch>
)
