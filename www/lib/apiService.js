/* global fetch */

export default {
  async getBits () {
    const res = await fetch(`${process.env.API_URL}/api/bits`)
    const body = await res.json()
    return body
  }
}
