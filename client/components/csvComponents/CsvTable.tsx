import { useState } from 'react'
import ToUpperBut from './ToUpperBut'

interface Props {
  data: object[]
}
export default function CsvTable({ data }: Props) {
  const [editedData, setEditedData] = useState<string[][]>(data)
  if (!data) return
  console.log('csv data is', editedData)

  const keys = Object.keys(data[0])
  console.log(keys)

  return (
    <table>
      <tbody>
        <tr>
          {keys.map((key) => {
            return (
              <th key={key}>
                <p>{key}</p>
              </th>
            )
          })}
        </tr>
        {data.map((row, index) => (
          <tr key={index}>
            {keys.map((key) => (
              <th key={`${key}${index}`}>
                <p>{row[key]}</p>
              </th>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
