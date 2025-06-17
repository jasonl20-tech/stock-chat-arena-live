
import { StockData } from '../types/stock';

// Mock data für beliebte Aktien - erweitert mit mehr deutschen und internationalen Aktien
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
  // US Tech Giants
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
    sector: 'Technologie',
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
    sector: 'Technologie',
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
    sector: 'Technologie',
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
    sector: 'Einzelhandel',
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
    sector: 'Automobilindustrie',
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
    sector: 'Halbleiter',
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
    sector: 'Social Media',
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
    sector: 'Streaming',
    chartData: generateMockChartData(445.67),
    lastUpdated: new Date()
  },

  // Deutsche Aktien (DAX)
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
    sector: 'Software',
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
    sector: 'Halbleiter',
    chartData: generateMockChartData(689.45),
    lastUpdated: new Date()
  },
  {
    symbol: 'SIE',
    name: 'Siemens AG',
    price: 156.24,
    change: 3.12,
    changePercent: 2.04,
    volume: 15432890,
    marketCap: 125000000000,
    previousClose: 153.12,
    dayHigh: 158.90,
    dayLow: 154.23,
    sector: 'Industrietechnik',
    chartData: generateMockChartData(156.24),
    lastUpdated: new Date()
  },
  {
    symbol: 'BMW',
    name: 'Bayerische Motoren Werke AG',
    price: 89.45,
    change: -1.23,
    changePercent: -1.36,
    volume: 18765432,
    marketCap: 58000000000,
    previousClose: 90.68,
    dayHigh: 91.23,
    dayLow: 88.45,
    sector: 'Automobilindustrie',
    chartData: generateMockChartData(89.45),
    lastUpdated: new Date()
  },
  {
    symbol: 'MBG',
    name: 'Mercedes-Benz Group AG',
    price: 67.89,
    change: 0.89,
    changePercent: 1.33,
    volume: 22345678,
    marketCap: 72000000000,
    previousClose: 67.00,
    dayHigh: 68.45,
    dayLow: 66.78,
    sector: 'Automobilindustrie',
    chartData: generateMockChartData(67.89),
    lastUpdated: new Date()
  },
  {
    symbol: 'ALV',
    name: 'Allianz SE',
    price: 245.60,
    change: 2.40,
    changePercent: 0.99,
    volume: 9876543,
    marketCap: 98000000000,
    previousClose: 243.20,
    dayHigh: 247.80,
    dayLow: 242.90,
    sector: 'Versicherung',
    chartData: generateMockChartData(245.60),
    lastUpdated: new Date()
  },
  {
    symbol: 'BAS',
    name: 'BASF SE',
    price: 43.21,
    change: -0.67,
    changePercent: -1.53,
    volume: 14567890,
    marketCap: 39000000000,
    previousClose: 43.88,
    dayHigh: 44.12,
    dayLow: 42.89,
    sector: 'Chemie',
    chartData: generateMockChartData(43.21),
    lastUpdated: new Date()
  },

  // Weitere internationale Top-Aktien
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
    sector: 'Finanzdienstleistungen',
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
    sector: 'Gesundheitswesen',
    chartData: generateMockChartData(162.78),
    lastUpdated: new Date()
  },
  {
    symbol: 'KO',
    name: 'The Coca-Cola Company',
    price: 58.92,
    change: 0.34,
    changePercent: 0.58,
    volume: 21098765,
    marketCap: 254000000000,
    previousClose: 58.58,
    dayHigh: 59.45,
    dayLow: 58.21,
    sector: 'Getränke',
    chartData: generateMockChartData(58.92),
    lastUpdated: new Date()
  },
  {
    symbol: 'PFE',
    name: 'Pfizer Inc.',
    price: 25.67,
    change: 0.89,
    changePercent: 3.59,
    volume: 45678901,
    marketCap: 144000000000,
    previousClose: 24.78,
    dayHigh: 26.12,
    dayLow: 25.23,
    sector: 'Pharma',
    chartData: generateMockChartData(25.67),
    lastUpdated: new Date()
  },
  {
    symbol: 'DIS',
    name: 'The Walt Disney Company',
    price: 96.45,
    change: -1.23,
    changePercent: -1.26,
    volume: 18765432,
    marketCap: 176000000000,
    previousClose: 97.68,
    dayHigh: 98.90,
    dayLow: 95.23,
    sector: 'Entertainment',
    chartData: generateMockChartData(96.45),
    lastUpdated: new Date()
  },
  {
    symbol: 'V',
    name: 'Visa Inc.',
    price: 264.78,
    change: 3.45,
    changePercent: 1.32,
    volume: 12345678,
    marketCap: 540000000000,
    previousClose: 261.33,
    dayHigh: 266.90,
    dayLow: 262.45,
    sector: 'Fintech',
    chartData: generateMockChartData(264.78),
    lastUpdated: new Date()
  },
  {
    symbol: 'ADBE',
    name: 'Adobe Inc.',
    price: 497.23,
    change: 8.90,
    changePercent: 1.82,
    volume: 8765432,
    marketCap: 225000000000,
    previousClose: 488.33,
    dayHigh: 501.45,
    dayLow: 494.67,
    sector: 'Software',
    chartData: generateMockChartData(497.23),
    lastUpdated: new Date()
  },
  {
    symbol: 'CRM',
    name: 'Salesforce Inc.',
    price: 218.45,
    change: -2.34,
    changePercent: -1.06,
    volume: 15432109,
    marketCap: 211000000000,
    previousClose: 220.79,
    dayHigh: 222.90,
    dayLow: 216.78,
    sector: 'Cloud-Software',
    chartData: generateMockChartData(218.45),
    lastUpdated: new Date()
  },
  {
    symbol: 'PYPL',
    name: 'PayPal Holdings Inc.',
    price: 56.78,
    change: 1.89,
    changePercent: 3.44,
    volume: 23456789,
    marketCap: 65000000000,
    previousClose: 54.89,
    dayHigh: 57.90,
    dayLow: 55.67,
    sector: 'Fintech',
    chartData: generateMockChartData(56.78),
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
