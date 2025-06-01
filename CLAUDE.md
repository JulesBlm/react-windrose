# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

- `npm run dev` - Start the development server
- `npm run build` - Build the project
- `npm run lint` - Run ESLint
- `npm run preview` - Preview the production build
- `npm test` - Run tests in watch mode
- `npm run test:run` - Run tests once
- `npm run test:ui` - Run tests with UI interface

## Code Style Guidelines

- **TypeScript**: Use strict type checking; avoid `any` types
- **Imports**: Group imports by source (React, internal components, types, utils)
- **Formatting**: Use proper indentation, semi-colons, and trailing commas
- **Types**: Use generic types for flexibility; use Prettify utility for cleaner types
- **Component Props**: Define interfaces with clear property types
- **Naming**: Use PascalCase for components, camelCase for variables/functions
- **Error Handling**: Handle edge cases and provide sensible defaults
- **Constants**: Use uppercase for constants (e.g., TURN = 360)
- **React Patterns**: Use functional components with hooks; leverage useMemo for computations
- **D3 Integration**: Use D3 utilities for data transformation and scale creation

## Notes

- This is a React component library for wind rose diagrams
- Uses Vite as the build tool and TypeScript for type safety
- Integrates D3 libraries for data visualization
