# Changelog Generation Command

Generate a new changelog entry by reading all changeset files and creating a
properly formatted entry in `.changelog/v3.mdx`.

## Process

1. **Read all changeset files** from `.changeset/*.md` (exclude
   `.changeset/README.md`)

2. **Parse each changeset file**:
   - Extract frontmatter (YAML between `---` markers) to get:
     - Package name(s) affected (e.g., `"@chakra-ui/react": patch`)
     - Version bump type: `patch`, `minor`, or `major`
   - Extract the description after the frontmatter
   - Look for code snippets (markdown code blocks with triple backticks)

3. **Determine the next version**:
   - Find the current version from the latest entry in `.changelog/v3.mdx`
   - Calculate next version based on highest bump type found in changesets:
     - `major`: X.0.0 (breaking changes)
     - `minor`: X.Y.0 (new features)
     - `patch`: X.Y.Z (bug fixes)

4. **Group changes by component**:
   - Extract component name from package

5. **Categorize changes**:
   - **Added**: New features, new APIs, new components (usually `minor` version
     bumps)
     - Look for keywords: "Add support", "Added", "New", "[NEW]",
       "[Experimental]"
   - **Fixed**: Bug fixes (usually `patch` version bumps)
     - Look for keywords: "Fix issue", "Fixed", "Resolve", "Ensure"
   - **Changed**: Breaking changes, refactors, improvements (usually `major`
     version bumps)
     - Look for keywords: "Breaking", "Redesign", "Refactor", "Change default"

6. **Format the entry** using this template:

````markdown
## [X.Y.Z](./#X.Y.Z) - YYYY-MM-DD

### Added

- **Component Name**
  - Description of what was added
  - Can include multiple bullet points

  ```ts
  // Include code snippets if found in changeset
  const example = "code"
  ```
````

### Fixed

- **Component Name**: Description of fix (use colon for single-line fixes)
- **Component Name**
  - Description of fix (use bullet points for multi-line)
  - Another fix detail

### Changed

- **Component Name**
  - Description of change
  - Impact or migration note

````

## Important Formatting Rules

1. **Version format**: `## [X.Y.Z](./#X.Y.Z) - YYYY-MM-DD`
2. **Date**: Use today's date in YYYY-MM-DD format (e.g., 2025-10-14)
3. **Component names**: Use proper title case with spaces
4. **Single-line vs multi-line**:
   - Single fix: `- **Component**: Fix issue where...`
   - Multiple fixes: Use bullet points under component name
5. **Code snippets**: Include if present in changeset, maintain original formatting
6. **Order**: Added � Fixed � Changed (omit sections if empty)
7. **Alphabetical**: Sort components alphabetically within each section

## Common Patterns

### Changeset Format
```markdown
---
"@chakra-ui/react": patch
---

Fix issue where something doesn't work
````

### Multiple Packages

```markdown
---
"@chakra-ui/react": patch
"@chakra-ui/cli": minor
---

Add new feature that affects multiple components
```

### With Code Snippet

```markdown
---
"@chakra-ui/react": minor
---

Add support for `newProp` option in Accordion component
```

## Tips

- Group related changes under one component heading
- Use clear, concise descriptions
- Preserve technical details and API names (use backticks for code)
- Include migration examples for breaking changes
- Maintain consistent terminology with existing changelog entries
- Today's date is: **{CURRENT_DATE}** (use this for the changelog entry)

## Workflow

1. Run this command
2. Review all changeset files in `.changeset/*.md`
3. Determine next version (check `.changelog/v3.mdx` for current version)
4. Group and categorize all changes
5. Write formatted entry to the TOP of `.changelog/v3.mdx` (after the header,
   before existing entries)
6. Preserve all existing changelog entries
7. Verify formatting matches existing entries
