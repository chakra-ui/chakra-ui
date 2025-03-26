import { HStack, Icon, RadioCard } from "@chakra-ui/react"
import { RiAppleFill, RiBankCardFill, RiPaypalFill } from "react-icons/ri"

export const RadioCardWithoutIndicator = () => {
  return (
    <RadioCard.Root
      orientation="horizontal"
      align="center"
      justify="center"
      maxW="lg"
      defaultValue="paypal"
    >
      <RadioCard.Label>Payment method</RadioCard.Label>
      <HStack align="stretch">
        {items.map((item) => (
          <RadioCard.Item key={item.value} value={item.value}>
            <RadioCard.ItemHiddenInput />
            <RadioCard.ItemControl>
              <Icon fontSize="2xl" color="fg.subtle">
                {item.icon}
              </Icon>
              <RadioCard.ItemText ms="-4">{item.title}</RadioCard.ItemText>
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
