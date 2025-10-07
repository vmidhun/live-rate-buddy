import { CurrencyRate } from '@/types/currency';
import { CurrencyCard } from './CurrencyCard';
import { Settings, RefreshCw, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CURRENCY_NAMES } from '@/data/currencyNames';

interface DashboardViewProps {
  baseCurrency: string;
  currencies: CurrencyRate[];
  onBaseCurrencyChange: (currency: string) => void;
  onRefresh: () => void;
  onOpenConfig: () => void;
  isLoading: boolean;
  lastUpdated: Date | null;
}

export const DashboardView = ({
  baseCurrency,
  currencies,
  onBaseCurrencyChange,
  onRefresh,
  onOpenConfig,
  isLoading,
  lastUpdated,
}: DashboardViewProps) => {
  const availableCurrencies = Object.keys(CURRENCY_NAMES).sort();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-accent">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Live Currency Dashboard
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Real-time exchange rates from around the world
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              Base Currency
            </label>
            <Select value={baseCurrency} onValueChange={onBaseCurrencyChange}>
              <SelectTrigger className="h-12 bg-card border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border max-h-[300px]">
                {availableCurrencies.map((code) => (
                  <SelectItem key={code} value={code}>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{code}</span>
                      <span className="text-muted-foreground text-sm">
                        - {CURRENCY_NAMES[code]}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 sm:self-end">
            <Button
              onClick={onRefresh}
              disabled={isLoading}
              variant="outline"
              className="h-12 border-border hover:bg-secondary"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button
              onClick={onOpenConfig}
              variant="default"
              className="h-12 bg-gradient-to-r from-primary to-accent hover:opacity-90"
            >
              <Settings className="w-4 h-4 mr-2" />
              Configure
            </Button>
          </div>
        </div>

        {/* Last Updated */}
        {lastUpdated && (
          <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
        )}

        {/* Currency Grid */}
        {currencies.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex p-6 rounded-full bg-muted/50 mb-4">
              <TrendingUp className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No currencies selected</h3>
            <p className="text-muted-foreground mb-6">
              Add your favorite currencies to start tracking exchange rates
            </p>
            <Button onClick={onOpenConfig} variant="default" size="lg">
              <Settings className="w-4 h-4 mr-2" />
              Select Currencies
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currencies.map((currency) => (
              <CurrencyCard
                key={currency.code}
                currency={currency}
                baseCurrency={baseCurrency}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
