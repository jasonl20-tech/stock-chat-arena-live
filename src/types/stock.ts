
export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap?: number;
  previousClose: number;
  dayHigh: number;
  dayLow: number;
  sector?: string;
}

export interface ChartData {
  timestamp: string;
  price: number;
  volume: number;
}

export interface StockData extends Stock {
  chartData: ChartData[];
  lastUpdated: Date;
}

export interface WatchlistItem {
  symbol: string;
  addedAt: Date;
}
