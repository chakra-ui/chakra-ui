import * as React from "react";
import useNested from "./useNested";
import useOutsideClick from "./useOutsideClick";
import useFocusOnShow from "../useFocusOnShow";
import useAriaHidden from "./useAriaHidden";
import useLockBodyScroll from "../useLockBodyScroll";
import useIds from "../useIds";

function useModal(props: any) {
  const ref = React.useRef<any>(null);
  const [wrap, nestedBoxes, visible] = useNested(ref);
  useOutsideClick(ref, nestedBoxes, props.onClose);
  useFocusOnShow(ref, {
    focusRef: props.initialFocusRef,
    autoFocus: true,
    visible: visible(),
  });
  useAriaHidden(ref, true);
  useLockBodyScroll(ref, { shouldLock: visible() });

  const { onClose } = props;

  const onKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        if (onClose) {
          onClose();
        }
      }
    },
    [onClose],
  );

  const [headerId, bodyId, contentId] = useIds(
    ["modal-header", "modal-body", "modal-content"],
    props.id,
  );

  const dialog = {
    id: contentId,
    ref,
    role: "dialog",
    tabIndex: 0,
    "aria-modal": true,
    onKeyDown,
  };

  return [wrap, dialog] as const;
}

export default useModal;
