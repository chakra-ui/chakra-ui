/**
 * Component name mappings for v2 to v3 migration
 * These are commonly used patterns across Chakra components
 */

export interface ComponentMapping {
  v2Name: string
  v3Name: string
}

export interface PropMapping {
  oldProp: string
  newProp: string
  transformValue?: (value: any) => any
}

/**
 * Common prop transformations across components
 */
export const commonPropMappings: Record<string, PropMapping> = {
  isOpen: { oldProp: "isOpen", newProp: "open" },
  defaultIsOpen: { oldProp: "defaultIsOpen", newProp: "defaultOpen" },
  isDisabled: { oldProp: "isDisabled", newProp: "disabled" },
  isInvalid: { oldProp: "isInvalid", newProp: "invalid" },
  isRequired: { oldProp: "isRequired", newProp: "required" },
  isReadOnly: { oldProp: "isReadOnly", newProp: "readOnly" },
  isChecked: { oldProp: "isChecked", newProp: "checked" },
  isIndeterminate: { oldProp: "isIndeterminate", newProp: "indeterminate" },
  colorScheme: { oldProp: "colorScheme", newProp: "colorPalette" },
  onChange: { oldProp: "onChange", newProp: "onValueChange" },
  onChangeEnd: { oldProp: "onChangeEnd", newProp: "onValueChangeEnd" },
  defaultValue: { oldProp: "defaultValue", newProp: "defaultValue" },
  isLazy: { oldProp: "isLazy", newProp: "lazyMount" }, // Note: also needs unmountOnExit
}

/**
 * Component-specific mappings
 */

// Accordion
export const accordionMappings: ComponentMapping[] = [
  { v2Name: "Accordion", v3Name: "Accordion.Root" },
  { v2Name: "AccordionItem", v3Name: "Accordion.Item" },
  { v2Name: "AccordionButton", v3Name: "Accordion.Trigger" },
  { v2Name: "AccordionPanel", v3Name: "Accordion.Content" },
  { v2Name: "AccordionIcon", v3Name: "Accordion.ItemIndicator" },
]

export const accordionPropMappings: Record<string, PropMapping> = {
  allowMultiple: { oldProp: "allowMultiple", newProp: "multiple" },
  allowToggle: { oldProp: "allowToggle", newProp: "collapsible" },
  index: { oldProp: "index", newProp: "value" },
  defaultIndex: { oldProp: "defaultIndex", newProp: "defaultValue" },
}

// Tabs
export const tabsMappings: ComponentMapping[] = [
  { v2Name: "Tabs", v3Name: "Tabs.Root" },
  { v2Name: "TabList", v3Name: "Tabs.List" },
  { v2Name: "Tab", v3Name: "Tabs.Trigger" },
  { v2Name: "TabPanel", v3Name: "Tabs.Content" },
  { v2Name: "TabPanels", v3Name: "" }, // Removed
  { v2Name: "TabIndicator", v3Name: "Tabs.Indicator" },
]

// Menu
export const menuMappings: ComponentMapping[] = [
  { v2Name: "Menu", v3Name: "Menu.Root" },
  { v2Name: "MenuButton", v3Name: "Menu.Trigger" },
  { v2Name: "MenuList", v3Name: "Menu.Content" },
  { v2Name: "MenuItem", v3Name: "Menu.Item" },
  { v2Name: "MenuGroup", v3Name: "Menu.ItemGroup" },
  { v2Name: "MenuDivider", v3Name: "Menu.Separator" },
  { v2Name: "MenuItemOption", v3Name: "Menu.RadioItem" }, // or CheckboxItem
  { v2Name: "MenuOptionGroup", v3Name: "Menu.RadioItemGroup" }, // or CheckboxItemGroup
]

// Dialog/Modal
export const dialogMappings: ComponentMapping[] = [
  { v2Name: "Modal", v3Name: "Dialog.Root" },
  { v2Name: "ModalOverlay", v3Name: "Dialog.Backdrop" },
  { v2Name: "ModalContent", v3Name: "Dialog.Content" },
  { v2Name: "ModalHeader", v3Name: "Dialog.Header" },
  { v2Name: "ModalBody", v3Name: "Dialog.Body" },
  { v2Name: "ModalFooter", v3Name: "Dialog.Footer" },
  { v2Name: "ModalCloseButton", v3Name: "Dialog.CloseTrigger" },
]

export const dialogPropMappings: Record<string, PropMapping> = {
  onClose: { oldProp: "onClose", newProp: "onOpenChange" },
  isCentered: {
    oldProp: "isCentered",
    newProp: "placement",
    transformValue: () => "center",
  },
  closeOnOverlayClick: {
    oldProp: "closeOnOverlayClick",
    newProp: "closeOnInteractOutside",
  },
  closeOnEsc: { oldProp: "closeOnEsc", newProp: "closeOnEscape" },
  blockScrollOnMount: {
    oldProp: "blockScrollOnMount",
    newProp: "preventScroll",
  },
  returnFocusOnClose: {
    oldProp: "returnFocusOnClose",
    newProp: "restoreFocus",
  },
}

// Drawer (same as Dialog)
export const drawerMappings: ComponentMapping[] = [
  { v2Name: "Drawer", v3Name: "Drawer.Root" },
  { v2Name: "DrawerOverlay", v3Name: "Drawer.Backdrop" },
  { v2Name: "DrawerContent", v3Name: "Drawer.Content" },
  { v2Name: "DrawerHeader", v3Name: "Drawer.Header" },
  { v2Name: "DrawerBody", v3Name: "Drawer.Body" },
  { v2Name: "DrawerFooter", v3Name: "Drawer.Footer" },
  { v2Name: "DrawerCloseButton", v3Name: "Drawer.CloseTrigger" },
]

// Progress
export const progressMappings: ComponentMapping[] = [
  { v2Name: "Progress", v3Name: "Progress.Root" },
  { v2Name: "ProgressTrack", v3Name: "Progress.Track" },
  { v2Name: "ProgressFilledTrack", v3Name: "Progress.Range" },
]

export const progressPropMappings: Record<string, PropMapping> = {
  hasStripe: { oldProp: "hasStripe", newProp: "striped" },
  isAnimated: { oldProp: "isAnimated", newProp: "animated" },
}

// Slider
export const sliderMappings: ComponentMapping[] = [
  { v2Name: "Slider", v3Name: "Slider.Root" },
  { v2Name: "SliderTrack", v3Name: "Slider.Track" },
  { v2Name: "SliderFilledTrack", v3Name: "Slider.Range" },
  { v2Name: "SliderThumb", v3Name: "Slider.Thumb" },
  { v2Name: "SliderMark", v3Name: "Slider.Marker" },
  { v2Name: "RangeSlider", v3Name: "Slider.Root" },
  { v2Name: "RangeSliderTrack", v3Name: "Slider.Track" },
  { v2Name: "RangeSliderFilledTrack", v3Name: "Slider.Range" },
  { v2Name: "RangeSliderThumb", v3Name: "Slider.Thumb" },
]

// Alert
export const alertMappings: ComponentMapping[] = [
  { v2Name: "Alert", v3Name: "Alert.Root" },
  { v2Name: "AlertIcon", v3Name: "Alert.Indicator" },
  { v2Name: "AlertTitle", v3Name: "Alert.Title" },
  { v2Name: "AlertDescription", v3Name: "Alert.Description" },
]

// Tag
export const tagMappings: ComponentMapping[] = [
  { v2Name: "Tag", v3Name: "Tag.Root" },
  { v2Name: "TagLabel", v3Name: "Tag.Label" },
  { v2Name: "TagLeftIcon", v3Name: "Tag.StartElement" },
  { v2Name: "TagRightIcon", v3Name: "Tag.EndElement" },
  { v2Name: "TagCloseButton", v3Name: "Tag.CloseTrigger" },
]

// Table
export const tableMappings: ComponentMapping[] = [
  { v2Name: "Table", v3Name: "Table.Root" },
  { v2Name: "TableContainer", v3Name: "Table.ScrollArea" },
  { v2Name: "Thead", v3Name: "Table.Header" },
  { v2Name: "Tbody", v3Name: "Table.Body" },
  { v2Name: "Tfoot", v3Name: "Table.Footer" },
  { v2Name: "Tr", v3Name: "Table.Row" },
  { v2Name: "Th", v3Name: "Table.ColumnHeader" },
  { v2Name: "Td", v3Name: "Table.Cell" },
  { v2Name: "TableCaption", v3Name: "Table.Caption" },
]

export const tablePropMappings: Record<string, PropMapping> = {
  isNumeric: {
    oldProp: "isNumeric",
    newProp: "textAlign",
    transformValue: () => "end",
  },
}

// RadioGroup
export const radioGroupMappings: ComponentMapping[] = [
  { v2Name: "RadioGroup", v3Name: "RadioGroup.Root" },
  { v2Name: "Radio", v3Name: "RadioGroup.Item" },
]

// NumberInput
export const numberInputMappings: ComponentMapping[] = [
  { v2Name: "NumberInput", v3Name: "NumberInput.Root" },
  { v2Name: "NumberInputField", v3Name: "NumberInput.Input" },
  { v2Name: "NumberInputStepper", v3Name: "NumberInput.Control" },
  { v2Name: "NumberIncrementStepper", v3Name: "NumberInput.IncrementTrigger" },
  { v2Name: "NumberDecrementStepper", v3Name: "NumberInput.DecrementTrigger" },
]

export const numberInputPropMappings: Record<string, PropMapping> = {
  onInvalid: { oldProp: "onInvalid", newProp: "onValueInvalid" },
}

// PinInput
export const pinInputMappings: ComponentMapping[] = [
  { v2Name: "PinInput", v3Name: "PinInput.Root" },
  { v2Name: "PinInputField", v3Name: "PinInput.Input" },
]

export const pinInputPropMappings: Record<string, PropMapping> = {
  onComplete: { oldProp: "onComplete", newProp: "onValueComplete" },
}

// Editable
export const editableMappings: ComponentMapping[] = [
  { v2Name: "Editable", v3Name: "Editable.Root" },
  { v2Name: "EditableInput", v3Name: "Editable.Input" },
  { v2Name: "EditablePreview", v3Name: "Editable.Preview" },
  { v2Name: "EditableTextarea", v3Name: "Editable.Textarea" },
]

export const editablePropMappings: Record<string, PropMapping> = {
  onSubmit: { oldProp: "onSubmit", newProp: "onValueCommit" },
  onCancel: { oldProp: "onCancel", newProp: "onValueRevert" },
  startWithEditView: { oldProp: "startWithEditView", newProp: "defaultEdit" },
  submitOnBlur: { oldProp: "submitOnBlur", newProp: "submitMode" },
}

// Tooltip
export const tooltipMappings: ComponentMapping[] = [
  { v2Name: "Tooltip", v3Name: "Tooltip.Root" },
]

export const tooltipPropMappings: Record<string, PropMapping> = {
  closeOnEsc: { oldProp: "closeOnEsc", newProp: "closeOnEscape" },
  closeOnMouseDown: {
    oldProp: "closeOnMouseDown",
    newProp: "closeOnPointerDown",
  },
}

/**
 * Get all mappings for a component
 */
export function getComponentMappings(
  componentName: string,
): ComponentMapping[] | null {
  const mappings: Record<string, ComponentMapping[]> = {
    accordion: accordionMappings,
    tabs: tabsMappings,
    menu: menuMappings,
    modal: dialogMappings,
    dialog: dialogMappings,
    drawer: drawerMappings,
    progress: progressMappings,
    slider: sliderMappings,
    alert: alertMappings,
    tag: tagMappings,
    table: tableMappings,
    "radio-group": radioGroupMappings,
    "number-input": numberInputMappings,
    "pin-input": pinInputMappings,
    editable: editableMappings,
    tooltip: tooltipMappings,
  }

  return mappings[componentName] || null
}

/**
 * Get all prop mappings for a component
 */
export function getComponentPropMappings(
  componentName: string,
): Record<string, PropMapping> {
  const propMappings: Record<string, Record<string, PropMapping>> = {
    accordion: { ...commonPropMappings, ...accordionPropMappings },
    tabs: { ...commonPropMappings },
    menu: { ...commonPropMappings },
    modal: { ...commonPropMappings, ...dialogPropMappings },
    dialog: { ...commonPropMappings, ...dialogPropMappings },
    drawer: { ...commonPropMappings, ...dialogPropMappings },
    progress: { ...commonPropMappings, ...progressPropMappings },
    slider: { ...commonPropMappings },
    alert: { ...commonPropMappings },
    tag: { ...commonPropMappings },
    table: { ...commonPropMappings, ...tablePropMappings },
    "radio-group": { ...commonPropMappings },
    "number-input": { ...commonPropMappings, ...numberInputPropMappings },
    "pin-input": { ...commonPropMappings, ...pinInputPropMappings },
    editable: { ...commonPropMappings, ...editablePropMappings },
    tooltip: { ...commonPropMappings, ...tooltipPropMappings },
  }

  return propMappings[componentName] || commonPropMappings
}
