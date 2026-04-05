---
"@chakra-ui/react": patch
---

**createOverlay**: Fix issue where scroll lock (`pointer-events: none`,
`overflow: hidden`) remained stuck on `<body>` when a dialog opened via
`createOverlay()` was closed inside a `<React.StrictMode>` tree.

React StrictMode intentionally double-invokes effects (mount → cleanup →
remount) to surface side-effect bugs. Ark UI's internal scroll-lock counter
could become inconsistent when the overlay component mounted directly with
`open: true`, causing the cleanup to leave body styles frozen after the dialog
was closed.

The fix introduces an `OverlayWrapper` inside the `Viewport` component that
renders the underlying component with `open: false` on first mount, then
transitions to the actual `open` value after the initial commit (via a
`useEffect` with an empty dependency array). This matches the official Ark UI
workaround ("use a controlled `open` prop rather than conditional rendering"),
ensuring the component always starts in the safe closed state and only
transitions to open as a prop update — which Ark UI handles correctly in both
regular and StrictMode environments.
