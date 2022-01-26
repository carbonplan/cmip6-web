import { NextResponse } from 'next/server'

const STORAGE = {
  us: {
    US: true,
  },
  eu: {
    AT: true,
    BE: true,
    BG: true,
    HR: true,
    CY: true,
    CZ: true,
    DK: true,
    EE: true,
    FI: true,
    FR: true,
    DE: true,
    GR: true,
    HU: true,
    IE: true,
    IT: true,
    LV: true,
    LT: true,
    LU: true,
    MT: true,
    NL: true,
    PL: true,
    PT: true,
    RO: true,
    SK: true,
    SI: true,
    ES: true,
    SE: true,
    AL: true,
    AD: true,
    AM: true,
    BY: true,
    BA: true,
    FO: true,
    GE: true,
    GI: true,
    IS: true,
    IM: true,
    XK: true,
    LI: true,
    MK: true,
    MD: true,
    MC: true,
    ME: true,
    NO: true,
    RU: true,
    SM: true,
    RS: true,
    CH: true,
    TR: true,
    UA: true,
    GB: true,
    VA: true,
  },
}

export default function middleware(req) {
  const country = req.geo.country?.toUpperCase() || 'US'
  console.log('geo', {
    country,
    rawCountry: req.geo.country?.toUpperCase(),
  })
  const storage = STORAGE.us[country] ? 'us' : 'eu'

  // Unless already on an explicit `/{storage}` route, rewrite to country-specific
  const match = req.nextUrl.pathname.match(/(?<=\/)\w{2}$/)

  if (!match || !STORAGE[match[0]]) {
    console.log('rewriting', storage)
    req.nextUrl.pathname = `/${storage}`
    return NextResponse.rewrite(req.nextUrl)
  }
}
