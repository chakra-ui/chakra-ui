import { Flex, HStack, RadioCard, Stack, Text, chakra } from "../src"

export default {
  title: "Components / Radio Card",
  decorators: [
    (story: Function) => (
      <chakra.div mt="40px" mx="10">
        {story()}
      </chakra.div>
    ),
  ],
}

const RadioCardItem = (props: RadioCard.ItemProps) => {
  const { children, ...rest } = props
  return (
    <RadioCard.Item {...rest}>
      <RadioCard.ItemControl>{children}</RadioCard.ItemControl>
      <RadioCard.ItemHiddenInput />
    </RadioCard.Item>
  )
}

const items = [
  {
    value: "standard",
    label: "Standard",
    description: "4 - 10 business days",
  },
  {
    value: "express",
    label: "Express",
    description: "2 - 4 business days",
  },
]

export const Basic = () => {
  return (
    <RadioCard.Root defaultValue="standard" colorPalette="pink">
      <RadioCard.Label mb="3" fontSize="sm">
        Shipping method
      </RadioCard.Label>
      <HStack gap="4">
        {items.map((item) => (
          <RadioCardItem key={item.value} value={item.value}>
            <Flex gap="4">
              <Stack gap="1">
                <RadioCard.ItemText fontWeight="medium">
                  {item.label}
                </RadioCard.ItemText>
                <Text>{item.description}</Text>
              </Stack>
              <RadioCard.ItemIndicator />
            </Flex>
          </RadioCardItem>
        ))}
      </HStack>
    </RadioCard.Root>
  )
}
