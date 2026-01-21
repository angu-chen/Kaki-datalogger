import { useNavigate } from 'react-router'
import { KakiDash } from '../../models/kaki'

interface Props {
  kaki: KakiDash[]
  setSel: React.Dispatch<React.SetStateAction<number>>
  sel: number
}
export default function KakiTable({ kaki, setSel, sel }: Props) {
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
    <table className="text-sm">
      <tbody>
        <tr>
          {kakiKeys.map((key) => (
            <th className="top-0 sticky bg-gray-300" key={key}>
              {key.toUpperCase()}
            </th>
          ))}
        </tr>

        {kaki.map((bird) => (
          <tr
            key={bird.id}
            onClick={() => setSel(bird.id)}
            className={`${sel === bird.id ? 'bg-green-500' : 'bg-gray-50'}`}
          >
            {kakiKeys.map((key) => {
              if (key === 'band') {
                return (
                  <th
                    className="cursor-pointer right-0 sticky hover:text-B"
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
