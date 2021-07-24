import { Box } from "@chakra-ui/react"
import theme from "prism-react-renderer/themes/nightOwl"
import React from "react"
import CodeContainer from "./code-container"
import CopyButton from "./copy-button"
import Highlight from "./highlight"
import ReactLiveBlock from "./react-live-block"

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

  const language = className?.replace(/language-/, "")
  const rawCode = children.trim()
  const reactLiveBlockProps = {
    rawCode,
    language,
    theme,
    noInline: manual,
    mountStylesheet,
    ...rest,
  }

  if (language === "jsx" && live === true) {
    return <ReactLiveBlock editable {...reactLiveBlockProps} />
  }

  if (render) {
    /**
     * @TODO Not sure if this is even used?
     */
    return (
      <div style={{ marginTop: 32 }}>
        <ReactLiveBlock editable={false} {...reactLiveBlockProps} />
      </div>
    )
  }

  return (
    <Box position="relative" zIndex="0">
      <CodeContainer px="0" overflow="hidden">
        <Highlight
          codeString={rawCode}
          language={language}
          theme={theme}
          metastring={ln}
          showLines={viewlines}
        />
      </CodeContainer>
      <CopyButton top="4" code={rawCode} />
    </Box>
  )
}

export default CodeBlock
