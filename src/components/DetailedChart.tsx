
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StockData } from '../types/stock';

interface DetailedChartProps {
  stock: StockData;
}

type ChartPeriod = '1D' | '1W' | '1M' | '3M' | '1J' | '5J';

export const DetailedChart: React.FC<DetailedChartProps> = ({ stock }) => {
  const [period, setPeriod] = useState<ChartPeriod>('1M');
  const [chartType, setChartType] = useState<'price' | 'volume'>('price');

  const isPositive = stock.change >= 0;
  const chartColor = isPositive ? '#00FF88' : '#FF3366';

  const formatChartData = () => {
    return stock.chartData.map(item => ({
      ...item,
      date: new Date(item.timestamp).toLocaleDateString('de-DE', { 
        month: 'short', 
        day: 'numeric' 
      }),
      volumeFormatted: (item.volume / 1e6).toFixed(1)
    }));
  };

  const periods: ChartPeriod[] = ['1D', '1W', '1M', '3M', '1J', '5J'];

  return (
    <Card className="trading-card">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">Kursverlauf</h3>
          <div className="flex gap-2">
            <Button
              variant={chartType === 'price' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartType('price')}
              className={chartType === 'price' 
                ? 'bg-trading-green text-black hover:bg-trading-green/80'
                : 'border-white/20 text-white hover:bg-white/10'
              }
            >
              Kurs
            </Button>
            <Button
              variant={chartType === 'volume' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartType('volume')}
              className={chartType === 'volume' 
                ? 'bg-trading-green text-black hover:bg-trading-green/80'
                : 'border-white/20 text-white hover:bg-white/10'
              }
            >
              Volumen
            </Button>
          </div>
        </div>

        {/* Period Selector */}
        <div className="flex gap-2 mb-6">
          {periods.map((p) => (
            <Button
              key={p}
              variant={period === p ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPeriod(p)}
              className={period === p 
                ? 'bg-trading-blue text-white hover:bg-trading-blue/80'
                : 'border-white/20 text-white hover:bg-white/10'
              }
            >
              {p}
            </Button>
          ))}
        </div>

        {/* Chart */}
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'price' ? (
              <LineChart data={formatChartData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis 
                  dataKey="date" 
                  stroke="#888"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#888"
                  fontSize={12}
                  domain={['dataMin - 5', 'dataMax + 5']}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #333',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value: number) => [`$${value.toFixed(2)}`, 'Kurs']}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke={chartColor}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: chartColor }}
                />
              </LineChart>
            ) : (
              <BarChart data={formatChartData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis 
                  dataKey="date" 
                  stroke="#888"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#888"
                  fontSize={12}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #333',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value: number) => [`${value}M`, 'Volumen']}
                />
                <Bar
                  dataKey="volumeFormatted"
                  fill={chartColor}
                  opacity={0.8}
                />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};
