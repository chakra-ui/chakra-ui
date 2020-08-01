import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  chakra,
  useClipboard,
} from "@chakra-ui/core"
import theme from "prism-react-renderer/themes/nightOwl"
import React, { useState } from "react"
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live"
import scope from "./react-live-scope"

export const liveEditorStyle: React.CSSProperties = {
  paddingTop: 20,
  paddingLeft: 20,
  fontSize: 14,
  marginBottom: 32,
  marginTop: 32,
  overflowX: "auto",
  fontFamily: "Menlo,monospace",
  borderRadius: 12,
}

export const liveErrorStyle: React.CSSProperties = {
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
    borderRadius: "12px",
  },
})

const CopyButton = (props: ButtonProps) => (
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

const EditableNotice = (props: BoxProps) => {
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

function CodeBlock(props) {
  const { className, live = true, manual, render, children, ...rest } = props
  const [editorCode, setEditorCode] = useState(children.trim())

  const language = className && className.replace(/language-/, "")
  const [hasCopied, onCopy] = useClipboard(editorCode)

  const liveProviderProps = {
    theme,
    language,
    code: editorCode,
    scope,
    noInline: manual,
    ...rest,
  }

  const onChange = (newCode) => setEditorCode(newCode.trim())

  if (language === "jsx" && live === true) {
    return (
      <LiveProvider {...liveProviderProps}>
        <LiveCodePreview zIndex="1" />
        <Box position="relative" zIndex="0">
          <LiveEditor onChange={onChange} style={liveEditorStyle} />
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
      <div style={{ marginTop: 40 }}>
        <LiveProvider {...liveProviderProps}>
          <LiveCodePreview />
        </LiveProvider>
      </div>
    )
  }

  return (
    <LiveProvider disabled {...liveProviderProps}>
      <LiveEditor style={liveEditorStyle} />
    </LiveProvider>
  )
}

CodeBlock.defaultProps = {
  mountStylesheet: false,
}

export default CodeBlock
