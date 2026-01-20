import request from 'superagent'
import {
  Kaki,
  Pairing,
  PairingData,
  Sighting,
  SightingData,
} from '../../models/kaki'

const rootURL = new URL(`/api/v1`, document.baseURI)

/////////// Kakī /////////////////////
export async function getAllKaki() {
  const res = await request.get(`${rootURL}/kaki`)
  return res.body as Kaki[]
}

export async function getKakiDash() {
  const res = await request.get(`${rootURL}/kaki/dash`)
  console.log(`in api for kaki dash, body is`, res.body)
  return res.body
}

//Note could probably condense this into one function
export async function getKakiDetail(id: number) {
  const res = await request.get(`${rootURL}/kaki/${id}`)
  return res.body
}
//////////// Pairings /////////////////////////
export async function getKakiPairings(id: number) {
  const res = await request.get(`${rootURL}/kaki/${id}/pairings`)
  return res.body as Pairing[]
}
export async function getPairing(id: string) {
  const res = await request.get(`${rootURL}/kaki/pairings/${id}`)
  return res.body as Pairing
}
export async function getAllPairings() {
  const res = await request.get(`${rootURL}/kaki/pairings`)
  return res.body as Pairing[]
}
export async function delPairing(id: number) {
  await request.del(`${rootURL}/kaki/pairings/${id}`)
  return
}

export async function createPairing(data: PairingData) {
  const res = await request.post(`${rootURL}/kaki/pairings`).send(data)
  return res.body
}

export async function updatePairing(data: Pairing) {
  await request.put(`${rootURL}/kaki/pairings`).send(data)
  return
}
//////////// Sightings ////////////////
export async function getKakiSightings(id: number) {
  const res = await request.get(`${rootURL}/kaki/${id}/sightings`)
  return res.body
}

export async function getSighting(id: string) {
  const res = await request.get(`${rootURL}/kaki/sightings/${id}`)
  return res.body as Sighting
}

export async function getAllSightings() {
  const res = await request.get(`${rootURL}/kaki/sightings/`)
  return res.body as Sighting[]
}

export async function createSighting(data: SightingData) {
  const res = await request.post(`${rootURL}/kaki/sightings/`).send(data)
  return res.body
}

export async function delSighting(id: number) {
  const res = await request.del(`${rootURL}/kaki/sightings/${id}`)
  console.log(`rows deleted ${res.body} from id ${id}`)
  return
}

export async function updateSighting(data: Sighting) {
  await request.put(`${rootURL}/kaki/sightings/`).send(data)
  return
}
