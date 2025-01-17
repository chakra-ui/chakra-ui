---
"@chakra-ui/react": patch
---

- **Separator**: Fix issue where `aria-orientation` was missing in the DOM and
  `orientation` was added instead.

- **FileUpload**
  - Resolved an issue where form-related components reset despite the reset
    event being cancelled.
  - Fixed a brief warning display when a new image file is added to the preview.
  - Enhanced click detection for the dropzone and added support for the
    `disableClick` prop.
