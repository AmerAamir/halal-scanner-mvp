# Rule Format

The knowledge base for the Halal Scanner is defined in YAML files inside the `packages/rules/data` directory.  There are three types of data:

## Ingredients

The file `ingredients.yaml` lists canonical ingredient names along with synonyms, their default status and citations.  Each item has the following fields:

```yaml
- name: gelatin
  synonyms:
    - gelatine
    - gelatina
  status: haram
  note: Derived from animal collagen; only halal if certified.
  citations:
    - "https://example.com/gelatin-halal-status"
```

* **name**: a canonical, lowercase token used internally.  This should be language‑agnostic (e.g. “gelatin” rather than “gélatine”).
* **synonyms**: an array of alternative spellings or translations.  These are matched case‑insensitively and with diacritics removed.
* **status**: one of `halal`, `haram` or `doubtful`.  Most processed ingredients default to `doubtful` if the source matters.
* **note**: a short human‑readable explanation that will be shown in the UI.
* **citations**: one or more URLs pointing to authoritative sources (e.g. halal certifier websites or educational articles).  These must be publicly accessible.

## E‑numbers

The file `enumbers.yaml` lists European food additive codes.  Many E‑numbers can be halal or haram depending on the source; therefore they default to `doubtful` unless otherwise documented.

```yaml
- code: E120
  name: carmine
  status: haram
  note: Red pigment extracted from insects.
  citations:
    - "https://example.com/e120-carmine-halal"
```

The fields are analogous to the ingredient entries:

* **code**: the E‑code (e.g. `E471`), case‑insensitive.
* **name**: common name of the additive.
* **status**: `halal`, `haram` or `doubtful`.
* **note**: explanation of why it has that status.
* **citations**: URLs to authoritative sources.

## Certifiers

The file `certifiers.json` lists halal certification bodies and a URL to their public product‑search page.  These links are provided only for user reference; we do **not** scrape or query these sites.  Example entry:

```json
{
  "IFANCA": "https://www.ifanca.org/ifanca-halal-certified-product-database/",
  "HMA Canada": "https://hma-canada.org/hma-halal-directory/"
}
```

## Schema

A basic Zod schema is defined in `packages/rules/src/schema.ts` to validate the shape of the YAML data.  The `rules:validate` script uses this schema to fail CI if the data is malformed.