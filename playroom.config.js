module.exports = {
  components: "@chakra-ui/layout",
  outputPath: "./dist/playroom",
  title: "Chakra UI",
  // snippets: './playroom/snippets.js',
  frameComponent: "./.playroom/FrameComponent.jsx",
  widths: [320, 768, 1024, 1400],
  exampleCode: `
    <Stack direction={["column", "row"]} spacing="6" divider={<StackDivider color="gray.200"/>}>
      <Box bg="green.500" padding="40px" color="white">Welcome</Box>
      <Box p="40px" bg="red.100">Welcome</Box>
    </Stack>
  `,
}
