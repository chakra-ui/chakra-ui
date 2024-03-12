import { Box, Separator, Stack, StackSeparator } from "../src"
import { DecorativeBox } from "./shared/decorative-box"

export default {
  title: "Layout / Stack",
}

export const Vertical = () => (
  <Stack>
    <DecorativeBox height="20" />
    <DecorativeBox height="20" />
    <DecorativeBox height="20" />
  </Stack>
)

export const Horizontal = () => (
  <Stack height="20" direction="row">
    <DecorativeBox width="full" />
    <DecorativeBox width="full" />
    <DecorativeBox width="full" />
  </Stack>
)

export const WithCustomDivider = () => (
  <Stack separator={<Separator css={{ borderColor: "red.200" }} />}>
    <DecorativeBox height="20" />
    <DecorativeBox height="20" />
    <DecorativeBox height="20" />
  </Stack>
)

export const WithResponsiveDirection = () => (
  <Stack direction={["column", "row"]} gap="40px" w="100%">
    <DecorativeBox boxSize="20" />
    <DecorativeBox boxSize="20" />
    <DecorativeBox boxSize="20" />
  </Stack>
)

export const WithResponsiveDivider = () => (
  <Stack
    mt={10}
    direction={["column", "row"]}
    separator={
      <StackSeparator borderColor={{ base: "green.500", md: "red.200" }} />
    }
    gap={4}
  >
    <DecorativeBox flex="1" w={["100%", "40px"]} h="40px">
      1
    </DecorativeBox>
    <DecorativeBox flex="1" w={["100%", "40px"]} h="40px">
      2
    </DecorativeBox>
    <DecorativeBox flex="1" w={["100%", "40px"]} h="40px">
      3
    </DecorativeBox>
  </Stack>
)

export const WithDivider = () => (
  <>
    <Stack separator={<StackSeparator />} gap={4}>
      <Box boxSize="40px" bg="yellow.200">
        1
      </Box>
      <Box boxSize="40px" bg="tomato">
        2
      </Box>
      <Box boxSize="40px" bg="pink.100">
        3
      </Box>
    </Stack>

    <Stack mt={10} direction="row" separator={<StackSeparator />} gap={4}>
      <Box boxSize="40px" bg="yellow.200">
        1
      </Box>
      <Box boxSize="40px" bg="tomato">
        2
      </Box>
      <Box boxSize="40px" bg="pink.100">
        3
      </Box>
    </Stack>
  </>
)
