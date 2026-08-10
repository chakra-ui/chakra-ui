"use client"

import { HStack, Icon, RadioCard, useBreakpointValue } from "@chakra-ui/react"
import { RiAppleFill, RiBankCardFill, RiPaypalFill } from "react-icons/ri"

export const RadioCardWithResponsiveOrientation = () => {
  const orientation = useBreakpointValue<"horizontal" | "vertical">({
    base: "horizontal",
    md: "vertical",
  })

  return (
    <RadioCard.Root
      orientation={orientation}
      align="center"
      maxW="400px"
      defaultValue="paypal"
    >
      <RadioCard.Label>Payment method</RadioCard.Label>
      <HStack>
        {items.map((item) => (
          <RadioCard.Item key={item.value} value={item.value}>
            <RadioCard.ItemHiddenInput />
            <RadioCard.ItemControl>
              <Icon fontSize="2xl" color="fg.muted">
                {item.icon}
              </Icon>
              <RadioCard.ItemText>{item.title}</RadioCard.ItemText>
            </RadioCard.ItemControl>
          </RadioCard.Item>
        ))}
      </HStack>
    </RadioCard.Root>
  )
}

const items = [
  { value: "paypal", title: "Paypal", icon: <RiPaypalFill /> },
  { value: "apple-pay", title: "Apple Pay", icon: <RiAppleFill /> },
  { value: "card", title: "Card", icon: <RiBankCardFill /> },
]
