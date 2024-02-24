import { Table } from "."

export default {
  title: "Data Display / Table / Double Header",
}

const DoubleHeaderTable = (props: Table.RootProps) => (
  <Table.Root {...props}>
    <Table.Caption>Imperial to metric conversion factors</Table.Caption>
    <Table.Header>
      <Table.Row>
        <Table.ColumnHeader aria-hidden />
        <Table.ColumnHeader>To convert</Table.ColumnHeader>
        <Table.ColumnHeader>into</Table.ColumnHeader>
        <Table.ColumnHeader numeric>multiply by</Table.ColumnHeader>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.ColumnHeader rowSpan={4}>Length</Table.ColumnHeader>
        <Table.Cell>inches</Table.Cell>
        <Table.Cell>millimetres (mm)</Table.Cell>
        <Table.Cell numeric>25.4</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>feet</Table.Cell>
        <Table.Cell>centimetres (cm)</Table.Cell>
        <Table.Cell numeric>30.48</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>yards</Table.Cell>
        <Table.Cell>metres (m)</Table.Cell>
        <Table.Cell numeric>0.91444</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>miles</Table.Cell>
        <Table.Cell>kilometres (km)</Table.Cell>
        <Table.Cell numeric>1.61</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.ColumnHeader rowSpan={4}>Area</Table.ColumnHeader>
        <Table.Cell>square inches</Table.Cell>
        <Table.Cell>sq. millimetres (mm²)</Table.Cell>
        <Table.Cell numeric>645</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>square feet</Table.Cell>
        <Table.Cell>square metres (m²)</Table.Cell>
        <Table.Cell numeric>0.0929</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>square yards</Table.Cell>
        <Table.Cell>square metres (m²)</Table.Cell>
        <Table.Cell numeric>0.836</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>acres</Table.Cell>
        <Table.Cell>hectares</Table.Cell>
        <Table.Cell numeric>2.47</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.ColumnHeader rowSpan={4}>Volume</Table.ColumnHeader>
        <Table.Cell>cubic inches</Table.Cell>
        <Table.Cell>millilitres (ml)</Table.Cell>
        <Table.Cell numeric>16.4</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>cubic feet</Table.Cell>
        <Table.Cell>litres</Table.Cell>
        <Table.Cell numeric>28.3</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>imperial gallons</Table.Cell>
        <Table.Cell>litres</Table.Cell>
        <Table.Cell numeric>4.55</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <abbr>US</abbr> barrels
        </Table.Cell>
        <Table.Cell>cubic metres (m³)</Table.Cell>
        <Table.Cell numeric>0.159</Table.Cell>
      </Table.Row>
    </Table.Body>
    <Table.Footer>
      <Table.Row>
        <Table.ColumnHeader aria-hidden />
        <Table.ColumnHeader>To convert</Table.ColumnHeader>
        <Table.ColumnHeader>into</Table.ColumnHeader>
        <Table.ColumnHeader numeric>multiply by</Table.ColumnHeader>
      </Table.Row>
    </Table.Footer>
  </Table.Root>
)

export const simpleSM = () => <DoubleHeaderTable size="sm" />
export const simpleMD = () => <DoubleHeaderTable size="md" />
export const simpleLG = () => <DoubleHeaderTable size="lg" />

export const stripedSM = () => <DoubleHeaderTable variant="striped" size="sm" />
export const stripedMD = () => <DoubleHeaderTable variant="striped" size="md" />
export const stripedLG = () => <DoubleHeaderTable variant="striped" size="lg" />

export const unstyled = () => (
  <DoubleHeaderTable variant="unstyled" size="none" />
)
