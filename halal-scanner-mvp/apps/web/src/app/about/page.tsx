export default function AboutPage() {
  return (
    <div className="prose max-w-none">
      <h1>About</h1>
      <p>
        Halal Scanner is an open‑source project that helps consumers determine the halal status of food products
        by analysing their ingredients and E‑numbers.  All evaluations are performed locally on your device; no
        ingredient photos or text are sent to our servers.
      </p>
      <h2>Data Sources</h2>
      <p>
        Product information is sourced from <a href="https://openfoodfacts.org" target="_blank" rel="noopener noreferrer">Open Food Facts</a> (OFF), a community‑powered database of food products licensed under the
        Open Database License (ODbL).  Ingredient verdicts are compiled from public halal education resources and
        certification bodies.  Citations for each ingredient can be found on the results page.
      </p>
      <h2>Licenses</h2>
      <p>
        This app and its source code are licensed under the MIT License.  Data from OFF is subject to the ODbL and
        any images belong to their respective owners.
      </p>
      <h2>Offline & Privacy</h2>
      <p>
        The app works offline once loaded.  Barcodes and ingredient text are processed entirely in your browser.
        You may optionally submit corrections to improve the rules database.
      </p>
      <h2>Contributing</h2>
      <p>
        Contributions are welcome!  See the <a href="/docs/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">contributing guide</a> for how to add ingredients and E‑numbers or improve the app.
      </p>
    </div>
  );
}