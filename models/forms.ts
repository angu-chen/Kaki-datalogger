import { Pairing, UpdateSighting } from './kaki'

export interface FormsProps {
  onClose: () => void
  edit?: boolean
  editData?: Pairing | UpdateSighting
}
