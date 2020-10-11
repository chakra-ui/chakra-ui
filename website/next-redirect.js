async function redirect() {
  return [
    // GENERAL
    {
      source: "/getting-started",
      destination: "/docs/getting-started",
      permanent: true,
    },
    {
      source: "/principles",
      destination: "/docs/principles",
      permanent: true,
    },
    {
      source: "/style-props",
      destination: "/docs/features/style-props",
      permanent: true,
    },
    {
      source: "/color-mode",
      destination: "/docs/features/color-mode",
      permanent: true,
    },
    {
      source: "/responsive-styles",
      destination: "/docs/features/responsive-styles",
      permanent: true,
    },
    {
      source: "/theme",
      destination: "/docs/theming/theme",
      permanent: true,
    },
    {
      source: "/recipes",
      destination: "/guides/integrations/with-cra",
      permanent: true,
    },
    // COMPONENTS
    {
      source: "/accordion",
      destination: "/docs/components/accordion",
      permanent: true,
    },
    {
      source: "/alert",
      destination: "/docs/feedback/alert",
      permanent: true,
    },
    {
      source: "/alert-dialog",
      destination: "/docs/overlay/alert-dialog",
      permanent: true,
    },
    {
      source: "/aspectratiobox",
      destination: "/docs/layout/aspect-ratio",
      permanent: true,
    },
    {
      source: "/avatar",
      destination: "/docs/data-display/avatar",
      permanent: true,
    },
    {
      source: "/badge",
      destination: "/docs/data-display/badge",
      permanent: true,
    },
    {
      source: "/box",
      destination: "/docs/layout/box",
      permanent: true,
    },
    {
      source: "/breadcrumb",
      destination: "/docs/components/breadcrumb",
      permanent: true,
    },
    {
      source: "/button",
      destination: "/docs/form/button",
      permanent: true,
    },
    {
      source: "/checkbox",
      destination: "/docs/form/checkbox",
      permanent: true,
    },
    {
      source: "/circularprogress",
      destination: "/docs/feedback/circular-progress",
      permanent: true,
    },
    {
      source: "/closebutton",
      destination: "/docs/components/close-button",
      permanent: true,
    },
    {
      source: "/code",
      destination: "/docs/data-display/code",
      permanent: true,
    },
    {
      source: "/collapse",
      destination: "/docs/components/collapse",
      permanent: true,
    },
    {
      source: "/controlbox",
      // MISSING
      destination: "/docs/layout/box",
      permanent: true,
    },
    {
      source: "/divider",
      destination: "/docs/data-display/divider",
      permanent: true,
    },
    {
      source: "/drawer",
      destination: "/docs/overlay/drawer",
      permanent: true,
    },
    {
      source: "/editable",
      destination: "/docs/form/editable",
      permanent: true,
    },
    {
      source: "/flex",
      destination: "/docs/layout/flex",
      permanent: true,
    },
    {
      source: "/formcontrol",
      destination: "/docs/form/form-control",
      permanent: true,
    },
    {
      source: "/grid",
      destination: "/docs/layout/grid",
      permanent: true,
    },
    {
      source: "/heading",
      destination: "/docs/typography/heading",
      permanent: true,
    },
    {
      source: "/icon",
      destination: "/docs/components/icon",
      permanent: true,
    },
    {
      source: "/iconbutton",
      destination: "/docs/form/icon-button",
      permanent: true,
    },
    {
      source: "/image",
      destination: "/docs/data-display/image",
      permanent: true,
    },
    {
      source: "/input",
      destination: "/docs/form/input",
      permanent: true,
    },
    {
      source: "/link",
      destination: "/docs/components/link",
      permanent: true,
    },
    {
      source: "/list",
      destination: "/docs/data-display/list",
      permanent: true,
    },
    {
      source: "/menu",
      destination: "/docs/overlay/menu",
      permanent: true,
    },
    {
      source: "/modal",
      destination: "/docs/overlay/modal",
      permanent: true,
    },
    {
      source: "/numberinput",
      destination: "/docs/form/number-input",
      permanent: true,
    },
    {
      source: "/popover",
      destination: "/docs/overlay/popover",
      permanent: true,
    },
    {
      source: "/progress",
      destination: "/docs/feedback/progress",
      permanent: true,
    },
    {
      source: "/pseudobox",
      // deprecated, moved to box
      destination: "/docs/layout/box",
      permanent: true,
    },
    {
      source: "/radio",
      destination: "/docs/form/radio",
      permanent: true,
    },
    {
      source: "/simplegrid",
      destination: "/docs/layout/simple-grid",
      permanent: true,
    },
    {
      source: "/select",
      destination: "/docs/form/select",
      permanent: true,
    },
    {
      source: "/skeleton",
      destination: "/docs/feedback/skeleton",
      permanent: true,
    },
    {
      source: "/slider",
      destination: "/docs/form/slider",
      permanent: true,
    },
    {
      source: "/spinner",
      destination: "/docs/feedback/spinner",
      permanent: true,
    },
    {
      source: "/stat",
      destination: "/docs/data-display/stat",
      permanent: true,
    },
    {
      source: "/stack",
      destination: "/docs/layout/stack",
      permanent: true,
    },
    {
      source: "/switch",
      destination: "/docs/form/switch",
      permanent: true,
    },
    {
      source: "/tabs",
      destination: "/docs/components/tabs",
      permanent: true,
    },
    {
      source: "/tag",
      destination: "/docs/data-display/tag",
      permanent: true,
    },
    {
      source: "/text",
      destination: "/docs/typography/text",
      permanent: true,
    },
    {
      source: "/textarea",
      destination: "/docs/form/textarea",
      permanent: true,
    },
    {
      source: "/toast",
      destination: "/docs/feedback/toast",
      permanent: true,
    },
    {
      source: "/tooltip",
      destination: "/docs/overlay/tooltip",
      permanent: true,
    },
  ]
}

module.exports = redirect
