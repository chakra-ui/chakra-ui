export const dynamic = "force-static"

export const GET = async () => {
  const baseUrl =
    process.env.VERCEL_URL ?? process.env.HOST ?? "http://localhost:3000"

  const documentSets = [
    {
      title: "Complete documentation",
      href: `${baseUrl}/llms-full.txt`,
      description:
        "The complete Chakra UI v3 documentation including all components, styling, theming and cli",
    },
  ]

  const content = TEMPLATE.replace(
    "%DOCUMENT_SETS%",
    documentSets
      .map((set) => `- [${set.title}](${set.href}): ${set.description}`)
      .join("\n"),
  )

  return new Response(content)
}

const TEMPLATE = `
# Chakra UI v3 Documentation for LLMs

> Chakra UI is an accessible component system for building products with speed

## Documentation Sets

%DOCUMENT_SETS%

## Notes

- The complete documentation includes all content from the official documentation
- Package-specific documentation files contain only the content relevant to that package
- The content is automatically generated from the same source as the official documentation
`
