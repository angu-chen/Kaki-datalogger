import { useNavigate } from 'react-router'
import { KakiDash } from '../../models/kaki'

interface Props {
  kaki: KakiDash[]
}
export default function KakiTable({ kaki }: Props) {
  const navigate = useNavigate()
  const kakiKeys = [
    'band',
    'status',
    'hatchYr',
    'observer',
    'date',
    'location',
    'area',
    'notes',
  ]

  return (
    <table>
      <tbody>
        <tr>
          {kakiKeys.map((key) => (
            <th key={key}>{key} </th>
          ))}
        </tr>

        {kaki.map((bird) => (
          <tr key={bird.id}>
            {kakiKeys.map((key) => {
              if (key === 'band') {
                return (
                  <th
                    className="cursor-pointer hover:text-B"
                    onClick={() => navigate(`/${bird.id}`)}
                    key={`${bird.id}${key}`}
                  >
                    {bird[key]}
                  </th>
                )
              }
              if (key === 'date') {
                if (!bird[key]) return <th key={`${bird.id}${key}`}>N/A</th>
                return (
                  <th
                    className="cursor-pointer hover:text-amber-300"
                    key={`${bird}${key}`}
                    onClick={() => navigate(`/sightings/${bird.sightingId}`)}
                  >
                    {`${bird[key]}`}
                  </th>
                )
              } else {
                if (!bird[key]) return <th key={`${bird.id}${key}`}>N/A</th>
                return <th key={`${bird.id}${key}`}>{`${bird[key]}`}</th>
              }
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
