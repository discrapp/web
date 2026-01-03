# Discr Web - Project Memory

This file contains persistent context for Claude Code sessions on this project.
It will be automatically loaded at the start of every session.

## Project Overview

This is the web landing page for Discr, built with Next.js and deployed on
Cloudflare Pages.

**Key Details:**

- **Framework:** Next.js 16 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Testing:** Jest with React Testing Library
- **Backend:** Supabase API (lookup-qr-code endpoint)
- **Deployment:** Cloudflare Pages
- **Domain:** discrapp.com
- **CI/CD:** GitHub Actions with release workflow
- **Monitoring:** Sentry (errors + uptime) → Slack alerts
- **Linting:** Pre-commit hooks for code quality

## Purpose

The web app serves two main purposes:

1. **Root splash page** (`/`) - Simple landing page with Discr logo
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
│   └── logo.svg           # Discr logo
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

### Sentry Error Tracking - MANDATORY

**CRITICAL:** All new code MUST use Sentry for error tracking.

**Error boundaries are already configured:**

- `src/app/error.tsx` - Page-level error boundary
- `src/app/global-error.tsx` - Root error boundary

**Pattern for API calls and catch blocks:**

```typescript
import * as Sentry from '@sentry/nextjs';

try {
  // API call or risky operation
  const response = await fetch('/api/endpoint');
  // ...
} catch (error) {
  Sentry.captureException(error, {
    extra: { context: 'relevant-context', id: someId },
  });
  // Handle error for user
}
```

**Key points:**

- Error boundaries automatically capture unhandled errors
- Use `captureException()` in catch blocks with relevant context
- Include operation name and IDs for debugging
- Tests mock Sentry globally in `jest.setup.js` - no changes needed

**Environment variables:**

- `NEXT_PUBLIC_SENTRY_DSN` - Sentry DSN (set in Cloudflare Pages)
- `SENTRY_AUTH_TOKEN` - For source map uploads (set in Cloudflare Pages)

### Uptime Monitoring

Sentry Uptime Monitoring checks `https://discrapp.com` availability and alerts
via Slack when the site is down.

**What it catches:**

- DNS resolution failures
- HTTP errors (5xx, timeouts)
- SSL certificate issues
- Complete site outages

**How it works:**

- Sentry performs HTTP checks every 1 minute from multiple regions
- An outage issue is created after 3 consecutive failures
- Issue alert triggers Slack notification on "outage" category

**To recreate if needed:**

1. Sentry → Alerts → Create Alert → Uptime Monitor
   - URL: `https://discrapp.com`
   - Interval: 1 minute
   - Timeout: 10 seconds
1. Sentry → Alerts → Create Alert → Issue Alert
   - Filter: "The issue's category is equal to Outage"
   - Action: "Send a Slack notification" → select channel
   - Frequency: Once every 5 minutes

**Note:** Sentry error tracking (above) catches application errors. Uptime
monitoring catches infrastructure issues where the app never loads.

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

---

## Implementation Patterns (For Claude)

### Server Component Pattern

```typescript
// src/app/page.tsx
import Navigation from '@/components/landing/Navigation';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Features />
        {/* More sections */}
      </main>
      <Footer />
    </>
  );
}
```

### Client Component with State

```typescript
// src/components/landing/Navigation.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

const navLinks = [
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#features', label: 'Features' },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          className="md:hidden"
        >
          {/* Menu icon */}
        </button>
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:flex`}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-zinc-700 dark:text-zinc-300 hover:text-violet-600"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
```

### Landing Section Pattern

```typescript
// src/components/landing/Features.tsx
const features = [
  {
    title: 'QR Code Scanning',
    description: 'Instantly identify any registered disc',
    icon: <QRIcon />,
  },
  // ... more features
];

export default function Features() {
  return (
    <section id="features" aria-labelledby="features-heading" className="py-20 bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4">
        <h2 id="features-heading" className="text-4xl font-bold text-center text-zinc-900 dark:text-white">
          Features
        </h2>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="p-6 bg-white dark:bg-zinc-900 rounded-xl">
              <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900/50 rounded-lg flex items-center justify-center text-violet-600">
                {feature.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-white">{feature.title}</h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### Dynamic Page with Data Fetching

```typescript
// src/app/d/[code]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { reportError } from '@/lib/error-reporter';
import LoadingSpinner from '@/components/LoadingSpinner';

interface DiscData {
  found: boolean;
  disc?: { name: string; manufacturer: string; photo_url?: string };
  owner_display_name?: string;
}

export default function DiscLandingPage() {
  const params = useParams();
  const code = params?.code as string;
  const [data, setData] = useState<DiscData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!code) return;

    const fetchDisc = async () => {
      try {
        const response = await fetch(
          `https://xhaogdigrsiwxdjmjzgx.supabase.co/functions/v1/lookup-qr-code?code=${code}`
        );
        const result = await response.json();
        setData(result);
      } catch (err) {
        reportError(err instanceof Error ? err : new Error(String(err)), { code });
        setError('Failed to load disc');
      } finally {
        setLoading(false);
      }
    };

    fetchDisc();
  }, [code]);

  if (loading) return <LoadingSpinner message="Looking up disc..." />;
  if (error || !data?.found) return <div>Disc not found</div>;

  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <div className="text-center p-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
          {data.disc?.name}
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Owned by {data.owner_display_name}
        </p>
      </div>
    </main>
  );
}
```

### API Route Pattern

```typescript
// src/app/api/gofundme/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://www.gofundme.com/f/...', {
      headers: { 'User-Agent': 'DiscrBot/1.0' },
      next: { revalidate: 600 }, // 10 min cache
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const html = await response.text();
    const data = parseGoFundMePage(html);

    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'public, s-maxage=600' },
    });
  } catch (error) {
    return NextResponse.json({ fallback: true }, { status: 200 });
  }
}
```

### Error Reporting Pattern

```typescript
// src/lib/error-reporter.ts
export async function reportError(error: Error, context?: Record<string, unknown>): Promise<void> {
  if (!SENTRY_DSN || typeof window === 'undefined') return;

  const payload = {
    event_id: crypto.randomUUID().replace(/-/g, ''),
    timestamp: new Date().toISOString(),
    level: 'error',
    exception: {
      values: [{ type: error.name, value: error.message }],
    },
    extra: context,
  };

  await fetch('/api/sentry-tunnel', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

// Usage in components:
try {
  await fetch('/api/endpoint');
} catch (err) {
  reportError(err instanceof Error ? err : new Error(String(err)), {
    operation: 'fetch-data',
  });
}
```

### Test Pattern

```typescript
// __tests__/components/landing/Navigation.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Navigation from '@/components/landing/Navigation';

describe('Navigation', () => {
  it('renders navigation links', () => {
    render(<Navigation />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('toggles mobile menu', () => {
    render(<Navigation />);
    const menuButton = screen.getByRole('button', { name: /open menu/i });
    fireEvent.click(menuButton);
    expect(screen.getByRole('button', { name: /close menu/i })).toBeInTheDocument();
  });
});
```

### API Route Test Pattern

```typescript
// __tests__/app/api/gofundme/route.test.ts
/**
 * @jest-environment node
 */

global.fetch = jest.fn();

describe('GET /api/gofundme', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('returns campaign data with cache headers', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve('<html>...</html>'),
    });

    const { GET } = await import('@/app/api/gofundme/route');
    const response = await GET();

    expect(response.status).toBe(200);
    expect(response.headers.get('Cache-Control')).toContain('s-maxage=600');
  });
});
```

### File Map - Where to Edit

| Task | Files to Edit |
|------|---------------|
| Add landing section | `src/app/page.tsx` (import), `src/components/landing/[Name].tsx` (create) |
| Add navigation link | `src/components/landing/Navigation.tsx` (navLinks array) |
| Add footer link | `src/components/landing/Footer.tsx` |
| Add API route | `src/app/api/[name]/route.ts` |
| Fix error handling | `src/lib/error-reporter.ts` |
| Update colors | `src/app/globals.css` (CSS variables) |
| Add test | `__tests__/[path].test.tsx` |

### Adding a New Landing Section

1. Create component:

```typescript
// src/components/landing/NewSection.tsx
export default function NewSection() {
  return (
    <section id="new-section" aria-labelledby="new-section-heading" className="py-20 bg-white dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4">
        <h2 id="new-section-heading" className="text-4xl font-bold text-center text-zinc-900 dark:text-white">
          New Section
        </h2>
        <p className="mt-4 text-center text-zinc-600 dark:text-zinc-400">
          Description
        </p>
      </div>
    </section>
  );
}
```

2. Import in page:

```typescript
// src/app/page.tsx
import NewSection from '@/components/landing/NewSection';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <NewSection />  {/* Add here */}
        {/* ... */}
      </main>
    </>
  );
}
```

3. Write test:

```typescript
// __tests__/components/landing/NewSection.test.tsx
import { render, screen } from '@testing-library/react';
import NewSection from '@/components/landing/NewSection';

describe('NewSection', () => {
  it('renders heading', () => {
    render(<NewSection />);
    expect(screen.getByRole('heading', { name: /new section/i })).toBeInTheDocument();
  });
});
```

### Tailwind Dark Mode Pattern

```typescript
// Always include both light and dark variants
<div className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">
<p className="text-zinc-600 dark:text-zinc-400">
<div className="border-zinc-200 dark:border-zinc-700">
<button className="bg-violet-600 hover:bg-violet-700 text-white">
```

## References

- @README.md - Repository overview
- Mobile app: `../mobile/`
- API functions: `../api/supabase/functions/`
- Next.js Documentation: <https://nextjs.org/docs>
- Tailwind CSS: <https://tailwindcss.com/docs>

---

**Last Updated:** 2025-12-28

This file should be updated whenever:

- Project patterns change
- Important context is discovered
- Tooling is added or modified
