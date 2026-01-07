import db from './connection.ts'
import { Kaki } from '../../models/kaki.ts'

const kakiSelect = [
  'id as ID',
  'band as Band',
  'status as Status',
  'hatch_yr as Htch Yr',
]

const sightingsSelect = [
  'id',
  'date as Date',
  'area as Area',
  'location as Location',
  'lat',
  'lon',
  'observer as Obs.',
  'notes',
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

    .leftJoin('kaki as parent1', 'parents.bird1_id', 'parent1.id')
    .leftJoin('kaki as parent2', 'parents.bird2_id', 'parent2.id')

    .select(
      'kaki.id as ID',
      'kaki.band as Band',
      'kaki.status as Status',
      'kaki.hatch_yr as Hatch Year',
      'parent1.band as parent1',
      'parent2.band as parent2',
      'parents.year',
    )
    .first()

  return kakidetail
}

export async function getKakiPairings(id: number) {
  const kakiPairings = await db('pairings')
    .where('pairings.bird1_id', id)
    .orWhere('pairings.bird2_id', id)

    .leftJoin('kaki as bird1', 'pairings.bird1_id', 'bird1.id')
    .leftJoin('kaki as bird2', 'pairings.bird2_id', 'bird2.id')

    .select(
      'pairings.id',
      'pairings.year',
      'bird1.band as bird1',
      'bird2.band as bird2',
      'pairings.location',
      'pairings.treatment',
      'pairings.lon',
      'pairings.lat',
    )
    .orderBy('pairings.year', 'desc')

  return kakiPairings
}

export async function getKakiSighting(id: number) {
  const sightings = await db('sightings')
    .where('sightings.bird_id', id)
    .select(...sightingsSelect)
    .orderBy('sightings.date', 'desc')
  return sightings
}
