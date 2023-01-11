function toLiteralStringType(strings: string[]) {
  return (
    strings
      .map((s) => `"${s}"`)
      .join(" | ")
      .trim() || "string"
  )
}

const isObject = (v: unknown): v is Record<string, unknown> => {
  return typeof v === "object" && v !== null
}

const isString = (v: unknown): v is string => {
  return typeof v === "string"
}

function isValidColorScheme(value: unknown): value is Record<string, string> {
  return (
    isObject(value) &&
    ["50", "100", "200", "300", "400", "600", "700", "800", "900"].every((k) =>
      isString(value[k]),
    )
  )
}

type ThemingProps = Partial<{
  variant: string | number
  size: string | number
  colorScheme: string
}>

type PropertyInfo = {
  [K in keyof ThemingProps]?: {
    type: string
    defaultValue?: string
    required: boolean
    description: string
  }
}

function extractColorScheme(theme: { colors?: Record<string, unknown> }) {
  if (!theme.colors) return "string"

  const validColors = Object.entries(theme.colors)
    .filter(([, values]) => isValidColorScheme(values))
    .map(([name]) => name)

  return toLiteralStringType(validColors)
}

export function extractThemeProps(theme: {
  colors?: Record<string, unknown>
  components?: Record<
    string,
    {
      defaultProps?: ThemingProps
      sizes?: Record<string, unknown>
      variants?: Record<string, unknown>
    }
  >
}) {
  const result: Record<string, PropertyInfo> = {}

  const colorSchemeType = extractColorScheme(theme)

  for (const [name, componentTheme] of Object.entries(theme.components ?? {})) {
    const { defaultProps, variants, sizes } = componentTheme

    if (!defaultProps) continue

    result[name] = {
      variant: {
        defaultValue: defaultProps.variant?.toString(),
        type: variants ? toLiteralStringType(Object.keys(variants)) : "string",
        required: false,
        description: `The variant of the ${name}`,
      },
      size: {
        defaultValue: defaultProps.size?.toString(),
        type: sizes ? toLiteralStringType(Object.keys(sizes)) : "string",
        required: false,
        description: `The size of the ${name}`,
      },
      colorScheme: {
        defaultValue: defaultProps.colorScheme,
        type: colorSchemeType,
        required: false,
        description: "The visual color appearance of the component",
      },
    }
  }

  return result
}
