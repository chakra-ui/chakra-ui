import { Badge, Box, Code, HStack } from "@chakra-ui/react"
import { kebabCase } from "scule"

interface Props {
  component: string
  part?: string
}

export const PropTable = async (props: Props) => {
  const { component, part } = props
  const json = await fetch(
    `http://localhost:3001/api/types/${kebabCase(component)}`,
  ).then((res) => res.json())

  const propTypes = part ? json[part] : json

  if (!propTypes) {
    return null
  }

  return (
    <Box divideY="0.5px">
      {Object.entries(propTypes.props).map(([key, value]: any[]) => (
        <Box py="4" key={key}>
          <HStack>
            <Box>{key}</Box>
            {value.isRequired && <Badge colorPalette="red">required</Badge>}
            <Code variant="outline" lineClamp="1" colorPalette="teal">
              {value.type}
            </Code>
          </HStack>
          {/* <div>{value.defaultValue}</div> */}
          <Box color="fg.subtle" mt="2">
            {value.description}
          </Box>
        </Box>
      ))}
    </Box>
  )
}
