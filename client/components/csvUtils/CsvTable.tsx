import { useState } from 'react'

interface Props {
  data: string[][]
}
export default function CsvTable({ data }: Props) {
  const [editedData, setEditedData] = useState<string[][]>(data)
  if (!data) return
  console.log('csv data is', editedData)
  return (
    <table>
      <tbody>
        {editedData.map((item, index) => {
          // headers
          if (index === 0) {
            return (
              <tr key={index}>
                {item.map((d) => (
                  <th key={d}>
                    <p>{d}</p>
                  </th>
                ))}
              </tr>
            )
          }
          return (
            <tr key={index}>
              {item.map((d, index) => (
                <th key={`${d}${index}`}>
                  <p>{d}</p>
                </th>
              ))}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
