interface IDisclosure {
  /**
   *
   */
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}

/**
 * useDisclosure is a custom hook to help handle common `open`, `close`, or `toggle` scenarios
 * @returns An object of `isOpen, onOpen, onClose, onToggle`
 */
export default function useDisclosure(defaultIsOpen?: string): IDisclosure;
