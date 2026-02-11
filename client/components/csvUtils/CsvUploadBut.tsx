import { ReactNode, useState } from 'react'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import Modal from '../Modal'
import CSVUploaderComponent from './CSVUpload'
import CsvTable from './CsvTable'
import Papa from 'papaparse'

interface Props {
  children?: ReactNode
}

interface ReleaseSites {
  site: string
  year: number
  kakiBands: string[]
}

export default function CsvUploadBut({ children }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [csvData, setCsvData] = useState<object[] | null>(null)
  const [edit, setEdit] = useState<boolean>(false)
  const [newRelease, setNewRelease] = useState<ReleaseSites[] | null>(null)

  const handleClose = () => {
    setCsvData(null)
    setEdit(false)
    setIsOpen(false)
  }
  console.log(csvData)

  const handleNextClick = () => {
    setEdit(true)
    const sites = csvData?.map((data) => data.site)
    const uniqueSites = [...new Set(sites)]

    const newSites = uniqueSites.map((location) => {
      return { site: location, year: csvData[0].year, kakiSub: [] }
    })

    csvData?.forEach((kaki) => {
      const index = newSites.findIndex((release) => release.site === kaki.site)
      newSites[index].kakiSub.push(kaki.band)
    })
    setNewRelease(newSites)
  }

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className={`${children ? 'bg-blue-500 border  px-3 py-1' : ''} font-semibold cursor-pointer  hover:opacity-80`}
      >
        {children ? children : <UploadFileIcon className="text-blue-800" />}
      </button>

      <Modal classname="w-4/5" isOpen={isOpen} onClose={handleClose}>
        <div className={`${edit ? 'hidden' : 'block'}`}>
          <CSVUploaderComponent setData={setCsvData} />
          <div className="flex flex-col gap-3">
            {csvData && csvData.length > 0 ? (
              <CsvTable data={csvData} />
            ) : (
              // <p>yay csv data</p>
              <p>Please upload a csv </p>
            )}
          </div>
          <button
            onClick={handleNextClick}
            className="border px-3 py-1 bg-gray-700 hover:opacity-80 cursor-pointer shadow-sm rounded-md text-gray-200 my-3"
          >
            Next
          </button>
        </div>
        <div className={`${edit ? 'block' : 'hidden'}`}>hello</div>
      </Modal>
    </div>
  )
}
