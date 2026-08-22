"use client"

import {
  Node,
  mergeAttributes,
  nodeInputRule,
  nodePasteRule,
} from "@tiptap/core"
import {
  type NodeViewProps,
  ReactNodeViewRenderer,
  useEditor,
} from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { RichTextEditor } from "compositions/ui/rich-text-editor"

export const RichTextEditorWithHashtags = () => {
  const initialContent = `<p>Type #chakra or #react and press space, it becomes a tag. Try pasting: #tiptap #awesome</p>`
  const preprocessedContent = preprocessContent(initialContent, "#")

  const editor = useEditor({
    extensions: [StarterKit, Hashtag],
    content: preprocessedContent,
    shouldRerenderOnTransaction: true,
    immediatelyRender: false,
  })

  if (!editor) return null
  return (
    <RichTextEditor.Root
      editor={editor}
      border="1px solid"
      borderColor="border"
      rounded="md"
    >
      <RichTextEditor.Content />
    </RichTextEditor.Root>
  )
}

interface HashtagOptions {
  trigger: string
}
interface HashtagAttributes {
  tag: string
}

const Hashtag = Node.create<HashtagOptions>({
  name: "hashtag",
  inline: true,
  group: "inline",
  atom: true,

  addOptions() {
    return { trigger: "#" }
  },

  addAttributes() {
    return {
      tag: {
        default: "",
        parseHTML: (element) => element.getAttribute("data-tag"),
        renderHTML: (attributes) => {
          return { "data-tag": attributes.tag }
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: "span[data-type='hashtag']",
        getAttrs: (element) => {
          if (typeof element === "string") return false
          return {
            tag: element.getAttribute("data-tag") || "",
          }
        },
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(HTMLAttributes, {
        "data-type": "hashtag",
        "data-tag": HTMLAttributes.tag,
      }),
      `${this.options.trigger}${HTMLAttributes.tag}`,
    ]
  },

  addInputRules() {
    const trigger = this.options.trigger
    return [
      nodeInputRule({
        find: new RegExp(`(${trigger}[a-zA-Z0-9_]+)\\s$`),
        type: this.type,
        getAttributes: (match) => ({
          tag: match[1].substring(trigger.length),
        }),
      }),
    ]
  },

  addPasteRules() {
    const trigger = this.options.trigger
    return [
      nodePasteRule({
        find: new RegExp(`${trigger}([a-zA-Z0-9_]+)`, "g"),
        type: this.type,
        getAttributes: (match) => ({ tag: match[1] }),
      }),
    ]
  },

  addNodeView() {
    return ReactNodeViewRenderer(HashtagComponent)
  },
})

function HashtagComponent({ node }: NodeViewProps) {
  const { tag } = node.attrs as HashtagAttributes
  return `#${tag}`
}

function preprocessContent(content: string, trigger: string = "#"): string {
  const regex = new RegExp(`${trigger}([a-zA-Z0-9_]+)`, "g")

  return content.replace(regex, (_match, tag) => {
    return `<span data-type="hashtag" data-tag="${tag}">${trigger}${tag}</span>`
  })
}
