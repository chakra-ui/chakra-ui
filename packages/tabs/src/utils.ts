/**
 * Determines whether a tab panel's children should be rendered or not.
 */
export const shouldTabPanelRenderChildren = ({
  hasBeenSelected,
  isLazy,
  isSelected,
  unmountHiddenPanels,
}: {
  hasBeenSelected?: boolean
  isLazy?: boolean
  isSelected?: boolean
  unmountHiddenPanels?: boolean
}) => {
  // if not lazy, always render every tab panel
  if (!isLazy) {
    return true
  }

  // lazy rendering is a bit more complicated
  switch (true) {
    // if the tab is selected, it's always rendered
    case isSelected:
      return true
    // if we're not hiding hidden panels, and the tab was previously selected,
    // show it
    case !unmountHiddenPanels && hasBeenSelected:
      return true
    // default to not rendering the panel
    default:
      return false
  }
}
