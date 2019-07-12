import { Drawer, DrawerBody, DrawerHeader } from "@chakra/ui";
import { storiesOf } from "@storybook/react";
import React, { useState } from "react";
import HoverToolbar from "../components/HoverToolbar";
import TextElement from "../components/TextElement";
import "./field";

storiesOf("Editor", module).add("Hover Toolbar", () => {
  const Editor = () => {
    const [hasClicked, setHasClicked] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [value, setValue] = useState(
      "It's Time to Give Your Business a Check-up & Take It to the Top!"
    );

    return (
      <>
        <HoverToolbar
          onClickOutside={() => {
            setHasClicked(false);
          }}
          onClick={() => setHasClicked(true)}
          onShowSettings={() => setShowSettings(true)}
        >
          <TextElement
            isEditMode={hasClicked}
            value={value}
            onChange={html => setValue(html)}
          />
        </HoverToolbar>
        <Drawer
          hideOverlay
          size="sm"
          onClose={() => setShowSettings(false)}
          position="right"
          isOpen={showSettings}
        >
          <DrawerHeader>Edit Text</DrawerHeader>
          <DrawerBody>This is the body</DrawerBody>
        </Drawer>
      </>
    );
  };

  return <Editor />;
});
