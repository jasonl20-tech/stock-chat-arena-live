
import { StockData } from '../types/stock';

// Mock data für beliebte Aktien - in der realen App würden wir APIs verwenden
export const generateMockChartData = (basePrice: number, days: number = 30) => {
  const data = [];
  let currentPrice = basePrice;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Simuliere realistische Preisbewegungen
    const volatility = 0.02; // 2% volatility
    const change = (Math.random() - 0.5) * 2 * volatility;
    currentPrice *= (1 + change);
    
    data.push({
      timestamp: date.toISOString().split('T')[0],
      price: Number(currentPrice.toFixed(2)),
      volume: Math.floor(Math.random() * 10000000) + 1000000
    });
  }
  
  return data;
};

export const mockStocks: StockData[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 189.79,
    change: 2.34,
    changePercent: 1.25,
    volume: 89543210,
    marketCap: 2980000000000,
    previousClose: 187.45,
    dayHigh: 191.23,
    dayLow: 186.78,
    sector: 'Technology',
    chartData: generateMockChartData(189.79),
    lastUpdated: new Date()
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 142.56,
    change: -1.23,
    changePercent: -0.85,
    volume: 45632100,
    marketCap: 1800000000000,
    previousClose: 143.79,
    dayHigh: 144.12,
    dayLow: 141.89,
    sector: 'Technology',
    chartData: generateMockChartData(142.56),
    lastUpdated: new Date()
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: 378.91,
    change: 5.67,
    changePercent: 1.52,
    volume: 34521890,
    marketCap: 2810000000000,
    previousClose: 373.24,
    dayHigh: 380.45,
    dayLow: 375.12,
    sector: 'Technology',
    chartData: generateMockChartData(378.91),
    lastUpdated: new Date()
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    price: 153.38,
    change: -2.89,
    changePercent: -1.85,
    volume: 67821340,
    marketCap: 1590000000000,
    previousClose: 156.27,
    dayHigh: 157.23,
    dayLow: 152.45,
    sector: 'Consumer Discretionary',
    chartData: generateMockChartData(153.38),
    lastUpdated: new Date()
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    price: 248.73,
    change: 12.45,
    changePercent: 5.27,
    volume: 125473690,
    marketCap: 790000000000,
    previousClose: 236.28,
    dayHigh: 251.89,
    dayLow: 243.12,
    sector: 'Consumer Discretionary',
    chartData: generateMockChartData(248.73),
    lastUpdated: new Date()
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    price: 478.23,
    change: 8.91,
    changePercent: 1.90,
    volume: 78934520,
    marketCap: 1180000000000,
    previousClose: 469.32,
    dayHigh: 482.67,
    dayLow: 471.45,
    sector: 'Technology',
    chartData: generateMockChartData(478.23),
    lastUpdated: new Date()
  },
  {
    symbol: 'META',
    name: 'Meta Platforms Inc.',
    price: 334.87,
    change: -4.23,
    changePercent: -1.25,
    volume: 43287650,
    marketCap: 870000000000,
    previousClose: 339.10,
    dayHigh: 341.23,
    dayLow: 332.45,
    sector: 'Technology',
    chartData: generateMockChartData(334.87),
    lastUpdated: new Date()
  },
  {
    symbol: 'NFLX',
    name: 'Netflix Inc.',
    price: 445.67,
    change: 7.89,
    changePercent: 1.80,
    volume: 21456780,
    marketCap: 198000000000,
    previousClose: 437.78,
    dayHigh: 448.23,
    dayLow: 442.12,
    sector: 'Communication Services',
    chartData: generateMockChartData(445.67),
    lastUpdated: new Date()
  },
  // Deutsche Aktien
  {
    symbol: 'SAP',
    name: 'SAP SE',
    price: 134.82,
    change: 1.56,
    changePercent: 1.17,
    volume: 12387560,
    marketCap: 165000000000,
    previousClose: 133.26,
    dayHigh: 136.45,
    dayLow: 132.78,
    sector: 'Technology',
    chartData: generateMockChartData(134.82),
    lastUpdated: new Date()
  },
  {
    symbol: 'ASML',
    name: 'ASML Holding N.V.',
    price: 689.45,
    change: -12.34,
    changePercent: -1.76,
    volume: 8765432,
    marketCap: 285000000000,
    previousClose: 701.79,
    dayHigh: 695.23,
    dayLow: 684.12,
    sector: 'Technology',
    chartData: generateMockChartData(689.45),
    lastUpdated: new Date()
  },
  // Weitere beliebte Aktien
  {
    symbol: 'JPM',
    name: 'JPMorgan Chase & Co.',
    price: 178.34,
    change: 2.45,
    changePercent: 1.39,
    volume: 23456780,
    marketCap: 523000000000,
    previousClose: 175.89,
    dayHigh: 179.67,
    dayLow: 176.23,
    sector: 'Financial Services',
    chartData: generateMockChartData(178.34),
    lastUpdated: new Date()
  },
  {
    symbol: 'JNJ',
    name: 'Johnson & Johnson',
    price: 162.78,
    change: -0.89,
    changePercent: -0.54,
    volume: 18765432,
    marketCap: 428000000000,
    previousClose: 163.67,
    dayHigh: 164.23,
    dayLow: 161.45,
    sector: 'Healthcare',
    chartData: generateMockChartData(162.78),
    lastUpdated: new Date()
  }
];

// Funktion um Live-Updates zu simulieren
export const updateStockPrices = (stocks: StockData[]): StockData[] => {
  return stocks.map(stock => {
    const volatility = 0.005; // 0.5% volatility für Live-Updates
    const change = (Math.random() - 0.5) * 2 * volatility;
    const newPrice = stock.price * (1 + change);
    const priceChange = newPrice - stock.previousClose;
    const percentChange = (priceChange / stock.previousClose) * 100;

    return {
      ...stock,
      price: Number(newPrice.toFixed(2)),
      change: Number(priceChange.toFixed(2)),
      changePercent: Number(percentChange.toFixed(2)),
      lastUpdated: new Date()
    };
  });
};
