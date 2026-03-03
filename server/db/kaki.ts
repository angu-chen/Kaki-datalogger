import db from './connection.ts'
import {
  Kaki,
  Pairing,
  PairingData,
  ReleaseSites,
  Sighting,
  SightingData,
} from '../../models/kaki.ts'
import { release } from 'node:os'

const kakiSelect = [
  'id as id',
  'band as band',
  'status as status',
  'hatch_yr as hatchYr',
]

const SightingsSelect = [
  'date',
  'kaki.band as band',
  'bird_id as birdId',
  'observer',
  'nztm_easting as nztmEasting',
  'nztm_northing as nztmNorthing',
  'notes',
  'sightings.id as id',
  'location',
  'area',
]
const PairingsSelect = [
  'pairings.id as id',
  'pairings.pair_no as pairNo',
  'pairings.year',
  'pairings.bird1_id as bird1Id',
  'pairings.bird2_id as bird2Id',
  'bird1.band as bird1Band',
  'bird2.band as bird2Band',
  'pairings.location',
  'pairings.treatment',
  'pairings.nztm_northing as nztmNorthing',
  'pairings.nztm_easting as nztmEasting',
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

export async function delAllKaki(): Promise<boolean> {
  // returns no. of rows deleted
  return await db('kaki').select('kaki').del()
}
export async function getKakiDash() {
  const isPostgres =
    db.client.config.client === 'postgresql' || db.client.config.client === 'pg'

  // 1. Build the base subquery for sightings
  let latestSightingsSubquery = db('sightings').select(
    'bird_id',
    'observer',
    'notes',
    'sightings.id as sighting_id',
    'location',
    'area',
    'nztm_easting',
    'nztm_northing',
    db.raw('date(date) as latest_sighting'),
  )

  if (isPostgres) {
    latestSightingsSubquery = latestSightingsSubquery
      .distinctOn('bird_id')
      .orderBy('bird_id')
      .orderBy('date', 'desc')
  } else {
    // SQLite
    latestSightingsSubquery = latestSightingsSubquery
      .max('date as latest_sighting') // Update alias to match main select
      .groupBy('bird_id')
  }

  const query = await db('kaki')
    .leftJoin(
      latestSightingsSubquery.as('ls'), // Join the subquery we built above
      'kaki.id',
      'ls.bird_id',
    )
    .select(
      ...kakiSelect,
      'ls.area',
      'ls.location',
      'ls.observer',
      'ls.latest_sighting as date',
      'ls.notes',
      'ls.nztm_easting as nztmEasting',
      'ls.nztm_northing as nztmNorthing',
      'ls.sighting_id as sightingId',
    )
    .orderBy('ls.latest_sighting', 'desc')
  // .orderBy('ls.latest_sighting', 'desc', 'last')

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

export async function createKaki(
  band: string,
  year: number,
  releaseId: number | null = null,
) {
  const newKaki = await db('kaki')
    .insert({
      band: band,
      hatch_yr: year,
      parents_pairing_id: null,
      release_id: releaseId,
    })
    .returning('kaki.id')

  return newKaki[0]
}

//////////////// Pairings ///////////////////

export async function delAllPairings() {
  const delRows = await db('pairings').del()
  return delRows
}

export async function getKakiPairings(id: number) {
  const kakiPairings = await db('pairings')
    .where('pairings.bird1_id', id)
    .orWhere('pairings.bird2_id', id)

    .leftJoin('kaki as bird1', 'pairings.bird1_id', 'bird1.id')
    .leftJoin('kaki as bird2', 'pairings.bird2_id', 'bird2.id')

    .select(...PairingsSelect)
    .orderBy('pairings.year', 'desc')

  return kakiPairings
}

export async function getAllPairings() {
  const kakiPairings = await db('pairings')
    .leftJoin('kaki as bird1', 'pairings.bird1_id', 'bird1.id')
    .leftJoin('kaki as bird2', 'pairings.bird2_id', 'bird2.id')

    .select(...PairingsSelect)
    .orderBy('pairings.year', 'desc')

  return kakiPairings as Pairing[]
}

export async function getPairing(id: number) {
  const pairing = await db('pairings')
    .where('pairings.id', id)
    .leftJoin('kaki as bird1', 'pairings.bird1_id', 'bird1.id')
    .leftJoin('kaki as bird2', 'pairings.bird2_id', 'bird2.id')

    .select(...PairingsSelect)
    .first()
  return pairing as Pairing
}

export async function delPairing(id: number) {
  const res = await db('pairings').where('pairings.id', id).del()
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
  const res = await db('pairings').where('pairings.id', pairing.id).update({
    pair_no: pairing.pairNo,
    year: pairing.year,
    bird1_id: kaki1.id,
    bird2_id: kaki2.id,
    location: pairing.location,
    treatment: pairing.treatment,
    nztm_northing: pairing.nztmNorthing,
    nztm_easting: pairing.nztmEasting,
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
      nztm_northing: pairing.nztmNorthing,
      nztm_easting: pairing.nztmEasting,
    })
    .returning('pairings.id')
  return newPairing[0] as Pairing
}

////////// Sightings //////////////

export async function delAllSightings() {
  const delRows = await db('sightings').del()
  return delRows
}

export async function getKakiSighting(id: number) {
  const sightings = await db('sightings')
    .where('sightings.bird_id', id)
    .leftJoin('kaki', 'sightings.bird_id', 'kaki.id')
    .select(...SightingsSelect)
    .orderBy('sightings.date', 'desc')
  return sightings as Sighting[]
}

export async function getSighting(id: number) {
  const sighting = await db('sightings')
    .where('sightings.id', id)
    .leftJoin('kaki', 'sightings.bird_id', 'kaki.id')
    .select(...SightingsSelect)
    .first()
  return sighting as Sighting
}
export async function getAllSightings() {
  const kakiSightings = await db('sightings')
    .leftJoin('kaki', 'sightings.bird_id', 'kaki.id')
    .select(...SightingsSelect)
  return kakiSightings as Sighting[]
}

export async function updateSighting(sighting: Sighting) {
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
    nztm_easting: sighting.nztmEasting,
    nztm_northing: sighting.nztmNorthing,
    observer: sighting.observer,
    notes: sighting.notes,
  })
  return res
}

export async function addSighting(newSighting: SightingData) {
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
      nztm_easting: newSighting.nztmEasting,
      nztm_northing: newSighting.nztmNorthing,
      observer: newSighting.observer,
      notes: newSighting.notes,
    })
    .returning('sightings.id')
  return sighting[0] as Sighting
}

export async function delSighting(id: number) {
  const res = await db('sightings').where('sightings.id', id).del()
  return res
}

// Releases
export async function addReleaseSite(newSites: ReleaseSites) {
  const newSiteID = await db('release')
    .insert({
      location: newSites.site,
      year: newSites.year,
    })
    .returning('release.id')

  const createdSite = await db('release').where('id', newSiteID[0].id).first()
  return createdSite
}

export async function getAllReleaseSites() {
  const allReleaseSites = await db('release').select()
  return allReleaseSites
}
