"use client"

import { Code, Table, defaultSystem } from "@chakra-ui/react"

const conditionEntries = Object.entries(defaultSystem._config.conditions ?? {})

export const ConditionalStylesReferenceDoc = () => {
  return (
    <Table.Root size="sm">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Condition name</Table.ColumnHeader>
          <Table.ColumnHeader>Selector</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {conditionEntries.map(([conditionName, selector]) => (
          <Table.Row key={conditionName}>
            <Table.Cell>
              <Code>_{conditionName}</Code>
            </Table.Cell>
            <Table.Cell>
              <Code>{selector}</Code>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}
