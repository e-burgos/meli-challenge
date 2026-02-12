# TypeScript reference

## Strict options (tsconfig)

| Option | Effect |
|--------|--------|
| `strict` | Master switch; enables the options below |
| `noImplicitAny` | Error when type would be implicitly `any` |
| `strictNullChecks` | `null` and `undefined` are separate; must be explicit in types |
| `strictFunctionTypes` | Stricter checking of function types |
| `strictPropertyInitialization` | Class properties must be initialized or have definite assignment |
| `strictBindCallApply` | Stricter `bind`, `call`, `apply` |
| `noImplicitThis` | Error when `this` has implicit `any` |
| `noUnusedLocals` | Error on unused local variables |
| `noUnusedParameters` | Error on unused parameters |
| `exactOptionalPropertyTypes` | Optional properties cannot be explicitly `undefined` |

Enable at least `strict: true`; add others as needed.

## Built-in utility types

| Utility | Description |
|---------|-------------|
| `Partial<T>` | All properties of T optional |
| `Required<T>` | All properties of T required |
| `Readonly<T>` | All properties of T readonly |
| `Pick<T, K>` | T with only keys in K |
| `Omit<T, K>` | T without keys in K |
| `Record<K, V>` | Object with keys K and values V |
| `Exclude<T, U>` | T minus assignable-to-U |
| `Extract<T, U>` | T assignable to U |
| `NonNullable<T>` | T excluding null and undefined |
| `Parameters<T>` | Tuple of parameters of function T |
| `ReturnType<T>` | Return type of function T |
| `InstanceType<T>` | Instance type of constructor T |
| `Awaited<T>` | Unwraps Promise-like T |

## Type guards

```ts
function isString(x: unknown): x is string {
  return typeof x === "string";
}

function isDefined<T>(x: T | null | undefined): x is T {
  return x != null;
}
```

Use `x is T` in return type for narrowing in conditionals.

## satisfies

```ts
const config = {
  theme: "dark",
  count: 10,
} satisfies { theme: string; count: number };
// config.theme is "dark", config.count is number; no widening to { theme: string; count: number }
```

Use when you need to check a value against a type but keep the narrowest inferred type.
