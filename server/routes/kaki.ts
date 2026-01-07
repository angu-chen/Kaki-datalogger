import { Router } from 'express'
import * as db from '../db/kaki.ts'

const router = Router()

router.get('/', async (req, res) => {
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
export default router

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
