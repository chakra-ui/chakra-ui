import * as React from "react"
import Link from "next/link"
import * as ComponentProps from "@chakra-ui/props-docs"
import { Tag, theme } from "@chakra-ui/react"
import MDXComponents from "./mdx-components"

/**
 * A map of components that use foreign theme key.
 * The key is name of the component and value is the theme key it uses.
 */
const themeComponentKeyAliases = {
  AlertDialog: "Modal",
  IconButton: "Button",
}

export type PropsTableProps = {
  /**
   * displayName of the target component
   */
  of: string
  /**
   * prop names to omit
   */
  omit?: string[] | null
  /**
   * Render only given prop names
   * Has precedence over `omit`
   */
  only?: string[] | null
}

const PropsTable = ({
  of,
  omit = [
    "isTruncated",
    "layerStyle",
    "noOfLines",
    "textStyle",
    "orientation",
    "styleConfig",
  ],
  only,
}: PropsTableProps) => {
  const propList = React.useMemo(() => makePropsTable({ of, omit, only }), [
    of,
    omit,
    only,
  ])

  if (!propList.length) {
    // this error breaks the build to notify you when there would be an empty table
    throw new Error(
      `No props left to render for component ${of}.
Remove the use of <PropsTable of="${of}" /> for this component in the docs.`,
    )
  }

  return (
    <MDXComponents.table>
      <thead>
        <tr>
          <MDXComponents.th>Name</MDXComponents.th>
          <MDXComponents.th>Type</MDXComponents.th>
          <MDXComponents.th>Description</MDXComponents.th>
          <MDXComponents.th>Default</MDXComponents.th>
        </tr>
      </thead>
      <tbody>
        {propList.map((prop) => (
          <tr key={prop.name}>
            <MDXComponents.td>{prop.name}</MDXComponents.td>
            <MDXComponents.td>
              {prop.required && (
                <Tag
                  size="sm"
                  colorScheme="red"
                  px={1}
                  mr="0.125rem"
                  verticalAlign="baseline"
                >
                  required
                </Tag>
              )}
              <MDXComponents.inlineCode
                whiteSpace="wrap"
                d="inline-block"
                lineHeight="tall"
              >
                {prop.type}
              </MDXComponents.inlineCode>
            </MDXComponents.td>
            <MDXComponents.td>{prop.description}</MDXComponents.td>
            <MDXComponents.td>
              {prop.defaultValue ? (
                <MDXComponents.inlineCode
                  whiteSpace="wrap"
                  d="inline-block"
                  lineHeight="tall"
                >
                  {prop.defaultValue}
                </MDXComponents.inlineCode>
              ) : (
                "-"
              )}
            </MDXComponents.td>
          </tr>
        ))}
      </tbody>
    </MDXComponents.table>
  )
}

export default PropsTable

interface MakePropsTableOptions extends PropsTableProps {}

const TYPE_GENERIC_THEMABLE = "(string & {})"

function makePropsTable({ of, omit, only }: MakePropsTableOptions) {
  const props = ComponentProps[of]?.props as Record<string, any>

  const themeKey = themeComponentKeyAliases[of] ?? of
  const componentTheme = theme.components[themeKey]

  const featNotImplemented = (feat: string) => (
    <>
      {feat} for <MDXComponents.inlineCode>{of}</MDXComponents.inlineCode> are
      not implemented in the default theme. You can{" "}
      <Link
        href="/docs/theming/customize-theme#customizing-component-styles"
        passHref
      >
        <MDXComponents.a>extend the theme</MDXComponents.a>
      </Link>{" "}
      to implement them.
    </>
  )

  return Object.entries(props)
    .filter(([name]) => {
      if (Array.isArray(only) && !only.includes(name)) {
        return false
      }

      if (Array.isArray(omit) && omit.includes(name)) {
        return false
      }

      return true
    })
    .map(([name, { defaultValue, description, required, type }]) => {
      const prop = {
        name,
        defaultValue: defaultValue?.value,
        description,
        required,
        type: type.name,
      }

      if (name === "size") {
        const defaultSize = componentTheme?.defaultProps?.size

        if (defaultSize != null) {
          prop.defaultValue = `"${defaultSize}"`
        }

        if (prop.type === TYPE_GENERIC_THEMABLE) {
          prop.type = "string"
          prop.description = featNotImplemented("Sizes")
        } else {
          prop.type = omitGenericThemableType(prop.type)
        }
      }

      if (name === "variant") {
        const defaultVariant = componentTheme?.defaultProps?.variant

        if (defaultVariant != null) {
          prop.defaultValue = `"${defaultVariant}"`
        }

        if (prop.type === TYPE_GENERIC_THEMABLE) {
          prop.type = "string"
          prop.description = featNotImplemented("Variants")
        } else {
          prop.type = omitGenericThemableType(prop.type)
        }
      }

      if (name === "colorScheme") {
        prop.type = omitGenericThemableType(prop.type)

        const defaultColorScheme = componentTheme?.defaultProps?.colorScheme

        if (defaultColorScheme != null) {
          prop.defaultValue = `"${defaultColorScheme}"`
        } else {
          prop.description = featNotImplemented("Color Schemes")
        }
      }

      return prop
    })
    .sort((propA, propB) => {
      const aRequired = propA.required ? 1000 : 0
      const bRequired = propB.required ? 1000 : 0
      const requiredOffset = aRequired - bRequired
      return String(propA.name).localeCompare(propB.name) - requiredOffset
    })
}

const omitGenericThemableType = (type: string) =>
  type
    .split(" | ")
    .filter((type) => type !== TYPE_GENERIC_THEMABLE)
    .join(" | ")
