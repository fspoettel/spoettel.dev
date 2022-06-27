async function fetchWithTimeout(url, opts = {}, timeoutMs = 2000) {
  const ac = new AbortController();
  const timeoutId = setTimeout(() => ac.abort(), timeoutMs);

  const res = await fetch(url, {
    ...opts,
    signal: ac.signal,
  });

  clearTimeout(timeoutId);
  return res;
}

const apiService = {
  async getBits() {
    const res = await fetchWithTimeout(`${process.env.API_URL}/api/bits`);
    return res.json();
  },
};

export default apiService;
