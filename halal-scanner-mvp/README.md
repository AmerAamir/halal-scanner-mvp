# Halal Scanner MVP

**Halal Scanner** is a progressive web application that helps consumers determine whether food products are **halal**, **haram** or **doubtful** based on their ingredients.  It respects your privacy (all OCR and scanning happens on device) and runs completely offline once installed.

<p align="center">
  <!-- Replace `demo.gif` with your own recording after running the app locally -->
  <img src="docs/demo.gif" alt="Demo of Halal Scanner" width="600">
</p>

## Features

* 📱 **Next.js 14 PWA** – built with the App Router, TypeScript and Tailwind.
* 🔍 **Scan barcodes** using `@zxing/library` (or `quagga2`) to fetch product data from Open Food Facts.
* 🧠 **On‑device OCR** powered by [`tesseract.js`](https://github.com/naptha/tesseract.js) to extract ingredient lists from packaging – no data leaves your device.
* 🧾 **Local rule engine** implemented in TypeScript: deterministic evaluation of ingredients and E‑numbers using a YAML‑driven knowledge base.
* 📦 **Offline first** – caching of the UI shell, rule bundles and recent product lookups via service workers and Workbox (`next-pwa`).
* 🔁 **Live updates** – the app checks GitHub Releases for a new rules bundle and updates its local cache when you choose to.
* 🛠️ **Developer experience** – strict TypeScript, ESLint, Prettier, Vitest unit tests, Playwright E2E tests, and GitHub Actions CI.

## Getting Started

You only need [pnpm](https://pnpm.io/) installed. Clone the repository and run the dev server in a single command:

```bash
pnpm i && pnpm dev
```

This will start the Next.js development server for the web PWA and build the local rule engine packages if necessary.  Visit `http://localhost:3000` to see the app.

### Building and Exporting for GitHub Pages

Static export is handled via `next export`, which produces a fully static site suitable for hosting on GitHub Pages.  You can run:

```bash
pnpm build && pnpm export
```

The exported files will be output to `apps/web/out`.  When deploying to a repository subpath (e.g. `https://{username}.github.io/halal-scanner-mvp/`), be sure to set the `basePath` option in `next.config.js`.

### Command Line Interface

This repository includes a small CLI in the `tools` workspace.  Some examples:

* `pnpm ingest:off --country=CA --limit=50` – fetches ~50 product records from Open Food Facts (CA) and caches them locally.  Respect rate limits!
* `pnpm rules:validate` – validates your YAML rules against the schema (used in CI).
* `pnpm rules:bundle` – produces a compressed archive of the rules for use by the PWA.

### Contributing

See [CONTRIBUTING.md](docs/CONTRIBUTING.md) for guidelines on how to add new ingredients, E‑numbers or other improvements.  All contributions must respect the privacy and free/open‑source policy – no paid APIs, no proprietary services.

## Acknowledgements

This project makes heavy use of open data from [Open Food Facts](https://openfoodfacts.org/), licensed under the [Open Database License (ODbL)](https://opendatacommons.org/licenses/odbl/).  See [CREDITS.md](docs/CREDITS.md) for a full list of sources and third‑party packages.

## License

This repository is licensed under the MIT License.  See [LICENSE](LICENSE) for more information.