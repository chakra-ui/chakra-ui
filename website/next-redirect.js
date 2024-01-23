async function redirect() {
  return [
    {
      source: '/discord',
      destination: 'https://discord.gg/chakra-ui',
      permanent: true,
    },
    // GENERAL
    {
      source: '/docs',
      destination: '/docs/getting-started',
      permanent: true,
    },
    {
      source: '/principles',
      destination: '/getting-started/principles',
      permanent: true,
    },
    {
      source: '/style-props',
      destination: '/docs/styled-system/style-props',
      permanent: true,
    },
    {
      source: '/color-mode',
      destination: '/docs/styled-system/color-mode',
      permanent: true,
    },
    {
      source: '/responsive-styles',
      destination: '/docs/styled-system/responsive-styles',
      permanent: true,
    },
    {
      source: '/theme',
      destination: '/docs/styled-system/theme',
      permanent: true,
    },
    {
      source: '/recipes',
      destination: '/community/recipes/using-fonts',
      permanent: true,
    },
    {
      source: '/recipes/:slug',
      destination: '/community/recipes/:slug',
      permanent: true,
    },
    // COMPONENTS
    {
      source: '/accordion',
      destination: '/docs/components/accordion',
      permanent: true,
    },
    {
      source: '/alert',
      destination: '/docs/components/alert',
      permanent: true,
    },
    {
      source: '/alert-dialog',
      destination: '/docs/components/alert-dialog',
      permanent: true,
    },
    {
      source: '/aspectratiobox',
      destination: '/docs/components/aspect-ratio',
      permanent: true,
    },
    {
      source: '/avatar',
      destination: '/docs/components/avatar',
      permanent: true,
    },
    {
      source: '/badge',
      destination: '/docs/components/badge',
      permanent: true,
    },
    {
      source: '/box',
      destination: '/docs/components/box',
      permanent: true,
    },
    {
      source: '/wrap',
      destination: '/docs/components/wrap',
      permanent: true,
    },
    {
      source: '/breadcrumb',
      destination: '/docs/components/breadcrumb',
      permanent: true,
    },
    {
      source: '/button',
      destination: '/docs/components/button',
      permanent: true,
    },
    {
      source: '/checkbox',
      destination: '/docs/components/checkbox',
      permanent: true,
    },
    {
      source: '/circularprogress',
      destination: '/docs/components/circular-progress',
      permanent: true,
    },
    {
      source: '/closebutton',
      destination: '/docs/components/close-button',
      permanent: true,
    },
    {
      source: '/code',
      destination: '/docs/components/code',
      permanent: true,
    },
    {
      source: '/portal',
      destination: '/docs/components/portal',
      permanent: true,
    },
    {
      source: '/collapse',
      destination: '/docs/components/transition#collapse',
      permanent: true,
    },
    {
      source: '/center',
      destination: '/docs/components/center',
      permanent: true,
    },
    {
      source: '/controlbox',
      // MISSING
      destination: '/docs/components/box',
      permanent: true,
    },
    {
      source: '/divider',
      destination: '/docs/components/divider',
      permanent: true,
    },
    {
      source: '/drawer',
      destination: '/docs/components/drawer',
      permanent: true,
    },
    {
      source: '/editable',
      destination: '/docs/components/editable',
      permanent: true,
    },
    {
      source: '/flex',
      destination: '/docs/components/flex',
      permanent: true,
    },
    {
      source: '/formcontrol',
      destination: '/docs/components/form-control',
      permanent: true,
    },
    {
      source: '/grid',
      destination: '/docs/components/grid',
      permanent: true,
    },
    {
      source: '/heading',
      destination: '/docs/components/heading',
      permanent: true,
    },
    {
      source: '/icon',
      destination: '/docs/components/icon',
      permanent: true,
    },
    {
      source: '/iconbutton',
      destination: '/docs/components/icon-button',
      permanent: true,
    },
    {
      source: '/image',
      destination: '/docs/components/image',
      permanent: true,
    },
    {
      source: '/input',
      destination: '/docs/components/input',
      permanent: true,
    },
    {
      source: '/link',
      destination: '/docs/components/link',
      permanent: true,
    },
    {
      source: '/kbd',
      destination: '/docs/components/kbd',
      permanent: true,
    },
    {
      source: '/list',
      destination: '/docs/components/list',
      permanent: true,
    },
    {
      source: '/menu',
      destination: '/docs/components/menu',
      permanent: true,
    },
    {
      source: '/modal',
      destination: '/docs/components/modal',
      permanent: true,
    },
    {
      source: '/numberinput',
      destination: '/docs/components/number-input',
      permanent: true,
    },
    {
      source: '/popover',
      destination: '/docs/components/popover',
      permanent: true,
    },
    {
      source: '/progress',
      destination: '/docs/components/progress',
      permanent: true,
    },
    {
      source: '/pseudobox',
      // deprecated, moved to box
      destination: '/docs/components/box',
      permanent: true,
    },
    {
      source: '/radio',
      destination: '/docs/components/radio',
      permanent: true,
    },
    {
      source: '/simplegrid',
      destination: '/docs/components/simple-grid',
      permanent: true,
    },
    {
      source: '/select',
      destination: '/docs/components/select',
      permanent: true,
    },
    {
      source: '/skeleton',
      destination: '/docs/components/skeleton',
      permanent: true,
    },
    {
      source: '/slider',
      destination: '/docs/components/slider',
      permanent: true,
    },
    {
      source: '/spinner',
      destination: '/docs/components/spinner',
      permanent: true,
    },
    {
      source: '/stat',
      destination: '/docs/components/stat',
      permanent: true,
    },
    {
      source: '/stack',
      destination: '/docs/components/stack',
      permanent: true,
    },
    {
      source: '/switch',
      destination: '/docs/components/switch',
      permanent: true,
    },
    {
      source: '/tabs',
      destination: '/docs/components/tabs',
      permanent: true,
    },
    {
      source: '/tag',
      destination: '/docs/components/tag',
      permanent: true,
    },
    {
      source: '/text',
      destination: '/docs/components/text',
      permanent: true,
    },
    {
      source: '/textarea',
      destination: '/docs/components/textarea',
      permanent: true,
    },
    {
      source: '/toast',
      destination: '/docs/components/toast',
      permanent: true,
    },
    {
      source: '/tooltip',
      destination: '/docs/components/tooltip',
      permanent: true,
    },
    {
      source: '/guides/using-fonts',
      destination: '/community/recipes/using-fonts',
      permanent: true,
    },
    {
      source: '/docs',
      destination: '/getting-started',
      permanent: true,
    },
    {
      source: '/docs/getting-started',
      destination: '/getting-started',
      permanent: true,
    },
    {
      source: '/docs/migration',
      destination: '/getting-started/migration',
      permanent: true,
    },
    {
      source: '/docs/principles',
      destination: '/getting-started/principles',
      permanent: true,
    },
    {
      source: '/docs/comparison',
      destination: '/getting-started/comparison',
      permanent: true,
    },
    {
      source: '/guides/advanced/contributing',
      destination: '/getting-started/contributing',
      permanent: true,
    },
    {
      source: '/docs/contributing',
      destination: '/getting-started/contributing',
      permanent: true,
    },
    {
      source: '/guides/as-prop',
      destination: '/community/recipes/as-prop',
      permanent: true,
    },
    {
      source: '/guides/principles',
      destination: '/getting-started/principles',
      permanent: true,
    },
    {
      source: '/guides/(getting-started|integrations)/:slug',
      destination: '/getting-started/:slug',
      permanent: true,
    },
    {
      source: '/guides/recipes/:slug',
      destination: '/community/recipes/:slug',
      permanent: true,
    },
    {
      source: '/docs/theming/advanced',
      destination: '/docs/styled-system/advanced-theming',
      permanent: true,
    },
    {
      source: '/docs/features/:slug',
      destination: '/docs/styled-system/:slug',
      permanent: true,
    },
    {
      source: '/docs/styled-system/features/:slug',
      destination: '/docs/styled-system/:slug',
      permanent: true,
    },
    {
      source: '/docs/styled-system/theming/:slug',
      destination: '/docs/styled-system/:slug',
      permanent: true,
    },
    {
      source: '/docs/theming/:slug',
      destination: '/docs/styled-system/:slug',
      permanent: true,
    },
    {
      source:
        '/docs/(layout|form|data-display|disclosure|feedback|typography|overlay|navigation|media-and-icons|other|transitions)/:slug',
      destination: '/docs/components/:slug',
      permanent: true,
    },
    {
      source:
        '/docs/components/(layout|form|disclosure|data-display|feedback|typography|overlay|navigation|media-and-icons|other)/:slug',
      destination: '/docs/components/:slug',
      permanent: true,
    },
    {
      source: '/docs/styled-system/(utility-hooks|component-hooks)/:slug',
      destination: '/docs/hooks/:slug',
      permanent: true,
    },
    {
      source: '/showcase',
      destination: '/community/showcase',
      permanent: true,
    },
    {
      source: '/team',
      destination: '/community/team',
      permanent: true,
    },
    {
      source: '/docs/components/recipes/:slug',
      destination: '/community/recipes/:slug',
      permanent: true,
    },
    {
      source: '/changelog',
      destination: '/changelog/latest',
      permanent: true,
    },
  ]
}

module.exports = redirect
