import { createAnatomy } from "@ark-ui/anatomy"

export const alertAnatomy = createAnatomy("alert").parts(
  "title",
  "description",
  "root",
  "icon",
  "spinner",
)

export const toastAnatomy = createAnatomy("toast").parts(
  "root",
  "title",
  "description",
  "icon",
  "closeTrigger",
)

export const breadcrumbAnatomy = createAnatomy("breadcrumb").parts(
  "link",
  "currentLink",
  "item",
  "list",
  "root",
  "ellipsis",
  "separator",
)

export const blockquoteAnatomy = createAnatomy("blockquote").parts(
  "root",
  "icon",
  "content",
  "caption",
)

export const checkboxAnatomy = createAnatomy("checkbox").parts(
  "control",
  "indicator",
  "root",
  "label",
)

export const editableAnatomy = createAnatomy("editable").parts(
  "root",
  "preview",
  "input",
  "textarea",
)

export const listAnatomy = createAnatomy("list").parts("root", "item", "icon")

export const menuAnatomy = createAnatomy("menu").parts(
  "trigger",
  "content",
  "item",
  "groupTitle",
  "indicator",
  "command",
  "separator",
)

export const numberInputAnatomy = createAnatomy("numberinput").parts(
  "root",
  "field",
  "control",
  "incrementTrigger",
  "decrementTrigger",
)

export const radioAnatomy = createAnatomy("radio").parts(
  "root",
  "item",
  "control",
  "indicator",
  "label",
)

export const selectAnatomy = createAnatomy("select").parts(
  "root",
  "field",
  "indicator",
)

export const sliderAnatomy = createAnatomy("slider").parts(
  "root",
  "control",
  "track",
  "thumb",
  "label",
  "filledTrack",
  "mark",
  "valueText",
)

export const statAnatomy = createAnatomy("stat").parts(
  "group",
  "root",
  "label",
  "helpText",
  "number",
  "indicator",
)

export const switchAnatomy = createAnatomy("switch").parts(
  "root",
  "track",
  "thumb",
  "label",
)

export const tableAnatomy = createAnatomy("table").parts(
  "root",
  "header",
  "body",
  "row",
  "columnHeader",
  "cell",
  "footer",
  "caption",
)

export const tabsAnatomy = createAnatomy("tabs").parts(
  "root",
  "trigger",
  "list",
  "content",
  "contentGroup",
  "indicator",
)

export const tagAnatomy = createAnatomy("tag").parts(
  "root",
  "label",
  "closeTrigger",
)

export const cardAnatomy = createAnatomy("card").parts(
  "root",
  "header",
  "body",
  "footer",
)

export const stepsAnatomy = createAnatomy("stepper").parts(
  "root",
  "item",
  "title",
  "description",
  "indicator",
  "separator",
  "icon",
  "number",
)
