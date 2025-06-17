
import React, { useState, useMemo } from 'react';
import { Header } from '../components/Header';
import { MarketOverview } from '../components/MarketOverview';
import { StockCard } from '../components/StockCard';
import { WatchlistButton } from '../components/WatchlistButton';
import { Button } from '@/components/ui/button';
import { useStockData } from '../hooks/useStockData';
import { useWatchlist } from '../hooks/useWatchlist';
import { StockData } from '../types/stock';

const Index = () => {
  const { stocks, isLoading, error, refreshData } = useStockData();
  const { isInWatchlist, toggleWatchlist, getWatchlistSymbols } = useWatchlist();
  const [selectedStock, setSelectedStock] = useState<StockData | null>(null);
  const [filter, setFilter] = useState<'all' | 'gainers' | 'losers' | 'watchlist'>('all');
  const [sortBy, setSortBy] = useState<'price' | 'change' | 'volume'>('change');

  const filteredAndSortedStocks = useMemo(() => {
    let filtered = [...stocks];

    // Apply filters
    switch (filter) {
      case 'gainers':
        filtered = filtered.filter(stock => stock.change > 0);
        break;
      case 'losers':
        filtered = filtered.filter(stock => stock.change < 0);
        break;
      case 'watchlist':
        const watchlistSymbols = getWatchlistSymbols();
        filtered = filtered.filter(stock => watchlistSymbols.includes(stock.symbol));
        break;
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return b.price - a.price;
        case 'change':
          return Math.abs(b.changePercent) - Math.abs(a.changePercent);
        case 'volume':
          return b.volume - a.volume;
        default:
          return 0;
      }
    });

    return filtered;
  }, [stocks, filter, sortBy, getWatchlistSymbols]);

  const handleStockSelect = (stock: StockData) => {
    setSelectedStock(stock);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-trading-gradient flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Error Loading Data</h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Button onClick={refreshData} className="bg-trading-green text-black hover:bg-trading-green/80">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-trading-gradient">
      <Header stocks={stocks} onStockSelect={handleStockSelect} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Market Overview */}
        <MarketOverview stocks={stocks} />

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Filter:</span>
            <div className="flex gap-2">
              {(['all', 'gainers', 'losers', 'watchlist'] as const).map((filterOption) => (
                <Button
                  key={filterOption}
                  variant={filter === filterOption ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(filterOption)}
                  className={
                    filter === filterOption
                      ? 'bg-trading-green text-black hover:bg-trading-green/80'
                      : 'border-white/20 text-white hover:bg-white/10'
                  }
                >
                  {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <div className="flex gap-2">
              {(['change', 'price', 'volume'] as const).map((sortOption) => (
                <Button
                  key={sortOption}
                  variant={sortBy === sortOption ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortBy(sortOption)}
                  className={
                    sortBy === sortOption
                      ? 'bg-trading-blue text-white hover:bg-trading-blue/80'
                      : 'border-white/20 text-white hover:bg-white/10'
                  }
                >
                  {sortOption.charAt(0).toUpperCase() + sortOption.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          <Button
            onClick={refreshData}
            disabled={isLoading}
            variant="outline"
            size="sm"
            className="border-white/20 text-white hover:bg-white/10"
          >
            {isLoading ? 'Refreshing...' : 'Refresh Data'}
          </Button>
        </div>

        {/* Results Counter */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {filteredAndSortedStocks.length} of {stocks.length} stocks
          </p>
        </div>

        {/* Stock Grid */}
        {filteredAndSortedStocks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              No stocks found matching your criteria
            </p>
            <Button
              onClick={() => setFilter('all')}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              Show All Stocks
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedStocks.map((stock) => (
              <div key={stock.symbol} className="relative">
                <StockCard
                  stock={stock}
                  onClick={() => handleStockSelect(stock)}
                  isInWatchlist={isInWatchlist(stock.symbol)}
                />
                <div className="absolute top-4 right-4">
                  <WatchlistButton
                    isInWatchlist={isInWatchlist(stock.symbol)}
                    onToggle={() => toggleWatchlist(stock.symbol)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 py-8 border-t border-white/10 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-2 h-2 bg-trading-green rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground">
              Live market data • Updates every 5 seconds
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            StockTracker Pro - Professional Trading Dashboard
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
