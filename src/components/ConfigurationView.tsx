import { useState } from 'react';
import { CURRENCY_NAMES } from '@/data/currencyNames';
import { ArrowLeft, Check, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

interface ConfigurationViewProps {
  favorites: string[];
  onToggleFavorite: (code: string) => void;
  onBack: () => void;
}

export const ConfigurationView = ({ favorites, onToggleFavorite, onBack }: ConfigurationViewProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const currencies = Object.entries(CURRENCY_NAMES).filter(
    ([code, name]) =>
      code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              onClick={onBack}
              className="p-0 h-auto hover:bg-transparent"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <div className="text-center">
              <h1 className="text-2xl font-bold">
                Select Currencies
              </h1>
              <p className="text-muted-foreground text-sm">
                {favorites.length} selected
              </p>
            </div>
            <div className="w-6"></div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search currencies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-card border-border"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currencies.map(([code, name]) => {
            const isFavorite = favorites.includes(code);
            return (
              <Card
                key={code}
                className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-[var(--shadow-hover)] border ${
                  isFavorite
                    ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                    : 'border-border bg-card hover:border-primary/50'
                }`}
                onClick={() => onToggleFavorite(code)}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex items-center justify-center w-6 h-6 rounded border-2 transition-all ${
                      isFavorite
                        ? 'bg-primary border-primary'
                        : 'border-muted-foreground/30'
                    }`}
                  >
                    {isFavorite && <Check className="w-4 h-4 text-primary-foreground" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg">{code}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{name}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
