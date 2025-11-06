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
            { title: "Figma", url: "figma" },
            { title: "Contributing", url: "contributing" },
            { title: "Playground", url: "/playground", external: true },
            {
              title: "Changelog",
              url: "https://github.com/chakra-ui/chakra-ui/blob/main/.changelog/v3.mdx",
              external: true,
            },
          ],
        },
        {
          title: "AI for Agents",
          url: "ai",
          items: [
            { title: "MCP Server", url: "mcp-server" },
            { title: "LLMs.txt", url: "llms" },
            { title: "AI Rules", url: "rules" },
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
            { title: "Center (Absolute)", url: "absolute-center" },
            { title: "Center", url: "center" },
            { title: "Container", url: "container" },
            { title: "Flex", url: "flex" },
            { title: "Float", url: "float" },
            { title: "Grid", url: "grid" },
            { title: "Group", url: "group" },
            { title: "Scroll Area", url: "scroll-area" },
            { title: "Separator", url: "separator" },
            { title: "SimpleGrid", url: "simple-grid" },
            { title: "Stack", url: "stack" },
            { title: "Wrap", url: "wrap" },
          ],
        },
        {
          title: "Typography",
          items: [
            { title: "Blockquote", url: "blockquote" },
            { title: "Code", url: "code" },
            { title: "Code Block", url: "code-block", status: "beta" },
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
          title: "Buttons",
          items: [
            { title: "Button", url: "button" },
            { title: "Close Button", url: "close-button" },
            { title: "Icon Button", url: "icon-button" },
            {
              title: "Download Trigger",
              url: "download-trigger",
            },
          ],
        },
        {
          title: "Forms",
          items: [
            { title: "Checkbox", url: "checkbox" },
            { title: "Checkbox Card", url: "checkbox-card" },
            { title: "Color Picker", url: "color-picker" },
            { title: "Color Swatch", url: "color-swatch" },
            { title: "Editable", url: "editable" },
            { title: "Field", url: "field" },
            { title: "Fieldset", url: "fieldset" },
            { title: "File Upload", url: "file-upload" },
            { title: "Input", url: "input" },
            { title: "Number Input", url: "number-input" },
            { title: "Password Input", url: "password-input" },
            { title: "Pin Input", url: "pin-input" },
            { title: "Radio Card", url: "radio-card" },
            { title: "Radio", url: "radio" },
            { title: "Rating", url: "rating" },
            { title: "Segmented Control", url: "segmented-control" },
            { title: "Select (Native)", url: "native-select" },
            { title: "Switch", url: "switch" },
            { title: "Slider", url: "slider" },
            { title: "Textarea", url: "textarea" },
            { title: "Tags Input", url: "tags-input" },
          ],
        },
        {
          title: "Collections",
          items: [
            { title: "Combobox", url: "combobox" },
            { title: "Listbox", url: "listbox" },
            { title: "Select", url: "select" },
            { title: "Tree View", url: "tree-view", status: "beta" },
          ],
        },
        {
          title: "Overlays",
          items: [
            { title: "Action Bar", url: "action-bar" },
            { title: "Dialog", url: "dialog" },
            { title: "Drawer", url: "drawer" },
            { title: "Hover Card", url: "hover-card" },
            { title: "Menu", url: "menu" },
            { title: "Overlay Manager", url: "overlay-manager" },
            { title: "Popover", url: "popover" },
            { title: "Toggle Tip", url: "toggle-tip" },
            { title: "Tooltip", url: "tooltip" },
          ],
        },
        {
          title: "Disclosure",
          items: [
            { title: "Accordion", url: "accordion" },
            { title: "Breadcrumb", url: "breadcrumb" },
            { title: "Carousel", url: "carousel", status: "new" },
            { title: "Collapsible", url: "collapsible" },
            { title: "Pagination", url: "pagination" },
            { title: "Steps", url: "steps" },
            { title: "Tabs", url: "tabs" },
          ],
        },
        {
          title: "Feedback",
          items: [
            { title: "Alert", url: "alert" },
            { title: "Empty State", url: "empty-state" },
            { title: "Progress Circle", url: "progress-circle" },
            { title: "Progress", url: "progress" },
            { title: "Skeleton", url: "skeleton" },
            { title: "Spinner", url: "spinner" },
            { title: "Status", url: "status" },
            { title: "Toast", url: "toast" },
          ],
        },
        {
          title: "Data Display",
          items: [
            { title: "Avatar", url: "avatar" },
            { title: "Badge", url: "badge" },
            { title: "Card", url: "card" },
            { title: "Clipboard", url: "clipboard" },
            { title: "Image", url: "image" },
            { title: "Data List", url: "data-list" },
            { title: "Icon", url: "icon" },
            { title: "QR Code", url: "qr-code" },
            { title: "Stat", url: "stat" },
            { title: "Table", url: "table" },
            { title: "Tag", url: "tag" },
            { title: "Timeline", url: "timeline" },
          ],
        },
        {
          title: "Internationalization",
          items: [
            { title: "LocaleProvider", url: "locale-provider" },
            { title: "FormatNumber", url: "format-number" },
            { title: "FormatByte", url: "format-byte" },
          ],
        },
        {
          title: "Utilities",
          items: [
            { title: "Checkmark", url: "checkmark" },
            { title: "ClientOnly", url: "client-only" },
            { title: "EnvironmentProvider", url: "environment-provider" },
            { title: "For", url: "for" },
            { title: "Presence", url: "presence" },
            { title: "Portal", url: "portal" },
            { title: "Radiomark", url: "radiomark" },
            { title: "Show", url: "show" },
            { title: "Skip Nav", url: "skip-nav" },
            { title: "Visually Hidden", url: "visually-hidden" },
            { title: "Theme", url: "theme" },
          ],
        },
      ],
    },

    {
      title: "Charts",
      url: "charts",
      items: [
        {
          title: "Overview",
          items: [
            { title: "Installation", url: "installation" },
            { title: "useChart", url: "use-chart" },
            { title: "Axis (X and Y)", url: "axes" },
            { title: "Cartesian Grid", url: "cartesian-grid" },
          ],
        },
        {
          title: "Charts",
          items: [
            { title: "Area Chart", url: "area-chart" },
            { title: "Bar Chart", url: "bar-chart" },
            { title: "Bar List", url: "bar-list" },
            { title: "Bar Segment", url: "bar-segment" },
            { title: "Donut Chart", url: "donut-chart" },
            { title: "Line Chart", url: "line-chart" },
            { title: "Pie Chart", url: "pie-chart" },
            { title: "Radar Chart", url: "radar-chart" },
            { title: "Scatter Chart", url: "scatter-chart" },
            { title: "Sparkline", url: "sparkline" },
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
            { title: "Utilities", url: "utilities" },
          ],
        },
      ],
    },
  ],
}

export const NAV_LINKS = [
  { title: "Docs", url: "/docs/get-started/installation" },
  { title: "Showcase", url: "/showcase" },
  { title: "Blog", url: "/blog" },
  { title: "Guides", url: "/guides" },
]

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
    { title: "Showcase", url: "showcase" },
    { title: "Blog", url: "blog" },
    { title: "Guides", url: "guides" },
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
