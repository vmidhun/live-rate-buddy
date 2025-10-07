import { useState, useEffect } from 'react';
import { DashboardView } from '@/components/DashboardView';
import { ConfigurationView } from '@/components/ConfigurationView';
import { CurrencyRate, DashboardSettings } from '@/types/currency';
import { CURRENCY_NAMES } from '@/data/currencyNames';
import { fetchExchangeRates } from '@/utils/currencyApi';
import { loadSettings, saveSettings } from '@/utils/localStorage';
import { toast } from 'sonner';

type View = 'dashboard' | 'config';

const Index = () => {
  const [view, setView] = useState<View>('dashboard');
  const [settings, setSettings] = useState<DashboardSettings>(loadSettings());
  const [rates, setRates] = useState<Record<string, number>>({});
  const [currencies, setCurrencies] = useState<CurrencyRate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Load exchange rates
  const loadRates = async () => {
    setIsLoading(true);
    try {
      const fetchedRates = await fetchExchangeRates(settings.baseCurrency);
      setRates(fetchedRates);
      setLastUpdated(new Date());
      toast.success('Exchange rates updated successfully');
    } catch (error) {
      toast.error('Failed to fetch exchange rates. Using cached data if available.');
      console.error('Error loading rates:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Update currencies based on favorites and rates
  useEffect(() => {
    if (Object.keys(rates).length === 0) return;

    const favoriteCurrencies: CurrencyRate[] = settings.favorites
      .filter((code) => rates[code] !== undefined)
      .map((code) => ({
        code,
        name: CURRENCY_NAMES[code] || code,
        rate: rates[code],
      }));

    setCurrencies(favoriteCurrencies);
  }, [settings.favorites, rates]);

  // Load rates on mount and when base currency changes
  useEffect(() => {
    loadRates();
  }, [settings.baseCurrency]);

  const handleBaseCurrencyChange = (newBase: string) => {
    const newSettings = { ...settings, baseCurrency: newBase };
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  const handleToggleFavorite = (code: string) => {
    const newFavorites = settings.favorites.includes(code)
      ? settings.favorites.filter((c) => c !== code)
      : [...settings.favorites, code];

    const newSettings = { ...settings, favorites: newFavorites };
    setSettings(newSettings);
    saveSettings(newSettings);
    
    toast.success(
      settings.favorites.includes(code)
        ? `${code} removed from favorites`
        : `${code} added to favorites`
    );
  };

  return (
    <>
      {view === 'dashboard' ? (
        <DashboardView
          baseCurrency={settings.baseCurrency}
          currencies={currencies}
          onBaseCurrencyChange={handleBaseCurrencyChange}
          onRefresh={loadRates}
          onOpenConfig={() => setView('config')}
          isLoading={isLoading}
          lastUpdated={lastUpdated}
        />
      ) : (
        <ConfigurationView
          favorites={settings.favorites}
          onToggleFavorite={handleToggleFavorite}
          onBack={() => setView('dashboard')}
        />
      )}
    </>
  );
};

export default Index;
