import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  chakra,
  useClipboard,
} from "@chakra-ui/core"
import theme from "prism-react-renderer/themes/nightOwl"
import { useState } from "react"
import type { CSSProperties } from "react"
import {
  LiveEditor,
  LiveError,
  LivePreview,
  LiveProvider,
  LiveProviderProps,
} from "react-live"

import { ReactLiveScope } from "./react-live-scope"

export const liveEditorStyle: CSSProperties = {
  fontFamily: "SF Mono, Menlo, monospace",
  fontSize: 14,
  overflowX: "auto",
}

export const liveErrorStyle: CSSProperties = {
  backgroundColor: "red",
  color: "white",
  fontFamily: "SF Mono, Menlo, monospace",
  fontSize: 14,
  overflowX: "auto",
  padding: "1em",
}

const LiveCodePreview = chakra(LivePreview, {
  baseStyle: {
    borderRadius: "12px",
    borderWidth: 1,
    fontFamily: "body",
    mt: 5,
    p: 3,
    zIndex: 1,
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

const EditableNotice = (props: BoxProps) => (
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

const CodeContainer = (props: BoxProps) => (
  <Box padding="5" rounded="8px" my="8" bg="#011627" {...props} />
)

type CodeBlockProps = LiveProviderProps & {
  live?: string
  render?: Function
  manual?: LiveProviderProps["noInline"]
  children: string
  mountStylesheet?: boolean
}

export function CodeBlock(props: CodeBlockProps): JSX.Element {
  const {
    className,
    live = true,
    manual,
    render,
    children,
    mountStylesheet = false,
    ...rest
  } = props
  const [editorCode, setEditorCode] = useState(children.trim())

  const language = className?.replace(
    /language-/u,
    "",
  ) as LiveProviderProps["language"]
  const { hasCopied, onCopy } = useClipboard(editorCode)

  const liveProviderProps: LiveProviderProps = {
    code: editorCode,
    language,
    noInline: manual,
    scope: ReactLiveScope,
    theme,
    ...rest,
  }

  const onChange = (newCode: string) => setEditorCode(newCode.trim())

  if (language === "jsx" && live !== "false") {
    return (
      // @ts-expect-error old typings of LiveProvider
      <LiveProvider {...liveProviderProps}>
        <LiveCodePreview />
        <Box position="relative" zIndex="0">
          <CodeContainer>
            <LiveEditor onChange={onChange} style={liveEditorStyle} />
          </CodeContainer>
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
      <div style={{ marginTop: 32 }}>
        {/* @ts-expect-error old typings of LiveProvider */}
        <LiveProvider {...liveProviderProps}>
          <LiveCodePreview />
        </LiveProvider>
      </div>
    )
  }

  return (
    // @ts-expect-error old typings of LiveProvider
    <LiveProvider disabled {...liveProviderProps}>
      <CodeContainer>
        <LiveEditor style={liveEditorStyle} />
      </CodeContainer>
    </LiveProvider>
  )
}
