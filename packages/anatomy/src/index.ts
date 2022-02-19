import { anatomy } from "@chakra-ui/theme-tools"

/**
 * **Accordion anatomy**
 * - Root: the root container of the accordion
 * - Container: the accordion item contains the button and panel
 * - Button: the button is the trigger for the panel
 * - Panel: the panel is the content of the accordion item
 * - Icon: the expanded/collapsed icon
 */
export const accordionAnatomy = anatomy("accordion")
  .parts("root", "container", "button", "panel")
  .extend("icon")

/**
 * **Alert anatomy**
 * - Title: the alert's title
 * - Description: the alert's description
 * - Icon: the alert's icon
 */
export const alertAnatomy = anatomy("alert")
  .parts("title", "description", "container")
  .extend("icon")

/**
 * **Avatar anatomy**
 * - Container: the container for the avatar
 * - Label: the avatar initials text
 * - Excess Label: the label or text that represents excess avatar count.
 * Typically used in avatar groups.
 * - Group: the container for the avatar group
 */
export const avatarAnatomy = anatomy("avatar")
  .parts("label", "badge", "container")
  .extend("excessLabel", "group")

/**
 * **Breadcrumb anatomy**
 * - Item: the container for a breadcrumb item
 * - Link: the element that represents the breadcrumb link
 * - Container: the container for the breadcrumb items
 * - Separator: the separator between breadcrumb items
 */
export const breadcrumbAnatomy = anatomy("breadcrumb")
  .parts("link", "item", "container")
  .extend("separator")

export const buttonAnatomy = anatomy("button").parts()

export const checkboxAnatomy = anatomy("checkbox")
  .parts("control", "icon", "container")
  .extend("label")

export const circularProgressAnatomy = anatomy("progress")
  .parts("track", "filledTrack")
  .extend("label")

export const drawerAnatomy = anatomy("drawer")
  .parts("overlay", "dialogContainer", "dialog")
  .extend("header", "closeButton", "body", "footer")

export const editableAnatomy = anatomy("editable").parts("preview", "input")

export const formAnatomy = anatomy("form").parts(
  "container",
  "requiredIndicator",
  "helperText",
)

export const formErrorAnatomy = anatomy("formError").parts("text", "icon")

export const inputAnatomy = anatomy("input").parts("addon", "field", "element")

export const listAnatomy = anatomy("list").parts("container", "item", "icon")

export const menuAnatomy = anatomy("menu")
  .parts("button", "list", "item")
  .extend("groupTitle", "command", "divider")

export const modalAnatomy = anatomy("modal")
  .parts("overlay", "dialogContainer", "dialog")
  .extend("header", "closeButton", "body", "footer")

export const numberInputAnatomy = anatomy("numberinput").parts(
  "root",
  "field",
  "stepperGroup",
  "stepper",
)

export const pinInputAnatomy = anatomy("pininput").parts("field")

export const popoverAnatomy = anatomy("popover")
  .parts("content", "header", "body", "footer")
  .extend("popper", "arrow", "closeButton")

export const progressAnatomy = anatomy("progress").parts(
  "label",
  "filledTrack",
  "track",
)

export const radioAnatomy = anatomy("radio").parts(
  "container",
  "control",
  "label",
)

export const selectAnatomy = anatomy("select").parts("field", "icon")

export const sliderAnatomy = anatomy("slider").parts(
  "container",
  "track",
  "thumb",
  "filledTrack",
)

export const statAnatomy = anatomy("stat").parts(
  "container",
  "label",
  "helpText",
  "number",
  "icon",
)

export const switchAnatomy = anatomy("switch").parts(
  "container",
  "track",
  "thumb",
)

export const tableAnatomy = anatomy("table").parts(
  "table",
  "thead",
  "tbody",
  "tr",
  "th",
  "td",
  "tfoot",
  "caption",
)

export const tabsAnatomy = anatomy("tabs").parts(
  "root",
  "tab",
  "tablist",
  "tabpanel",
  "tabpanels",
  "indicator",
)

/**
 * **Tag anatomy**
 * - Container: the container for the tag
 * - Label: the text content of the tag
 * - closeButton: the close button for the tag
 */
export const tagAnatomy = anatomy("tag").parts(
  "container",
  "label",
  "closeButton",
)
