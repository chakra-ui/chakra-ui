---
"@chakra-ui/react": minor
---

### Fixed

- Fix hard-coded z-index for Menu in favor of one defined from the theme
- Fix problem with leading and trailing spaces when getting initials for the
  Avatar component
- Suppress unnecessary re-renders of Checkbox and Radio component

### Added

- Add CSS `accentColor` property to style props
- Add support for `asChild` in chakra factory
- Export `toastStore` from `toast` component
- Upgrade `framer-motion` to allow for skipAnimations
- Add component namespace to reduce imports and provide better composition
- Modal, Drawer: Add default `preserveScrollBarGap`

### Changed

Redesign the component themes and anatomy
