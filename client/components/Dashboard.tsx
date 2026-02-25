import { useState } from 'react'
import { useKakiDash } from '../hooks/useKaki'

import KakiTable from './KakiTable'

import AddBut from './buttons/AddBut'
import SightingForm from './forms/SightingForm'
import { Map } from './maps/Map'

export default function DashBoard() {
  const [sel, setSel] = useState(0)
  const kakiQuery = useKakiDash()

  if (kakiQuery.isError) return <h1> an error occurred while loading</h1>

  if (kakiQuery.isLoading) return <h1> loading</h1>
  if (!kakiQuery.data) {
    return <p> No data</p>
  }
  console.log(kakiQuery.data)

  const mapData = kakiQuery.data.map((kaki) => {
    if (kaki.nztmEasting === 0 || kaki.nztmNorthing === 0) return
    return {
      id: kaki.id,
      x: kaki.nztmEasting,
      y: kaki.nztmNorthing,
      msg: `Kakī ${kaki.band} was seen at ${kaki.location} by ${kaki.observer}. Notes: ${kaki.notes}`,
    }
  })

  return (
    <div className="flex flex-col items-center h-screen">
      <div className="flex md:items-start px-2 items-center flex-col md:flex-row justify-center gap-3 h-full">
        <div className="relative w-full flex flex-col h-1/2 overflow-hidden md:w-1/2">
          <div className="text-center mb-1 md:mb-3">
            <AddBut Form={SightingForm}>
              <p>Add Sighting</p>
            </AddBut>
          </div>
          <Map sel={sel} setSel={setSel} data={mapData} />
        </div>
        <div className="w-full  md:w-1/2 h-1/2 overflow-scroll">
          <KakiTable sel={sel} setSel={setSel} kaki={kakiQuery.data} />
        </div>
      </div>
    </div>
  )
}
