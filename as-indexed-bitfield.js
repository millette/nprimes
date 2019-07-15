'use strict'

const bitfield = require('indexed-bitfield')

// allocate a bitfield with one billion bits
// const bits = bitfield(1e9)

const fmtr = new Intl.NumberFormat()

const fmtrt = new Intl.DateTimeFormat("default", {
  minute: '2-digit',
  second: '2-digit',
})

const fmt = (x) => fmtr.format(x)

const run = (top) => {
  const next = () => {
    const ite2 = primes2.iterator()
    const n = ite2.next()
    if (n > top2) return
    return n
  }

  const mults = (t) => {
    let r
    for (r = t; r < top; r += t) {
      primes2.set(r, true)
    }
    goody.set(t, true)
  }

  const fmtt = () => {
    const d = Date.now() - now
    return (d < 1000) ? `${d}m` : fmtrt.format(d)
  }

  const listPrimes = () => {
    if (top <= 2) return
    const ite2 = primes2.iterator()
    let cnt = 0
    let n
    while (((n = ite2.next(false)) !== -1) && (n < top)) ++cnt

    const ite3 = goody.iterator()
    while (((n = ite3.next(true)) !== -1) && (n < top2)) ++cnt

    const p = Math.round(100 * cnt / top)
    console.log(`Calculated ${fmt(cnt)} primes (${p}%) between 1 and ${fmt(top)} (${fmt(top2)}) in ${fmtt()}s.`)
  }

  const now = Date.now()
  const top2 = Math.floor(Math.sqrt(top)) + 1
  const primes2 = bitfield(top)
  const goody = bitfield(top2)

  primes2.set(0, true)
  primes2.set(1, true)

  if (top <= 2) return
  let n
  while ((n = next()) && (n < top2)) mults(n)

  listPrimes()
}

let t = 1
;[2, 3, 5, 7, 11, 13, 17, 19, 23, 29].forEach((p) => {
  t *= p
  run(t)
})
