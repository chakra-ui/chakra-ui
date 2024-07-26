const docsLinks: NavItem = {
  title: "Docs",
  url: "docs",
  items: [
    {
      title: "Get Started",
      url: "get-started",
      items: [
        {
          title: "Overview",
          url: "overview",
          items: [
            { title: "Installation", url: "installation" },
            { title: "Changelog", url: "changelog" },
            { title: "Migration", url: "migration" },
            { title: "CLI", url: "cli", status: "new" },
            { title: "Contributing", url: "contributing" },
          ],
        },
        {
          title: "Frameworks",
          url: "frameworks",
          items: [
            { title: "Vite", url: "vite" },
            { title: "Next.js", url: "nextjs" },
            { title: "Gatsby", url: "gatsby" },
            { title: "Blitz.js", url: "blitzjs" },
            { title: "Redwood.js", url: "redwoodjs" },
          ],
        },
      ],
    },

    {
      title: "Theming",
      url: "theming",
      items: [
        {
          title: "Design Tokens",
          url: "design-tokens",
          items: [
            { title: "Colors", url: "colors" },
            { title: "Typography", url: "typography" },
            { title: "Shadows", url: "shadows" },
            { title: "Spacing", url: "spacing" },
            { title: "Sizes", url: "sizes" },
          ],
        },
        {
          title: "Recipes",
          url: "recipes",
          items: [
            { title: "Overview", url: "overview" },
            { title: "Recipe", url: "recipe" },
            { title: "Slot Recipes", url: "slot-recipes" },
          ],
        },
        { title: "Customization", url: "customization" },
      ],
    },

    {
      title: "Styled System",
      url: "styled-system",
      items: [
        { title: "Style Props", url: "style-props" },
        { title: "Responsive Design", url: "responsive-design" },
        { title: "Chakra Factory", url: "chakra-factory" },
        { title: "CSS Variables", url: "css-variables" },
        { title: "Text Styles", url: "text-styles" },
        { title: "Layer Styles", url: "layer-styles" },
        { title: "Color Mode", url: "color-mode" },
      ],
    },

    {
      title: "Components",
      url: "components",
      items: [
        {
          title: "Overview",
          url: "overview",
          items: [
            { title: "Animation", url: "animation" },
            { title: "Composition", url: "composition" },
            { title: "Polymorphism", url: "polymorphism" },
            { title: "Component State", url: "component-state" },
          ],
        },
        {
          title: "Components",
          url: "components",
          items: [
            { title: "Accordion", url: "accordion" },
            { title: "Action Bar", url: "action-bar" },
            { title: "Alert", url: "alert" },
            { title: "Aspect Ratio", url: "aspect-ratio" },
            { title: "Avatar", url: "avatar" },
            { title: "Badge", url: "badge" },
            { title: "Bleed", url: "bleed" },
            { title: "Blockquote", url: "blockquote" },
            { title: "Box", url: "box" },
            { title: "Breadcrumb", url: "breadcrumb" },
            { title: "Button", url: "button" },
            { title: "Card", url: "card" },
            { title: "Center", url: "center" },
            { title: "Checkbox Card", url: "checkbox-card" },
            { title: "Checkbox", url: "checkbox" },
            { title: "ClientOnly", url: "client-only", status: "new" },
            {
              title: "ClipboardButton",
              url: "clipboard-button",
              status: "new",
            },
            { title: "CloseButton", url: "close-button" },
            { title: "Code", url: "code" },
            { title: "Collapsible", url: "collapsible" },
            { title: "Container", url: "container" },
            { title: "Data List", url: "data-list", status: "new" },
            { title: "Divider", url: "divider" },
            { title: "Drawer", url: "drawer" },
            { title: "Editable", url: "editable" },
            { title: "Flex", url: "flex" },
            { title: "Float", url: "float" },
            { title: "For", url: "for" },
            { title: "Grid", url: "grid" },
            { title: "Group", url: "group" },
            { title: "Heading", url: "heading" },
            { title: "Hover Card", url: "hover-card" },
            { title: "Icon", url: "icon" },
            { title: "Image", url: "image" },
            { title: "Kbd", url: "kbd" },
            { title: "Link", url: "link" },
            { title: "Menu", url: "menu" },
            { title: "Native Select", url: "native-select" },
            { title: "Number Input", url: "number-input" },
            { title: "Pagination", url: "pagination" },
            { title: "Pin Input", url: "pin-input" },
            { title: "Popover", url: "popover" },
            { title: "Portal", url: "portal" },
            { title: "Progress Circle", url: "progress-circle" },
            { title: "Progress", url: "progress" },
            { title: "Radio Card", url: "radio-card" },
            { title: "Radio", url: "radio" },
            { title: "Rating Group", url: "rating-group" },
            { title: "Select", url: "select" },
            { title: "Show", url: "show" },
            { title: "Spinner", url: "spinner" },
            { title: "Stack", url: "stack" },
            { title: "Stat", url: "stat" },
            { title: "Status", url: "status" },
            { title: "Steps", url: "steps" },
            { title: "Switch", url: "switch" },
            { title: "Table", url: "table" },
            { title: "Tag", url: "tag" },
            { title: "Textarea", url: "textarea" },
            { title: "Timeline", url: "timeline", status: "new" },
            { title: "Tooltip", url: "tooltip" },
            { title: "Visually Hidden", url: "visually-hidden" },
            { title: "Wrap", url: "wrap" },
          ],
        },
      ],
    },
  ],
}

export const docsConfig: DocsConfig = {
  copyright: "Copyright © {{date}} Segun Adebayo. All Rights Reserved.",
  title: "Chakra UI",
  titleTemplate: "%s | Chakra UI",
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
    { title: "Examples", url: "examples" },
    { title: "Figma", url: "figma" },
    { title: "Showcase", url: "showcase" },
  ],
}

interface DocsConfig {
  title: string
  titleTemplate: string
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
  title: string
  url?: string
  status?: string
  items?: NavItem[]
}

export interface FlattenNavItem extends Omit<NavItem, "items"> {}
