import { RadioCard } from "@chakra-ui/react"
import { Fragment, forwardRef } from "react"

interface RadioCardItemProps extends RadioCard.ItemProps {
  icon?: React.ReactElement
  label?: React.ReactNode
  description?: React.ReactNode
  addon?: React.ReactNode
  indicator?: React.ReactNode | null
  indicatorPlacement?: "start" | "end" | "inside"
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}

export const RadioCardItem = forwardRef<HTMLInputElement, RadioCardItemProps>(
  function RadioCardItem(props, ref) {
    const {
      inputProps,
      label,
      description,
      addon,
      icon,
      indicator = <RadioCard.ItemIndicator />,
      indicatorPlacement = "end",
      ...rest
    } = props

    const hasContent = label || description || icon
    const ContentWrapper = indicator ? RadioCard.ItemContent : Fragment

    return (
      <RadioCard.Item {...rest}>
        <RadioCard.ItemHiddenInput ref={ref} {...inputProps} />
        <RadioCard.ItemControl>
          {indicatorPlacement === "start" && indicator}
          {hasContent && (
            <ContentWrapper>
              {icon}
              {label && <RadioCard.ItemText>{label}</RadioCard.ItemText>}
              {description && (
                <RadioCard.ItemDescription>
                  {description}
                </RadioCard.ItemDescription>
              )}
              {indicatorPlacement === "inside" && indicator}
            </ContentWrapper>
          )}
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
