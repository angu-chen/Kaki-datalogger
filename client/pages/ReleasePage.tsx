import { useEffect, useState } from 'react'
import CsvUploadBut from '../components/csvComponents/CsvUploadBut'

export default function ReleasePage() {
  const [csvData, setCsvData] = useState<any | null>(null)
  const [upper, setUpper] = useState<boolean[] | null>(null)
  const proxyData = [
    ['hi', 'hello', 'heya'],
    ['hi', 'hello', 'heya'],
    ['hi', 'hello', 'heya'],
    ['hi', 'hello', 'heya'],
  ]

  useEffect(() => {
    if (csvData) {
      const colNo = csvData[0].length
      setUpper(Array(colNo).fill(true))
    }
  }, [csvData])

  return (
    <div>
      <h1>Release page</h1>

      <div>
        <CsvUploadBut />

        {/* {csvData && csvData.length > 0 ? (
            csvData.map((row, index) => (
              <div className="flex gap-3" key={index}>
                {' '}
                {row.map((col, index) => (
                  <p key={index}>{col}</p>
                ))}{' '}
              </div>
            ))
          ) : (
            <p>No data</p>
          )} */}
      </div>
    </div>
  )
}
