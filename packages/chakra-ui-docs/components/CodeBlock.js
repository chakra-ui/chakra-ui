import React from "react";
import * as Chakra from "@chakra-ui/core";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";

const CodeBlock = ({
  code,
  isReadonly,
  padding = 20,
  style = { fontSize: 14 },
  theme,
  ...props
}) => {
  return (
    <LiveProvider
      disabled={isReadonly}
      theme={theme}
      scope={{ ...Chakra }}
      code={code}
      {...props}
    >
      <Chakra.Box
        as={LivePreview}
        my={5}
        p={3}
        border="1px"
        borderColor="inherit"
        rounded="md"
      />
      <Chakra.Box as={LiveError} fontSize="sm" px={3} py={4} bg="red.50" />
      <LiveEditor padding={padding} style={style} />
    </LiveProvider>
  );
};

export default CodeBlock;
