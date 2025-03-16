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
          items: [
            { title: "Installation", url: "installation" },
            { title: "Migration", url: "migration" },
            { title: "CLI", url: "cli" },
            { title: "Contributing", url: "contributing" },
            { title: "Showcase", url: "/showcase", external: true },
          ],
        },
        {
          title: "Frameworks",
          url: "frameworks",
          items: [
            { title: "Next.js (App)", url: "next-app" },
            { title: "Next.js (Pages)", url: "next-pages" },
            { title: "Remix", url: "remix" },
            { title: "Storybook", url: "storybook" },
            { title: "Vite", url: "vite" },
          ],
        },
        {
          title: "Environments",
          url: "environments",
          items: [
            { title: "Shadow DOM", url: "shadow-dom" },
            { title: "Iframe", url: "iframe" },
          ],
        },
      ],
    },

    {
      title: "Components",
      url: "components",
      items: [
        {
          title: "Concepts",
          url: "concepts",
          items: [
            { title: "Overview", url: "overview" },
            { title: "Composition", url: "composition" },
            { title: "Animation", url: "animation" },
            { title: "Color Mode", url: "color-mode" },
            { title: "Server Component", url: "server-components" },
            { title: "Testing", url: "testing" },
          ],
        },
        {
          title: "Layout",
          items: [
            { title: "Aspect Ratio", url: "aspect-ratio" },
            { title: "Bleed", url: "bleed" },
            { title: "Box", url: "box" },
            { title: "Center", url: "center" },
            { title: "Container", url: "container" },
            { title: "Flex", url: "flex" },
            { title: "Float", url: "float" },
            { title: "Grid", url: "grid" },
            { title: "Group", url: "group" },
            { title: "SimpleGrid", url: "simple-grid" },
            { title: "Stack", url: "stack" },
            { title: "Theme", url: "theme" },
            { title: "Wrap", url: "wrap" },
          ],
        },
        {
          title: "Typography",
          items: [
            { title: "Blockquote", url: "blockquote" },
            { title: "Code", url: "code" },
            { title: "Em", url: "em" },
            { title: "Heading", url: "heading" },
            { title: "Highlight", url: "highlight" },
            { title: "Kbd", url: "kbd" },
            { title: "Link", url: "link" },
            { title: "Link Overlay", url: "link-overlay" },
            { title: "List", url: "list" },
            { title: "Mark", url: "mark" },
            { title: "Prose", url: "prose" },
            { title: "Text", url: "text" },
          ],
        },
        {
          title: "Components",
          items: [
            { title: "Accordion", url: "accordion" },
            { title: "Action Bar", url: "action-bar" },
            { title: "Alert", url: "alert" },
            { title: "Avatar", url: "avatar" },
            { title: "Badge", url: "badge" },
            { title: "Breadcrumb", url: "breadcrumb" },
            { title: "Button", url: "button" },
            { title: "Card", url: "card" },
            { title: "Checkbox Card", url: "checkbox-card" },
            { title: "Checkbox", url: "checkbox" },
            { title: "Clipboard", url: "clipboard" },
            { title: "Close Button", url: "close-button" },
            { title: "Collapsible", url: "collapsible" },
            { title: "Color Picker", url: "color-picker" },
            { title: "Color Swatch", url: "color-swatch" },
            { title: "Data List", url: "data-list" },
            { title: "Dialog", url: "dialog" },
            { title: "Drawer", url: "drawer" },
            { title: "Editable", url: "editable" },
            { title: "Empty State", url: "empty-state" },
            { title: "Field", url: "field" },
            { title: "Fieldset", url: "fieldset" },
            { title: "File Upload", url: "file-upload" },
            { title: "Hover Card", url: "hover-card" },
            { title: "Icon", url: "icon" },
            { title: "Icon Button", url: "icon-button" },
            { title: "Image", url: "image" },
            { title: "Input", url: "input" },
            { title: "Menu", url: "menu" },
            { title: "Number Input", url: "number-input" },
            { title: "Pagination", url: "pagination" },
            { title: "Password Input", url: "password-input" },
            { title: "Pin Input", url: "pin-input" },
            { title: "Popover", url: "popover" },
            { title: "Progress Circle", url: "progress-circle" },
            { title: "Progress", url: "progress" },
            { title: "QR Code", url: "qr-code" },
            { title: "Radio Card", url: "radio-card" },
            { title: "Radio", url: "radio" },
            { title: "Rating", url: "rating" },
            { title: "Segmented Control", url: "segmented-control" },
            { title: "Select (Native)", url: "native-select" },
            { title: "Select", url: "select" },
            { title: "Separator", url: "separator" },
            { title: "Skeleton", url: "skeleton" },
            { title: "Slider", url: "slider" },
            { title: "Spinner", url: "spinner" },
            { title: "Stat", url: "stat" },
            { title: "Status", url: "status" },
            { title: "Steps", url: "steps" },
            { title: "Switch", url: "switch" },
            { title: "Tabs", url: "tabs" },
            { title: "Table", url: "table" },
            { title: "Tag", url: "tag" },
            { title: "Textarea", url: "textarea" },
            { title: "Timeline", url: "timeline" },
            { title: "Toast", url: "toast" },
            { title: "Toggle Tip", url: "toggle-tip" },
            { title: "Tooltip", url: "tooltip" },
          ],
        },
        {
          title: "Utilities",
          items: [
            { title: "ClientOnly", url: "client-only" },
            { title: "EnvironmentProvider", url: "environment-provider" },
            { title: "For", url: "for" },
            { title: "FormatNumber", url: "format-number" },
            { title: "FormatByte", url: "format-byte" },
            { title: "LocaleProvider", url: "locale-provider" },
            { title: "Presence", url: "presence" },
            { title: "Portal", url: "portal" },
            { title: "Show", url: "show" },
            { title: "Visually Hidden", url: "visually-hidden" },
          ],
        },
      ],
    },

    {
      title: "Styling",
      url: "styling",
      items: [
        {
          title: "Concepts",
          items: [
            { title: "Overview", url: "overview" },
            { title: "Chakra Factory", url: "chakra-factory" },
            { title: "Responsive Design", url: "responsive-design" },
            { title: "CSS Variables", url: "css-variables" },
            { title: "Dark Mode", url: "dark-mode" },
            { title: "Color Opacity Modifier", url: "color-opacity-modifier" },
            { title: "Conditional Styles", url: "conditional-styles" },
            { title: "Virtual Color", url: "virtual-color" },
            { title: "Cascade Layers", url: "cascade-layers" },
          ],
        },
        {
          title: "Compositions",
          items: [
            { title: "Text Styles", url: "text-styles" },
            { title: "Layer Styles", url: "layer-styles" },
            { title: "Animation Styles", url: "animation-styles" },
            { title: "Focus Ring", url: "focus-ring" },
          ],
        },
        {
          title: "Style Props",
          url: "style-props",
          items: [
            { title: "Background", url: "background" },
            { title: "Border", url: "border" },
            { title: "Display", url: "display" },
            { title: "Effects", url: "effects" },
            { title: "Filters", url: "filters" },
            { title: "Flex and Grid", url: "flex-and-grid" },
            { title: "Interactivity", url: "interactivity" },
            { title: "Layout", url: "layout" },
            { title: "List", url: "list" },
            { title: "Sizing", url: "sizing" },
            { title: "Spacing", url: "spacing" },
            { title: "SVG", url: "svg" },
            { title: "Tables", url: "tables" },
            { title: "Transforms", url: "transforms" },
            { title: "Transitions", url: "transitions" },
            { title: "Typography", url: "typography" },
          ],
        },
      ],
    },

    {
      title: "Theming",
      url: "theming",
      items: [
        {
          title: "Concepts",
          items: [
            { title: "Overview", url: "overview" },
            { title: "Tokens", url: "tokens" },
            { title: "Semantic Tokens", url: "semantic-tokens" },
            { title: "Recipes", url: "recipes" },
            { title: "Slot Recipes", url: "slot-recipes" },
          ],
        },
        {
          title: "Design Tokens",
          items: [
            { title: "Animations", url: "animations" },
            { title: "Aspect Ratios", url: "aspect-ratios" },
            { title: "Breakpoints", url: "breakpoints" },
            { title: "Colors", url: "colors" },
            { title: "Cursors", url: "cursors" },
            { title: "Radii", url: "radii" },
            { title: "Shadows", url: "shadows" },
            { title: "Sizes", url: "sizes" },
            { title: "Spacing", url: "spacing" },
            { title: "Typography", url: "typography" },
            { title: "Z-Index", url: "z-index" },
          ],
        },
        {
          title: "Compositions",
          items: [
            { title: "Text Styles", url: "text-styles" },
            { title: "Layer Styles", url: "layer-styles" },
          ],
        },
        {
          title: "Customization",
          url: "customization",
          items: [
            { title: "Overview", url: "overview" },
            { title: "Animations", url: "animations" },
            { title: "Breakpoints", url: "breakpoints" },
            { title: "Colors", url: "colors" },
            { title: "Conditions", url: "conditions" },
            { title: "CSS Variables", url: "css-variables" },
            { title: "Global CSS", url: "global-css" },
            { title: "Recipes", url: "recipes" },
            { title: "Sizes", url: "sizes" },
            { title: "Spacing", url: "spacing" },
          ],
        },
      ],
    },
  ],
}

export const docsConfig: DocsConfig = {
  storybookUrl: "https://storybook.chakra-ui.com",
  copyright: "Copyright © {{date}} Segun Adebayo. All Rights Reserved.",
  title: "Chakra UI",
  titleTemplate: "%s | Chakra UI",
  description:
    "Simple, Modular & Accessible UI Components for your React Applications",
  url: "https://chakra-ui.com",
  xHandle: "@chakra-ui",
  repoUrl: "https://github.com/chakra-ui/chakra-ui",
  repoBranch: "main",
  get editUrl() {
    return `${this.repoUrl}/tree/${this.repoBranch}/apps/www/content`
  },
  donationUrl: "https://opencollective.com/chakra-ui",
  navigation: [
    docsLinks,
    { title: "Playground", url: "playground" },
    { title: "Guides", url: "guides" },
    { title: "Blog", url: "blog" },
  ],
  proUrl: "https://pro.chakra-ui.com?utm_source=chakra-ui.com",
}

interface DocsConfig {
  title: string
  titleTemplate: string
  description: string
  storybookUrl: string
  copyright: string
  url: string
  repoUrl: string
  editUrl: string
  xHandle: string
  donationUrl: string
  navigation: NavItem[]
  repoBranch: string
  proUrl: string
}

export interface NavItem {
  title: string
  url?: string
  external?: boolean
  status?: string
  items?: NavItem[]
}

export interface FlattenNavItem extends Omit<NavItem, "items"> {}
