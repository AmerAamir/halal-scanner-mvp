"use client";

import { useEffect, useState } from 'react';

const SETTINGS_KEY = 'halalscanner-settings';

interface Settings {
  preferBarcode: boolean;
  showDoubtful: boolean;
  autoUpdateRules: boolean;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) {
      setSettings(JSON.parse(stored));
    } else {
      setSettings({ preferBarcode: true, showDoubtful: true, autoUpdateRules: true });
    }
  }, []);

  const updateSetting = (key: keyof Settings, value: boolean) => {
    setSettings((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, [key]: value };
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  if (!settings) return null;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <div className="space-y-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={settings.preferBarcode}
            onChange={(e) => updateSetting('preferBarcode', e.target.checked)}
          />
          <span>Prefer barcode scanning over OCR when available</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={settings.showDoubtful}
            onChange={(e) => updateSetting('showDoubtful', e.target.checked)}
          />
          <span>Show doubtful ingredients in results</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={settings.autoUpdateRules}
            onChange={(e) => updateSetting('autoUpdateRules', e.target.checked)}
          />
          <span>Automatically check for rule updates</span>
        </label>
      </div>
    </div>
  );
}