# React reference

## Rules of Hooks (summary)

1. Only call hooks at the **top level** (not in loops, conditions, or nested functions).
2. Only call hooks from **React function components** or **custom hooks**.

Violations can cause bugs (e.g. hooks called in different order between renders). Use `eslint-plugin-react-hooks`.

## Purity (summary)

- **Same inputs → same output**: No randomness, no reading mutable global state during render.
- **No side effects during render**: No network, no subscriptions, no DOM updates, no mutating external state. Put these in `useEffect` or event handlers.
- **No mutating props or state**: Treat them as read-only; update state via setState with new values.

## useMemo / useCallback (when to use)

| Use | When |
|-----|------|
| `useMemo` | Expensive computation; dependencies stable; or preventing referential change that would break a memoized child’s props. |
| `useCallback` | Passing callback to a **memoized** child (React.memo) or when the callback is in a dependency array of useEffect/useMemo and identity matters. |
| Skip both | Cheap work; no memoized children; no measured performance issue. React Compiler (when enabled) can auto-memoize in many cases. |

## Server Components vs Client Components

| | Server Component | Client Component |
|--|------------------|------------------|
| Where runs | Server (build or request) | Browser |
| Hooks | No | Yes |
| Browser APIs | No | Yes |
| Async component | Yes (async function component) | No |
| Directive | Default in RSC-enabled frameworks | `"use client"` |
| Use for | Data fetching, static content, large deps you don’t want in bundle | Interactivity, hooks, DOM |

## Server Actions ('use server')

- Place `'use server'` at the top of a file (all exports become Server Actions) or at the top of an async function.
- Arguments are serialized and sent to the server; treat them as untrusted and validate/authorize.
- Call from client inside `useTransition` or pass to form `action`; do not rely on return value for real-time UI without transition/optimistic updates.

## Key patterns

- **Compound components**: Parent + children share state via context; consumer composes which children to use (e.g. Tabs + TabList + Tab + TabPanels + TabPanel).
- **Controlled vs uncontrolled**: Prefer controlled components (value + onChange) for forms when you need to validate or transform; use uncontrolled (ref + defaultValue) when you only need the value on submit.
- **Lifting state up**: When two components need to reflect the same changing data, move the state to their common parent and pass it down (or use context if the tree is deep).
