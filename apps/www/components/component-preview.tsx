import { Box } from "@chakra-ui/react"
import { ExampleCode, ExampleCodeWrapper, ExamplePreview } from "./example"

interface Props {
  name: string
}

export const ComponentPreview = (props: Props) => {
  const { name } = props
  return (
    <Box borderWidth="1px" rounded="lg" overflow="hidden" divideY="1px">
      <Box padding="10">
        <ExamplePreview name={name} />
      </Box>
      <ExampleCodeWrapper maxHeight="400px">
        <ExampleCode name={name} />
      </ExampleCodeWrapper>
    </Box>
  )
}
