import { Request, Response } from 'express';
import fetch from 'node-fetch';
import { BitqueryResponse, TokenSupplyUpdate, BalanceUpdate, DEXTrade } from '../types/bitqueryTypes';

const BITQUERY_API_URL = "https://streaming.bitquery.io/eap";
const BITQUERY_API_KEY = process.env.BITQUERY_API_KEY;

function formatMarketcap(value: string): string {
  const num = parseFloat(value);
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(0)}M`;
  } else if (num >= 1_000) {
    return `${(num / 1_000).toFixed(0)}K`;
  }
  return num.toFixed(0);
}

export const getTokenInfo = async (req: Request, res: Response) => {
  // This endpoint is marked as coming soon
  res.status(200).json({ 
    message: "Coming Soon! This endpoint will provide detailed token information using Bitquery API.",
    features: [
      "Token Market Cap",
      "Current Price",
      "24h Trading Metrics",
      "Top Holders",
      "Liquidity Analysis",
      "Whale Transaction Tracking",
      "Top 10 Raydium Tokens",
      "Price History",
      "Volume Analysis"
    ]
  });
};

// These functions are prepared but not exposed yet
async function fetchMarketcap(mintAddress: string): Promise<TokenSupplyUpdate | null> {
  const query = `
  query MyQuery {
    Solana {
      TokenSupplyUpdates(
        where: {TokenSupplyUpdate: {Currency: {MintAddress: {is: "${mintAddress}"}}}}
        orderBy: {descending: Block_Time}
        limitBy: {by: TokenSupplyUpdate_Currency_MintAddress, count: 1}
        limit: {count: 1}
      ) {
        TokenSupplyUpdate {
          Marketcap: PostBalanceInUSD
          Currency {
            Symbol
            MintAddress
          }
        }
      }
    }
  }`;

  try {
    const response = await fetch(BITQUERY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": BITQUERY_API_KEY || '',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch market cap data: ${response.statusText}`);
    }

    const data = await response.json() as BitqueryResponse<{ TokenSupplyUpdates: { TokenSupplyUpdate: TokenSupplyUpdate }[] }>;
    return data?.data?.Solana?.TokenSupplyUpdates[0]?.TokenSupplyUpdate || null;
  } catch (error) {
    console.error("Error fetching market cap data:", error);
    return null;
  }
}

async function fetchTopHolders(mintAddress: string): Promise<BalanceUpdate[] | null> {
  const query = `
  query MyQuery {
    Solana(dataset: realtime) {
      BalanceUpdates(
        limit: { count: 10 }
        orderBy: { descendingByField: "BalanceUpdate_Holding_maximum" }
        where: {
          BalanceUpdate: {
            Currency: {
              MintAddress: { is: "${mintAddress}" }
            }
          }
          Transaction: { Result: { Success: true } }
        }
      ) {
        BalanceUpdate {
          Account {
            Address
          }
          Holding: PostBalance(maximum: Block_Slot)
        }
      }
    }
  }`;

  try {
    const response = await fetch(BITQUERY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": BITQUERY_API_KEY || '',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch top holders: ${response.statusText}`);
    }

    const data = await response.json() as BitqueryResponse<{ BalanceUpdates: { BalanceUpdate: BalanceUpdate }[] }>;
    return data?.data?.Solana?.BalanceUpdates.map(update => update.BalanceUpdate) || null;
  } catch (error) {
    console.error("Error fetching top holders:", error);
    return null;
  }
}

async function fetchTokenPrice(mintAddress: string): Promise<number | null> {
  const query = `
  query MyQuery {
    Solana {
      DEXTrades(
        where: {
          Trade: {
            Currency: { MintAddress: { is: "${mintAddress}" } }
          }
        }
        limit: { count: 1 }
        orderBy: { descending: Block_Time }
      ) {
        Trade {
          Price: PriceInUSD
          Block {
            Time
          }
        }
      }
    }
  }`;

  try {
    const response = await fetch(BITQUERY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": BITQUERY_API_KEY || '',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) throw new Error(`Failed to fetch price: ${response.statusText}`);

    const data = await response.json();
    return data?.data?.Solana?.DEXTrades[0]?.Trade?.Price || null;
  } catch (error) {
    console.error("Error fetching token price:", error);
    return null;
  }
}

async function fetchTop10RaydiumTokens(): Promise<any[]> {
  const query = `
  query MyQuery {
    Solana {
      DEXTradeByTokens(
        where: {
          Trade: {
            Exchange: { Is: "Raydium" }
          }
        }
        limit: { count: 10 }
        orderBy: { descendingByField: "Trade_Volume" }
      ) {
        Trade {
          Currency {
            Symbol
            Name
            MintAddress
          }
          Volume: Amount
          TotalTrades: Count
          PriceChange24h: PriceChangeInUSD
        }
      }
    }
  }`;

  try {
    const response = await fetch(BITQUERY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": BITQUERY_API_KEY || '',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) throw new Error(`Failed to fetch top tokens: ${response.statusText}`);

    const data = await response.json();
    return data?.data?.Solana?.DEXTradeByTokens || [];
  } catch (error) {
    console.error("Error fetching top Raydium tokens:", error);
    return [];
  }
}

async function fetch24hTokenMetrics(mintAddress: string): Promise<any> {
  const query = `
  query MyQuery {
    Solana {
      DEXTrades(
        where: {
          Trade: {
            Currency: { MintAddress: { is: "${mintAddress}" } }
          }
          Block: {
            Time: { since: "-24h" }
          }
        }
      ) {
        Volume: sum(of: Trade_Amount)
        Transactions: count
        UniqueTraders: count(distinct: Trade_Buyer_Address)
        AveragePrice: average(of: Trade_Price)
        MaxPrice: maximum(of: Trade_Price)
        MinPrice: minimum(of: Trade_Price)
      }
    }
  }`;

  try {
    const response = await fetch(BITQUERY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": BITQUERY_API_KEY || '',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) throw new Error(`Failed to fetch 24h metrics: ${response.statusText}`);

    const data = await response.json();
    return data?.data?.Solana?.DEXTrades[0] || null;
  } catch (error) {
    console.error("Error fetching 24h token metrics:", error);
    return null;
  }
}

async function fetchLiquidityMetrics(mintAddress: string): Promise<any> {
  const query = `
  query MyQuery {
    Solana {
      PoolStats(
        where: {
          Pool: {
            Currencies: { MintAddress: { is: "${mintAddress}" } }
          }
        }
        orderBy: { descending: Liquidity }
      ) {
        Pool {
          Protocol
          Address
          Currencies {
            Symbol
            MintAddress
          }
        }
        Liquidity
        Volume24h
        Fees24h
        APR
      }
    }
  }`;

  try {
    const response = await fetch(BITQUERY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": BITQUERY_API_KEY || '',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) throw new Error(`Failed to fetch liquidity metrics: ${response.statusText}`);

    const data = await response.json();
    return data?.data?.Solana?.PoolStats || [];
  } catch (error) {
    console.error("Error fetching liquidity metrics:", error);
    return [];
  }
}

async function fetchWhaleTransactions(mintAddress: string, threshold: number = 10000): Promise<any[]> {
  const query = `
  query MyQuery {
    Solana {
      DEXTrades(
        where: {
          Trade: {
            Currency: { MintAddress: { is: "${mintAddress}" } }
            AmountInUSD: { gt: ${threshold} }
          }
        }
        limit: { count: 20 }
        orderBy: { descending: Block_Time }
      ) {
        Trade {
          Amount
          AmountInUSD
          Side
          Buyer {
            Address
          }
          Block {
            Time
          }
        }
      }
    }
  }`;

  try {
    const response = await fetch(BITQUERY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": BITQUERY_API_KEY || '',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) throw new Error(`Failed to fetch whale transactions: ${response.statusText}`);

    const data = await response.json();
    return data?.data?.Solana?.DEXTrades || [];
  } catch (error) {
    console.error("Error fetching whale transactions:", error);
    return [];
  }
}

// Additional endpoints can be implemented when needed 