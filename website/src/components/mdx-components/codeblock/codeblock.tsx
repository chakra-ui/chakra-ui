import { Box, useBoolean } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import theme from 'prism-react-renderer/themes/nightOwl'
import React, { useEffect } from 'react'
import CodeContainer from './code-container'
import CopyButton from './copy-button'
import Highlight from './highlight'

const ReactLiveBlock = dynamic(() => import('./react-live-block'))

function CodeBlock(props) {
  const [isMounted, { on }] = useBoolean()
  useEffect(
    /**
     * Lazily-load <ReactLiveBlock /> to save bundle size.
     */
    on,
    [on],
  )
  const {
    className,
    live = true,
    manual,
    render,
    children,
    viewlines,
    ln,
    mountStylesheet = false,
  } = props.children.props

  const _live = live === 'true' || live === true

  const language = className?.replace(/language-/, '')
  const rawCode = children.trim()

  const reactLiveBlockProps = {
    rawCode,
    language,
    theme,
    noInline: manual,
    mountStylesheet,
  }

  if (isMounted && language === 'jsx' && _live === true) {
    return <ReactLiveBlock editable {...reactLiveBlockProps} />
  }

  if (isMounted && render) {
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
    <Box position='relative' zIndex='0'>
      <CodeContainer px='0' overflow='hidden'>
        <Highlight
          codeString={rawCode}
          language={language}
          theme={theme}
          metastring={ln}
          showLines={viewlines}
        />
      </CodeContainer>
      <CopyButton top='4' code={rawCode} />
    </Box>
  )
}

export default CodeBlock
