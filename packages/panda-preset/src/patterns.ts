import type { PatternConfig } from "@pandacss/types"

const stack: PatternConfig = {
  properties: {
    align: { type: "property", value: "alignItems" },
    justify: { type: "property", value: "justifyContent" },
    direction: { type: "property", value: "flexDirection" },
    gap: { type: "token", value: "spacing" },
    wrap: { type: "property", value: "flexWrap" },
  },
  defaultValues: { direction: "column", gap: "0.5rem" },
  transform(props) {
    const { align, justify, direction, gap, wrap, ...rest } = props
    return {
      display: "flex",
      flexDirection: direction,
      alignItems: align,
      justifyContent: justify,
      flexWrap: wrap,
      gap,
      ...rest,
    }
  },
}

const hstack: PatternConfig = {
  jsxName: "HStack",
  properties: {
    justify: { type: "property", value: "justifyContent" },
    gap: { type: "token", value: "spacing" },
  },
  defaultValues: { gap: "0.5rem" },
  transform(props) {
    const { justify, gap, ...rest } = props
    return {
      display: "flex",
      alignItems: "center",
      justifyContent: justify,
      flexDirection: "row",
      gap,
      ...rest,
    }
  },
}

const vstack: PatternConfig = {
  jsxName: "VStack",
  properties: {
    justify: { type: "property", value: "justifyContent" },
    gap: { type: "token", value: "spacing" },
  },
  defaultValues: { gap: "0.5rem" },
  transform(props) {
    const { justify, gap, ...rest } = props
    return {
      display: "flex",
      alignItems: "center",
      justifyContent: justify,
      flexDirection: "column",
      gap,
      ...rest,
    }
  },
}

const flex: PatternConfig = {
  jsxName: "Flex",
  properties: {
    align: { type: "property", value: "alignItems" },
    justify: { type: "property", value: "justifyContent" },
    direction: { type: "property", value: "flexDirection" },
    wrap: { type: "property", value: "flexWrap" },
    basis: { type: "property", value: "flexBasis" },
    grow: { type: "property", value: "flexGrow" },
    shrink: { type: "property", value: "flexShrink" },
    inline: { type: "boolean" },
  },
  transform(props) {
    const {
      align,
      justify,
      direction,
      wrap,
      basis,
      grow,
      shrink,
      inline,
      ...rest
    } = props
    return {
      display: inline ? "inline-flex" : "flex",
      flexDirection: direction,
      alignItems: align,
      justifyContent: justify,
      flexWrap: wrap,
      flexBasis: basis,
      flexGrow: grow,
      flexShrink: shrink,
      ...rest,
    }
  },
}

const center: PatternConfig = {
  jsxName: "Center",
  properties: { inline: { type: "boolean" } },
  transform(props) {
    const { inline, ...rest } = props
    return {
      display: inline ? "inline-flex" : "flex",
      alignItems: "center",
      justifyContent: "center",
      ...rest,
    }
  },
}

export const patterns = { stack, hstack, vstack, flex, center }
