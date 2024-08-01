import { BlitzFillIcon } from "@/app/page/icons"
import {
  Box,
  Flex,
  HStack,
  Heading,
  RadioCard,
  Span,
  Stack,
  Text,
} from "@chakra-ui/react"

const items = [
  {
    value: "design-tokens",
    label: "Design tokens",
    description: "Streamline issues, product and project roadmap",
  },
  {
    value: "typography",
    label: "Typography",
    description: "Customise your font related properties in one place.",
  },
  {
    value: "recipes",
    label: "Recipes",
    description: "Design components variants using a simple, intuitive API",
  },
]

export const DesignSystem = () => (
  <Stack gap="12" align="center">
    <Stack gap="6" maxW="xl" align="center">
      <HStack gap="4" color="teal.500">
        <BlitzFillIcon />
        <Text fontWeight="bold">Design Tokens</Text>
      </HStack>
      <Heading size="5xl" fontWeight="bold" textAlign="center">
        Build your design system on top of
        <Span
          color="teal.500"
          pos="relative"
          px="2"
          display="inline-block"
          _before={{
            pos: "absolute",
            content: "''",
            w: "full",
            h: "full",
            bg: "teal.500/10",
            bottom: "-3px",
            left: "0",
            borderRight: "solid 1.5px",
            borderColor: "currentColor",
          }}
        >
          Chakra UI
        </Span>
      </Heading>
    </Stack>
    <RadioCard.Root defaultValue="design-tokens" colorPalette="teal" asChild>
      <Stack gap="8" w="full">
        <Flex px="20" align="center">
          {items.map((item) => (
            <RadioCard.Item
              key={item.value}
              value={item.value}
              bg="transparent"
              rounded="0"
              borderColor="#001B18"
              // mr="-1px"
            >
              <RadioCard.ItemControl
                bg={{ base: "#050D0D/10", _checked: "#050D0D!" }}
              >
                <Stack gap="2">
                  <RadioCard.ItemText fontWeight="medium" color="white!">
                    {item.label}
                  </RadioCard.ItemText>
                  <Text color="gray.400">{item.description}</Text>
                </Stack>
              </RadioCard.ItemControl>
              <RadioCard.ItemHiddenInput />
            </RadioCard.Item>
          ))}
        </Flex>
        <Box bg="#050D0D" rounded="md" h="566px"></Box>
      </Stack>
    </RadioCard.Root>
  </Stack>
)
