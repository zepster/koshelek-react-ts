export interface Diff {
  // Event type
  e: string;
  // Event time
  E: number;
  // Symbol
  s: string;
  // First update ID in event
  U: number;
  // Final update ID in event
  u: number;
  // Bids to be updated
  b: [string, string][]
  // Asks to be updated
  a: [string, string][]
}

// [PRICE, QTY]
export type Bids = [string, string];
export type Asks = [string, string];

export type Orders = {
  lastUpdateId: number,
  bids: Bids[]
  asks: Asks[]
};
