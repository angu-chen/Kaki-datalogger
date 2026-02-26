import { Pairing, Sighting } from './kaki'

export const AREAS = [
  'Tasman',
  'Cass',
  'Godley',
  'Lake Tekapo',
  'Forks',
  'Mary Range',
  'Lake Pukaki',
  'Pukaki River',
  'Tekapo River',
  'Twizel',
  'Ohau River',
  'Dobson',
  'Hopkins',
  'Homestead Area',
  'Quailburn',
  'Ahuriri',
  'South Island',
]

export interface FormsProps {
  onClose: () => void
  edit?: boolean
}

export interface PairingFormsProp extends FormsProps {
  editData?: Pairing
}
export interface SightingFormsProp extends FormsProps {
  editData?: Sighting
}
