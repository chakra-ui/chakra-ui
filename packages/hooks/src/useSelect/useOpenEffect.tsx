import { DescendantsActions, DescendantsState } from "../useDescendant";
import useIsomorphicEffect from "../useIsomorphicEffect";

function useOpenEffect(
  state: DescendantsState,
  actions: DescendantsActions,
  isOpen: boolean,
  prevIsOpen: boolean,
) {
  const { reset, highlight, first } = actions;

  useIsomorphicEffect(() => {
    if (prevIsOpen && !isOpen) {
      return reset("highlighted");
    }

    if (isOpen) {
      if (state.selectedItem) {
        highlight(state.selectedItem);
      } else {
        if (!state.highlightedItem) {
          first("highlight");
        }
      }
    }
    // eslint-disable-next-line
  }, [isOpen, prevIsOpen]);
}

export default useOpenEffect;
