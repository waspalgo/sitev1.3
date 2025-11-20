/**
 * Types pour les données de marché
 */

export interface MarketData {
  symbol: string;
  price: number;
  changePercent: number;
  history: number[];
}

export interface MarketsResponse {
  gold: MarketData;
  btc: MarketData;
  index: MarketData;
}



