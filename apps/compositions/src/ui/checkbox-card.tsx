import { CheckboxCard as ChakraCheckboxCard } from "@chakra-ui/react"
import { Fragment, forwardRef } from "react"

export interface CheckboxCardProps extends ChakraCheckboxCard.RootProps {
  icon?: React.ReactElement
  label?: React.ReactNode
  description?: React.ReactNode
  addon?: React.ReactNode
  indicator?: React.ReactNode | null
  indicatorPlacement?: "start" | "end" | "inside"
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}

export const CheckboxCard = forwardRef<HTMLInputElement, CheckboxCardProps>(
  function CheckboxCard(props, ref) {
    const {
      inputProps,
      label,
      description,
      icon,
      addon,
      indicator = <ChakraCheckboxCard.Indicator />,
      indicatorPlacement = "end",
      ...rest
    } = props

    const hasContent = label || description || icon
    const ContentWrapper = indicator ? ChakraCheckboxCard.Content : Fragment

    return (
      <ChakraCheckboxCard.Root {...rest}>
        <ChakraCheckboxCard.HiddenInput ref={ref} {...inputProps} />
        <ChakraCheckboxCard.Control>
          {indicatorPlacement === "start" && indicator}
          {hasContent && (
            <ContentWrapper>
              {icon}
              {label && (
                <ChakraCheckboxCard.Label>{label}</ChakraCheckboxCard.Label>
              )}
              {description && (
                <ChakraCheckboxCard.Description>
                  {description}
                </ChakraCheckboxCard.Description>
              )}
              {indicatorPlacement === "inside" && indicator}
            </ContentWrapper>
          )}
          {indicatorPlacement === "end" && indicator}
        </ChakraCheckboxCard.Control>
        {addon && <ChakraCheckboxCard.Addon>{addon}</ChakraCheckboxCard.Addon>}
      </ChakraCheckboxCard.Root>
    )
  },
)

export const CheckboxCardIndicator = ChakraCheckboxCard.Indicator
