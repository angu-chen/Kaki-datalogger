import { ReactNode, useState } from 'react'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import Modal from '../Modal'
import CSVUploaderComponent from './CSVUpload'
import CsvTable from './CsvTable'

interface Props {
  children?: ReactNode
}

export default function CsvUploadBut({ children }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [csvData, setCsvData] = useState<string[][] | null>(null)

  const handleClose = () => {
    // setCsvData(null)
    setIsOpen(false)
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
        <CSVUploaderComponent setData={setCsvData} />
        <div className="flex flex-col gap-3">
          {csvData && csvData.length > 0 ? (
            <CsvTable data={csvData} />
          ) : (
            <p>Please upload a csv </p>
          )}
        </div>
        <button className="border px-3 py-1 bg-gray-700 hover:opacity-80 cursor-pointer shadow-sm rounded-md text-gray-200 my-3">
          Save
        </button>
      </Modal>
    </div>
  )
}
