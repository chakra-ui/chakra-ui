"use client"

import { Badge, Box, HStack, Text } from "@chakra-ui/react"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { RichTextEditor } from "compositions/ui/rich-text-editor"
import * as Control from "compositions/ui/rich-text-editor-control"
import { useCallback, useEffect, useRef, useState } from "react"
import { LuCheck, LuCloud, LuLoader } from "react-icons/lu"

type SaveStatus = "idle" | "saving" | "saved" | "error"

export const RichTextEditorWithAutosave = () => {
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle")
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Simulate saving to server
  const saveContent = useCallback(async (content: string) => {
    setSaveStatus("saving")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Save to localStorage as demo
    localStorage.setItem("autosave-content", content)

    setSaveStatus("saved")
    setLastSaved(new Date())

    // Reset status after 2 seconds
    setTimeout(() => setSaveStatus("idle"), 2000)
  }, [])

  // Load saved content on mount
  const getSavedContent = () => {
    if (typeof window === "undefined") return null
    return localStorage.getItem("autosave-content")
  }

  const editor = useEditor({
    extensions: [StarterKit],
    content:
      getSavedContent() ||
      `<p>Start typing... your content will be automatically saved.</p>
       <p>Try making some changes and watch the save indicator.</p>`,
    shouldRerenderOnTransaction: true,
    onUpdate: ({ editor }) => {
      // Debounce autosave
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }

      saveTimeoutRef.current = setTimeout(() => {
        saveContent(editor.getHTML())
      }, 1000) // Save after 1 second of inactivity
    },
  })

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
    }
  }, [])

  if (!editor) return null

  const formatLastSaved = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const seconds = Math.floor(diff / 1000)

    if (seconds < 60) return "just now"
    if (seconds < 120) return "1 minute ago"
    return `${Math.floor(seconds / 60)} minutes ago`
  }

  return (
    <Box>
      <RichTextEditor.Root editor={editor} borderWidth="1px" rounded="l2">
        <RichTextEditor.Toolbar>
          <RichTextEditor.ControlGroup>
            <Control.Bold />
            <Control.Italic />
            <Control.Underline />
          </RichTextEditor.ControlGroup>

          <RichTextEditor.ControlGroup>
            <Control.BulletList />
            <Control.OrderedList />
          </RichTextEditor.ControlGroup>

          <RichTextEditor.ControlGroup>
            <Control.Undo />
            <Control.Redo />
          </RichTextEditor.ControlGroup>

          <HStack flex="1" justify="flex-end" gap="2">
            <Badge
              variant="subtle"
              colorPalette={
                saveStatus === "saving"
                  ? "yellow"
                  : saveStatus === "saved"
                    ? "green"
                    : "gray"
              }
            >
              <HStack gap="1">
                {saveStatus === "saving" && (
                  <LuLoader className="animate-spin" />
                )}
                {saveStatus === "saved" && <LuCheck />}
                {saveStatus === "idle" && <LuCloud />}
                <Text>
                  {saveStatus === "saving" && "Saving..."}
                  {saveStatus === "saved" && "Saved"}
                  {saveStatus === "idle" &&
                    (lastSaved
                      ? `Saved ${formatLastSaved(lastSaved)}`
                      : "Draft")}
                </Text>
              </HStack>
            </Badge>
          </HStack>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor.Root>
    </Box>
  )
}
