import type { RecipeDefinition, SlotRecipeDefinition, SystemRecipeFn, SystemSlotRecipeFn } from "../recipe.types"
import type { ConditionalValue } from "../css.types"

export interface BadgeVariantProps {
  /** @default "subtle" */
  variant?: ConditionalValue<"solid" | "subtle" | "outline" | "surface" | "plain">
  /** @default "sm" */
  size?: ConditionalValue<"xs" | "sm" | "md" | "lg">
}

export interface ButtonVariantProps {
  /** @default "md" */
  size?: ConditionalValue<"xs" | "sm" | "md" | "lg">
  /** @default "solid" */
  variant?: ConditionalValue<"solid" | "subtle" | "outline" | "ghost" | "plain">
}

export interface CodeVariantProps {
  /** @default "subtle" */
  variant?: ConditionalValue<"solid" | "subtle" | "outline" | "surface" | "plain">
  /** @default "sm" */
  size?: ConditionalValue<"xs" | "sm" | "md" | "lg">
}

export interface ContainerVariantProps {
  centerContent?: ConditionalValue<boolean>
  fluid?: ConditionalValue<boolean>
}

export interface HeadingVariantProps {
  /** @default "xl" */
  size?: ConditionalValue<"xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl">
}

export interface InputVariantProps {
  /** @default "md" */
  size?: ConditionalValue<"lg" | "md" | "sm" | "xs">
  /** @default "outline" */
  variant?: ConditionalValue<"outline" | "filled" | "flushed">
}

export interface InputAddonVariantProps {
  /** @default "md" */
  size?: ConditionalValue<"lg" | "md" | "sm" | "xs">
  /** @default "outline" */
  variant?: ConditionalValue<"outline" | "filled" | "flushed">
}

export interface KbdVariantProps {
  /** @default "raised" */
  variant?: ConditionalValue<"raised" | "outline" | "subtle" | "plain">
  /** @default "md" */
  size?: ConditionalValue<"sm" | "md" | "lg">
}

export interface LinkVariantProps {
  /** @default "plain" */
  variant?: ConditionalValue<"underline" | "plain">
}

export interface MarkVariantProps {
  /** @default "plain" */
  variant?: ConditionalValue<"subtle" | "solid" | "text" | "plain">
}

export interface SeparatorVariantProps {
  /** @default "solid" */
  variant?: ConditionalValue<"solid" | "dashed" | "dotted">
  /** @default "horizontal" */
  orientation?: ConditionalValue<"vertical" | "horizontal">
  /** @default "sm" */
  size?: ConditionalValue<"xs" | "sm" | "md" | "lg">
}

export interface SkeletonVariantProps {
  /** @default true */
  loading?: ConditionalValue<boolean>
  /** @default "pulse" */
  variant?: ConditionalValue<"pulse" | "shine" | "none">
}

export interface SkipNavLinkVariantProps {}

export interface SpinnerVariantProps {
  /** @default "md" */
  size?: ConditionalValue<"xs" | "sm" | "md" | "lg" | "xl">
}

export interface TextareaVariantProps {
  /** @default "md" */
  size?: ConditionalValue<"lg" | "md" | "sm" | "xs">
  /** @default "outline" */
  variant?: ConditionalValue<"outline" | "filled" | "flushed">
}

export interface IconVariantProps {}

export interface CheckmarkVariantProps {
  /** @default "md" */
  size?: ConditionalValue<"sm" | "md" | "lg">
  /** @default "outline" */
  variant?: ConditionalValue<"outline" | "subtle">
}

export interface RadiomarkVariantProps {
  /** @default "outline" */
  variant?: ConditionalValue<"outline" | "subtle" | "classic">
  /** @default "md" */
  size?: ConditionalValue<"sm" | "md" | "lg">
}

export interface ConfigRecipes {
  badge: SystemRecipeFn<BadgeVariantProps>
  button: SystemRecipeFn<ButtonVariantProps>
  code: SystemRecipeFn<CodeVariantProps>
  container: SystemRecipeFn<ContainerVariantProps>
  heading: SystemRecipeFn<HeadingVariantProps>
  input: SystemRecipeFn<InputVariantProps>
  inputAddon: SystemRecipeFn<InputAddonVariantProps>
  kbd: SystemRecipeFn<KbdVariantProps>
  link: SystemRecipeFn<LinkVariantProps>
  mark: SystemRecipeFn<MarkVariantProps>
  separator: SystemRecipeFn<SeparatorVariantProps>
  skeleton: SystemRecipeFn<SkeletonVariantProps>
  skipNavLink: SystemRecipeFn<SkipNavLinkVariantProps>
  spinner: SystemRecipeFn<SpinnerVariantProps>
  textarea: SystemRecipeFn<TextareaVariantProps>
  icon: SystemRecipeFn<IconVariantProps>
  checkmark: SystemRecipeFn<CheckmarkVariantProps>
  radiomark: SystemRecipeFn<RadiomarkVariantProps>
}

// Accordion

export type AccordionSlot = "root" | "item" | "itemTrigger" | "itemContent" | "itemIndicator" | "itemBody"

export interface AccordionVariantProps {
  /** @default "outline" */
  variant?: ConditionalValue<"outline" | "elevated" | "contained" | "plain">
  /** @default "md" */
  size?: ConditionalValue<"sm" | "md" | "lg">
}

// ActionBar

export type ActionBarSlot = "positioner" | "content" | "separator" | "selectionTrigger" | "closeTrigger"

export interface ActionBarVariantProps {}

// Alert

export type AlertSlot = "title" | "description" | "root" | "indicator" | "spinner"

export interface AlertVariantProps {
  /** @default "info" */
  status?: ConditionalValue<"info" | "warning" | "success" | "error" | "neutral">
  /** @default "subtle" */
  variant?: ConditionalValue<"subtle" | "outline" | "solid">
  /** @default "md" */
  size?: ConditionalValue<"sm" | "md" | "lg">
}

// Avatar

export type AvatarSlot = "root" | "image" | "fallback"

export interface AvatarVariantProps {
  /** @default "md" */
  size?: ConditionalValue<"xs" | "sm" | "md" | "lg" | "xl" | "2xl">
  /** @default "subtle" */
  variant?: ConditionalValue<"solid" | "subtle" | "outline">
  /** @default "full" */
  shape?: ConditionalValue<"square" | "rounded" | "full">
}

// Blockquote

export type BlockquoteSlot = "root" | "icon" | "content" | "caption"

export interface BlockquoteVariantProps {
  /** @default "start" */
  justify?: ConditionalValue<"start" | "center" | "end">
  /** @default "subtle" */
  variant?: ConditionalValue<"subtle" | "solid" | "plain">
}

// Breadcrumb

export type BreadcrumbSlot = "link" | "currentLink" | "item" | "list" | "root" | "ellipsis" | "separator"

export interface BreadcrumbVariantProps {
  /** @default "plain" */
  variant?: ConditionalValue<"underline" | "plain">
  /** @default "md" */
  size?: ConditionalValue<"sm" | "md" | "lg">
}

// Card

export type CardSlot = "root" | "header" | "body" | "footer" | "title" | "description"

export interface CardVariantProps {
  /** @default "md" */
  size?: ConditionalValue<"sm" | "md" | "lg">
  /** @default "outline" */
  variant?: ConditionalValue<"elevated" | "outline" | "subtle">
}

// Checkbox

export type CheckboxSlot = "root" | "label" | "control" | "indicator" | "group"

export interface CheckboxVariantProps {
  /** @default "md" */
  size?: ConditionalValue<"sm" | "md" | "lg">
  /** @default "outline" */
  variant?: ConditionalValue<"outline" | "subtle">
}

// CheckboxCard

export type CheckboxCardSlot = "root" | "control" | "label" | "addon" | "indicator"

export interface CheckboxCardVariantProps {
  /** @default "md" */
  size?: ConditionalValue<"sm" | "md" | "lg">
  /** @default "subtle" */
  variant?: ConditionalValue<"plain" | "subtle">
}

// Collapsible

export type CollapsibleSlot = "root" | "trigger" | "content"

export interface CollapsibleVariantProps {}

// DataList

export type DataListSlot = "root" | "item" | "itemLabel" | "itemValue"

export interface DataListVariantProps {
  /** @default "vertical" */
  orientation?: ConditionalValue<"horizontal" | "vertical">
  /** @default "md" */
  size?: ConditionalValue<"sm" | "md" | "lg">
}

// Dialog

export type DialogSlot =
  | "trigger"
  | "backdrop"
  | "positioner"
  | "content"
  | "title"
  | "description"
  | "closeTrigger"
  | "header"
  | "body"
  | "footer"
  | "backdrop"

export interface DialogVariantProps {
  centered?: ConditionalValue<boolean>
  /** @default "outside" */
  scrollBehavior?: ConditionalValue<"inside" | "outside">
  /** @default "md" */
  size?: ConditionalValue<"xs" | "sm" | "md" | "lg" | "xl" | "full">
  /** @default "scale" */
  motionPreset?: ConditionalValue<"scale" | "slide-in-bottom" | "slide-in-top" | "slide-in-left" | "slide-in-right" | "none">
}

// Drawer

export type DrawerSlot =
  | "trigger"
  | "backdrop"
  | "positioner"
  | "content"
  | "title"
  | "description"
  | "closeTrigger"
  | "header"
  | "body"
  | "footer"
  | "backdrop"

export interface DrawerVariantProps {
  /** @default "xs" */
  size?: ConditionalValue<"xs" | "sm" | "md" | "lg" | "xl" | "full">
  /** @default "end" */
  placement?: ConditionalValue<"start" | "end" | "top" | "bottom">
  contained?: ConditionalValue<boolean>
}

// Editable

export type EditableSlot = "root" | "area" | "label" | "preview" | "input" | "editTrigger" | "submitTrigger" | "cancelTrigger" | "control" | "textarea"

export interface EditableVariantProps {}

// EmptyState

export type EmptyStateSlot = "root" | "content" | "indicator" | "title" | "description"

export interface EmptyStateVariantProps {
  /** @default "md" */
  size?: ConditionalValue<"md" | "lg">
}

// Field

export type FieldSlot = "root" | "errorText" | "helperText" | "input" | "label" | "select" | "textarea" | "requiredIndicator"

export interface FieldVariantProps {}

// FileUpload

export type FileUploadSlot =
  | "root"
  | "dropzone"
  | "item"
  | "itemDeleteTrigger"
  | "itemGroup"
  | "itemName"
  | "itemPreview"
  | "itemPreviewImage"
  | "itemSizeText"
  | "label"
  | "trigger"

export interface FileUploadVariantProps {}

// HoverCard

export type HoverCardSlot = "arrow" | "arrowTip" | "trigger" | "positioner" | "content"

export interface HoverCardVariantProps {
  /** @default "md" */
  size?: ConditionalValue<"xs" | "sm" | "md" | "lg">
}

// List

export type ListSlot = "root" | "item" | "icon"

export interface ListVariantProps {
  /** @default "plain" */
  variant?: ConditionalValue<"marker" | "plain">
}

// Menu

export type MenuSlot =
  | "arrow"
  | "arrowTip"
  | "content"
  | "contextTrigger"
  | "indicator"
  | "item"
  | "itemGroup"
  | "itemGroupLabel"
  | "itemIndicator"
  | "itemText"
  | "positioner"
  | "separator"
  | "trigger"
  | "triggerItem"
  | "itemCommand"

export interface MenuVariantProps {
  /** @default "subtle" */
  variant?: ConditionalValue<"subtle" | "solid">
  /** @default "md" */
  size?: ConditionalValue<"sm" | "md">
}

// NativeSelect

export type NativeSelectSlot = "root" | "field" | "indicator"

export interface NativeSelectVariantProps {
  /** @default "outline" */
  variant?: ConditionalValue<"outline" | "filled">
  /** @default "md" */
  size?: ConditionalValue<"lg" | "md" | "sm" | "xs">
}

// NumberInput

export type NumberInputSlot = "root" | "label" | "input" | "control" | "valueText" | "incrementTrigger" | "decrementTrigger" | "scrubber"

export interface NumberInputVariantProps {
  /** @default "md" */
  size?: ConditionalValue<"xs" | "sm" | "md" | "lg">
  /** @default "outline" */
  variant?: ConditionalValue<"outline" | "filled" | "flushed">
}

// PinInput

export type PinInputSlot = "root" | "label" | "input" | "control"

export interface PinInputVariantProps {
  /** @default "md" */
  size?: ConditionalValue<"lg" | "md" | "sm" | "xs">
  /** @default "outline" */
  variant?: ConditionalValue<"outline" | "filled" | "flushed">
}

// Popover

export type PopoverSlot =
  | "arrow"
  | "arrowTip"
  | "anchor"
  | "trigger"
  | "indicator"
  | "positioner"
  | "content"
  | "title"
  | "description"
  | "closeTrigger"
  | "header"
  | "body"
  | "footer"

export interface PopoverVariantProps {
  /** @default "md" */
  size?: ConditionalValue<"xs" | "sm" | "md" | "lg">
}

// Progress

export type ProgressSlot = "root" | "label" | "track" | "range" | "valueText" | "view" | "circle" | "circleTrack" | "circleRange"

export interface ProgressVariantProps {
  /** @default "outline" */
  variant?: ConditionalValue<"outline" | "subtle">
  /** @default "rounded" */
  shape?: ConditionalValue<"square" | "rounded" | "pill">
  striped?: ConditionalValue<boolean>
  animated?: ConditionalValue<boolean>
  /** @default "md" */
  size?: ConditionalValue<"xs" | "sm" | "md" | "lg">
}

// ProgressCircle

export type ProgressCircleSlot = "root" | "label" | "track" | "range" | "valueText" | "view" | "circle" | "circleTrack" | "circleRange"

export interface ProgressCircleVariantProps {
  /** @default "md" */
  size?: ConditionalValue<"xs" | "sm" | "md" | "lg">
}

// RadioCard

export type RadioCardSlot = "root" | "label" | "item" | "itemText" | "itemControl" | "indicator" | "itemAddon" | "itemIndicator"

export interface RadioCardVariantProps {
  /** @default "md" */
  size?: ConditionalValue<"sm" | "md" | "lg">
  /** @default "subtle" */
  variant?: ConditionalValue<"plain" | "subtle">
}

// RadioGroup

export type RadioGroupSlot = "root" | "label" | "item" | "itemText" | "itemControl" | "indicator"

export interface RadioGroupVariantProps {
  /** @default "outline" */
  variant?: ConditionalValue<"outline" | "subtle" | "classic">
  /** @default "md" */
  size?: ConditionalValue<"sm" | "md" | "lg">
}

// RatingGroup

export type RatingGroupSlot = "root" | "label" | "item" | "control" | "itemIndicator"

export interface RatingGroupVariantProps {
  /** @default "md" */
  size?: ConditionalValue<"xs" | "sm" | "md" | "lg">
}

// SegmentGroup

export type SegmentGroupSlot = "root" | "label" | "item" | "itemText" | "itemControl" | "indicator"

export interface SegmentGroupVariantProps {
  /** @default "md" */
  size?: ConditionalValue<"sm" | "md" | "lg">
}

// Select

export type SelectSlot =
  | "label"
  | "positioner"
  | "trigger"
  | "indicator"
  | "clearTrigger"
  | "item"
  | "itemText"
  | "itemIndicator"
  | "itemGroup"
  | "itemGroupLabel"
  | "list"
  | "content"
  | "root"
  | "control"
  | "valueText"

export interface SelectVariantProps {
  /** @default "outline" */
  variant?: ConditionalValue<"outline" | "filled">
  /** @default "md" */
  size?: ConditionalValue<"xs" | "sm" | "md" | "lg">
}

// Slider

export type SliderSlot = "root" | "label" | "thumb" | "valueText" | "track" | "range" | "control" | "markerGroup" | "marker"

export interface SliderVariantProps {
  /** @default "md" */
  size?: ConditionalValue<"xs" | "sm" | "md" | "lg">
  /** @default "outline" */
  variant?: ConditionalValue<"outline" | "subtle">
  /** @default "horizontal" */
  orientation?: ConditionalValue<"vertical" | "horizontal">
}

// Stat

export type StatSlot = "root" | "label" | "helpText" | "valueText" | "valueUnit" | "indicator"

export interface StatVariantProps {
  /** @default "md" */
  size?: ConditionalValue<"sm" | "md" | "lg">
}

// Steps

export type StepsSlot =
  | "root"
  | "list"
  | "item"
  | "trigger"
  | "indicator"
  | "separator"
  | "content"
  | "title"
  | "description"
  | "nextTrigger"
  | "prevTrigger"
  | "progress"

export interface StepsVariantProps {
  /** @default "horizontal" */
  orientation?: ConditionalValue<"vertical" | "horizontal">
  /** @default "solid" */
  variant?: ConditionalValue<"solid" | "subtle">
  /** @default "md" */
  size?: ConditionalValue<"sm" | "md" | "lg">
}

// Switch

export type SwitchSlot = "root" | "label" | "control" | "thumb" | "indicator"

export interface SwitchVariantProps {
  /** @default "solid" */
  variant?: ConditionalValue<"solid" | "outline" | "raised">
  /** @default "md" */
  size?: ConditionalValue<"xs" | "sm" | "md" | "lg">
}

// Table

export type TableSlot = "root" | "header" | "body" | "row" | "columnHeader" | "cell" | "footer" | "caption"

export interface TableVariantProps {
  interactive?: ConditionalValue<boolean>
  stickyHeader?: ConditionalValue<boolean>
  striped?: ConditionalValue<boolean>
  showColumnBorder?: ConditionalValue<boolean>
  /** @default "line" */
  variant?: ConditionalValue<"line" | "outline">
  /** @default "md" */
  size?: ConditionalValue<"sm" | "md" | "lg">
}

// Tabs

export type TabsSlot = "root" | "trigger" | "list" | "content" | "contentGroup" | "indicator"

export interface TabsVariantProps {
  /** @default "horizontal" */
  orientation?: ConditionalValue<"vertical" | "horizontal">
  fitted?: ConditionalValue<boolean>
  justify?: ConditionalValue<"start" | "center" | "end">
  /** @default "md" */
  size?: ConditionalValue<"sm" | "md" | "lg">
  /** @default "line" */
  variant?: ConditionalValue<"line" | "soft" | "enclosed" | "outline" | "plain">
}

// Tag

export type TagSlot = "root" | "label" | "closeTrigger"

export interface TagVariantProps {
  /** @default "md" */
  size?: ConditionalValue<"sm" | "md" | "lg">
  /** @default "surface" */
  variant?: ConditionalValue<"subtle" | "solid" | "outline" | "surface" | "raised">
}

// Toast

export type ToastSlot = "root" | "title" | "description" | "indicator" | "closeTrigger" | "actionTrigger"

export interface ToastVariantProps {}

// Tooltip

export type TooltipSlot = "trigger" | "arrow" | "arrowTip" | "positioner" | "content"

export interface TooltipVariantProps {}

// Status

export type StatusSlot = "root" | "indicator"

export interface StatusVariantProps {
  /** @default "md" */
  size?: ConditionalValue<"sm" | "md" | "lg">
}

// Timeline

export type TimelineSlot = "root" | "item" | "content" | "separator" | "indicator" | "connector"

export interface TimelineVariantProps {
  /** @default "solid" */
  variant?: ConditionalValue<"subtle" | "solid" | "outline" | "plain">
  /** @default "md" */
  size?: ConditionalValue<"sm" | "md">
}

export interface ConfigSlotRecipes {
  accordion: SystemSlotRecipeFn<AccordionSlot, AccordionVariantProps>
  actionBar: SystemSlotRecipeFn<ActionBarSlot, ActionBarVariantProps>
  alert: SystemSlotRecipeFn<AlertSlot, AlertVariantProps>
  avatar: SystemSlotRecipeFn<AvatarSlot, AvatarVariantProps>
  blockquote: SystemSlotRecipeFn<BlockquoteSlot, BlockquoteVariantProps>
  breadcrumb: SystemSlotRecipeFn<BreadcrumbSlot, BreadcrumbVariantProps>
  card: SystemSlotRecipeFn<CardSlot, CardVariantProps>
  checkbox: SystemSlotRecipeFn<CheckboxSlot, CheckboxVariantProps>
  checkboxCard: SystemSlotRecipeFn<CheckboxCardSlot, CheckboxCardVariantProps>
  collapsible: SystemSlotRecipeFn<CollapsibleSlot, CollapsibleVariantProps>
  dataList: SystemSlotRecipeFn<DataListSlot, DataListVariantProps>
  dialog: SystemSlotRecipeFn<DialogSlot, DialogVariantProps>
  drawer: SystemSlotRecipeFn<DrawerSlot, DrawerVariantProps>
  editable: SystemSlotRecipeFn<EditableSlot, EditableVariantProps>
  emptyState: SystemSlotRecipeFn<EmptyStateSlot, EmptyStateVariantProps>
  field: SystemSlotRecipeFn<FieldSlot, FieldVariantProps>
  fileUpload: SystemSlotRecipeFn<FileUploadSlot, FileUploadVariantProps>
  hoverCard: SystemSlotRecipeFn<HoverCardSlot, HoverCardVariantProps>
  list: SystemSlotRecipeFn<ListSlot, ListVariantProps>
  menu: SystemSlotRecipeFn<MenuSlot, MenuVariantProps>
  nativeSelect: SystemSlotRecipeFn<NativeSelectSlot, NativeSelectVariantProps>
  numberInput: SystemSlotRecipeFn<NumberInputSlot, NumberInputVariantProps>
  pinInput: SystemSlotRecipeFn<PinInputSlot, PinInputVariantProps>
  popover: SystemSlotRecipeFn<PopoverSlot, PopoverVariantProps>
  progress: SystemSlotRecipeFn<ProgressSlot, ProgressVariantProps>
  progressCircle: SystemSlotRecipeFn<ProgressCircleSlot, ProgressCircleVariantProps>
  radioCard: SystemSlotRecipeFn<RadioCardSlot, RadioCardVariantProps>
  radioGroup: SystemSlotRecipeFn<RadioGroupSlot, RadioGroupVariantProps>
  ratingGroup: SystemSlotRecipeFn<RatingGroupSlot, RatingGroupVariantProps>
  segmentGroup: SystemSlotRecipeFn<SegmentGroupSlot, SegmentGroupVariantProps>
  select: SystemSlotRecipeFn<SelectSlot, SelectVariantProps>
  slider: SystemSlotRecipeFn<SliderSlot, SliderVariantProps>
  stat: SystemSlotRecipeFn<StatSlot, StatVariantProps>
  steps: SystemSlotRecipeFn<StepsSlot, StepsVariantProps>
  switch: SystemSlotRecipeFn<SwitchSlot, SwitchVariantProps>
  table: SystemSlotRecipeFn<TableSlot, TableVariantProps>
  tabs: SystemSlotRecipeFn<TabsSlot, TabsVariantProps>
  tag: SystemSlotRecipeFn<TagSlot, TagVariantProps>
  toast: SystemSlotRecipeFn<ToastSlot, ToastVariantProps>
  tooltip: SystemSlotRecipeFn<TooltipSlot, TooltipVariantProps>
  status: SystemSlotRecipeFn<StatusSlot, StatusVariantProps>
  timeline: SystemSlotRecipeFn<TimelineSlot, TimelineVariantProps>
}
export interface ConfigRecipeSlots {
  accordion: AccordionSlot
  actionBar: ActionBarSlot
  alert: AlertSlot
  avatar: AvatarSlot
  blockquote: BlockquoteSlot
  breadcrumb: BreadcrumbSlot
  card: CardSlot
  checkbox: CheckboxSlot
  checkboxCard: CheckboxCardSlot
  collapsible: CollapsibleSlot
  dataList: DataListSlot
  dialog: DialogSlot
  drawer: DrawerSlot
  editable: EditableSlot
  emptyState: EmptyStateSlot
  field: FieldSlot
  fileUpload: FileUploadSlot
  hoverCard: HoverCardSlot
  list: ListSlot
  menu: MenuSlot
  nativeSelect: NativeSelectSlot
  numberInput: NumberInputSlot
  pinInput: PinInputSlot
  popover: PopoverSlot
  progress: ProgressSlot
  progressCircle: ProgressCircleSlot
  radioCard: RadioCardSlot
  radioGroup: RadioGroupSlot
  ratingGroup: RatingGroupSlot
  segmentGroup: SegmentGroupSlot
  select: SelectSlot
  slider: SliderSlot
  stat: StatSlot
  steps: StepsSlot
  switch: SwitchSlot
  table: TableSlot
  tabs: TabsSlot
  tag: TagSlot
  toast: ToastSlot
  tooltip: TooltipSlot
  status: StatusSlot
  timeline: TimelineSlot
}

export type SlotRecipeRecord<T, K> = T extends keyof ConfigRecipeSlots ? Record<ConfigRecipeSlots[T], K> : Record<string, K>
export type SlotRecipeProps<T> = T extends keyof ConfigSlotRecipes
  ? ConfigSlotRecipes[T]["__type"] & { recipe?: SlotRecipeDefinition }
  : { recipe?: SlotRecipeDefinition }
export type RecipeProps<T> = T extends keyof ConfigRecipes ? ConfigRecipes[T]["__type"] & { recipe?: RecipeDefinition } : { recipe?: RecipeDefinition }
