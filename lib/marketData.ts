/**
 * Utilitaire pour récupérer les données de marché
 * 
 * BTCUSD utilise Finnhub API
 * Gold et Indice global sont désactivés temporairement (valeurs statiques)
 */

import type { MarketData } from '@/types/markets';

// Seulement pour BTCUSD
const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY || 'd4c6cipr01qoua32nosgd4c6cipr01qoua32not0';
const FINNHUB_BASE_URL = 'https://finnhub.io/api/v1';

/**
 * Récupère les données complètes pour XAUUSD (Gold)
 * DÉSACTIVÉ TEMPORAIREMENT - Retourne des valeurs statiques avec ligne droite
 */
export async function getGoldData(): Promise<MarketData | null> {
  // API désactivée temporairement - ligne droite fixe
  const fixedPrice = 4085.825;
  return {
    symbol: 'XAUUSD',
    price: fixedPrice,
    changePercent: -3.01,
    history: Array(20).fill(fixedPrice), // Ligne droite horizontale
  };
}

/**
 * Récupère les données pour BTCUSD via Finnhub
 */
export async function getBTCData(): Promise<MarketData | null> {
  try {
    let price = 0;
    let changePercent = 0;
    let history: number[] = [];

    // Utiliser quote pour obtenir le prix actuel
    try {
      const response = await fetch(
        `${FINNHUB_BASE_URL}/quote?symbol=BINANCE:BTCUSDT&token=${FINNHUB_API_KEY}`,
        { 
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log('Finnhub BTC quote response:', data);
        
        if (data.c && typeof data.c === 'number' && data.c > 0) {
          price = data.c; // Prix actuel
          const previousClose = data.pc; // Prix de clôture précédent
          if (previousClose && previousClose > 0) {
            changePercent = ((price - previousClose) / previousClose) * 100;
          }
        }
      }
    } catch (error) {
      console.error('Finnhub quote error for BTC:', error);
    }

    // Si pas de prix, essayer COINBASE
    if (!price || price < 1000) {
      try {
        const response = await fetch(
          `${FINNHUB_BASE_URL}/quote?symbol=COINBASE:BTC-USD&token=${FINNHUB_API_KEY}`,
          { 
            cache: 'no-store',
            headers: {
              'Cache-Control': 'no-cache',
            }
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.c && typeof data.c === 'number' && data.c > 0) {
            price = data.c;
            const previousClose = data.pc;
            if (previousClose && previousClose > 0) {
              changePercent = ((price - previousClose) / previousClose) * 100;
            }
          }
        }
      } catch (error) {
        console.error('Finnhub COINBASE error for BTC:', error);
      }
    }

    // Récupérer l'historique pour la sparkline
    if (price > 0) {
      try {
        const now = Math.floor(Date.now() / 1000);
        const fiveDaysAgo = now - (5 * 24 * 60 * 60);
        
        const response = await fetch(
          `${FINNHUB_BASE_URL}/crypto/candle?symbol=BINANCE:BTCUSDT&resolution=60&from=${fiveDaysAgo}&to=${now}&token=${FINNHUB_API_KEY}`,
          { 
            cache: 'no-store',
            headers: {
              'Cache-Control': 'no-cache',
            }
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.c && Array.isArray(data.c) && data.c.length > 0) {
            history = data.c.slice(-20);
          }
        }
      } catch (error) {
        console.error('Finnhub history error for BTC:', error);
      }
    }

    // Si pas de prix, utiliser une valeur de fallback
    if (!price || price < 1000) {
      console.warn('Using fallback price for BTC');
      price = 63245.80;
      changePercent = -1.23;
    }

    // Si pas d'historique, générer des variations autour du prix actuel
    if (history.length === 0) {
      history = generateFallbackHistory(price, 20);
    }

    return {
      symbol: 'BTCUSD',
      price: price,
      changePercent: changePercent,
      history: history,
    };
  } catch (error) {
    console.error('Error fetching BTC data:', error);
    return null;
  }
}

/**
 * Récupère les données pour l'indice global (S&P 500)
 * DÉSACTIVÉ TEMPORAIREMENT - Retourne des valeurs statiques avec ligne droite
 */
export async function getIndexData(): Promise<MarketData | null> {
  // API désactivée temporairement - ligne droite fixe
  const fixedPrice = 6621.86;
  return {
    symbol: 'GLOBAL',
    price: fixedPrice,
    changePercent: 0.42,
    history: Array(20).fill(fixedPrice), // Ligne droite horizontale
  };
}

/**
 * Génère un historique de fallback basé sur le prix actuel
 */
function generateFallbackHistory(currentPrice: number, count: number): number[] {
  const history: number[] = [];
  let price = currentPrice;
  
  for (let i = 0; i < count; i++) {
    // Variation aléatoire de ±2%
    const variation = (Math.random() - 0.5) * 0.04;
    price = price * (1 - variation);
    history.push(price);
  }
  
  return history;
}

/**
 * Récupère toutes les données de marché
 */
export async function getAllMarketsData(): Promise<{
  gold: MarketData | null;
  btc: MarketData | null;
  index: MarketData | null;
}> {
  // Exécuter tous les appels en parallèle comme avant
  const [gold, btc, index] = await Promise.all([
    getGoldData(),
    getBTCData(),
    getIndexData(),
  ]);

  return { gold, btc, index };
}
