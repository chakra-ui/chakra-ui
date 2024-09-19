import { Icon, RadioCard, Stack, Text } from "@chakra-ui/react"
import { forwardRef } from "react"

interface RadioCardItemProps extends RadioCard.ItemProps {
  icon?: React.ReactElement
  iconColor?: RadioCard.ItemProps["color"]
  label?: React.ReactNode
  description?: React.ReactNode
  children?: React.ReactNode
  addon?: React.ReactNode
  indicator?: React.ReactNode | null
  indicatorPlacement?: "start" | "end" | "inside"
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
  align?: RadioCard.ItemControlProps["alignItems"]
  justify?: RadioCard.ItemControlProps["justifyContent"]
  vertical?: boolean
}

export const RadioCardItem = forwardRef<HTMLInputElement, RadioCardItemProps>(
  function RadioCardItem(props, ref) {
    const {
      inputProps,
      label,
      description,
      icon,
      iconColor = "fg.subtle",
      addon,
      indicator = <RadioCard.ItemIndicator />,
      indicatorPlacement = "end",
      align = "start",
      justify,
      vertical,
      ...rest
    } = props

    const hasContent = label || description || icon

    return (
      <RadioCard.Item {...rest}>
        <RadioCard.ItemHiddenInput ref={ref} {...inputProps} />
        <RadioCard.ItemControl
          alignItems={align}
          justifyContent={justify}
          flexDirection={vertical ? "column" : "row"}
        >
          {indicatorPlacement === "start" && indicator}
          <Stack
            hidden={!hasContent}
            gap="1"
            flex="1"
            alignItems={align}
            justifyContent={justify}
          >
            {icon && (
              <Icon asChild fontSize="2xl" color={iconColor} mb="2">
                {icon}
              </Icon>
            )}
            {label && <RadioCard.ItemText>{label}</RadioCard.ItemText>}
            {description && (
              <Text opacity="0.64" textStyle="sm">
                {description}
              </Text>
            )}
            {indicatorPlacement === "inside" && indicator}
          </Stack>
          {indicatorPlacement === "end" && indicator}
        </RadioCard.ItemControl>
        {addon && <RadioCard.ItemAddon>{addon}</RadioCard.ItemAddon>}
      </RadioCard.Item>
    )
  },
)

export const RadioCardRoot = RadioCard.Root
export const RadioCardLabel = RadioCard.Label
export const RadioCardItemIndicator = RadioCard.ItemIndicator
