export interface CurrencyRate {
  code: string;
  name: string;
  rate: number;
}

export interface DashboardSettings {
  favorites: string[];
  baseCurrency: string;
}

export interface ExchangeRateResponse {
  result: string;
  base_code: string;
  conversion_rates: Record<string, number>;
}
