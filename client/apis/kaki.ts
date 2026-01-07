import request from 'superagent'
import { Kaki } from '../../models/kaki'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getAllKaki() {
  const res = await request.get(`${rootURL}/kaki`)
  return res.body as Kaki[]
}

export async function getKakiDash() {
  const res = await request.get(`${rootURL}/kaki/dash`)
  return res.body
}

//Note could probably condense this into one function
export async function getKakiDetail(id: number) {
  const res = await request.get(`${rootURL}/kaki/${id}`)
  return res.body
}

export async function getKakiSightings(id: number) {
  const res = await request.get(`${rootURL}/kaki/${id}/sightings`)
  return res.body
}

export async function getKakiPairings(id: number) {
  const res = await request.get(`${rootURL}/kaki/${id}/pairings`)
  return res.body
}

///

export async function getSighting(id: string) {
  const res = await request.get(`${rootURL}/kaki/sightings/${id}`)
  return res.body
}
