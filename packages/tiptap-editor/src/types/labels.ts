export interface RichTextEditorLabels {
  // Text formatting
  bold: string
  italic: string
  underline: string
  strike: string

  // Headings
  h1: string
  h2: string
  h3: string
  h4: string
  h5: string
  h6: string

  // Lists
  bulletList: string
  orderedList: string

  // Alignment
  alignLeft: string
  alignCenter: string
  alignRight: string
  alignJustify: string

  // Code
  code: string
  codeBlock: string

  // Special formatting
  superscript: string
  subscript: string
  highlight: string
  color: string
  unsetColor: string

  // Links & horizontal rule
  link: string
  unlink: string
  hr: string

  // History
  undo: string
  redo: string

  // Menus & dialogs
  linkUrl: string
  linkText: string
  linkTarget: string
  linkTargetBlank: string
  enterUrl: string
  cancel: string
  apply: string

  // Source code
  sourceCode: string
  viewSource: string
}
