import { useRef, useState } from "react"
import { Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay } from "."

export const InitialFocusRef = () => {
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<any>()
  return (
    <>
      <button data-testid="button" onClick={() => setIsOpen(true)}>
        Open
      </button>
      <Modal
        isOpen={isOpen}
        initialFocusRef={inputRef}
        onClose={() => setIsOpen(false)}
      >
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Modal header</ModalHeader>
            <ModalBody>
              <input />
              <input />
              <input ref={inputRef} />
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  )
}
