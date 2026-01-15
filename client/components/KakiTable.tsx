import { useNavigate } from 'react-router'
import { KakiDash } from '../../models/kaki'

interface Props {
  kaki: KakiDash[]
}
export default function KakiTable({ kaki }: Props) {
  const navigate = useNavigate()
  console.log('kaki is', kaki)
  const kakiKeys = [
    'Band',
    'Htch Yr',
    'Obs.',
    'Sighting',
    'Status',
    'area',
    'location',
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
          <tr key={bird.ID}>
            {kakiKeys.map((key) => {
              if (key === 'Band') {
                return (
                  <th
                    className="cursor-pointer hover:text-B"
                    onClick={() => navigate(`/${bird.ID}`)}
                    key={`${bird.ID}${key}`}
                  >
                    {bird[key]}
                  </th>
                )
              }
              if (key === 'Sighting') {
                if (!bird[key]) return <th key={`${bird.ID}${key}`}>N/A</th>
                return (
                  <th
                    className="cursor-pointer hover:text-amber-300"
                    key={`${bird}${key}`}
                    onClick={() => navigate(`/sightings/${bird.sightingId}`)}
                  >
                    {' '}
                    {bird[key]}
                  </th>
                )
              } else {
                if (!bird[key]) return <th key={`${bird.ID}${key}`}>N/A</th>
                return <th key={`${bird.ID}${key}`}>{bird[key]}</th>
              }
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
