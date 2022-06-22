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

export async function encryptMessage(message, publicKey) {
  const msgUint8 = new TextEncoder().encode(message) // encode as (utf-8) Uint8Array
  const hashBuffer = await window.crypto.subtle.encrypt(
    // hash the message
    { name: 'RSA-OAEP' },
    publicKey,
    msgUint8
  )
  const hashArray = Array.from(new Uint8Array(hashBuffer)) // convert buffer to byte array
  // console.log('array', hashArray)
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('') // convert bytes to hex string
  // console.log('hex', hashHex)
  return hashHex
}

export async function decryptHex(privateKey, hex) {
  const arr = hex
    .split('')
    .map((c, i) => (i % 2 === 0 ? `${c}${hex[i + 1]}` : null))
    .filter(Boolean)
    .map((d) => parseInt(d, 16))
  const buffer = new Uint8Array(arr).buffer
  const resultBuffer = await window.crypto.subtle.decrypt(
    {
      name: 'RSA-OAEP',
    },
    privateKey,
    buffer
  )
  return new TextDecoder().decode(resultBuffer)
}
