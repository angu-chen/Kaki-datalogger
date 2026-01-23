import { useNavigate, useParams } from 'react-router'
import { useDelSightingMutation, useSightingbyId } from '../hooks/useKaki'
import DelBut from '../components/buttons/DelBut'
import EditBut from '../components/buttons/EditBut'
import SightingForm from '../components/forms/SightingForm'
import { Map } from '../components/maps/Map'

export default function SightingsDetail() {
  const params = useParams()
  const navigate = useNavigate()

  const id = params.id
  const delSighting = useDelSightingMutation()
  const {
    data: sightingData,
    isError,
    isLoading,
  } = useSightingbyId(id as string)

  if (isError) return <h1> An error occurred loading Kakī</h1>

  if (isLoading) return <h1> Looking for Kakī</h1>
  if (!sightingData) return <p> No Data</p>
  // creating map props//
  const mapData = [
    {
      id: sightingData.id,
      x: sightingData.x,
      y: sightingData.y,
      msg: `Kakī ${sightingData.band} was seen at ${sightingData.area} by ${sightingData.observer} on ${sightingData.date}`,
    },
  ]

  return (
    <div className="flex flex-col items-center">
      <div className="my-5">
        <h1 className="text-4xl font-semibold text-center">{`Sighting no.${sightingData.id} Kakī ${sightingData.band}`}</h1>
        <div className="flex gap-3 my-3 justify-center">
          <EditBut editData={sightingData} Form={SightingForm} />

          <DelBut id={Number(sightingData.id)} mutationFn={delSighting} />
        </div>
      </div>
      <div className="flex flex-col gap-3 items-center w-5/6">
        <div className="flex gap-5 text-sm flex-wrap justify-center w-full">
          <div>
            <h3 className="font-semibold text-sm">Date</h3>
            <p>{sightingData.date}</p>
          </div>
          <div>
            <h3 className="font-semibold text-sm ">Kaki Band</h3>
            <button
              className="cursor-pointer hover:text-B"
              onClick={() => navigate(`/${sightingData.birdId}`)}
            >
              <p>{sightingData.band}</p>
            </button>
          </div>
          <div>
            <h3 className="font-semibold text-sm">Area</h3>
            <p>{sightingData.area}</p>
          </div>
          <div>
            <h3 className="font-semibold text-sm">Location</h3>
            <p>{sightingData.location}</p>
          </div>
          <div>
            <h3 className="font-semibold text-sm">Easting</h3>
            <p>{sightingData.x}</p>
          </div>
          <div>
            <h3 className="font-semibold text-sm">Northing</h3>
            <p>{sightingData.y}</p>
          </div>
          <div>
            <h3 className="font-semibold text-sm">Observer</h3>
            <p>{sightingData.observer}</p>
          </div>
          <div>
            <h3 className="font-semibold text-sm">Notes</h3>
            <p>{sightingData.notes}</p>
          </div>
        </div>
        <div className="w-full">
          <Map data={mapData} />
        </div>
      </div>
    </div>
  )
}
