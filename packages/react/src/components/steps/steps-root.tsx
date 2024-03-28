"use client"

import { cx, dataAttr } from "@chakra-ui/utils"
import { Children, forwardRef } from "react"
import {
  EMPTY_SLOT_STYLES,
  HTMLChakraProps,
  SlotRecipeProps,
  UnstyledProp,
  chakra,
  useSlotRecipe,
} from "../../styled-system"
import {
  StepContextProvider,
  StepItemStatus,
  StepperStylesProvider,
} from "./step-context"

export interface StepsRootProps
  extends HTMLChakraProps<"div">,
    SlotRecipeProps<"Steps">,
    UnstyledProp {
  /**
   * The active step index
   */
  index: number
}

export const StepsRoot = forwardRef<HTMLDivElement, StepsRootProps>(
  function StepsRoot({ unstyled, ...props }, ref) {
    const recipe = useSlotRecipe("Steps", props.recipe)
    const [variantProps, localProps] = recipe.splitVariantProps(props)
    const styles = unstyled ? EMPTY_SLOT_STYLES : recipe(variantProps)

    const { children, index, ...restProps } = localProps

    const items = Children.toArray(children)
    const count = items.length

    function getStatus(step: number): StepItemStatus {
      if (step < index) return "completed"
      if (step > index) return "incomplete"
      return "current"
    }

    return (
      <StepperStylesProvider value={styles}>
        <chakra.div
          ref={ref}
          {...restProps}
          css={[styles.root, props.css]}
          className={cx("chakra-stepper", props.className)}
        >
          {items.map((item, index) => {
            const status = getStatus(index)
            const dataAttrs = {
              "data-complete": dataAttr(status === "completed"),
              "data-current": dataAttr(status === "current"),
              "data-incomplete": dataAttr(status === "incomplete"),
            }
            return (
              <StepContextProvider
                key={index}
                value={{
                  index,
                  status,
                  count: count,
                  isFirst: index === 0,
                  isLast: index === count - 1,
                  dataAttrs,
                }}
              >
                {item}
              </StepContextProvider>
            )
          })}
        </chakra.div>
      </StepperStylesProvider>
    )
  },
)
