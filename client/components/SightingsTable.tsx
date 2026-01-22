import { useNavigate } from 'react-router'
import { useSightings } from '../hooks/useKaki'
import SightingForm from './forms/SightingForm'
import EditBut from './buttons/EditBut'
import { Sighting } from '../../models/kaki'
import { Map } from './maps/Map'
import { useState } from 'react'

interface Props {
  birdId: string
  showMap: boolean
  setShowMap: React.Dispatch<React.SetStateAction<boolean>>
}

export default function KakiSightings({ birdId, showMap, setShowMap }: Props) {
  const navigate = useNavigate()
  const [sel, setSel] = useState(0)
  const { data: kakiSightings, isError, isLoading } = useSightings(birdId)

  if (isError) return <h1> An error occurred loading sightings</h1>
  if (isLoading) return <h1> Gathering Sightings</h1>
  if (kakiSightings.length < 1) {
    return <h1> No Sightings</h1>
  }
  const mapData = kakiSightings.map((sighting) => {
    return {
      id: sighting.id,
      x: sighting.x,
      y: sighting.y,
      msg: `Kakī ${sighting.band} was seen at ${sighting.area} by ${sighting.observer} on ${sighting.date}`,
    }
  })
  const keys = ['id', 'date', 'area', 'location', 'x', 'y', 'observer', 'notes']

  return (
    <div className="flex gap-3">
      <div className={`${showMap ? 'w-1/2 ' : ' w-0 h-0 overflow-hidden'}`}>
        <p>{sel}</p>
        <Map data={mapData} setSel={setSel} sel={sel} />{' '}
      </div>
      <div className={`${showMap ? 'w-1/2' : 'w-full'}`}>
        <table>
          <thead>
            <tr>
              <th className="top-0 sticky bg-gray-100"> Edit </th>
              {keys.map((key) => (
                <th className="top-0 sticky bg-gray-100" key={key}>
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {kakiSightings.map((sighting) => (
              <tr
                key={sighting.id}
                onClick={() => setSel(sighting.id)}
                className=""
              >
                <th>
                  {' '}
                  <EditBut Form={SightingForm} editData={sighting} />
                </th>
                {keys.map((key) => {
                  if (key === 'id') {
                    return (
                      <th
                        key={`${key}${sighting.id}`}
                        className="hover:bg-green-300 cursor-pointer"
                        onClick={() => navigate(`/sightings/${sighting.id}`)}
                      >
                        {sighting[key]}
                      </th>
                    )
                  }
                  if (key === 'band') {
                    return (
                      <th
                        key={`${key}${sighting.id}`}
                        className="hover:bg-blue-300 cursor-pointer"
                        onClick={() => navigate(`/${sighting.birdId}`)}
                      >
                        {sighting[key]}
                      </th>
                    )
                  } else
                    return <th key={`${key}${sighting.id}`}>{sighting[key]}</th>
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
