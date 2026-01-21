import { useState } from 'react'
import { useKakiDash } from '../hooks/useKaki'

import KakiTable from './KakiTable'
import { Map } from './Map'
import AddBut from './buttons/AddBut'
import SightingForm from './forms/SightingForm'

export default function DashBoard() {
  const [sel, setSel] = useState(0)
  const kakiQuery = useKakiDash()

  if (kakiQuery.isError) return <h1> an error occurred while loading</h1>

  if (kakiQuery.isLoading) return <h1> loading</h1>
  if (!kakiQuery.data) {
    return <p> No data</p>
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl my-5 font-semibold">Latest Sightings</h1>
      <div className="flex justify-center items-center gap-3">
        <div className="w-1/2">
          <div className="text-center mb-3">
            <AddBut Form={SightingForm}>
              <p>Add Sighting</p>
            </AddBut>
          </div>
          <Map sel={sel} dashSightings={kakiQuery.data} />
        </div>
        <div className="w-1/2 overflow-scroll">
          <KakiTable sel={sel} setSel={setSel} kaki={kakiQuery.data} />
        </div>
      </div>
    </div>
  )
}
