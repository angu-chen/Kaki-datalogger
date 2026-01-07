import { useParams } from 'react-router'
import { useSightingbyId } from '../hooks/useKaki'

export default function SightingsDetail() {
  const params = useParams()
  const id = params.id
  const {
    data: sighitingData,
    isError,
    isLoading,
  } = useSightingbyId(id as string)

  if (isError) return <h1> An error occurred loading Kakī</h1>

  if (isLoading) return <h1> Looking for Kakī</h1>

  return (
    <div>
      <div>
        <div>
          <h3 className="font-semibold text-sm">Date</h3>
          <p>{sighitingData.Date}</p>
        </div>
        <div>
          <h3 className="font-semibold text-sm">Kaki Band</h3>
          <p>{sighitingData.Band}</p>
        </div>
        <div>
          <h3 className="font-semibold text-sm">Area</h3>
          <p>{sighitingData.Area}</p>
        </div>
        <div>
          <h3 className="font-semibold text-sm">Location</h3>
          <p>{sighitingData.Location}</p>
        </div>
        <div>
          <h3 className="font-semibold text-sm">Latitude</h3>
          <p>{sighitingData.lat}</p>
        </div>
        <div>
          <h3 className="font-semibold text-sm">Longitude</h3>
          <p>{sighitingData.lon}</p>
        </div>
        <div>
          <h3 className="font-semibold text-sm">Observer</h3>
          <p>{sighitingData.Obs}</p>
        </div>
        <div>
          <h3 className="font-semibold text-sm">Notes</h3>
          <p>{sighitingData.notes}</p>
        </div>
      </div>
    </div>
  )
}
