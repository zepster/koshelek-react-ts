import React, { useEffect, useState } from 'react';
import { Diff } from '../../core/plugins/binance-sdk/types';
import { Props } from './types';
import { DEFAULT_SYMBOL, SYMBOL_UPDATE, SYMBOLS } from '../../config';

export const SymbolsPage = ({ core }: Props) => {
  const [symbol, setSymbol] = useState<string>(
    core.plugins.eventBus.last(SYMBOL_UPDATE) as string || DEFAULT_SYMBOL,
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [diffs, setDiffs] = useState<Diff[]>([]);

  useEffect(() => {
    const unsub = core.plugins.eventBus.on(
      'diffEvent',
      (data) => setDiffs((v) => v.concat(data as Diff)),
    );

    return () => {
      unsub();
    };
  }, [core]);

  const updateSymbol = (newSymbol: string) => {
    setSymbol(newSymbol);
    core.plugins.eventBus.emit(SYMBOL_UPDATE, newSymbol);
  };

  return (
    <div>
      <h1>Symbols Page</h1>
      <select value={symbol} onChange={(e) => updateSymbol(e.target.value)}>
        {
          SYMBOLS.map((value) => (
            <option value={value} key={value}>{value}</option>
          ))
        }
      </select>
    </div>
  );
};
