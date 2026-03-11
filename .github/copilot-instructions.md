# Repository Coding Instructions

## Tech Stack

- Next.js App Router in app/
- React 19 with TypeScript
- ESLint via eslint.config.mjs

## Core Style

- Use TypeScript for new or updated code.
- Match existing style: single quotes, no semicolons, 2-space indentation.
- Prefer descriptive names and small focused functions.
- Add short comments only for non-obvious logic.

## App Architecture

- Default to server components; add 'use client' only when state, effects, or browser APIs are required.
- Keep route files simple and move reusable UI into app/components or local feature modules.
- Prefer existing path aliases when appropriate: @app, @comp, @config, @data.

## Data and Error Handling

- Handle fetch and parsing failures explicitly.
- Provide safe fallbacks for missing or invalid data.
- Avoid adding dependencies unless they are clearly justified by the task.

## Tests

- Use @testing-library/react and assert user-visible behavior.
- Prefer role/label/text assertions over broad snapshots.
- Mock browser/network APIs (for example EventSource) instead of using live services.

## Safe Editing Boundaries

- Do not change legacy assets under public/js, public/css, or public/modal unless explicitly requested.
- Keep changes scoped to the request and avoid unrelated refactors.

## Validation

- Run targeted linting for changed files before finalizing work.
- Recommended command pattern: pnpm eslint <changed files>
