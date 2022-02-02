import React, { useEffect, useRef, useState } from 'react';
import { Bit } from './Bit';
import { getBit, getRandomBit } from './helpers';

export function Bits({ bits, bitCount, initialCatId, initialBitId }) {
  const initialBit = getBit(bits, initialCatId, initialBitId);

  const [state, setBitState] = useState({
    bit: initialBit,
    id: initialBit.data.id,
    history: [initialBit.data.id],
    visible: false,
  });

  const updateTimeout = useRef(null);

  const cancelUpdate = () => {
    clearTimeout(updateTimeout.current);
  };

  const scheduleUpdate = (msUntilHide) => {
    if (state.visible) {
      if (state.history.length === bitCount) {
        cancelUpdate();
        return;
      }

      updateTimeout.current = setTimeout(() => {
        setBitState((s) => ({ ...s, visible: false }));
      }, msUntilHide);
    } else {
      const nextBit = getRandomBit(bits, state.history);

      setBitState((s) => ({
        ...s,
        bit: nextBit,
        id: nextBit.data.id,
        history: [...s.history, nextBit.data.id],
      }));

      setTimeout(() => {
        setBitState((s) => ({ ...s, visible: true }));
      }, 0);
    }
  };

  useEffect(() => {
    setBitState((s) => ({ ...s, visible: true }));
  }, []);

  return (
    <Bit
      bit={state.bit}
      key={state.id}
      onMouseEnter={cancelUpdate}
      onMouseLeave={() => {
        scheduleUpdate(500);
      }}
      onTransitionEnd={(evt) => {
        if (evt.target !== evt.currentTarget) return;
        scheduleUpdate(5000);
      }}
      visible={state.visible}
    />
  );
}
