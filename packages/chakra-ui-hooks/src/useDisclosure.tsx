import * as React from "react";
import useControllableValue from "./useControllableValue";
import usePrevious from "./usePrevious";

export interface UseDisclosureOptions {
  isOpen?: boolean;
  defaultIsOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
}

const useDisclosure = (props: UseDisclosureOptions = {}) => {
  const [isOpenState, setIsOpen] = React.useState(props.defaultIsOpen || false);
  const [isControlled, isOpen] = useControllableValue(
    props.isOpen,
    isOpenState,
  );

  const prevIsOpen = usePrevious(isOpen);

  const onClose = React.useCallback(() => {
    if (!isControlled) {
      setIsOpen(false);
    }
    if (props.onClose) {
      props.onClose();
    }
  }, [isControlled, props.onClose]);

  const onOpen = React.useCallback(() => {
    if (!isControlled) {
      setIsOpen(true);
    }
    if (props.onOpen) {
      props.onOpen();
    }
  }, [isControlled, props.onOpen]);

  const onToggle = React.useCallback(() => {
    if (isOpen) {
      onClose();
    } else {
      onOpen();
    }
  }, [isOpen]);

  return {
    isOpen: Boolean(isOpen),
    prevIsOpen: Boolean(prevIsOpen),
    onOpen,
    onClose,
    onToggle,
    isControlled,
  };
};

export default useDisclosure;
