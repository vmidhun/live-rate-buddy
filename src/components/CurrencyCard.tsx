import { CurrencyRate } from '@/types/currency';
import { TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface CurrencyCardProps {
  currency: CurrencyRate;
  baseCurrency: string;
}

export const CurrencyCard = ({ currency, baseCurrency }: CurrencyCardProps) => {
  return (
    <Card className="group relative overflow-hidden border border-border bg-gradient-to-br from-card to-card/50 shadow-[var(--shadow-card)] transition-all duration-300 hover:shadow-[var(--shadow-hover)] hover:scale-[1.02] aspect-square">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-2xl transform translate-x-16 -translate-y-16 transition-transform duration-500 group-hover:scale-150" />
      
      <div className="relative h-full flex flex-col justify-between p-6">
        <div className="flex items-start justify-between">
          <span className="text-3xl font-bold text-foreground">{currency.code}</span>
          <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse shadow-lg shadow-accent/50" />
        </div>
        
        <div className="text-4xl font-bold text-foreground currency-rate tracking-tight">
          {currency.rate.toFixed(4)}
        </div>
      </div>
    </Card>
  );
};
