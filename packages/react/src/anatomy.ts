import {
  accordionAnatomy as arkAccordionAnatomy,
  dialogAnatomy as arkDialogAnatomy,
  editableAnatomy as arkEditableAnatomy,
  fieldAnatomy as arkFieldAnatomy,
  fileUploadAnatomy as arkFileUploadAnatomy,
  menuAnatomy as arkMenuAnatomy,
  popoverAnatomy as arkPopoverAnatomy,
  radioGroupAnatomy as arkRadioGroupAnatomy,
  ratingGroupAnatomy as arkRatingGroupAnatomy,
  selectAnatomy as arkSelectAnatomy,
  sliderAnatomy as arkSliderAnatomy,
  switchAnatomy as arkSwitchAnatomy,
  createAnatomy,
} from "@ark-ui/anatomy"

export const accordionAnatomy = arkAccordionAnatomy.extendWith("itemBody")

export const actionBarAnatomy = createAnatomy("action-bar").parts(
  "positioner",
  "content",
  "separator",
  "selectionTrigger",
  "closeTrigger",
)

export const alertAnatomy = createAnatomy("alert").parts(
  "title",
  "description",
  "root",
  "indicator",
  "content",
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

export const cardAnatomy = createAnatomy("card").parts(
  "root",
  "header",
  "body",
  "footer",
  "title",
  "description",
)

export const checkboxCardAnatomy = createAnatomy("checkbox-card", [
  "root",
  "control",
  "label",
  "description",
  "addon",
  "indicator",
  "content",
])

export const dataListAnatomy = createAnatomy("data-list").parts(
  "root",
  "item",
  "itemLabel",
  "itemValue",
)

export const dialogAnatomy = arkDialogAnatomy.extendWith(
  "header",
  "body",
  "footer",
  "backdrop",
)

export const drawerAnatomy = arkDialogAnatomy.extendWith(
  "header",
  "body",
  "footer",
  "backdrop",
)

export const editableAnatomy = arkEditableAnatomy.extendWith("textarea")

export const emptyStateAnatomy = createAnatomy("empty-state", [
  "root",
  "content",
  "indicator",
  "title",
  "description",
])

export const fieldAnatomy = arkFieldAnatomy.extendWith("requiredIndicator")

export const fileUploadAnatomy = arkFileUploadAnatomy.extendWith(
  "itemContent",
  "dropzoneContent",
)

export const listAnatomy = createAnatomy("list").parts(
  "root",
  "item",
  "indicator",
)

export const menuAnatomy = arkMenuAnatomy.extendWith("itemCommand")

export const nativeSelectAnatomy = createAnatomy("select").parts(
  "root",
  "field",
  "indicator",
)

export const popoverAnatomy = arkPopoverAnatomy.extendWith(
  "header",
  "body",
  "footer",
)

export const radioGroupAnatomy = arkRadioGroupAnatomy.extendWith(
  "itemAddon",
  "itemIndicator",
)

export const radioCardAnatomy = radioGroupAnatomy.extendWith(
  "itemContent",
  "itemDescription",
)

export const ratingGroupAnatomy =
  arkRatingGroupAnatomy.extendWith("itemIndicator")

export const selectAnatomy = arkSelectAnatomy.extendWith("indicatorGroup")

export const sliderAnatomy = arkSliderAnatomy.extendWith("markerIndicator")

export const statAnatomy = createAnatomy("stat").parts(
  "root",
  "label",
  "helpText",
  "valueText",
  "valueUnit",
  "indicator",
)

export const statusAnatomy = createAnatomy("status").parts("root", "indicator")

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

export const switchAnatomy = arkSwitchAnatomy.extendWith("indicator")

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

export const toastAnatomy = createAnatomy("toast").parts(
  "root",
  "title",
  "description",
  "indicator",
  "closeTrigger",
  "actionTrigger",
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
  "startElement",
  "endElement",
)

export const timelineAnatomy = createAnatomy("timeline").parts(
  "root",
  "item",
  "content",
  "separator",
  "indicator",
  "connector",
  "title",
  "description",
)

export {
  avatarAnatomy,
  checkboxAnatomy,
  collapsibleAnatomy,
  fieldsetAnatomy,
  hoverCardAnatomy,
  numberInputAnatomy,
  pinInputAnatomy,
  progressAnatomy,
  segmentGroupAnatomy,
  tooltipAnatomy,
} from "@ark-ui/anatomy"
