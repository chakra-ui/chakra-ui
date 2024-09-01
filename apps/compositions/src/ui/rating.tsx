import { RatingGroup } from "@chakra-ui/react"
import { forwardRef } from "react"

export interface RatingProps extends RatingGroup.RootProps {
  icon?: React.ReactElement
  count?: number
  label?: React.ReactNode
}

export const Rating = forwardRef<HTMLDivElement, RatingProps>(
  function Rating(props, ref) {
    const { icon, count = 5, label, ...rest } = props
    return (
      <RatingGroup.Root ref={ref} count={count} {...rest}>
        {label && <RatingGroup.Label>{label}</RatingGroup.Label>}
        <RatingGroup.HiddenInput />
        <RatingGroup.Control>
          {Array.from({ length: count }).map((_, index) => (
            <RatingGroup.Item key={index} index={index + 1}>
              <RatingGroup.ItemIndicator icon={icon} />
            </RatingGroup.Item>
          ))}
        </RatingGroup.Control>
      </RatingGroup.Root>
    )
  },
)
