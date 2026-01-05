import { useNavigate } from 'react-router'
import { KakiDash } from '../../models/kaki'

interface Props {
  kaki: KakiDash[]
}
export default function KakiTable({ kaki }: Props) {
  const kakiKeys = Object.keys(kaki[0])
  const navigate = useNavigate()

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
                console.log(bird.ID)
                return (
                  <th
                    className="cursor-pointer hover:text-B"
                    onClick={() => navigate(`/${bird.ID}`)}
                    key={`${bird.ID}${key}`}
                  >
                    {bird[key]}
                  </th>
                )
              } else {
                return <th key={`${bird.ID}${key}`}>{bird[key]}</th>
              }
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
