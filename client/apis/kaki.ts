import request from 'superagent'
import { Kaki } from '../../models/kaki'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getAllKaki() {
  const res = await request.get(`${rootURL}/kaki`)
  return res.body as Kaki[]
}
