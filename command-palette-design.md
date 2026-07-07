# RFC: Command Palette for Chakra UI

**Issue:** [OSS-2251](https://linear.app/chakra/issue/OSS-2251/command-palette)
**Author:** Kevin (kalisa kevin) **Date:** July 7, 2026 **Status:** Draft —
pending review

---

## 1. Problem statement

Every non-trivial product eventually ships a ⌘K surface: docs search, an action
runner, a navigation switcher, an "AI ask" entry point. Today, Chakra users who
need one either pull in `cmdk`/`kbar` (unstyled, second design system to
reconcile, no token/recipe integration) or hand-assemble `Dialog` + `Listbox`
themselves — which works (we even ship an example,
`apps/compositions/src/examples/listbox-with-dialog.tsx`) but forces every team
to re-solve the same layout, focus, filtering, and accessibility decisions.

The goal is to give the community a **Chakra-native command surface**: one that
inherits the system's theming, composition model, and accessibility guarantees,
and that scales from a 10-line quick start to a fully customized product
feature.

### Target use cases (in priority order)

1. **Command menu** — run actions, navigate, toggle settings (Linear, Raycast
   style)
2. **Search dialog** — query a dataset or docs index, possibly async
3. **Picker at scale** — assign labels/users/projects from large lists,
   including multi-select
4. **Embedded host** — teams embedding the palette inside their own shells
   (drawers, popovers, full-page)

### Non-goals (v1)

- Nested page/submenu navigation as a built-in API (userland pattern; see §7)
- A hotkey manager (documented pattern; candidate for a separate utility)
- List virtualization (tracks Listbox; solve there, inherit here)
- Feature-for-feature parity with any reference implementation

## 2. Design principles

These follow from how Chakra v3 is built, and every decision below traces back
to one of them:

1. **Don't invent interaction logic the system already has.** Behavior comes
   from zag.js machines via Ark UI. We compose machines; we don't fork or
   re-implement them in React state.
2. **Open compound components, closed compositions.** The library ships
   unopinionated parts (`CommandPalette.*`); opinionated, batteries-included
   experiences live in `compositions/ui` snippets that users own and edit.
3. **Data is userland.** Chakra v3 deliberately moved collections, filtering,
   and async out of components (`useListCollection`, `useFilter`,
   `createListCollection`). The palette must not regress this by smuggling a
   search engine into the component.
4. **Styling is a recipe, never hardcoded.** One slot recipe key, themeable and
   overridable end to end, `unstyled` escape hatch on every part.
5. **Accessibility is inherited, not bolted on.** If we can't get the ARIA
   pattern from an existing machine, that's a signal the machine belongs
   upstream in zag/Ark — not that we should hand-roll it here.

## 3. Architecture

> **Revision (July 7, 2026):** After review, the component is **inline-first**
> (Nuxt UI model): `CommandPalette.Root` is the input + list surface built on
> Listbox alone, rendered inline and visible immediately. Overlay usage ("within
> a Dialog / Popover / Drawer") is a _composition_ with the existing Chakra
> overlay components, shown in examples — not part of this component's API. This
> deletes the dual-machine Root and all its glue (the `Dialog.Content asChild` +
> `Listbox.Root` merge collided on element `id`s, breaking the dialog machine's
> content lookup — nesting or, better, plain composition avoids the class of bug
> entirely). Sections below that describe a Dialog-coupled Root predate this
> revision; §3.4 reflects the final shape.

### 3.1 Layered view

```
┌─────────────────────────────────────────────────────────────┐
│  User land                                                  │
│  commands data · filtering (useFilter/fzf) · async · pages  │
├─────────────────────────────────────────────────────────────┤
│  Composition layer (compositions/ui + docs examples)        │
│  <CommandMenu /> closed component · hotkey wiring ·         │
│  highlight-matches · nested pages · async loading           │
├─────────────────────────────────────────────────────────────┤
│  Component layer (@chakra-ui/react)          ← this RFC     │
│  CommandPalette.* compound parts                            │
│  createSlotRecipeContext({ key: "commandPalette" })         │
├──────────────────────────────┬──────────────────────────────┤
│  Overlay machine             │  List machine                │
│  Ark Dialog (zag dialog)     │  Ark Listbox (zag listbox)   │
│  open state · focus trap ·   │  input keyboard model ·      │
│  dismiss · scroll lock ·     │  highlight · selection ·     │
│  layer stacking              │  groups · empty state        │
└──────────────────────────────┴──────────────────────────────┘
```

The component layer is intentionally thin: it binds two existing machines
together, gives them a shared visual identity, and encodes the handful of
cross-machine behaviors (e.g. select → close) that users would otherwise get
subtly wrong.

### 3.2 Why Dialog + Listbox (decision record)

| Option                      | Assessment                                                                                                                                                                                                  |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Dialog + Listbox** ✅     | `Listbox.Input` (Ark ≥5.x) implements the combobox-with-listbox ARIA pattern for a _permanently visible_ list — exactly a palette's interaction model. Selection modes, groups, empty state come free.      |
| Dialog + Combobox           | Combobox's machine owns the open/close lifecycle of a _popup_; a palette's list is never "closed" while the dialog is open. Forcing `open` permanently fights the machine (layering, dismiss semantics).    |
| New zag machine (`command`) | Justified only if the palette needs interaction state neither machine models. §7's deferred features (pages, hotkeys) are _application_ state, not widget state. Revisit upstream if v1 feedback disagrees. |
| Vendor/wrap `cmdk`          | New runtime dependency, duplicate interaction model alongside zag, no collection/recipe integration, and we'd own the a11y seams between cmdk and our Dialog.                                               |

Verified against the workspace: `@ark-ui/react@5.37.2` ships `Listbox.Input`; no
command primitive exists in Ark, so composition is the only zero-new-machine
path.

**Precedent.** This "Chakra-only component over Ark primitives" pattern is
established: `ActionBar` wraps Ark `Popover` under its own `actionBar` recipe
key with custom anatomy in `packages/react/src/anatomy.ts`. We extend the
pattern from one machine to two.

### 3.3 State ownership

The most important architectural decision is _who owns what_. Getting this wrong
is how palettes become unmaintainable.

| State                  | Owner             | Rationale                                                                                                                                          |
| ---------------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Open/close             | Dialog machine    | Dismiss interactions (esc, backdrop, layer stack) are overlay concerns. Exposed controlled + uncontrolled (`open`/`defaultOpen`/`onOpenChange`).   |
| Highlight / navigation | Listbox machine   | `aria-activedescendant` bookkeeping must live with the keyboard model. Never mirrored into React state.                                            |
| Selection              | Listbox machine   | Single and multiple modes come free; palette adds only the select→close policy.                                                                    |
| Filter query & results | **Userland**      | Principle 3. The component consumes a `ListCollection`; how it shrinks (sync `contains`, fzf, server search, debounce) is the application's call.  |
| Command _execution_    | **Userland**      | `onValueChange`/`onSelect` hands over the selected item; the palette never dispatches actions itself. Commands-as-data schemas belong in userland. |
| Page/submenu stack     | **Userland** (v1) | It's navigation state over _data_, not widget interaction state. A built-in API would freeze one navigation model for everyone. See §7.            |

**Cross-machine glue owned by the component (the actual value-add):**

- select in single mode → close dialog (`closeOnSelect`, default `true`;
  multiple mode defaults to `false`)
- dialog opens → focus lands on `Input`, first item auto-highlighted
- dialog fully exits → component fires `onExitComplete` so userland can reset
  its filter (with `unmountOnExit` defaulted, stale-query flash is impossible)
- `Indicator` reflects a `loading` prop for async sources (search icon ↔
  spinner) without userland re-plumbing
- esc follows the Raycast/Linear convention: clears the query when the input is
  non-empty, closes the dialog otherwise (opt-out via the standard
  `onEscapeKeyDown` interception)

### 3.4 Component surface

```tsx
<CommandPalette.Root
  collection={collection}
  onValueChange={run}
  loading={loading}
>
  <CommandPalette.Control>
    <CommandPalette.Indicator /> {/* search icon ↔ spinner */}
    <CommandPalette.Input onChange={(e) => filter(e.target.value)} />
  </CommandPalette.Control>
  <CommandPalette.List>
    <CommandPalette.ItemGroup>
      <CommandPalette.ItemGroupLabel>…</CommandPalette.ItemGroupLabel>
      <CommandPalette.Item item={item}>
        <CommandPalette.ItemText>…</CommandPalette.ItemText>
        <CommandPalette.ItemCommand>⌘K</CommandPalette.ItemCommand>
        <CommandPalette.ItemIndicator /> {/* multiple mode check */}
      </CommandPalette.Item>
    </CommandPalette.ItemGroup>
    <CommandPalette.Empty>…</CommandPalette.Empty>
  </CommandPalette.List>
  <CommandPalette.Footer /> {/* hint bar: ↑↓ · ⏎ · esc */}
</CommandPalette.Root>
```

For the ⌘K overlay experience, compose inside the existing `Dialog`
(`placement="top"`), closing on select:

```tsx
<Dialog.Root open={open} onOpenChange={...} placement="top">
  <Dialog.Trigger />
  <Portal>
    <Dialog.Backdrop />
    <Dialog.Positioner>
      <Dialog.Content overflow="hidden">
        <CommandPalette.Root collection={collection} borderWidth="0" onSelect={close}>
          …
        </CommandPalette.Root>
      </Dialog.Content>
    </Dialog.Positioner>
  </Portal>
</Dialog.Root>
```

- `Root` renders `Dialog.Root` with a nested `Listbox.Root` context — no extra
  DOM. Prop surface = dialog props ∪ listbox props, with palette defaults
  (`lazyMount`, `unmountOnExit`, `autoHighlight`, `closeOnSelect`).
- `RootProvider` variant for programmatic control (matches every other v3
  component pair), plus `Context`/`ItemContext` render-prop escape hatches and a
  `PropsProvider` for app-wide defaults.
- Every part: style props, `asChild`, `unstyled`.
- Items are `asChild`-able into links/router links — navigation palettes need
  real anchors for middle-click and a11y.

**Portalling (decision record).** DOM placement stays application-owned via the
explicit `<Portal>` part, matching every other v3 overlay (`Dialog`, `Drawer`,
`Menu`, `Select`, `Popover`). Three concerns stay orthogonal: dismiss/layer
ordering (zag layer stack), visual stacking (recipe z-index tokens), and DOM
placement (`Portal`). Auto-portalling to `document.body` — the cmdk
`Command.Dialog` approach — would entangle them, force `container`/ `disabled`
back in as `Root` props, and silently escape the styled root in shadow-DOM and
`Frame` embeddings (a supported target — see `sandbox/shadow-dom`). The
zero-config experience lives in the closed `CommandMenu` snippet, which wires
the portal internally.

### 3.5 Styling architecture

- `commandPaletteAnatomy` (custom, in `packages/react/src/anatomy.ts`):
  `trigger · backdrop · positioner · content · control · indicator · input · closeTrigger · list · itemGroup · itemGroupLabel · item · itemText · itemCommand · itemIndicator · empty · footer`
- Slot recipe `theme/recipes/command-palette.ts`, registered as `commandPalette`
  → typegen picks it up (`pnpm build:tokens`).
- One `size` variant (`sm | md | lg`) controlling content width and item
  density. No `variant` axis in v1 — a palette has one visual idiom; adding a
  variant axis later is non-breaking, removing one is not.
- Tokens only: `bg.panel`, `radius.l3`, Dialog-family enter/exit animations.
  Dark mode and custom themes come free.
- Runtime states surface as data-attributes, not recipe variants: `Content`
  exposes `data-loading` / `data-empty` so themes style those states via
  `_loading` / `_empty` conditions without any new API.
- Logical properties only (`paddingInline`, `insetInline`, …) — RTL must work
  from v1; retrofitting it into a shipped recipe is a breaking visual change.

## 4. Accessibility contract

Inherited, per principle 5:

- **From Listbox.Input:** `role="combobox"`, `aria-expanded`, `aria-controls`,
  `aria-activedescendant` tracking; arrow/home/end navigation while DOM focus
  stays in the input; type-to-filter never steals focus.
- **From Dialog:** focus trap, `aria-modal`, labelled-by wiring, esc + outside
  dismiss, focus restore to trigger, scroll lock, nested-layer coordination (a
  palette opened from inside a Drawer must dismiss correctly — zag's layer stack
  handles this; we add a test, not code).
- **We add:** vitest-axe suite + keyboard-interaction tests, matching the repo's
  existing component test conventions.

## 5. Extensibility model

How the community customizes, in increasing order of investment:

1. **Theme it** — override the `commandPalette` slot recipe in their system.
2. **Style props / `unstyled`** — per-instance overrides on any part.
3. **Compose it** — swap parts via `asChild`, add footers/headers/badges, embed
   in `Drawer`/`Popover` instead of the default overlay (parts don't assume the
   Dialog parent beyond context).
4. **Own it** — a closed `<CommandMenu />` snippet in `compositions/ui`
   (CLI-installable) for the 80% case. This is where opinions live — group
   ordering, hotkey binding, fuzzy matching — because users can edit the file.
   Proposed contract, so it can be reviewed alongside the primitive:

   ```tsx
   interface CommandMenuCommand {
     value: string
     label: string
     group?: string
     icon?: React.ReactNode
     kbd?: string
     keywords?: string[]
     disabled?: boolean
     onSelect?: () => void
   }

   // wires Portal, ⌘K hotkey, useFilter, closeOnSelect internally
   ;<CommandMenu commands={commands} hotkey placeholder="Type a command…" />
   ```

## 6. Risks and mitigations

| Risk                                                                                     | Mitigation                                                                                                                                               |
| ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Two nested machine contexts** (Dialog + Listbox) leaking confusing errors when misused | `Root` owns the nesting; parts resolve styles from one recipe context. Dev-time error messages name `CommandPalette.*`, not the underlying primitives.   |
| **Focus interplay**: Dialog `initialFocusEl` vs Listbox input expectations               | `Root` defaults `initialFocusEl` to the input; covered by interaction tests including open-from-keyboard and focus-restore paths.                        |
| **Ark/zag upstream drift** (Listbox.Input is a young API)                                | The `ark-ui-version-bumper` flow already gates upgrades on typecheck/build; palette tests extend that safety net to this composition.                    |
| **Scope creep toward cmdk parity** (pages, scoring, shortcut engine)                     | §7 records deferrals explicitly. Anything requiring new interaction state goes upstream to zag/Ark as a machine proposal, not into this component.       |
| **API regret** — a baked-in feature we can't remove                                      | v1 surface is parts + one variant axis + glue props only. Everything speculative ships as an editable composition first, gets promoted only with demand. |

## 7. Deferred by design (with intended userland pattern)

| Capability             | v1 answer                                                                                            | Promotion path                                                     |
| ---------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Nested pages / back    | Docs example: userland page stack swapping the `collection`; backspace-on-empty-query pops the stack | If a dominant pattern emerges, propose `navigation` support in zag |
| Global hotkey (⌘K)     | Docs example (`useEffect` keydown); evaluate a shared `useHotkey` utility as a separate RFC          | Separate utility package/hook — palettes aren't its only consumer  |
| Fuzzy matching/scoring | `useFilter` (`contains`) in docs; fzf/Fuse example for power users                                   | Stays userland permanently (principle 3)                           |
| Async sources          | Docs example: debounced fetch → `collection.replace`, `loading` prop drives `Indicator`              | Possibly a `useAsyncListCollection` helper, shared with Combobox   |
| Virtualization         | Out of scope; inherit whenever Listbox gains it                                                      | Solved at the Listbox/zag layer                                    |

## 8. Delivery plan

Phased so each stage is reviewable and shippable:

0. **Spike (de-risk)** — throwaway Storybook story composing raw Ark `Dialog` +
   `Listbox.Input` parts. Proves the focus-trap / `aria-activedescendant`
   interplay, highlighted-item scroll-into-view, and esc routing _before_ any
   Chakra API is written. If anything fights, the fix goes upstream to zag while
   the design is still fluid.
1. **Core** — component (`packages/react/src/components/command-palette/`),
   anatomy, slot recipe, registry + typegen, exports
2. **Proof** — Storybook stories + behavior/axe tests (open-select-close,
   multiple mode, esc-clears-then-closes, dismiss layering inside Drawer)
3. **Community surface** — compositions (`basic`, `groups`, `kbd`, `multiple`,
   `highlight-matches`, `hotkey`, `async`, `nested-pages`) + closed
   `CommandMenu` snippet. Async/large-list examples demonstrate slicing filtered
   results (`slice(0, 12)`) until virtualization lands.
4. **Docs & discoverability** — docs page
   (`apps/www/content/docs/components/command-palette.mdx`), sidebar "New"
   badge + homepage announcement (DateInput precedent), compositions registry,
   MCP server component list, changeset (minor)

Checkpoint after phase 2: share the Storybook build for design review before
writing docs. Consider a dev snapshot release (`pnpm version:dev`) after phase 3
so community members can exercise the palette in real embeddings before the
stable minor.

## 9. Open questions

1. **Name** — `CommandPalette` (issue title, self-describing) vs `Command`
   (cmdk-familiar, shorter namespace). Recommendation: `CommandPalette`.
2. **Overlay coupling** — resolved in review: the component is **inline-first**;
   overlay usage composes with the existing `Dialog` / `Popover` / `Drawer` (see
   §3 revision note).
3. **`Footer`/`Control` in anatomy** — recommendation: include both; every real
   palette has an input row and a hint bar, and recipe-level styling keeps them
   consistent.
4. **`closeOnSelect` default** — recommendation: `true` for single, `false` for
   multiple. Confirm.
