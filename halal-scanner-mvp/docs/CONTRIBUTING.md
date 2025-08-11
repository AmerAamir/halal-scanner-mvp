# Contributing to Halal Scanner

Thank you for considering a contribution!  We welcome pull requests for bug fixes, new ingredients/E‑numbers, improved documentation and other enhancements.  To maintain quality and respect our free/open policy, please follow these guidelines.

## Setup

Fork the repository on GitHub and clone your fork locally.  Install dependencies and run the development server:

```bash
pnpm i
pnpm dev
```

### Running Tests

Unit tests (Vitest) and end‑to‑end tests (Playwright) can be run with:

```bash
pnpm test
```

## Adding Ingredients or E‑numbers

* Edit `packages/rules/data/ingredients.yaml` or `packages/rules/data/enumbers.yaml`.
* Follow the schema described in [docs/rule-format.md](rule-format.md).
* Provide at least one citation URL to an authoritative source explaining the ingredient’s status.
* Run `pnpm rules:validate` to ensure the YAML is well‑formed.
* Commit your changes and open a pull request.  Please describe your rationale and link to the sources.

## Adding Certifiers

* Edit `packages/rules/data/certifiers.json` to include the name of the halal certification body and a link to their public product search page.
* Do not scrape or query these pages programmatically.

## Code Style

* This project uses ESLint and Prettier.  Lint errors will cause CI to fail.  You can run the linter locally via `pnpm lint` and automatically fix problems via `pnpm lint --fix`.
* TypeScript should be written in strict mode.  Avoid `any` and unsafe type assertions.

## Free/Open‑source Policy

**Do not introduce dependencies on paid APIs, cloud services, proprietary models or trackers.**  All functionality must work offline and rely only on open data sources.  If in doubt, open an issue to discuss.

## Reporting Issues

If you encounter a bug or would like to request a feature, please open an issue on GitHub.  Provide as much detail as possible, including reproduction steps and screenshots if relevant.