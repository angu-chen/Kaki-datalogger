import { useEffect, useState } from 'react'
import CSVUploaderComponent from '../components/csvUtils/CSVUpload'
import ToUpperBut from '../components/csvUtils/ToUpperBut'
import CsvTable from '../components/csvUtils/CsvTable'

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
      <CSVUploaderComponent setData={setCsvData} />
      <div>
        <p>CSV Data is:</p>
        <ToUpperBut
          col={0}
          data={csvData ? csvData : proxyData}
          setData={setCsvData}
        />
        <ToUpperBut
          col={1}
          data={csvData ? csvData : proxyData}
          setData={setCsvData}
        />
        <div className="flex flex-col gap-3">
          {csvData && csvData.length > 0 ? (
            <CsvTable data={csvData} />
          ) : (
            <p> No data</p>
          )}

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
    </div>
  )
}
