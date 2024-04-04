"use client"

import { cx, dataAttr } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useSelectContext, useSelectStyles } from "./select-context"

const DefaultIcon = (props: HTMLChakraProps<"svg">) => (
  <chakra.svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m6 9 6 6 6-6" />
  </chakra.svg>
)

export interface NativeSelectIndicatorProps extends HTMLChakraProps<"div"> {}

export function NativeSelectIndicator(props: NativeSelectIndicatorProps) {
  const api = useSelectContext()
  const styles = useSelectStyles()

  return (
    <chakra.div
      {...props}
      data-disabled={dataAttr(api.disabled)}
      className={cx("chakra-select__indicator", props.className)}
      css={[styles.indicator, props.css]}
    >
      {props.children ?? <DefaultIcon />}
    </chakra.div>
  )
}

NativeSelectIndicator.displayName = "NativeSelectIndicator"
