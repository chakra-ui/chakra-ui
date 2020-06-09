import * as Chakra from "@chakra-ui/core"
import { Box, Button, chakra, useClipboard } from "@chakra-ui/core"
import * as Icons from "@chakra-ui/icons"
import * as Formik from "formik"
import theme from "prism-react-renderer/themes/nightOwl"
import React, { useState } from "react"
import * as IOIcons from "react-icons/ai"
import FocusLock from "react-focus-lock"
import * as MDIcons from "react-icons/md"
import * as FaIcons from "react-icons/fa"
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live"
import Lorem from "react-lorem-component"
import * as Loaders from "react-spinners"

export const liveEditorStyle = {
  fontSize: 14,
  marginBottom: 32,
  marginTop: 32,
  overflowX: "auto",
  fontFamily: "Menlo,monospace",
  borderRadius: 5,
}

export const liveErrorStyle = {
  fontFamily: "Menlo, monospace",
  fontSize: 14,
  padding: "1em",
  overflowX: "auto",
  color: "white",
  backgroundColor: "red",
}

const LiveCodePreview = chakra(LivePreview, {
  baseStyle: {
    fontFamily: "body",
    mt: 5,
    p: 3,
    borderWidth: 1,
    borderRadius: "md",
  },
})

const CopyButton = (props) => (
  <Button
    size="sm"
    position="absolute"
    textTransform="uppercase"
    colorScheme="teal"
    fontSize="xs"
    height="24px"
    top={0}
    zIndex="1"
    right="1.25em"
    {...props}
  />
)

const EditableNotice = (props) => {
  return (
    <Box
      position="absolute"
      width="full"
      top="-1.25em"
      borderTopRadius="5px"
      bg="#011627"
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
  )
}

const StarIcon = (props) => {
  return (
    <chakra.svg
      m="2px"
      fill="current"
      boxSize="3"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M23.555 8.729a1.505 1.505 0 0 0-1.406-.98h-6.087a.5.5 0 0 1-.472-.334l-2.185-6.193a1.5 1.5 0 0 0-2.81 0l-.005.016-2.18 6.177a.5.5 0 0 1-.471.334H1.85A1.5 1.5 0 0 0 .887 10.4l5.184 4.3a.5.5 0 0 1 .155.543l-2.178 6.531a1.5 1.5 0 0 0 2.31 1.684l5.346-3.92a.5.5 0 0 1 .591 0l5.344 3.919a1.5 1.5 0 0 0 2.312-1.683l-2.178-6.535a.5.5 0 0 1 .155-.543l5.194-4.306a1.5 1.5 0 0 0 .433-1.661z"></path>
    </chakra.svg>
  )
}

const CodeBlock = (props) => {
  const { className, live = true, manual, render, children, ...rest } = props
  const [editorCode, setEditorCode] = useState(children.trim())

  const language = className && className.replace(/language-/, "")
  const [hasCopied, onCopy] = useClipboard(editorCode)

  const liveProviderProps = {
    theme,
    language,
    code: editorCode,
    scope: {
      ...Chakra,
      ...Formik,
      ...MDIcons,
      ...IOIcons,
      ...FaIcons,
      ...Icons,
      ...Loaders,
      StarIcon,
      FocusLock,
      Lorem,
    },
    noInline: manual,
    ...rest,
  }

  const onChange = (newCode) => setEditorCode(newCode.trim())

  if (language === "jsx" && live === true) {
    return (
      <LiveProvider {...liveProviderProps}>
        <LiveCodePreview zIndex="1" />
        <Box position="relative" zIndex="0">
          <LiveEditor
            onChange={onChange}
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
    )
  }

  if (render) {
    return (
      <div style={{ marginTop: "40px" }}>
        <LiveProvider {...liveProviderProps}>
          <LiveCodePreview />
        </LiveProvider>
      </div>
    )
  }

  return (
    <LiveProvider disabled {...liveProviderProps}>
      <LiveEditor padding={20} style={liveEditorStyle} />
    </LiveProvider>
  )
}

CodeBlock.defaultProps = {
  mountStylesheet: false,
}

export default CodeBlock
