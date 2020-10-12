export const docsSidebar = {
  routes: [
    {
      heading: true,
      routes: [
        {
          path: "/docs/getting-started",
          title: "Getting Started",
        },
        {
          path: "/docs/migration",
          title: "Upgrade to v1",
        },
        {
          path: "/docs/principles",
          title: "Design Principles",
        },
        {
          path: "/docs/comparison",
          title: "Comparison",
        },
        {
          open: true,
          path: "/docs/features",
          routes: [
            {
              path: "/docs/features/style-props",
              title: "Style Props",
            },
            {
              path: "/docs/features/color-mode",
              title: "Color Mode",
            },
            {
              path: "/docs/features/responsive-styles",
              title: "Responsive Styles",
            },
            {
              path: "/docs/features/global-styles",
              title: "Global Styles",
            },
            {
              path: "/docs/features/text-and-layer-styles",
              title: "Text & Layer Styles",
            },
          ],
          title: "Features",
        },

        {
          open: true,
          path: "/docs/theming",
          routes: [
            {
              path: "/docs/theming/theme",
              title: "Default Theme",
            },
            {
              path: "/docs/theming/customize-theme",
              title: "Customize",
            },
            {
              path: "/docs/theming/component-style",
              title: "Component Style",
            },
            {
              path: "/docs/theming/advanced",
              title: "Advanced",
            },
          ],
          title: "Theming",
        },
        {
          open: true,
          path: "/docs/layout",
          routes: [
            {
              path: "/docs/layout/aspect-ratio",
              title: "Aspect Ratio",
            },
            {
              path: "/docs/layout/box",
              title: "Box",
            },
            {
              path: "/docs/layout/center",
              title: "Center",
            },
            {
              path: "/docs/layout/container",
              title: "Container",
            },
            {
              path: "/docs/layout/flex",
              title: "Flex",
            },
            {
              path: "/docs/layout/grid",
              title: "Grid",
            },
            {
              path: "/docs/layout/simple-grid",
              title: "SimpleGrid",
            },
            {
              path: "/docs/layout/stack",
              title: "Stack",
            },
            {
              path: "/docs/layout/wrap",
              title: "Wrap",
            },
          ],
          title: "Layout",
        },
        {
          open: true,
          path: "/docs/form",
          routes: [
            {
              path: "/docs/form/button",
              title: "Button",
            },
            {
              path: "/docs/form/checkbox",
              title: "Checkbox",
            },
            {
              path: "/docs/form/editable",
              title: "Editable",
            },
            {
              path: "/docs/form/form-control",
              title: "Form Control",
            },
            {
              path: "/docs/form/icon-button",
              title: "Icon Button",
            },
            {
              path: "/docs/form/input",
              title: "Input",
            },
            {
              path: "/docs/form/number-input",
              title: "Number Input",
            },
            {
              path: "/docs/form/pin-input",
              title: "Pin Input	",
            },
            {
              path: "/docs/form/radio",
              title: "Radio",
            },
            {
              path: "/docs/form/select",
              title: "Select",
            },
            {
              path: "/docs/form/slider",
              title: "Slider",
            },
            {
              path: "/docs/form/switch",
              title: "Switch",
            },
            {
              path: "/docs/form/textarea",
              title: "Textarea",
            },
          ],
          title: "Form Elements",
        },
        {
          open: true,
          path: "/docs/hooks",
          routes: [
            {
              path: "/docs/hooks/use-breakpoint-value",
              title: "useBreakpointValue",
            },
            {
              path: "/docs/hooks/use-clipboard",
              title: "useClipboard",
            },
            {
              path: "/docs/hooks/use-controllable",
              title: "useControllable",
            },
            {
              path: "/docs/hooks/use-disclosure",
              title: "useDisclosure",
            },
            {
              path: "/docs/hooks/use-media-query",
              title: "useMediaQuery",
            },
            {
              path: "/docs/hooks/use-theme",
              title: "useTheme",
            },
            {
              path: "/docs/hooks/use-prefers-reduced-motion",
              title: "usePrefersReducedMotion",
            },
          ],
          title: "Hooks",
        },
        {
          open: true,
          path: "/docs/data-display",
          routes: [
            {
              path: "/docs/data-display/avatar",
              title: "Avatar",
            },
            {
              path: "/docs/data-display/badge",
              title: "Badge",
            },
            {
              path: "/docs/data-display/code",
              title: "Code",
            },
            {
              path: "/docs/data-display/divider",
              title: "Divider",
            },
            {
              path: "/docs/data-display/image",
              title: "Image",
            },
            {
              path: "/docs/data-display/kbd",
              title: "Kbd",
            },
            {
              path: "/docs/data-display/list",
              title: "List",
            },
            {
              path: "/docs/data-display/stat",
              title: "Stat",
            },
            {
              path: "/docs/data-display/tag",
              title: "Tag",
            },
          ],
          title: "Data Display",
        },
        {
          open: true,
          path: "/docs/feedback",
          routes: [
            {
              path: "/docs/feedback/alert",
              title: "Alert",
            },
            {
              path: "/docs/feedback/circular-progress",
              title: "Circular Progress",
            },
            {
              path: "/docs/feedback/progress",
              title: "Progress",
            },
            {
              path: "/docs/feedback/skeleton",
              title: "Skeleton",
            },
            {
              path: "/docs/feedback/spinner",
              title: "Spinner",
            },
            {
              path: "/docs/feedback/toast",
              title: "Toast",
            },
          ],
          title: "Feedback",
        },
        {
          open: true,
          path: "/docs/typography",
          routes: [
            {
              path: "/docs/typography/text",
              title: "Text",
            },
            {
              path: "/docs/typography/heading",
              title: "Heading",
            },
          ],
          title: "Typography",
        },
        {
          open: true,
          path: "/docs/overlay",
          routes: [
            {
              path: "/docs/overlay/alert-dialog",
              title: "Alert Dialog",
            },
            {
              path: "/docs/overlay/drawer",
              title: "Drawer",
            },
            {
              path: "/docs/overlay/menu",
              title: "Menu",
            },
            {
              path: "/docs/overlay/modal",
              title: "Modal",
            },
            {
              path: "/docs/overlay/popover",
              title: "Popover",
            },
            {
              path: "/docs/overlay/tooltip",
              title: "Tooltip",
            },
          ],
          title: "Overlay Elements",
        },
        {
          open: true,
          path: "/docs/components",
          routes: [
            {
              path: "/docs/components/accordion",
              title: "Accordion",
            },
            {
              path: "/docs/components/breadcrumb",
              title: "Breadcrumb",
            },
            {
              path: "/docs/components/close-button",
              title: "Close Button",
            },
            {
              path: "/docs/components/collapse",
              title: "Collapse",
            },
            {
              path: "/docs/components/icon",
              title: "Icon",
            },
            {
              path: "/docs/components/link",
              title: "Link",
            },
            {
              path: "/docs/components/tabs",
              title: "Tabs",
            },
            {
              path: "/docs/components/transitions",
              title: "Transitions",
            },
            {
              path: "/docs/components/visually-hidden",
              title: "Visually Hidden",
            },
          ],
          title: "Other Components",
        },
      ],
      title: "Documentation",
    },
  ],
}
