
import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, BarChart3 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { StockData } from '../types/stock';

interface MarketOverviewProps {
  stocks: StockData[];
}

export const MarketOverview: React.FC<MarketOverviewProps> = ({ stocks }) => {
  const gainers = stocks.filter(s => s.change > 0).length;
  const losers = stocks.filter(s => s.change < 0).length;
  const totalVolume = stocks.reduce((sum, stock) => sum + stock.volume, 0);
  const avgChange = stocks.reduce((sum, stock) => sum + stock.changePercent, 0) / stocks.length;

  const formatVolume = (num: number) => {
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
    return num.toLocaleString();
  };

  const marketStats = [
    {
      title: 'Market Gainers',
      value: gainers.toString(),
      subtitle: `${((gainers / stocks.length) * 100).toFixed(1)}% of stocks`,
      icon: TrendingUp,
      color: 'text-trading-green',
      bgColor: 'bg-trading-green/10'
    },
    {
      title: 'Market Losers',
      value: losers.toString(),
      subtitle: `${((losers / stocks.length) * 100).toFixed(1)}% of stocks`,
      icon: TrendingDown,
      color: 'text-trading-red',
      bgColor: 'bg-trading-red/10'
    },
    {
      title: 'Total Volume',
      value: formatVolume(totalVolume),
      subtitle: 'Across all tracked stocks',
      icon: BarChart3,
      color: 'text-trading-blue',
      bgColor: 'bg-trading-blue/10'
    },
    {
      title: 'Avg. Change',
      value: `${avgChange >= 0 ? '+' : ''}${avgChange.toFixed(2)}%`,
      subtitle: 'Market sentiment',
      icon: DollarSign,
      color: avgChange >= 0 ? 'text-trading-green' : 'text-trading-red',
      bgColor: avgChange >= 0 ? 'bg-trading-green/10' : 'bg-trading-red/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {marketStats.map((stat, index) => (
        <Card key={index} className="trading-card group">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
              <p className={`text-2xl font-bold mb-1 ${stat.color}`}>
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
            </div>
            <div className={`p-3 rounded-lg ${stat.bgColor} group-hover:scale-110 transition-transform duration-200`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
