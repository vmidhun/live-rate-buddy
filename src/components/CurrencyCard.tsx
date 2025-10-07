import { CURRENCY_NAMES } from '@/data/currencyNames';
import { CurrencyRate } from '@/types/currency';
import { Card } from '@/components/ui/card';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface CurrencyCardProps {
  id: string;
  currency: CurrencyRate;
  baseCurrency: string;
  showComparison: boolean;
}

export const CurrencyCard = ({ id, currency, baseCurrency, showComparison }: CurrencyCardProps) => {
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

  const displayRate = showComparison ? 1 / currency.rate : currency.rate;
  const topCurrency = showComparison ? baseCurrency : currency.code;
  const bottomCurrency = showComparison ? currency.code : baseCurrency;

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card className="group relative overflow-hidden border border-border bg-gradient-to-br from-card to-card/50 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02] aspect-square">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-2xl transform translate-x-16 -translate-y-16 transition-transform duration-500 group-hover:scale-150" />
        
        <div className="relative h-full flex flex-col justify-center p-1 text-center">
          
          {/* Top half */}
          <div className="flex-1 flex flex-col justify-center items-center p-1">
           
            <div className="text-sm text-foreground tracking-tight">
              1.00
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xl text-foreground">{bottomCurrency}</span>
            </div>
            <p className="text-xs text-muted-foreground truncate" title={CURRENCY_NAMES[bottomCurrency]}>
              {CURRENCY_NAMES[bottomCurrency]}
            </p>
          </div>

          <div className="w-full h-[1px] bg-border my-1"></div> 

          {/* Bottom half */}
          <div className="flex-1 flex flex-col justify-center items-center p-1">
           <div className="text-2xl font-bold text-foreground tracking-tight">
              {displayRate.toFixed(4)}
            </div> 
            <div className="flex items-center gap-1">
              <span className="text-xl text-foreground">{topCurrency}</span>
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-lg shadow-accent/50" />
            </div>
            <p className="text-xs text-muted-foreground truncate" title={CURRENCY_NAMES[topCurrency]}>
              {CURRENCY_NAMES[topCurrency]}
            </p>
            
          </div>
        </div>
      </Card>
    </div>
  );
};
