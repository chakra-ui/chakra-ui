import {
  Button,
  Stack,
  Icon,
  HStack,
  Text,
  ButtonGroup,
} from '@chakra-ui/react'
import {
  SandpackCodeViewer,
  SandpackThemeProvider,
  useSandpack,
  useSandpackTheme,
} from '@codesandbox/sandpack-react'
import { nightOwl } from '@codesandbox/sandpack-themes'
import * as React from 'react'
import { RiFileEditLine, RiFileTransferLine } from 'react-icons/ri'
import { formatFilePath, SandpackLanguageSupport } from './utils'

interface CodeBlockProps {
  path: string
  code: string
  language: SandpackLanguageSupport
  showLineNumbers?: boolean
}

const CodeBlock = ({ path, code, showLineNumbers = false }: CodeBlockProps) => {
  const { theme } = useSandpackTheme()
  const { sandpack } = useSandpack()

  return (
    <Stack bg={theme.colors.surface1} rounded='md' my={4}>
      {path && (
        <HStack px={4} pt={2} justifyContent='space-between'>
          <Text color='purple.300'>{formatFilePath(path)}</Text>
          <ButtonGroup>
            <Button
              size='xs'
              textTransform='uppercase'
              colorScheme='teal'
              leftIcon={<Icon as={RiFileEditLine} />}
              onClick={() => {
                sandpack.openFile(path)
                sandpack.updateFile(path, code)
              }}
            >
              Copy to Sandbox
            </Button>
            <Button
              size='xs'
              textTransform='uppercase'
              colorScheme='teal'
              leftIcon={<Icon as={RiFileTransferLine} />}
              onClick={() => {
                sandpack.openFile(path)
              }}
            >
              Open File
            </Button>
          </ButtonGroup>
        </HStack>
      )}
      <SandpackCodeViewer
        showTabs={false}
        code={code}
        showLineNumbers={showLineNumbers}
      />
    </Stack>
  )
}

export const TutorialCodeBlock = (props: CodeBlockProps) => {
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - sandpack has not yet fully provided React 18 support
    <SandpackThemeProvider theme={nightOwl}>
      <CodeBlock {...props} />
    </SandpackThemeProvider>
  )
}
