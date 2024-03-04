import type { SystemRecipeFn, SystemSlotRecipeFn } from "../recipe.types"

interface BadgeRecipeVariants {
  colorScheme: "gray"
  variant: "solid" | "subtle" | "outline"
}

interface CodeRecipeVariants {
  colorScheme: "gray"
  variant: "solid" | "subtle" | "outline"
}

interface ContainerRecipeVariants {}

interface CloseButtonRecipeVariants {
  size: "lg" | "md" | "sm"
}

interface DividerRecipeVariants {
  variant: "solid" | "dashed"
}

interface FieldLabelRecipeVariants {}

interface HeadingRecipeVariants {
  size: "4xl" | "3xl" | "2xl" | "xl" | "lg" | "md" | "sm" | "xs"
}

interface InputRecipeVariants {
  size: "lg" | "md" | "sm" | "xs"
  variant: "outline" | "field" | "flushed"
}

interface KbdRecipeVariants {}

interface LinkRecipeVariants {}

interface MarkRecipeVariants {}

interface PinInputRecipeVariants {
  size: "lg" | "md" | "sm" | "xs"
  variant: "outline" | "field" | "flushed"
}

interface SkeletonRecipeVariants {}

interface SkipLinkRecipeVariants {}

interface SpinnerRecipeVariants {
  size: "xs" | "sm" | "md" | "lg" | "xl"
}

interface SwitchRecipeVariants {
  size: "sm" | "md" | "lg"
}

interface TooltipRecipeVariants {}

interface TextareaRecipeVariants {
  size: "lg" | "md" | "sm" | "xs"
  variant: "outline" | "field" | "flushed"
}

export interface SystemRecipes {
  Badge: SystemRecipeFn<BadgeRecipeVariants>
  Code: SystemRecipeFn<CodeRecipeVariants>
  Container: SystemRecipeFn<ContainerRecipeVariants>
  CloseButton: SystemRecipeFn<CloseButtonRecipeVariants>
  Divider: SystemRecipeFn<DividerRecipeVariants>
  FieldLabel: SystemRecipeFn<FieldLabelRecipeVariants>
  Heading: SystemRecipeFn<HeadingRecipeVariants>
  Input: SystemRecipeFn<InputRecipeVariants>
  Kbd: SystemRecipeFn<KbdRecipeVariants>
  Link: SystemRecipeFn<LinkRecipeVariants>
  Mark: SystemRecipeFn<MarkRecipeVariants>
  PinInput: SystemRecipeFn<PinInputRecipeVariants>
  Skeleton: SystemRecipeFn<SkeletonRecipeVariants>
  SkipLink: SystemRecipeFn<SkipLinkRecipeVariants>
  Spinner: SystemRecipeFn<SpinnerRecipeVariants>
  Switch: SystemRecipeFn<SwitchRecipeVariants>
  Tooltip: SystemRecipeFn<TooltipRecipeVariants>
  Textarea: SystemRecipeFn<TextareaRecipeVariants>
}

// Accordion

type AccordionSlot = "root" | "item" | "trigger" | "content" | "icon"

interface AccordionVariants {}

// Alert

type AlertSlot = "title" | "description" | "root" | "icon" | "spinner"

interface AlertVariants {
  variant: "subtle" | "left-accent" | "top-accent" | "solid"
}

// Avatar

type AvatarSlot = "label" | "badge" | "root" | "excessLabel" | "group"

interface AvatarVariants {
  size: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full"
}

// Breadcrumb

type BreadcrumbSlot = "link" | "item" | "root" | "separator"

interface BreadcrumbVariants {
  current: boolean
}

// Card

type CardSlot = "root" | "header" | "body" | "footer"

interface CardVariants {
  size: "sm" | "md" | "lg"
  variant: "elevated" | "outline" | "filled"
}

// Checkbox

type CheckboxSlot = "control" | "icon" | "root" | "label"

interface CheckboxVariants {
  isChecked: boolean
  isIndeterminate: boolean
  size: "sm" | "md" | "lg"
}

// Dialog

type DialogSlot =
  | "overlay"
  | "positioner"
  | "content"
  | "header"
  | "closeTrigger"
  | "body"
  | "footer"

interface DialogVariants {
  isCentered: boolean
  scrollBehavior: "inside" | "outside"
  size:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "full"
}

// Drawer

type DrawerSlot =
  | "overlay"
  | "positioner"
  | "content"
  | "header"
  | "closeTrigger"
  | "body"
  | "footer"

interface DrawerVariants {
  size: "xs" | "sm" | "md" | "lg" | "xl" | "full"
  isFullHeight: boolean
}

// Editable

type EditableSlot = "root" | "preview" | "input" | "textarea"

interface EditableVariants {}

// Field

type FieldSlot = "root" | "label" | "requiredIndicator" | "helpText"

interface FieldVariants {}

// FieldError

type FieldErrorSlot = "text" | "icon"

interface FieldErrorVariants {}

// List

type ListSlot = "root" | "item" | "icon"

interface ListVariants {}

// Menu

type MenuSlot =
  | "trigger"
  | "content"
  | "item"
  | "groupTitle"
  | "icon"
  | "command"
  | "divider"

interface MenuVariants {}

// NativeSelect

type NativeSelectSlot = "root" | "field" | "icon"

interface NativeSelectVariants {
  variant: "outline" | "field" | "flushed"
  size: "lg" | "md" | "sm" | "xs"
}

// NumberInput

type NumberInputSlot = "root" | "field" | "stepperGroup" | "stepper"

interface NumberInputVariants {
  size: "xs" | "sm" | "md" | "lg"
  variant: "outline" | "field" | "flushed"
}

// Popover

type PopoverSlot =
  | "content"
  | "header"
  | "body"
  | "footer"
  | "positioner"
  | "arrow"
  | "closeTrigger"

interface PopoverVariants {}

// Progress

type ProgressSlot = "root" | "label" | "filledTrack" | "track" | "valueText"

interface ProgressVariants {
  isIndeterminate: boolean
  hasStripe: boolean
  isAnimated: boolean
  size: "xs" | "sm" | "md" | "lg"
}

// Radio

type RadioSlot = "root" | "control" | "label"

interface RadioVariants {
  isChecked: boolean
  size: "sm" | "md" | "lg"
}

// Slider

type SliderSlot = "root" | "track" | "thumb" | "filledTrack" | "mark"

interface SliderVariants {
  size: "sm" | "md" | "lg"
  orientation: "vertical" | "horizontal"
}

// Stat

type StatSlot = "root" | "label" | "helpText" | "number" | "icon"

interface StatVariants {
  size: "md"
}

// Stepper

type StepperSlot =
  | "stepper"
  | "step"
  | "title"
  | "description"
  | "indicator"
  | "separator"
  | "icon"
  | "number"

interface StepperVariants {
  orientation: "vertical" | "horizontal"
  status: "active" | "complete" | "incomplete"
  size: "xs" | "sm" | "md" | "lg"
}

// Table

type TableSlot =
  | "root"
  | "header"
  | "body"
  | "row"
  | "columnHeader"
  | "cell"
  | "footer"
  | "caption"

interface TableVariants {
  numeric: boolean
  variant: "simple" | "stripe"
  size: "sm" | "md" | "lg"
}

// Tabs

type TabsSlot =
  | "root"
  | "trigger"
  | "list"
  | "content"
  | "contentGroup"
  | "indicator"

interface TabsVariants {
  orientation: "vertical" | "horizontal"
  isFitted: boolean
  align: "start" | "center" | "end"
  size: "sm" | "md" | "lg"
  variant:
    | "line"
    | "enclosed"
    | "enclosed-colored"
    | "soft-rounded"
    | "solid-rounded"
}

// Tag

type TagSlot = "root" | "label" | "closeTrigger"

interface TagVariants {
  size: "sm" | "md" | "lg"
  variant: "subtle" | "solid" | "outline"
}

export interface SystemSlotRecipes {
  Accordion: SystemSlotRecipeFn<AccordionSlot, AccordionVariants>
  Alert: SystemSlotRecipeFn<AlertSlot, AlertVariants>
  Avatar: SystemSlotRecipeFn<AvatarSlot, AvatarVariants>
  Breadcrumb: SystemSlotRecipeFn<BreadcrumbSlot, BreadcrumbVariants>
  Card: SystemSlotRecipeFn<CardSlot, CardVariants>
  Checkbox: SystemSlotRecipeFn<CheckboxSlot, CheckboxVariants>
  Dialog: SystemSlotRecipeFn<DialogSlot, DialogVariants>
  Drawer: SystemSlotRecipeFn<DrawerSlot, DrawerVariants>
  Editable: SystemSlotRecipeFn<EditableSlot, EditableVariants>
  Field: SystemSlotRecipeFn<FieldSlot, FieldVariants>
  FieldError: SystemSlotRecipeFn<FieldErrorSlot, FieldErrorVariants>
  List: SystemSlotRecipeFn<ListSlot, ListVariants>
  Menu: SystemSlotRecipeFn<MenuSlot, MenuVariants>
  NativeSelect: SystemSlotRecipeFn<NativeSelectSlot, NativeSelectVariants>
  NumberInput: SystemSlotRecipeFn<NumberInputSlot, NumberInputVariants>
  Popover: SystemSlotRecipeFn<PopoverSlot, PopoverVariants>
  Progress: SystemSlotRecipeFn<ProgressSlot, ProgressVariants>
  Radio: SystemSlotRecipeFn<RadioSlot, RadioVariants>
  Slider: SystemSlotRecipeFn<SliderSlot, SliderVariants>
  Stat: SystemSlotRecipeFn<StatSlot, StatVariants>
  Stepper: SystemSlotRecipeFn<StepperSlot, StepperVariants>
  Table: SystemSlotRecipeFn<TableSlot, TableVariants>
  Tabs: SystemSlotRecipeFn<TabsSlot, TabsVariants>
  Tag: SystemSlotRecipeFn<TagSlot, TagVariants>
}

export type SystemRecipeProps<T> = T extends keyof SystemRecipes
  ? SystemRecipes[T]["__type"]
  : T extends keyof SystemSlotRecipes
  ? SystemSlotRecipes[T]["__type"]
  : {}
