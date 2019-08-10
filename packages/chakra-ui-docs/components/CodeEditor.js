import React from "react";
import * as Chakra from "@chakra-ui/core";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";

const CodeEditor = ({
  code,
  padding = 20,
  style = {
    fontFamily: "Dank Mono",
    fontSize: 14,
    marginBottom: 40,
    marginTop: 24,
  },
  theme,
  disabled,
  ...props
}) => {
  const { onCopy, hasCopied } = Chakra.useClipboard(code);
  return (
    <LiveProvider
      disabled={disabled}
      theme={theme}
      scope={{ ...Chakra }}
      code={code}
      {...props}
    >
      {!disabled && (
        <>
          <Chakra.Box
            as={LivePreview}
            my={5}
            p={3}
            border="1px"
            borderColor="inherit"
            rounded="md"
          />
          <Chakra.Box as={LiveError} fontSize="sm" px={3} py={4} bg="red.50" />
        </>
      )}
      <Chakra.Box position="relative">
        <LiveEditor padding={padding} style={style} />
        <Chakra.Button
          onClick={onCopy}
          size="sm"
          position="absolute"
          textTransform="uppercase"
          rounded="0"
          fontSize="xs"
          color="purple"
          height="24px"
          top={0}
          right={0}
          icon="phone"
        >
          {hasCopied ? "copied" : "copy"}
        </Chakra.Button>
      </Chakra.Box>
    </LiveProvider>
  );
};

export default CodeEditor;
