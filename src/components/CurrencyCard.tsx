import { CURRENCY_NAMES } from '@/data/currencyNames';
import { CurrencyRate } from '@/types/currency';
import { Card } from '@/components/ui/card';

interface CurrencyCardProps {
  currency: CurrencyRate;
  baseCurrency: string;
}

export const CurrencyCard = ({ currency, baseCurrency }: CurrencyCardProps) => {
  const reverseRate = 1 / currency.rate;

  return (
    <Card className="group relative overflow-hidden border border-border bg-gradient-to-br from-card to-card/50 shadow-[var(--shadow-card)] transition-all duration-300 hover:shadow-[var(--shadow-hover)] hover:scale-[1.02] aspect-square">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-2xl transform translate-x-16 -translate-y-16 transition-transform duration-500 group-hover:scale-150" />
      
      <div className="relative h-full flex flex-col justify-around p-4 text-center">
        {/* Top half */}
        <div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl text-foreground">{currency.code}</span>
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-lg shadow-accent/50" />
          </div>
          <div className="text-3xl font-bold text-foreground currency-rate tracking-tight mt-1">
            {currency.rate.toFixed(4)}
          </div>
          <p className="text-xs text-muted-foreground mt-1 truncate" title={CURRENCY_NAMES[currency.code]}>
            {CURRENCY_NAMES[currency.code]}
          </p>
        </div>

        <div className="w-full h-[1px] bg-border my-2"></div>

        {/* Bottom half */}
        <div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl text-foreground"> <p className="text-xs text-muted-foreground mt-1 truncate" title={CURRENCY_NAMES[baseCurrency]}>
            {CURRENCY_NAMES[baseCurrency]}
          </p></span>
          </div>
          <div className="text-1xl font-bold text-foreground currency-rate tracking-tight mt-1">
            {reverseRate.toFixed(4)}
          </div>
         
        </div>
      </div>
    </Card>
  );
};
