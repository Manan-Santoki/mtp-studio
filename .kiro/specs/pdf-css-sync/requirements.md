# Requirements Document

## Introduction

This feature ensures that the PDF export functionality applies the exact same CSS styling (including syntax highlighting themes) that is visible in the live preview renderer. Currently, users can select document themes and add custom CSS in the UI, and while the preview correctly reflects these choices, the PDF export uses a hardcoded syntax highlighting theme instead of matching the preview.

## Glossary

- **PDF Generator**: The server-side component that converts markdown to PDF using Puppeteer
- **Live Preview**: The browser-based markdown renderer that displays styled content in real-time
- **Syntax Highlighting Theme**: The color scheme applied to code blocks (e.g., "github-dark", "github-light")
- **Document Theme**: The overall typography and color scheme for the document (e.g., "serif", "neutral", "midnight")
- **Custom CSS**: User-provided CSS rules that override or extend theme styles

## Requirements

### Requirement 1

**User Story:** As a user, I want the downloaded PDF to match exactly what I see in the live preview, so that I can confidently export documents without surprises.

#### Acceptance Criteria

1. WHEN the user views the live preview with a selected document theme, THE PDF Generator SHALL apply the identical document theme CSS to the exported PDF
2. WHEN the user adds custom CSS in the custom CSS textarea, THE PDF Generator SHALL include the identical custom CSS in the exported PDF
3. WHEN the live preview renders code blocks with syntax highlighting, THE PDF Generator SHALL apply the identical syntax highlighting theme to code blocks in the exported PDF
4. WHEN the user downloads a PDF, THE PDF Generator SHALL produce output that visually matches the live preview renderer

### Requirement 2

**User Story:** As a user, I want syntax highlighting in code blocks to be consistent between preview and PDF, so that my technical documentation looks professional.

#### Acceptance Criteria

1. THE PDF Generator SHALL use the same syntax highlighting theme as the Live Preview
2. WHEN the document theme is "midnight" (dark mode), THE PDF Generator SHALL apply a dark syntax highlighting theme
3. WHEN the document theme is "serif" or "neutral" (light mode), THE PDF Generator SHALL apply a light syntax highlighting theme
4. THE PDF Generator SHALL ensure code block styling matches the preview's code block appearance
