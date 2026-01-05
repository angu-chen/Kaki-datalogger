import db from './connection.ts'
import { Kaki } from '../../models/kaki.ts'

const kakiSelect = [
  'id as ID',
  'band as Band',
  'status as Status',
  'hatch_yr as Htch Yr',
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
        .select('bird_id', 'observer', 'notes')
        .max('date as latest_sighting')
        .groupBy('bird_id')
        .as('latest_sightings'),
      'kaki.id',
      'latest_sightings.bird_id',
    )
    .select(
      ...kakiSelect,
      'latest_sightings.observer as Obs.',
      'latest_sightings.latest_sighting as Sighting',
      'latest_sightings.notes',
    )
    .orderBy('latest_sightings.latest_sighting', 'desc', 'nulls last') //sorting by descending order of sighitngs. nulls last
  return query
}

export async function getKakiDetail(id: number) {
  const kakidetail = await db('kaki')
    .where('kaki.id', id)
    .leftJoin('pairings as parents', 'kaki.parents_pairing_id', 'parents.id')
    .select(
      'kaki.id as ID',
      'kaki.band as Band',
      'kaki.status as Status',
      'kaki.hatch_yr as Hatch Year',
      'parents.bird1_id as parent1',
      'parents.bird2_id as parent2',
      'parents.year',
    )
    .first()

  return kakidetail
}
