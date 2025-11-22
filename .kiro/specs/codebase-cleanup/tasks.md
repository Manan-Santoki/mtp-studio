# Implementation Plan

- [x] 1. Analyze and document current dependencies


  - Scan all imports in the pdf-workbench component to identify required UI components
  - Create a list of all UI components currently in use by the core functionality
  - Identify which dependencies in package.json are actually used by the core app
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [x] 2. Remove unused route directories


- [x] 2.1 Delete the registry showcase routes


  - Remove the entire `src/app/(registry)` directory
  - _Requirements: 2.1_

- [x] 2.2 Delete the demo routes


  - Remove the entire `src/app/demo` directory
  - _Requirements: 2.1_

- [x] 2.3 Update or remove not-found page


  - Check if `src/app/not-found.tsx` uses registry components
  - Either update it to remove registry dependencies or delete it to use Next.js default
  - _Requirements: 2.1_

- [x] 3. Remove unused component directories


- [x] 3.1 Delete registry-specific components


  - Remove the entire `src/components/registry` directory
  - _Requirements: 3.1_

- [x] 3.2 Delete unused brand and showcase components


  - Remove `src/components/brand-header.tsx`
  - Remove `src/components/brand-sidebar.tsx`
  - Remove `src/components/hero.tsx`
  - Remove `src/components/login.tsx`
  - Remove `src/components/logo.tsx`
  - Remove `src/components/product-grid.tsx`
  - Remove `src/components/promo.tsx`
  - _Requirements: 3.2_

- [x] 3.3 Delete layouts directory


  - Remove the entire `src/layouts` directory
  - _Requirements: 3.2_

- [x] 4. Remove unused UI components




- [ ] 4.1 Identify and delete unused shadcn/ui components
  - Based on the analysis from task 1, remove UI components not used by pdf-workbench
  - Keep only: button, card, input, label, scroll-area, resizable, select, textarea, sonner

  - Remove all other components from `src/components/ui`
  - _Requirements: 3.4_

- [x] 5. Clean up library files

- [x] 5.1 Remove registry and product library files


  - Delete `src/lib/registry.ts` if it exists
  - Delete `src/lib/products.ts` if it exists
  - Verify `src/lib/utils.ts`, `src/lib/themes.ts`, and `src/lib/sample-markdown.ts` are preserved
  - _Requirements: 3.3, 3.4_

- [x] 6. Update application layout



- [x] 6.1 Simplify root layout

  - Update `src/app/layout.tsx` to remove any registry-related imports or providers
  - Ensure it only includes necessary providers for the core app (theme provider, toast provider)
  - _Requirements: 2.3, 3.3_

- [x] 7. Remove unused dependencies from package.json


- [x] 7.1 Remove unused npm packages


  - Remove `@tanstack/react-table`
  - Remove `@hookform/resolvers`, `react-hook-form`, `zod`
  - Remove `react-day-picker`, `date-fns`
  - Remove `embla-carousel-react`
  - Remove `input-otp`
  - Remove `recharts`
  - Remove `vaul`
  - Remove `cmdk`
  - Remove `radix-ui` if not needed by remaining UI components
  - _Requirements: 4.1, 4.2, 4.3, 4.4_


- [x] 7.2 Update package.json metadata

  - Change `name` to reflect MD-to-PDF application
  - Update `description` to describe the markdown to PDF converter
  - Remove or update registry-related scripts if any exist
  - _Requirements: 5.1, 5.3_


- [x] 7.3 Reinstall dependencies

  - Run `pnpm install` to update the lockfile
  - _Requirements: 4.4_





- [x] 8. Update configuration files


- [ ] 8.1 Handle registry.json
  - Delete `registry.json` entirely as it's only used for the registry showcase



  - _Requirements: 5.2_

- [ ] 8.2 Update components.json if needed
  - Verify `components.json` configuration is still valid
  - Update if necessary to reflect remaining components
  - _Requirements: 5.2_

- [ ] 9. Update documentation
- [x] 9.1 Rewrite README.md


  - Replace registry starter documentation with MD-to-PDF converter documentation
  - Include: project description, features, installation, usage, development instructions
  - Remove all references to registry, v0, MCP for registry, component showcase
  - _Requirements: 5.1_

- [ ] 10. Verify build and functionality
- [ ] 10.1 Run production build
  - Execute `pnpm build` to ensure no import errors or build failures
  - Fix any build errors that arise from the cleanup
  - _Requirements: 6.1_

- [ ] 10.2 Test core functionality
  - Start the development server
  - Verify the main page loads without errors
  - Test markdown editing and live preview
  - Test theme switching
  - Test custom CSS application
  - Test file upload functionality
  - Test PDF export and download
  - _Requirements: 6.2, 6.3, 6.4_

- [ ] 10.3 Verify no console errors
  - Check browser console for any warnings or errors
  - Check terminal for any build warnings
  - Address any issues found
  - _Requirements: 6.1_
