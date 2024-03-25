import { Blockquote, For, Span, useSlotRecipe } from "../src"
import { colorPalettes } from "./shared/color-palettes"
import { PlaygroundTable } from "./shared/playground-table"

export default {
  title: "Components / Blockquote",
}

const DemoBlockquote = (props: Blockquote.RootProps) => (
  <Blockquote.Root {...props}>
    <Blockquote.Content cite="#">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, sapiente.
    </Blockquote.Content>
    <Blockquote.Caption>
      — Blockquote Caption, <cite>Book</cite>
    </Blockquote.Caption>
  </Blockquote.Root>
)

export const Variants = () => {
  const recipe = useSlotRecipe("Blockquote")
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
                    <DemoBlockquote variant={v} colorPalette={c} />
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
