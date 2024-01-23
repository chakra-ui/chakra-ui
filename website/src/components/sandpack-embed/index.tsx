import { Box, BoxProps } from '@chakra-ui/react'
import {
  CodeEditorProps,
  PreviewProps,
  SandpackCodeEditor,
  SandpackLayout,
  SandpackLayoutProps,
  SandpackPreview,
  SandpackProvider,
} from '@codesandbox/sandpack-react'
import { nightOwl } from '@codesandbox/sandpack-themes'

type Props = BoxProps & {
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
  layoutOptions?: SandpackLayoutProps
  editorOptions?: CodeEditorProps
  previewOptions?: PreviewProps & BoxProps
  files: {
    [x: string]: string
  }
  isHorizontal?: boolean
}

const SandpackEmbed = ({
  dependencies,
  devDependencies,
  layoutOptions,
  editorOptions,
  previewOptions,
  files,
  isHorizontal = false,
}: Props) => {
  return (
    <SandpackProvider
      files={files}
      theme={nightOwl}
      template='react-ts'
      customSetup={{
        dependencies: {
          'react-icons': '3.11.0',
          '@chakra-ui/react': 'latest',
          '@chakra-ui/icons': 'latest',
          '@emotion/react': '^11.7.0',
          '@emotion/styled': '^11.6.0',
          'framer-motion': '^4.1.17',
          react: '^18.0.0',
          'react-dom': '^18.0.0',
          'react-scripts': '^4.0.0',
          ...dependencies,
        },
        devDependencies: {
          '@types/react': '^18.0.0',
          '@types/react-dom': '^18.0.0',
          typescript: '^4.0.0',
          ...devDependencies,
        },
      }}
    >
      <Box
        as={SandpackLayout}
        sx={{
          '--sp-layout-height': 'auto',
        }}
        style={{ flexDirection: isHorizontal ? 'row' : 'column-reverse' }}
        {...layoutOptions}
      >
        <SandpackCodeEditor
          showLineNumbers
          style={{
            maxHeight: isHorizontal ? '600px' : '500px',
            minWidth: '400px',
          }}
          {...editorOptions}
        />
        <Box
          as={SandpackPreview}
          minHeight='350px'
          sx={{ '& iframe': { flex: 'initial', flexGrow: 1 } }}
          {...previewOptions}
        />
      </Box>
    </SandpackProvider>
  )
}

export default SandpackEmbed
