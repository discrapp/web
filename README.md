# AceBack Web

![GitHub branch status](https://img.shields.io/github/checks-status/acebackapp/web/main)
![GitHub Issues](https://img.shields.io/github/issues/acebackapp/web)
![GitHub last commit](https://img.shields.io/github/last-commit/acebackapp/web)
![GitHub repo size](https://img.shields.io/github/repo-size/acebackapp/web)
![GitHub License](https://img.shields.io/github/license/acebackapp/web)

## Introduction

Web landing page for AceBack - the disc golf disc recovery app. Built with
Next.js and deployed on Cloudflare Pages.

### Key Features

- Splash page with AceBack branding
- QR code landing page for users without the app installed
- Smart App Banner integration for iOS
- Deep linking support for app handoff

## Prerequisites

- Node.js 18+ and npm
- Cloudflare account (for deployment)

## Setup

### Installation

```bash
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run linting:

```bash
npm run lint
```

## Project Structure

```text
web/
├── src/
│   └── app/
│       ├── layout.tsx     # Root layout
│       ├── page.tsx       # Splash page
│       └── d/[code]/      # QR code landing page
├── public/
│   ├── .well-known/       # Deep linking config
│   └── logo.svg           # AceBack logo
└── package.json
```

## Contributing

Upon first clone, install the pre-commit hooks:

```bash
pre-commit install
```

To run pre-commit hooks locally:

```bash
pre-commit run --all-files
```

This project uses conventional commits for version management:

```text
feat: add new feature
fix: resolve bug
docs: update documentation
chore: maintenance tasks
```

## License

See LICENSE file for details.
