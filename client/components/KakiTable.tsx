import { Kaki } from '../../models/kaki'

interface Props {
  kaki: Kaki[]
}

export default function KakiTable({ kaki }: Props) {
  const kakiKeys = Object.keys(kaki[0])
  console.log(kaki[0])

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
            {kakiKeys.map((key) => (
              <th key={`${bird.id}${key}`}>{bird[key]}</th>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
