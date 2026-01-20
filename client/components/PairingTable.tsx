import { useNavigate } from 'react-router'
import { usePairings } from '../hooks/useKaki'
import PairingForm from './forms/PairingForm'
import EditBut from './buttons/EditBut'

interface Props {
  birdId: string
}

export default function KakiPairings({ birdId }: Props) {
  const navigate = useNavigate()
  const { data: kakiPairings, isError, isLoading } = usePairings(Number(birdId))

  if (isError) return <h1> An error occurred loading pairings</h1>
  if (isLoading) return <h1> Gathering pairings</h1>
  if (kakiPairings === undefined) {
    return <h1>No pairing data</h1>
  }
  console.log(`pairing info is `, kakiPairings)

  const keys = [
    'pairNo',
    'year',
    'bird1Band',
    'bird2Band',
    'treatment',
    'location',
    'lat',
    'lon',
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
        {kakiPairings.map((pairings) => (
          <tr key={pairings.id} className="">
            <th>
              {' '}
              <EditBut Form={PairingForm} editData={pairings} />
            </th>
            {keys.map((key) => {
              if (key === 'pairNo') {
                return (
                  <th
                    key={`${key}${pairings.id}`}
                    className="hover:bg-green-300 cursor-pointer"
                    onClick={() => navigate(`/pairings/${pairings.id}`)}
                  >
                    {pairings[key]}
                  </th>
                )
              }
              if (key === 'bird1Band') {
                return (
                  <th
                    key={`${key}${pairings.id}`}
                    className="hover:bg-blue-300 cursor-pointer"
                    onClick={() => navigate(`/${pairings.bird1Id}`)}
                  >
                    {pairings[key]}
                  </th>
                )
              }
              if (key === 'bird2Band') {
                return (
                  <th
                    key={`${key}${pairings.id}`}
                    className="hover:bg-blue-300 cursor-pointer"
                    onClick={() => navigate(`/${pairings.bird2Id}`)}
                  >
                    {pairings[key]}
                  </th>
                )
              } else
                return <th key={`${key}${pairings.id}`}>{pairings[key]}</th>
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
