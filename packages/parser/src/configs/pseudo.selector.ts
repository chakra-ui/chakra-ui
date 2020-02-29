import { AnyFunction } from "@chakra-ui/utils"

const group = {
  hover: (selector: string) => `${selector}:hover &, ${selector}[data-hover] &`,
  focus: (selector: string) =>
    `${selector}:focus &, ${selector}[data-focus] &,`,
  active: (selector: string) =>
    `${selector}:active &, ${selector}[data-active] &, ${selector}[data-state=active] &`,
  disabled: (selector: string) =>
    `${selector}:disabled &, ${selector}[data-disabled] &, ${selector}[data-state=disabled] &`,
  invalid: (selector: string) =>
    `${selector}:invalid &, ${selector}[data-invalid] &, ${selector}[data-state=invalid] &`,
  checked: (selector: string) =>
    `${selector}:checked &, ${selector}[data-checked] &, ${selector}[data-state=checked] &`,
  indeterminate: (selector: string) =>
    `${selector}:indeterminate &, ${selector}[aria-checked=mixed] &, ${selector}[data-indeterminate] &, ${selector}[data-state=mixed] &`,
  readOnly: (selector: string) =>
    `${selector}:read-only &, ${selector}[readonly] &, ${selector}[data-read-only] &, ${selector}[data-state=readonly] &`,
  expanded: (selector: string) =>
    `${selector}:read-only &, ${selector}[aria-expanded=true] &, ${selector}[data-expanded] &, ${selector}[data-state=expanded] &`,
}

function toGroup(fn: AnyFunction) {
  return merge(fn, "[role=group]", "[data-group]")
}

function merge(fn: AnyFunction, ...selectors: string[]) {
  return selectors.map(fn).join(", ")
}

const disabled = (selector: string) =>
  `${selector}, ${selector}:focus, ${selector}:hover`

const disabledSelector = merge(
  disabled,
  "&[disabled]",
  "&[aria-disabled=true]",
  "&[data-disabled]",
  "&[data-state=disabled]",
)

export const pseudoSelectors = {
  _hover: "&:hover, &[data-hover]",
  _active: "&:active, &[data-active], &[data-state=active]",
  _focus: "&:focus, &[data-focus], &[data-state=focused]",
  _highlighted: "&[data-highlighted]",
  _focusWithin: "&:focus-within",
  _focusVisible: "&:focus-visible",
  _disabled: disabledSelector,
  _readOnly: "&[aria-readonly=true], &[readonly], &[data-readonly]",
  _before: "&:before",
  _after: "&:after",
  _empty: "&:empty",
  _expanded: "&[aria-expanded=true], &[data-expanded], &[data-state=expanded]",
  _checked: "&[aria-checked=true], &[data-checked], &[data-state=checked]",
  _grabbed: "&[aria-grabbed=true], &[data-grabbed], &[data-state=grabbed]",
  _pressed: "&[aria-pressed=true], &[data-pressed], &[data-state=pressed]",
  _invalid:
    "&[aria-invalid=true], &[data-invalid], &:invalid, &[data-state=invalid]",
  _valid: "&[data-valid], &:valid, &[data-state=valid]",
  _loading: "&[data-loading], &[aria-busy=true], &[data-state=loading]",
  _selected: "&[aria-selected=true], &[data-selected], &[data-state=selected]",
  _hidden: "&[hidden], &[data-hidden]",
  _autofill: "&:-webkit-autofill",
  _even: "&:nth-of-type(even)",
  _odd: "&:nth-of-type(odd)",
  _first: "&:first-of-type",
  _last: "&:last-of-type",
  _visited: "&:visited",
  _activeLink: "&[aria-current=page]",
  _indeterminate:
    "&:indeterminate, &[aria-checked=mixed], &[data-indeterminate], &[data-state=mixed]",
  _groupHover: toGroup(group.hover),
  _groupFocus: toGroup(group.focus),
  _groupActive: toGroup(group.active),
  _groupDisabled: toGroup(group.disabled),
  _groupInvalid: toGroup(group.invalid),
  _groupChecked: toGroup(group.checked),
  _placeholder: "&::placeholder",
  _fullScreen: "&:fullscreen",
  _selection: "&::selection",
}

export type Pseudos = typeof pseudoSelectors

export const pseudoPropNames = Object.keys(pseudoSelectors) as (keyof Pseudos)[]
