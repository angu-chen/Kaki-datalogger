export interface KakiData {
  bandL: string
  bandR: string
  status: string
  hatchYr: number
  parentId: number | null
}

export interface Kaki extends KakiData {
  id: number
}
