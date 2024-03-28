import type {
  RecipeDefinition,
  SlotRecipeDefinition,
  SystemRecipeFn,
  SystemSlotRecipeFn,
} from "../recipe.types"

export interface BadgeVariantProps {
  variant?: "solid" | "subtle" | "outline" | "surface" | "plain"
  size?: "xs" | "sm" | "md" | "lg"
}

export interface ButtonVariantProps {
  size?: "lg" | "md" | "sm" | "xs"
  variant?: "solid" | "subtle" | "outline" | "ghost"
}

export interface CodeVariantProps {
  variant?: "solid" | "subtle" | "outline" | "surface" | "plain"
  size?: "xs" | "sm" | "md" | "lg"
}

export interface ContainerVariantProps {}

export interface HeadingVariantProps {
  size?:
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
    | "7xl"
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

export interface PinInputVariantProps {
  size?: "lg" | "md" | "sm" | "xs"
  variant?: "outline" | "filled" | "flushed"
}

export interface SeparatorVariantProps {
  variant?: "solid" | "dashed"
  orientation?: "vertical" | "horizontal"
}

export interface SkeletonVariantProps {
  isLoaded?: boolean
  variant?: "pulse" | "shine" | "none"
}

export interface SkipLinkVariantProps {}

export interface SpinnerVariantProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl"
}

export interface TooltipVariantProps {}

export interface TextareaVariantProps {
  size?: "lg" | "md" | "sm" | "xs"
  variant?: "outline" | "filled" | "flushed"
}

export interface IconVariantProps {}

export interface ConfigRecipes {
  Badge: SystemRecipeFn<BadgeVariantProps>
  Button: SystemRecipeFn<ButtonVariantProps>
  Code: SystemRecipeFn<CodeVariantProps>
  Container: SystemRecipeFn<ContainerVariantProps>
  Heading: SystemRecipeFn<HeadingVariantProps>
  Input: SystemRecipeFn<InputVariantProps>
  InputAddon: SystemRecipeFn<InputAddonVariantProps>
  Kbd: SystemRecipeFn<KbdVariantProps>
  Link: SystemRecipeFn<LinkVariantProps>
  Mark: SystemRecipeFn<MarkVariantProps>
  PinInput: SystemRecipeFn<PinInputVariantProps>
  Separator: SystemRecipeFn<SeparatorVariantProps>
  Skeleton: SystemRecipeFn<SkeletonVariantProps>
  SkipLink: SystemRecipeFn<SkipLinkVariantProps>
  Spinner: SystemRecipeFn<SpinnerVariantProps>
  Tooltip: SystemRecipeFn<TooltipVariantProps>
  Textarea: SystemRecipeFn<TextareaVariantProps>
  Icon: SystemRecipeFn<IconVariantProps>
}

// Accordion

export type AccordionSlot =
  | "root"
  | "item"
  | "trigger"
  | "content"
  | "indicator"

export interface AccordionVariantProps {
  variant?: "outline" | "elevated" | "contained" | "plain"
  size?: "sm" | "md" | "lg"
}

// Alert

export type AlertSlot = "title" | "description" | "root" | "icon" | "spinner"

export interface AlertVariantProps {
  status?: "info" | "warning" | "success" | "error"
  variant?: "subtle" | "outline" | "solid"
  size?: "sm" | "md" | "lg"
}

// Avatar

export type AvatarSlot = "group" | "root" | "image" | "fallback" | "badge"

export interface AvatarVariantProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
  variant?: "solid" | "subtle"
  shape?: "square" | "rounded" | "full"
}

// Breadcrumb

export type BreadcrumbSlot =
  | "link"
  | "currentLink"
  | "item"
  | "list"
  | "root"
  | "ellipsis"
  | "separator"

export interface BreadcrumbVariantProps {
  variant?: "underline" | "plain"
  size?: "sm" | "md" | "lg"
}

// Blockquote

export type BlockquoteSlot = "root" | "icon" | "content" | "caption"

export interface BlockquoteVariantProps {
  justify?: "start" | "center" | "end"
  variant?: "subtle" | "solid" | "plain"
}

// Card

export type CardSlot = "root" | "header" | "body" | "footer"

export interface CardVariantProps {
  size?: "sm" | "md" | "lg"
  variant?: "elevated" | "outline" | "subtle"
}

// Checkbox

export type CheckboxSlot = "control" | "indicator" | "root" | "label"

export interface CheckboxVariantProps {
  size?: "sm" | "md" | "lg"
  variant?: "outline" | "subtle"
}

// Dialog

export type DialogSlot =
  | "overlay"
  | "positioner"
  | "content"
  | "header"
  | "closeTrigger"
  | "body"
  | "footer"

export interface DialogVariantProps {
  centered?: boolean
  scrollBehavior?: "inside" | "outside"
  size?:
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

export type DrawerSlot =
  | "overlay"
  | "positioner"
  | "content"
  | "header"
  | "closeTrigger"
  | "body"
  | "footer"

export interface DrawerVariantProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "full"
  isFullHeight?: boolean
}

// Editable

export type EditableSlot = "root" | "preview" | "input" | "textarea"

export interface EditableVariantProps {}

// Field

export type FieldSlot =
  | "root"
  | "label"
  | "requiredIndicator"
  | "helpText"
  | "errorMessage"

export interface FieldVariantProps {}

// List

export type ListSlot = "root" | "item" | "icon"

export interface ListVariantProps {}

// Menu

export type MenuSlot =
  | "trigger"
  | "content"
  | "item"
  | "groupTitle"
  | "indicator"
  | "command"
  | "separator"

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

export type NumberInputSlot =
  | "root"
  | "field"
  | "control"
  | "incrementTrigger"
  | "decrementTrigger"

export interface NumberInputVariantProps {
  size?: "xs" | "sm" | "md" | "lg"
  variant?: "outline" | "filled" | "flushed"
}

// Popover

export type PopoverSlot =
  | "content"
  | "header"
  | "body"
  | "footer"
  | "positioner"
  | "arrow"
  | "closeTrigger"

export interface PopoverVariantProps {
  size?: "xs" | "sm" | "md" | "lg"
}

// Progress

export type ProgressSlot =
  | "root"
  | "label"
  | "filledTrack"
  | "track"
  | "valueText"

export interface ProgressVariantProps {
  variant?: "outline" | "subtle"
  indeterminate?: boolean
  shape?: "square" | "rounded" | "pill"
  hasStripe?: boolean
  isAnimated?: boolean
  size?: "xs" | "sm" | "md" | "lg"
}

// Radio

export type RadioSlot = "root" | "item" | "control" | "indicator" | "label"

export interface RadioVariantProps {
  variant?: "outline" | "subtle" | "classic"
  size?: "sm" | "md" | "lg"
}

// Slider

export type SliderSlot =
  | "root"
  | "control"
  | "track"
  | "thumb"
  | "label"
  | "filledTrack"
  | "mark"
  | "valueText"

export interface SliderVariantProps {
  size?: "xs" | "sm" | "md" | "lg"
  variant?: "outline" | "subtle"
  orientation?: "vertical" | "horizontal"
}

// Stat

export type StatSlot =
  | "group"
  | "root"
  | "label"
  | "helpText"
  | "number"
  | "indicator"

export interface StatVariantProps {
  size?: "md"
}

// Steps

export type StepsSlot =
  | "root"
  | "item"
  | "title"
  | "description"
  | "indicator"
  | "separator"
  | "icon"
  | "number"

export interface StepsVariantProps {
  orientation?: "vertical" | "horizontal"
  variant?: "solid" | "subtle"
  size?: "sm" | "md" | "lg"
}

// Switch

export type SwitchSlot = "root" | "track" | "thumb" | "label"

export interface SwitchVariantProps {
  variant?: "solid" | "outline" | "raised"
  size?: "sm" | "md" | "lg" | "xl"
}

// Table

export type TableSlot =
  | "root"
  | "header"
  | "body"
  | "row"
  | "columnHeader"
  | "cell"
  | "footer"
  | "caption"

export interface TableVariantProps {
  numeric?: boolean
  interactive?: boolean
  striped?: boolean
  showColumnBorder?: boolean
  variant?: "line" | "outline"
  size?: "sm" | "md" | "lg"
}

// Tabs

export type TabsSlot =
  | "root"
  | "trigger"
  | "list"
  | "content"
  | "contentGroup"
  | "indicator"

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

export type ToastSlot =
  | "root"
  | "title"
  | "description"
  | "icon"
  | "closeTrigger"

export interface ToastVariantProps {
  status?: "default" | "info" | "warning" | "success" | "error" | "loading"
  variant?: "solid" | "raised"
}

export interface ConfigSlotRecipes {
  Accordion: SystemSlotRecipeFn<AccordionSlot, AccordionVariantProps>
  Alert: SystemSlotRecipeFn<AlertSlot, AlertVariantProps>
  Avatar: SystemSlotRecipeFn<AvatarSlot, AvatarVariantProps>
  Breadcrumb: SystemSlotRecipeFn<BreadcrumbSlot, BreadcrumbVariantProps>
  Blockquote: SystemSlotRecipeFn<BlockquoteSlot, BlockquoteVariantProps>
  Card: SystemSlotRecipeFn<CardSlot, CardVariantProps>
  Checkbox: SystemSlotRecipeFn<CheckboxSlot, CheckboxVariantProps>
  Dialog: SystemSlotRecipeFn<DialogSlot, DialogVariantProps>
  Drawer: SystemSlotRecipeFn<DrawerSlot, DrawerVariantProps>
  Editable: SystemSlotRecipeFn<EditableSlot, EditableVariantProps>
  Field: SystemSlotRecipeFn<FieldSlot, FieldVariantProps>
  List: SystemSlotRecipeFn<ListSlot, ListVariantProps>
  Menu: SystemSlotRecipeFn<MenuSlot, MenuVariantProps>
  NativeSelect: SystemSlotRecipeFn<NativeSelectSlot, NativeSelectVariantProps>
  NumberInput: SystemSlotRecipeFn<NumberInputSlot, NumberInputVariantProps>
  Popover: SystemSlotRecipeFn<PopoverSlot, PopoverVariantProps>
  Progress: SystemSlotRecipeFn<ProgressSlot, ProgressVariantProps>
  Radio: SystemSlotRecipeFn<RadioSlot, RadioVariantProps>
  Slider: SystemSlotRecipeFn<SliderSlot, SliderVariantProps>
  Stat: SystemSlotRecipeFn<StatSlot, StatVariantProps>
  Steps: SystemSlotRecipeFn<StepsSlot, StepsVariantProps>
  Switch: SystemSlotRecipeFn<SwitchSlot, SwitchVariantProps>
  Table: SystemSlotRecipeFn<TableSlot, TableVariantProps>
  Tabs: SystemSlotRecipeFn<TabsSlot, TabsVariantProps>
  Tag: SystemSlotRecipeFn<TagSlot, TagVariantProps>
  Toast: SystemSlotRecipeFn<ToastSlot, ToastVariantProps>
}

export interface ConfigRecipeSlots {
  Accordion: AccordionSlot
  Alert: AlertSlot
  Avatar: AvatarSlot
  Breadcrumb: BreadcrumbSlot
  Blockquote: BlockquoteSlot
  Card: CardSlot
  Checkbox: CheckboxSlot
  Dialog: DialogSlot
  Drawer: DrawerSlot
  Editable: EditableSlot
  Field: FieldSlot
  List: ListSlot
  Menu: MenuSlot
  NativeSelect: NativeSelectSlot
  NumberInput: NumberInputSlot
  Popover: PopoverSlot
  Progress: ProgressSlot
  Radio: RadioSlot
  Slider: SliderSlot
  Stat: StatSlot
  Steps: StepsSlot
  Switch: SwitchSlot
  Table: TableSlot
  Tabs: TabsSlot
  Tag: TagSlot
  Toast: ToastSlot
}

export type SlotRecipeRecord<T, K> = T extends keyof ConfigRecipeSlots
  ? Record<ConfigRecipeSlots[T], K>
  : Record<string, K>

export type SlotRecipeProps<T> = T extends keyof ConfigSlotRecipes
  ? ConfigSlotRecipes[T]["__type"] & { recipe?: SlotRecipeDefinition }
  : { recipe?: SlotRecipeDefinition }

export type RecipeProps<T> = T extends keyof ConfigRecipes
  ? ConfigRecipes[T]["__type"] & { recipe?: RecipeDefinition }
  : { recipe?: RecipeDefinition }
