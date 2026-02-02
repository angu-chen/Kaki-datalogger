import { useNavigate } from 'react-router'
import { usePairings } from '../hooks/useKaki'
import PairingForm from './forms/PairingForm'
import EditBut from './buttons/EditBut'
import { Map } from './maps/Map'
import { useState } from 'react'

interface Props {
  birdId: string
  showMap: boolean
  // setShowMap: React.Dispatch<React.SetStateAction<boolean>>
}

export default function KakiPairings({ birdId, showMap }: Props) {
  const navigate = useNavigate()
  const [sel, setSel] = useState(0)
  const { data: kakiPairings, isError, isLoading } = usePairings(Number(birdId))

  if (isError) return <h1> An error occurred loading pairings</h1>
  if (isLoading) return <h1> Gathering pairings</h1>
  if (kakiPairings === undefined) {
    return <h1>No pairing data</h1>
  }
  // creating map props//
  const mapData = kakiPairings.map((pairing) => {
    return {
      id: pairing.id,
      x: pairing.x,
      y: pairing.y,
      msg: `Pair no. ${pairing.pairNo} consisting of Kakī ${pairing.bird1Band} and ${pairing.bird2Band}.`,
    }
  })
  const keys = [
    'pairNo',
    'year',
    'bird1Band',
    'bird2Band',
    'treatment',
    'location',
    'x',
    'y',
  ]

  return (
    <div className="flex gap-3">
      <div className={`${showMap ? 'w-1/2 ' : ' w-0 h-0 overflow-hidden'}`}>
        <Map data={mapData} setSel={setSel} sel={sel} />
      </div>
      <div
        className={`${showMap ? 'w-1/2' : 'w-full'} overflow-scroll text-sm`}
      >
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
            {kakiPairings.map((pairings) => (
              <tr
                key={pairings.id}
                onClick={() => setSel(pairings.id)}
                className={`${sel === pairings.id ? 'bg-green-500' : ''}`}
              >
                <th>
                  {' '}
                  <EditBut Form={PairingForm} editData={pairings} />
                </th>
                {keys.map((key) => {
                  if (key === 'pairNo') {
                    return (
                      <th
                        key={`${key}${pairings.id}`}
                        className="hover:bg-green-300 "
                      >
                        <button
                          className="cursor-pointer"
                          onClick={() => navigate(`/pairings/${pairings.id}`)}
                        >
                          {pairings[key]}
                        </button>
                      </th>
                    )
                  }
                  if (key === 'bird1Band') {
                    return (
                      <th
                        key={`${key}${pairings.id}`}
                        className="hover:bg-blue-300 "
                      >
                        <button
                          className="cursor-pointer"
                          onClick={() => navigate(`/${pairings.bird1Id}`)}
                        >
                          {pairings[key]}
                        </button>
                      </th>
                    )
                  }
                  if (key === 'bird2Band') {
                    return (
                      <th
                        key={`${key}${pairings.id}`}
                        className="hover:bg-blue-300 "
                      >
                        <button
                          className="cursor-pointer"
                          onClick={() => navigate(`/${pairings.bird2Id}`)}
                        >
                          {pairings[key]}
                        </button>
                      </th>
                    )
                  } else
                    return <th key={`${key}${pairings.id}`}>{pairings[key]}</th>
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
