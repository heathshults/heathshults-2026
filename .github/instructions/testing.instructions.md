---
description: 'Use when creating or editing test files.'
applyTo: '**/*.test.tsx'
---

## Testing Guidance

- Prefer behavior-oriented tests that reflect what users can see or do.
- Mock external dependencies and browser-only APIs to keep tests deterministic.
- Cover both success and failure states for async or streaming logic.
- Keep assertions explicit and focused; avoid brittle implementation-detail checks.
