import { useParams } from 'react-router'
import { useKaki } from '../hooks/useKaki'
import KakiSightings from '../components/SightingsTable'
import KakiPairings from '../components/PairingTable'
import AddBut from '../components/buttons/AddBut'
import PairingForm from '../components/forms/PairingForm'
import SightingForm from '../components/forms/SightingForm'
import MapIcon from '@mui/icons-material/Map'
import { useState } from 'react'

function BirdDetail() {
  const params = useParams()
  const [sightingMap, setSightingMap] = useState(false)
  const [pairingMap, setPairingMap] = useState(false)
  const { data: kakiData, isError, isLoading } = useKaki(Number(params.id))

  if (isError) return <h1> An error occurred loading Kakī</h1>

  if (isLoading) return <h1> Looking for Kakī</h1>

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="my-5">
        <h1 className="text-4xl font-semibold text-center">{kakiData.Band}</h1>
      </div>
      <div className="flex justify-around w-1/2">
        <div>
          <h3 className="font-semibold text-sm">Status</h3>
          <p>{kakiData.Status}</p>
        </div>
        <div>
          <h3 className="font-semibold text-sm">Hatch Year</h3>
          <p>{kakiData['Hatch Year']}</p>
        </div>

        <div>
          <h3 className="font-semibold text-sm">Parent1</h3>
          <p>{kakiData.parent1}</p>
        </div>
        <div>
          <h3 className="font-semibold text-sm">Parent2</h3>
          <p>{kakiData.parent2}</p>
        </div>
      </div>

      <div className="w-4/5 p-5 border shadow-2xl rounded-2xl">
        <h1 className="text-4xl font-semibold  mb-5">Sightings</h1>
        <div className="flex gap-3 m-3">
          <AddBut Form={SightingForm}>
            <p>Add Sighting</p>
          </AddBut>
          <button
            className="  hover:border px-1 py-1 cursor-pointer shadlow-lg font-semibold"
            onClick={() => setSightingMap(!sightingMap)}
          >
            <MapIcon />
          </button>
        </div>
        <div>
          <KakiSightings birdId={params.id as string} showMap={sightingMap} />
        </div>
      </div>
      <div className="w-4/5 p-5 border shadow-2xl rounded-2xl">
        <h1 className="text-4xl font-semibold  mb-5">Pairings</h1>
        <div className="flex gap-3 m-3">
          <AddBut Form={PairingForm}>
            <p>Add Pairing</p>
          </AddBut>
          <button
            className="  hover:border px-1 py-1 cursor-pointer shadlow-lg font-semibold"
            onClick={() => setPairingMap(!pairingMap)}
          >
            <MapIcon />
          </button>
        </div>
        <KakiPairings birdId={params.id as string} showMap={pairingMap} />
      </div>
    </div>
  )
}

export default BirdDetail
