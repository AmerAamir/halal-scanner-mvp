"use client";

import { useState } from 'react';

interface Props {
  onExtracted: (text: string) => void;
}

/**
 * OcrScanner allows the user to upload or capture an image of an ingredient list.  It uses
 * tesseract.js to perform OCR in the browser.  The extracted text is passed to the parent
 * via onExtracted.
 */
export default function OcrScanner({ onExtracted }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const { createWorker } = await import('tesseract.js');
      const worker = await createWorker({ logger: () => {} });
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      const {
        data: { text }
      } = await worker.recognize(file);
      await worker.terminate();
      onExtracted(text);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {loading && <p>Processing image...</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}