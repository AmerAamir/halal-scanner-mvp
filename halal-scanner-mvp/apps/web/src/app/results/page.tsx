"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { evaluateFromString } from '@halalscanner/engine';

interface Row {
  token: string;
  match: string;
  status: string;
  note: string;
  citations: string[];
}

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [productName, setProductName] = useState<string | null>(null);
  const [hideDoubtful, setHideDoubtful] = useState<boolean>(false);

  useEffect(() => {
    const barcode = searchParams.get('barcode');
    const ingredientsParam = searchParams.get('ingredients');
    async function processIngredients(ingredientsText: string) {
      try {
        const evaluations = await evaluateFromString(ingredientsText);
        const rowsData = evaluations.map((ev) => ({
          token: ev.token,
          match: ev.match,
          status: ev.status,
          note: ev.explanation.note,
          citations: ev.explanation.citations
        }));
        setRows(rowsData);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    async function fetchBarcode(bc: string) {
      try {
        const res = await fetch(`https://world.openfoodfacts.org/api/v2/product/${bc}.json`);
        if (!res.ok) {
          throw new Error('Failed to fetch product');
        }
        const json = await res.json();
        const product = json.product;
        setProductName(product.product_name || bc);
        const ingredientsText = product.ingredients_text || '';
        await processIngredients(ingredientsText);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    }
    if (barcode) {
      fetchBarcode(barcode);
    } else if (ingredientsParam) {
      const decoded = decodeURIComponent(ingredientsParam);
      processIngredients(decoded);
    }
  }, [searchParams]);

  const filteredRows = hideDoubtful ? rows.filter((r) => r.status !== 'doubtful') : rows;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">
        Results{productName ? ` for ${productName}` : ''}
      </h1>
      {loading && <p>Evaluating...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <>
          <div className="flex items-center space-x-2">
            <label className="flex items-center space-x-1">
              <input
                type="checkbox"
                checked={hideDoubtful}
                onChange={(e) => setHideDoubtful(e.target.checked)}
              />
              <span>Hide doubtful items</span>
            </label>
          </div>
          <table className="w-full mt-4 text-left border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Ingredient</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Reason</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row, idx) => (
                <tr key={idx} className="odd:bg-white even:bg-gray-50">
                  <td className="p-2 border">
                    {row.token}
                    {row.match !== row.token && (
                      <span className="text-xs text-gray-500"> ({row.match})</span>
                    )}
                  </td>
                  <td className="p-2 border capitalize">
                    {row.status}
                  </td>
                  <td className="p-2 border">
                    <div className="text-sm">{row.note}</div>
                    <div className="text-xs text-blue-600 mt-1 space-x-1">
                      {row.citations.map((url, i) => (
                        <a key={i} href={url} target="_blank" rel="noopener noreferrer">
                          [{i + 1}]
                        </a>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredRows.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-4 text-center text-gray-500">
                    No ingredients to display.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}