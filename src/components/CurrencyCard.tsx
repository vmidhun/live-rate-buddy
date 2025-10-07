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
      
      <div className="relative p-8">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-8 h-8 text-accent/60" />
          <span className="text-3xl font-bold text-foreground">{currency.code}</span>
        </div>
        
        <div className="text-5xl font-bold text-foreground currency-rate tracking-tight">
          {currency.rate.toFixed(4)}
        </div>
      </div>
    </Card>
  );
};
