import React, { ReactNode, useState } from 'react'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import Modal from '../Modal'
import CSVUploaderComponent from './CSVUpload'
import CsvTable from './CsvTable'

import SiteConfirmation from './SiteConfirmation'
import { ReleaseSites } from '../../../models/kaki'

interface Props {
  children?: ReactNode
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

    const newSites: ReleaseSites[] = uniqueSites.map((location) => {
      return { site: location, year: csvData[0].year, kakiSubBands: [] }
    })

    csvData?.forEach((kaki) => {
      const index = newSites.findIndex((release) => release.site === kaki.site)
      newSites[index].kakiSubBands.push(kaki.band)
    })
    console.log(newSites)
    setNewRelease(newSites)
  }

  const handleChange = (
    index: number,
    key: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!newRelease) return
    const newData = e.target.value
    const updatedData = newRelease.map((site, i) => {
      if (i === index) {
        return { ...site, [key]: newData }
      }
      return site
    })
    setNewRelease(updatedData)
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
        {/*  New release Kaki Group View */}
        <div className={`${edit ? 'block' : 'hidden'}`}>
          {newRelease ? (
            <SiteConfirmation
              releaseSites={newRelease}
              setReleaseSites={setNewRelease}
              onClose={handleClose}
            />
          ) : (
            <p>ERROR NO DATA</p>
          )}
          {/* <form className="flex, flex-col gap-4 my-5">
            <label className="font-semibold" htmlFor="site1">
              Site 1
            </label>
            <input
              className="border-gray-400 border p-1"
              onChange={(e) => {
                handleChange(0, 'site', e)
              }}
              autoComplete="off"
              value={newRelease ? newRelease[0].site : ''}
              name="site1"
              id="site1"
            />
          </form>
          <div>
            {newRelease ? (
              newRelease[0].kakiSub.map((band) => <p key={band}>{band}</p>)
            ) : (
              <p>nothing to show</p>
            )}
          </div> */}
        </div>
      </Modal>
    </div>
  )
}
