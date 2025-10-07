import { useState, useEffect } from 'react';
import { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { DashboardView } from '@/components/DashboardView';
import { ConfigurationView } from '@/components/ConfigurationView';
import { CurrencyRate, DashboardSettings } from '@/types/currency';
import { CURRENCY_NAMES } from '@/data/currencyNames';
import { fetchExchangeRates } from '@/utils/currencyApi';
import { loadSettings, saveSettings, saveRates, loadRates as loadRatesFromCache } from '@/utils/localStorage';
import { toast } from 'sonner';

type View = 'dashboard' | 'config';
type DisplayMode = 'grid' | 'list';

const Index = () => {
  const [view, setView] = useState<View>('dashboard');
  const [displayMode, setDisplayMode] = useState<DisplayMode>('grid');
  const [showComparison, setShowComparison] = useState<boolean>(false);
  const [settings, setSettings] = useState<DashboardSettings>(loadSettings());
  const [rates, setRates] = useState<Record<string, number>>({});
  const [currencies, setCurrencies] = useState<CurrencyRate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isDataStale, setIsDataStale] = useState(false);

  // Load exchange rates
  const loadRates = async (forceRefresh = false) => {
    setIsLoading(true);
    const cachedData = loadRatesFromCache();

    if (cachedData && !forceRefresh && cachedData.baseCurrency === settings.baseCurrency) {
      setRates(cachedData.rates);
      setLastUpdated(new Date(cachedData.timestamp));
      setIsDataStale(true);
      toast.info('Using cached exchange rates. Refresh for the latest data.');
      setIsLoading(false);
      return;
    }

    try {
      const fetchedRates = await fetchExchangeRates(settings.baseCurrency);
      setRates(fetchedRates);
      setLastUpdated(new Date());
      saveRates(fetchedRates, settings.baseCurrency);
      setIsDataStale(false);
      toast.success('Exchange rates updated successfully');
    } catch (error) {
      toast.error('Failed to fetch exchange rates. Using cached data if available.');
      console.error('Error loading rates:', error);
      if (cachedData && cachedData.baseCurrency === settings.baseCurrency) {
        setRates(cachedData.rates);
        setLastUpdated(new Date(cachedData.timestamp));
        setIsDataStale(true);
      }
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

  const handleRefresh = () => {
    loadRates(true);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setCurrencies((items) => {
        const oldIndex = items.findIndex((item) => item.code === active.id);
        const newIndex = items.findIndex((item) => item.code === over?.id);
        const newItems = arrayMove(items, oldIndex, newIndex);
        
        const newFavorites = newItems.map((item) => item.code);
        const newSettings = { ...settings, favorites: newFavorites };
        
        setSettings(newSettings);
        saveSettings(newSettings);
        
        return newItems;
      });
    }
  };

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
          onRefresh={handleRefresh}
          onOpenConfig={() => setView('config')}
          isLoading={isLoading}
          lastUpdated={lastUpdated}
          isDataStale={isDataStale}
          onDragEnd={handleDragEnd}
          displayMode={displayMode}
          onToggleDisplayMode={() => setDisplayMode(displayMode === 'grid' ? 'list' : 'grid')}
          showComparison={showComparison}
          onToggleComparison={() => setShowComparison(!showComparison)}
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
