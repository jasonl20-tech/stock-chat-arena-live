
import { useState, useEffect, useCallback } from 'react';
import { StockData } from '../types/stock';
import { mockStocks, updateStockPrices } from '../data/mockStockData';

export const useStockData = () => {
  const [stocks, setStocks] = useState<StockData[]>(mockStocks);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Simuliere Live-Updates alle 5 Sekunden
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(currentStocks => updateStockPrices(currentStocks));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const refreshData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simuliere API-Aufruf
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStocks(updateStockPrices(mockStocks));
    } catch (err) {
      setError('Failed to refresh stock data');
      console.error('Error refreshing data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getStockBySymbol = useCallback((symbol: string) => {
    return stocks.find(stock => stock.symbol === symbol);
  }, [stocks]);

  return {
    stocks,
    isLoading,
    error,
    refreshData,
    getStockBySymbol
  };
};
