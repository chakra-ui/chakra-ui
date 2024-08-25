import {
  dialogAnatomy as arkDialogAnatomy,
  createAnatomy,
} from "@ark-ui/anatomy"
import { fieldAnatomy as arkFieldAnatomy } from "@ark-ui/react/field"

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
  "indicator",
  "closeTrigger",
  "actionTrigger",
)

export const emptyStateAnatomy = createAnatomy("empty-state", [
  "root",
  "content",
  "indicator",
  "title",
  "description",
])

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

export const listAnatomy = createAnatomy("list").parts(
  "root",
  "item",
  "indicator",
)

export const checkboxCardAnatomy = createAnatomy("checkbox-card", [
  "root",
  "control",
  "label",
  "addon",
  "indicator",
])

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
  "valueUnit",
  "indicator",
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
  "title",
  "description",
)

export const stepsAnatomy = createAnatomy("steps", [
  "root",
  "list",
  "item",
  "trigger",
  "indicator",
  "separator",
  "content",
  "title",
  "description",
  "nextTrigger",
  "prevTrigger",
  "progress",
])

export const timelineAnatomy = createAnatomy("timeline").parts(
  "root",
  "item",
  "content",
  "separator",
  "indicator",
  "connector",
)

export const drawerAnatomy = arkDialogAnatomy.extendWith(
  "header",
  "body",
  "footer",
  "backdrop",
)

export const fieldAnatomy = arkFieldAnatomy.extendWith("requiredIndicator")
