"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [ingredients, setIngredients] = useState('');
  const [barcode, setBarcode] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ingredients.trim().length > 0) {
      const encoded = encodeURIComponent(ingredients.trim());
      router.push(`/results?ingredients=${encoded}`);
    }
  };

  const handleBarcodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (barcode.trim().length > 0) {
      const encoded = encodeURIComponent(barcode.trim());
      router.push(`/results?barcode=${encoded}`);
    }
  };

  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-xl font-semibold mb-4">Scan a Barcode</h2>
        <form onSubmit={handleBarcodeSubmit} className="space-y-2">
          <input
            type="text"
            placeholder="Enter barcode number"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Lookup Product
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-2">
          Barcode scanning via camera is not available in this demo environment.  You can manually enter a UPC.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-4">Paste or Scan Ingredients</h2>
        <form onSubmit={handleSubmit} className="space-y-2">
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Paste ingredients list here"
            rows={4}
            className="w-full border rounded px-3 py-2"
          ></textarea>
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Evaluate
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-2">
          You can also use your device’s camera to scan the ingredients text.  The OCR module (Tesseract.js) will be loaded on demand.
        </p>
      </section>
    </div>
  );
}