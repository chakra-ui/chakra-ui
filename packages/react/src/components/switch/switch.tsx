"use client"

import { Switch as ArkSwitch, useSwitchContext } from "@ark-ui/react/switch"
import { dataAttr } from "@chakra-ui/utils"
import { forwardRef } from "react"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  chakra,
  createSlotRecipeContext,
} from "../../styled-system"

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useSwitchStyles,
} = createSlotRecipeContext({ key: "switch" })

export { useSwitchStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface SwitchRootProps
  extends HTMLChakraProps<"label", ArkSwitch.RootBaseProps>,
    SlotRecipeProps<"switch">,
    UnstyledProp {}

export const SwitchRoot = withProvider<HTMLLabelElement, SwitchRootProps>(
  ArkSwitch.Root,
  "root",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface SwitchLabelProps
  extends HTMLChakraProps<"span", ArkSwitch.LabelBaseProps> {}

export const SwitchLabel = withContext<HTMLSpanElement, SwitchLabelProps>(
  ArkSwitch.Label,
  "label",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface SwitchControlProps
  extends HTMLChakraProps<"span", ArkSwitch.ControlBaseProps> {}

export const SwitchControl = withContext<HTMLSpanElement, SwitchControlProps>(
  ArkSwitch.Control,
  "control",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface SwitchThumbProps
  extends HTMLChakraProps<"span", ArkSwitch.ThumbBaseProps> {}

export const SwitchThumb = withContext<HTMLSpanElement, SwitchThumbProps>(
  ArkSwitch.Thumb,
  "thumb",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface SwitchIndicatorProps extends HTMLChakraProps<"span"> {
  fallback?: React.ReactNode
}

export const SwitchIndicator = forwardRef<
  HTMLSpanElement,
  SwitchIndicatorProps
>(function SwitchIndicator(props, ref) {
  const api = useSwitchContext()
  const styles = useSwitchStyles()
  const { fallback, children, ...rest } = props
  return (
    <chakra.span
      ref={ref}
      data-checked={dataAttr(api.checked)}
      {...rest}
      css={[styles.indicator, props.css]}
    >
      {api.checked ? children : fallback}
    </chakra.span>
  )
})
