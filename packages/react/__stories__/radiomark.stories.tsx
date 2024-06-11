import { Radiomark, Stack, chakra } from "../src"

export default {
  title: "Components / Radiomark",
  decorators: [
    (story: Function) => (
      <chakra.div maxW="500px" mt="40px" mx="auto">
        {story()}
      </chakra.div>
    ),
  ],
}

export const Demo = () => {
  return (
    <Stack colorPalette="gray">
      <Radiomark />
      <Radiomark checked />
      <Radiomark disabled />
      <Radiomark checked disabled />
    </Stack>
  )
}
