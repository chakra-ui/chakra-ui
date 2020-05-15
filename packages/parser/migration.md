# Migration Notes for style props

We've removed some style props to keep reduce the overall API surface area and
keep them as close to CSS as possible.

| Removed              | Use this instead          |
| -------------------- | ------------------------- |
| `bgImg`              | `bgImage`                 |
| `bgPos`              | `bgPosition`              |
| `rounded`            | `borderRadius`            |
| `roundedTop`         | `borderTopRadius`         |
| `roundedBottom`      | `borderBottomRadius`      |
| `roundedLeft`        | `borderLeftRadius`        |
| `roundedRight`       | `borderRightRadius`       |
| `roundedTopRight`    | `borderTopRightRadius`    |
| `roundedTopLeft`     | `borderTopLeftRadius`     |
| `roundedBottomRight` | `borderBottomRightRadius` |
| `listStylePos`       | `listStylePosition`       |
| `listStyleImg`       | `listStyleImage`          |
