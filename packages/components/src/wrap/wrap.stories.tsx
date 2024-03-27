import { Badge, Box, Text, Wrap, WrapItem } from ".."

export default {
  title: "Layout / Wrap",
}

export const basic = () => (
  <Wrap spacing={["5", "8", "56px"]}>
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
  <Wrap bg="pink" spacing={5}>
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
  <Wrap spacing={["12px", "24px"]} justify={["center", "flex-start"]}>
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
  <Wrap bg="pink" spacingY={["0px", "24px"]} spacingX={["4px", "12px"]}>
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
      <Wrap maxW="200px" spacingX="0" spacingY="4">
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
