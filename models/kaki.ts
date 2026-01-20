export interface KakiData {
  id: number
  band: string
  status: string
  hatchYr: number
  parentPairingId: number | null
}

export interface Kaki extends KakiData {
  id: number
}

export interface KakiDash {
  ID: number
  Band: string
  Status: string
  'Htch Yr': number
  'Obs.': string
  Sighting: string
  notes: string
  sightingId: string
  location: string
  area: string
}

export interface SightingData {
  band: string
  date: string
  area: string
  location: string
  lat: number | null
  lon: number | null
  observer: string
  notes: string
}

export interface Sighting extends SightingData {
  id?: number
  birdId?: number
}

export interface PairingData {
  pairNo: string
  year: number
  bird1Band: string
  bird2Band: string
  location: string
  treatment: string
  lon: number | null
  lat: number | null
}

export interface Pairing extends PairingData {
  id: number
  bird1Id?: number
  bird2Id?: number
}
