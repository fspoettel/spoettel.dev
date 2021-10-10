export function getBit(bits, cat, id) {
  return bits[cat].find((b) => b.data.id === id);
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getRandomBit(bits, history) {
  const filteredBits = Object.entries(bits).reduce((acc, [cat, bits]) => {
    const currentBits = bits.filter((b) => {
      const seen = history.includes(b.data.id);
      return !seen;
    });

    if (currentBits.length === 0) return acc;
    return { ...acc, [cat]: currentBits };
  }, {});

  const keys = Object.keys(filteredBits);
  if (keys.length === 0) return null;

  const catIdx = randomInt(0, Object.keys(filteredBits).length - 1);
  const cat = keys[catIdx];

  const currentBits = filteredBits[cat];
  const index = randomInt(0, currentBits.length - 1);

  return currentBits[index];
}
