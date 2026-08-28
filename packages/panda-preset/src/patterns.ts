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

export const patterns = { stack, hstack, vstack }
