import { useState } from 'react'
import CSVUploaderComponent from '../components/CSVUpload'

export default function ReleasePage() {
  const [csvData, setCsvData] = useState<any | null>(null)
  const proxyData = ['hi', 'hello', 'heya']
  console.log('csv data is:', csvData)
  return (
    <div>
      <h1>Release page</h1>
      <CSVUploaderComponent setData={setCsvData} />
      <div>
        <p>CSV Data is:</p>
        {csvData && csvData.length > 0 ? (
          csvData.map((d, index) => <p key={index}>{d}</p>)
        ) : (
          <p>Nothing in data</p>
        )}
      </div>
    </div>
  )
}
