import {
  decribe,
  it,
  expect,
  beforeAll,
  beforeEach,
  afterAll,
  vi,
  describe,
} from 'vitest'

import request from 'supertest'
import * as dbFuncs from '../db/kaki.ts'

import db from '../db/connection.ts'
import server from '../server.ts'

beforeAll(async () => {
  await db.migrate.latest()
})

beforeEach(async () => {
  await db.seed.run()
})

afterAll(async () => {
  await db.destroy()
})

describe('getting all kaki form database', () => {
  it('returns a list of kaki in the format of Kaki type.', async () => {
    const res = await request(server).get('/api/v1/kaki')
    const len = res.body.length

    expect(res.status).toBe(200)
    expect(len).toEqual(4)
    expect(res.body[0]).toMatchInlineSnapshot(`
      {
        "bandL": "RBY",
        "bandR": "RR",
        "hatchYr": 2020,
        "id": 1,
        "parentsId": null,
        "status": "Wild",
      }
    `)
  })
})
