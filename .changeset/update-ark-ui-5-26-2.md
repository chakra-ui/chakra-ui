---
"@chakra-ui/react": minor
---

- **Checkbox**
  - Fix issue where setting initial checked state to `indeterminate` doesn't
    work
  - Ensure `api.checkedState` returns the correct checked state

- **Collapsible**
  - Add support for `collapsedHeight` and `collapsedWidth` props to control the
    dimensions of the collapsible content when in its collapsed state
  - Fix issue where `dir` prop value doesn't get applied correctly
  - Update the recipe styling as needed (when `data-has-collapsed-size` is set)

- **Combobox**: Fix issue where controlled single-select combobox does not
  propagate its initial value to `inputValue`

- **Dialog, Popover**: In modal mode, allow elements referenced by
  `aria-controls` to be included in the focus trap scope

- **Listbox**: Fix issue where pressing Enter key when no highlighted item still
  calls `event.preventDefault()`

- **Number Input**: Fix cursor jumping to end when typing in the middle with
  `formatOptions` like `style: "currency"`

- **Pagination**: Add `getPageUrl` prop for generating `href` attributes when
  using pagination as links

- **Pin Input**: Fix issue where keyboard shortcuts `Cmd+Backspace` and
  `Cmd+Delete` would insert "undefined" instead of clearing the field

- **Scroll Area**
  - Fix horizontal scrollbar positioning on Safari in RTL mode
  - Fix issue where resize tracking was not observing the root element

- **Select**: Fix accessibility violation where the required state was not set
  correctly on the trigger

- **Slider**: Fix issue where slider continues dragging when disabled during
  drag operation

- **Switch**: Fix issue where `data-active` is inconsistently applied when
  `disabled` state changes at runtime

- **Tabs**: Refactor to use `getBoundingClientRect()` for precise indicator
  positioning
