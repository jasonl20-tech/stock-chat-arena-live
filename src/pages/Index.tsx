
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { MarketOverview } from '../components/MarketOverview';
import { StockCard } from '../components/StockCard';
import { WatchlistButton } from '../components/WatchlistButton';
import { Button } from '@/components/ui/button';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { useStockData } from '../hooks/useStockData';
import { useWatchlist } from '../hooks/useWatchlist';
import { StockData } from '../types/stock';

const STOCKS_PER_PAGE = 50;

const Index = () => {
  const navigate = useNavigate();
  const { stocks, isLoading, error, refreshData } = useStockData();
  const { isInWatchlist, toggleWatchlist, getWatchlistSymbols } = useWatchlist();
  const [selectedStock, setSelectedStock] = useState<StockData | null>(null);
  const [filter, setFilter] = useState<'all' | 'gainers' | 'losers' | 'watchlist'>('all');
  const [sortBy, setSortBy] = useState<'price' | 'change' | 'volume'>('change');
  const [currentPage, setCurrentPage] = useState(1);

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

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedStocks.length / STOCKS_PER_PAGE);
  const startIndex = (currentPage - 1) * STOCKS_PER_PAGE;
  const endIndex = startIndex + STOCKS_PER_PAGE;
  const currentStocks = filteredAndSortedStocks.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filter, sortBy]);

  const handleStockSelect = (stock: StockData) => {
    navigate(`/stock/${stock.symbol}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (error) {
    return (
      <div className="min-h-screen bg-trading-gradient flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Fehler beim Laden der Daten</h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Button onClick={refreshData} className="bg-trading-green text-black hover:bg-trading-green/80">
            Erneut versuchen
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-trading-gradient">
      <Header stocks={stocks} onStockSelect={handleStockSelect} />
      
      {/* Hero Section */}
      <HeroSection stocks={stocks} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Market Overview */}
        <MarketOverview stocks={stocks} />

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Filter:</span>
            <div className="flex gap-2">
              <Button
                variant={filter === 'all' ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter('all')}
                className={
                  filter === 'all'
                    ? 'bg-trading-green text-black hover:bg-trading-green/80'
                    : 'border-white/20 text-white hover:bg-white/10'
                }
              >
                Alle
              </Button>
              <Button
                variant={filter === 'gainers' ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter('gainers')}
                className={
                  filter === 'gainers'
                    ? 'bg-trading-green text-black hover:bg-trading-green/80'
                    : 'border-white/20 text-white hover:bg-white/10'
                }
              >
                Gewinner
              </Button>
              <Button
                variant={filter === 'losers' ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter('losers')}
                className={
                  filter === 'losers'
                    ? 'bg-trading-green text-black hover:bg-trading-green/80'
                    : 'border-white/20 text-white hover:bg-white/10'
                }
              >
                Verlierer
              </Button>
              <Button
                variant={filter === 'watchlist' ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter('watchlist')}
                className={
                  filter === 'watchlist'
                    ? 'bg-trading-green text-black hover:bg-trading-green/80'
                    : 'border-white/20 text-white hover:bg-white/10'
                }
              >
                Watchlist
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sortieren nach:</span>
            <div className="flex gap-2">
              <Button
                variant={sortBy === 'change' ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy('change')}
                className={
                  sortBy === 'change'
                    ? 'bg-trading-blue text-white hover:bg-trading-blue/80'
                    : 'border-white/20 text-white hover:bg-white/10'
                }
              >
                Änderung
              </Button>
              <Button
                variant={sortBy === 'price' ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy('price')}
                className={
                  sortBy === 'price'
                    ? 'bg-trading-blue text-white hover:bg-trading-blue/80'
                    : 'border-white/20 text-white hover:bg-white/10'
                }
              >
                Kurs
              </Button>
              <Button
                variant={sortBy === 'volume' ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy('volume')}
                className={
                  sortBy === 'volume'
                    ? 'bg-trading-blue text-white hover:bg-trading-blue/80'
                    : 'border-white/20 text-white hover:bg-white/10'
                }
              >
                Volumen
              </Button>
            </div>
          </div>

          <Button
            onClick={refreshData}
            disabled={isLoading}
            variant="outline"
            size="sm"
            className="border-white/20 text-white hover:bg-white/10"
          >
            {isLoading ? 'Aktualisiere...' : 'Daten aktualisieren'}
          </Button>
        </div>

        {/* Results Counter & Pagination Info */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            {filteredAndSortedStocks.length} von {stocks.length} Aktien gefunden
            {totalPages > 1 && (
              <span className="ml-2">
                • Seite {currentPage} von {totalPages}
              </span>
            )}
          </p>
          <p className="text-sm text-muted-foreground">
            Zeige {startIndex + 1}-{Math.min(endIndex, filteredAndSortedStocks.length)} von {filteredAndSortedStocks.length}
          </p>
        </div>

        {/* Stock Grid */}
        {filteredAndSortedStocks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              Keine Aktien gefunden, die Ihren Kriterien entsprechen
            </p>
            <Button
              onClick={() => setFilter('all')}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              Alle Aktien anzeigen
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentStocks.map((stock) => (
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    {currentPage > 1 && (
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => handlePageChange(currentPage - 1)}
                          className="border-white/20 text-white hover:bg-white/10 cursor-pointer"
                        >
                          Zurück
                        </PaginationPrevious>
                      </PaginationItem>
                    )}
                    
                    {/* Page Numbers */}
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNumber;
                      if (totalPages <= 5) {
                        pageNumber = i + 1;
                      } else if (currentPage <= 3) {
                        pageNumber = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNumber = totalPages - 4 + i;
                      } else {
                        pageNumber = currentPage - 2 + i;
                      }
                      
                      return (
                        <PaginationItem key={pageNumber}>
                          <PaginationLink
                            onClick={() => handlePageChange(pageNumber)}
                            isActive={currentPage === pageNumber}
                            className={`cursor-pointer ${
                              currentPage === pageNumber
                                ? 'bg-trading-green text-black hover:bg-trading-green/80'
                                : 'border-white/20 text-white hover:bg-white/10'
                            }`}
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}

                    {currentPage < totalPages && (
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => handlePageChange(currentPage + 1)}
                          className="border-white/20 text-white hover:bg-white/10 cursor-pointer"
                        >
                          Weiter
                        </PaginationNext>
                      </P

aginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        )}

        {/* Footer */}
        <footer className="mt-16 py-8 border-t border-white/10 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-2 h-2 bg-trading-green rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground">
              Live-Marktdaten • Updates alle 5 Sekunden
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            StockTracker Pro - Professionelles Trading-Dashboard
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
