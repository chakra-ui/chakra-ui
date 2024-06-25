import type { RecipeDefinition, SlotRecipeDefinition, SystemRecipeFn, SystemSlotRecipeFn } from "../recipe.types"

export interface BadgeVariantProps {
  variant?: "solid" | "subtle" | "outline" | "surface" | "plain"
  size?: "xs" | "sm" | "md" | "lg"
}

export interface ButtonVariantProps {
  size?: "lg" | "md" | "sm" | "xs"
  variant?: "solid" | "subtle" | "outline" | "ghost" | "plain"
}

export interface CodeVariantProps {
  variant?: "solid" | "subtle" | "outline" | "surface" | "plain"
  size?: "xs" | "sm" | "md" | "lg"
}

export interface ContainerVariantProps {}

export interface HeadingVariantProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl"
}

export interface InputVariantProps {
  size?: "lg" | "md" | "sm" | "xs"
  variant?: "outline" | "filled" | "flushed"
}

export interface InputAddonVariantProps {
  size?: "lg" | "md" | "sm" | "xs"
  variant?: "outline" | "filled" | "flushed"
}

export interface KbdVariantProps {
  variant?: "raised" | "outline" | "subtle" | "plain"
  size?: "sm" | "md" | "lg"
}

export interface LinkVariantProps {
  variant?: "underline" | "plain"
}

export interface MarkVariantProps {}

export interface SeparatorVariantProps {
  variant?: "solid" | "dashed"
  orientation?: "vertical" | "horizontal"
}

export interface SkeletonVariantProps {
  loaded?: boolean
  variant?: "pulse" | "shine" | "none"
}

export interface SkipNavLinkVariantProps {}

export interface SpinnerVariantProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl"
}

export interface TextareaVariantProps {
  size?: "lg" | "md" | "sm" | "xs"
  variant?: "outline" | "filled" | "flushed"
}

export interface IconVariantProps {}

export interface FieldVariantProps {}

export interface ErrorMessageVariantProps {}

export interface HelpTextVariantProps {}

export interface LabelVariantProps {}

export interface CheckmarkVariantProps {
  size?: "sm" | "md" | "lg"
  variant?: "outline" | "subtle"
}

export interface RadiomarkVariantProps {
  variant?: "outline" | "subtle" | "classic"
  size?: "sm" | "md" | "lg"
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
  field: SystemRecipeFn<FieldVariantProps>
  errorMessage: SystemRecipeFn<ErrorMessageVariantProps>
  helpText: SystemRecipeFn<HelpTextVariantProps>
  label: SystemRecipeFn<LabelVariantProps>
  checkmark: SystemRecipeFn<CheckmarkVariantProps>
  radiomark: SystemRecipeFn<RadiomarkVariantProps>
}

// Accordion

export type AccordionSlot = "root" | "item" | "itemTrigger" | "itemContent" | "itemIndicator" | "itemBody"

export interface AccordionVariantProps {
  variant?: "outline" | "elevated" | "contained" | "plain"
  size?: "sm" | "md" | "lg"
}

// ActionBar

export type ActionBarSlot = "positioner" | "content" | "separator" | "selectionTrigger"

export interface ActionBarVariantProps {}

// Alert

export type AlertSlot = "title" | "description" | "root" | "icon" | "spinner"

export interface AlertVariantProps {
  status?: "info" | "warning" | "success" | "error"
  variant?: "subtle" | "outline" | "solid"
  size?: "sm" | "md" | "lg"
}

// Avatar

export type AvatarSlot = "root" | "image" | "fallback"

export interface AvatarVariantProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
  variant?: "solid" | "subtle"
  shape?: "square" | "rounded" | "full"
}

// Blockquote

export type BlockquoteSlot = "root" | "icon" | "content" | "caption"

export interface BlockquoteVariantProps {
  justify?: "start" | "center" | "end"
  variant?: "subtle" | "solid" | "plain"
}

// Breadcrumb

export type BreadcrumbSlot = "link" | "currentLink" | "item" | "list" | "root" | "ellipsis" | "separator"

export interface BreadcrumbVariantProps {
  variant?: "underline" | "plain"
  size?: "sm" | "md" | "lg"
}

// Card

export type CardSlot = "root" | "header" | "body" | "footer"

export interface CardVariantProps {
  size?: "sm" | "md" | "lg"
  variant?: "elevated" | "outline" | "subtle"
}

// Checkbox

export type CheckboxSlot = "root" | "label" | "control" | "indicator" | "group"

export interface CheckboxVariantProps {
  size?: "sm" | "md" | "lg"
  variant?: "outline" | "subtle"
}

// CheckboxCard

export type CheckboxCardSlot = "root" | "control" | "label" | "addon" | "indicator"

export interface CheckboxCardVariantProps {
  size?: "sm" | "md" | "lg"
  variant?: "plain" | "subtle"
}

// CircularProgress

export type CircularProgressSlot = "root" | "label" | "track" | "range" | "valueText" | "view" | "circle" | "circleTrack" | "circleRange"

export interface CircularProgressVariantProps {
  indeterminate?: boolean
  valuePlacement?: "center"
  size?: "xs" | "sm" | "md" | "lg"
}

// Collapsible

export type CollapsibleSlot = "root" | "trigger" | "content"

export interface CollapsibleVariantProps {}

// DataList

export type DataListSlot = "root" | "item" | "itemLabel" | "itemValue"

export interface DataListVariantProps {
  orientation?: "horizontal" | "vertical"
  size?: "sm" | "md" | "lg"
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
  centered?: boolean
  scrollBehavior?: "inside" | "outside"
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "full"
  motionPreset?: "scale" | "slide-in-bottom" | "slide-in-top" | "slide-in-left" | "slide-in-right" | "none"
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
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "full"
  placement?: "start" | "end" | "top" | "bottom"
  contained?: boolean
}

// Editable

export type EditableSlot = "root" | "area" | "label" | "preview" | "input" | "editTrigger" | "submitTrigger" | "cancelTrigger" | "control" | "textarea"

export interface EditableVariantProps {}

// EmptyState

export type EmptyStateSlot = "root" | "content" | "indicator"

export interface EmptyStateVariantProps {
  size?: "lg" | "md"
  variant?: "outline" | "plain"
}

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
  size?: "xs" | "sm" | "md" | "lg"
}

// List

export type ListSlot = "root" | "item" | "icon"

export interface ListVariantProps {}

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
  variant?: "subtle" | "solid"
  size?: "sm" | "md"
}

// NativeSelect

export type NativeSelectSlot = "root" | "field" | "indicator"

export interface NativeSelectVariantProps {
  variant?: "outline" | "filled" | "flushed"
  size?: "lg" | "md" | "sm" | "xs"
}

// NumberInput

export type NumberInputSlot = "root" | "label" | "input" | "control" | "incrementTrigger" | "decrementTrigger" | "scrubber"

export interface NumberInputVariantProps {
  size?: "xs" | "sm" | "md" | "lg"
  variant?: "outline" | "filled" | "flushed"
}

// PinInput

export type PinInputSlot = "root" | "label" | "input" | "control"

export interface PinInputVariantProps {
  size?: "lg" | "md" | "sm" | "xs"
  variant?: "outline" | "filled" | "flushed"
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
  size?: "xs" | "sm" | "md" | "lg"
}

// Progress

export type ProgressSlot = "root" | "label" | "track" | "range" | "valueText" | "view" | "circle" | "circleTrack" | "circleRange"

export interface ProgressVariantProps {
  variant?: "outline" | "subtle"
  indeterminate?: boolean
  shape?: "square" | "rounded" | "pill"
  striped?: boolean
  animated?: boolean
  size?: "xs" | "sm" | "md" | "lg"
}

// RadioCard

export type RadioCardSlot = "root" | "label" | "item" | "itemText" | "itemControl" | "indicator" | "itemAddon" | "itemIndicator"

export interface RadioCardVariantProps {
  size?: "sm" | "md" | "lg"
  variant?: "plain" | "subtle"
}

// RadioGroup

export type RadioGroupSlot = "root" | "label" | "item" | "itemText" | "itemControl" | "indicator"

export interface RadioGroupVariantProps {
  variant?: "outline" | "subtle" | "classic"
  size?: "sm" | "md" | "lg"
}

// RatingGroup

export type RatingGroupSlot = "root" | "label" | "item" | "control" | "itemIndicator"

export interface RatingGroupVariantProps {
  size?: "sm" | "md" | "lg"
}

// SegmentGroup

export type SegmentGroupSlot = "root" | "label" | "item" | "itemText" | "itemControl" | "indicator"

export interface SegmentGroupVariantProps {
  size?: "sm" | "md" | "lg"
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
  variant?: "outline" | "filled"
  size?: "sm" | "md" | "lg"
}

// Slider

export type SliderSlot = "root" | "label" | "thumb" | "valueText" | "track" | "range" | "control" | "markerGroup" | "marker"

export interface SliderVariantProps {
  size?: "xs" | "sm" | "md" | "lg"
  variant?: "outline" | "subtle"
  orientation?: "vertical" | "horizontal"
}

// Stat

export type StatSlot = "root" | "label" | "helpText" | "valueText" | "indicator"

export interface StatVariantProps {
  size?: "md"
}

// Steps

export type StepsSlot = "root" | "item" | "title" | "description" | "indicator" | "separator" | "icon" | "number"

export interface StepsVariantProps {
  orientation?: "vertical" | "horizontal"
  variant?: "solid" | "subtle"
  size?: "sm" | "md" | "lg"
}

// Switch

export type SwitchSlot = "root" | "label" | "control" | "thumb"

export interface SwitchVariantProps {
  variant?: "solid" | "outline" | "raised"
  size?: "sm" | "md" | "lg" | "xl"
}

// Table

export type TableSlot = "scrollArea" | "root" | "header" | "body" | "row" | "columnHeader" | "cell" | "footer" | "caption"

export interface TableVariantProps {
  interactive?: boolean
  striped?: boolean
  showColumnBorder?: boolean
  variant?: "line" | "outline"
  size?: "sm" | "md" | "lg"
}

// Tabs

export type TabsSlot = "root" | "trigger" | "list" | "content" | "contentGroup" | "indicator"

export interface TabsVariantProps {
  orientation?: "vertical" | "horizontal"
  fitted?: boolean
  justify?: "start" | "center" | "end"
  size?: "sm" | "md" | "lg"
  variant?: "line" | "enclosed" | "outline" | "plain"
}

// Tag

export type TagSlot = "root" | "label" | "closeTrigger"

export interface TagVariantProps {
  size?: "sm" | "md" | "lg"
  variant?: "subtle" | "solid" | "outline" | "surface" | "raised"
}

// Toast

export type ToastSlot = "root" | "title" | "description" | "icon" | "closeTrigger"

export interface ToastVariantProps {
  variant?: "solid" | "raised"
}

// Tooltip

export type TooltipSlot = "trigger" | "arrow" | "arrowTip" | "positioner" | "content"

export interface TooltipVariantProps {}

// Status

export type StatusSlot = "root" | "indicator"

export interface StatusVariantProps {
  size?: "sm" | "md" | "lg"
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
  circularProgress: SystemSlotRecipeFn<CircularProgressSlot, CircularProgressVariantProps>
  collapsible: SystemSlotRecipeFn<CollapsibleSlot, CollapsibleVariantProps>
  dataList: SystemSlotRecipeFn<DataListSlot, DataListVariantProps>
  dialog: SystemSlotRecipeFn<DialogSlot, DialogVariantProps>
  drawer: SystemSlotRecipeFn<DrawerSlot, DrawerVariantProps>
  editable: SystemSlotRecipeFn<EditableSlot, EditableVariantProps>
  emptyState: SystemSlotRecipeFn<EmptyStateSlot, EmptyStateVariantProps>
  fileUpload: SystemSlotRecipeFn<FileUploadSlot, FileUploadVariantProps>
  hoverCard: SystemSlotRecipeFn<HoverCardSlot, HoverCardVariantProps>
  list: SystemSlotRecipeFn<ListSlot, ListVariantProps>
  menu: SystemSlotRecipeFn<MenuSlot, MenuVariantProps>
  nativeSelect: SystemSlotRecipeFn<NativeSelectSlot, NativeSelectVariantProps>
  numberInput: SystemSlotRecipeFn<NumberInputSlot, NumberInputVariantProps>
  pinInput: SystemSlotRecipeFn<PinInputSlot, PinInputVariantProps>
  popover: SystemSlotRecipeFn<PopoverSlot, PopoverVariantProps>
  progress: SystemSlotRecipeFn<ProgressSlot, ProgressVariantProps>
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
  circularProgress: CircularProgressSlot
  collapsible: CollapsibleSlot
  dataList: DataListSlot
  dialog: DialogSlot
  drawer: DrawerSlot
  editable: EditableSlot
  emptyState: EmptyStateSlot
  fileUpload: FileUploadSlot
  hoverCard: HoverCardSlot
  list: ListSlot
  menu: MenuSlot
  nativeSelect: NativeSelectSlot
  numberInput: NumberInputSlot
  pinInput: PinInputSlot
  popover: PopoverSlot
  progress: ProgressSlot
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
}

export type SlotRecipeRecord<T, K> = T extends keyof ConfigRecipeSlots ? Record<ConfigRecipeSlots[T], K> : Record<string, K>

export type SlotRecipeProps<T> = T extends keyof ConfigSlotRecipes
  ? ConfigSlotRecipes[T]["__type"] & { recipe?: SlotRecipeDefinition }
  : { recipe?: SlotRecipeDefinition }

export type RecipeProps<T> = T extends keyof ConfigRecipes ? ConfigRecipes[T]["__type"] & { recipe?: RecipeDefinition } : { recipe?: RecipeDefinition }
