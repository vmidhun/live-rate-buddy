import { CURRENCY_NAMES } from '@/data/currencyNames';
import { CurrencyRate } from '@/types/currency';
import { Card } from '@/components/ui/card';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface CurrencyRowProps {
  id: string;
  currency: CurrencyRate;
  baseCurrency: string;
  showComparison: boolean;
  amount: number;
}

export const CurrencyRow = ({ id, currency, baseCurrency, showComparison, amount }: CurrencyRowProps) => {
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

  const baseToQuote = currency.rate;
  const quoteToBase = 1 / currency.rate;

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card className="group relative overflow-hidden border border-border bg-gradient-to-br from-card to-card/50 p-4 mb-2">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-foreground">{currency.code}</span>
              <p className="text-xs text-muted-foreground truncate" title={CURRENCY_NAMES[currency.code]}>
                {CURRENCY_NAMES[currency.code]}
              </p>
            </div>
          </div>
          <div className="text-right">
            {showComparison ? (
              <p className="text-md font-bold text-foreground">
                {amount.toFixed(2)} {currency.code} = {(quoteToBase * amount).toFixed(4)} {baseCurrency}
              </p>
            ) : (
              <p className="text-md font-bold text-foreground">
                {amount.toFixed(2)} {baseCurrency} = {(baseToQuote * amount).toFixed(4)} {currency.code}
              </p>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};
