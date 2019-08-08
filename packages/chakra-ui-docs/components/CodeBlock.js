import React from "react";
import {
  Button,
  ThemeProvider,
  LightMode,
  CSSReset,
  Heading
} from "@chakra-ui/core";

import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import theme from "prism-react-renderer/themes/shadesOfPurple";

const CodeBlock = ({ value }) => {
  return (
    <LiveProvider
      disabled={false}
      theme={theme}
      scope={{ ThemeProvider, LightMode, CSSReset, Heading, Button }}
      code={value}
    >
      <LiveEditor
        // padding={30}
        style={{ fontFamily: "Dank Mono", fontSize: 12 }}
      />
      <LiveError />
      <LivePreview />
    </LiveProvider>
  );
};

export default CodeBlock;
