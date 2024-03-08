import { For, Span, Stack, useSlotRecipe } from "../src"
import { Breadcrumb } from "../src/components/breadcrumb"
import { colorPalettes } from "./shared/color-palettes"
import { PlaygroundTable } from "./shared/playground-table"

export default {
  title: "Components / Breadcrumb",
}

const DemoBreadcrumb = (
  props: Breadcrumb.RootProps & { separator?: React.ReactNode },
) => {
  const { separator, gap, ...restProps } = props
  return (
    <Breadcrumb.Root minW="200px" {...restProps}>
      <Breadcrumb.List gap={gap}>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#">First</Breadcrumb.Link>
        </Breadcrumb.Item>

        <Breadcrumb.Separator>{separator}</Breadcrumb.Separator>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#">Second</Breadcrumb.Link>
        </Breadcrumb.Item>

        <Breadcrumb.Separator>{separator}</Breadcrumb.Separator>
        <Breadcrumb.Item>
          <Breadcrumb.Ellipsis />
        </Breadcrumb.Item>

        <Breadcrumb.Separator>{separator}</Breadcrumb.Separator>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#">Fourth</Breadcrumb.Link>
        </Breadcrumb.Item>

        <Breadcrumb.Separator>{separator}</Breadcrumb.Separator>
        <Breadcrumb.Item>
          <Breadcrumb.CurrentLink>Fifth</Breadcrumb.CurrentLink>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  )
}

export const Variants = () => {
  const recipe = useSlotRecipe("Breadcrumb")
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
                    <Stack>
                      <DemoBreadcrumb variant={v} colorPalette={c} />
                      <DemoBreadcrumb
                        variant={v}
                        colorPalette={c}
                        separator="/"
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

export const Sizes = () => {
  const recipe = useSlotRecipe("Breadcrumb")
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
                    <Stack>
                      <DemoBreadcrumb size={v} colorPalette={c} />
                      <DemoBreadcrumb size={v} colorPalette={c} separator="/" />
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
