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
