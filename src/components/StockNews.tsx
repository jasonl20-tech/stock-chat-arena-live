
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, ExternalLink } from 'lucide-react';

interface StockNewsProps {
  symbol: string;
}

export const StockNews: React.FC<StockNewsProps> = ({ symbol }) => {
  // Mock news data - in real app, this would come from news API
  const newsItems = [
    {
      id: 1,
      title: `${symbol} veröffentlicht starke Quartalszahlen`,
      summary: 'Das Unternehmen übertraf die Erwartungen der Analysten mit einem Umsatzwachstum von 15% im vergangenen Quartal.',
      source: 'Finanznachrichten',
      time: '2 Stunden',
      sentiment: 'positive' as const
    },
    {
      id: 2,
      title: `Neue Produktankündigung von ${symbol}`,
      summary: 'Das Unternehmen kündigte eine innovative Produktlinie an, die voraussichtlich zu weiterem Wachstum beitragen wird.',
      source: 'TechNews',
      time: '4 Stunden',
      sentiment: 'positive' as const
    },
    {
      id: 3,
      title: `Marktanalyse: ${symbol} im Fokus`,
      summary: 'Analysten sehen weiteres Potenzial für die Aktie, warnen aber vor kurzfristiger Volatilität.',
      source: 'MarktAnalyse',
      time: '6 Stunden',
      sentiment: 'neutral' as const
    },
    {
      id: 4,
      title: `${symbol} erweitert internationale Präsenz`,
      summary: 'Das Unternehmen plant die Expansion in neue Märkte und investiert verstärkt in internationale Standorte.',
      source: 'Business Today',
      time: '1 Tag',
      sentiment: 'positive' as const
    }
  ];

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-trading-green/20 text-trading-green';
      case 'negative': return 'bg-trading-red/20 text-trading-red';
      default: return 'bg-trading-blue/20 text-trading-blue';
    }
  };

  const getSentimentText = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'Positiv';
      case 'negative': return 'Negativ';
      default: return 'Neutral';
    }
  };

  return (
    <Card className="trading-card">
      <h3 className="text-xl font-bold text-white mb-6">Aktuelle Nachrichten</h3>
      
      <div className="space-y-4">
        {newsItems.map((item) => (
          <div key={item.id} className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer group">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <Badge className={getSentimentColor(item.sentiment)}>
                  {getSentimentText(item.sentiment)}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {item.time}
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            
            <h4 className="text-white font-semibold mb-2 group-hover:text-trading-green transition-colors">
              {item.title}
            </h4>
            
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {item.summary}
            </p>
            
            <div className="text-xs text-muted-foreground">
              Quelle: {item.source}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-white/10 text-center">
        <p className="text-sm text-muted-foreground">
          Nachrichten werden von verschiedenen Quellen aggregiert und können zeitverzögert sein.
        </p>
      </div>
    </Card>
  );
};
