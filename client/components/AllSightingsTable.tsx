import { useNavigate } from 'react-router'
import { useGetAllSightings } from '../hooks/useKaki'
import EditBut from './buttons/EditBut'

import SightingForm from './forms/SightingForm'

export default function AllSightingsTable() {
  const navigate = useNavigate()
  const { data: allSightings, isError, isLoading } = useGetAllSightings()

  if (isError) return <h1> An error occurred loading sightings</h1>
  if (isLoading) return <h1> Gathering sightings</h1>
  if (allSightings == undefined) {
    return <h1>No Sighting data</h1>
  }

  const keys = [
    'id',
    'band',
    'date',
    'area',
    'location',
    'x',
    'y',
    'observer',
    'notes',
  ]
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
        {allSightings.map((sighting) => (
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
