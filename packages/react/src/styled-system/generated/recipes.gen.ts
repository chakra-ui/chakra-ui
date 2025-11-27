import type { RecipeDefinition, SlotRecipeDefinition, SystemRecipeFn, SystemSlotRecipeFn } from "../recipe.types"
import type { ConditionalValue } from "../css.types"

export interface BadgeVariant {
  /** @default "subtle" */
  variant?: "solid" | "subtle" | "outline" | "surface" | "plain" | undefined
  /** @default "sm" */
  size?: "xs" | "sm" | "md" | "lg" | undefined
}

export type BadgeVariantProps = {
  [K in keyof BadgeVariant]?: ConditionalValue<BadgeVariant[K]> | undefined
}

export type BadgeVariantMap = {
  [K in keyof BadgeVariant]: Array<BadgeVariant[K]>
}

export interface ButtonVariant {
  /** @default "md" */
  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | undefined
  /** @default "solid" */
  variant?: "solid" | "subtle" | "surface" | "outline" | "ghost" | "plain" | undefined
}

export type ButtonVariantProps = {
  [K in keyof ButtonVariant]?: ConditionalValue<ButtonVariant[K]> | undefined
}

export type ButtonVariantMap = {
  [K in keyof ButtonVariant]: Array<ButtonVariant[K]>
}

export interface CodeVariant {
  /** @default "subtle" */
  variant?: "solid" | "subtle" | "outline" | "surface" | "plain" | undefined
  /** @default "sm" */
  size?: "xs" | "sm" | "md" | "lg" | undefined
}

export type CodeVariantProps = {
  [K in keyof CodeVariant]?: ConditionalValue<CodeVariant[K]> | undefined
}

export type CodeVariantMap = {
  [K in keyof CodeVariant]: Array<CodeVariant[K]>
}

export interface ContainerVariant {
  centerContent?: boolean | undefined
  fluid?: boolean | undefined
}

export type ContainerVariantProps = {
  [K in keyof ContainerVariant]?: ConditionalValue<ContainerVariant[K]> | undefined
}

export type ContainerVariantMap = {
  [K in keyof ContainerVariant]: Array<ContainerVariant[K]>
}

export interface HeadingVariant {
  /** @default "xl" */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | undefined
}

export type HeadingVariantProps = {
  [K in keyof HeadingVariant]?: ConditionalValue<HeadingVariant[K]> | undefined
}

export type HeadingVariantMap = {
  [K in keyof HeadingVariant]: Array<HeadingVariant[K]>
}

export interface InputVariant {
  /** @default "md" */
  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | undefined
  /** @default "outline" */
  variant?: "outline" | "subtle" | "flushed" | undefined
}

export type InputVariantProps = {
  [K in keyof InputVariant]?: ConditionalValue<InputVariant[K]> | undefined
}

export type InputVariantMap = {
  [K in keyof InputVariant]: Array<InputVariant[K]>
}

export interface InputAddonVariant {
  /** @default "md" */
  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | undefined
  /** @default "outline" */
  variant?: "outline" | "subtle" | "flushed" | undefined
}

export type InputAddonVariantProps = {
  [K in keyof InputAddonVariant]?: ConditionalValue<InputAddonVariant[K]> | undefined
}

export type InputAddonVariantMap = {
  [K in keyof InputAddonVariant]: Array<InputAddonVariant[K]>
}

export interface KbdVariant {
  /** @default "raised" */
  variant?: "raised" | "outline" | "subtle" | "plain" | undefined
  /** @default "md" */
  size?: "sm" | "md" | "lg" | undefined
}

export type KbdVariantProps = {
  [K in keyof KbdVariant]?: ConditionalValue<KbdVariant[K]> | undefined
}

export type KbdVariantMap = {
  [K in keyof KbdVariant]: Array<KbdVariant[K]>
}

export interface LinkVariant {
  /** @default "plain" */
  variant?: "underline" | "plain" | undefined
}

export type LinkVariantProps = {
  [K in keyof LinkVariant]?: ConditionalValue<LinkVariant[K]> | undefined
}

export type LinkVariantMap = {
  [K in keyof LinkVariant]: Array<LinkVariant[K]>
}

export interface MarkVariant {
  variant?: "subtle" | "solid" | "text" | "plain" | undefined
}

export type MarkVariantProps = {
  [K in keyof MarkVariant]?: ConditionalValue<MarkVariant[K]> | undefined
}

export type MarkVariantMap = {
  [K in keyof MarkVariant]: Array<MarkVariant[K]>
}

export interface SeparatorVariant {
  /** @default "solid" */
  variant?: "solid" | "dashed" | "dotted" | undefined
  /** @default "horizontal" */
  orientation?: "vertical" | "horizontal" | undefined
  /** @default "sm" */
  size?: "xs" | "sm" | "md" | "lg" | undefined
}

export type SeparatorVariantProps = {
  [K in keyof SeparatorVariant]?: ConditionalValue<SeparatorVariant[K]> | undefined
}

export type SeparatorVariantMap = {
  [K in keyof SeparatorVariant]: Array<SeparatorVariant[K]>
}

export interface SkeletonVariant {
  /** @default true */
  loading?: boolean | undefined
  /** @default "pulse" */
  variant?: "pulse" | "shine" | "none" | undefined
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
  size?: "inherit" | "xs" | "sm" | "md" | "lg" | "xl" | undefined
}

export type SpinnerVariantProps = {
  [K in keyof SpinnerVariant]?: ConditionalValue<SpinnerVariant[K]> | undefined
}

export type SpinnerVariantMap = {
  [K in keyof SpinnerVariant]: Array<SpinnerVariant[K]>
}

export interface TextareaVariant {
  /** @default "md" */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | undefined
  /** @default "outline" */
  variant?: "outline" | "subtle" | "flushed" | undefined
}

export type TextareaVariantProps = {
  [K in keyof TextareaVariant]?: ConditionalValue<TextareaVariant[K]> | undefined
}

export type TextareaVariantMap = {
  [K in keyof TextareaVariant]: Array<TextareaVariant[K]>
}

export interface IconVariant {
  /** @default "inherit" */
  size?: "inherit" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | undefined
}

export type IconVariantProps = {
  [K in keyof IconVariant]?: ConditionalValue<IconVariant[K]> | undefined
}

export type IconVariantMap = {
  [K in keyof IconVariant]: Array<IconVariant[K]>
}

export interface CheckmarkVariant {
  /** @default "md" */
  size?: "xs" | "sm" | "md" | "lg" | undefined
  /** @default "solid" */
  variant?: "solid" | "outline" | "subtle" | "plain" | "inverted" | undefined
  filled?: boolean | undefined
}

export type CheckmarkVariantProps = {
  [K in keyof CheckmarkVariant]?: ConditionalValue<CheckmarkVariant[K]> | undefined
}

export type CheckmarkVariantMap = {
  [K in keyof CheckmarkVariant]: Array<CheckmarkVariant[K]>
}

export interface RadiomarkVariant {
  /** @default "solid" */
  variant?: "solid" | "subtle" | "outline" | "inverted" | undefined
  /** @default "md" */
  size?: "xs" | "sm" | "md" | "lg" | undefined
  filled?: boolean | undefined
}

export type RadiomarkVariantProps = {
  [K in keyof RadiomarkVariant]?: ConditionalValue<RadiomarkVariant[K]> | undefined
}

export type RadiomarkVariantMap = {
  [K in keyof RadiomarkVariant]: Array<RadiomarkVariant[K]>
}

export interface ColorSwatchVariant {
  /** @default "md" */
  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "inherit" | "full" | undefined
  /** @default "rounded" */
  shape?: "square" | "circle" | "rounded" | undefined
}

export type ColorSwatchVariantProps = {
  [K in keyof ColorSwatchVariant]?: ConditionalValue<ColorSwatchVariant[K]> | undefined
}

export type ColorSwatchVariantMap = {
  [K in keyof ColorSwatchVariant]: Array<ColorSwatchVariant[K]>
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
  colorSwatch: SystemRecipeFn<ColorSwatchVariantProps, ColorSwatchVariantMap>
}

// Accordion

export type AccordionSlot = "root" | "item" | "itemTrigger" | "itemContent" | "itemIndicator" | "itemBody"

export interface AccordionVariant {
  /** @default "outline" */
  variant?: "outline" | "subtle" | "enclosed" | "plain" | undefined
  /** @default "md" */
  size?: "sm" | "md" | "lg" | undefined
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
  status?: "info" | "warning" | "success" | "error" | "neutral" | undefined
  /** @default false */
  inline?: boolean | undefined
  /** @default "subtle" */
  variant?: "subtle" | "surface" | "outline" | "solid" | undefined
  /** @default "md" */
  size?: "sm" | "md" | "lg" | undefined
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
  size?: "full" | "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | undefined
  /** @default "subtle" */
  variant?: "solid" | "subtle" | "outline" | undefined
  /** @default "full" */
  shape?: "square" | "rounded" | "full" | undefined
  borderless?: boolean | undefined
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
  justify?: "start" | "center" | "end" | undefined
  /** @default "subtle" */
  variant?: "subtle" | "solid" | "plain" | undefined
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
  variant?: "underline" | "plain" | undefined
  /** @default "md" */
  size?: "sm" | "md" | "lg" | undefined
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
  size?: "sm" | "md" | "lg" | undefined
  /** @default "outline" */
  variant?: "elevated" | "outline" | "subtle" | undefined
}

export type CardVariantProps = {
  [K in keyof CardVariant]?: ConditionalValue<CardVariant[K]> | undefined
}

export type CardVariantMap = {
  [K in keyof CardVariant]: Array<CardVariant[K]>
}

// Carousel

export type CarouselSlot =
  | "root"
  | "itemGroup"
  | "item"
  | "control"
  | "nextTrigger"
  | "prevTrigger"
  | "indicatorGroup"
  | "indicator"
  | "autoplayTrigger"
  | "progressText"
  | "progressText"
  | "autoplayIndicator"

export interface CarouselVariant {}

export type CarouselVariantProps = {
  [K in keyof CarouselVariant]?: ConditionalValue<CarouselVariant[K]> | undefined
}

export type CarouselVariantMap = {
  [K in keyof CarouselVariant]: Array<CarouselVariant[K]>
}

// Checkbox

export type CheckboxSlot = "root" | "label" | "control" | "indicator" | "group"

export interface CheckboxVariant {
  /** @default "md" */
  size?: "xs" | "sm" | "md" | "lg" | undefined
  /** @default "solid" */
  variant?: "outline" | "solid" | "subtle" | undefined
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
  size?: "sm" | "md" | "lg" | undefined
  /** @default "outline" */
  variant?: "surface" | "subtle" | "outline" | "solid" | undefined
  justify?: "start" | "end" | "center" | undefined
  /** @default "start" */
  align?: "start" | "end" | "center" | undefined
  /** @default "horizontal" */
  orientation?: "vertical" | "horizontal" | undefined
}

export type CheckboxCardVariantProps = {
  [K in keyof CheckboxCardVariant]?: ConditionalValue<CheckboxCardVariant[K]> | undefined
}

export type CheckboxCardVariantMap = {
  [K in keyof CheckboxCardVariant]: Array<CheckboxCardVariant[K]>
}

// CodeBlock

export type CodeBlockSlot =
  | "root"
  | "content"
  | "title"
  | "header"
  | "footer"
  | "control"
  | "overlay"
  | "code"
  | "codeText"
  | "copyTrigger"
  | "copyIndicator"
  | "collapseTrigger"
  | "collapseIndicator"
  | "collapseText"

export interface CodeBlockVariant {
  /** @default "md" */
  size?: "sm" | "md" | "lg" | undefined
}

export type CodeBlockVariantProps = {
  [K in keyof CodeBlockVariant]?: ConditionalValue<CodeBlockVariant[K]> | undefined
}

export type CodeBlockVariantMap = {
  [K in keyof CodeBlockVariant]: Array<CodeBlockVariant[K]>
}

// Collapsible

export type CollapsibleSlot = "root" | "trigger" | "content" | "indicator"

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
  orientation?: "horizontal" | "vertical" | undefined
  /** @default "md" */
  size?: "sm" | "md" | "lg" | undefined
  /** @default "subtle" */
  variant?: "subtle" | "bold" | undefined
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
  placement?: "center" | "top" | "bottom" | undefined
  /** @default "outside" */
  scrollBehavior?: "inside" | "outside" | undefined
  /** @default "md" */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "cover" | "full" | undefined
  /** @default "scale" */
  motionPreset?: "scale" | "slide-in-bottom" | "slide-in-top" | "slide-in-left" | "slide-in-right" | "none" | undefined
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
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "full" | undefined
  /** @default "end" */
  placement?: "start" | "end" | "top" | "bottom" | undefined
  contained?: boolean | undefined
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
  size?: "sm" | "md" | "lg" | undefined
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
  size?: "sm" | "md" | "lg" | undefined
}

export type EmptyStateVariantProps = {
  [K in keyof EmptyStateVariant]?: ConditionalValue<EmptyStateVariant[K]> | undefined
}

export type EmptyStateVariantMap = {
  [K in keyof EmptyStateVariant]: Array<EmptyStateVariant[K]>
}

// Field

export type FieldSlot = "root" | "errorText" | "helperText" | "input" | "label" | "select" | "textarea" | "requiredIndicator" | "requiredIndicator"

export interface FieldVariant {
  /** @default "vertical" */
  orientation?: "vertical" | "horizontal" | undefined
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
  size?: "sm" | "md" | "lg" | undefined
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
  | "clearTrigger"
  | "itemContent"
  | "dropzoneContent"
  | "fileText"

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
  size?: "xs" | "sm" | "md" | "lg" | undefined
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
  variant?: "marker" | "plain" | undefined
  align?: "center" | "start" | "end" | undefined
}

export type ListVariantProps = {
  [K in keyof ListVariant]?: ConditionalValue<ListVariant[K]> | undefined
}

export type ListVariantMap = {
  [K in keyof ListVariant]: Array<ListVariant[K]>
}

// Listbox

export type ListboxSlot =
  | "label"
  | "input"
  | "item"
  | "itemText"
  | "itemIndicator"
  | "itemGroup"
  | "itemGroupLabel"
  | "content"
  | "root"
  | "valueText"
  | "empty"

export interface ListboxVariant {
  /** @default "subtle" */
  variant?: "subtle" | "solid" | "plain" | undefined
}

export type ListboxVariantProps = {
  [K in keyof ListboxVariant]?: ConditionalValue<ListboxVariant[K]> | undefined
}

export type ListboxVariantMap = {
  [K in keyof ListboxVariant]: Array<ListboxVariant[K]>
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
  variant?: "subtle" | "solid" | undefined
  /** @default "md" */
  size?: "sm" | "md" | undefined
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
  variant?: "outline" | "subtle" | "plain" | undefined
  /** @default "md" */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | undefined
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
  size?: "xs" | "sm" | "md" | "lg" | undefined
  /** @default "outline" */
  variant?: "outline" | "subtle" | "flushed" | undefined
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
  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | undefined
  /** @default "outline" */
  variant?: "outline" | "subtle" | "flushed" | undefined
  attached?: boolean | undefined
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
  size?: "xs" | "sm" | "md" | "lg" | undefined
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
  variant?: "outline" | "subtle" | undefined
  /** @default "rounded" */
  shape?: "square" | "rounded" | "full" | undefined
  striped?: boolean | undefined
  animated?: boolean | undefined
  /** @default "md" */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | undefined
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
  size?: "xs" | "sm" | "md" | "lg" | "xl" | undefined
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
  size?: "sm" | "md" | "lg" | undefined
  /** @default "outline" */
  variant?: "surface" | "subtle" | "outline" | "solid" | undefined
  justify?: "start" | "end" | "center" | undefined
  /** @default "start" */
  align?: "start" | "end" | "center" | undefined
  /** @default "horizontal" */
  orientation?: "vertical" | "horizontal" | undefined
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
  variant?: "outline" | "subtle" | "solid" | undefined
  /** @default "md" */
  size?: "xs" | "sm" | "md" | "lg" | undefined
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
  size?: "xs" | "sm" | "md" | "lg" | undefined
}

export type RatingGroupVariantProps = {
  [K in keyof RatingGroupVariant]?: ConditionalValue<RatingGroupVariant[K]> | undefined
}

export type RatingGroupVariantMap = {
  [K in keyof RatingGroupVariant]: Array<RatingGroupVariant[K]>
}

// ScrollArea

export type ScrollAreaSlot = "root" | "viewport" | "content" | "scrollbar" | "thumb" | "corner"

export interface ScrollAreaVariant {
  /** @default "hover" */
  variant?: "hover" | "always" | undefined
  /** @default "md" */
  size?: "xs" | "sm" | "md" | "lg" | undefined
}

export type ScrollAreaVariantProps = {
  [K in keyof ScrollAreaVariant]?: ConditionalValue<ScrollAreaVariant[K]> | undefined
}

export type ScrollAreaVariantMap = {
  [K in keyof ScrollAreaVariant]: Array<ScrollAreaVariant[K]>
}

// SegmentGroup

export type SegmentGroupSlot = "root" | "label" | "item" | "itemText" | "itemControl" | "indicator"

export interface SegmentGroupVariant {
  /** @default "md" */
  size?: "xs" | "sm" | "md" | "lg" | undefined
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
  variant?: "outline" | "subtle" | undefined
  /** @default "md" */
  size?: "xs" | "sm" | "md" | "lg" | undefined
}

export type SelectVariantProps = {
  [K in keyof SelectVariant]?: ConditionalValue<SelectVariant[K]> | undefined
}

export type SelectVariantMap = {
  [K in keyof SelectVariant]: Array<SelectVariant[K]>
}

// Combobox

export type ComboboxSlot =
  | "root"
  | "clearTrigger"
  | "content"
  | "control"
  | "input"
  | "item"
  | "itemGroup"
  | "itemGroupLabel"
  | "itemIndicator"
  | "itemText"
  | "label"
  | "list"
  | "positioner"
  | "trigger"
  | "empty"
  | "indicatorGroup"
  | "empty"

export interface ComboboxVariant {
  /** @default "outline" */
  variant?: "outline" | "subtle" | "flushed" | undefined
  /** @default "md" */
  size?: "xs" | "sm" | "md" | "lg" | undefined
}

export type ComboboxVariantProps = {
  [K in keyof ComboboxVariant]?: ConditionalValue<ComboboxVariant[K]> | undefined
}

export type ComboboxVariantMap = {
  [K in keyof ComboboxVariant]: Array<ComboboxVariant[K]>
}

// Slider

export type SliderSlot =
  | "root"
  | "label"
  | "thumb"
  | "valueText"
  | "track"
  | "range"
  | "control"
  | "markerGroup"
  | "marker"
  | "draggingIndicator"
  | "markerIndicator"

export interface SliderVariant {
  /** @default "md" */
  size?: "sm" | "md" | "lg" | undefined
  /** @default "outline" */
  variant?: "outline" | "solid" | undefined
  /** @default "horizontal" */
  orientation?: "vertical" | "horizontal" | undefined
}

export type SliderVariantProps = {
  [K in keyof SliderVariant]?: ConditionalValue<SliderVariant[K]> | undefined
}

export type SliderVariantMap = {
  [K in keyof SliderVariant]: Array<SliderVariant[K]>
}

// Splitter

export type SplitterSlot = "root" | "panel" | "resizeTrigger" | "resizeTriggerIndicator" | "resizeTriggerSeparator" | "resizeTriggerIndicator"

export interface SplitterVariant {}

export type SplitterVariantProps = {
  [K in keyof SplitterVariant]?: ConditionalValue<SplitterVariant[K]> | undefined
}

export type SplitterVariantMap = {
  [K in keyof SplitterVariant]: Array<SplitterVariant[K]>
}

// Stat

export type StatSlot = "root" | "label" | "helpText" | "valueText" | "valueUnit" | "indicator"

export interface StatVariant {
  /** @default "md" */
  size?: "sm" | "md" | "lg" | undefined
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
  orientation?: "vertical" | "horizontal" | undefined
  /** @default "solid" */
  variant?: "solid" | "subtle" | undefined
  /** @default "md" */
  size?: "xs" | "sm" | "md" | "lg" | undefined
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
  variant?: "solid" | "raised" | undefined
  /** @default "md" */
  size?: "xs" | "sm" | "md" | "lg" | undefined
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
  interactive?: boolean | undefined
  stickyHeader?: boolean | undefined
  striped?: boolean | undefined
  showColumnBorder?: boolean | undefined
  /** @default "line" */
  variant?: "line" | "outline" | undefined
  /** @default "md" */
  size?: "sm" | "md" | "lg" | undefined
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
  fitted?: boolean | undefined
  justify?: "start" | "center" | "end" | undefined
  /** @default "md" */
  size?: "sm" | "md" | "lg" | undefined
  /** @default "line" */
  variant?: "line" | "subtle" | "enclosed" | "outline" | "plain" | undefined
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
  size?: "sm" | "md" | "lg" | "xl" | undefined
  /** @default "surface" */
  variant?: "subtle" | "solid" | "outline" | "surface" | undefined
}

export type TagVariantProps = {
  [K in keyof TagVariant]?: ConditionalValue<TagVariant[K]> | undefined
}

export type TagVariantMap = {
  [K in keyof TagVariant]: Array<TagVariant[K]>
}

// TagsInput

export type TagsInputSlot = "root" | "label" | "control" | "input" | "clearTrigger" | "item" | "itemPreview" | "itemInput" | "itemText" | "itemDeleteTrigger"

export interface TagsInputVariant {
  /** @default "md" */
  size?: "xs" | "sm" | "md" | "lg" | undefined
  /** @default "outline" */
  variant?: "outline" | "subtle" | "flushed" | undefined
}

export type TagsInputVariantProps = {
  [K in keyof TagsInputVariant]?: ConditionalValue<TagsInputVariant[K]> | undefined
}

export type TagsInputVariantMap = {
  [K in keyof TagsInputVariant]: Array<TagsInputVariant[K]>
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
  size?: "sm" | "md" | "lg" | undefined
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
  variant?: "subtle" | "solid" | "outline" | "plain" | undefined
  /** @default false */
  showLastSeparator?: boolean | undefined
  /** @default "md" */
  size?: "sm" | "md" | "lg" | "xl" | undefined
}

export type TimelineVariantProps = {
  [K in keyof TimelineVariant]?: ConditionalValue<TimelineVariant[K]> | undefined
}

export type TimelineVariantMap = {
  [K in keyof TimelineVariant]: Array<TimelineVariant[K]>
}

// ColorPicker

export type ColorPickerSlot =
  | "root"
  | "label"
  | "control"
  | "trigger"
  | "positioner"
  | "content"
  | "area"
  | "areaThumb"
  | "valueText"
  | "areaBackground"
  | "channelSlider"
  | "channelSliderLabel"
  | "channelSliderTrack"
  | "channelSliderThumb"
  | "channelSliderValueText"
  | "channelInput"
  | "transparencyGrid"
  | "swatchGroup"
  | "swatchTrigger"
  | "swatchIndicator"
  | "swatch"
  | "eyeDropperTrigger"
  | "formatTrigger"
  | "formatSelect"
  | "view"
  | "channelText"

export interface ColorPickerVariant {
  /** @default "md" */
  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | undefined
  /** @default "outline" */
  variant?: "outline" | "subtle" | undefined
}

export type ColorPickerVariantProps = {
  [K in keyof ColorPickerVariant]?: ConditionalValue<ColorPickerVariant[K]> | undefined
}

export type ColorPickerVariantMap = {
  [K in keyof ColorPickerVariant]: Array<ColorPickerVariant[K]>
}

// QrCode

export type QrCodeSlot = "root" | "frame" | "pattern" | "overlay" | "downloadTrigger"

export interface QrCodeVariant {
  /** @default "md" */
  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full" | undefined
}

export type QrCodeVariantProps = {
  [K in keyof QrCodeVariant]?: ConditionalValue<QrCodeVariant[K]> | undefined
}

export type QrCodeVariantMap = {
  [K in keyof QrCodeVariant]: Array<QrCodeVariant[K]>
}

// TreeView

export type TreeViewSlot =
  | "branch"
  | "branchContent"
  | "branchControl"
  | "branchIndentGuide"
  | "branchIndicator"
  | "branchText"
  | "branchTrigger"
  | "item"
  | "itemIndicator"
  | "itemText"
  | "label"
  | "nodeCheckbox"
  | "nodeRenameInput"
  | "root"
  | "tree"

export interface TreeViewVariant {
  /** @default "md" */
  size?: "md" | "sm" | "xs" | undefined
  /** @default "subtle" */
  variant?: "subtle" | "solid" | undefined
  animateContent?: boolean | undefined
}

export type TreeViewVariantProps = {
  [K in keyof TreeViewVariant]?: ConditionalValue<TreeViewVariant[K]> | undefined
}

export type TreeViewVariantMap = {
  [K in keyof TreeViewVariant]: Array<TreeViewVariant[K]>
}

export interface ConfigSlotRecipes {
  accordion: SystemSlotRecipeFn<AccordionSlot, AccordionVariantProps, AccordionVariantMap>
  actionBar: SystemSlotRecipeFn<ActionBarSlot, ActionBarVariantProps, ActionBarVariantMap>
  alert: SystemSlotRecipeFn<AlertSlot, AlertVariantProps, AlertVariantMap>
  avatar: SystemSlotRecipeFn<AvatarSlot, AvatarVariantProps, AvatarVariantMap>
  blockquote: SystemSlotRecipeFn<BlockquoteSlot, BlockquoteVariantProps, BlockquoteVariantMap>
  breadcrumb: SystemSlotRecipeFn<BreadcrumbSlot, BreadcrumbVariantProps, BreadcrumbVariantMap>
  card: SystemSlotRecipeFn<CardSlot, CardVariantProps, CardVariantMap>
  carousel: SystemSlotRecipeFn<CarouselSlot, CarouselVariantProps, CarouselVariantMap>
  checkbox: SystemSlotRecipeFn<CheckboxSlot, CheckboxVariantProps, CheckboxVariantMap>
  checkboxCard: SystemSlotRecipeFn<CheckboxCardSlot, CheckboxCardVariantProps, CheckboxCardVariantMap>
  codeBlock: SystemSlotRecipeFn<CodeBlockSlot, CodeBlockVariantProps, CodeBlockVariantMap>
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
  listbox: SystemSlotRecipeFn<ListboxSlot, ListboxVariantProps, ListboxVariantMap>
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
  scrollArea: SystemSlotRecipeFn<ScrollAreaSlot, ScrollAreaVariantProps, ScrollAreaVariantMap>
  segmentGroup: SystemSlotRecipeFn<SegmentGroupSlot, SegmentGroupVariantProps, SegmentGroupVariantMap>
  select: SystemSlotRecipeFn<SelectSlot, SelectVariantProps, SelectVariantMap>
  combobox: SystemSlotRecipeFn<ComboboxSlot, ComboboxVariantProps, ComboboxVariantMap>
  slider: SystemSlotRecipeFn<SliderSlot, SliderVariantProps, SliderVariantMap>
  splitter: SystemSlotRecipeFn<SplitterSlot, SplitterVariantProps, SplitterVariantMap>
  stat: SystemSlotRecipeFn<StatSlot, StatVariantProps, StatVariantMap>
  steps: SystemSlotRecipeFn<StepsSlot, StepsVariantProps, StepsVariantMap>
  switch: SystemSlotRecipeFn<SwitchSlot, SwitchVariantProps, SwitchVariantMap>
  table: SystemSlotRecipeFn<TableSlot, TableVariantProps, TableVariantMap>
  tabs: SystemSlotRecipeFn<TabsSlot, TabsVariantProps, TabsVariantMap>
  tag: SystemSlotRecipeFn<TagSlot, TagVariantProps, TagVariantMap>
  tagsInput: SystemSlotRecipeFn<TagsInputSlot, TagsInputVariantProps, TagsInputVariantMap>
  toast: SystemSlotRecipeFn<ToastSlot, ToastVariantProps, ToastVariantMap>
  tooltip: SystemSlotRecipeFn<TooltipSlot, TooltipVariantProps, TooltipVariantMap>
  status: SystemSlotRecipeFn<StatusSlot, StatusVariantProps, StatusVariantMap>
  timeline: SystemSlotRecipeFn<TimelineSlot, TimelineVariantProps, TimelineVariantMap>
  colorPicker: SystemSlotRecipeFn<ColorPickerSlot, ColorPickerVariantProps, ColorPickerVariantMap>
  qrCode: SystemSlotRecipeFn<QrCodeSlot, QrCodeVariantProps, QrCodeVariantMap>
  treeView: SystemSlotRecipeFn<TreeViewSlot, TreeViewVariantProps, TreeViewVariantMap>
}

export interface ConfigRecipeSlots {
  accordion: AccordionSlot
  actionBar: ActionBarSlot
  alert: AlertSlot
  avatar: AvatarSlot
  blockquote: BlockquoteSlot
  breadcrumb: BreadcrumbSlot
  card: CardSlot
  carousel: CarouselSlot
  checkbox: CheckboxSlot
  checkboxCard: CheckboxCardSlot
  codeBlock: CodeBlockSlot
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
  listbox: ListboxSlot
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
  scrollArea: ScrollAreaSlot
  segmentGroup: SegmentGroupSlot
  select: SelectSlot
  combobox: ComboboxSlot
  slider: SliderSlot
  splitter: SplitterSlot
  stat: StatSlot
  steps: StepsSlot
  switch: SwitchSlot
  table: TableSlot
  tabs: TabsSlot
  tag: TagSlot
  tagsInput: TagsInputSlot
  toast: ToastSlot
  tooltip: TooltipSlot
  status: StatusSlot
  timeline: TimelineSlot
  colorPicker: ColorPickerSlot
  qrCode: QrCodeSlot
  treeView: TreeViewSlot
}

export type SlotRecipeRecord<T, K> = T extends keyof ConfigRecipeSlots ? Record<ConfigRecipeSlots[T], K> : Record<string, K>

export type SlotRecipeProps<T> = T extends keyof ConfigSlotRecipes
  ? ConfigSlotRecipes[T]["__type"] & { recipe?: SlotRecipeDefinition | undefined }
  : { recipe?: SlotRecipeDefinition | undefined }

export type RecipeProps<T> = T extends keyof ConfigRecipes
  ? ConfigRecipes[T]["__type"] & { recipe?: RecipeDefinition | undefined }
  : { recipe?: RecipeDefinition | undefined }
