"use client"

import { HTMLChakraProps, chakra } from "../../styled-system"
import { useCheckboxContext, useCheckboxStyles } from "./checkbox-context"

function CheckIcon(props: HTMLChakraProps<"svg">) {
  if (props.asChild) return props.children
  return (
    <chakra.svg
      width="1em"
      height="1em"
      viewBox="0 0 9 9"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.53547 0.62293C8.88226 0.849446 8.97976 1.3142 8.75325 1.66099L4.5083 8.1599C4.38833 8.34356 4.19397 8.4655 3.9764 8.49358C3.75883 8.52167 3.53987 8.45309 3.3772 8.30591L0.616113 5.80777C0.308959 5.52987 0.285246 5.05559 0.563148 4.74844C0.84105 4.44128 1.31533 4.41757 1.62249 4.69547L3.73256 6.60459L7.49741 0.840706C7.72393 0.493916 8.18868 0.396414 8.53547 0.62293Z"
      />
    </chakra.svg>
  )
}

function IndeterminateIcon(props: HTMLChakraProps<"svg">) {
  if (props.asChild) return props.children
  return (
    <chakra.svg
      xmlns="http://www.w3.org/2000/svg"
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
      <path d="M5 12h14" />
    </chakra.svg>
  )
}

export interface CheckboxIndicatorProps extends HTMLChakraProps<"svg"> {
  checked?: React.ReactElement
  indeterminate?: React.ReactElement
}

export function CheckboxIndicator(props: CheckboxIndicatorProps) {
  const { checked, indeterminate, ...restProps } = props

  const api = useCheckboxContext()
  const styles = useCheckboxStyles()

  if (api.state.checked) {
    return (
      <CheckIcon
        asChild={!!checked}
        {...restProps}
        css={[styles.indicator, restProps.css]}
      >
        {checked}
      </CheckIcon>
    )
  }

  if (api.state.indeterminate) {
    return (
      <IndeterminateIcon
        asChild={!!indeterminate}
        {...restProps}
        css={[styles.indicator, restProps.css]}
      >
        {indeterminate}
      </IndeterminateIcon>
    )
  }

  return null
}
