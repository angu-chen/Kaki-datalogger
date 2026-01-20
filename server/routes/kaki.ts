import { Router } from 'express'
import * as db from '../db/kaki.ts'
import {
  Pairing,
  PairingData,
  Sighting,
  SightingData,
} from '../../models/kaki.ts'

const router = Router()

router.get('/', async (req, res) => {
  console.log('getting all kakis')
  try {
    const kaki = await db.getAllKaki()
    res.json(kaki)
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : 'Error getting all Kaki',
    )
    res.status(500).json({ message: 'something went wrong fetching all Kaki' })
  }
})

router.get('/dash', async (req, res) => {
  try {
    console.log('trying to get kaki dash')
    const kakiDash = await db.getKakiDash()
    res.json(kakiDash)
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : 'Error getting kaki Dash data',
    )
    res
      .status(500)
      .json({ message: 'something went wrong fetching kaki Dash data' })
  }
})

//////// /pairings ///////////////
router.get('/pairings', async (req, res) => {
  try {
    const allPairings = await db.getAllPairings()
    console.log(allPairings)
    res.json(allPairings)
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : 'Error retrieving pairings',
    )
    res.status(500).json({ message: 'error something went terribly wrong' })
  }
})
router.post('/pairings', async (req, res) => {
  try {
    const pairingData = req.body as PairingData
    if (!pairingData) {
      console.error('No data given')
      return res.status(400).send('Bad Request')
    }
    const newPairingId = await db.addPairing(pairingData)
    res.json(newPairingId)
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : 'error adding new pairing',
    )
    res.status(500).json({ message: 'error no pairing to post' })
  }
})

router.put(`/pairings`, async (req, res) => {
  try {
    const pairingData = req.body as Pairing
    if (!pairingData) {
      console.error('No data given')
      return res.status(400).send('Bad Request')
    }
    const updatedRows = await db.updatePairing(pairingData)
    res.json(updatedRows)
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : `error updating pairing `,
    )
    res.status(500).json({ message: 'error no updating to delete' })
  }
})
router.delete('/pairings/:id', async (req, res) => {
  const id = req.params.id
  try {
    const delRows = await db.delPairing(Number(id))
    res.json(delRows)
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : `error deleting pairing ${id}`,
    )
    res.status(500).json({ message: 'error no pairing to delete' })
  }
})

router.get('/pairings/:id', async (req, res) => {
  const id = req.params.id
  try {
    const pairing = await db.getPairing(Number(id))
    res.json(pairing)
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : 'Error retrieving pairing',
    )
    res.status(500).json({ message: 'error pairing does not exist' })
  }
})

/////////// /sightings ////////////////
router.get('/sightings', async (req, res) => {
  try {
    const allSightings = await db.getAllSightings()
    console.log(allSightings)
    res.json(allSightings)
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : 'Error retrieving sightings',
    )
    res.status(500).json({ message: 'error something went terribly wrong' })
  }
})

router.put('/sightings', async (req, res) => {
  try {
    const sightingData = req.body as Sighting
    if (!sightingData) {
      console.error('No data given')
      return res.status(400).send('Bad Request')
    }
    const updatedRows = await db.updateSighting(sightingData)
    res.json(updatedRows)
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : `error updating sighting `,
    )
    res.status(500).json({ message: 'error no updating to delete' })
  }
})
router.post('/sightings', async (req, res) => {
  try {
    const sightingData = req.body as SightingData
    if (!sightingData) {
      console.error('No data given')
      return res.status(400).send('Bad Request')
    }
    const newSightingId = await db.addSighting(sightingData)
    res.json(newSightingId)
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : 'error adding new sighting',
    )
    res.status(500).json({ message: 'error no sighiting to post' })
  }
})

router.delete('/sightings/:id', async (req, res) => {
  const sightingID = req.params.id
  try {
    console.log(sightingID)
    const delRows = await db.delSighting(Number(sightingID))
    res.json(delRows)
  } catch (error) {
    console.error(
      error instanceof Error
        ? error.message
        : `error deleting sighting ${sightingID}`,
    )
    res.status(500).json({ message: 'error no sighiting to delete' })
  }
})

router.get('/sightings/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    const sighting = await db.getSighting(id)
    res.json(sighting)
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : 'Error retrieving sighting',
    )
    res.status(500).json({ message: 'error sighting does not exist' })
  }
})

////////// /:id /////////////////

router.get('/:id', async (req, res) => {
  const birdId = Number(req.params.id)
  try {
    const kakiDetail = await db.getKakiDetail(birdId)
    res.json(kakiDetail)
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : 'Error retriving kaki detail',
    )
    res.status(500).json({ message: `kaki does not exist` })
  }
})

router.get('/:id/pairings', async (req, res) => {
  const birdId = Number(req.params.id)
  try {
    const pairings = await db.getKakiPairings(birdId)
    res.json(pairings)
  } catch (error) {
    console.error(
      error instanceof Error
        ? error.message
        : 'Error retrieving pairings of Kaki',
    )
    res.status(500).json({ message: 'error kaki does not exist' })
  }
})

router.get('/:id/sightings', async (req, res) => {
  const birdId = Number(req.params.id)
  try {
    const sightings = await db.getKakiSighting(birdId)
    res.json(sightings)
  } catch (error) {
    console.error(
      error instanceof Error
        ? error.message
        : 'Error retrieving sightings of Kaki',
    )
    res.status(500).json({ message: 'error kaki does not exist' })
  }
})

export default router
