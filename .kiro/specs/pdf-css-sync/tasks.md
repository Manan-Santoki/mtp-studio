# Implementation Plan

- [x] 1. Add theme mapping function to themes module


  - Create `getHighlightThemeForDocumentTheme` function in `src/lib/themes.ts`
  - Map "midnight" theme to "github-dark" syntax highlighting
  - Map "serif" and "neutral" themes to "github-light" syntax highlighting
  - Export the function for use in PDF generation
  - _Requirements: 1.3, 2.1, 2.2, 2.3_



- [ ] 2. Update PDF generator to use dynamic syntax highlighting theme
  - Modify `renderMarkdownToPdf` function in `src/lib/pdf.ts`
  - Replace hardcoded "github-dark" with call to `getHighlightThemeForDocumentTheme(theme)`



  - Ensure the correct highlight.js CSS is loaded based on document theme
  - _Requirements: 1.1, 1.3, 2.1, 2.4_

- [ ] 3. Verify PDF output matches preview rendering
  - Test PDF generation with "midnight" theme and verify dark syntax highlighting
  - Test PDF generation with "serif" theme and verify light syntax highlighting
  - Test PDF generation with "neutral" theme and verify light syntax highlighting
  - Test PDF generation with custom CSS and verify it's applied correctly
  - _Requirements: 1.1, 1.2, 1.4, 2.4_
