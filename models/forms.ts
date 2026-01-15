import { Pairing, UpdateSighting } from './kaki'

export interface FormsProps {
  onClose: () => void
  edit?: boolean
}

export interface PairingFormsProp extends FormsProps {
  editData?: Pairing
}
export interface SightingFormsProp extends FormsProps {
  editData?: UpdateSighting
}
