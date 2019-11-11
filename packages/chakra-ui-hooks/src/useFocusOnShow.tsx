import useUpdateEffect from "./useUpdateEffect";
import { getFirstTabbableIn, ensureFocus } from "@chakra-ui/utils";

export interface FocusOptions {
  autoFocus?: boolean;
  visible?: boolean;
  focusRef?: React.RefObject<HTMLElement>;
}

function useFocusOnShow(
  ref: React.RefObject<HTMLElement>,
  options: FocusOptions,
) {
  const initialFocusRef = options.focusRef;
  const shouldFocus = options.visible && options.autoFocus;

  useUpdateEffect(() => {
    const element = ref.current;

    // If there're nested open dialogs, let them handle focus
    if (!shouldFocus || !element) {
      return;
    }

    if (initialFocusRef && initialFocusRef.current) {
      initialFocusRef.current.focus({ preventScroll: true });
    } else {
      const tabbable = getFirstTabbableIn(element, true);
      const isActive = () => element.contains(document.activeElement);
      if (tabbable) {
        ensureFocus(tabbable, { preventScroll: true, isActive });
      } else {
        ensureFocus(element, { preventScroll: true, isActive });
      }
    }
  }, [ref, initialFocusRef, shouldFocus]);
}

export default useFocusOnShow;
