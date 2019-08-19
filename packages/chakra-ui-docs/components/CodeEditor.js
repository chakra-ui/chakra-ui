import React from "react";
import * as Chakra from "@chakra-ui/core";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";

export const LiveCodeProvider = props => (
  <LiveProvider scope={{ ...Chakra }} {...props} />
);

export const LiveCodePreview = props => (
  <Chakra.Box
    as={LivePreview}
    my={5}
    p={3}
    border="1px"
    borderColor="inherit"
    rounded="md"
    {...props}
  />
);

export const LiveCodeEditor = props => (
  <LiveEditor
    padding={20}
    style={{
      fontSize: 14,
      marginBottom: 40,
      marginTop: 24,
      overflow: "auto",
      fontFamily: `Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace`,
    }}
  />
);

const CopyButton = props => (
  <Chakra.Button
    size="sm"
    position="absolute"
    textTransform="uppercase"
    rounded="0"
    fontSize="xs"
    variantColor="purple"
    height="24px"
    top={0}
    right={0}
    icon="phone"
    {...props}
  ></Chakra.Button>
);

export const LiveCodeError = props => (
  <Chakra.Box
    as={LiveError}
    overflowX="auto"
    fontSize="sm"
    px={3}
    py={4}
    bg="red.50"
    {...props}
  />
);

const CodeEditor = ({ code, disabled, theme, ...props }) => {
  const { onCopy, hasCopied } = Chakra.useClipboard(code);
  return (
    <LiveCodeProvider disabled={disabled} theme={theme} code={code} {...props}>
      {!disabled && (
        <>
          <LiveCodePreview />
          <LiveCodeError />
        </>
      )}
      <Chakra.Box position="relative">
        <LiveCodeEditor />
        <CopyButton onClick={onCopy}>
          {hasCopied ? "copied" : "copy"}
        </CopyButton>
      </Chakra.Box>
    </LiveCodeProvider>
  );
};

export default CodeEditor;
