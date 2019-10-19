import React, { useState } from "react";
import lightTheme from "prism-react-renderer/themes/nightOwlLight";
import darkTheme from "prism-react-renderer/themes/nightOwl";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
// import Highlight, { defaultProps } from "prism-react-renderer";
import { mdx } from "@mdx-js/react";
import * as Chakra from "@chakra-ui/core";
import * as Formik from "formik";
import * as ReactIcons from "react-icons/md";
import FocusLock from "react-focus-lock";
import ChakraPortal from "./Portal";
import Lorem from "react-lorem-component";

const { Box, Button, useClipboard, useColorMode } = Chakra;

export const liveEditorStyle = {
  fontSize: 14,
  marginBottom: 32,
  marginTop: 32,
  overflowX: "auto",
  fontFamily: "Menlo,monospace",
  borderRadius: 10,
};

// const highlightStyle = {
//   padding: 20,
//   fontSize: 14,
//   overflow: "auto",
//   lineHeight: "1.5",
//   fontFamily: "Menlo,monospace",
// };

export const liveErrorStyle = {
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
    rounded="md"
    {...props}
  />
);

const CopyButton = props => (
  <Button
    size="sm"
    position="absolute"
    textTransform="uppercase"
    variantColor="teal"
    fontSize="xs"
    height="24px"
    top={0}
    zIndex="1"
    right="1.25em"
    {...props}
  />
);

const EditableNotice = props => {
  const { colorMode } = useColorMode();
  const bg = { light: "#fbfbfb", dark: "#011627" };

  return (
    <Box
      position="absolute"
      width="full"
      top="-1.25em"
      roundedTop="10px"
      bg={bg["dark"]}
      py="2"
      zIndex="0"
      letterSpacing="wide"
      color="gray.400"
      fontSize="xs"
      fontWeight="semibold"
      textAlign="center"
      textTransform="uppercase"
      pointerEvents="none"
      {...props}
    >
      Editable Example
    </Box>
  );
};

const StarIcon = props => {
  return (
    <Box
      m="2px"
      as="svg"
      fill="current"
      size="3"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M23.555 8.729a1.505 1.505 0 0 0-1.406-.98h-6.087a.5.5 0 0 1-.472-.334l-2.185-6.193a1.5 1.5 0 0 0-2.81 0l-.005.016-2.18 6.177a.5.5 0 0 1-.471.334H1.85A1.5 1.5 0 0 0 .887 10.4l5.184 4.3a.5.5 0 0 1 .155.543l-2.178 6.531a1.5 1.5 0 0 0 2.31 1.684l5.346-3.92a.5.5 0 0 1 .591 0l5.344 3.919a1.5 1.5 0 0 0 2.312-1.683l-2.178-6.535a.5.5 0 0 1 .155-.543l5.194-4.306a1.5 1.5 0 0 0 .433-1.661z"></path>
    </Box>
  );
};

const CodeBlock = ({
  className,
  live = true,
  isManual,
  render,
  children,
  ...props
}) => {
  const [editorCode, setEditorCode] = useState(children.trim());

  const language = className && className.replace(/language-/, "");
  const { onCopy, hasCopied } = useClipboard(editorCode);

  const { colorMode } = useColorMode();
  const themes = { light: lightTheme, dark: darkTheme };
  const theme = themes["dark"];

  const liveProviderProps = {
    theme,
    language,
    code: editorCode,
    transformCode: code => "/** @jsx mdx */" + code,
    scope: {
      ...Chakra,
      ...Formik,
      ...ReactIcons,
      mdx,
      StarIcon,
      FocusLock,
      ChakraPortal,
      Lorem,
    },
    noInline: isManual,
    ...props,
  };

  const handleCodeChange = newCode => setEditorCode(newCode.trim());

  if (language === "jsx" && live === true) {
    return (
      <LiveProvider {...liveProviderProps}>
        <LiveCodePreview />
        <Box position="relative">
          <LiveEditor
            onChange={handleCodeChange}
            padding={20}
            style={liveEditorStyle}
          />
          <CopyButton onClick={onCopy}>
            {hasCopied ? "copied" : "copy"}
          </CopyButton>
          <EditableNotice />
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
      <Box position="relative">
        <LiveEditor padding={20} style={liveEditorStyle} />

        <CopyButton top="1.25em" onClick={onCopy}>
          {hasCopied ? "copied" : "copy"}
        </CopyButton>
      </Box>
    </LiveProvider>
  );

  // return (
  //   <Highlight
  //     {...defaultProps}
  //     theme={theme}
  //     code={children.trim()}
  //     language={language}
  //   >
  //     {({ className, style, tokens, getLineProps, getTokenProps }) => (
  //       <pre className={className} style={{ ...style, ...highlightStyle }}>
  //         {tokens.map((line, i) => (
  //           <div key={i} {...getLineProps({ line, key: i })}>
  //             {line.map((token, key) => (
  //               <span key={key} {...getTokenProps({ token, key })} />
  //             ))}
  //           </div>
  //         ))}
  //       </pre>
  //     )}
  //   </Highlight>
  // );
};

CodeBlock.defaultProps = {
  mountStylesheet: false,
};

export default CodeBlock;
