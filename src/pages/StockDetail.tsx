
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, TrendingDown, BarChart, DollarSign, Calendar, Globe } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useStockData } from '../hooks/useStockData';
import { DetailedChart } from '../components/DetailedChart';
import { StockNews } from '../components/StockNews';
import { StockMetrics } from '../components/StockMetrics';
import { WatchlistButton } from '../components/WatchlistButton';
import { useWatchlist } from '../hooks/useWatchlist';

const StockDetail = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const navigate = useNavigate();
  const { getStockBySymbol } = useStockData();
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  
  const stock = symbol ? getStockBySymbol(symbol) : null;

  if (!stock) {
    return (
      <div className="min-h-screen bg-trading-gradient flex items-center justify-center">
        <Card className="trading-card p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Aktie nicht gefunden</h2>
          <p className="text-muted-foreground mb-6">Die angeforderte Aktie konnte nicht gefunden werden.</p>
          <Button onClick={() => navigate('/')} className="bg-trading-green text-black hover:bg-trading-green/80">
            Zurück zur Übersicht
          </Button>
        </Card>
      </div>
    );
  }

  const isPositive = stock.change >= 0;

  return (
    <div className="min-h-screen bg-trading-gradient">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => navigate('/')}
                variant="outline"
                size="sm"
                className="border-white/20 text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Zurück
              </Button>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-white">{stock.symbol}</h1>
                  {stock.sector && (
                    <Badge variant="secondary" className="bg-white/10 text-white">
                      {stock.sector}
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground">{stock.name}</p>
              </div>
            </div>
            <WatchlistButton
              isInWatchlist={isInWatchlist(stock.symbol)}
              onToggle={() => toggleWatchlist(stock.symbol)}
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Price Overview */}
        <Card className="trading-card mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-4xl font-bold text-white mb-2">
                ${stock.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className={`flex items-center gap-2 text-lg ${
                isPositive ? 'text-trading-green' : 'text-trading-red'
              }`}>
                {isPositive ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                <span>
                  {isPositive ? '+' : ''}${stock.change.toFixed(2)} ({isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
            <div className="text-right text-sm text-muted-foreground">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4" />
                Letztes Update: {stock.lastUpdated.toLocaleTimeString('de-DE')}
              </div>
              <div className="flex items-center gap-2">
                <BarChart className="w-4 h-4" />
                Volumen: {(stock.volume / 1e6).toFixed(1)}M
              </div>
            </div>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center p-3 bg-white/5 rounded-lg">
              <div className="text-muted-foreground mb-1">Vorheriger Schluss</div>
              <div className="text-white font-semibold">${stock.previousClose.toFixed(2)}</div>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-lg">
              <div className="text-muted-foreground mb-1">Tageshoch</div>
              <div className="text-white font-semibold">${stock.dayHigh.toFixed(2)}</div>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-lg">
              <div className="text-muted-foreground mb-1">Tagestief</div>
              <div className="text-white font-semibold">${stock.dayLow.toFixed(2)}</div>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-lg">
              <div className="text-muted-foreground mb-1">Marktkapitalisierung</div>
              <div className="text-white font-semibold">
                {stock.marketCap ? `$${(stock.marketCap / 1e9).toFixed(1)}B` : 'N/A'}
              </div>
            </div>
          </div>
        </Card>

        {/* Chart and Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <DetailedChart stock={stock} />
          </div>
          <div>
            <StockMetrics stock={stock} />
          </div>
        </div>

        {/* News */}
        <StockNews symbol={stock.symbol} />
      </div>
    </div>
  );
};

export default StockDetail;
