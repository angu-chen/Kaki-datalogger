import db from './connection.ts'
import {
  Kaki,
  NewSighting,
  Pairing,
  PairingData,
  SightingData,
  UpdateSighting,
} from '../../models/kaki.ts'

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
  const kakiList = await db('kaki').select(
    'id',
    'band',
    'status',
    'hatch_yr as hatchYr',
    'parents_pairing_id as parentPairingId',
  )
  return kakiList as Kaki[]
}

export async function getKakiDash() {
  const query = await db('kaki')
    .leftJoin(
      db('sightings')
        // selecting the latest sightings only and displaying notes
        .select('bird_id', 'observer', 'notes', 'sightings.id as sighting_id')
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
      'latest_sightings.sighting_id as sightingId',
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
      'pairings.pair_no as pair no.',
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

export async function getSighting(id: number) {
  const sighting = await db('sightings')
    .where('sightings.id', id)
    .leftJoin('kaki', 'sightings.bird_id', 'kaki.id')
    .select(
      'kaki.id as birdId',
      'kaki.band as band',
      'sightings.id',
      'sightings.date',
      'sightings.area',
      'sightings.location',
      'sightings.lat',
      'sightings.lon',
      'sightings.observer',
      'sightings.notes',
    )
    .first()
  return sighting
}

export async function getPairing(id: number) {
  const pairing = await db('pairings')
    .where('pairings.id', id)
    .leftJoin('kaki as bird1', 'pairings.bird1_id', 'bird1.id')
    .leftJoin('kaki as bird2', 'pairings.bird2_id', 'bird2.id')

    .select(
      'pairings.id as id',
      'bird1.id as bird1Id',
      'bird1.band as bird1Band',
      'bird2.id as bird2Id',
      'bird2.band as bird2Band',
      'pairings.pair_no as pairNo',
      'pairings.year',
      'pairings.location',
      'pairings.treatment',
      'pairings.lat',
      'pairings.lon',
    )
    .first()
  return pairing
}

export async function addSighting(newSighting: NewSighting) {
  const kaki = await db('kaki')
    .where('kaki.band', newSighting.band)
    .select('id')
    .first()

  if (!kaki) {
    throw new Error(`Kaki band ${newSighting.band} does not exist`)
  }

  const sighting = await db('sightings')
    .insert({
      bird_id: kaki.id,
      date: newSighting.date,
      area: newSighting.area,
      location: newSighting.location,
      lat: newSighting.lat,
      lon: newSighting.lon,
      observer: newSighting.observer,
      notes: newSighting.notes,
    })
    .returning('sightings.id')
  return sighting[0]
}

export async function delSighting(id: number) {
  const res = await db('sightings').where('sightings.id', id).del()
  return res
}
export async function delPairing(id: number) {
  const res = await db('pairings').where('pairings.id', id).del()
  return res
}

export async function updateSighting(sighting: UpdateSighting) {
  const kaki = await db('kaki')
    .where('kaki.band', sighting.band)
    .select('id')
    .first()

  if (!kaki) {
    throw new Error(`Kaki band ${sighting.band} does not exist`)
  }
  const res = await db('sightings').where('sightings.id', sighting.id).update({
    bird_id: kaki.id,
    date: sighting.date,
    area: sighting.area,
    location: sighting.location,
    lat: sighting.lat,
    lon: sighting.lon,
    observer: sighting.observer,
    notes: sighting.notes,
  })
  return res
}

export async function updatePairing(pairing: Pairing) {
  const kaki1 = await db('kaki')
    .where('kaki.band', pairing.bird1Band)
    .select('id')
    .first()

  if (!kaki1) {
    throw new Error(`Kaki band ${pairing.bird1Band} does not exist`)
  }
  const kaki2 = await db('kaki')
    .where('kaki.band', pairing.bird2Band)
    .select('id')
    .first()

  if (!kaki2) {
    throw new Error(`Kaki band ${pairing.bird2Band} does not exist`)
  }
  console.log(pairing)
  const res = await db('pairings').where('pairings.id', pairing.id).update({
    pair_no: pairing.pairNo,
    year: pairing.year,
    bird1_id: kaki1.id,
    bird2_id: kaki2.id,
    location: pairing.location,
    treatment: pairing.treatment,
    lon: pairing.lon,
    lat: pairing.lat,
  })
  return res
}
export async function addPairing(pairing: PairingData) {
  const bird1 = await db('kaki')
    .where('kaki.band', pairing.bird1Band)
    .select('id')
    .first()

  if (!bird1) {
    throw new Error('bird 1 band does not exist')
  }
  const bird2 = await db('kaki')
    .where('kaki.band', pairing.bird2Band)
    .select('id')
    .first()

  if (!bird2) {
    throw new Error('bird 2 band does not exist')
  }

  const newPairing = await db('pairings')
    .insert({
      pair_no: pairing.pairNo,
      year: pairing.year,
      bird1_id: bird1.id,
      bird2_id: bird2.id,
      location: pairing.location,
      treatment: pairing.treatment,
      lon: pairing.lon,
      lat: pairing.lat,
    })
    .returning('pairings.id')
  return newPairing[0]
}
