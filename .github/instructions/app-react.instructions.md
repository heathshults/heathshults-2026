---
description: 'Use when editing React or Next.js app files under app/.'
applyTo: 'app/**/*.{ts,tsx}'
---

## App File Guidance

- Keep transformation logic in small helper functions when it improves readability.
- Use useMemo and useCallback when they solve closure or rerender concerns, not by default.
- For browser APIs, ensure setup and cleanup are paired and safe.
- Keep route entry files light and delegate complex UI logic to nearby modules.
- Preserve existing public interfaces unless the task requires an API change.
