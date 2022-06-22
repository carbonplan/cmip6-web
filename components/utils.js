import { format } from 'd3-format'

export const formatValue = (value) => {
  const abs = Math.abs(value)
  if (abs === 0) {
    return 0
  } else if (abs < 0.0001) {
    return format('.0e')(value)
  } else if (abs < 0.01) {
    return format('.2')(value)
  } else if (abs < 1) {
    return format('.2f')(value)
  } else if (abs < 10) {
    return format('.1f')(value)
  } else if (abs < 10000) {
    return format('.0f')(value)
  } else {
    return format('0.2s')(value)
  }
}

export const generateKey = () => {
  return window.crypto.subtle.generateKey(
    {
      name: 'RSA-OAEP',
      modulusLength: 1024,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: 'SHA-256',
    },
    false,
    ['encrypt', 'decrypt']
  )
}

export function encodeJSON(obj) {
  const msgUint8 = new TextEncoder().encode(JSON.stringify(obj)) // encode as (utf-8) Uint8Array
  return Array.from(msgUint8)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('') // convert bytes to hex string
}

export function decodeHex(hex) {
  const arr = hex // convert hex string to bytes
    .split('')
    .map((c, i) => (i % 2 === 0 ? `${c}${hex[i + 1]}` : null))
    .filter(Boolean)
    .map((d) => parseInt(d, 16))
  const stringified = new TextDecoder().decode(new Uint8Array(arr).buffer) // decode to utf-8 string
  let result
  try {
    result = JSON.parse(stringified)
  } catch {
    result = {}
  }

  return result
}
