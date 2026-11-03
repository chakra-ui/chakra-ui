import { DatePicker } from "@ark-ui/react"
import { AbsoluteCenterAnatomy } from "./absolute-center"
import { AccordionAnatomy } from "./accordion"
import { ActionBarAnatomy } from "./action-bar"
import { AlertAnatomy } from "./alert"
import { AspectRatioAnatomy } from "./aspect-ratio"
import { AvatarAnatomy } from "./avatar"
import { BadgeAnatomy } from "./badge"
import { BleedAnatomy } from "./bleed"
import { BlockquoteAnatomy } from "./blockquote"
import { BoxAnatomy } from "./box"
import { BreadcrumbAnatomy } from "./breadcrumb"
import { ButtonAnatomy } from "./button"
import { CalendarAnatomy } from "./calendar"
import { CardAnatomy } from "./card"
import { CarouselAnatomy } from "./carousel"
import { CenterAnatomy } from "./center"
import { CheckboxAnatomy } from "./checkbox"
import { CheckboxCardAnatomy } from "./checkbox-card"
import { CheckmarkAnatomy } from "./checkmark"
import { ClientOnlyAnatomy } from "./client-only"
import { ClipboardAnatomy } from "./clipboard"
import { CloseButtonAnatomy } from "./close-button"
import { CodeAnatomy } from "./code"
import { CodeBlockAnatomy } from "./code-block"
import { CollapsibleAnatomy } from "./collapsible"
import { ColorPickerAnatomy } from "./color-picker"
import { ColorSwatchAnatomy } from "./color-swatch"
import { ComboboxAnatomy } from "./combobox"
import { CommandAnatomy } from "./command"
import { ContainerAnatomy } from "./container"
import { DataListAnatomy } from "./data-list"
import { DateInputAnatomy } from "./date-input"
import { DatePickerAnatomy } from "./date-picker"
import { DialogAnatomy } from "./dialog"
import { DownloadTriggerAnatomy } from "./download-trigger"
import { DrawerAnatomy } from "./drawer"
import { EditableAnatomy } from "./editable"
import { EmAnatomy } from "./em"
import { EmptyStateAnatomy } from "./empty-state"
import { EnvironmentProviderAnatomy } from "./environment-provider"
import { FieldAnatomy } from "./field"
import { FieldsetAnatomy } from "./fieldset"
import { FileUploadAnatomy } from "./file-upload"
import { FlexAnatomy } from "./flex"
import { FloatAnatomy } from "./float"
import { FloatingPanelAnatomy } from "./floating-panel"
import { ForAnatomy } from "./for"
import { FormatByteAnatomy } from "./format-byte"
import { FormatNumberAnatomy } from "./format-number"
import { GridAnatomy } from "./grid"
import { GroupAnatomy } from "./group"
import { HeadingAnatomy } from "./heading"
import { HighlightAnatomy } from "./highlight"
import { HoverCardAnatomy } from "./hover-card"
import { IconAnatomy } from "./icon"
import { IconButtonAnatomy } from "./icon-button"
import { ImageAnatomy } from "./image"
import { InputAnatomy } from "./input"
import { KbdAnatomy } from "./kbd"
import { LinkAnatomy } from "./link"
import { LinkOverlayAnatomy } from "./link-overlay"
import { ListAnatomy } from "./list"
import { ListboxAnatomy } from "./listbox"
import { LocaleProviderAnatomy } from "./locale-provider"
import { MarkAnatomy } from "./mark"
import { MarqueeAnatomy } from "./marquee"
import { MenuAnatomy } from "./menu"
import { NativeSelectAnatomy } from "./native-select"
import { NumberInputAnatomy } from "./number-input"
import { OverlayManagerAnatomy } from "./overlay-manager"
import { PaginationAnatomy } from "./pagination"
import { PasswordInputAnatomy } from "./password-input"
import { PinInputAnatomy } from "./pin-input"
import { PopoverAnatomy } from "./popover"
import { PortalAnatomy } from "./portal"
import { PresenceAnatomy } from "./presence"
import { ProgressAnatomy } from "./progress"
import { ProgressCircleAnatomy } from "./progress-circle"
import { ProseAnatomy } from "./prose"
import { QrCodeAnatomy } from "./qr-code"
import { RadioAnatomy } from "./radio"
import { RadioCardAnatomy } from "./radio-card"
import { RadiomarkAnatomy } from "./radiomark"
import { RatingAnatomy } from "./rating"
import { RichTextEditorAnatomy } from "./rich-text-editor"
import { ScrollAreaAnatomy } from "./scroll-area"
import { SegmentedControlAnatomy } from "./segmented-control"
import { SelectAnatomy } from "./select"
import { SeparatorAnatomy } from "./separator"
import { ShowAnatomy } from "./show"
import { SimpleGridAnatomy } from "./simple-grid"
import { SkeletonAnatomy } from "./skeleton"
import { SkipNavAnatomy } from "./skip-nav"
import { SliderAnatomy } from "./slider"
import { SpinnerAnatomy } from "./spinner"
import { SplitterAnatomy } from "./splitter"
import { StackAnatomy } from "./stack"
import { StatAnatomy } from "./stat"
import { StatusAnatomy } from "./status"
import { StepsAnatomy } from "./steps"
import { SwitchAnatomy } from "./switch"
import { TableAnatomy } from "./table"
import { TabsAnatomy } from "./tabs"
import { TagAnatomy } from "./tag"
import { TagsInputAnatomy } from "./tags-input"
import { TextAnatomy } from "./text"
import { TextareaAnatomy } from "./textarea"
import { ThemeAnatomy } from "./theme"
import { TimelineAnatomy } from "./timeline"
import { ToastAnatomy } from "./toast"
import { ToggleTipAnatomy } from "./toggle-tip"
import { TooltipAnatomy } from "./tooltip"
import { TreeViewAnatomy } from "./tree-view"
import { VisuallyHiddenAnatomy } from "./visually-hidden"
import { WrapAnatomy } from "./wrap"

export const allComponents = {
  blockquote: BlockquoteAnatomy,
  "empty-state": EmptyStateAnatomy,
  portal: PortalAnatomy,
  "checkbox-card": CheckboxCardAnatomy,
  "action-bar": ActionBarAnatomy,
  box: BoxAnatomy,
  "data-list": DataListAnatomy,
  select: SelectAnatomy,
  menu: MenuAnatomy,
  editable: EditableAnatomy,
  pagination: PaginationAnatomy,
  tag: TagAnatomy,
  table: TableAnatomy,
  code: CodeAnatomy,
  skeleton: SkeletonAnatomy,
  card: CardAnatomy,
  textarea: TextareaAnatomy,
  "file-upload": FileUploadAnatomy,
  clipboard: ClipboardAnatomy,
  list: ListAnatomy,
  separator: SeparatorAnatomy,
  stack: StackAnatomy,
  "segmented-control": SegmentedControlAnatomy,
  timeline: TimelineAnatomy,
  rating: RatingAnatomy,
  prose: ProseAnatomy,
  heading: HeadingAnatomy,
  text: TextAnatomy,
  link: LinkAnatomy,
  center: CenterAnatomy,
  "close-button": CloseButtonAnatomy,
  show: ShowAnatomy,
  icon: IconAnatomy,
  image: ImageAnatomy,
  for: ForAnatomy,
  kbd: KbdAnatomy,
  drawer: DrawerAnatomy,
  dialog: DialogAnatomy,
  flex: FlexAnatomy,
  grid: GridAnatomy,
  "locale-provider": LocaleProviderAnatomy,
  highlight: HighlightAnatomy,
  "format-number": FormatNumberAnatomy,
  "format-byte": FormatByteAnatomy,
  stat: StatAnatomy,
  status: StatusAnatomy,
  steps: StepsAnatomy,
  breadcrumb: BreadcrumbAnatomy,
  accordion: AccordionAnatomy,
  "visually-hidden": VisuallyHiddenAnatomy,
  tabs: TabsAnatomy,
  toast: ToastAnatomy,
  spinner: SpinnerAnatomy,
  "password-input": PasswordInputAnatomy,
  popover: PopoverAnatomy,
  tooltip: TooltipAnatomy,
  slider: SliderAnatomy,
  float: FloatAnatomy,
  radio: RadioAnatomy,
  "radio-card": RadioCardAnatomy,
  progress: ProgressAnatomy,
  "progress-circle": ProgressCircleAnatomy,
  "aspect-ratio": AspectRatioAnatomy,
  alert: AlertAnatomy,
  avatar: AvatarAnatomy,
  badge: BadgeAnatomy,
  "number-input": NumberInputAnatomy,
  input: InputAnatomy,
  "pin-input": PinInputAnatomy,
  switch: SwitchAnatomy,
  checkbox: CheckboxAnatomy,
  button: ButtonAnatomy,
  "absolute-center": AbsoluteCenterAnatomy,
  bleed: BleedAnatomy,
  calendar: CalendarAnatomy,
  carousel: CarouselAnatomy,
  checkmark: CheckmarkAnatomy,
  "client-only": ClientOnlyAnatomy,
  "code-block": CodeBlockAnatomy,
  collapsible: CollapsibleAnatomy,
  "color-picker": ColorPickerAnatomy,
  "color-swatch": ColorSwatchAnatomy,
  combobox: ComboboxAnatomy,
  command: CommandAnatomy,
  container: ContainerAnatomy,
  "date-input": DateInputAnatomy,
  "date-picker": DatePickerAnatomy,
  "download-trigger": DownloadTriggerAnatomy,
  em: EmAnatomy,
  "environment-provider": EnvironmentProviderAnatomy,
  field: FieldAnatomy,
  fieldset: FieldsetAnatomy,
  "floating-panel": FloatingPanelAnatomy,
  group: GroupAnatomy,
  "hover-card": HoverCardAnatomy,
  "icon-button": IconButtonAnatomy,
  "link-overlay": LinkOverlayAnatomy,
  listbox: ListboxAnatomy,
  mark: MarkAnatomy,
  marquee: MarqueeAnatomy,
  "native-select": NativeSelectAnatomy,
  "overlay-manager": OverlayManagerAnatomy,
  presence: PresenceAnatomy,
  "qr-code": QrCodeAnatomy,
  radiomark: RadiomarkAnatomy,
  "rich-text-editor": RichTextEditorAnatomy,
  "scroll-area": ScrollAreaAnatomy,
  "simple-grid": SimpleGridAnatomy,
  "skip-nav": SkipNavAnatomy,
  splitter: SplitterAnatomy,
  "tags-input": TagsInputAnatomy,
  theme: ThemeAnatomy,
  "toggle-tip": ToggleTipAnatomy,
  "tree-view": TreeViewAnatomy,
  wrap: WrapAnatomy,
}

export type ComponentAnatomyName = keyof typeof allComponents

export function getComponent(name: ComponentAnatomyName | (string & {})) {
  return Reflect.get(allComponents, name)
}
