import { Box, BoxProps, chakra } from "@chakra-ui/react"
import theme from "prism-react-renderer/themes/nightOwl"
import React, { useState } from "react"
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live"
import CopyButton from "./copy-button"
import Highlight from "./highlight"
import scope from "./react-live-scope"
import { liveEditorStyle, liveErrorStyle } from "./styles"

const LiveCodePreview = chakra(LivePreview, {
  baseStyle: {
    fontFamily: "body",
    mt: 5,
    p: 3,
    borderWidth: 1,
    borderRadius: "12px",
  },
})

const EditableNotice = (props: BoxProps) => {
  return (
    <Box
      position="absolute"
      width="full"
      top="-1.25em"
      roundedTop="8px"
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

const CodeContainer = (props: BoxProps) => (
  <Box padding="5" rounded="8px" my="8" bg="#011627" {...props} />
)

function CodeBlock(props) {
  const {
    className,
    live = true,
    manual,
    render,
    children,
    viewlines,
    ln,
    mountStylesheet = false,
    ...rest
  } = props
  const [editorCode, setEditorCode] = useState(children.trim())

  const language = className?.replace(/language-/, "")

  const liveProviderProps = {
    theme,
    language,
    code: editorCode,
    scope,
    noInline: manual,
    mountStylesheet,
    ...rest,
  }

  const onChange = (newCode) => setEditorCode(newCode.trim())

  if (language === "jsx" && live === true) {
    return (
      <LiveProvider {...liveProviderProps}>
        <LiveCodePreview zIndex="1" />
        <Box position="relative" zIndex="0">
          <CodeContainer>
            <LiveEditor onChange={onChange} style={liveEditorStyle} />
          </CodeContainer>
          <CopyButton code={editorCode} />
          <EditableNotice />
        </Box>
        <LiveError style={liveErrorStyle} />
      </LiveProvider>
    )
  }

  if (render) {
    return (
      <div style={{ marginTop: 32 }}>
        <LiveProvider {...liveProviderProps}>
          <LiveCodePreview zIndex="1" />
          <Box position="relative" zIndex="0">
            <CopyButton code={editorCode} />
          </Box>
        </LiveProvider>
      </div>
    )
  }

  return (
    <Box position="relative" zIndex="0">
      <CodeContainer px="0" overflow="hidden">
        <Highlight
          codeString={editorCode}
          language={language}
          metastring={ln}
          showLines={viewlines}
        />
      </CodeContainer>
      <CopyButton top="4" code={editorCode} />
    </Box>
  )
}

export default CodeBlock
