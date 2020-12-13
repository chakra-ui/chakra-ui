const cssLogicalValueMap = {
  float: { left: "inline-start", right: "inline-end" },
  clear: { left: "inline-start", right: "inline-end" },
  resize: { horizontal: "block", vertical: "inline" },
  textAlign: { left: "start", right: "end" },
  captionSize: { top: "block-start", bottom: "block-end" },
}

const cssLogicalPropertiesMap = {
  // Margin and Padding Logical Properties
  "marginTop|mt": "marginBlockStart",
  "marginLeft|ml": "marginInlineStart",
  "marginRight|mr": "marginInlineEnd",
  "marginBottom|mb": "marginBlockEnd",
  "paddingTop|pt": "paddingBlockStart",
  "paddingBottom|pb": "paddingBlockEnd",
  "paddingLeft|pl": "paddingInlineStart",
  "paddingRight|pr": "paddingInlineStart",
  "marginY|my": "marginBlock",
  "marginX|mx": "marginInline",

  // Floating and positioning logical properties
  top: "insetBlockStart",
  bottom: "insetBlockEnd",
  left: "insetInlineStart",
  right: "insetInlineEnd",

  // Sizing Logical properties
  "width|w": "inlineSize",
  "minW|minWidth": "minInlineSize",
  "maxW|maxWidth": "maxInlineSize",
  "height|h": "blockSize",
  "minH|minHeight": "minBlockSize",
  "maxH|maxHeight": "maxBlockSize",

  // Border logical properties
  borderY: "borderBlock",
  borderX: "borderInline",
  borderTopWidth: "borderBlockStartWidth",
  borderBottomWidth: "borderBlockEndWidth",
  borderLeftWidth: "borderInlineStartWidth",
  borderRightWidth: "borderInlineEndWidth",
  borderTopStyle: "borderBlockStartStyle",
  borderBottomStyle: "borderBlockEndStyle",
  borderLeftStyle: "borderInlineStartStyle",
  borderRightStyle: "borderInlineEndStyle",
  borderTopColor: "borderBlockStartColor",
  borderBottomColor: "borderBlockEndColor",
  borderLeftColor: "borderInlineStartColor",
  borderRightColor: "borderInlineEndColor",
  borderTop: "borderBlockStart",
  borderBottom: "borderBlockEnd",
  borderLeft: "borderInlineStart",
  borderRight: "borderInlineEndStyle",
}

function getCSSLogicalMap() {
  const map = new Map()
  const entries = Object.entries(cssLogicalPropertiesMap)
  for (const [key, value] of entries) {
    key.split("|").forEach((prop) => {
      map.set(prop, value)
    })
  }
  return map
}

export function getCSSLogicalValue(prop: string, value: any) {
  return prop in cssLogicalValueMap ? cssLogicalValueMap[prop][value] : value
}

const cssLogicalMap = getCSSLogicalMap()

console.log(cssLogicalMap.get("top"))

/**
 * @todo
 * Take functions from `rtl-css-js` by Kent C. Dodds
 *
 * - transform `transition`, `transition-property` and `transformOrigin` property.
 * - transform direct `margin | m` and `padding | p` values
 * - object position
 */
