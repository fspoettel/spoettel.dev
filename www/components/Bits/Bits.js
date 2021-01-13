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
    history: [initialBit.data.id],
    visible: false
  })

  const timeoutRef = useRef(null)
  const nextBit = useRef(null)

  const setInvisible = () => {
    setBitState(currentState => ({ ...currentState, visible: false }))
  }

  const setVisible = () => {
    setBitState(currentState => ({ ...currentState, visible: true }))
  }

  const onVisibilitySwitch = (evt) => {
    if (evt.target !== evt.currentTarget) return

    if (state.visible) {
      const bit = getRandomBit(bits, state.history)
      if (!bit) return

      nextBit.current = bit
      timeoutRef.current = setTimeout(setInvisible, 4500)
    } else {
      const bit = nextBit.current
      setBitState(currentState => {
        const nextState = {
          bit,
          id: bit.data.id,
          history: [...currentState.history, bit.data.id],
          visible: false
        }

        return nextState
      })

      timeoutRef.current = setTimeout(setVisible, 0)
    }
  }

  useEffect(() => {
    setVisible()
    return () => { clearTimeout(timeoutRef) }
  }, [bits])

  return (
    <Bit
      bit={state.bit}
      key={state.id}
      onTransitionEnd={onVisibilitySwitch}
      visible={state.visible}
    />
  )
}
