# CodeBlock Bug Fixes Verification

## Issues Fixed

### 1. Inconsistent Line Number Indexing
**Problem**: `meta.highlightLines` was 0-based while `meta.removedLineNumbers`, `meta.addedLineNumbers`, and `meta.focusedLineNumbers` were 1-based.

**Solution**: Made all line number properties consistently 1-based.

**Files Changed**:
- `packages/react/src/components/code-block/adapters.ts` - Updated both Shiki and HighlightJS adapters
- `packages/react/src/components/code-block/types.ts` - Added documentation clarifying 1-based indexing
- `apps/compositions/src/examples/code-block-with-line-highlight.tsx` - Updated example to use correct 1-based indexing

### 2. Misaligned Diff Symbols
**Problem**: The +/- symbols in diff view didn't align with the highlighted lines due to indexing inconsistency.

**Solution**: With consistent 1-based indexing, the diff symbols now properly align with their corresponding highlighted lines.

### 3. Documentation Error
**Problem**: In the "Line focus" section of the docs, it mentioned `meta.highlightLines` instead of `meta.focusedLineNumbers`.

**Solution**: Updated the documentation to correctly reference `meta.focusedLineNumbers`.

**Files Changed**:
- `apps/www/content/docs/components/code-block.mdx` - Fixed the documentation error

## Testing

To verify the fixes work correctly:

1. **Line Highlighting**: Use `meta.highlightLines: [2, 5]` - should highlight lines 2 and 5 (1-based)
2. **Diff View**: Use `meta.addedLineNumbers: [2]` and `meta.removedLineNumbers: [4]` - the + symbol should appear on line 2 and - symbol on line 4
3. **Line Focus**: Use `meta.focusedLineNumbers: [3, 6]` - should focus lines 3 and 6
4. **Combined**: All features should work together without conflicts

## Backward Compatibility

⚠️ **Breaking Change**: This is a breaking change for users who were using `meta.highlightLines` with 0-based indexing. They will need to update their line numbers to be 1-based.

However, this change makes the API consistent and fixes the alignment issues, which is more important than maintaining the inconsistent behavior.

## Examples

### Before (Broken)
```tsx
// This was inconsistent and caused alignment issues
meta={{
  highlightLines: [0, 1], // 0-based
  addedLineNumbers: [1, 2], // 1-based
  removedLineNumbers: [3], // 1-based
}}
```

### After (Fixed)
```tsx
// Now all line numbers are consistently 1-based
meta={{
  highlightLines: [1, 2], // 1-based
  addedLineNumbers: [1, 2], // 1-based
  removedLineNumbers: [3], // 1-based
}}
```