import { Table } from "../src/components/table"

export default {
  title: "Data Display / Table",
}

const SimpleTable = (props: Table.RootProps) => (
  <Table.Root {...props}>
    <Table.Caption>Imperial to metric conversion factors</Table.Caption>

    <Table.Header>
      <Table.Row>
        <Table.ColumnHeader>To convert</Table.ColumnHeader>
        <Table.ColumnHeader>into</Table.ColumnHeader>
        <Table.ColumnHeader numeric>multiply by</Table.ColumnHeader>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
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
  </Table.Root>
)

export const simpleSM = () => <SimpleTable size="sm" />

export const simpleMD = () => <SimpleTable size="md" />

export const simpleLG = () => <SimpleTable size="lg" />

export const stripedSM = () => <SimpleTable variant="striped" size="sm" />

export const stripedMD = () => <SimpleTable variant="striped" size="md" />

export const stripedLG = () => <SimpleTable variant="striped" size="lg" />

export const unstyled = () => <SimpleTable variant="unstyled" size="none" />

export const withOverflow = () => (
  <Table.Overflow maxW={{ base: "400px", lg: "unset" }}>
    <SimpleTable />
  </Table.Overflow>
)
