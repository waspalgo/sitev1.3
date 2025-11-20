import { NextResponse } from 'next/server';
import { getAllMarketsData } from '@/lib/marketData';
import type { MarketsResponse } from '@/types/markets';

/**
 * Route API pour récupérer les données de marché
 * 
 * GET /api/markets
 * 
 * Retourne les données de marché pour Gold et l'indice global
 */
export async function GET() {
  try {
    console.log('Fetching market data...');
    const { gold, btc: _btc, index } = await getAllMarketsData(); // BTC ignoré - WA-AMIR ST V1 fonctionne uniquement sur XAUUSD

    console.log('Market data received:', {
      gold: gold ? { price: gold.price, change: gold.changePercent } : null,
      index: index ? { price: index.price, change: index.changePercent } : null,
    });

    // Valeurs de fallback si l'API ne répond pas
    const fallbackGold = {
      symbol: 'XAUUSD',
      price: 4085.825,
      changePercent: -3.01,
      history: Array.from({ length: 20 }, () => Math.random() * 100 + 4000),
    };

    const fallbackBTC = {
      symbol: 'BTCUSD',
      price: 63245.80,
      changePercent: -1.23,
      history: Array.from({ length: 20 }, () => Math.random() * 5000 + 60000),
    };

    const fallbackIndex = {
      symbol: 'GLOBAL',
      price: 6621.86,
      changePercent: 0.42,
      history: Array.from({ length: 20 }, () => Math.random() * 100 + 6600),
    };

    const response: MarketsResponse = {
      gold: gold || fallbackGold,
      btc: _btc || fallbackBTC, // Gardé pour compatibilité type mais non utilisé par WA-AMIR ST V1
      index: index || fallbackIndex,
    };

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    console.error('Error in /api/markets:', error);
    
    // Retourner des valeurs de fallback en cas d'erreur
    return NextResponse.json(
      {
        gold: {
          symbol: 'XAUUSD',
          price: 4085.825,
          changePercent: -3.01,
          history: Array.from({ length: 20 }, () => Math.random() * 100 + 4000),
        },
        btc: {
          symbol: 'BTCUSD',
          price: 63245.80,
          changePercent: -1.23,
          history: Array.from({ length: 20 }, () => Math.random() * 5000 + 60000),
        },
        index: {
          symbol: 'GLOBAL',
          price: 6621.86,
          changePercent: 0.42,
          history: Array.from({ length: 20 }, () => Math.random() * 100 + 6600),
        },
      },
      { status: 200 } // Retourner 200 même en cas d'erreur pour ne pas casser le front
    );
  }
}

