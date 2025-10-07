import { ExchangeRateResponse } from '@/types/currency';

const API_BASE_URL = 'https://v6.exchangerate-api.com/v6/3bfce288915892204e5f232d';
const STORAGE_KEY = 'currencyDashboardCache';

export interface CachedData {
  rates: Record<string, number>;
  baseCurrency: string;
  timestamp: number;
}

export const fetchExchangeRates = async (baseCurrency: string = 'USD'): Promise<Record<string, number>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/latest/${baseCurrency}`);
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data: ExchangeRateResponse = await response.json();
    
    if (data.result !== 'success') {
      throw new Error('API returned unsuccessful result');
    }

    // Cache the successful response
    const cacheData: CachedData = {
      rates: data.conversion_rates,
      baseCurrency: data.base_code,
      timestamp: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cacheData));

    return data.conversion_rates;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    
    // Fallback to cached data
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      try {
        const cacheData: CachedData = JSON.parse(cached);
        console.log('Using cached exchange rates from', new Date(cacheData.timestamp).toLocaleString());
        return cacheData.rates;
      } catch (parseError) {
        console.error('Error parsing cached data:', parseError);
      }
    }
    
    throw new Error('Failed to fetch exchange rates and no cached data available');
  }
};
