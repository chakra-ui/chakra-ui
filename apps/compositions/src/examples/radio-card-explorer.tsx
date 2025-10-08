"use client"

import { HStack, RadioCard } from "@chakra-ui/react"
import { LuCheck } from "react-icons/lu"

export const RadioCardExplorer = () => {
  return (
    <RadioCard.Root defaultValue="next">
      <RadioCard.Label>Select your favorite framework</RadioCard.Label>

      <HStack align="stretch" gap="4" wrap="wrap">
        {items.map((item) => (
          <RadioCard.Item key={item.value} value={item.value} flex="1">
            <RadioCard.ItemHiddenInput />

            <RadioCard.ItemControl>
              <RadioCard.ItemContent>
                <RadioCard.ItemText fontWeight="medium">
                  {item.title}
                </RadioCard.ItemText>
                <RadioCard.ItemDescription fontSize="sm" color="gray.600">
                  {item.description}
                </RadioCard.ItemDescription>
              </RadioCard.ItemContent>

              <RadioCard.ItemIndicator
                borderWidth="0"
                color="green.500"
                checked={<LuCheck />}
              />
            </RadioCard.ItemControl>

            <RadioCard.ItemAddon fontSize="xs" color="gray.500">
              {item.addon}
            </RadioCard.ItemAddon>
          </RadioCard.Item>
        ))}
      </HStack>
    </RadioCard.Root>
  )
}

const items = [
  {
    value: "next",
    title: "Next.js",
    description: "Great for full-stack React apps",
    addon: "Most popular",
  },
  {
    value: "vite",
    title: "Vite",
    description: "Fast and modern build tool for SPAs",
    addon: "Super fast dev server",
  },
  {
    value: "astro",
    title: "Astro",
    description: "Perfect for content-driven static sites",
    addon: "Great for blogs/docs",
  },
]
