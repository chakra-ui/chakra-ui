import { Badge, Box, Code, HStack } from "@chakra-ui/react"
import { readFile } from "fs/promises"
import { kebabCase } from "scule"

interface Props {
  component: string
  part?: string
}

const stringify = (value: any) => {
  if (value === "true") return `true`
  if (value === "false") return `false`
  return JSON.stringify(value)
}

const sortEntries = (props: Record<string, any>) => {
  return Object.entries(props).sort(([, a], [, b]) => {
    if (a.isRequired && !b.isRequired) return -1
    if (!a.isRequired && b.isRequired) return 1
    if (a.defaultValue && !b.defaultValue) return -1
    if (!a.defaultValue && b.defaultValue) return 1
    return 0
  })
}

export const PropTable = async (props: Props) => {
  const { component, part } = props

  const fileContent = await readFile(
    `public/types/${kebabCase(component)}.json`,
    "utf-8",
  )

  const json = JSON.parse(fileContent)

  const propTypes = part ? json[part] : json

  if (!propTypes) {
    return null
  }

  return (
    <Box divideY="0.5px">
      {sortEntries(propTypes.props).map(([key, value]) => (
        <Box py="4" key={key}>
          <HStack>
            <Box>{key}</Box>
            {value.isRequired && <Badge colorPalette="red">required</Badge>}
            <Code variant="surface" lineClamp="1" colorPalette="teal">
              {value.type}
            </Code>
            {value.defaultValue && (
              <Code whiteSpace="nowrap">
                default: {stringify(value.defaultValue)}
              </Code>
            )}
          </HStack>
          <Box color="fg.subtle" mt="2">
            {value.description}
          </Box>
        </Box>
      ))}
    </Box>
  )
}
