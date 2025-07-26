---
"@chakra-ui/react": patch
---

- **Tree View**
  - Fixed issue where tree view doesn't scroll into view when content overflows
  - Fix issue where the `filter` method completely deletes the children key from
    the node when there are no matching children

- **File Upload**
  - Add support for programmatically controlling the accepted files via
    `acceptedFiles` and `defaultAcceptedFiles`
  - Export `FileError`, `FileMimeType`, and `FileRejection` types and fix
    validation issues
