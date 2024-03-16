import { Box, BoxProps, chakra } from '@chakra-ui/react'
import { useState } from 'react'
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live'
import CodeContainer from './code-container'
import CopyButton from './copy-button'
import scope from './react-live-scope'
import { liveEditorStyle, liveErrorStyle } from './styles'

const LiveCodePreview = chakra(LivePreview, {
  base: {
    fontFamily: 'body',
    mt: 5,
    p: 3,
    borderWidth: 1,
    borderRadius: '12px',
    overflowX: 'auto',
  },
})

const EditableNotice = (props: BoxProps) => {
  return (
    <Box
      position='absolute'
      width='full'
      top='-1.25em'
      roundedTop='8px'
      bg='#011627'
      py='2'
      zIndex='0'
      letterSpacing='wide'
      color='gray.400'
      fontSize='xs'
      fontWeight='semibold'
      textAlign='center'
      textTransform='uppercase'
      pointerEvents='none'
      {...props}
    >
      Editable Example
    </Box>
  )
}

function ReactLiveBlock({ editable, rawCode, ...rest }) {
  const code = rawCode.trim().replace('// prettier-ignore', '')
  const [editorCode, setEditorCode] = useState(code.trim())
  const onChange = (newCode) => setEditorCode(newCode.trim())
  const liveProviderProps = {
    code: editorCode,
    scope,
    ...rest,
  }
  return (
    <LiveProvider {...liveProviderProps}>
      <LiveCodePreview zIndex='1' />
      <Box position='relative' zIndex='0'>
        {editable && (
          <CodeContainer padding='5'>
            <LiveEditor onChange={onChange} style={liveEditorStyle} />
          </CodeContainer>
        )}
        <CopyButton code={editorCode} />
        {editable && <EditableNotice />}
      </Box>
      {editable && <LiveError style={liveErrorStyle} />}
    </LiveProvider>
  )
}

export default ReactLiveBlock
