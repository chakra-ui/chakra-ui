# Chakra UI Component Decision Tree

When the user hasn't specified a component, choose the most appropriate one
based on the guidelines below. Prefer an existing Chakra component over a custom
implementation. Match the interaction model first, then the visual treatment.
Prefer the narrowest component that fits — don't reach for `Box` when a more
specific primitive exists.

---

## Layout and structure

- Use `Stack` (or `VStack`) for a vertical sequence of elements with consistent
  spacing.
- Use `HStack` for a horizontal sequence of elements with consistent spacing.
- Use `Flex` when you need explicit control over flexbox properties (direction,
  wrap, alignment).
- Use `Grid` + `GridItem` for two-dimensional layouts (rows and columns).
- Use `SimpleGrid` for equal-width columns that wrap automatically — good for
  card grids and dashboards.
- Use `Container` to constrain page content to a max-width with horizontal
  centering.
- Use `Center` to center content both horizontally and vertically without manual
  flex setup.
- Use `AbsoluteCenter` when centering with `position: absolute` — useful for
  overlays and loaders.
- Use `Card` when content is a self-contained unit that needs visual separation
  (border, shadow, padding). Use `Box` only when no built-in container semantics
  apply.
- Use `Wrap` for tag clouds, badge sets, or button groups that should flow and
  wrap automatically.
- Use `Spacer` inside `Flex` to push elements to opposite ends.
- Use `Group` to visually merge related elements (buttons, inputs) into a single
  bordered unit.
- Use `Bleed` to extend a background or image beyond the padding of its parent
  container.
- Use `Splitter` when the user should be able to resize two adjacent panels.
- Use `ScrollArea` for a container that needs custom cross-browser styled
  scrollbars.
- Use `AspectRatio` to lock a child element (video, image, map) to a fixed
  aspect ratio.

### Stack vs Flex vs Grid

- Choose `Stack` or `HStack`/`VStack` for uniform spacing along one axis — it's
  the most common case.
- Choose `Flex` when you need `flexWrap`, `justifyContent`, `alignItems`, or
  other flex properties beyond spacing.
- Choose `Grid` when you need to position elements across both rows and columns
  at the same time.
- Choose `SimpleGrid` when you only need responsive equal-width columns and
  nothing more.

---

## Typography

- Use `Heading` for page and section titles (`h1`–`h6`). Don't use `Text` as a
  heading shortcut.
- Use `Text` for body copy, labels, and descriptive text.
- Use `Span` for inline styled text inside a paragraph.
- Use `Em` and `Strong` for semantically emphasized or important text.
- Use `Mark` for highlighted text (e.g. search result matches).
- Use `Code` for short inline code snippets.
- Use `CodeBlock` for multi-line code with copy button and optional collapse —
  not for single-line snippets.
- Use `Kbd` to display keyboard shortcuts.
- Use `Blockquote` for pull quotes with attribution.
- Use `Highlight` to highlight matching substrings dynamically in text.

---

## Actions and links

- Use `Button` for primary and secondary actions (form submissions,
  confirmations, key page actions).
- Use `IconButton` for icon-only actions — always provide `aria-label`.
- Use `CloseButton` for dismiss/close actions in dialogs, drawers, and toasts.
- Use `ButtonGroup` to group related actions (e.g. Save / Cancel) with
  consistent sizing and variant.
- Use `Link` for text navigation — inline within a sentence or standalone. Use
  `asChild` with Next.js `<Link>` in App Router projects.
- Use `LinkBox` + `LinkOverlay` to make an entire card or row clickable while
  preserving accessible markup.
- Use `Toggle` when a button should visually represent an on/off pressed state.
- Use `Switch` (not `Toggle`) when the interaction is a persistent on/off
  setting (e.g. enable notifications).
- Use `DownloadTrigger` for file download buttons.

---

## Choosing from options

- Use `Switch` for turning a single setting on or off.
- Use `Checkbox` for a single independent yes/no option. Use `CheckboxGroup` for
  a set of independent options where many can be selected.
- Use `CheckboxCard` over `Checkbox` when the option needs a title, description,
  or more visual emphasis.
- Use `RadioGroup` for mutually exclusive options when 2–4 options should always
  be visible.
- Use `RadioCard` over `RadioGroup` when each option benefits from a
  description, icon, or richer presentation.
- Use `SegmentGroup` for a compact mutually exclusive mode/view switch
  (iOS-style segmented control) — typically 2–4 options.
- Use `NativeSelect` for mobile-first dropdowns where the platform picker is
  preferred.
- Use `Select` for styled dropdowns with full design control — prefer over
  `NativeSelect` on desktop.
- Use `Combobox` when the user should type to filter a long list or search
  options — prefer over `Select` for lists longer than ~15 items.
- Use `Listbox` when options must always be visible and scrollable without a
  dropdown trigger.
- Use `TagsInput` for entering multiple free-form or autocompleted values
  (skills, labels, emails).
- Use `RatingGroup` for star or point ratings.

### Select vs Combobox vs NativeSelect

- Choose `NativeSelect` for mobile-first or form-heavy interfaces where native
  picker behavior is expected.
- Choose `Select` for styled dropdowns on desktop with a known, bounded list.
- Choose `Combobox` when filtering/searching is important or the list is long.

---

## Text and value input

- Use `Input` for single-line plain text.
- Use `Textarea` for multi-line text.
- Use `NumberInput` for numeric entry with increment/decrement controls.
- Use `Slider` for adjusting a value when direct manipulation is preferred over
  exact entry. Use a range slider (dual thumbs) for min/max ranges.
- Use `PinInput` for fixed-length codes — OTP verification, PIN entry. It
  auto-advances focus between fields.
- Use `Editable` for click-to-edit inline text — useful for titles,
  descriptions, and table cells.
- Use `DatePicker` when a calendar popover should assist with date selection.
- Use `ColorPicker` for full color selection with RGB/HSL/hex modes and
  eyedropper.
- Use `FileUpload` for file selection with drag-and-drop and preview.
- Use `Clipboard` for copy-to-clipboard functionality with visual feedback.
- Use `Field.Root` to wrap every form input — it wires up the label, helper
  text, error text, and required indicator correctly.
- Use `InputGroup` to attach prefix/suffix addons (icons, currency symbols,
  units) to an `Input`.
- Use `Fieldset` to group semantically related form fields under a shared
  legend.

---

## Overlays and pop-ups

- Use `Tooltip` for a short text description of a focusable element. Don't put
  interactive content in a tooltip.
- Use `HoverCard` for richer preview content on hover (user profiles, link
  previews) — more than a tooltip, less than a popover.
- Use `Popover` for interactive contextual content anchored to a trigger —
  forms, filters, settings panels.
- Use `Dialog` for modal tasks that require user attention before continuing.
- Use `Drawer` for off-canvas panels — navigation, detail views, settings — when
  modal behavior is needed but the content is beside rather than over the page.
- Use `Toast` for brief transient feedback after an action (saved, error,
  copied). Use the `Toaster` component to render stacked toasts.
- Use `ActionBar` for mobile-style bulk action bars that appear after selection.
- Use `Menu` for action menus triggered by a button — "more options",
  right-click menus. Use `Menu.CheckboxItem` and `Menu.RadioItem` for
  toggle/selection actions within a menu.

### Tooltip vs HoverCard vs Popover

- Choose `Tooltip` for a single line of non-interactive help text.
- Choose `HoverCard` for hover-triggered preview cards with structured content.
- Choose `Popover` when the floating content needs to be interactive (has
  buttons, inputs, or links).

### Dialog vs Drawer

- Choose `Dialog` when the overlay should be centered, blocking, and focus
  attention on a specific task or confirmation.
- Choose `Drawer` when the content slides in from an edge and relates to what's
  already on screen (details, navigation, filters).

---

## Disclosure and navigation

- Use `Accordion` for a set of related collapsible sections where only one (or a
  few) should be open at a time — FAQs, grouped settings.
- Use `Collapsible` for a single expandable section — don't use `Accordion` with
  one item.
- Use `Tabs` for peer content panels where switching shows one panel at a time —
  prefer for horizontal layouts.
- Use `SegmentGroup` instead of `Tabs` when switching modes or views rather than
  showing different full content panels.
- Use `Steps` for multi-step wizards and onboarding flows — shows progress and
  allows back/next navigation.
- Use `Breadcrumb` to show the user's location in a hierarchy.
- Use `Pagination` for navigating paged datasets.
- Use `Menu` for dropdown navigation menus.
- Use `TreeView` when a file-system-style hierarchy must stay visible and
  expandable in place.

### Accordion vs Tabs vs Collapsible

- Choose `Accordion` for vertically stacked collapsible sections (FAQs, settings
  groups).
- Choose `Tabs` for horizontal peer sections where all tabs are always visible.
- Choose `Collapsible` for a single show/hide section — not a group.

---

## Data display

- Use `Table` for structured tabular data with rows and columns — sortable
  headers, dense comparison.
- Use `DataList` for key-value pairs (user profile details, metadata) — not true
  tabular data.
- Use `Stat` + `StatGroup` for KPI metrics and dashboard numbers with up/down
  indicators.
- Use `Timeline` for chronological events, changelogs, or process steps.
- Use `Badge` for compact non-removable status labels (Active, Beta, New).
- Use `Tag` over `Badge` when the label should be removable or interactive.
- Use `Avatar` + `AvatarGroup` for user profile pictures with fallback initials
  or icon.
- Use `Carousel` for image galleries, feature showcases, or content sliders.
- Use `QrCode` to render a QR code from a string value.
- Use `ColorSwatch` to display a color value visually.

### Table vs DataList

- Choose `Table` when data has multiple comparable columns and rows.
- Choose `DataList` for a single record's attributes displayed as label/value
  pairs.

---

## Feedback and status

- Use `Alert` for persistent in-page messages (warnings, info, errors) that are
  part of the page layout.
- Use `Toast` for transient post-action feedback — it disappears automatically.
- Use `EmptyState` for no-data and no-results states — provides structured
  layout for illustration, title, description, and actions.
- Use `Spinner` for indeterminate loading — content is fetching, duration
  unknown.
- Use `Skeleton` for loading placeholders that approximate the shape of incoming
  content.
- Use `Progress` for a linear progress bar on an operation with a known
  completion percentage.
- Use `ProgressCircle` for the same use case when a circular indicator fits the
  layout better.
- Use `Loader` as an alternative to `Spinner` for a different visual style of
  indeterminate loading.

### Alert vs Toast vs EmptyState

- Choose `Alert` when the message is persistent and tied to content on the
  current view.
- Choose `Toast` when the message is temporary and triggered by a user action.
- Choose `EmptyState` when there is no content to display and you want to
  explain why and offer a next action.

### Spinner vs Skeleton vs Progress

- Choose `Spinner` when loading is happening and the layout isn't known yet.
- Choose `Skeleton` when the layout is known — show placeholder shapes that
  match the expected content.
- Choose `Progress` when the operation has a measurable percentage.

---

## Utilities

- Use `VisuallyHidden` for screen-reader-only text — skip links, icon button
  labels added outside the button.
- Use `SkipNav` to add a skip-to-main-content accessibility link.
- Use `Portal` when a component must render outside its DOM parent to avoid
  z-index or overflow clipping issues.
- Use `FocusTrap` to constrain keyboard focus within a region (custom modals,
  custom drawers).
- Use `Presence` to animate components on mount and unmount.
- Use `Show` / `Hide` for responsive conditional rendering based on breakpoints.
- Use `For` as a typed loop utility when rendering lists of components.
- Use `ClientOnly` to prevent SSR hydration mismatches for browser-only content.
- Use `FormatNumber` / `FormatByte` for locale-aware number and file-size
  formatting.
- Use `Marquee` for scrolling announcement banners or news tickers.
