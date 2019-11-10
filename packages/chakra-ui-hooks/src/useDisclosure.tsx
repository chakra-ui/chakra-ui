import { useState } from "react";
import useControllableValue from "./useControllableValue";
import usePrevious from "./usePrevious";

interface UseDisclosure {
  isOpen?: boolean;
  defaultIsOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
}

const useDisclosure = (props: UseDisclosure = {}) => {
  const [isOpen, setIsOpen] = useState(props.defaultIsOpen || false);
  const [isControlled, isOpenValue] = useControllableValue(
    props.isOpen,
    isOpen,
  );

  const prevIsOpen = usePrevious(isOpenValue);

  const onClose = () => {
    if (!isControlled) {
      setIsOpen(false);
    }
    if (props.onClose) {
      props.onClose();
    }
  };

  const onOpen = () => {
    if (!isControlled) {
      setIsOpen(true);
    }
    if (props.onOpen) {
      props.onOpen();
    }
  };

  const onToggle = () => {
    if (isOpenValue) {
      onClose();
    } else {
      onOpen();
    }
  };
  return {
    isOpen: isOpenValue as boolean,
    prevIsOpen,
    onOpen,
    onClose,
    onToggle,
  };
};

export default useDisclosure;
