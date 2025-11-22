# Design Document

## Overview

This design document outlines the approach for cleaning up a Markdown-to-PDF converter application that was built from a Registry Starter template. The cleanup will systematically remove unused registry showcase functionality while preserving the core MD-to-PDF conversion features.

The application's core functionality consists of:
- A markdown editor with live preview (PdfWorkbench component)
- PDF generation API endpoint
- Theme system for styling markdown output
- Custom CSS support for brand alignment

## Architecture

### Current State Analysis

The codebase currently contains:

**Core Application (Keep)**
- `/src/app/page.tsx` - Main page with PdfWorkbench
- `/src/app/api/pdf/route.ts` - PDF generation endpoint
- `/src/components/pdf-workbench/workbench.tsx` - Main editor component
- `/src/lib/themes.ts` - Theme system for markdown styling
- `/src/lib/sample-markdown.ts` - Sample content

**Registry Showcase (Remove)**
- `/src/app/(registry)/*` - Registry showcase pages
- `/src/app/demo/*` - Component demo pages
- `/src/components/registry/*` - Registry-specific components
- `/src/components/brand-*` - Brand showcase components
- `/src/components/hero.tsx`, `promo.tsx`, `product-grid.tsx`, `login.tsx`, `logo.tsx` - Unused showcase components
- `/src/layouts/*` - Layout components for registry showcase
- `/src/lib/registry.ts` - Registry management logic
- `/src/lib/products.ts` - Sample product data

**UI Components (Selective Keep)**
- Keep only UI components used by PdfWorkbench:
  - button, card, input, label, scroll-area, resizable, select, textarea, sonner (toast)
- Remove unused UI components (50+ components not used by core functionality)

### Dependency Analysis

**Dependencies to Keep**
- `react-markdown` - Markdown rendering
- `remark-gfm` - GitHub Flavored Markdown support
- `md-to-pdf` or `puppeteer` - PDF generation
- `lucide-react` - Icons (used in workbench)
- `sonner` - Toast notifications
- `next-themes` - Theme switching (if used)
- `class-variance-authority`, `clsx`, `tailwind-merge` - Styling utilities
- Core Next.js and React dependencies

**Dependencies to Remove**
- `@tanstack/react-table` - Not used in core app
- `@hookform/resolvers`, `react-hook-form`, `zod` - Form validation (only in unused login component)
- `react-day-picker`, `date-fns` - Calendar components not used
- `embla-carousel-react` - Carousel not used
- `input-otp` - OTP input not used
- `recharts` - Charts not used
- `vaul` - Drawer component not used
- `cmdk` - Command menu not used
- `radix-ui` - May be partially needed, analyze carefully

## Components and Interfaces

### Files to Delete

**Routes**
```
src/app/(registry)/
src/app/demo/
src/app/not-found.tsx (uses registry components)
src/app/robots.ts (if registry-specific)
```

**Components**
```
src/components/registry/
src/components/brand-header.tsx
src/components/brand-sidebar.tsx
src/components/hero.tsx
src/components/login.tsx
src/components/logo.tsx
src/components/product-grid.tsx
src/components/promo.tsx
```

**Layouts**
```
src/layouts/
```

**Lib Files**
```
src/lib/registry.ts
src/lib/products.ts
```

**UI Components** (Remove unused ones, keep only):
- button.tsx
- card.tsx
- input.tsx
- label.tsx
- scroll-area.tsx
- resizable.tsx
- select.tsx
- textarea.tsx
- sonner.tsx

**Configuration**
```
registry.json (entire file or simplify drastically)
components.json (may need updating)
```

### Files to Keep and Potentially Modify

**Core Application**
- `src/app/page.tsx` - May need layout updates
- `src/app/layout.tsx` - Simplify to remove registry dependencies
- `src/app/globals.css` - Keep but may simplify
- `src/app/api/pdf/route.ts` - Keep as-is
- `src/components/pdf-workbench/workbench.tsx` - Keep as-is
- `src/lib/themes.ts` - Keep as-is
- `src/lib/sample-markdown.ts` - Keep as-is
- `src/lib/utils.ts` - Keep (cn utility)

**Configuration**
- `package.json` - Update dependencies and metadata
- `README.md` - Rewrite to describe MD-to-PDF app
- `next.config.ts` - Keep as-is
- `tsconfig.json` - Keep as-is
- `tailwind.config.ts` - Keep as-is
- `biome.json` - Keep as-is

## Data Models

No database or complex data models are involved. The application works with:

**Input Data**
- Markdown text (string)
- Theme selection (ThemeKey enum)
- Custom CSS (string)
- File metadata (title, author, fileName)

**Output Data**
- PDF blob (binary)
- Preview HTML (rendered markdown)

## Error Handling

### Build Verification Strategy

After cleanup, verify:

1. **Build Success**: Run `pnpm build` to ensure no import errors
2. **Type Checking**: Ensure TypeScript compilation succeeds
3. **Runtime Testing**: 
   - Load the main page
   - Type markdown and verify live preview
   - Export PDF and verify download
   - Test theme switching
   - Test custom CSS application

### Rollback Strategy

- Perform cleanup in a git branch
- Commit incrementally after each major deletion category
- Test after each commit to identify issues quickly

## Testing Strategy

### Manual Testing Checklist

After cleanup completion:

1. **Page Load**: Verify main page loads without console errors
2. **Markdown Editor**: Type markdown and verify it appears in editor
3. **Live Preview**: Verify markdown renders correctly in preview pane
4. **Theme Selection**: Switch between themes and verify preview updates
5. **Custom CSS**: Add custom CSS and verify it applies to preview
6. **File Upload**: Upload a .md file and verify it loads
7. **Metadata**: Update title, author, filename fields
8. **PDF Export**: Click download and verify PDF generates and downloads
9. **PDF Content**: Open PDF and verify markdown is correctly rendered
10. **Responsive**: Test on different screen sizes

### Build Testing

```bash
# Clean install
rm -rf node_modules .next
pnpm install

# Build
pnpm build

# Start production server
pnpm start

# Verify no errors in console
```

## Implementation Phases

### Phase 1: Analysis and Preparation
- Document all imports and dependencies
- Create backup branch
- Identify exact files to delete vs keep

### Phase 2: Remove Routes
- Delete `src/app/(registry)` directory
- Delete `src/app/demo` directory
- Update `src/app/not-found.tsx` if needed
- Test build

### Phase 3: Remove Components
- Delete `src/components/registry` directory
- Delete unused brand/showcase components
- Delete `src/layouts` directory
- Test build

### Phase 4: Remove Unused UI Components
- Analyze which UI components are actually imported
- Delete unused UI components from `src/components/ui`
- Test build

### Phase 5: Clean Library Files
- Delete `src/lib/registry.ts`
- Delete `src/lib/products.ts`
- Keep `src/lib/utils.ts`, `src/lib/themes.ts`, `src/lib/sample-markdown.ts`
- Test build

### Phase 6: Update Dependencies
- Remove unused dependencies from `package.json`
- Run `pnpm install` to update lockfile
- Test build

### Phase 7: Update Configuration and Documentation
- Simplify or remove `registry.json`
- Update `README.md` with MD-to-PDF documentation
- Update `package.json` name and description
- Remove registry-related scripts if any

### Phase 8: Final Verification
- Run full build
- Test all core functionality manually
- Verify bundle size reduction
- Check for any console warnings/errors

## Success Criteria

- Application builds without errors
- All core MD-to-PDF functionality works
- No unused dependencies in package.json
- No unused files in src directory
- README accurately describes the application
- Reduced bundle size
- Clean console (no warnings about missing modules)
