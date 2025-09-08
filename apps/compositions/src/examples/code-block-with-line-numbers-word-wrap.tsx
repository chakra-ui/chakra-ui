"use client"

import { CodeBlock, IconButton, createShikiAdapter } from "@chakra-ui/react"
import type { HighlighterGeneric } from "shiki"

export const CodeBlockWithLineNumbersWordWrap = () => {
  return (
    <CodeBlock.AdapterProvider value={shikiAdapter}>
      <CodeBlock.Root
        maxW="md"
        code={file.code}
        language={file.language}
        meta={{ showLineNumbers: true, wordWrap: true }}
      >
        <CodeBlock.Header>
          <CodeBlock.Title>{file.title}</CodeBlock.Title>
          <CodeBlock.CopyTrigger asChild>
            <IconButton variant="ghost" size="2xs">
              <CodeBlock.CopyIndicator />
            </IconButton>
          </CodeBlock.CopyTrigger>
        </CodeBlock.Header>
        <CodeBlock.Content>
          <CodeBlock.Code>
            <CodeBlock.CodeText />
          </CodeBlock.Code>
        </CodeBlock.Content>
      </CodeBlock.Root>
    </CodeBlock.AdapterProvider>
  )
}

const shikiAdapter = createShikiAdapter<HighlighterGeneric<any, any>>({
  async load() {
    const { createHighlighter } = await import("shiki")
    return createHighlighter({
      langs: ["javascript", "bash", "json"],
      themes: ["github-dark"],
    })
  },
  theme: "github-dark",
})

const file = {
  code: `total 121M
  drwxr-xr-x   3 root root 4.0K Sep 11  2022  ..
  -rw-r--r--   1 ali  ali   220 Sep 11  2022  .bash_logout
  drwxr-xr-x   2 ali  ali  4.0K Sep 11  2022  Templates
  drwxr-xr-x   2 ali  ali  4.0K Sep 11  2022  Public
  -rw-r--r--   1 ali  ali     0 Sep 11  2022  .sudo_as_admin_successful
  drwx------   3 ali  ali  4.0K Sep 11  2022  .pki
  drwx------   3 ali  ali  4.0K Sep 11  2022  .gnome
  -rw-r--r--   1 ali  ali    10 Sep 13  2022  .shell.pre-oh-my-zsh
  drwxrwxr-x   3 ali  ali  4.0K Sep 26  2022  v2ray
  -rw-r--r--   1 root root  12K Sep 26  2022  .profile.swp
  drwxrwxrwx   4 ali  ali  4.0K Sep 28  2022  .sonarlint
  drwxrwxr-x   3 ali  ali  4.0K Sep 28  2022  .eclipse
  drwxrwxr-x   8 ali  ali  4.0K Oct  4  2022  zsh-syntax-highlighting
  drwxrwxr-x   2 ali  ali  4.0K Oct  5  2022  .dart
  drwxrwxr-x   4 ali  ali  4.0K Oct  5  2022  .dartServer
  drwxrwxrwx   2 ali  ali  4.0K Oct  7  2022  .quicktype-vscode
  -rw-rw-r--   1 ali  ali   38K Oct 31  2022  .zcompdump-ali-laptop-5.8.1.ali-laptop.5060
  drwxrwxr-x   3 ali  ali  4.0K Nov 16  2022  .swt
  drwx------   3 ali  ali  4.0K Nov 17  2022  .nv
  drwxrwxr-x  15 ali  ali  4.0K Nov 18  2022  .gvm
  drwxrwxr-x   2 ali  ali  4.0K Nov 27  2022  .docker-esopmoc
  drwxrwxr-x   3 ali  ali  4.0K Dec  5  2022  .ipython
  drwx------   7 ali  ali  4.0K Dec  5  2022  .local
  drwxrwxr-x   2 ali  ali  4.0K Dec  5  2022  .jupyter
  drwxr-xr-x   4 ali  ali  4.0K Dec 11  2022  .anydesk
  drwxrwxr-x   3 ali  ali  4.0K Feb 18  2023  .dotnet
  drwxrwxr-x   3 ali  ali  4.0K Feb 19  2023  .degit
  drwxrwxr-x   3 ali  ali  4.0K Feb 26  2023  .cargo
  -rw-rw-r--   1 ali  ali    21 Feb 26  2023  .zshenv
  drwxrwxr-x   6 ali  ali  4.0K Feb 26  2023  .rustup
  drwxrwxr-x   2 ali  ali  4.0K Apr  8  2023  .ipynb_checkpoints
  drwxr-xr-x   8 ali  ali  4.0K Apr 20  2023  my_folder
  drwx------   3 ali  ali  4.0K May  5  2023  .vmware
  drwxrwxr-x  15 ali  ali  4.0K May  7  2023  .openshot_qt
  drwxrwxr-x   3 ali  ali  4.0K May 10  2023  .parallel
  drwxrwxr-x   2 ali  ali  4.0K May 16  2023  .simplelocalize
  -rw-rw-r--   1 ali  ali  5.7K May 21  2023  .v8flags.9.4.146.26-node.26.86318e52f5ed4801abe1d13d509443de.json
  drwxrwxrwx 105 ali  ali  4.0K Sep  5 10:27 `,
  language: "bash",
  title: "terminal-output.txt",
}
