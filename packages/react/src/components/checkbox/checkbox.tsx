"use client"

import type { Assign } from "@ark-ui/react"
import {
  Checkbox as ArkCheckbox,
  useCheckboxContext,
} from "@ark-ui/react/checkbox"
import { forwardRef } from "react"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  chakra,
  createSlotRecipeContext,
} from "../../styled-system"
import { Checkmark } from "../checkmark"

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useCheckboxStyles,
  PropsProvider,
} = createSlotRecipeContext({ key: "checkbox" })

export { useCheckboxStyles }

////////////////////////////////////////////////////////////////////////////////////

/**
 * Root provider for Checkbox component with pre-configured state
 *
 * @see {@link https://chakra-ui.com/docs/components/checkbox Docs}
 */
export interface CheckboxRootProviderBaseProps
  extends
    Assign<ArkCheckbox.RootProviderBaseProps, SlotRecipeProps<"checkbox">>,
    UnstyledProp {}

/**
 * Props for CheckboxRootProvider component
 */
export interface CheckboxRootProviderProps extends HTMLChakraProps<
  "div",
  CheckboxRootProviderBaseProps
> {}

/**
 * CheckboxRootProvider allows you to provide checkbox state externally
 */
export const CheckboxRootProvider = withProvider<
  HTMLDivElement,
  CheckboxRootProviderProps
>(ArkCheckbox.RootProvider, "root", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

/**
 * Base props for the Checkbox root component
 */
export interface CheckboxRootBaseProps
  extends
    Assign<ArkCheckbox.RootBaseProps, SlotRecipeProps<"checkbox">>,
    UnstyledProp {}

/**
 * Checkbox component is used in forms when a user needs to select
 * multiple values from several options.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <CheckboxRoot>
 *   <CheckboxControl />
 *   <CheckboxLabel>Accept terms</CheckboxLabel>
 * </CheckboxRoot>
 *
 * // Controlled checkbox
 * const [checked, setChecked] = useState(false)
 * <CheckboxRoot checked={checked} onCheckedChange={(e) => setChecked(e.checked)}>
 *   <CheckboxControl />
 *   <CheckboxLabel>Subscribe to newsletter</CheckboxLabel>
 * </CheckboxRoot>
 *
 * // Disabled state
 * <CheckboxRoot disabled>
 *   <CheckboxControl />
 *   <CheckboxLabel>Disabled option</CheckboxLabel>
 * </CheckboxRoot>
 *
 * // Indeterminate state
 * <CheckboxRoot checked="indeterminate">
 *   <CheckboxControl />
 *   <CheckboxLabel>Select all</CheckboxLabel>
 * </CheckboxRoot>
 *
 * // Checkbox group
 * <CheckboxGroup>
 *   <CheckboxRoot value="1">
 *     <CheckboxControl />
 *     <CheckboxLabel>Option 1</CheckboxLabel>
 *   </CheckboxRoot>
 *   <CheckboxRoot value="2">
 *     <CheckboxControl />
 *     <CheckboxLabel>Option 2</CheckboxLabel>
 *   </CheckboxRoot>
 * </CheckboxGroup>
 *
 * // With different sizes
 * <CheckboxRoot size="sm">
 *   <CheckboxControl />
 *   <CheckboxLabel>Small</CheckboxLabel>
 * </CheckboxRoot>
 * ```
 *
 * @see {@link https://chakra-ui.com/docs/components/checkbox Docs}
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/ WAI-ARIA Checkbox Pattern}
 */
export interface CheckboxRootProps extends HTMLChakraProps<
  "label",
  CheckboxRootBaseProps
> {}

/**
 * CheckboxRoot is the main wrapper for the checkbox component
 *
 * @see {@link CheckboxRootProps} for available props
 */
export const CheckboxRoot = withProvider<HTMLLabelElement, CheckboxRootProps>(
  ArkCheckbox.Root,
  "root",
  { forwardAsChild: true },
)

/**
 * Props provider for Checkbox component
 * Allows passing props to nested Checkbox components via context
 */
export const CheckboxPropsProvider =
  PropsProvider as React.Provider<CheckboxRootBaseProps>

////////////////////////////////////////////////////////////////////////////////////

/**
 * Props for CheckboxLabel component
 *
 * @example
 * ```tsx
 * <CheckboxLabel>Accept terms and conditions</CheckboxLabel>
 * ```
 */
export interface CheckboxLabelProps
  extends HTMLChakraProps<"span", ArkCheckbox.LabelBaseProps>, UnstyledProp {}

/**
 * CheckboxLabel provides the text label for the checkbox
 *
 * @see {@link https://chakra-ui.com/docs/components/checkbox Docs}
 */
export const CheckboxLabel = withContext<HTMLElement, CheckboxLabelProps>(
  ArkCheckbox.Label,
  "label",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

/**
 * Props for CheckboxIndicator component
 */
export interface CheckboxIndicatorProps extends HTMLChakraProps<"svg"> {
  /** Custom element to show when checked */
  checked?: React.ReactElement | undefined
  /** Custom element to show when indeterminate */
  indeterminate?: React.ReactElement | undefined
}

export const CheckboxIndicator = forwardRef<
  SVGSVGElement,
  CheckboxIndicatorProps
>(function CheckboxIndicator(props, ref) {
  const { checked, indeterminate, ...rest } = props

  const api = useCheckboxContext()
  const styles = useCheckboxStyles()

  if (checked && api.checked) {
    return (
      <chakra.svg
        ref={ref}
        asChild
        {...rest}
        css={[styles.indicator, props.css]}
      >
        {checked}
      </chakra.svg>
    )
  }

  if (indeterminate && api.indeterminate) {
    return (
      <chakra.svg
        ref={ref}
        asChild
        {...rest}
        css={[styles.indicator, props.css]}
      >
        {indeterminate}
      </chakra.svg>
    )
  }

  return (
    <Checkmark
      ref={ref}
      checked={api.checked}
      indeterminate={api.indeterminate}
      disabled={api.disabled}
      unstyled
      {...rest}
      css={[styles.indicator, props.css]}
    />
  )
})

////////////////////////////////////////////////////////////////////////////////////

export interface CheckboxControlProps
  extends HTMLChakraProps<"div", ArkCheckbox.ControlBaseProps>, UnstyledProp {}

export const CheckboxControl = withContext<HTMLElement, CheckboxControlProps>(
  ArkCheckbox.Control,
  "control",
  {
    forwardAsChild: true,
    defaultProps: { children: <CheckboxIndicator /> },
  },
)

////////////////////////////////////////////////////////////////////////////////////

export interface CheckboxGroupProps extends HTMLChakraProps<
  "div",
  ArkCheckbox.GroupBaseProps
> {}

export type CheckboxGroupComponent = React.ForwardRefExoticComponent<
  CheckboxGroupProps & React.RefAttributes<HTMLDivElement>
>

export const CheckboxGroup = chakra(
  ArkCheckbox.Group,
  {
    base: {
      display: "flex",
      flexDirection: "column",
      gap: "1.5",
    },
  },
  { forwardAsChild: true },
) as CheckboxGroupComponent

////////////////////////////////////////////////////////////////////////////////////

export const CheckboxContext = ArkCheckbox.Context
export const CheckboxHiddenInput = ArkCheckbox.HiddenInput

export interface CheckboxCheckedChangeDetails
  extends ArkCheckbox.CheckedChangeDetails {}
