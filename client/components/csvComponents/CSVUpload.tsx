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

  const handleRemoveButClick = (
    e: React.MouseEvent,
    getRemoveFileProps: any,
  ) => {
    if (getRemoveFileProps().onClick) {
      getRemoveFileProps().onClick(e)
    }

    setData(null)
  }

  return (
    <CSVReader
      config={{ header: true, dynamicTyping: true, skipEmptyLines: true }}
      onUploadAccepted={handleOnUploadAccepted}
      onError={(err) => console.log(err)}
      skipEmptyLines={true}
    >
      {({ getRootProps, acceptedFile, progress, getRemoveFileProps }: any) => (
        <div>
          <div className=" py-2 mb-10 w-3/5 flex flex-col gap-1">
            <div>
              <button
                className="border px-3 py-1 bg-gray-700 hover:opacity-80 cursor-pointer shadow-sm rounded-md text-gray-200"
                type="button"
                {...getRootProps()}
              >
                Browse file
              </button>
            </div>
            <div className="flex gap-2 items-center">
              <div className="border w-3/5 px-3 h-7 ">
                <p> {acceptedFile && acceptedFile.name}</p>
              </div>
              <div>
                <button
                  className="border px-3 py-1 bg-red-600 hover:opacity-80 cursor-pointer shadow-sm rounded-md text-gray-200 "
                  {...getRemoveFileProps()}
                  onClick={(e) => handleRemoveButClick(e, getRemoveFileProps)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </CSVReader>
  )
}
