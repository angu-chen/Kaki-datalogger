import { useNavigate } from 'react-router'
import { useGetAllPairings } from '../hooks/useKaki'
import EditBut from './buttons/EditBut'
import PairingForm from './forms/PairingForm'

export default function AllPairingsTable() {
  const navigate = useNavigate()
  const { data: allPairings, isError, isLoading } = useGetAllPairings()

  if (isError) return <h1> An error occurred loading pairings</h1>
  if (isLoading) return <h1> Gathering pairings</h1>
  if (allPairings == undefined) {
    return <h1>No pairing data</h1>
  }
  console.log(allPairings)

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
        {allPairings.map((pairings) => (
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
                    onClick={() => navigate(`/pairings/${pairings.ID}`)}
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
