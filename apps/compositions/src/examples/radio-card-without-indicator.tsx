import { HStack, Icon } from "@chakra-ui/react"
import {
  RadioCardItem,
  RadioCardLabel,
  RadioCardRoot,
} from "compositions/ui/radio-card"
import { RiAppleFill, RiBankCardFill, RiPaypalFill } from "react-icons/ri"

export const RadioCardWithoutIndicator = () => {
  return (
    <RadioCardRoot
      orientation="horizontal"
      align="center"
      justify="center"
      maxW="lg"
      defaultValue="paypal"
    >
      <RadioCardLabel>Payment method</RadioCardLabel>
      <HStack align="stretch">
        {items.map((item) => (
          <RadioCardItem
            label={item.title}
            icon={
              <Icon fontSize="2xl" color="fg.subtle">
                {item.icon}
              </Icon>
            }
            indicator={false}
            key={item.value}
            value={item.value}
          />
        ))}
      </HStack>
    </RadioCardRoot>
  )
}

const items = [
  { value: "paypal", title: "Paypal", icon: <RiPaypalFill /> },
  { value: "apple-pay", title: "Apple Pay", icon: <RiAppleFill /> },
  { value: "card", title: "Card", icon: <RiBankCardFill /> },
]
