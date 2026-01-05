import db from './connection.ts'
import { Kaki } from '../../models/kaki.ts'

const kakiSelect = [
  'id',
  'band',
  'status',
  'hatch_yr as hatchYr',
  'parents_pairing_id as parentsPairingId',
]

export async function getAllKaki(): Promise<Kaki[]> {
  const kakiList = await db('kaki').select(...kakiSelect)
  // console.log(kakiList)
  return kakiList as Kaki[]
}
