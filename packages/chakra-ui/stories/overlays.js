import { storiesOf } from "@storybook/react";
import React from "react";
import Modal from "../src/Modal";
import {
  DialogHeader,
  DialogBody,
  DialogFooter
} from "../src/DialogComponents";
import FormControl from "../src/FormControl";
import Input from "../src/Input";
import ActionButtons from "../src/ActionButtons";
import Button from "../src/Button";
import { Component } from "../src/Component";
import { UIModeProvider } from "../src/ThemeProvider";
import { Box } from "../src/Layout";
import Drawer from "../src/Drawer";

const stories = storiesOf("Overlays", module);
stories.addDecorator(story => {
  return (
    <>
      <Box maxWidth="lg" mx="auto" mt={6} p={6}>
        {story()}
      </Box>
      <br />
      <UIModeProvider value="dark">
        <Box bg="gray.800" maxWidth="lg" mx="auto" mt={6} p={6}>
          {story()}
        </Box>
      </UIModeProvider>
    </>
  );
});

stories.add("Modal", () => {
  return (
    <Component initialState={{ isOpen: false }}>
      {({ state, setState }) => (
        <>
          <Modal
            isOpen={state.isOpen}
            mode="dark"
            onClose={() => setState({ isOpen: false })}
          >
            <DialogHeader onClose={() => setState({ isOpen: false })}>
              Create your account
            </DialogHeader>

            <DialogBody pb={6}>
              <FormControl label="First name" mb={4}>
                <Input placeholder="Type here..." />
              </FormControl>
            </DialogBody>

            <DialogFooter>
              <ActionButtons onCancel={() => setState({ isOpen: false })} />
            </DialogFooter>
          </Modal>
          <Button onClick={() => setState({ isOpen: true })}>Open Modal</Button>
        </>
      )}
    </Component>
  );
});

stories.add("Drawer", () => {
  return (
    <Component initialState={{ isOpen: false }}>
      {({ state, setState }) => (
        <>
          <Drawer
            isOpen={state.isOpen}
            placement="bottom"
            onClose={() => setState({ isOpen: false })}
          >
            <DialogHeader
              showCloseButton
              onClose={() => setState({ isOpen: false })}
            >
              Create your account
            </DialogHeader>

            <DialogBody pb={6}>
              <FormControl label="First name">
                <Input placeholder="Type here..." />
              </FormControl>
            </DialogBody>
            <DialogFooter>
              <ActionButtons onCancel={() => setState({ isOpen: false })} />
            </DialogFooter>
          </Drawer>
          <Button onClick={() => setState({ isOpen: true })}>
            Open Drawer
          </Button>
        </>
      )}
    </Component>
  );
});

// stories.add("Popover", () => (
//   <>
//     <Popover
//       trigger={<Button>Trigger</Button>}
//       usePortal
//       // trapFocus
//       showCloseButton
//     >
//       {props => (
//         <>
//           <PopoverHeader>Header</PopoverHeader>
//           <PopoverBody>
//             <Button variant="solid" color="blue" onClick={props.onClose}>
//               Close
//             </Button>
//           </PopoverBody>
//           <PopoverFooter>This is the footer</PopoverFooter>
//         </>
//       )}
//     </Popover>
//     <Button variant="solid" color="green">
//       Content Inside
//     </Button>
//   </>
// ));
// stories.add("Tooltip", () => (
//   <>
//     <Tooltip label="Welcome home" placement="right" showArrow>
//       <Button variant="solid" color="blue">
//         Close
//       </Button>
//     </Tooltip>
//   </>
// ));
