# AceBack Web - Project Memory

This file contains persistent context for Claude Code sessions on this project.
It will be automatically loaded at the start of every session.

## Project Overview

This is the web landing page for AceBack, built with Next.js and deployed on
Cloudflare Pages.

**Key Details:**

- **Framework:** Next.js 16 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Testing:** Jest with React Testing Library
- **Backend:** Supabase API (lookup-qr-code endpoint)
- **Deployment:** Cloudflare Pages
- **Domain:** aceback.app
- **CI/CD:** GitHub Actions with release workflow
- **Linting:** Pre-commit hooks for code quality

## Purpose

The web app serves two main purposes:

1. **Root splash page** (`/`) - Simple landing page with AceBack logo
1. **QR code landing page** (`/d/[code]`) - For users who scan disc QR codes
   but don't have the mobile app installed

## Repository Structure

```text
web/
├── .github/workflows/     # CI/CD workflows
├── src/
│   └── app/               # Next.js App Router
│       ├── layout.tsx     # Root layout
│       ├── page.tsx       # Splash page
│       └── d/[code]/      # QR code landing page
│           └── page.tsx
├── __tests__/             # Test files
├── public/
│   ├── .well-known/       # Universal Links / App Links config
│   │   ├── apple-app-site-association
│   │   └── assetlinks.json
│   └── logo.svg           # AceBack logo
├── next.config.ts
├── package.json
└── tsconfig.json
```

## API Integration

The QR code landing page calls the public `lookup-qr-code` Supabase edge
function:

- **Endpoint:** `https://xhaogdigrsiwxdjmjzgx.supabase.co/functions/v1/lookup-qr-code`
- **Method:** GET
- **Query params:** `?code={qr_code}`
- **Auth:** None required (public endpoint)
- **Returns:** Disc info, owner display name, photo URL, is_claimable status

## Development Setup

### Prerequisites

- Node.js 18+ and npm
- Cloudflare account (for deployment)

### Running Locally

```bash
npm install          # Install dependencies
npm run dev          # Start dev server at http://localhost:3000
npm run build        # Build for production
npm run lint         # Run ESLint
npm test             # Run tests
```

## Git Workflow

**CRITICAL:** All changes MUST go through Pull Requests. Never commit directly
to main.

1. **Create feature branch:** `git checkout -b feature/description`
1. **Make changes** to code or documentation
1. **Write markdown correctly the FIRST time** - Use markdownlint style:
   - Keep lines under 80 characters (break long lines manually)
   - Use `1.` for all ordered list items (auto-numbered)
   - Add blank lines around fenced code blocks
   - Do NOT rely on pre-commit hooks to fix formatting
1. **ALWAYS run pre-commit BEFORE committing:** `pre-commit run --all-files`
   - Fix ALL errors before committing
   - Do NOT commit with `--no-verify` unless absolutely necessary
1. **Commit with conventional format:** `git commit -m "type: description"`
1. **Push and create PR:** `gh pr create --title "feat: description"`
1. **Get PR reviewed and merged** - Never push directly to main

**Commit Format:** Conventional Commits (enforced by pre-commit hook)

- `feat:` - New feature (triggers minor version bump)
- `fix:` - Bug fix (triggers patch version bump)
- `docs:` - Documentation changes (no version bump)
- `chore:` - Maintenance (no version bump)
- `refactor:` - Code refactoring (no version bump)
- `style:` - Code style changes (no version bump)

## Pre-commit Hooks

**Installed hooks:**

- YAML linting (yamllint)
- Markdown linting (markdownlint)
- Conventional commit format
- File hygiene (trailing whitespace, EOF, etc.)

**Setup:**

```bash
pre-commit install              # One-time setup
pre-commit run --all-files      # Run manually
pre-commit autoupdate           # Update hook versions
```

## Important Notes

### Test-Driven Development (TDD) - MANDATORY

**CRITICAL:** All new code MUST be developed using Test-Driven Development:

1. **Write tests FIRST** - Before writing any implementation code, write tests
1. **Red-Green-Refactor cycle:**
   - RED: Write a failing test for the new functionality
   - GREEN: Write minimal code to make the test pass
   - REFACTOR: Clean up while keeping tests green
1. **Test coverage requirements:**
   - All components must have unit tests
   - All API interactions must be tested
   - All user flows must have integration tests
1. **Test file locations:**
   - Component tests: `__tests__/<component>.test.tsx`
   - Integration tests: `__tests__/integration/`
1. **Running tests:**

   ```bash
   npm test                    # Run all tests
   npm test -- --watch         # Watch mode
   npm test -- --coverage      # With coverage report
   ```

**DO NOT write implementation code without tests. This is non-negotiable.**

### Code Quality Standards

**CRITICAL:** All code must adhere to linter and prettier rules from the start.

- **Write prettier-compliant code** - Don't rely on pre-commit hooks to fix
  formatting. This wastes cycles and creates noisy diffs.
- Use 2-space indentation
- Keep lines under 100 characters for TypeScript

### Next.js Best Practices

- Use TypeScript for all new code
- Use App Router patterns (not Pages Router)
- Server Components by default, Client Components when needed
- Optimize images using next/image
- Handle loading and error states properly

### Security

- Never commit `.env` file
- Use environment variables for all config
- Validate all user inputs
- Sanitize data before rendering

## Deep Linking

This web app works with iOS Universal Links and Android App Links:

- When a user WITH the app scans a QR code, Universal Links / App Links
  intercept and open the app directly
- When a user WITHOUT the app scans a QR code, the web page loads and shows
  install prompts
- The web page stores the QR code in localStorage for deferred deep linking
  after app install

## References

- @README.md - Repository overview
- Mobile app: `../mobile/`
- API functions: `../api/supabase/functions/`
- Next.js Documentation: <https://nextjs.org/docs>
- Tailwind CSS: <https://tailwindcss.com/docs>

---

**Last Updated:** 2025-12-14

This file should be updated whenever:

- Project patterns change
- Important context is discovered
- Tooling is added or modified
