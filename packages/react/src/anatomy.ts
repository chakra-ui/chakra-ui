import { createAnatomy } from "@ark-ui/anatomy"

export const alertAnatomy = createAnatomy("alert").parts(
  "title",
  "description",
  "root",
  "indicator",
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

export const editableAnatomy = createAnatomy("editable").parts(
  "root",
  "preview",
  "input",
  "textarea",
)

export const listAnatomy = createAnatomy("list").parts("root", "item", "icon")

export const nativeSelectAnatomy = createAnatomy("select").parts(
  "root",
  "field",
  "indicator",
)

export const statAnatomy = createAnatomy("stat").parts(
  "root",
  "label",
  "helpText",
  "valueText",
  "indicator",
)

export const tableAnatomy = createAnatomy("table").parts(
  "scrollArea",
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
