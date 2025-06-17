
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { StockData } from '../types/stock';
import { MiniChart } from './MiniChart';

interface StockCardProps {
  stock: StockData;
  onClick?: () => void;
  isInWatchlist?: boolean;
  onToggleWatchlist?: (symbol: string) => void;
}

export const StockCard: React.FC<StockCardProps> = ({ 
  stock, 
  onClick, 
  isInWatchlist = false,
  onToggleWatchlist 
}) => {
  const isPositive = stock.change >= 0;
  const formatNumber = (num: number) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${num.toLocaleString()}`;
  };

  const formatVolume = (num: number) => {
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`;
    return num.toLocaleString();
  };

  return (
    <Card 
      className={`trading-card cursor-pointer group relative overflow-hidden animate-slide-up ${
        isPositive ? 'hover:glow-green' : 'hover:glow-red'
      }`}
      onClick={onClick}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white">{stock.symbol}</h3>
              {isInWatchlist && (
                <div className="w-2 h-2 bg-trading-green rounded-full animate-pulse" />
              )}
            </div>
            <p className="text-sm text-muted-foreground truncate max-w-[200px]">
              {stock.name}
            </p>
            {stock.sector && (
              <span className="inline-block px-2 py-1 text-xs bg-white/10 rounded-full text-muted-foreground mt-1">
                {stock.sector}
              </span>
            )}
          </div>
          <div className="flex items-center">
            {isPositive ? (
              <TrendingUp className="w-5 h-5 text-trading-green" />
            ) : (
              <TrendingDown className="w-5 h-5 text-trading-red" />
            )}
          </div>
        </div>

        {/* Price */}
        <div className="mb-4">
          <div className="text-2xl font-bold text-white mb-1">
            ${stock.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className={`flex items-center gap-2 text-sm ${
            isPositive ? 'text-trading-green' : 'text-trading-red'
          }`}>
            <span>
              {isPositive ? '+' : ''}${stock.change.toFixed(2)}
            </span>
            <span>
              ({isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>

        {/* Mini Chart */}
        <div className="mb-4 h-16">
          <MiniChart data={stock.chartData} isPositive={isPositive} />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
          <div>
            <div className="text-white font-medium">Volume</div>
            <div>{formatVolume(stock.volume)}</div>
          </div>
          <div>
            <div className="text-white font-medium">Market Cap</div>
            <div>{stock.marketCap ? formatNumber(stock.marketCap) : 'N/A'}</div>
          </div>
          <div>
            <div className="text-white font-medium">Day High</div>
            <div>${stock.dayHigh.toFixed(2)}</div>
          </div>
          <div>
            <div className="text-white font-medium">Day Low</div>
            <div>${stock.dayLow.toFixed(2)}</div>
          </div>
        </div>

        {/* Last Updated */}
        <div className="mt-4 pt-3 border-t border-white/10 text-xs text-muted-foreground">
          Last updated: {stock.lastUpdated.toLocaleTimeString()}
        </div>
      </div>
    </Card>
  );
};
