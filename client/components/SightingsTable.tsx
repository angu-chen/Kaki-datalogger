import { useNavigate } from 'react-router'
import { useSightings } from '../hooks/useKaki'

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

  const headers = Object.keys(kakiSightings[0])

  return (
    <table>
      <tbody>
        <tr>
          {headers.map((key) => (
            <th key={key}>{key}</th>
          ))}
        </tr>

        {kakiSightings.map((sighting) => (
          <tr
            key={sighting.id}
            className="hover:bg-amber-200 cursor-pointer"
            onClick={() => navigate(`/sightings/${sighting.id}`)}
          >
            {headers.map((key) => (
              <th key={`${key}${sighting.id}`}>{sighting[key]}</th>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
