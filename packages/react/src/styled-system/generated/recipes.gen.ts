import type { RecipeDefinition, SlotRecipeDefinition, SystemRecipeFn, SystemSlotRecipeFn } from "../recipe.types"
import type { ConditionalValue } from "../css.types"

export interface BadgeVariant {
  /** @default "subtle" */
  variant?: "solid" | "subtle" | "outline" | "surface" | "plain"
  /** @default "sm" */
  size?: "xs" | "sm" | "md" | "lg"
}

export type BadgeVariantProps = {
  [K in keyof BadgeVariant]?: ConditionalValue<BadgeVariant[K]> | undefined
}

export type BadgeVariantMap = {
  [K in keyof BadgeVariant]: Array<BadgeVariant[K]>
}

export interface ButtonVariant {
  /** @default "md" */
  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
  /** @default "solid" */
  variant?: "solid" | "subtle" | "surface" | "outline" | "ghost" | "plain"
}

export type ButtonVariantProps = {
  [K in keyof ButtonVariant]?: ConditionalValue<ButtonVariant[K]> | undefined
}

export type ButtonVariantMap = {
  [K in keyof ButtonVariant]: Array<ButtonVariant[K]>
}

export interface CodeVariant {
  /** @default "subtle" */
  variant?: "solid" | "subtle" | "outline" | "surface" | "plain"
  /** @default "sm" */
  size?: "xs" | "sm" | "md" | "lg"
}

export type CodeVariantProps = {
  [K in keyof CodeVariant]?: ConditionalValue<CodeVariant[K]> | undefined
}

export type CodeVariantMap = {
  [K in keyof CodeVariant]: Array<CodeVariant[K]>
}

export interface ContainerVariant {
  centerContent?: boolean
  fluid?: boolean
}

export type ContainerVariantProps = {
  [K in keyof ContainerVariant]?: ConditionalValue<ContainerVariant[K]> | undefined
}

export type ContainerVariantMap = {
  [K in keyof ContainerVariant]: Array<ContainerVariant[K]>
}

export interface HeadingVariant {
  /** @default "xl" */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl"
}

export type HeadingVariantProps = {
  [K in keyof HeadingVariant]?: ConditionalValue<HeadingVariant[K]> | undefined
}

export type HeadingVariantMap = {
  [K in keyof HeadingVariant]: Array<HeadingVariant[K]>
}

export interface InputVariant {
  /** @default "md" */
  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
  /** @default "outline" */
  variant?: "outline" | "subtle" | "flushed"
}

export type InputVariantProps = {
  [K in keyof InputVariant]?: ConditionalValue<InputVariant[K]> | undefined
}

export type InputVariantMap = {
  [K in keyof InputVariant]: Array<InputVariant[K]>
}

export interface InputAddonVariant {
  /** @default "md" */
  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
  /** @default "outline" */
  variant?: "outline" | "subtle" | "flushed"
}

export type InputAddonVariantProps = {
  [K in keyof InputAddonVariant]?: ConditionalValue<InputAddonVariant[K]> | undefined
}

export type InputAddonVariantMap = {
  [K in keyof InputAddonVariant]: Array<InputAddonVariant[K]>
}

export interface KbdVariant {
  /** @default "raised" */
  variant?: "raised" | "outline" | "subtle" | "plain"
  /** @default "md" */
  size?: "sm" | "md" | "lg"
}

export type KbdVariantProps = {
  [K in keyof KbdVariant]?: ConditionalValue<KbdVariant[K]> | undefined
}

export type KbdVariantMap = {
  [K in keyof KbdVariant]: Array<KbdVariant[K]>
}

export interface LinkVariant {
  /** @default "plain" */
  variant?: "underline" | "plain"
}

export type LinkVariantProps = {
  [K in keyof LinkVariant]?: ConditionalValue<LinkVariant[K]> | undefined
}

export type LinkVariantMap = {
  [K in keyof LinkVariant]: Array<LinkVariant[K]>
}

export interface MarkVariant {
  variant?: "subtle" | "solid" | "text" | "plain"
}

export type MarkVariantProps = {
  [K in keyof MarkVariant]?: ConditionalValue<MarkVariant[K]> | undefined
}

export type MarkVariantMap = {
  [K in keyof MarkVariant]: Array<MarkVariant[K]>
}

export interface SeparatorVariant {
  /** @default "solid" */
  variant?: "solid" | "dashed" | "dotted"
  /** @default "horizontal" */
  orientation?: "vertical" | "horizontal"
  /** @default "sm" */
  size?: "xs" | "sm" | "md" | "lg"
}

export type SeparatorVariantProps = {
  [K in keyof SeparatorVariant]?: ConditionalValue<SeparatorVariant[K]> | undefined
}

export type SeparatorVariantMap = {
  [K in keyof SeparatorVariant]: Array<SeparatorVariant[K]>
}

export interface SkeletonVariant {
  /** @default true */
  loading?: boolean
  /** @default "pulse" */
  variant?: "pulse" | "shine" | "none"
}

export type SkeletonVariantProps = {
  [K in keyof SkeletonVariant]?: ConditionalValue<SkeletonVariant[K]> | undefined
}

export type SkeletonVariantMap = {
  [K in keyof SkeletonVariant]: Array<SkeletonVariant[K]>
}

export interface SkipNavLinkVariant {}

export type SkipNavLinkVariantProps = {
  [K in keyof SkipNavLinkVariant]?: ConditionalValue<SkipNavLinkVariant[K]> | undefined
}

export type SkipNavLinkVariantMap = {
  [K in keyof SkipNavLinkVariant]: Array<SkipNavLinkVariant[K]>
}

export interface SpinnerVariant {
  /** @default "md" */
  size?: "inherit" | "xs" | "sm" | "md" | "lg" | "xl"
}

export type SpinnerVariantProps = {
  [K in keyof SpinnerVariant]?: ConditionalValue<SpinnerVariant[K]> | undefined
}

export type SpinnerVariantMap = {
  [K in keyof SpinnerVariant]: Array<SpinnerVariant[K]>
}

export interface TextareaVariant {
  /** @default "md" */
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  /** @default "outline" */
  variant?: "outline" | "subtle" | "flushed"
}

export type TextareaVariantProps = {
  [K in keyof TextareaVariant]?: ConditionalValue<TextareaVariant[K]> | undefined
}

export type TextareaVariantMap = {
  [K in keyof TextareaVariant]: Array<TextareaVariant[K]>
}

export interface IconVariant {
  /** @default "inherit" */
  size?: "inherit" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
}

export type IconVariantProps = {
  [K in keyof IconVariant]?: ConditionalValue<IconVariant[K]> | undefined
}

export type IconVariantMap = {
  [K in keyof IconVariant]: Array<IconVariant[K]>
}

export interface CheckmarkVariant {
  /** @default "md" */
  size?: "xs" | "sm" | "md" | "lg"
  /** @default "solid" */
  variant?: "solid" | "outline" | "subtle" | "plain" | "inverted"
}

export type CheckmarkVariantProps = {
  [K in keyof CheckmarkVariant]?: ConditionalValue<CheckmarkVariant[K]> | undefined
}

export type CheckmarkVariantMap = {
  [K in keyof CheckmarkVariant]: Array<CheckmarkVariant[K]>
}

export interface RadiomarkVariant {
  /** @default "solid" */
  variant?: "solid" | "subtle" | "outline" | "inverted"
  /** @default "md" */
  size?: "xs" | "sm" | "md" | "lg"
}

export type RadiomarkVariantProps = {
  [K in keyof RadiomarkVariant]?: ConditionalValue<RadiomarkVariant[K]> | undefined
}

export type RadiomarkVariantMap = {
  [K in keyof RadiomarkVariant]: Array<RadiomarkVariant[K]>
}

export interface ConfigRecipes {
  badge: SystemRecipeFn<BadgeVariantProps, BadgeVariantMap>
  button: SystemRecipeFn<ButtonVariantProps, ButtonVariantMap>
  code: SystemRecipeFn<CodeVariantProps, CodeVariantMap>
  container: SystemRecipeFn<ContainerVariantProps, ContainerVariantMap>
  heading: SystemRecipeFn<HeadingVariantProps, HeadingVariantMap>
  input: SystemRecipeFn<InputVariantProps, InputVariantMap>
  inputAddon: SystemRecipeFn<InputAddonVariantProps, InputAddonVariantMap>
  kbd: SystemRecipeFn<KbdVariantProps, KbdVariantMap>
  link: SystemRecipeFn<LinkVariantProps, LinkVariantMap>
  mark: SystemRecipeFn<MarkVariantProps, MarkVariantMap>
  separator: SystemRecipeFn<SeparatorVariantProps, SeparatorVariantMap>
  skeleton: SystemRecipeFn<SkeletonVariantProps, SkeletonVariantMap>
  skipNavLink: SystemRecipeFn<SkipNavLinkVariantProps, SkipNavLinkVariantMap>
  spinner: SystemRecipeFn<SpinnerVariantProps, SpinnerVariantMap>
  textarea: SystemRecipeFn<TextareaVariantProps, TextareaVariantMap>
  icon: SystemRecipeFn<IconVariantProps, IconVariantMap>
  checkmark: SystemRecipeFn<CheckmarkVariantProps, CheckmarkVariantMap>
  radiomark: SystemRecipeFn<RadiomarkVariantProps, RadiomarkVariantMap>
}

// Accordion

export type AccordionSlot = "root" | "item" | "itemTrigger" | "itemContent" | "itemIndicator" | "itemBody"

export interface AccordionVariant {
  /** @default "outline" */
  variant?: "outline" | "subtle" | "enclosed" | "plain"
  /** @default "md" */
  size?: "sm" | "md" | "lg"
}

export type AccordionVariantProps = {
  [K in keyof AccordionVariant]?: ConditionalValue<AccordionVariant[K]> | undefined
}

export type AccordionVariantMap = {
  [K in keyof AccordionVariant]: Array<AccordionVariant[K]>
}

// ActionBar

export type ActionBarSlot = "positioner" | "content" | "separator" | "selectionTrigger" | "closeTrigger"

export interface ActionBarVariant {}

export type ActionBarVariantProps = {
  [K in keyof ActionBarVariant]?: ConditionalValue<ActionBarVariant[K]> | undefined
}

export type ActionBarVariantMap = {
  [K in keyof ActionBarVariant]: Array<ActionBarVariant[K]>
}

// Alert

export type AlertSlot = "title" | "description" | "root" | "indicator" | "content"

export interface AlertVariant {
  /** @default "info" */
  status?: "info" | "warning" | "success" | "error" | "neutral"
  inline?: boolean
  /** @default "subtle" */
  variant?: "subtle" | "surface" | "outline" | "solid"
  /** @default "md" */
  size?: "sm" | "md" | "lg"
}

export type AlertVariantProps = {
  [K in keyof AlertVariant]?: ConditionalValue<AlertVariant[K]> | undefined
}

export type AlertVariantMap = {
  [K in keyof AlertVariant]: Array<AlertVariant[K]>
}

// Avatar

export type AvatarSlot = "root" | "image" | "fallback"

export interface AvatarVariant {
  /** @default "md" */
  size?: "full" | "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
  /** @default "subtle" */
  variant?: "solid" | "subtle" | "outline"
  /** @default "full" */
  shape?: "square" | "rounded" | "full"
  borderless?: boolean
}

export type AvatarVariantProps = {
  [K in keyof AvatarVariant]?: ConditionalValue<AvatarVariant[K]> | undefined
}

export type AvatarVariantMap = {
  [K in keyof AvatarVariant]: Array<AvatarVariant[K]>
}

// Blockquote

export type BlockquoteSlot = "root" | "icon" | "content" | "caption"

export interface BlockquoteVariant {
  /** @default "start" */
  justify?: "start" | "center" | "end"
  /** @default "subtle" */
  variant?: "subtle" | "solid" | "plain"
}

export type BlockquoteVariantProps = {
  [K in keyof BlockquoteVariant]?: ConditionalValue<BlockquoteVariant[K]> | undefined
}

export type BlockquoteVariantMap = {
  [K in keyof BlockquoteVariant]: Array<BlockquoteVariant[K]>
}

// Breadcrumb

export type BreadcrumbSlot = "link" | "currentLink" | "item" | "list" | "root" | "ellipsis" | "separator"

export interface BreadcrumbVariant {
  /** @default "plain" */
  variant?: "underline" | "plain"
  /** @default "md" */
  size?: "sm" | "md" | "lg"
}

export type BreadcrumbVariantProps = {
  [K in keyof BreadcrumbVariant]?: ConditionalValue<BreadcrumbVariant[K]> | undefined
}

export type BreadcrumbVariantMap = {
  [K in keyof BreadcrumbVariant]: Array<BreadcrumbVariant[K]>
}

// Card

export type CardSlot = "root" | "header" | "body" | "footer" | "title" | "description"

export interface CardVariant {
  /** @default "md" */
  size?: "sm" | "md" | "lg"
  /** @default "outline" */
  variant?: "elevated" | "outline" | "subtle"
}

export type CardVariantProps = {
  [K in keyof CardVariant]?: ConditionalValue<CardVariant[K]> | undefined
}

export type CardVariantMap = {
  [K in keyof CardVariant]: Array<CardVariant[K]>
}

// Checkbox

export type CheckboxSlot = "root" | "label" | "control" | "indicator" | "group"

export interface CheckboxVariant {
  /** @default "md" */
  size?: "xs" | "sm" | "md" | "lg"
  /** @default "solid" */
  variant?: "outline" | "solid" | "subtle"
}

export type CheckboxVariantProps = {
  [K in keyof CheckboxVariant]?: ConditionalValue<CheckboxVariant[K]> | undefined
}

export type CheckboxVariantMap = {
  [K in keyof CheckboxVariant]: Array<CheckboxVariant[K]>
}

// CheckboxCard

export type CheckboxCardSlot = "root" | "control" | "label" | "description" | "addon" | "indicator" | "content"

export interface CheckboxCardVariant {
  /** @default "md" */
  size?: "sm" | "md" | "lg"
  /** @default "outline" */
  variant?: "surface" | "subtle" | "outline" | "solid"
  justify?: "start" | "end" | "center"
  /** @default "start" */
  align?: "start" | "end" | "center"
  /** @default "horizontal" */
  orientation?: "vertical" | "horizontal"
}

export type CheckboxCardVariantProps = {
  [K in keyof CheckboxCardVariant]?: ConditionalValue<CheckboxCardVariant[K]> | undefined
}

export type CheckboxCardVariantMap = {
  [K in keyof CheckboxCardVariant]: Array<CheckboxCardVariant[K]>
}

// Collapsible

export type CollapsibleSlot = "root" | "trigger" | "content"

export interface CollapsibleVariant {}

export type CollapsibleVariantProps = {
  [K in keyof CollapsibleVariant]?: ConditionalValue<CollapsibleVariant[K]> | undefined
}

export type CollapsibleVariantMap = {
  [K in keyof CollapsibleVariant]: Array<CollapsibleVariant[K]>
}

// DataList

export type DataListSlot = "root" | "item" | "itemLabel" | "itemValue"

export interface DataListVariant {
  /** @default "vertical" */
  orientation?: "horizontal" | "vertical"
  /** @default "md" */
  size?: "sm" | "md" | "lg"
}

export type DataListVariantProps = {
  [K in keyof DataListVariant]?: ConditionalValue<DataListVariant[K]> | undefined
}

export type DataListVariantMap = {
  [K in keyof DataListVariant]: Array<DataListVariant[K]>
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

export interface DialogVariant {
  /** @default "top" */
  placement?: "center" | "top" | "bottom"
  /** @default "outside" */
  scrollBehavior?: "inside" | "outside"
  /** @default "md" */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "cover" | "full"
  /** @default "scale" */
  motionPreset?: "scale" | "slide-in-bottom" | "slide-in-top" | "slide-in-left" | "slide-in-right" | "none"
}

export type DialogVariantProps = {
  [K in keyof DialogVariant]?: ConditionalValue<DialogVariant[K]> | undefined
}

export type DialogVariantMap = {
  [K in keyof DialogVariant]: Array<DialogVariant[K]>
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

export interface DrawerVariant {
  /** @default "xs" */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "full"
  /** @default "end" */
  placement?: "start" | "end" | "top" | "bottom"
  contained?: boolean
}

export type DrawerVariantProps = {
  [K in keyof DrawerVariant]?: ConditionalValue<DrawerVariant[K]> | undefined
}

export type DrawerVariantMap = {
  [K in keyof DrawerVariant]: Array<DrawerVariant[K]>
}

// Editable

export type EditableSlot = "root" | "area" | "label" | "preview" | "input" | "editTrigger" | "submitTrigger" | "cancelTrigger" | "control" | "textarea"

export interface EditableVariant {
  /** @default "md" */
  size?: "sm" | "md" | "lg"
}

export type EditableVariantProps = {
  [K in keyof EditableVariant]?: ConditionalValue<EditableVariant[K]> | undefined
}

export type EditableVariantMap = {
  [K in keyof EditableVariant]: Array<EditableVariant[K]>
}

// EmptyState

export type EmptyStateSlot = "root" | "content" | "indicator" | "title" | "description"

export interface EmptyStateVariant {
  /** @default "md" */
  size?: "sm" | "md" | "lg"
}

export type EmptyStateVariantProps = {
  [K in keyof EmptyStateVariant]?: ConditionalValue<EmptyStateVariant[K]> | undefined
}

export type EmptyStateVariantMap = {
  [K in keyof EmptyStateVariant]: Array<EmptyStateVariant[K]>
}

// Field

export type FieldSlot = "root" | "errorText" | "helperText" | "input" | "label" | "select" | "textarea" | "requiredIndicator"

export interface FieldVariant {
  /** @default "vertical" */
  orientation?: "vertical" | "horizontal"
}

export type FieldVariantProps = {
  [K in keyof FieldVariant]?: ConditionalValue<FieldVariant[K]> | undefined
}

export type FieldVariantMap = {
  [K in keyof FieldVariant]: Array<FieldVariant[K]>
}

// Fieldset

export type FieldsetSlot = "root" | "errorText" | "helperText" | "legend" | "content"

export interface FieldsetVariant {
  /** @default "md" */
  size?: "sm" | "md" | "lg"
}

export type FieldsetVariantProps = {
  [K in keyof FieldsetVariant]?: ConditionalValue<FieldsetVariant[K]> | undefined
}

export type FieldsetVariantMap = {
  [K in keyof FieldsetVariant]: Array<FieldsetVariant[K]>
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
  | "itemContent"
  | "dropzoneContent"

export interface FileUploadVariant {}

export type FileUploadVariantProps = {
  [K in keyof FileUploadVariant]?: ConditionalValue<FileUploadVariant[K]> | undefined
}

export type FileUploadVariantMap = {
  [K in keyof FileUploadVariant]: Array<FileUploadVariant[K]>
}

// HoverCard

export type HoverCardSlot = "arrow" | "arrowTip" | "trigger" | "positioner" | "content"

export interface HoverCardVariant {
  /** @default "md" */
  size?: "xs" | "sm" | "md" | "lg"
}

export type HoverCardVariantProps = {
  [K in keyof HoverCardVariant]?: ConditionalValue<HoverCardVariant[K]> | undefined
}

export type HoverCardVariantMap = {
  [K in keyof HoverCardVariant]: Array<HoverCardVariant[K]>
}

// List

export type ListSlot = "root" | "item" | "indicator"

export interface ListVariant {
  /** @default "marker" */
  variant?: "marker" | "plain"
  align?: "center" | "start" | "end"
}

export type ListVariantProps = {
  [K in keyof ListVariant]?: ConditionalValue<ListVariant[K]> | undefined
}

export type ListVariantMap = {
  [K in keyof ListVariant]: Array<ListVariant[K]>
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

export interface MenuVariant {
  /** @default "subtle" */
  variant?: "subtle" | "solid"
  /** @default "md" */
  size?: "sm" | "md"
}

export type MenuVariantProps = {
  [K in keyof MenuVariant]?: ConditionalValue<MenuVariant[K]> | undefined
}

export type MenuVariantMap = {
  [K in keyof MenuVariant]: Array<MenuVariant[K]>
}

// NativeSelect

export type NativeSelectSlot = "root" | "field" | "indicator"

export interface NativeSelectVariant {
  /** @default "outline" */
  variant?: "outline" | "subtle" | "plain"
  /** @default "md" */
  size?: "xs" | "sm" | "md" | "lg" | "xl"
}

export type NativeSelectVariantProps = {
  [K in keyof NativeSelectVariant]?: ConditionalValue<NativeSelectVariant[K]> | undefined
}

export type NativeSelectVariantMap = {
  [K in keyof NativeSelectVariant]: Array<NativeSelectVariant[K]>
}

// NumberInput

export type NumberInputSlot = "root" | "label" | "input" | "control" | "valueText" | "incrementTrigger" | "decrementTrigger" | "scrubber"

export interface NumberInputVariant {
  /** @default "md" */
  size?: "xs" | "sm" | "md" | "lg"
  /** @default "outline" */
  variant?: "outline" | "subtle" | "flushed"
}

export type NumberInputVariantProps = {
  [K in keyof NumberInputVariant]?: ConditionalValue<NumberInputVariant[K]> | undefined
}

export type NumberInputVariantMap = {
  [K in keyof NumberInputVariant]: Array<NumberInputVariant[K]>
}

// PinInput

export type PinInputSlot = "root" | "label" | "input" | "control"

export interface PinInputVariant {
  /** @default "md" */
  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
  /** @default "outline" */
  variant?: "outline" | "subtle" | "flushed"
}

export type PinInputVariantProps = {
  [K in keyof PinInputVariant]?: ConditionalValue<PinInputVariant[K]> | undefined
}

export type PinInputVariantMap = {
  [K in keyof PinInputVariant]: Array<PinInputVariant[K]>
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

export interface PopoverVariant {
  /** @default "md" */
  size?: "xs" | "sm" | "md" | "lg"
}

export type PopoverVariantProps = {
  [K in keyof PopoverVariant]?: ConditionalValue<PopoverVariant[K]> | undefined
}

export type PopoverVariantMap = {
  [K in keyof PopoverVariant]: Array<PopoverVariant[K]>
}

// Progress

export type ProgressSlot = "root" | "label" | "track" | "range" | "valueText" | "view" | "circle" | "circleTrack" | "circleRange"

export interface ProgressVariant {
  /** @default "outline" */
  variant?: "outline" | "subtle"
  /** @default "rounded" */
  shape?: "square" | "rounded" | "full"
  striped?: boolean
  animated?: boolean
  /** @default "md" */
  size?: "xs" | "sm" | "md" | "lg" | "xl"
}

export type ProgressVariantProps = {
  [K in keyof ProgressVariant]?: ConditionalValue<ProgressVariant[K]> | undefined
}

export type ProgressVariantMap = {
  [K in keyof ProgressVariant]: Array<ProgressVariant[K]>
}

// ProgressCircle

export type ProgressCircleSlot = "root" | "label" | "track" | "range" | "valueText" | "view" | "circle" | "circleTrack" | "circleRange"

export interface ProgressCircleVariant {
  /** @default "md" */
  size?: "xs" | "sm" | "md" | "lg" | "xl"
}

export type ProgressCircleVariantProps = {
  [K in keyof ProgressCircleVariant]?: ConditionalValue<ProgressCircleVariant[K]> | undefined
}

export type ProgressCircleVariantMap = {
  [K in keyof ProgressCircleVariant]: Array<ProgressCircleVariant[K]>
}

// RadioCard

export type RadioCardSlot =
  | "root"
  | "label"
  | "item"
  | "itemText"
  | "itemControl"
  | "indicator"
  | "itemAddon"
  | "itemIndicator"
  | "itemContent"
  | "itemDescription"

export interface RadioCardVariant {
  /** @default "md" */
  size?: "sm" | "md" | "lg"
  /** @default "outline" */
  variant?: "surface" | "subtle" | "outline" | "solid"
  justify?: "start" | "end" | "center"
  /** @default "start" */
  align?: "start" | "end" | "center"
  /** @default "horizontal" */
  orientation?: "vertical" | "horizontal"
}

export type RadioCardVariantProps = {
  [K in keyof RadioCardVariant]?: ConditionalValue<RadioCardVariant[K]> | undefined
}

export type RadioCardVariantMap = {
  [K in keyof RadioCardVariant]: Array<RadioCardVariant[K]>
}

// RadioGroup

export type RadioGroupSlot = "root" | "label" | "item" | "itemText" | "itemControl" | "indicator" | "itemAddon" | "itemIndicator"

export interface RadioGroupVariant {
  /** @default "solid" */
  variant?: "outline" | "subtle" | "solid"
  /** @default "md" */
  size?: "xs" | "sm" | "md" | "lg"
}

export type RadioGroupVariantProps = {
  [K in keyof RadioGroupVariant]?: ConditionalValue<RadioGroupVariant[K]> | undefined
}

export type RadioGroupVariantMap = {
  [K in keyof RadioGroupVariant]: Array<RadioGroupVariant[K]>
}

// RatingGroup

export type RatingGroupSlot = "root" | "label" | "item" | "control" | "itemIndicator"

export interface RatingGroupVariant {
  /** @default "md" */
  size?: "xs" | "sm" | "md" | "lg"
}

export type RatingGroupVariantProps = {
  [K in keyof RatingGroupVariant]?: ConditionalValue<RatingGroupVariant[K]> | undefined
}

export type RatingGroupVariantMap = {
  [K in keyof RatingGroupVariant]: Array<RatingGroupVariant[K]>
}

// SegmentGroup

export type SegmentGroupSlot = "root" | "label" | "item" | "itemText" | "itemControl" | "indicator"

export interface SegmentGroupVariant {
  /** @default "md" */
  size?: "xs" | "sm" | "md" | "lg"
}

export type SegmentGroupVariantProps = {
  [K in keyof SegmentGroupVariant]?: ConditionalValue<SegmentGroupVariant[K]> | undefined
}

export type SegmentGroupVariantMap = {
  [K in keyof SegmentGroupVariant]: Array<SegmentGroupVariant[K]>
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
  | "indicatorGroup"

export interface SelectVariant {
  /** @default "outline" */
  variant?: "outline" | "subtle"
  /** @default "md" */
  size?: "xs" | "sm" | "md" | "lg"
}

export type SelectVariantProps = {
  [K in keyof SelectVariant]?: ConditionalValue<SelectVariant[K]> | undefined
}

export type SelectVariantMap = {
  [K in keyof SelectVariant]: Array<SelectVariant[K]>
}

// Slider

export type SliderSlot = "root" | "label" | "thumb" | "valueText" | "track" | "range" | "control" | "markerGroup" | "marker" | "markerIndicator"

export interface SliderVariant {
  /** @default "md" */
  size?: "sm" | "md" | "lg"
  /** @default "outline" */
  variant?: "outline" | "solid"
  /** @default "horizontal" */
  orientation?: "vertical" | "horizontal"
}

export type SliderVariantProps = {
  [K in keyof SliderVariant]?: ConditionalValue<SliderVariant[K]> | undefined
}

export type SliderVariantMap = {
  [K in keyof SliderVariant]: Array<SliderVariant[K]>
}

// Stat

export type StatSlot = "root" | "label" | "helpText" | "valueText" | "valueUnit" | "indicator"

export interface StatVariant {
  /** @default "md" */
  size?: "sm" | "md" | "lg"
}

export type StatVariantProps = {
  [K in keyof StatVariant]?: ConditionalValue<StatVariant[K]> | undefined
}

export type StatVariantMap = {
  [K in keyof StatVariant]: Array<StatVariant[K]>
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

export interface StepsVariant {
  /** @default "horizontal" */
  orientation?: "vertical" | "horizontal"
  /** @default "solid" */
  variant?: "solid" | "subtle"
  /** @default "md" */
  size?: "xs" | "sm" | "md" | "lg"
}

export type StepsVariantProps = {
  [K in keyof StepsVariant]?: ConditionalValue<StepsVariant[K]> | undefined
}

export type StepsVariantMap = {
  [K in keyof StepsVariant]: Array<StepsVariant[K]>
}

// Switch

export type SwitchSlot = "root" | "label" | "control" | "thumb" | "indicator"

export interface SwitchVariant {
  /** @default "solid" */
  variant?: "solid" | "raised"
  /** @default "md" */
  size?: "xs" | "sm" | "md" | "lg"
}

export type SwitchVariantProps = {
  [K in keyof SwitchVariant]?: ConditionalValue<SwitchVariant[K]> | undefined
}

export type SwitchVariantMap = {
  [K in keyof SwitchVariant]: Array<SwitchVariant[K]>
}

// Table

export type TableSlot = "root" | "header" | "body" | "row" | "columnHeader" | "cell" | "footer" | "caption"

export interface TableVariant {
  interactive?: boolean
  stickyHeader?: boolean
  striped?: boolean
  showColumnBorder?: boolean
  /** @default "line" */
  variant?: "line" | "outline"
  /** @default "md" */
  size?: "sm" | "md" | "lg"
}

export type TableVariantProps = {
  [K in keyof TableVariant]?: ConditionalValue<TableVariant[K]> | undefined
}

export type TableVariantMap = {
  [K in keyof TableVariant]: Array<TableVariant[K]>
}

// Tabs

export type TabsSlot = "root" | "trigger" | "list" | "content" | "contentGroup" | "indicator"

export interface TabsVariant {
  fitted?: boolean
  justify?: "start" | "center" | "end"
  /** @default "md" */
  size?: "sm" | "md" | "lg"
  /** @default "line" */
  variant?: "line" | "subtle" | "enclosed" | "outline" | "plain"
}

export type TabsVariantProps = {
  [K in keyof TabsVariant]?: ConditionalValue<TabsVariant[K]> | undefined
}

export type TabsVariantMap = {
  [K in keyof TabsVariant]: Array<TabsVariant[K]>
}

// Tag

export type TagSlot = "root" | "label" | "closeTrigger" | "startElement" | "endElement"

export interface TagVariant {
  /** @default "md" */
  size?: "sm" | "md" | "lg" | "xl"
  /** @default "surface" */
  variant?: "subtle" | "solid" | "outline" | "surface"
}

export type TagVariantProps = {
  [K in keyof TagVariant]?: ConditionalValue<TagVariant[K]> | undefined
}

export type TagVariantMap = {
  [K in keyof TagVariant]: Array<TagVariant[K]>
}

// Toast

export type ToastSlot = "root" | "title" | "description" | "indicator" | "closeTrigger" | "actionTrigger"

export interface ToastVariant {}

export type ToastVariantProps = {
  [K in keyof ToastVariant]?: ConditionalValue<ToastVariant[K]> | undefined
}

export type ToastVariantMap = {
  [K in keyof ToastVariant]: Array<ToastVariant[K]>
}

// Tooltip

export type TooltipSlot = "trigger" | "arrow" | "arrowTip" | "positioner" | "content"

export interface TooltipVariant {}

export type TooltipVariantProps = {
  [K in keyof TooltipVariant]?: ConditionalValue<TooltipVariant[K]> | undefined
}

export type TooltipVariantMap = {
  [K in keyof TooltipVariant]: Array<TooltipVariant[K]>
}

// Status

export type StatusSlot = "root" | "indicator"

export interface StatusVariant {
  /** @default "md" */
  size?: "sm" | "md" | "lg"
}

export type StatusVariantProps = {
  [K in keyof StatusVariant]?: ConditionalValue<StatusVariant[K]> | undefined
}

export type StatusVariantMap = {
  [K in keyof StatusVariant]: Array<StatusVariant[K]>
}

// Timeline

export type TimelineSlot = "root" | "item" | "content" | "separator" | "indicator" | "connector" | "title" | "description"

export interface TimelineVariant {
  /** @default "solid" */
  variant?: "subtle" | "solid" | "outline" | "plain"
  /** @default "md" */
  size?: "sm" | "md" | "lg" | "xl"
}

export type TimelineVariantProps = {
  [K in keyof TimelineVariant]?: ConditionalValue<TimelineVariant[K]> | undefined
}

export type TimelineVariantMap = {
  [K in keyof TimelineVariant]: Array<TimelineVariant[K]>
}

export interface ConfigSlotRecipes {
  accordion: SystemSlotRecipeFn<AccordionSlot, AccordionVariantProps, AccordionVariantMap>
  actionBar: SystemSlotRecipeFn<ActionBarSlot, ActionBarVariantProps, ActionBarVariantMap>
  alert: SystemSlotRecipeFn<AlertSlot, AlertVariantProps, AlertVariantMap>
  avatar: SystemSlotRecipeFn<AvatarSlot, AvatarVariantProps, AvatarVariantMap>
  blockquote: SystemSlotRecipeFn<BlockquoteSlot, BlockquoteVariantProps, BlockquoteVariantMap>
  breadcrumb: SystemSlotRecipeFn<BreadcrumbSlot, BreadcrumbVariantProps, BreadcrumbVariantMap>
  card: SystemSlotRecipeFn<CardSlot, CardVariantProps, CardVariantMap>
  checkbox: SystemSlotRecipeFn<CheckboxSlot, CheckboxVariantProps, CheckboxVariantMap>
  checkboxCard: SystemSlotRecipeFn<CheckboxCardSlot, CheckboxCardVariantProps, CheckboxCardVariantMap>
  collapsible: SystemSlotRecipeFn<CollapsibleSlot, CollapsibleVariantProps, CollapsibleVariantMap>
  dataList: SystemSlotRecipeFn<DataListSlot, DataListVariantProps, DataListVariantMap>
  dialog: SystemSlotRecipeFn<DialogSlot, DialogVariantProps, DialogVariantMap>
  drawer: SystemSlotRecipeFn<DrawerSlot, DrawerVariantProps, DrawerVariantMap>
  editable: SystemSlotRecipeFn<EditableSlot, EditableVariantProps, EditableVariantMap>
  emptyState: SystemSlotRecipeFn<EmptyStateSlot, EmptyStateVariantProps, EmptyStateVariantMap>
  field: SystemSlotRecipeFn<FieldSlot, FieldVariantProps, FieldVariantMap>
  fieldset: SystemSlotRecipeFn<FieldsetSlot, FieldsetVariantProps, FieldsetVariantMap>
  fileUpload: SystemSlotRecipeFn<FileUploadSlot, FileUploadVariantProps, FileUploadVariantMap>
  hoverCard: SystemSlotRecipeFn<HoverCardSlot, HoverCardVariantProps, HoverCardVariantMap>
  list: SystemSlotRecipeFn<ListSlot, ListVariantProps, ListVariantMap>
  menu: SystemSlotRecipeFn<MenuSlot, MenuVariantProps, MenuVariantMap>
  nativeSelect: SystemSlotRecipeFn<NativeSelectSlot, NativeSelectVariantProps, NativeSelectVariantMap>
  numberInput: SystemSlotRecipeFn<NumberInputSlot, NumberInputVariantProps, NumberInputVariantMap>
  pinInput: SystemSlotRecipeFn<PinInputSlot, PinInputVariantProps, PinInputVariantMap>
  popover: SystemSlotRecipeFn<PopoverSlot, PopoverVariantProps, PopoverVariantMap>
  progress: SystemSlotRecipeFn<ProgressSlot, ProgressVariantProps, ProgressVariantMap>
  progressCircle: SystemSlotRecipeFn<ProgressCircleSlot, ProgressCircleVariantProps, ProgressCircleVariantMap>
  radioCard: SystemSlotRecipeFn<RadioCardSlot, RadioCardVariantProps, RadioCardVariantMap>
  radioGroup: SystemSlotRecipeFn<RadioGroupSlot, RadioGroupVariantProps, RadioGroupVariantMap>
  ratingGroup: SystemSlotRecipeFn<RatingGroupSlot, RatingGroupVariantProps, RatingGroupVariantMap>
  segmentGroup: SystemSlotRecipeFn<SegmentGroupSlot, SegmentGroupVariantProps, SegmentGroupVariantMap>
  select: SystemSlotRecipeFn<SelectSlot, SelectVariantProps, SelectVariantMap>
  slider: SystemSlotRecipeFn<SliderSlot, SliderVariantProps, SliderVariantMap>
  stat: SystemSlotRecipeFn<StatSlot, StatVariantProps, StatVariantMap>
  steps: SystemSlotRecipeFn<StepsSlot, StepsVariantProps, StepsVariantMap>
  switch: SystemSlotRecipeFn<SwitchSlot, SwitchVariantProps, SwitchVariantMap>
  table: SystemSlotRecipeFn<TableSlot, TableVariantProps, TableVariantMap>
  tabs: SystemSlotRecipeFn<TabsSlot, TabsVariantProps, TabsVariantMap>
  tag: SystemSlotRecipeFn<TagSlot, TagVariantProps, TagVariantMap>
  toast: SystemSlotRecipeFn<ToastSlot, ToastVariantProps, ToastVariantMap>
  tooltip: SystemSlotRecipeFn<TooltipSlot, TooltipVariantProps, TooltipVariantMap>
  status: SystemSlotRecipeFn<StatusSlot, StatusVariantProps, StatusVariantMap>
  timeline: SystemSlotRecipeFn<TimelineSlot, TimelineVariantProps, TimelineVariantMap>
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
  fieldset: FieldsetSlot
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
