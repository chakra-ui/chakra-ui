import Link from "@tiptap/extension-link"

/**
 * Allows links to open in new tab by default
 */
export const LinkExtension = Link.configure({
  openOnClick: true,
  linkOnPaste: true,
  autolink: true,
  defaultProtocol: "https",
  protocols: ["http", "https", "mailto", "tel"],
  HTMLAttributes: {
    class: "link",
    rel: "noopener noreferrer",
    target: "_blank",
  },
})
