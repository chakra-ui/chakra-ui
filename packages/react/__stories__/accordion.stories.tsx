import { Accordion, Box, For, Span, useSlotRecipe } from "../src"
import { colorPalettes } from "./shared/color-palettes"
import { PlaygroundTable } from "./shared/playground-table"

export default {
  title: "Components / Accordion",
  decorators: [(story: Function) => <Box padding="4">{story()}</Box>],
}

const accordionData = [
  { title: "First Item", text: "Some value 1..." },
  { title: "Second Item", text: "Some value 2..." },
  { title: "Third Item", text: "Some value 3..." },
]

const AccordionDemo = (props: Accordion.RootProps) => {
  return (
    <Accordion.Root minW="300px" {...props} defaultValue={["Second Item"]}>
      {accordionData.map((item, index) => (
        <Accordion.Item key={index} value={item.title}>
          <h2>
            <Accordion.Trigger>
              <Box flex="1" textAlign="start">
                {item.title}
              </Box>
              <Accordion.Indicator />
            </Accordion.Trigger>
          </h2>
          <Accordion.Content>{item.text}</Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}

export const Variants = () => {
  const recipe = useSlotRecipe("Accordion")
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
                    <AccordionDemo variant={v} colorPalette={c} />
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
  const recipe = useSlotRecipe("Accordion")
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
                    <AccordionDemo
                      size={v}
                      colorPalette={c}
                      variant="contained"
                    />
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
