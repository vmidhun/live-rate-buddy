import { DashboardSettings } from '@/types/currency';

const SETTINGS_KEY = 'currencyDashboardSettings';

const DEFAULT_SETTINGS: DashboardSettings = {
  favorites: ['EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF'],
  baseCurrency: 'USD',
};

export const loadSettings = (): DashboardSettings => {
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading settings:', error);
  }
  return DEFAULT_SETTINGS;
};

export const saveSettings = (settings: DashboardSettings): void => {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving settings:', error);
  }
};
