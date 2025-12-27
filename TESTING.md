# Testing

This document describes the testing approach for the Discr Web project.

## Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage report
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch

# Run a specific test file
npm test -- __tests__/path/to/test.tsx
```

## Coverage Requirements

This project maintains **100% test coverage** across all metrics:

- Statements: 100%
- Branches: 100%
- Functions: 100%
- Lines: 100%

## Coverage Ignores

In rare cases, code may be intentionally excluded from coverage using Istanbul
ignore comments. Each exclusion must be documented here with justification.

### Current Exclusions

| File | Line | Type | Reason |
|------|------|------|--------|
| `src/app/ship-order/page.tsx` | 18 | `/* istanbul ignore if */` | Defensive check for missing token in `handleSubmit`. This code path is unreachable because the form component is not rendered when the token is missing (the component returns early with an "Invalid Link" view at line 160). The check exists as a safety guard but cannot be triggered through normal React rendering. |

## Adding New Coverage Ignores

Before adding a coverage ignore comment:

1. **Exhaust all testing options** - Try mocking, dependency injection, or
   restructuring code to make it testable
2. **Verify the code is truly unreachable** - Defensive checks for impossible
   states may be valid candidates
3. **Document the exclusion** - Add an entry to the table above with clear
   justification
4. **Include inline reasoning** - Use the format:
   `/* istanbul ignore <type> -- <reason> */`

Valid ignore types:

- `if` - Ignore an if statement
- `else` - Ignore an else branch
- `next` - Ignore the next statement/expression

## Test Structure

Tests are organized in the `__tests__/` directory, mirroring the `src/`
structure:

```text
__tests__/
├── app/
│   └── api/
│       └── sentry-tunnel/
│           └── route.test.ts
├── components/
│   ├── ErrorReporterInit.test.tsx
│   └── landing/
│       ├── AppScreenshots.test.tsx
│       ├── Features.test.tsx
│       └── ...
├── d/
│   └── [code]/
│       ├── page.test.tsx
│       └── page-empty-code.test.tsx
├── lib/
│   ├── error-reporter.test.ts
│   └── error-reporter-node.test.ts
├── checkout-cancel/
│   └── page.test.tsx
├── checkout-success/
│   └── page.test.tsx
├── error.test.tsx
├── global-error.test.tsx
├── middleware.test.ts
└── page.test.tsx
```

## Testing Best Practices

1. **Test behavior, not implementation** - Focus on what the component does,
   not how it does it
2. **Use Testing Library queries** - Prefer `getByRole`, `getByText` over
   `getByTestId`
3. **Mock external dependencies** - API calls, clipboard, localStorage should
   be mocked
4. **Test error states** - Include tests for network failures, invalid data
5. **Use fake timers for async code** - When testing setTimeout/setInterval

## Environment-Specific Tests

Some tests require specific Jest environments:

- **Node environment**: Tests for server-side code (middleware, API routes)
  use `@jest-environment node` directive
- **JSDOM environment**: Tests for React components use the default jsdom
  environment

Example:

```typescript
/**
 * @jest-environment node
 */
// Tests that run in Node.js environment
```
