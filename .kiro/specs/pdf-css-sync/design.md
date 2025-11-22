# Design Document

## Overview

This design addresses the CSS synchronization issue between the live preview and PDF export. Currently, the PDF generation hardcodes the syntax highlighting theme to "github-dark" regardless of the document theme selected by the user. The solution involves mapping document themes to appropriate syntax highlighting themes and ensuring the PDF generator uses the same CSS as the preview.

## Architecture

The fix involves three main components:

1. **Theme Mapping Logic**: A function that maps document themes (serif, neutral, midnight) to appropriate syntax highlighting themes (github-light, github-dark)
2. **PDF Generator Update**: Modify `renderMarkdownToPdf` to accept and use the correct syntax highlighting theme
3. **API Route Update**: Ensure the API passes the theme information to the PDF generator

### Current Flow

```
User selects theme → Preview renders with theme CSS + hardcoded github-dark hljs
User clicks download → API receives theme → PDF generator uses theme CSS + hardcoded github-dark hljs
```

### Proposed Flow

```
User selects theme → Preview renders with theme CSS + mapped hljs theme
User clicks download → API receives theme → PDF generator uses theme CSS + mapped hljs theme
```

## Components and Interfaces

### 1. Theme Mapping Function

**Location**: `src/lib/themes.ts`

**Function Signature**:
```typescript
export function getHighlightThemeForDocumentTheme(themeKey: ThemeKey): "github-light" | "github-dark"
```

**Logic**:
- `midnight` theme → `"github-dark"` (dark background)
- `serif` theme → `"github-light"` (light background)
- `neutral` theme → `"github-light"` (light background)

**Rationale**: The midnight theme has a dark background (`--md-bg: #0b1120`), so it needs dark syntax highlighting. The serif and neutral themes have light backgrounds, so they need light syntax highlighting.

### 2. PDF Generator Update

**Location**: `src/lib/pdf.ts`

**Changes**:
- Replace hardcoded `"github-dark"` with dynamic theme selection
- Use the new `getHighlightThemeForDocumentTheme` function to determine the correct syntax highlighting theme

**Before**:
```typescript
const hljsCss = await loadHljsCss("github-dark");
```

**After**:
```typescript
const highlightTheme = getHighlightThemeForDocumentTheme(theme);
const hljsCss = await loadHljsCss(highlightTheme);
```

### 3. Preview Consistency (Optional Enhancement)

**Location**: `src/components/pdf-workbench/workbench.tsx`

**Current State**: The preview uses ReactMarkdown with `remark-gfm` but doesn't explicitly apply highlight.js CSS. The syntax highlighting in the preview may be handled differently than in the PDF.

**Consideration**: For true WYSIWYG, the preview should also use the same highlight.js theme. However, this may require additional investigation into how ReactMarkdown handles syntax highlighting.

## Data Models

No new data models are required. The existing `ThemeKey` type and `RenderMarkdownToPdfOptions` interface remain unchanged.

## Error Handling

### Invalid Theme Handling

The existing `isThemeKey` function already validates theme keys. If an invalid theme is provided:
- The API route defaults to `"serif"`
- The mapping function will return `"github-light"` for serif

### Missing Highlight Theme

The existing `loadHljsCss` function already handles missing themes by falling back to `github-dark`. This behavior is preserved.

## Testing Strategy

### Manual Testing

1. **Test Case 1: Midnight Theme**
   - Select "Midnight Focus" theme
   - Add markdown with code blocks
   - Verify preview shows dark syntax highlighting
   - Download PDF
   - Verify PDF shows dark syntax highlighting matching preview

2. **Test Case 2: Serif Theme**
   - Select "Editorial Serif" theme
   - Add markdown with code blocks
   - Verify preview shows light syntax highlighting
   - Download PDF
   - Verify PDF shows light syntax highlighting matching preview

3. **Test Case 3: Neutral Theme**
   - Select "Modern Neutral" theme
   - Add markdown with code blocks
   - Verify preview shows light syntax highlighting
   - Download PDF
   - Verify PDF shows light syntax highlighting matching preview

4. **Test Case 4: Custom CSS**
   - Select any theme
   - Add custom CSS
   - Verify preview applies custom CSS
   - Download PDF
   - Verify PDF applies custom CSS (already working, regression test)

### Edge Cases

- Empty markdown content (already handled by existing validation)
- Markdown without code blocks (no impact)
- Very long code blocks (no impact on theme selection)

## Implementation Notes

### Minimal Changes

This design intentionally keeps changes minimal:
- One new function in `themes.ts`
- One line change in `pdf.ts`
- No changes to API routes or component interfaces

### Backward Compatibility

All existing functionality is preserved. The change only affects which syntax highlighting theme is used, not the overall structure or API.

### Future Enhancements

If users want more control over syntax highlighting themes in the future, we could:
- Add a separate dropdown for syntax highlighting theme selection
- Support more highlight.js themes beyond github-light and github-dark
- Allow custom syntax highlighting CSS

However, these are out of scope for this fix, which focuses on making the PDF match the preview.
