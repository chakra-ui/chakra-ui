import { getComponentProps } from "@/utils/get-component-props"
import {
  Box,
  Code,
  Icon,
  Link,
  Span,
  Stack,
  Table,
  Text,
} from "@chakra-ui/react"
import NextLink from "next/link"
import { LuMinus } from "react-icons/lu"

interface PropTableProps {
  component: string
  part?: string
  omit?: string[]
}

const stringify = (value: any) => {
  if (value === "true") return `true`
  if (value === "false") return `false`
  return JSON.stringify(value)
}

export const PropTable = async (props: PropTableProps) => {
  const properties = getComponentProps(props)

  if (!properties) return null

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflowX="auto"
      className="not-prose"
      my="8"
    >
      <Table.Root variant="outline" size="sm" border={0}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader px="4" bg="gray.2" h="10">
              Prop
            </Table.ColumnHeader>
            <Table.ColumnHeader px="4" bg="gray.2" h="10">
              Default
            </Table.ColumnHeader>
            <Table.ColumnHeader px="4" bg="gray.2" h="10">
              Type
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {properties.length === 0 && (
            <Table.Row>
              <Table.Cell colSpan={3}>
                <Text>No props to display</Text>
              </Table.Cell>
            </Table.Row>
          )}
          {properties.map(([name, property]) => (
            <Table.Row key={name}>
              <Table.Cell width="36" px="4" py="2" verticalAlign="top">
                <Code size="sm" variant="surface" fontWeight="bold">
                  {name}{" "}
                </Code>
                {property.isRequired && (
                  <Span color="fg.error" ms="1">
                    *
                  </Span>
                )}
              </Table.Cell>
              <Table.Cell width="28" px="4" py="2" verticalAlign="top">
                {property.defaultValue ? (
                  <Code size="sm" color="accent.fg" variant="surface">
                    {stringify(property.defaultValue).replaceAll('"', "'")}
                  </Code>
                ) : (
                  <Icon fontSize="xs" color="fg.subtle">
                    <LuMinus />
                  </Icon>
                )}
              </Table.Cell>
              <Table.Cell px="4" py="2" verticalAlign="top">
                <Stack gap="2" align="start">
                  <Code size="sm" variant="surface" color="accent.fg">
                    {property.type.replaceAll('"', "'")}
                  </Code>
                  <Text fontSize="sm">{property.description}</Text>
                  {name === "asChild" && (
                    <Text as="span">
                      For more details, read our{" "}
                      <Link asChild>
                        <NextLink
                          href={`/docs/components/concepts/composition`}
                        >
                          Composition
                        </NextLink>
                      </Link>{" "}
                      guide.
                    </Text>
                  )}
                </Stack>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  )
}
