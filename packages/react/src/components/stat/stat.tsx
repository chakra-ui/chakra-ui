"use client"

import { forwardRef, useMemo } from "react"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  chakra,
  createSlotRecipeContext,
  useSlotRecipe,
} from "../../styled-system"
import { ArrowDownIcon, ArrowUpIcon } from "../icons"

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useStatStyles,
  PropsProvider,
} = createSlotRecipeContext({ key: "stat" })

export { useStatStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface StatRootBaseProps
  extends SlotRecipeProps<"stat">, UnstyledProp {}

export interface StatRootProps extends HTMLChakraProps<
  "dl",
  StatRootBaseProps
> {}

export const StatRoot = withProvider<HTMLDListElement, StatRootProps>(
  "dl",
  "root",
)
StatRoot.displayName = "StatRoot"

export const StatPropsProvider =
  PropsProvider as React.Provider<StatRootBaseProps>

////////////////////////////////////////////////////////////////////////////////////

export interface StatLabelProps extends HTMLChakraProps<"dt">, UnstyledProp {}

export const StatLabel = withContext<HTMLElement, StatLabelProps>("dt", "label")
StatLabel.displayName = "StatLabel"

////////////////////////////////////////////////////////////////////////////////////

export interface StatValueTextProps
  extends HTMLChakraProps<"dd">, UnstyledProp {}

export const StatValueText = withContext<HTMLElement, StatValueTextProps>(
  "dd",
  "valueText",
)
StatValueText.displayName = "StatValueText"

////////////////////////////////////////////////////////////////////////////////////

export interface StatHelpTextProps
  extends HTMLChakraProps<"span">, UnstyledProp {}

export const StatHelpText = withContext<HTMLElement, StatHelpTextProps>(
  "span",
  "helpText",
)
StatHelpText.displayName = "StatHelpText"

////////////////////////////////////////////////////////////////////////////////////

export interface StatValueUnitProps
  extends HTMLChakraProps<"span">, UnstyledProp {}

export const StatValueUnit = withContext<HTMLElement, StatValueUnitProps>(
  "span",
  "valueUnit",
)
StatValueUnit.displayName = "StatValueUnit"

////////////////////////////////////////////////////////////////////////////////////

export interface StatUpIndicatorProps
  extends HTMLChakraProps<"span">, UnstyledProp {}

export const StatUpIndicator = withContext<HTMLElement, StatUpIndicatorProps>(
  "span",
  "indicator",
  {
    defaultProps: {
      "data-type": "up",
      children: <ArrowUpIcon />,
    },
  },
)
StatUpIndicator.displayName = "StatUpIndicator"

////////////////////////////////////////////////////////////////////////////////////

export interface StatDownIndicatorProps
  extends HTMLChakraProps<"span">, UnstyledProp {}

export const StatDownIndicator = withContext<
  HTMLElement,
  StatDownIndicatorProps
>("span", "indicator", {
  defaultProps: {
    "data-type": "down",
    children: <ArrowDownIcon />,
  },
})
StatDownIndicator.displayName = "StatDownIndicator"

////////////////////////////////////////////////////////////////////////////////////

export interface StatGroupProps
  extends SlotRecipeProps<"stat">, HTMLChakraProps<"div"> {}

export const StatGroup = forwardRef<HTMLDivElement, StatGroupProps>(
  function StatGroup(props, ref) {
    const recipe = useSlotRecipe({ key: "stat" })
    const [variantProps, localProps] = useMemo(
      () => recipe.splitVariantProps(props),
      [props, recipe],
    )
    return (
      <PropsProvider value={variantProps}>
        <chakra.div
          ref={ref}
          role="group"
          display="flex"
          flexWrap="wrap"
          justifyContent="space-around"
          alignItems="flex-start"
          {...localProps}
        />
      </PropsProvider>
    )
  },
)
StatGroup.displayName = "StatGroup"
