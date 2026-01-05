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
}
