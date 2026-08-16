---
"@chakra-ui/react": minor
---

- **Accordion, Collapsible, Dialog, Drawer, TreeView**: Add `hideMode` to choose
  how content that stays mounted is hidden when closed. The default,
  `"display-none"`, uses the `hidden` attribute and keeps effects running, so a
  video keeps playing and a subscription stays open while closed. `"activity"`
  uses React 19 `Activity` to pause those effects instead.

  ```tsx
  <Dialog.Root hideMode="activity" />
  ```

  It only applies while the content stays mounted. `unmountOnExit` removes the
  tree on close, so `hideMode` never runs.

- **Dialog, Drawer**: Add `data-autofocus` and `data-no-autofocus` to pick what
  gets focus when the overlay opens, without reaching for `initialFocusEl` and a
  ref. Mark chrome like the close button to skip it, or mark the real target
  directly.

  ```tsx
  <Dialog.Content>
    <Dialog.CloseTrigger data-no-autofocus />
    <input data-autofocus />
    <button>Save</button>
  </Dialog.Content>
  ```

  Focus goes to `initialFocusEl`, then `[data-autofocus]`, then the first
  tabbable element without `[data-no-autofocus]`, then the content root.

- **NumberInput**: Add `largeStep` and `smallStep` for keyboard stepping. Hold
  `Shift` for `largeStep`, `Alt` for `smallStep`. They default to `10 * step`
  and `step / 10`, which is what the arrow keys already did, so existing inputs
  behave the same until you set them.

  ```tsx
  <NumberInput.Root step={1} largeStep={20} smallStep={0.5} />
  ```

- **Slider**: Add `largeStep`, applied on `Shift` and on `PageUp`/`PageDown`.
  Defaults to `10 * step`, matching the previous behavior.

- **FocusTrap**: Add `persistentElements` to keep portalled content inside the
  trap when it isn't reachable through `aria-controls` or `aria-expanded`. Pass
  getters so the elements resolve lazily, after they mount.

  ```tsx
  <FocusTrap
    persistentElements={[() => document.getElementById("toast-region")]}
  />
  ```

- **Toast**: `createToaster` now takes a content type parameter, so `title` and
  `description` can be something other than `ReactNode`. It still defaults to
  `ReactNode`.

  ```tsx
  interface Content {
    id: string
    text: string
  }

  const toaster = createToaster<Content>({ placement: "top-end" })
  toaster.create({ title: { id: "save", text: "Saved" } })
  ```
