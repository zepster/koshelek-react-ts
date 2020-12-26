import React, { useEffect, useState } from 'react';
import { Diff } from '../../core/plugins/binance-sdk/types';
import { Props } from './types';
import {
  DEFAULT_SYMBOL, SYMBOL_UPDATE, SYMBOLS, WS_DIFF_MESSAGE_COLLECT,
} from '../../config';
import { VList } from '../../components/v-list';

export const SymbolsPage = ({ core }: Props) => {
  const [symbol, setSymbol] = useState<string>(
    core.plugins.eventBus.last(SYMBOL_UPDATE) as string || DEFAULT_SYMBOL,
  );
  const [diffs, setDiffs] = useState(
    core.plugins.eventBus.last(WS_DIFF_MESSAGE_COLLECT) as Diff[] || [],
  );

  useEffect(() => {
    const unsub = core.plugins.eventBus.on(
      WS_DIFF_MESSAGE_COLLECT,
      (data) => setDiffs(data as Diff[]),
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
      <VList count={diffs.length} rowHeight={30} offset={0}>
        {
          ((index) => (
            <div key={index} style={{ height: 30 }}>{index}</div>
          ))
        }
      </VList>
    </div>
  );
};
