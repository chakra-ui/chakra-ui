const docsLinks: NavItem = {
  label: "Docs",
  href: "docs",
  items: [
    {
      label: "Get Started",
      href: "get-started",
      items: [
        {
          label: "Overview",
          href: "overview",
          items: [
            { label: "Installation", href: "installation" },
            { label: "Changelog", href: "changelog" },
            { label: "Upgrading", href: "upgrading-to-v3" },
            { label: "CLI", href: "cli", status: "new" },
            { label: "Contributing", href: "contributing" },
          ],
        },
        {
          label: "Frameworks",
          href: "frameworks",
          items: [
            { label: "Vite", href: "vite" },
            { label: "Next.js", href: "nextjs" },
            { label: "Gatsby", href: "gatsby" },
            { label: "Blitz.js", href: "blitzjs" },
            { label: "Redwood.js", href: "redwoodjs" },
          ],
        },
      ],
    },

    {
      label: "Theming",
      href: "theming",
      items: [
        {
          label: "Design Tokens",
          href: "design-tokens",
          items: [
            { label: "Colors", href: "colors" },
            { label: "Typography", href: "typography" },
            { label: "Shadows", href: "shadows" },
            { label: "Spacing", href: "spacing" },
            { label: "Sizes", href: "sizes" },
          ],
        },
        {
          label: "Recipes",
          href: "recipes",
          items: [
            { label: "Overview", href: "overview" },
            { label: "Recipe", href: "recipe" },
            { label: "Slot Recipes", href: "slot-recipes" },
          ],
        },
        { label: "Customization", href: "customization" },
      ],
    },

    {
      label: "Styled System",
      href: "styled-system",
      items: [
        { label: "Style Props", href: "style-props" },
        { label: "Responsive Design", href: "responsive-design" },
        { label: "Chakra Factory", href: "chakra-factory" },
        { label: "CSS Variables", href: "css-variables" },
        { label: "Text Styles", href: "text-styles" },
        { label: "Layer Styles", href: "layer-styles" },
        { label: "Color Mode", href: "color-mode" },
      ],
    },

    {
      label: "Components",
      href: "components",
      items: [
        {
          label: "Overview",
          href: "overview",
          items: [
            { label: "Animation", href: "animation" },
            { label: "Composition", href: "composition" },
            { label: "Polymorphism", href: "polymorphism" },
            { label: "Component State", href: "component-state" },
          ],
        },
        {
          label: "Components",
          href: "components",
          items: [
            { label: "Accordion", href: "accordion" },
            { label: "Action Bar", href: "action-bar" },
            { label: "Alert", href: "alert" },
            { label: "Aspect Ratio", href: "aspect-ratio" },
            { label: "Avatar", href: "avatar" },
            { label: "Badge", href: "badge" },
            { label: "Bleed", href: "bleed" },
            { label: "Blockquote", href: "blockquote" },
            { label: "Box", href: "box" },
            { label: "Breadcrumb", href: "breadcrumb" },
            { label: "Button", href: "button" },
            { label: "Card", href: "card" },
            { label: "Center", href: "center" },
            { label: "Checkbox Card", href: "checkbox-card" },
            { label: "Checkbox", href: "checkbox" },
            { label: "ClientOnly", href: "client-only", status: "new" },
            {
              label: "ClipboardButton",
              href: "clipboard-button",
              status: "new",
            },
            { label: "CloseButton", href: "close-button" },
            { label: "Code", href: "code" },
            { label: "Collapsible", href: "collapsible" },
            { label: "Container", href: "container" },
            { label: "Data List", href: "data-list", status: "new" },
            { label: "Divider", href: "divider" },
            { label: "Drawer", href: "drawer" },
            { label: "Editable", href: "editable" },
            { label: "Flex", href: "flex" },
            { label: "Float", href: "float" },
            { label: "For", href: "for" },
            { label: "Grid", href: "grid" },
            { label: "Group", href: "group" },
            { label: "Heading", href: "heading" },
            { label: "Hover Card", href: "hover-card" },
            { label: "Icon", href: "icon" },
            { label: "Image", href: "image" },
            { label: "Kbd", href: "kbd" },
            { label: "Link", href: "link" },
            { label: "Menu", href: "menu" },
            { label: "Native Select", href: "native-select" },
            { label: "Number Input", href: "number-input" },
            { label: "Pagination", href: "pagination" },
            { label: "Pin Input", href: "pin-input" },
            { label: "Popover", href: "popover" },
            { label: "Portal", href: "portal" },
            { label: "Progress Circle", href: "progress-circle" },
            { label: "Progress", href: "progress" },
            { label: "Radio Card", href: "radio-card" },
            { label: "Radio", href: "radio" },
            { label: "Rating Group", href: "rating-group" },
            { label: "Select", href: "select" },
            { label: "Show", href: "show" },
            { label: "Spinner", href: "spinner" },
            { label: "Stack", href: "stack" },
            { label: "Stat", href: "stat" },
            { label: "Status", href: "status" },
            { label: "Steps", href: "steps" },
            { label: "Switch", href: "switch" },
            { label: "Table", href: "table" },
            { label: "Tag", href: "tag" },
            { label: "Textarea", href: "textarea" },
            { label: "Timeline", href: "timeline", status: "new" },
            { label: "Tooltip", href: "tooltip" },
            { label: "Visually Hidden", href: "visually-hidden" },
            { label: "Wrap", href: "wrap" },
          ],
        },
      ],
    },
  ],
}

export const docsConfig: DocsConfig = {
  copyright: "Copyright © {{date}} Segun Adebayo. All Rights Reserved.",
  title: "Chakra UI",
  description:
    "Simple, Modular & Accessible UI Components for your React Applications",
  url: "https://chakra-ui.com",
  xHandle: "@chakra-ui",
  ogImage: "https://chakra-ui.com/og-image.png",
  repoUrl: "https://github.com/chakra-ui/chakra-ui",
  editUrl: "https://github.com/chakra-ui/chakra-ui/tree/main/apps/www/content",
  donationUrl: "https://opencollective.com/chakra-ui",
  navigation: [
    docsLinks,
    { label: "Examples", href: "examples" },
    { label: "Figma", href: "figma" },
    { label: "Showcase", href: "showcase" },
  ],
}

interface DocsConfig {
  title: string
  description: string
  copyright: string
  url: string
  repoUrl: string
  editUrl: string
  ogImage: string
  xHandle: string
  donationUrl: string
  navigation: NavItem[]
}

export interface NavItem {
  label: string
  href?: string
  status?: string
  items?: NavItem[]
}

export interface FlattenNavItem extends Omit<NavItem, "items"> {}
