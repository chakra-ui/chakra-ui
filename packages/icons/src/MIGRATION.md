# Icon Migration to Components

The goal of this migration is to migrate the theme icon object to React
Components to make it easy to tree-shake unused icons.

## How to Convert the icons

Given this icons object:

```tsx
const iconPaths = {
  copy: {
    path: (
      <path
        fill="currentColor"
        d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
      />
    ),
  },
};
```

You can convert it to an icon component inside `src/` folder.

1. Create a new file with the icon name. For example, if the key is `search`,
   the name of file will be `SearchIcon.tsx`.
2. Put the `path` inside the `Icon` component
3. Add the `viewBox` as a prop to `Icon`

> If the object doesn't have a "viewBox", use viewBox="0 0 24 24", otherwise,
> use the viewbox value in the object.

```tsx
import React from "react"
import { Icon, IconProps } from "@chakra-ui/icon";

export function CheckIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
      />
    </Icon>
  );
}

export default CheckIcon;
```

Then add it to the `src/index.tsx`, like this

```tsx
export * from "./CheckIcon";
```
