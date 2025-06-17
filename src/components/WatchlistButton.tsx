
import React from 'react';
import { Button } from '@/components/ui/button';

interface WatchlistButtonProps {
  isInWatchlist: boolean;
  onToggle: () => void;
}

export const WatchlistButton: React.FC<WatchlistButtonProps> = ({ 
  isInWatchlist, 
  onToggle 
}) => {
  return (
    <Button
      onClick={onToggle}
      variant={isInWatchlist ? "default" : "outline"}
      size="sm"
      className={`transition-all duration-300 ${
        isInWatchlist 
          ? 'bg-trading-green hover:bg-trading-green/80 text-black'
          : 'border-white/20 text-white hover:bg-white/10'
      }`}
    >
      {isInWatchlist ? '✓ In Watchlist' : '+ Add to Watchlist'}
    </Button>
  );
};
