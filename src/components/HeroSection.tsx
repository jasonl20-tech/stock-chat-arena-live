
import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, BarChart3 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { StockData } from '../types/stock';

interface HeroSectionProps {
  stocks: StockData[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({ stocks }) => {
  // Berechne Marktstatistiken
  const totalStocks = stocks.length;
  const gainers = stocks.filter(stock => stock.change > 0).length;
  const losers = stocks.filter(stock => stock.change < 0).length;
  const avgChange = stocks.reduce((sum, stock) => sum + stock.changePercent, 0) / totalStocks;

  const stats = [
    {
      label: 'Verfügbare Aktien',
      value: totalStocks.toString(),
      icon: BarChart3,
      change: null,
      color: 'text-white'
    },
    {
      label: 'Gewinner heute',
      value: gainers.toString(),
      icon: TrendingUp,
      change: `${((gainers / totalStocks) * 100).toFixed(1)}%`,
      color: 'text-trading-green'
    },
    {
      label: 'Verlierer heute',
      value: losers.toString(),
      icon: TrendingDown,
      change: `${((losers / totalStocks) * 100).toFixed(1)}%`,
      color: 'text-trading-red'
    },
    {
      label: 'Ø Marktperformance',
      value: `${avgChange > 0 ? '+' : ''}${avgChange.toFixed(2)}%`,
      icon: DollarSign,
      change: avgChange > 0 ? 'Bullish' : 'Bearish',
      color: avgChange > 0 ? 'text-trading-green' : 'text-trading-red'
    }
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-trading-dark via-trading-dark/95 to-trading-blue/20 border-t border-b border-white/10">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-trading-green/5 via-transparent to-trading-blue/5" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-trading-green/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-trading-blue/10 rounded-full blur-3xl" />
      
      <div className="relative container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-trading-green to-trading-blue bg-clip-text text-transparent">
              Top-Aktien
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Entdecken Sie die besten Aktien mit Live-Kursen, detaillierten Charts und 
            professionellen Analysen. Ihr Gateway zu den internationalen Finanzmärkten.
          </p>
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="w-2 h-2 bg-trading-green rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground">
              Live-Updates alle 5 Sekunden
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="trading-card group hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                    {stat.change && (
                      <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                    )}
                  </div>
                  <div className={`p-3 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-white/5 rounded-full border border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-trading-green rounded-full animate-ping" />
              <span className="text-sm text-white font-medium">Live Trading Data</span>
            </div>
            <div className="w-px h-4 bg-white/20" />
            <span className="text-sm text-muted-foreground">
              Über {totalStocks} Aktien verfügbar
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
