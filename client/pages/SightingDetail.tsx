import { useNavigate, useParams } from 'react-router'
import { useDelSightingMutation, useSightingbyId } from '../hooks/useKaki'
import DelSightingBut from '../components/DeleteSightingBut'

export default function SightingsDetail() {
  const params = useParams()
  const navigate = useNavigate()
  const id = params.id
  const delSighting = useDelSightingMutation()
  const {
    data: sighitingData,
    isError,
    isLoading,
  } = useSightingbyId(id as string)

  if (isError) return <h1> An error occurred loading Kakī</h1>

  if (isLoading) return <h1> Looking for Kakī</h1>
  console.log(sighitingData)

  return (
    <div className="">
      <div className="flex gap-10 flex-wrap m-5">
        <div>
          <h3 className="font-semibold text-sm">Date</h3>
          <p>{sighitingData.Date}</p>
        </div>
        <button
          className="cursor-pointer hover:text-B"
          onClick={() => navigate(`/${sighitingData.birdId}`)}
        >
          <h3 className="font-semibold text-sm ">Kaki Band</h3>
          <p>{sighitingData.Band}</p>
        </button>
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
      <DelSightingBut sightingId={Number(id)} mutationFn={delSighting} />
    </div>
  )
}
