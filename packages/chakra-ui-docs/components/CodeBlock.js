import React from "react";
import lightTheme from "prism-react-renderer/themes/nightOwlLight";
import darkTheme from "prism-react-renderer/themes/nightOwl";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import Highlight, { defaultProps } from "prism-react-renderer";
import { mdx } from "@mdx-js/react";
import * as Chakra from "@chakra-ui/core";

const { Box, Button, useClipboard, useColorMode } = Chakra;

const liveEditorStyle = {
  fontSize: 14,
  marginBottom: 32,
  marginTop: 32,
  overflowX: "auto",
  fontFamily: "Menlo,monospace",
};

const highlightStyle = {
  padding: 20,
  fontSize: 14,
  overflow: "auto",
  lineHeight: "1.5",
  fontFamily: "Menlo,monospace",
};

const liveErrorStyle = {
  fontFamily: "Menlo, monospace",
  fontSize: 14,
  padding: "1em",
  overflowX: "auto",
  color: "white",
  backgroundColor: "red",
};

const LiveCodePreview = props => (
  <Box
    as={LivePreview}
    fontFamily="body"
    mt={5}
    p={3}
    border="1px"
    borderColor="inherit"
    roundedTop="md"
    {...props}
  />
);

const CopyButton = props => (
  <Button
    size="sm"
    position="absolute"
    textTransform="uppercase"
    rounded="0"
    fontSize="xs"
    height="24px"
    top={0}
    right={0}
    icon="phone"
    {...props}
  />
);

const CodeBlock = ({ className, live = true, render, children, ...props }) => {
  const language = className.replace(/language-/, "");
  const { onCopy, hasCopied } = useClipboard(children.trim());

  const { colorMode } = useColorMode();
  const themes = { light: lightTheme, dark: darkTheme };
  const theme = themes[colorMode];

  const liveProviderProps = {
    theme,
    language,
    code: children.trim(),
    transformCode: code => "/** @jsx mdx */" + code,
    scope: { ...Chakra, mdx },
    ...props,
  };

  if (language === "jsx" && live === true) {
    return (
      <LiveProvider {...liveProviderProps}>
        <LiveCodePreview />
        <Box position="relative">
          <LiveEditor padding={20} style={liveEditorStyle} />
          <CopyButton onClick={onCopy}>
            {hasCopied ? "copied" : "copy"}
          </CopyButton>
        </Box>
        <LiveError style={liveErrorStyle} />
      </LiveProvider>
    );
  }

  if (render) {
    return (
      <div style={{ marginTop: "40px" }}>
        <LiveProvider {...liveProviderProps}>
          <LiveCodePreview />
        </LiveProvider>
      </div>
    );
  }

  return (
    <LiveProvider disabled {...liveProviderProps}>
      <LiveEditor padding={20} style={liveEditorStyle} />
    </LiveProvider>
  );

  return (
    <Highlight
      {...defaultProps}
      theme={theme}
      code={children.trim()}
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style, ...highlightStyle }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

CodeBlock.defaultProps = {
  mountStylesheet: false,
  // transformCode: src => `<React.Fragment>${src}</React.Fragment>`,
};

export default CodeBlock;
