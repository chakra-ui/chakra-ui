// import React, { useRef, useState } from "react";
// import { storiesOf } from "@storybook/react";
// import { ThemeProvider, CSSReset } from "@chakra-ui/theme";
// import { Button } from "../Button";
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
// } from "./Modal";

// const stories = storiesOf("Modal", module).addDecorator(story => (
//   <ThemeProvider>
//     <CSSReset />
//     {story()}
//   </ThemeProvider>
// ));

// stories.add("Default", () => {
//   const SampleModal = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const close = () => setIsOpen(false);
//     const firstField = useRef<any>();
//     return (
//       <>
//         <Modal initialFocusRef={firstField} isOpen={isOpen} onClose={close}>
//           <ModalOverlay />
//           <ModalContent>
//             <ModalHeader>Create your account</ModalHeader>
//             <ModalBody pb={6}>Welcome to modal</ModalBody>
//             <ModalFooter>
//               <Button ref={firstField} variant="outline" mr={3} onClick={close}>
//                 Cancel
//               </Button>
//               <Button color="blue" onClick={close}>
//                 Save
//               </Button>
//             </ModalFooter>
//           </ModalContent>
//         </Modal>
//         <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
//       </>
//     );
//   };

//   return <SampleModal />;
// });
