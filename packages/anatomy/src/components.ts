import { anatomy } from "./create-anatomy"

export const accordionAnatomy = anatomy("accordion").parts(
  "root",
  "container",
  "button",
  "panel",
  "icon",
)

export const alertAnatomy = anatomy("alert").parts(
  "title",
  "description",
  "container",
  "icon",
  "spinner",
)

export const avatarAnatomy = anatomy("avatar").parts(
  "label",
  "badge",
  "container",
  "excessLabel",
  "group",
)

export const breadcrumbAnatomy = anatomy("breadcrumb").parts(
  "link",
  "item",
  "container",
  "separator",
)

export const buttonAnatomy = anatomy("button").parts()

export const checkboxAnatomy = anatomy("checkbox").parts(
  "control",
  "icon",
  "container",
  "label",
)

export const circularProgressAnatomy = anatomy("progress").parts(
  "track",
  "filledTrack",
  "label",
)

export const drawerAnatomy = anatomy("drawer").parts(
  "overlay",
  "dialogContainer",
  "dialog",
  "header",
  "closeButton",
  "body",
  "footer",
)

export const editableAnatomy = anatomy("editable").parts(
  "preview",
  "input",
  "textarea",
)

export const formAnatomy = anatomy("form").parts(
  "container",
  "requiredIndicator",
  "helpText",
)

export const formErrorAnatomy = anatomy("formError").parts("text", "icon")

export const inputAnatomy = anatomy("input").parts(
  "addon",
  "field",
  "element",
  "group",
)

export const listAnatomy = anatomy("list").parts("container", "item", "icon")

export const menuAnatomy = anatomy("menu").parts(
  "button",
  "list",
  "item",
  "groupTitle",
  "icon",
  "command",
  "divider",
)

export const modalAnatomy = anatomy("modal").parts(
  "overlay",
  "dialogContainer",
  "dialog",
  "header",
  "closeButton",
  "body",
  "footer",
)

export const numberInputAnatomy = anatomy("numberinput").parts(
  "root",
  "field",
  "stepperGroup",
  "stepper",
)

export const pinInputAnatomy = anatomy("pininput").parts("field")

export const popoverAnatomy = anatomy("popover").parts(
  "content",
  "header",
  "body",
  "footer",
  "popper",
  "arrow",
  "closeButton",
)

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
  "mark",
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
  "label",
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

export const cardAnatomy = anatomy("card").parts(
  "container",
  "header",
  "body",
  "footer",
)

export const stepperAnatomy = anatomy("stepper").parts(
  "stepper",
  "step",
  "title",
  "description",
  "indicator",
  "separator",
  "icon",
  "number",
)
