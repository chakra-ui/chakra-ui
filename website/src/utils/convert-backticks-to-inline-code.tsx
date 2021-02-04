import MDXComponents from "components/mdx-components"

/**
 * Replace the code blocks wrapped in backticks
 * with inline code blocks.
 */
export function convertBackticksToInlineCode(input: string) {
  return input
    .split(/(`\w+`)/)
    .map((chunk) =>
      chunk.startsWith("`") && chunk.endsWith("`") ? (
        <MDXComponents.inlineCode key={chunk}>
          {chunk.slice(1, -1)}
        </MDXComponents.inlineCode>
      ) : (
        chunk
      ),
    )
}
