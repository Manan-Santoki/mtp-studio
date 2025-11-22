# Requirements Document

## Introduction

This document defines the requirements for cleaning up a Markdown-to-PDF converter codebase that was built from a Registry Starter template. The cleanup will remove unused registry/component showcase functionality while preserving the core MD-to-PDF conversion and live rendering features.

## Glossary

- **Application**: The Markdown-to-PDF converter web application
- **Registry Components**: UI components and pages related to the shadcn/ui registry showcase functionality
- **Core Functionality**: The markdown editing, live preview, and PDF export features
- **Unused Files**: Files, components, routes, and dependencies that are not used by the core functionality

## Requirements

### Requirement 1

**User Story:** As a developer, I want to identify all unused files and components, so that I can understand what needs to be removed

#### Acceptance Criteria

1. WHEN the codebase analysis is performed, THE Application SHALL identify all registry-related routes that are not used by the core functionality
2. WHEN the codebase analysis is performed, THE Application SHALL identify all registry-related components that are not imported by the core functionality
3. WHEN the codebase analysis is performed, THE Application SHALL identify all unused UI components from the shadcn/ui library
4. WHEN the codebase analysis is performed, THE Application SHALL identify all unused dependencies in package.json

### Requirement 2

**User Story:** As a developer, I want to remove unused routes and pages, so that the application only contains necessary code

#### Acceptance Criteria

1. THE Application SHALL remove the registry showcase routes located in app/(registry)
2. THE Application SHALL remove the demo routes located in app/demo
3. THE Application SHALL preserve the main page route that contains the PDF workbench
4. THE Application SHALL preserve the PDF API route

### Requirement 3

**User Story:** As a developer, I want to remove unused components, so that the codebase is minimal and maintainable

#### Acceptance Criteria

1. THE Application SHALL remove all registry-specific components from components/registry directory
2. THE Application SHALL remove unused brand components that are not used by the core functionality
3. THE Application SHALL preserve the pdf-workbench component and its dependencies
4. THE Application SHALL preserve only the UI components that are actively used by the PDF workbench

### Requirement 4

**User Story:** As a developer, I want to remove unused dependencies, so that the bundle size is optimized and maintenance is simplified

#### Acceptance Criteria

1. THE Application SHALL remove dependencies that are only used by registry functionality
2. THE Application SHALL preserve dependencies required for markdown rendering
3. THE Application SHALL preserve dependencies required for PDF generation
4. THE Application SHALL preserve dependencies required for the UI components used by the workbench

### Requirement 5

**User Story:** As a developer, I want to update configuration files, so that they reflect the simplified application structure

#### Acceptance Criteria

1. THE Application SHALL update the README.md to describe the Markdown-to-PDF converter functionality
2. THE Application SHALL remove registry-related configuration from registry.json if not needed
3. THE Application SHALL update package.json metadata to reflect the application purpose
4. THE Application SHALL preserve all necessary build and development scripts

### Requirement 6

**User Story:** As a developer, I want to verify the cleanup, so that I can ensure the core functionality still works

#### Acceptance Criteria

1. WHEN the cleanup is complete, THE Application SHALL build successfully without errors
2. WHEN the cleanup is complete, THE Application SHALL render the markdown editor interface
3. WHEN the cleanup is complete, THE Application SHALL generate PDF files from markdown input
4. WHEN the cleanup is complete, THE Application SHALL display live markdown preview
