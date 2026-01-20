import { useNavigate } from 'react-router'
import { useSightings } from '../hooks/useKaki'
import SightingForm from './forms/SightingForm'
import EditBut from './buttons/EditBut'

interface Props {
  birdId: string
}

export default function KakiSightings({ birdId }: Props) {
  const navigate = useNavigate()
  const { data: kakiSightings, isError, isLoading } = useSightings(birdId)

  if (isError) return <h1> An error occurred loading sightings</h1>
  if (isLoading) return <h1> Gathering Sightings</h1>
  if (kakiSightings.length < 1) {
    return <h1> No Sightings</h1>
  }

  const keys = [
    'id',
    'date',
    'area',
    'location',
    'lat',
    'lon',
    'observer',
    'notes',
  ]
  console.log('sightings are', kakiSightings)

  return (
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
          <tr key={sighting.id} className="">
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
  )
}
