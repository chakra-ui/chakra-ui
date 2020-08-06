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
          title: "Upgrade to v1",
          path: "/docs/migration",
        },
        {
          title: "Design Principles",
          path: "/docs/principles",
        },
        {
          title: "Comparison",
          path: "/docs/comparison",
        },
        {
          title: "Features",
          path: "/docs/features",
          open: true,
          routes: [
            {
              title: "Style Props",
              path: "/docs/features/style-props",
            },
            {
              title: "Color Mode",
              path: "/docs/features/color-mode",
            },
            {
              title: "Responsive Styles",
              path: "/docs/features/responsive-styles",
            },
            {
              title: "Global Styles",
              path: "/docs/features/global-styles",
            },
          ],
        },

        {
          title: "Theming",
          path: "/docs/theming",
          open: true,
          routes: [
            {
              title: "Introduction",
              path: "/docs/theming/overview",
            },
            {
              title: "Basic",
              path: "/docs/theming/basic",
            },
            {
              title: "Advanced",
              path: "/docs/theming/advanced",
            },
            {
              title: "Default Theme",
              path: "/docs/theming/theme",
            },
          ],
        },
        {
          title: "Layout",
          path: "/docs/layout",
          open: true,
          routes: [
            {
              title: "Aspect Ratio",
              path: "/docs/layout/aspect-ratio",
            },
            {
              title: "Box",
              path: "/docs/layout/box",
            },
            {
              title: "Center",
              path: "/docs/layout/center",
            },
            {
              title: "Container",
              path: "/docs/layout/container",
            },
            {
              title: "Flex",
              path: "/docs/layout/flex",
            },
            {
              title: "Grid",
              path: "/docs/layout/grid",
            },
            {
              title: "SimpleGrid",
              path: "/docs/layout/simple-grid",
            },
            {
              title: "Stack",
              path: "/docs/layout/stack",
            },
            {
              title: "Wrap",
              path: "/docs/layout/wrap",
            },
          ],
        },
        {
          title: "Form Elements",
          path: "/docs/form",
          open: true,
          routes: [
            {
              title: "Button",
              path: "/docs/form/button",
            },
            {
              title: "Checkbox",
              path: "/docs/form/checkbox",
            },
            {
              title: "Form Control",
              path: "/docs/form/form-control",
            },
            {
              title: "Input",
              path: "/docs/form/input",
            },
            {
              title: "Number Input",
              path: "/docs/form/number-input",
            },
            {
              title: "Pin Input	",
              path: "/docs/form/pin-input",
            },
            {
              title: "Radio",
              path: "/docs/form/radio",
            },
            {
              title: "Select",
              path: "/docs/form/select",
            },
            {
              title: "Slider",
              path: "/docs/form/slider",
            },
            {
              title: "Switch",
              path: "/docs/form/switch",
            },
            {
              title: "Textarea",
              path: "/docs/form/textarea",
            },
          ],
        },
        {
          title: "Hooks",
          path: "/docs/hooks",
          open: true,
          routes: [
            {
              title: "useBreakpointValue",
              path: "/docs/hooks/use-breakpoint-value",
            },
            {
              title: "useClipboard",
              path: "/docs/hooks/use-clipboard",
            },
            {
              title: "useControllable",
              path: "/docs/hooks/use-controllable",
            },
            {
              title: "useDisclosure",
              path: "/docs/hooks/use-disclosure",
            },
            {
              title: "useTheme",
              path: "/docs/hooks/use-theme",
            },
          ],
        },
        {
          title: "Data Display",
          path: "/docs/data-display",
          open: true,
          routes: [
            {
              title: "Avatar",
              path: "/docs/data-display/avatar",
            },
            {
              title: "Badge",
              path: "/docs/data-display/badge",
            },
            {
              title: "Code",
              path: "/docs/data-display/code",
            },
            {
              title: "Divider",
              path: "/docs/data-display/divider",
            },
            {
              title: "Image",
              path: "/docs/data-display/image",
            },
            {
              title: "Kbd",
              path: "/docs/data-display/kbd",
            },
            {
              title: "List",
              path: "/docs/data-display/list",
            },
            {
              title: "Stat",
              path: "/docs/data-display/stat",
            },
            {
              title: "Tag",
              path: "/docs/data-display/tag",
            },
          ],
        },
        {
          title: "Feedback",
          path: "/docs/feedback",
          open: true,
          routes: [
            {
              title: "Alert",
              path: "/docs/feedback/alert",
            },
            {
              title: "Circular Progress",
              path: "/docs/feedback/circular-progress",
            },
            {
              title: "Progress",
              path: "/docs/feedback/progress",
            },
            {
              title: "Skeleton",
              path: "/docs/feedback/skeleton",
            },
            {
              title: "Spinner",
              path: "/docs/feedback/spinner",
            },
            {
              title: "Toast",
              path: "/docs/feedback/toast",
            },
          ],
        },
        {
          title: "Typography",
          path: "/docs/typography",
          open: true,
          routes: [
            {
              title: "Text",
              path: "/docs/typography/text",
            },
            {
              title: "Heading",
              path: "/docs/typography/heading",
            },
          ],
        },
        {
          title: "Overlay Elements",
          path: "/docs/overlay",
          open: true,
          routes: [
            {
              title: "Alert Dialog",
              path: "/docs/overlay/alert-dialog",
            },
            {
              title: "Drawer",
              path: "/docs/overlay/drawer",
            },
            {
              title: "Menu",
              path: "/docs/overlay/menu",
            },
            {
              title: "Modal",
              path: "/docs/overlay/modal",
            },
            {
              title: "Popover",
              path: "/docs/overlay/popover",
            },
            {
              title: "Tooltip",
              path: "/docs/overlay/tooltip",
            },
          ],
        },
      ],
    },
  ],
}

export default sidebar
