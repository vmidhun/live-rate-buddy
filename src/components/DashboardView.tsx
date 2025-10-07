import { CurrencyRate } from '@/types/currency';
import { CurrencyCard } from './CurrencyCard';
import { CurrencyRow } from './CurrencyRow';
import { Settings, RefreshCw, TrendingUp, LayoutGrid, List } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis, restrictToWindowEdges } from '@dnd-kit/modifiers';
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
  isDataStale: boolean;
  onDragEnd: (event: DragEndEvent) => void;
  displayMode: 'grid' | 'list';
  onToggleDisplayMode: () => void;
};

export const DashboardView = ({
  baseCurrency,
  currencies,
  onBaseCurrencyChange,
  onRefresh,
  onOpenConfig,
  isLoading,
  lastUpdated,
  isDataStale,
  onDragEnd,
  displayMode,
  onToggleDisplayMode,
}: DashboardViewProps) => {
  const availableCurrencies = Object.keys(CURRENCY_NAMES).sort();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor, {
      // Drag starts after a 10px movement
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-8 pb-24 max-w-7xl">
        {/* Header */}
        <div className="sticky top-0 bg-background/80 backdrop-blur-sm z-10 py-4 -mx-4 px-4 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-accent">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              X-Change
            </h1>
          </div>
          <p className="text-muted-foreground text-md">
            Real-time exchange dashboard
          </p>
          <div className="mt-4">
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
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="hidden sm:flex gap-2 sm:self-end">
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

        {/* Currency Grid / List */}
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
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={onDragEnd}
            modifiers={displayMode === 'list' ? [restrictToVerticalAxis, restrictToWindowEdges] : [restrictToWindowEdges]}
          >
            <SortableContext 
              items={currencies.map(c => c.code)} 
              strategy={displayMode === 'grid' ? rectSortingStrategy : verticalListSortingStrategy}
            >
              {displayMode === 'grid' ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {currencies.map((currency) => (
                    <CurrencyCard
                      key={currency.code}
                      id={currency.code}
                      currency={currency}
                      baseCurrency={baseCurrency}
                    />
                  ))}
                </div>
              ) : (
                <div>
                  {currencies.map((currency) => (
                    <CurrencyRow
                      key={currency.code}
                      id={currency.code}
                      currency={currency}
                      baseCurrency={baseCurrency}
                    />
                  ))}
                </div>
              )}
            </SortableContext>
          </DndContext>
        )}
      </div>

      {/* Sticky Footer for Mobile */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-t border-border p-2 z-10">
        <div className="flex flex-col items-center text-center">
          {lastUpdated && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className={`w-2 h-2 rounded-full ${isDataStale ? 'bg-amber-500' : 'bg-accent'} animate-pulse`} />
              Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
          )}
          {isDataStale && (
            <div className="text-xs text-amber-500 font-medium">
              Cached data is being shown. Refresh for the latest rates.
            </div>
          )}
        </div>
        <div className="flex justify-around items-center mt-1">
          <Button
            onClick={onRefresh}
            disabled={isLoading}
            variant="ghost"
            className="flex flex-col items-center h-auto"
          >
            <RefreshCw className={`w-6 h-6 mb-1 ${isLoading ? 'animate-spin' : ''}`} />
            <span className="text-xs">Refresh</span>
          </Button>
          <Button
            onClick={onToggleDisplayMode}
            variant="ghost"
            className="flex flex-col items-center h-auto"
          >
            {displayMode === 'grid' ? (
              <List className="w-6 h-6 mb-1" />
            ) : (
              <LayoutGrid className="w-6 h-6 mb-1" />
            )}
            <span className="text-xs">View</span>
          </Button>
          <Button
            onClick={onOpenConfig}
            variant="ghost"
            className="flex flex-col items-center h-auto"
          >
            <Settings className="w-6 h-6 mb-1" />
            <span className="text-xs">Configure</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
