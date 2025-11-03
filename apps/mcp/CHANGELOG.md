## [Unreleased]

## [2.1.1] - 2025-11-03

### Fixed

- **MCP Server**: Fix OpenAI Codex compatibility by removing stdout logging,
  downgrading Zod to v3.23.8, and upgrading MCP SDK to v1.20.2

## [2.1.0] - 2025-08-14

### Added

- New installation tool to install Chakra UI from scratch
- Support for Chakra UI Pro Blocks

## [2.0.5] - 2025-07-28

### Fixed

- Fix `v2_to_v3_code_review` tool to run snippet command

## [2.0.4] - 2025-07-28

### Fixed

- Improve `v2_to_v3_code_review` tool to cover more migration scenarios

## [2.0.3] - 2025-07-28

### Fixed

- Improve `v2_to_v3_code_review` tool to use the correct props for Dialog,
  Drawer, Editable, and Collapse

## [2.0.2] - 2025-07-28

### Fixed

- Fix duplicate categories in `customize_theme` tool
- Fix duplicate component names in `get_component_example` tool

## [2.0.1] - 2025-07-28

### Fixed

- Add missing node shebang to stdio entrypoint

## [2.0.0] - 2025-07-28

### Added

- Initial release of the official MCP server for Chakra UI
