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
  "paddingRight|pr": "paddingInlineEnd",
  "marginY|my": "marginBlock",
  "marginX|mx": "marginInline",
  "paddingY|py": "paddingBlock",
  "paddingX|px": "paddingInline",

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

  borderTop: "borderBlockStart",
  borderTopWidth: "borderBlockStartWidth",
  borderTopStyle: "borderBlockStartStyle",
  borderTopColor: "borderBlockStartColor",

  borderBottom: "borderBlockEnd",
  borderBottomWidth: "borderBlockEndWidth",
  borderBottomStyle: "borderBlockEndStyle",
  borderBottomColor: "borderBlockEndColor",

  borderLeft: "borderInlineStart",
  borderLeftWidth: "borderInlineStartWidth",
  borderLeftStyle: "borderInlineStartStyle",
  borderLeftColor: "borderInlineStartColor",

  borderRight: "borderInlineEnd",
  borderRightWidth: "borderInlineEndWidth",
  borderRightStyle: "borderInlineEndStyle",
  borderRightColor: "borderInlineEndColor",
}

function getCSSLogicalMap() {
  const map = new Map()
  const entries = Object.entries(cssLogicalPropertiesMap)
  for (const [key, value] of entries) {
    for (const prop of key.split("|")) {
      map.set(prop, value)
    }
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
