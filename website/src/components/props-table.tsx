import * as ComponentProps from "@chakra-ui/props-docs"
import { chakra, Code, HStack, Stack, theme, Flex } from "@chakra-ui/react"
import Link from "next/link"
import * as React from "react"
import { convertBackticksToInlineCode } from "utils/convert-backticks-to-inline-code"
import MDXComponents from "./mdx-components" // eslint-disable-line import/no-cycle

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
    <Stack spacing="10" my="10">
      {propList.map((prop) => (
        <chakra.div
          key={prop.name}
          css={{
            width: "100%",
            fontSize: "0.95em",
            borderCollapse: "collapse",
            ".row": {
              minWidth: 100,
              width: "20%",
              fontSize: "0.9em",
              textAlign: "start",
              fontWeight: 500,
              padding: "4px 16px 4px 8px",
              whiteSpace: "nowrap",
              verticalAlign: "baseline",
            },
            ".cell": {
              padding: "4px 0px 4px 8px",
              width: "100%",
            },
          }}
        >
          <chakra.div css={{ textAlign: "start", fontSize: "1em" }}>
            <chakra.h3
              css={{
                fontSize: "0.8em",
                paddingBottom: 16,
                marginBottom: 16,
                borderBottomWidth: 1,
              }}
            >
              <HStack>
                <Code colorScheme="purple">{prop.name}</Code>
                {prop.required && <Code colorScheme="red">required</Code>}
              </HStack>
            </chakra.h3>
          </chakra.div>
          <div>
            {prop.description && (
              <Flex>
                <div className="row">Description</div>
                <div className="cell">
                  <p>{convertBackticksToInlineCode(prop.description)}</p>
                </div>
              </Flex>
            )}
            <Flex>
              <div className="row">Type</div>
              <div className="cell">
                <MDXComponents.inlineCode whiteSpace="wrap" fontSize="0.8em">
                  {prop.type}
                </MDXComponents.inlineCode>
              </div>
            </Flex>
            {prop.defaultValue && (
              <Flex>
                <div className="row">Default</div>
                <div className="cell">
                  <MDXComponents.inlineCode whiteSpace="wrap" fontSize="0.8em">
                    {prop.defaultValue}
                  </MDXComponents.inlineCode>
                </div>
              </Flex>
            )}
          </div>
        </chakra.div>
      ))}
    </Stack>
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

  if (!props) return []

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
