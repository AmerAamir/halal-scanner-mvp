# Decision Log

This document tracks important technical and product decisions made during the development of the Halal Scanner MVP.

## Privacy‑first design

* **On‑device OCR and scanning**: To respect user privacy and avoid sending sensitive images to external services, we chose [`tesseract.js`](https://github.com/naptha/tesseract.js) for optical character recognition and [`@zxing/library`](https://github.com/zxing-js/library) for barcode scanning.  Both run entirely in the browser.  This avoids reliance on paid or proprietary cloud APIs.
* **No analytics or trackers**: The app does not include any analytics, logging or tracking scripts.  User data stays on the device unless explicitly submitted to correct ingredient lists.

## Technology stack

* **Next.js 14 App Router**: We adopted the latest Next.js for its React Server Components, client components and built‑in support for static exports.  This enabled us to build a fully static PWA deployable to GitHub Pages.
* **Tailwind & shadcn/ui**: Tailwind provides a low‑level utility framework while [shadcn/ui](https://ui.shadcn.com/) offers accessible components.  This combination accelerates development without locking us into a proprietary design system.
* **Monorepo with pnpm**: A monorepo simplifies dependency management and ensures that the rule engine can be shared between the client and the CLI tools.  pnpm’s workspaces offer efficient and deterministic installation.

## Open source and licensing

* **Data sources**: Product data is pulled from Open Food Facts under the Open Database License.  The ingredient and E‑number rules compile information from various halal education websites and certifier guidelines.  We attribute all sources in [CREDITS.md](CREDITS.md).
* **License choice**: The MIT license was chosen for maximum permissiveness.  Contributors and downstream users can freely use, modify and distribute the code.

## Limitations and future work

* **Heuristic matching**: The initial tokenizer and fuzzy matching are simplistic and may not recognise complex multi‑word ingredients or unusual punctuation.  Future improvements could include better natural language processing or a small machine‑learning model.
* **Cultural variations**: Halal interpretations can vary by school of thought and region.  We provide generic guidance and links to authoritative sources, but users should always exercise their own judgement.
* **Accessibility**: While basic a11y checks are in place, comprehensive screen reader testing and translations into other languages remain to be done.