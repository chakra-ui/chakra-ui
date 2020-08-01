const sidebar = {
  routes: [
    {
      title: "Documentation",
      heading: true,
      routes: [
        {
          title: "Getting Started",
          path: "/docs/getting-started",
        },
        {
          title: "Basic Features",
          path: "/docs",
          opened: true,
          routes: [
            {
              title: "Design Principles",
              path: "/principles",
            },
            {
              title: "Style Props",
              path: "/style-props",
            },
            {
              title: "Color Mode",
              path: "/color-mode",
            },
            {
              title: "Comparison",
              path: "/comparison",
            },
            {
              title: "Responsive Styles",
              path: "/responsive-styles",
            },
            {
              title: "Global Styles",
              path: "/global-styles",
            },
            {
              title: "Upgrade to v1",
              path: "/migration",
            },
          ],
        },

        {
          title: "Theming",
          path: "/docs/theming",
          opened: true,
          routes: [
            {
              title: "Introduction",
              path: "/introduction",
            },
            {
              title: "Basic",
              path: "/basic",
            },
            {
              title: "Advanced",
              path: "/advanced",
            },
            {
              title: "Default Theme",
              path: "/theme",
            },
          ],
        },
        {
          title: "Layout",
          path: "/docs/layout",
          opened: true,
          routes: [
            {
              title: "Aspect Ratio",
              path: "/aspect-ratio",
            },
            {
              title: "Box",
              path: "/box",
            },
            {
              title: "Center",
              path: "/center",
            },
            {
              title: "Container",
              path: "/container",
            },
            {
              title: "Flex",
              path: "/flex",
            },
            {
              title: "Grid",
              path: "/grid",
            },
            {
              title: "SimpleGrid",
              path: "/simple-grid",
            },
            {
              title: "Stack",
              path: "/stack",
            },
            {
              title: "Wrap",
              path: "/wrap",
            },
          ],
        },
        {
          title: "Form Elements",
          path: "/docs/form",
          opened: true,
          routes: [
            {
              title: "Button",
              path: "/button",
            },
            {
              title: "Checkbox",
              path: "/checkbox",
            },
            {
              title: "Form Control",
              path: "/form-control",
            },
            {
              title: "Input",
              path: "/input",
            },
            {
              title: "Number Input",
              path: "/number-input",
            },
            {
              title: "Pin Input	",
              path: "/pin-input",
            },
            {
              title: "Radio",
              path: "/radio",
            },
            {
              title: "Select",
              path: "/select",
            },
            {
              title: "Slider",
              path: "/slider",
            },
            {
              title: "Switch",
              path: "/switch",
            },
            {
              title: "Textarea",
              path: "/textarea",
            },
          ],
        },
        {
          title: "Hooks",
          path: "/docs/hooks",
          opened: true,
          routes: [
            {
              title: "useBreakpointValue",
              path: "/use-breakpoint-value",
            },
            {
              title: "useClipboard",
              path: "/use-clipboard",
            },
            {
              title: "useControllable",
              path: "/use-controllable",
            },
            {
              title: "useDisclosure",
              path: "/use-disclosure",
            },
            {
              title: "useTheme",
              path: "/use-theme",
            },
          ],
        },
        {
          title: "Data Display",
          path: "/docs/data-display",
          opened: true,
          routes: [
            {
              title: "Avatar",
              path: "/avatar",
            },
            {
              title: "Badge",
              path: "/badge",
            },
            {
              title: "Code",
              path: "/code",
            },
            {
              title: "Divider",
              path: "/divider",
            },
            {
              title: "Image",
              path: "/image",
            },
            {
              title: "Kbd",
              path: "/kbd",
            },
            {
              title: "List",
              path: "/list",
            },
            {
              title: "Stat",
              path: "/stat",
            },
            {
              title: "Tag",
              path: "/tag",
            },
          ],
        },
        {
          title: "Feedback",
          path: "/docs/feedback",
          opened: true,
          routes: [
            {
              title: "Alert",
              path: "/alert",
            },
            {
              title: "Circular Progress",
              path: "/circular-progress",
            },
            {
              title: "Progress",
              path: "/progress",
            },
            {
              title: "Skeleton",
              path: "/skeleton",
            },
            {
              title: "Spinner",
              path: "/spinner",
            },
            {
              title: "Toast",
              path: "/toast",
            },
          ],
        },
        {
          title: "Typography",
          path: "/docs/typography",
          opened: true,
          routes: [
            {
              title: "Text",
              path: "/text",
            },
            {
              title: "Heading",
              path: "/heading",
            },
          ],
        },
        {
          title: "Overlay Elements",
          path: "/docs/overlay",
          opened: true,
          routes: [
            {
              title: "Alert Dialog",
              path: "/alert-dialog",
            },
            {
              title: "Drawer",
              path: "/drawer",
            },
            {
              title: "Menu",
              path: "/menu",
            },
            {
              title: "Modal",
              path: "/modal",
            },
            {
              title: "Popover",
              path: "/popover",
            },
            {
              title: "Tooltip",
              path: "/tooltip",
            },
          ],
        },
      ],
    },
  ],
}

export default sidebar
