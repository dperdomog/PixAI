export interface TokenSupplyUpdate {
  Marketcap: string;
  Currency: {
    Symbol: string;
    MintAddress: string;
  };
}

export interface BalanceUpdate {
  Account: {
    Address: string;
  };
  Holding: string;
}

export interface TradeCurrency {
  Name?: string;
  MintAddress?: string;
  Symbol?: string;
}

export interface DEXTrade {
  Currency: TradeCurrency;
  Buy?: {
    Amount: string;
    Account: {
      Token: {
        Owner: string;
      };
    };
  };
}

export interface BitqueryResponse<T> {
  data?: {
    Solana?: T;
  };
}

export interface TokenInfo {
  marketcap: string;
  symbol: string;
  mintAddress: string;
  holders?: Array<{
    address: string;
    holding: string;
  }>;
  topBuyers?: Array<{
    amount: string;
    owner: string;
  }>;
}

export interface BitqueryError {
  error: string;
  message: string;
} 