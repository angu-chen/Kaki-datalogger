import { useNavigate } from 'react-router'
import { useGetAllSightings } from '../hooks/useKaki'
import EditBut from './buttons/EditBut'

import SightingForm from './forms/SightingForm'
import { Map } from './maps/Map'
import { useState } from 'react'

export default function AllSightingsTable() {
  const navigate = useNavigate()
  const [sel, setSel] = useState(0)
  const { data: allSightings, isError, isLoading } = useGetAllSightings()

  if (isError) return <h1> An error occurred loading sightings</h1>
  if (isLoading) return <h1> Gathering sightings</h1>
  if (allSightings == undefined) {
    return <h1>No Sighting data</h1>
  }

  console.log(allSightings)
  const mapData = allSightings.map((sighting) => {
    return {
      id: sighting.id,
      x: sighting.nztmEasting,
      y: sighting.nztmNorthing,
      msg: `Kakī ${sighting.band} was seen at ${sighting.area} by ${sighting.observer} on ${sighting.date}`,
    }
  })
  const keys = [
    'id',
    'band',
    'date',
    'area',
    'location',
    'nztmEasting',
    'nztmNorthing',
    'observer',
    'notes',
  ]
  return (
    <div className="flex flex-col md:flex-row h-full gap-3">
      <div className="w-full h-1/2 md:h-full overflow-hidden md:w-1/2 ">
        <Map data={mapData} setSel={setSel} sel={sel} />
      </div>
      <div className="w-full md:w-1/2 overflow-scroll">
        <table className="text-sm">
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
              <tr
                key={sighting.id}
                onClick={() => setSel(sighting.id)}
                className={`${sel === sighting.id ? 'bg-green-500' : ' '}`}
              >
                <td>
                  {' '}
                  <EditBut Form={SightingForm} editData={sighting} />
                </td>
                {keys.map((key) => {
                  if (key === 'id') {
                    return (
                      <td
                        key={`${key}${sighting.id}`}
                        className="hover:bg-green-300 "
                      >
                        <button
                          className="cursor-pointer"
                          onClick={() => navigate(`/sightings/${sighting.id}`)}
                        >
                          {sighting[key]}
                        </button>
                      </td>
                    )
                  }
                  if (key === 'band') {
                    return (
                      <th
                        key={`${key}${sighting.id}`}
                        className="hover:bg-blue-300"
                      >
                        <button
                          className="cursor-pointer"
                          onClick={() => navigate(`/${sighting.birdId}`)}
                        >
                          {sighting[key]}
                        </button>
                      </th>
                    )
                  }
                  if (key === 'date') {
                    const dateOnly = sighting.date.split('T')[0]
                    return <td key={`${key}${dateOnly}`}>{dateOnly}</td>
                  } else
                    return <td key={`${key}${sighting.id}`}>{sighting[key]}</td>
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
