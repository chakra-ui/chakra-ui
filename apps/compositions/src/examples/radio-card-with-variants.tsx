import { For, HStack, Stack } from "@chakra-ui/react"
import {
  RadioCardItem,
  RadioCardItemText,
  RadioCardLabel,
  RadioCardRoot,
} from "compositions/ui/radio-card"

const items = [
  { value: "next", title: "Next.js" },
  { value: "vite", title: "Vite" },
]

export const RadioCardWithVariants = () => {
  return (
    <Stack gap="8">
      <For each={["plain", "subtle", "outline"]}>
        {(variant) => (
          <RadioCardRoot
            colorPalette="teal"
            key={variant}
            variant={variant}
            defaultValue="next"
          >
            <RadioCardLabel>variant = ({variant})</RadioCardLabel>
            <HStack mt="2" align="stretch" width="full">
              {items.map((item) => (
                <RadioCardItem key={item.value} value={item.value} flex="1">
                  <RadioCardItemText flex="1" fontWeight="medium">
                    {item.title}
                  </RadioCardItemText>
                </RadioCardItem>
              ))}
            </HStack>
          </RadioCardRoot>
        )}
      </For>
    </Stack>
  )
}
