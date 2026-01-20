import { useParams } from 'react-router'
import { useKaki } from '../hooks/useKaki'
import KakiSightings from '../components/SightingsTable'
import KakiPairings from '../components/PairingTable'
import AddBut from '../components/buttons/AddBut'
import PairingForm from '../components/forms/PairingForm'
import SightingForm from '../components/forms/SightingForm'

function BirdDetail() {
  const params = useParams()
  const { data: kakiData, isError, isLoading } = useKaki(Number(params.id))

  if (isError) return <h1> An error occurred loading Kakī</h1>

  if (isLoading) return <h1> Looking for Kakī</h1>

  console.log('kaki data is', kakiData)

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
        <AddBut Form={SightingForm}>
          <p>Add Sighting</p>
        </AddBut>
        <KakiSightings birdId={params.id as string} />
      </div>
      <div className="w-4/5 p-5 border shadow-2xl rounded-2xl">
        <h1 className="text-4xl font-semibold  mb-5">Pairings</h1>
        <AddBut Form={PairingForm}>
          <p>Add Pairing</p>
        </AddBut>
        <KakiPairings birdId={params.id as string} />
      </div>
    </div>
  )
}

export default BirdDetail
