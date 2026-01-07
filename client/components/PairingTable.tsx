import { useNavigate } from 'react-router'
import { usePairings } from '../hooks/useKaki'

interface Props {
  birdId: string
}

export default function KakiPairings({ birdId }: Props) {
  const navigate = useNavigate()
  const { data: kakiPairings, isError, isLoading } = usePairings(Number(birdId))

  if (isError) return <h1> An error occurred loading pairings</h1>
  if (isLoading) return <h1> Gathering pairings</h1>

  const headers = Object.keys(kakiPairings[0])

  return (
    <table>
      <tbody>
        <tr>
          {headers.map((key) => (
            <th key={key}>{key}</th>
          ))}
        </tr>

        {kakiPairings.map((pairings) => (
          <tr
            key={pairings.id}
            className="hover:bg-green-300 cursor-pointer"
            onClick={() => navigate(`/pairings/${pairings.id}`)}
          >
            {headers.map((key) => (
              <th key={`${key}${pairings.id}`}>{pairings[key]}</th>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
