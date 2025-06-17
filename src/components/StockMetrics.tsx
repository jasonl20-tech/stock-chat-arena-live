
import React from 'react';
import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Target, Percent } from 'lucide-react';
import { StockData } from '../types/stock';

interface StockMetricsProps {
  stock: StockData;
}

export const StockMetrics: React.FC<StockMetricsProps> = ({ stock }) => {
  const isPositive = stock.change >= 0;

  // Simulate additional metrics (in real app, these would come from API)
  const additionalMetrics = {
    pe: (15 + Math.random() * 25).toFixed(2),
    eps: (stock.price / 20).toFixed(2),
    dividend: (1.5 + Math.random() * 3).toFixed(2),
    yield: ((Math.random() * 5) + 1).toFixed(2),
    beta: (0.8 + Math.random() * 0.8).toFixed(2),
    week52High: (stock.price * (1.1 + Math.random() * 0.3)).toFixed(2),
    week52Low: (stock.price * (0.7 + Math.random() * 0.2)).toFixed(2)
  };

  const metrics = [
    {
      label: 'KGV (P/E)',
      value: additionalMetrics.pe,
      icon: Target,
      description: 'Kurs-Gewinn-Verhältnis'
    },
    {
      label: 'Gewinn pro Aktie',
      value: `$${additionalMetrics.eps}`,
      icon: DollarSign,
      description: 'Earnings per Share'
    },
    {
      label: 'Dividende',
      value: `$${additionalMetrics.dividend}`,
      icon: TrendingUp,
      description: 'Jährliche Dividende'
    },
    {
      label: 'Dividendenrendite',
      value: `${additionalMetrics.yield}%`,
      icon: Percent,
      description: 'Dividend Yield'
    },
    {
      label: 'Beta',
      value: additionalMetrics.beta,
      icon: BarChart3,
      description: 'Marktvolatilität'
    },
    {
      label: '52W Hoch',
      value: `$${additionalMetrics.week52High}`,
      icon: TrendingUp,
      description: '52-Wochen-Hoch'
    },
    {
      label: '52W Tief',
      value: `$${additionalMetrics.week52Low}`,
      icon: TrendingDown,
      description: '52-Wochen-Tief'
    }
  ];

  return (
    <Card className="trading-card">
      <h3 className="text-xl font-bold text-white mb-6">Kennzahlen</h3>
      
      <div className="space-y-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 text-trading-green" />
                <div>
                  <div className="text-white font-medium text-sm">{metric.label}</div>
                  <div className="text-xs text-muted-foreground">{metric.description}</div>
                </div>
              </div>
              <div className="text-white font-semibold">{metric.value}</div>
            </div>
          );
        })}
      </div>

      {/* Performance Summary */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <h4 className="text-lg font-semibold text-white mb-4">Performance</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-white/5 rounded-lg">
            <div className="text-xs text-muted-foreground mb-1">Heute</div>
            <div className={`font-semibold ${isPositive ? 'text-trading-green' : 'text-trading-red'}`}>
              {isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%
            </div>
          </div>
          <div className="text-center p-3 bg-white/5 rounded-lg">
            <div className="text-xs text-muted-foreground mb-1">Volatilität</div>
            <div className="text-white font-semibold">{additionalMetrics.beta}</div>
          </div>
        </div>
      </div>
    </Card>
  );
};
