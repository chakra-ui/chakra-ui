import * as React from "react"
// @ts-ignore
import ComponentProps from "@chakra-ui/props-docs"
import MDXComponents from "./mdx-components"
import { useMemo } from "react"

export type PropsTableProps = { of: string }
const PropsTable = ({ of }: PropsTableProps) => {
  const info: { props: Record<string, any> } = ComponentProps[of]
  if (!info || !info.props) {
    return null
  }

  const entries = useMemo(
    () =>
      Object.entries(info.props).sort(([a], [b]) => String(a).localeCompare(b)),
    [info.props],
  )

  return (
    <MDXComponents.table>
      <thead>
        <tr>
          <MDXComponents.th>Name</MDXComponents.th>
          <MDXComponents.th>Type</MDXComponents.th>
          <MDXComponents.th>Default</MDXComponents.th>
          <MDXComponents.th>Description</MDXComponents.th>
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
            <MDXComponents.td>
              <MDXComponents.inlineCode
                whiteSpace="wrap"
                d="inline-block"
                lineHeight="tall"
              >
                {values.type?.default ?? ""}
              </MDXComponents.inlineCode>
            </MDXComponents.td>
            <MDXComponents.td>{values.description}</MDXComponents.td>
          </tr>
        ))}
      </tbody>
    </MDXComponents.table>
  )
}

export default PropsTable
