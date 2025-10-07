import { CurrencyRate } from '@/types/currency';
import { TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface CurrencyCardProps {
  currency: CurrencyRate;
  baseCurrency: string;
}

export const CurrencyCard = ({ currency, baseCurrency }: CurrencyCardProps) => {
  return (
    <Card className="group relative overflow-hidden border border-border bg-gradient-to-br from-card to-card/50 shadow-[var(--shadow-card)] transition-all duration-300 hover:shadow-[var(--shadow-hover)] hover:scale-[1.02]">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-2xl transform translate-x-16 -translate-y-16 transition-transform duration-500 group-hover:scale-150" />
      
      <div className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl font-bold text-foreground">{currency.code}</span>
              <TrendingUp className="w-4 h-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <p className="text-sm text-muted-foreground">{currency.name}</p>
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground uppercase tracking-wide">Exchange Rate</div>
          <div className="flex items-baseline gap-2">
            <span className="text-sm text-muted-foreground">1 {baseCurrency} =</span>
            <span className="text-3xl font-bold text-foreground currency-rate">
              {currency.rate.toFixed(4)}
            </span>
            <span className="text-sm text-muted-foreground">{currency.code}</span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-border/50">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Live Rate</span>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-accent font-medium">Active</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
