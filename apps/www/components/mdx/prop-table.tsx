import { deepMerge } from "@/lib/deep-merge"
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
import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { LuMinus } from "react-icons/lu"
import { kebabCase } from "scule"

interface PropTableProps {
  component: string
  part?: string
  omit?: string[]
}

interface Properties {
  type: string
  isRequired: boolean
  defaultValue?: string | undefined
  description?: string | undefined
}

const stringify = (value: any) => {
  if (value === "true") return `true`
  if (value === "false") return `false`
  return JSON.stringify(value)
}

const sortEntries = (props: Record<string, any>): [string, Properties][] => {
  return Object.entries(props).sort(([, a], [, b]) => {
    if (a.isRequired && !b.isRequired) return -1
    if (!a.isRequired && b.isRequired) return 1
    if (a.defaultValue && !b.defaultValue) return -1
    if (!a.defaultValue && b.defaultValue) return 1
    return 0
  })
}

function getType(baseDir: string, componentName?: string): Record<string, any> {
  const path = join(
    process.cwd(),
    "public",
    "types",
    baseDir,
    `${componentName}.json`,
  )
  if (!existsSync(path)) return {}
  return JSON.parse(readFileSync(path, "utf-8"))
}

async function getComponentTypes(component: string) {
  const componentName = kebabCase(component)
  const arkTypes = getType("ark", componentName)
  const recipeTypes = getType("recipe", componentName)
  const componentTypes = getType("component", componentName)
  const staticTypes = getType("static", componentName)
  return deepMerge({}, arkTypes, recipeTypes, componentTypes, staticTypes)
}

export const PropTable = async (props: PropTableProps) => {
  const { component, part, omit } = props

  const componentTypes = await getComponentTypes(component)
  const componentType = part ? componentTypes[part] : componentTypes

  if (!componentType?.props) return null

  const properties = sortEntries(componentType.props).filter(
    ([name]) => !omit?.includes(name),
  )

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
                        <NextLink href={`/docs/guides/composition`}>
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
