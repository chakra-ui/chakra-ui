import { For, Span, useSlotRecipe } from "../src"
import { Table } from "../src/components/table"
import { colorPalettes } from "./shared/color-palettes"
import { PlaygroundTable } from "./shared/playground-table"

export default {
  title: "Components / Table",
}

const DemoTable = (props: Table.RootProps) => (
  <Table.Root {...props}>
    <Table.Header>
      <Table.Row>
        <Table.ColumnHeader>Name</Table.ColumnHeader>
        <Table.ColumnHeader>Email</Table.ColumnHeader>
        <Table.ColumnHeader numeric>Award Count</Table.ColumnHeader>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell>John Doe</Table.Cell>
        <Table.Cell>johndoe@gmail.com</Table.Cell>
        <Table.Cell numeric>10</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Jane Doe</Table.Cell>
        <Table.Cell>janedoe@gmail.com</Table.Cell>
        <Table.Cell numeric>2</Table.Cell>
      </Table.Row>
      <Table.Row data-selected="">
        <Table.Cell>Jack Doe</Table.Cell>
        <Table.Cell>jackdoe@gmail.com</Table.Cell>
        <Table.Cell numeric>9</Table.Cell>
      </Table.Row>
    </Table.Body>
    <Table.Footer>
      <Table.Row>
        <Table.Cell colSpan={2}>Total</Table.Cell>
        <Table.Cell>15</Table.Cell>
      </Table.Row>
    </Table.Footer>
  </Table.Root>
)

export const Variants = () => {
  const recipe = useSlotRecipe("Table")
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
                    <DemoTable showColumnBorder variant={v} colorPalette={c} />
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
  const recipe = useSlotRecipe("Table")
  return (
    <PlaygroundTable>
      <thead>
        <tr>
          <td />
          <For each={recipe.variantMap.size}>{(v) => <td>{v}</td>}</For>
        </tr>
      </thead>
      <tbody>
        <For each={recipe.variantMap.variant}>
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
                    <DemoTable size={v} variant={c} striped />
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
