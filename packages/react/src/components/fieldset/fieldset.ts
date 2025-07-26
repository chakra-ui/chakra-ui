"use client"

import type { Assign } from "@ark-ui/react"
import { ark } from "@ark-ui/react/factory"
import { Fieldset } from "@ark-ui/react/fieldset"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  createSlotRecipeContext,
} from "../../styled-system"

const { withProvider, withContext } = createSlotRecipeContext({
  key: "fieldset",
})

interface FieldsetRootBaseProps
  extends Assign<Fieldset.RootBaseProps, SlotRecipeProps<"fieldset">>,
    UnstyledProp {}

export interface FieldsetRootProps
  extends HTMLChakraProps<"fieldset", FieldsetRootBaseProps> {}

export const FieldsetRoot = withProvider<
  HTMLFieldSetElement,
  FieldsetRootProps
>(Fieldset.Root, "root")

export interface FieldsetErrorTextProps
  extends HTMLChakraProps<"span", Fieldset.ErrorTextBaseProps>,
    UnstyledProp {}

export const FieldsetErrorText = withContext<
  HTMLSpanElement,
  FieldsetErrorTextProps
>(Fieldset.ErrorText, "errorText")

export interface FieldsetHelperTextProps
  extends HTMLChakraProps<"span", Fieldset.HelperTextBaseProps>,
    UnstyledProp {}

export const FieldsetHelperText = withContext<
  HTMLSpanElement,
  FieldsetHelperTextProps
>(Fieldset.HelperText, "helperText")

export interface FieldsetLegendProps
  extends HTMLChakraProps<"legend", Fieldset.LegendBaseProps>,
    UnstyledProp {}

export const FieldsetLegend = withContext<
  HTMLLegendElement,
  FieldsetLegendProps
>(Fieldset.Legend, "legend")

export interface FieldsetContentProps
  extends HTMLChakraProps<"div">,
    UnstyledProp {}

export const FieldsetContent = withContext<
  HTMLDivElement,
  FieldsetContentProps
>(ark.div, "content")

export const FieldsetContext = Fieldset.Context
