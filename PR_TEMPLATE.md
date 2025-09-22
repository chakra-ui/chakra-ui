# Fix CodeBlock line number indexing inconsistency and diff alignment

## Description

This PR fixes three related bugs in the CodeBlock component:

1. **Inconsistent line number indexing**: `meta.highlightLines` was 0-based while other line number properties were 1-based
2. **Misaligned diff symbols**: The +/- symbols didn't align with highlighted lines due to indexing inconsistency  
3. **Documentation error**: Docs incorrectly mentioned `meta.highlightLines` instead of `meta.focusedLineNumbers` in the Diff section

## Changes Made

### Core Fixes
- **`packages/react/src/components/code-block/adapters.ts`**: Made `highlightLines` consistently 1-based in both Shiki and HighlightJS adapters
- **`packages/react/src/components/code-block/types.ts`**: Added documentation clarifying all line numbers are 1-based

### Documentation Fixes  
- **`apps/www/content/docs/components/code-block.mdx`**: Fixed incorrect reference to `meta.highlightLines` in Line focus section
- **`apps/compositions/src/examples/code-block-with-line-highlight.tsx`**: Updated example to use correct 1-based indexing

## Testing

Created test files to verify fixes:
- `test-codeblock-fixes.tsx` - Tests Shiki adapter with all line number features
- `test-highlightjs-fixes.tsx` - Tests HighlightJS adapter with line number features

## Breaking Change

⚠️ **This is a breaking change** for users currently using `meta.highlightLines` with 0-based indexing. They will need to update their line numbers to be 1-based.

### Migration Guide

**Before:**
```tsx
meta={{ highlightLines: [0, 1] }} // 0-based
```

**After:**
```tsx
meta={{ highlightLines: [1, 2] }} // 1-based
```

## Fixes

Closes #[issue-number] (replace with actual issue number)

## Screenshots

The diff symbols now properly align with their corresponding highlighted lines, and all line number properties use consistent 1-based indexing.

## Checklist

- [x] Fixed inconsistent line number indexing
- [x] Fixed misaligned diff symbols  
- [x] Fixed documentation error
- [x] Updated examples to use correct indexing
- [x] Added documentation clarifying 1-based indexing
- [x] Created test files to verify fixes
- [x] Considered backward compatibility impact