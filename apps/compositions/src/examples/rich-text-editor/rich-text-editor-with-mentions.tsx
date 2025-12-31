"use client"

import Mention from "@tiptap/extension-mention"
import Subscript from "@tiptap/extension-subscript"
import Superscript from "@tiptap/extension-superscript"
import TextAlign from "@tiptap/extension-text-align"
import { TextStyle } from "@tiptap/extension-text-style"
import {
  NodeViewWrapper,
  ReactNodeViewRenderer,
  useEditor,
} from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Control, RichTextEditor } from "compositions/ui/rich-text-editor"
import {
  type CommandItem,
  type HashtagItem,
  type MentionItem,
  createMentionConfig,
  createSuggestionConfig,
} from "compositions/ui/rich-text-editor-menu"
import { Tag } from "compositions/ui/tag"
import { LuHash, LuSlash } from "react-icons/lu"

// Data definitions with proper types
const MENTION_USERS: MentionItem[] = [
  { id: "1", label: "Alice Johnson", email: "alice@example.com" },
  { id: "2", label: "Bob Smith", email: "bob@example.com" },
  { id: "3", label: "Charlie Davis", email: "charlie@example.com" },
  { id: "4", label: "Diana Wilson", email: "diana@example.com" },
  { id: "5", label: "Ethan Brown", email: "ethan@example.com" },
  { id: "6", label: "Fiona Martinez", email: "fiona@example.com" },
  { id: "7", label: "George Anderson", email: "george@example.com" },
  { id: "8", label: "Hannah Taylor", email: "hannah@example.com" },
]

const SLASH_COMMANDS: CommandItem[] = [
  {
    id: "heading1",
    label: "Heading 1",
    description: "Large section heading",
    icon: LuHash,
  },
  {
    id: "heading2",
    label: "Heading 2",
    description: "Medium section heading",
    icon: LuHash,
  },
  {
    id: "heading3",
    label: "Heading 3",
    description: "Small section heading",
    icon: LuHash,
  },
  {
    id: "bullet",
    label: "Bullet List",
    description: "Create a bullet list",
    icon: LuSlash,
  },
  {
    id: "numbered",
    label: "Numbered List",
    description: "Create a numbered list",
    icon: LuSlash,
  },
  {
    id: "quote",
    label: "Quote",
    description: "Add a blockquote",
    icon: LuSlash,
  },
]

const HASHTAGS: HashtagItem[] = [
  { id: "react", label: "react", description: "React.js framework" },
  { id: "typescript", label: "typescript", description: "TypeScript language" },
  { id: "nextjs", label: "nextjs", description: "Next.js framework" },
  { id: "chakra", label: "chakra", description: "Chakra UI library" },
  { id: "javascript", label: "javascript", description: "JavaScript language" },
  { id: "css", label: "css", description: "CSS styling" },
]

export const RichTextEditorWithMentions = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Subscript,
      Superscript,
      TextAlign.configure({ types: ["paragraph", "heading"] }),
      TextStyle,
      CustomMention.configure({
        HTMLAttributes: {
          class: "mention",
        },
        suggestion: createMentionConfig(MENTION_USERS),
      }),
      SlashCommand.configure({
        HTMLAttributes: {
          class: "slash-command",
        },
        suggestion: createSuggestionConfig("/", (query) =>
          SLASH_COMMANDS.filter((command) =>
            command.label.toLowerCase().includes(query.toLowerCase()),
          ),
        ),
      }),
      HashtagMention.configure({
        HTMLAttributes: {
          class: "hashtag",
        },
        suggestion: createSuggestionConfig("#", (query) =>
          HASHTAGS.filter((hashtag) =>
            hashtag.label.toLowerCase().includes(query.toLowerCase()),
          ),
        ),
      }),
    ],
    content: `<h1>Rich Text Editor</h1><p>Type <strong>@</strong> for mentions, <strong>/</strong> for commands, or <strong>#</strong> for hashtags</p>`,
    shouldRerenderOnTransaction: true,
  })

  if (!editor) return null

  return (
    <RichTextEditor.Root editor={editor} borderWidth="1px" rounded="sm">
      <RichTextEditor.Toolbar>
        <RichTextEditor.ControlGroup>
          <Control.Bold />
          <Control.Italic />
          <Control.Strikethrough />
          <Control.Code />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <Control.H1 />
          <Control.H2 />
          <Control.H3 />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <Control.BulletList />
          <Control.OrderedList />
          <Control.Blockquote />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <Control.Undo />
          <Control.Redo />
        </RichTextEditor.ControlGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor.Root>
  )
}

const MentionComponent = (props: any) => {
  return (
    <NodeViewWrapper as="span" style={{ display: "inline" }}>
      <Tag size="lg" colorPalette="orange" mr="1">
        @{props.node.attrs.label ?? props.node.attrs.id}
      </Tag>
    </NodeViewWrapper>
  )
}

const CustomMention = Mention.extend({
  addNodeView() {
    return ReactNodeViewRenderer(MentionComponent)
  },
})

const SlashCommand = Mention.extend({
  name: "slashCommand",
  addNodeView() {
    return ReactNodeViewRenderer((props: any) => (
      <NodeViewWrapper as="span" style={{ display: "inline" }}>
        <Tag size="lg" colorPalette="blue" mr="1">
          /{props.node.attrs.label ?? props.node.attrs.id}
        </Tag>
      </NodeViewWrapper>
    ))
  },
})

const HashtagMention = Mention.extend({
  name: "hashtag",
  addNodeView() {
    return ReactNodeViewRenderer((props: any) => (
      <NodeViewWrapper as="span" style={{ display: "inline" }}>
        <Tag size="lg" colorPalette="green" mr="1">
          #{props.node.attrs.label ?? props.node.attrs.id}
        </Tag>
      </NodeViewWrapper>
    ))
  },
})
