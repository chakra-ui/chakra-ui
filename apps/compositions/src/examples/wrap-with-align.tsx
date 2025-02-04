import { Center, Wrap, WrapItem } from "@chakra-ui/react"

export const WrapWithAlign = () => (
  <Wrap gap="30px" align="center">
    {Array.from({ length: 5 }).map((_, index) => (
      <WrapItem key={index}>
        <Center w="180px" h="80px" bg="red.muted">
          Box {index + 1}
        </Center>
      </WrapItem>
    ))}
  </Wrap>
)
