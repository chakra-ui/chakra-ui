"use client"

import { cx, dataAttr } from "@chakra-ui/utils"
import { type HTMLChakraProps, chakra } from "../../styled-system"
import { ChevronDownIcon } from "../icons"
import { useSelectContext, useSelectStyles } from "./select-context"

export interface NativeSelectIndicatorProps extends HTMLChakraProps<"div"> {}

export function NativeSelectIndicator(props: NativeSelectIndicatorProps) {
  const api = useSelectContext()
  const styles = useSelectStyles()

  return (
    <chakra.div
      {...props}
      data-disabled={dataAttr(api.disabled)}
      className={cx("chakra-select__indicator", props.className)}
      css={[styles["indicator"], props.css]}
    >
      {props.children ?? <ChevronDownIcon />}
    </chakra.div>
  )
}

NativeSelectIndicator.displayName = "NativeSelectIndicator"
