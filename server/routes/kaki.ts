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

export default router
