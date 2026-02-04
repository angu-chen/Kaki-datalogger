import { useState } from 'react'
import ToUpperBut from './ToUpperBut'

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
        <tr>
          {editedData[0].map((d, index) => {
            return (
              <th key={index}>
                <ToUpperBut
                  key={index}
                  col={index}
                  data={editedData}
                  setData={setEditedData}
                />
              </th>
            )
          })}
        </tr>
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
