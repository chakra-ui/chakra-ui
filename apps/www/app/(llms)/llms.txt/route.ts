import { getBaseUrl } from "../shared"

export const dynamic = "force-static"

export const GET = async () => {
  const baseUrl = getBaseUrl()

  const documentSets = [
    {
      title: "Complete documentation",
      href: `${baseUrl}/llms-full.txt`,
      description:
        "The complete Chakra UI v3 documentation including all components, styling and theming",
    },
    {
      title: "Components",
      href: `${baseUrl}/llms-components.txt`,
      description: "Documentation for all components in Chakra UI v3.",
    },
    {
      title: "Charts",
      href: `${baseUrl}/llms-charts.txt`,
      description: "Documentation for the charts in Chakra UI v3.",
    },
    {
      title: "Styling",
      href: `${baseUrl}/llms-styling.txt`,
      description: "Documentation for the styling system in Chakra UI v3.",
    },
    {
      title: "Theming",
      href: `${baseUrl}/llms-theming.txt`,
      description: "Documentation for theming Chakra UI v3.",
    },
    {
      title: "Migrating to v3",
      href: `${baseUrl}/llms-v3-migration.txt`,
      description: "Documentation for migrating to Chakra UI v3.",
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
