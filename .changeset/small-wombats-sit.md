---
"@chakra-ui/storybook-addon": major
---

Bumped the supported version of storybook to >6.4 to support other bundlers than
webpack.

Disable the new Storybook feature flag `emotionAlias` to prevent version
mismatch issues with emotion:

```js live=false
module.exports = {
  addons: ["@chakra-ui/storybook-addon"],
  features: {
    emotionAlias: false,
  },
}
```

The ColorMode Toggle moved to the Storybook toolbar together with a new layout
direction toggle (ltr/rtl).

A new helper function extracts the ArgTypes for a given Chakra UI component. You
can quickly preview all variants, sizes and colorSchemes of your components
which are present in your Chakra UI Theme.

```tsx
// button.stories.tsx
import { getThemingArgTypes } from "@chakra-ui/storybook-addon"
import { theme } from "<your-theme>"

export default {
  title: "Components / Forms / Button",
  argTypes: getThemingArgTypes(theme, "Button"),
}

interface StoryProps extends ThemingProps<"Button"> {}

export const Basic: StoryFn<StoryProps> = (props) => (
  <Button {...props}>Button</Button>
)
```
