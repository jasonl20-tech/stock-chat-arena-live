
import React from 'react';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';
import { ChartData } from '../types/stock';

interface MiniChartProps {
  data: ChartData[];
  isPositive: boolean;
}

export const MiniChart: React.FC<MiniChartProps> = ({ data, isPositive }) => {
  // Bereite Daten für den Chart vor
  const chartData = data.slice(-7).map(item => ({
    price: item.price
  }));

  const color = isPositive ? '#00FF88' : '#FF3366';

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData}>
        <YAxis hide domain={['dataMin - 5', 'dataMax + 5']} />
        <Line
          type="monotone"
          dataKey="price"
          stroke={color}
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 3, fill: color }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
