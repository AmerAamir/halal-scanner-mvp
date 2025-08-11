"use client";

import { useEffect, useRef } from 'react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';

interface Props {
  onDetected: (barcode: string) => void;
}

/**
 * BarcodeScanner opens the user’s camera and scans a barcode using zxing-js.
 * On detection, the barcode value is passed to the parent via onDetected.
 * If camera access fails (e.g. not supported in this environment) an error is logged.
 */
export default function BarcodeScanner({ onDetected }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    let active = true;
    async function start() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
        const detect = async () => {
          if (!active) return;
          try {
            const result = await codeReader.decodeOnceFromVideoDevice(undefined, videoRef.current!);
            onDetected(result.getText());
          } catch (err) {
            if (err instanceof NotFoundException) {
              requestAnimationFrame(detect);
            } else {
              console.error(err);
            }
          }
        };
        detect();
      } catch (err) {
        console.error('Could not access camera', err);
      }
    }
    start();
    return () => {
      active = false;
      codeReader.reset();
      if (videoRef.current && videoRef.current.srcObject) {
        (videoRef.current.srcObject as MediaStream)
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, [onDetected]);
  return <video ref={videoRef} className="w-full h-auto bg-black" />;
}