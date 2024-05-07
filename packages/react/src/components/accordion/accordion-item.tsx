"use client"

import { type MaybeRenderProp, cx, runIfFn } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { type HTMLChakraProps, chakra } from "../../styled-system"
import {
  AccordionItemContextProvider,
  useAccordionStyles,
} from "./accordion-context"
import { splitAccordionItemProps } from "./accordion-props"
import {
  type UseAccordionItemProps,
  useAccordionItem,
} from "./use-accordion-item"

interface AccordionItemState {
  open: boolean
  disabled: boolean
}

export interface AccordionItemProps
  extends Omit<
      HTMLChakraProps<"div">,
      keyof UseAccordionItemProps | "children"
    >,
    UseAccordionItemProps {
  children?: MaybeRenderProp<AccordionItemState>
}
/**
 * AccordionItem is a single accordion that provides the open-close
 * behavior when the accordion button is clicked.
 *
 * It also provides context for the accordion button and panel.
 */
export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  function AccordionItem(props, ref) {
    const { children, ...restProps } = props

    const [itemProps, localProps] = splitAccordionItemProps(restProps)

    const itemApi = useAccordionItem(itemProps)
    const styles = useAccordionStyles()

    const itemState = {
      open: !!itemApi.open,
      disabled: !!itemApi.disabled,
    }

    return (
      <AccordionItemContextProvider value={itemApi}>
        <chakra.div
          {...itemApi.getItemProps(localProps, ref)}
          className={cx("chakra-accordion__item", props.className)}
          css={[styles["item"], localProps.css]}
        >
          {runIfFn(children, itemState)}
        </chakra.div>
      </AccordionItemContextProvider>
    )
  },
)

AccordionItem.displayName = "AccordionItem"
