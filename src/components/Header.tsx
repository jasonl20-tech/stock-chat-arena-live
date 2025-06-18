
import React from 'react';
import { SearchBar } from './SearchBar';
import { StockData } from '../types/stock';

interface HeaderProps {
  stocks: StockData[];
  onStockSelect: (stock: StockData) => void;
}

export const Header: React.FC<HeaderProps> = ({ stocks, onStockSelect }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-card/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-trading-green to-trading-blue rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-sm">T</span>
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">Top-Aktien</h1>
                <p className="text-xs text-muted-foreground">Live Market Data</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <SearchBar 
              stocks={stocks} 
              onStockSelect={onStockSelect}
              placeholder="Search 800+ stocks..."
            />
            
            <div className="hidden md:flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-trading-green rounded-full animate-pulse" />
                <span className="text-muted-foreground">Live Data</span>
              </div>
              
              <div className="text-muted-foreground">
                {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
