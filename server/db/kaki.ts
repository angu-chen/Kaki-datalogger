import db from './connection.ts'
import { Kaki } from '../../models/kaki.ts'

const kakiSelect = [
  'id',
  'band_left as bandL',
  'band_right as bandR',
  'status',
  'hatch_yr as hatchYr',
  'parents_id as parentsId',
]

export async function getAllKaki(): Promise<Kaki[]> {
  const kakiList = await db('kaki').select(...kakiSelect)
  // console.log(kakiList)
  return kakiList as Kaki[]
}
