import { DashboardSettings, CurrencyRate } from '@/types/currency';

const SETTINGS_KEY = 'currencyDashboardSettings';
const RATES_KEY = 'currencyRates';

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

export const saveRates = (rates: Record<string, number>, baseCurrency: string): void => {
  try {
    const data = {
      rates,
      timestamp: new Date().getTime(),
      baseCurrency,
    };
    localStorage.setItem(RATES_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving rates:', error);
  }
};

export const loadRates = (): { rates: Record<string, number>; timestamp: number; baseCurrency: string } | null => {
  try {
    const stored = localStorage.getItem(RATES_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading rates:', error);
  }
  return null;
};
