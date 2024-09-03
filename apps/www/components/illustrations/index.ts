import { AccordionAnatomy } from "./accordion"
import { ActionBarAnatomy } from "./action-bar"
import { AlertAnatomy } from "./alert"
import { AspectRatioAnatomy } from "./aspect-ratio"
import { AvatarAnatomy } from "./avatar"
import { BadgeAnatomy } from "./badge"
import { BlockquoteAnatomy } from "./blockquote"
import { BoxAnatomy } from "./box"
import { BreadcrumbAnatomy } from "./breadcrumb"
import { ButtonAnatomy } from "./button"
import { CardAnatomy } from "./card"
import { CenterAnatomy } from "./center"
import { CheckboxAnatomy } from "./checkbox"
import { CheckboxCardAnatomy } from "./checkbox-card"
import { ClipboardAnatomy } from "./clipboard"
import { CloseButtonAnatomy } from "./close-button"
import { CodeAnatomy } from "./code"
import { DataListAnatomy } from "./data-list"
import { DialogAnatomy } from "./dialog"
import { DrawerAnatomy } from "./drawer"
import { EditableAnatomy } from "./editable"
import { EmptyStateAnatomy } from "./empty-state"
import { FileUploadAnatomy } from "./file-upload"
import { FlexAnatomy } from "./flex"
import { FloatAnatomy } from "./float"
import { ForAnatomy } from "./for"
import { FormatByteAnatomy } from "./format-byte"
import { FormatNumberAnatomy } from "./format-number"
import { GridAnatomy } from "./grid"
import { HeadingAnatomy } from "./heading"
import { HighlightAnatomy } from "./highlight"
import { IconAnatomy } from "./icon"
import { ImageAnatomy } from "./image"
import { InputAnatomy } from "./input"
import { KbdAnatomy } from "./kbd"
import { LinkAnatomy } from "./link"
import { ListAnatomy } from "./list"
import { LocaleProviderAnatomy } from "./locale-provider"
import { MenuAnatomy } from "./menu"
import { NumberInputAnatomy } from "./number-input"
import { PaginationAnatomy } from "./pagination"
import { PasswordInputAnatomy } from "./password-input"
import { PinInputAnatomy } from "./pin-input"
import { PopoverAnatomy } from "./popover"
import { PortalAnatomy } from "./portal"
import { ProgressAnatomy } from "./progress"
import { ProgressCircleAnatomy } from "./progress-circle"
import { ProseAnatomy } from "./prose"
import { RadioAnatomy } from "./radio"
import { RadioCardAnatomy } from "./radio-card"
import { RatingAnatomy } from "./rating"
import { SegmentedControlAnatomy } from "./segmented-control"
import { SelectAnatomy } from "./select"
import { SeparatorAnatomy } from "./separator"
import { ShowAnatomy } from "./show"
import { SkeletonAnatomy } from "./skeleton"
import { SliderAnatomy } from "./slider"
import { SpinnerAnatomy } from "./spinner"
import { StackAnatomy } from "./stack"
import { StatAnatomy } from "./stat"
import { StatusAnatomy } from "./status"
import { StepsAnatomy } from "./steps"
import { SwitchAnatomy } from "./switch"
import { TableAnatomy } from "./table"
import { TabsAnatomy } from "./tabs"
import { TagAnatomy } from "./tag"
import { TextAnatomy } from "./text"
import { TextareaAnatomy } from "./textarea"
import { TimelineAnatomy } from "./timeline"
import { ToastAnatomy } from "./toast"
import { TooltipAnatomy } from "./tooltip"
import { VisuallyHiddenAnatomy } from "./visually-hidden"

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
}

export type ComponentAnatomyName = keyof typeof allComponents

export function getComponent(name: ComponentAnatomyName | (string & {})) {
  return Reflect.get(allComponents, name)
}
