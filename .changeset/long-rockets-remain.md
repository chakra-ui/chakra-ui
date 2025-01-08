---
"@chakra-ui/react": minor
---

### Added

- **Clipboard**: Introduced `Clipboard.ValueText` to display clipboard content.
- **FileUpload**:
  - Added `preventDropOnDocument` to block file drops on the document when the
    file upload component is active.
  - Added `setClipboardFiles` to the API for setting files from clipboard data.
- **Progress**: Added support for`onValueChange` and `defaultValue`.
- **Tabs, Menu, Combobox**: Added `navigate` property for custom router
  navigation when selections render as links.
- **QrCode**:
  - Added support for `onValueChange` and `defaultValue`.
  - Added `QrCode.DownloadTrigger` to enable QR code image downloads.

### Fixed

- **Collapsible**: Fixed a bug where the opening animation replayed when an open
  collapsible was re-rendered.
- **Dialog, Popover**: Resolved an issue causing dialogs or popovers to close if
  the focused element was removed from the DOM.
- **FileUpload**: Fixed a bug causing the hidden input to desync from accepted
  files.
- **Menu, Popover**: Fixed inconsistent interaction detection outside the
  component when the trigger was inside a scrollable container.
- **Pagination**: Corrected an issue where the page range returned an incorrect
  `end` value when `pageSize` exceeded `count`.
- **QRCode**: Fixed `getDataUrl` to generate a properly sized QR code.
