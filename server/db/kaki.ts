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

export async function getKakiDash() {
  const query = await db('kaki')
    .leftJoin(
      db('sightings')
        // selecting the latest sightings only and displaying notes
        .select('bird_id', 'notes')
        .max('date as latest_date')
        .groupBy('bird_id')
        .as('latest_sightings'),
      'kaki.id',
      'latest_sightings.bird_id',
    )
    .select('kaki.*', 'latest_sightings.latest_date', 'latest_sightings.notes')
    .orderBy('latest_sightings.latest_date', 'desc', 'nulls last') //sorting by descending order of sighitngs. nulls last
  return query
}
