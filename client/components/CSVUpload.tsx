import React, { useEffect } from 'react'
import { useCSVReader } from 'react-papaparse'

interface Props {
  setData: React.Dispatch<React.SetStateAction<any>>
}
export default function CSVUploaderComponent({ setData }: Props) {
  const { CSVReader } = useCSVReader()

  const handleOnUploadAccepted = (results: any) => {
    console.log('---------------------------')
    console.log(results) // This contains 'data', 'errors', and 'meta'
    console.log('---------------------------')
    setData(results.data)
  }

  return (
    <CSVReader
      onUploadAccepted={handleOnUploadAccepted}
      onError={(err) => console.log(err)}
      skipEmptyLines={true}
    >
      {({ getRootProps, acceptedFile, progress, getRemoveFileProps }: any) => (
        <>
          <div className="border px-5 py-2 mb-10 w-3/5">
            <button type="button" {...getRootProps()}>
              Browse file
            </button>
            <div className="border px-3 h-7 ">
              <p> {acceptedFile && acceptedFile.name}</p>
            </div>
            <button {...getRemoveFileProps()}>Remove</button>
          </div>
        </>
      )}
    </CSVReader>
  )
}
