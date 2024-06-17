"use client"

import {
  RatingGroup as ArkRatingGroup,
  useRatingGroupItemContext,
} from "@ark-ui/react/rating-group"
import { cloneElement, forwardRef, isValidElement } from "react"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  chakra,
  createStyleContext,
} from "../../styled-system"
import { createIcon } from "../icon"

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useRatingGroupStyles,
} = createStyleContext("ratingGroup")

export { useRatingGroupStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface RatingGroupRootProps
  extends HTMLChakraProps<"div", ArkRatingGroup.RootBaseProps>,
    SlotRecipeProps<"ratingGroup">,
    UnstyledProp {}

export const RatingGroupRoot = withProvider<
  HTMLDivElement,
  RatingGroupRootProps
>(ArkRatingGroup.Root, "root", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface RatingGroupLabelProps
  extends HTMLChakraProps<"div", ArkRatingGroup.LabelBaseProps> {}

export const RatingGroupLabel = withContext<
  HTMLDivElement,
  RatingGroupLabelProps
>(ArkRatingGroup.Label, "label", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface RatingGroupControlProps
  extends HTMLChakraProps<"div", ArkRatingGroup.ControlBaseProps> {}

export const RatingGroupControl = withContext<
  HTMLDivElement,
  RatingGroupControlProps
>(ArkRatingGroup.Control, "control", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface RatingGroupItemProps
  extends HTMLChakraProps<"div", ArkRatingGroup.ItemBaseProps> {}

export const RatingGroupItem = withContext<
  HTMLDivElement,
  RatingGroupItemProps
>(ArkRatingGroup.Item, "item", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface RatingGroupItemIndicatorProps extends HTMLChakraProps<"span"> {
  icon?: React.ReactElement
}

const StarIcon = createIcon({
  d: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
})

function cloneIcon(icon: React.ReactElement | undefined, type: "bg" | "fg") {
  if (!isValidElement(icon)) return null
  const props = { [`data-${type}`]: "", "aria-hidden": "" }
  return cloneElement(icon, props)
}

export const RatingGroupItemIndicator = forwardRef<
  HTMLSpanElement,
  RatingGroupItemIndicatorProps
>(function RatingGroupItemIndicator(props, ref) {
  const { icon = <StarIcon />, ...rest } = props
  const styles = useRatingGroupStyles()
  const itemState = useRatingGroupItemContext()

  return (
    <chakra.span
      {...rest}
      data-highlighted={itemState.highlighted ? "" : undefined}
      data-checked={itemState.checked ? "" : undefined}
      data-half={itemState.half ? "" : undefined}
      css={[styles.itemIndicator, props.css]}
      ref={ref}
    >
      {cloneIcon(icon, "bg")}
      {cloneIcon(icon, "fg")}
    </chakra.span>
  )
})
