"use client"

import { type Assign } from "@ark-ui/react"
import { DatePicker as ArkDatePicker } from "@ark-ui/react/date-picker"
import type React from "react"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  createSlotRecipeContext,
} from "../../styled-system"
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
} from "../icons.tsx"

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useDatePickerStyles,
  PropsProvider,
} = createSlotRecipeContext({ key: "datePicker" })

export { useDatePickerStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface DatePickerRootProviderBaseProps
  extends Assign<
      ArkDatePicker.RootProviderBaseProps,
      SlotRecipeProps<"datePicker">
    >,
    UnstyledProp {}

export interface DatePickerRootProviderProps
  extends HTMLChakraProps<"div", DatePickerRootProviderBaseProps> {}

export const DatePickerRootProvider = withProvider<
  HTMLDivElement,
  DatePickerRootProviderProps
>(ArkDatePicker.RootProvider, "root", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface DatePickerRootBaseProps
  extends Assign<ArkDatePicker.RootBaseProps, SlotRecipeProps<"datePicker">>,
    UnstyledProp {}

export interface DatePickerRootProps
  extends HTMLChakraProps<"div", DatePickerRootBaseProps> {}

export const DatePickerRoot = withProvider<HTMLDivElement, DatePickerRootProps>(
  ArkDatePicker.Root,
  "root",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export const DatePickerPropsProvider =
  PropsProvider as React.Provider<ArkDatePicker.RootBaseProps>

////////////////////////////////////////////////////////////////////////////////////

export interface DatePickerClearTriggerProps
  extends HTMLChakraProps<"button", ArkDatePicker.ClearTriggerBaseProps>,
    UnstyledProp {}

export const DatePickerClearTrigger = withContext<
  HTMLButtonElement,
  DatePickerClearTriggerProps
>(ArkDatePicker.ClearTrigger, "clearTrigger", {
  forwardAsChild: true,
  defaultProps: {
    children: <CloseIcon />,
  },
})

////////////////////////////////////////////////////////////////////////////////////

export interface DatePickerContentProps
  extends HTMLChakraProps<"div", ArkDatePicker.ContentBaseProps>,
    UnstyledProp {}

export const DatePickerContent = withContext<
  HTMLDivElement,
  DatePickerContentProps
>(ArkDatePicker.Content, "content", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface DatePickerControlProps
  extends HTMLChakraProps<"div", ArkDatePicker.ControlBaseProps>,
    UnstyledProp {}

export const DatePickerControl = withContext<
  HTMLDivElement,
  DatePickerControlProps
>(ArkDatePicker.Control, "control", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface DatePickerInputProps
  extends HTMLChakraProps<"input", ArkDatePicker.InputBaseProps>,
    UnstyledProp {}

export const DatePickerInput = withContext<
  HTMLInputElement,
  DatePickerInputProps
>(ArkDatePicker.Input, "input", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface DatePickerLabelProps
  extends HTMLChakraProps<"label", ArkDatePicker.LabelBaseProps>,
    UnstyledProp {}

export const DatePickerLabel = withContext<
  HTMLLabelElement,
  DatePickerLabelProps
>(ArkDatePicker.Label, "label", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface DatePickerMonthSelectProps
  extends HTMLChakraProps<"select", ArkDatePicker.MonthSelectBaseProps>,
    UnstyledProp {}

export const DatePickerMonthSelect = withContext<
  HTMLSelectElement,
  DatePickerMonthSelectProps
>(ArkDatePicker.MonthSelect, "monthSelect", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface DatePickerNextTriggerProps
  extends HTMLChakraProps<"button", ArkDatePicker.NextTriggerBaseProps>,
    UnstyledProp {}

export const DatePickerNextTrigger = withContext<
  HTMLButtonElement,
  DatePickerNextTriggerProps
>(ArkDatePicker.NextTrigger, "nextTrigger", {
  forwardAsChild: true,
  defaultProps: {
    children: <ChevronRightIcon />,
  },
})
////////////////////////////////////////////////////////////////////////////////////

export interface DatePickerPositionerProps
  extends HTMLChakraProps<"div", ArkDatePicker.PositionerBaseProps>,
    UnstyledProp {}

export const DatePickerPositioner = withContext<
  HTMLDivElement,
  DatePickerPositionerProps
>(ArkDatePicker.Positioner, "positioner", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface DatePickerPresetTriggerProps
  extends HTMLChakraProps<"button", ArkDatePicker.PresetTriggerBaseProps>,
    UnstyledProp {}

export const DatePickerPresetTrigger = withContext<
  HTMLButtonElement,
  DatePickerPresetTriggerProps
>(ArkDatePicker.PresetTrigger, "presetTrigger", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface DatePickerPrevTriggerProps
  extends HTMLChakraProps<"button", ArkDatePicker.PrevTriggerBaseProps>,
    UnstyledProp {}

export const DatePickerPrevTrigger = withContext<
  HTMLButtonElement,
  DatePickerPrevTriggerProps
>(ArkDatePicker.PrevTrigger, "prevTrigger", {
  forwardAsChild: true,
  defaultProps: {
    children: <ChevronLeftIcon />,
  },
})

////////////////////////////////////////////////////////////////////////////////////

export interface DatePickerRangeTextProps
  extends HTMLChakraProps<"div", ArkDatePicker.RangeTextBaseProps>,
    UnstyledProp {}

export const DatePickerRangeText = withContext<
  HTMLDivElement,
  DatePickerRangeTextProps
>(ArkDatePicker.RangeText, "rangeText", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface DatePickerTableProps
  extends HTMLChakraProps<"table", ArkDatePicker.TableBaseProps>,
    UnstyledProp {}

export const DatePickerTable = withContext<
  HTMLTableElement,
  DatePickerTableProps
>(ArkDatePicker.Table, "table", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface DatePickerTableBodyProps
  extends HTMLChakraProps<"tbody", ArkDatePicker.TableBodyBaseProps>,
    UnstyledProp {}

export const DatePickerTableBody = withContext<
  HTMLTableSectionElement,
  DatePickerTableBodyProps
>(ArkDatePicker.TableBody, "tableBody", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface DatePickerTableCellProps
  extends HTMLChakraProps<"td", ArkDatePicker.TableCellBaseProps>,
    UnstyledProp {}

export const DatePickerTableCell = withContext<
  HTMLTableCellElement,
  DatePickerTableCellProps
>(ArkDatePicker.TableCell, "tableCell", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface DatePickerTableCellTriggerProps
  extends HTMLChakraProps<"button", ArkDatePicker.TableCellTriggerBaseProps>,
    UnstyledProp {}

export const DatePickerTableCellTrigger = withContext<
  HTMLButtonElement,
  DatePickerTableCellTriggerProps
>(ArkDatePicker.TableCellTrigger, "tableCellTrigger", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface DatePickerTableHeadProps
  extends HTMLChakraProps<"thead", ArkDatePicker.TableHeadBaseProps>,
    UnstyledProp {}

export const DatePickerTableHead = withContext<
  HTMLTableSectionElement,
  DatePickerTableHeadProps
>(ArkDatePicker.TableHead, "tableHead", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface DatePickerTableHeaderProps
  extends HTMLChakraProps<"th", ArkDatePicker.TableHeaderBaseProps>,
    UnstyledProp {}

export const DatePickerTableHeader = withContext<
  HTMLTableCellElement,
  DatePickerTableHeaderProps
>(ArkDatePicker.TableHeader, "tableHeader", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface DatePickerTableRowProps
  extends HTMLChakraProps<"tr", ArkDatePicker.TableRowBaseProps>,
    UnstyledProp {}

export const DatePickerTableRow = withContext<
  HTMLTableRowElement,
  DatePickerTableRowProps
>(ArkDatePicker.TableRow, "tableRow", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface DatePickerTriggerProps
  extends HTMLChakraProps<"button", ArkDatePicker.TriggerBaseProps>,
    UnstyledProp {}

export const DatePickerTrigger = withContext<
  HTMLButtonElement,
  DatePickerTriggerProps
>(ArkDatePicker.Trigger, "trigger", {
  forwardAsChild: true,
  defaultProps: {
    children: <CalendarIcon />,
  },
})

////////////////////////////////////////////////////////////////////////////////////

export interface DatePickerViewProps
  extends HTMLChakraProps<"div", ArkDatePicker.ViewBaseProps>,
    UnstyledProp {}

export const DatePickerView = withContext<HTMLDivElement, DatePickerViewProps>(
  ArkDatePicker.View,
  "view",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface DatePickerViewControlProps
  extends HTMLChakraProps<"div", ArkDatePicker.ViewControlBaseProps>,
    UnstyledProp {}

export const DatePickerViewControl = withContext<
  HTMLDivElement,
  DatePickerViewControlProps
>(ArkDatePicker.ViewControl, "viewControl", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface DatePickerViewTriggerProps
  extends HTMLChakraProps<"button", ArkDatePicker.ViewTriggerBaseProps>,
    UnstyledProp {}

export const DatePickerViewTrigger = withContext<
  HTMLButtonElement,
  DatePickerViewTriggerProps
>(ArkDatePicker.ViewTrigger, "viewTrigger", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface DatePickerYearSelectProps
  extends HTMLChakraProps<"select", ArkDatePicker.YearSelectBaseProps>,
    UnstyledProp {}

export const DatePickerYearSelect = withContext<
  HTMLSelectElement,
  DatePickerYearSelectProps
>(ArkDatePicker.YearSelect, "yearSelect", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export const DatePickerContext = ArkDatePicker.Context

export interface DatePickerValueChangeDetails
  extends ArkDatePicker.ValueChangeDetails {}

export interface DatePickerOpenChangeDetails
  extends ArkDatePicker.OpenChangeDetails {}

export interface DatePickerFocusChangeDetails
  extends ArkDatePicker.FocusChangeDetails {}

export interface DatePickerViewChangeDetails
  extends ArkDatePicker.ViewChangeDetails {}
