import { Badge, Box, Text, Wrap, WrapItem } from "../src"

export default {
  title: "Layout / Wrap",
}

export const basic = () => (
  <Wrap gap={["5", "8", "56px"]}>
    <WrapItem>
      <Badge>Badge 1</Badge>
    </WrapItem>
    <WrapItem>
      <Badge>Badge 2</Badge>
    </WrapItem>
    <WrapItem>
      <Badge>Badge 3</Badge>
    </WrapItem>
    <WrapItem>
      <Badge>Badge 4</Badge>
    </WrapItem>
  </Wrap>
)
const Placeholder = (props: any) => (
  <WrapItem>
    <div
      style={{
        height: 48,
        width: props.width || 48,
        background: "red",
      }}
      {...props}
    />
  </WrapItem>
)

export const placeholder = () => (
  <Wrap bg="pink" gap={5}>
    <Placeholder />
    <Placeholder />
    <Placeholder />
    <Placeholder />
    <Placeholder />
    <Placeholder />
    <Placeholder />
    <Placeholder />
    <Placeholder />
    <Placeholder />
    <Placeholder />
  </Wrap>
)

export const responsive = () => (
  <Wrap gap={["12px", "24px"]} justify={["center", "flex-start"]}>
    <Placeholder />
    <Placeholder />
    <Placeholder />
    <Placeholder />
    <Placeholder />
    <Placeholder />
    <Placeholder />
    <Placeholder />
    <Placeholder />
    <Placeholder />
    <Placeholder />
  </Wrap>
)

export const horizontalAndVertical = () => (
  <Wrap bg="pink" rowGap={["0px", "24px"]} columnGap={["4px", "12px"]}>
    <Placeholder />
    <Placeholder />
    <Placeholder />
    <Placeholder />
    <Placeholder />
    <Placeholder />
    <Placeholder />
    <Placeholder />
    <Placeholder />
    <Placeholder />
    <Placeholder />
  </Wrap>
)

export const withZeroXSpacing = () => (
  <Box>
    <Text>Welcome</Text>
    <Box bg="pink">
      <Wrap maxW="200px" columnGap="0" rowGap="4">
        <Placeholder />
        <Placeholder />
        <Placeholder />
        <Placeholder />
        <Placeholder />
        <Placeholder />
        <Placeholder />
        <Placeholder />
        <Placeholder />
        <Placeholder />
        <Placeholder />
      </Wrap>
    </Box>
    <Text>Welcome</Text>
  </Box>
)
