import { CURRENCY_NAMES } from '@/data/currencyNames';
import { CurrencyRate } from '@/types/currency';
import { Card } from '@/components/ui/card';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface CurrencyCardProps {
  id: string;
  currency: CurrencyRate;
  baseCurrency: string;
  comparisonMode: 'base' | 'quote';
}

export const CurrencyCard = ({ id, currency, baseCurrency, comparisonMode }: CurrencyCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const displayRate = comparisonMode === 'base' ? currency.rate : 1 / currency.rate;
  const topCurrency = comparisonMode === 'base' ? currency.code : baseCurrency;
  const bottomCurrency = comparisonMode === 'base' ? baseCurrency : currency.code;

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card className="group relative overflow-hidden border border-border bg-gradient-to-br from-card to-card/50 shadow-[var(--shadow-card)] transition-all duration-300 hover:shadow-[var(--shadow-hover)] hover:scale-[1.02] aspect-square">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-2xl transform translate-x-16 -translate-y-16 transition-transform duration-500 group-hover:scale-150" />
        
        <div className="relative h-full flex flex-col justify-around p-4 text-center">
       
         {/* Top half */}
        <div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl text-foreground"> <p className="text-xs text-muted-foreground mt-1 truncate" title={CURRENCY_NAMES[bottomCurrency]}>
            {CURRENCY_NAMES[bottomCurrency]}
          </p></span>
          </div>
          <div className="text-1xl font-bold text-foreground currency-rate tracking-tight mt-1">
            1.00
          </div>
         
        </div>

      <div className="w-full h-[1px] bg-border my-2"></div> 

        {/* Bottom half */}
        <div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl text-foreground">{topCurrency}</span>
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-lg shadow-accent/50" />
          </div>
          <div className="text-3xl font-bold text-foreground currency-rate tracking-tight mt-1">
            {displayRate.toFixed(4)}
          </div>
          <p className="text-xs text-muted-foreground mt-1 truncate" title={CURRENCY_NAMES[topCurrency]}>
            {CURRENCY_NAMES[topCurrency]}
          </p>
        </div>

        

      
        </div>
      </Card>
    </div>
  );
};
