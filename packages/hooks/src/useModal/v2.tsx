import * as React from "react";
import useDisclosure from "../useDisclosure";
import useId from "../useId";
import useIsomorphicEffect from "../useIsomorphicEffect";
import useLockBodyScroll from "../useLockBodyScroll";
import useAriaHidden from "../useAriaHidden";
import { createChakra } from "@chakra-ui/system";
import useMergeRefs from "../useMergeRefs";
import useFocusEffect from "../useFocusEffect";

interface ModalContext {
  isOpen: boolean;
  onClose: () => void;
  ref: React.RefObject<HTMLElement>;
  uuid: string;
  parent?: ModalContext | undefined;
  stackIndex: number;
}

const openModals: string[] = [];
const ModalContext = React.createContext<ModalContext | undefined>(undefined);
const useModalContext = () => React.useContext(ModalContext);

function useClickOut(
  ref: any,
  options: {
    shouldListen: () => boolean;
    action: Function;
  },
) {
  React.useEffect(() => {
    if (!options.shouldListen()) return;

    const handler = (event: any) => {
      if (!ref.current) return;

      const isContained = ref.current.contains(event.target);
      if (!isContained && options.shouldListen()) {
        options.action();
      }
    };
    document.addEventListener("click", handler);
    return () => {
      document.removeEventListener("click", handler);
    };
  }, [options, ref]);
}

function Modal({
  children,
  isOpen,
  onClose,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [stackIndex, setStackIndex] = React.useState();
  const parent = useModalContext();

  useIsomorphicEffect(() => {
    let counter = 0;
    let nextParent = parent;
    while (nextParent) {
      nextParent = nextParent.parent;
      counter++;
    }
    setStackIndex(counter);
  }, [parent]);

  const ref = React.useRef<HTMLElement>(null);
  const uuid = useId();

  React.useLayoutEffect(() => {
    if (isOpen) {
      openModals.push(uuid);
    } else {
      openModals.pop();
    }
  }, [uuid, isOpen]);

  useAriaHidden(ref, isOpen);
  useLockBodyScroll(ref, { shouldLock: isOpen });
  useFocusEffect(ref, { shouldFocus: isOpen });

  useClickOut(ref, {
    shouldListen: () => {
      if (!isOpen) return false;

      const ids = [];
      ids.push(uuid);

      let nextParent = parent;
      while (nextParent) {
        ids.push(nextParent.uuid);
        nextParent = nextParent.parent;
      }
      return isOpen && openModals[openModals.length - 1] == uuid;
    },
    action: onClose,
  });

  return (
    <ModalContext.Provider
      value={{ isOpen, onClose, stackIndex, uuid, ref, parent }}
      children={children}
    />
  );
}

export function useDialog(props: {
  ref?: React.Ref<any>;
  style?: React.CSSProperties;
}) {
  const modal = useModalContext();
  const ref = useMergeRefs(modal?.ref, props.ref);
  return {
    ...props,
    ref,
    id: modal?.uuid,
    hidden: !modal?.isOpen,
    style: {
      zIndex: modal?.stackIndex,
      ...props.style,
    },
    tabIndex: -1,
    role: "dialog",
    "aria-modal": true,
  };
}

export default Modal;

const ModalDialog = createChakra("div", {
  hook: useDialog,
  baseStyles: {
    width: "600px",
    height: "200px",
    bg: "white",
    color: "black",
    border: "2px solid black",
    mx: "auto",
    position: "fixed",
    left: "50%",
    transform: "translateX(-50%)",
    pos: "fixed",
    top: 0,
  },
});

export const SampleModal = () => {
  const modal1 = useDisclosure();
  const modal2 = useDisclosure();
  return (
    <>
      <button onClick={modal1.onOpen}>First</button>
      <Modal isOpen={modal1.isOpen} onClose={modal1.onClose}>
        <ModalDialog>
          This is a first modal
          <button onClick={modal2.onOpen}> Next</button>
          <button onClick={modal1.onClose}>Close</button>
          <Modal isOpen={modal2.isOpen} onClose={modal2.onClose}>
            <ModalDialog>
              This is a second modal{" "}
              <button onClick={modal2.onClose}>Close</button>
            </ModalDialog>
          </Modal>
        </ModalDialog>
      </Modal>
    </>
  );
};
