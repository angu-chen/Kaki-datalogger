export interface KakiData {
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
}

export interface SightingData {
  birdId: number
  date: string
  area: string
  location: string
  lat: number
  lon: number
  observer: string
  notes: string
}

export interface Sighting extends SightingData {
  id: number
}
