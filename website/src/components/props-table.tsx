import * as React from "react"
import * as ComponentProps from "@chakra-ui/props-docs"
import MDXComponents from "./mdx-components"

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
  omit = ["isTruncated", "layerStyle", "noOfLines", "textStyle"],
  only,
}: PropsTableProps) => {
  const info: { props: Record<string, any> } = ComponentProps[of]
  if (!info || !info.props) {
    return null
  }

  const entries = React.useMemo(
    () =>
      Object.entries(info.props)
        .filter(([propName]) => {
          if (Array.isArray(only)) {
            return only.includes(propName)
          }
          if (Array.isArray(omit)) {
            return !omit.includes(propName)
          }
          return true
        })
        .sort(([a, aDef], [b, bDef]) => {
          const aRequired = aDef.required ? 1000 : 0
          const bRequired = bDef.required ? 1000 : 0
          const requiredOffset = aRequired - bRequired
          return String(a).localeCompare(b) - requiredOffset
        }),
    [info.props, omit, only],
  )

  if (!entries.length) {
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
          <MDXComponents.th>Required</MDXComponents.th>
        </tr>
      </thead>
      <tbody>
        {entries.map(([propName, values]) => (
          <tr key={propName}>
            <MDXComponents.td>{propName}</MDXComponents.td>
            <MDXComponents.td>
              <MDXComponents.inlineCode
                whiteSpace="wrap"
                d="inline-block"
                lineHeight="tall"
              >
                {values.type?.name}
              </MDXComponents.inlineCode>
            </MDXComponents.td>
            <MDXComponents.td>{values.description}</MDXComponents.td>
            <MDXComponents.td>
              {values.defaultValue?.value ? (
                <MDXComponents.inlineCode
                  whiteSpace="wrap"
                  d="inline-block"
                  lineHeight="tall"
                >
                  {values.defaultValue.value}
                </MDXComponents.inlineCode>
              ) : (
                "-"
              )}
            </MDXComponents.td>
            <MDXComponents.td>
              {values.required ? "required" : "-"}
            </MDXComponents.td>
          </tr>
        ))}
      </tbody>
    </MDXComponents.table>
  )
}

export default PropsTable
