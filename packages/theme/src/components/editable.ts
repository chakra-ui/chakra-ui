const parts = {
  preview: "the editable text preview",
  input: "the editable input field",
}

const baseStylePreview = {
  borderRadius: "md",
  py: "3px",
  transition: "all 0.2s",
}

const baseStyleInput = {
  borderRadius: "md",
  py: "3px",
  transition: "all 0.2s",
  width: "full",
  _focus: { boxShadow: "outline" },
  _placeholder: { opacity: 0.6 },
}

const baseStyle = {
  preview: baseStylePreview,
  input: baseStyleInput,
}

export const Editable = {
  parts,
  baseStyle,
}
