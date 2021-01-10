import React, { useEffect, useRef, useState } from 'react'
import { Bit } from './Bit'
import { getBit, getRandomBit } from './helpers'

export function Bits ({
  bits,
  initialCatId,
  initialBitId
}) {
  const initialBit = getBit(bits, initialCatId, initialBitId)

  const [state, setBitState] = useState({
    bit: initialBit,
    id: initialBit.data.id,
    history: [initialBit.data.id]
  })

  const timeoutRef = useRef(null)

  useEffect(() => {
    let effectState = state

    const setRandomBit = () => {
      const bit = getRandomBit(bits, effectState.history)
      if (!bit) return

      setBitState(currentState => {
        const nextState = {
          bit,
          id: bit.data.id,
          history: [...currentState.history, bit.data.id]
        }
        effectState = nextState
        return nextState
      })

      timeoutRef.current = setTimeout(setRandomBit, 5000)
    }

    timeoutRef.current = setTimeout(setRandomBit, 5000)

    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [bits])

  return <Bit bit={state.bit} key={state.id} />
}
