
import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { StockData } from '../types/stock';

interface SearchBarProps {
  stocks: StockData[];
  onStockSelect: (stock: StockData) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  stocks,
  onStockSelect,
  placeholder = "Search stocks..."
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredStocks = useMemo(() => {
    if (!searchTerm.trim()) return [];
    
    return stocks
      .filter(stock => 
        stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(0, 8); // Limit results
  }, [stocks, searchTerm]);

  const handleStockSelect = (stock: StockData) => {
    onStockSelect(stock);
    setSearchTerm('');
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 150)}
          className="pl-10 bg-card/50 border-white/20 text-white placeholder:text-muted-foreground"
        />
      </div>
      
      {isOpen && filteredStocks.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card/90 backdrop-blur-md border border-white/20 rounded-lg shadow-2xl z-50 max-h-64 overflow-y-auto">
          {filteredStocks.map((stock) => (
            <div
              key={stock.symbol}
              onClick={() => handleStockSelect(stock)}
              className="px-4 py-3 hover:bg-white/10 cursor-pointer transition-colors border-b border-white/10 last:border-b-0"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-medium">{stock.symbol}</div>
                  <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                    {stock.name}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium">
                    ${stock.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className={`text-sm ${
                    stock.change >= 0 ? 'text-trading-green' : 'text-trading-red'
                  }`}>
                    {stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
