import React, { useEffect, useState } from 'react';
import { Diff } from '../../core/plugins/binance-sdk/types';
import { Props } from './types';

export const SymbolsPage = ({ core }: Props) => {
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

  return (
    <div>
      <h1>Symbols Page</h1>
      {
        diffs.map((diff) => (
          <div key={diff.U}>
            { diff.e }
            {' '}
            -
            {' '}
            { diff.s }
          </div>
        ))
      }
    </div>
  );
};
