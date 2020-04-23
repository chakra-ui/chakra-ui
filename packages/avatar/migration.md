# Migration Notes

## Improvements

- AvatarGroup now stacks each avatar without using `z-index`. As much as
  possible, we'll like to do away with zIndex.

- You can now use your custom fallback avatar svg. Simply pass `fallbackAvatar`
  prop

- Cleaner DOM output

- You can now change the `borderRadius` of the avatar. No longer constrained to
  circular avatars.

- Theming Support: All design related decisions for the Avatar are located in
  `theme.componenents.Avatar`. this means you can customize to suit your brand
  needs.

- Added `getInitials` prop to allow users manage how initials are generated from
  name
