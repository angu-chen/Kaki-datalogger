import React, { useEffect, useState } from 'react'
import { NewSighting } from '../../../models/kaki'
import {
  useAddSightingMutation,
  useGetAllKaki,
  useUpdateSightingMutation,
} from '../../hooks/useKaki'
import { SightingFormsProp } from '../../../models/forms'

export default function SightingForm({
  onClose,
  edit = false,
  editData,
}: SightingFormsProp) {
  const [formData, setFormData] = useState<NewSighting>({
    band: '',
    date: '',
    area: '',
    location: '',
    lat: null,
    lon: null,
    observer: '',
    notes: '',
  })

  useEffect(() => {
    if (edit) {
      if (editData) {
        setFormData({
          band: editData.band,
          date: editData.date,
          area: editData.area,
          location: editData.location,
          lat: editData.lat,
          lon: editData.lon,
          observer: editData.observer,
          notes: editData.notes,
        })
      }
    }
  }, [edit, editData])

  const [bandError, setBandError] = useState({
    set: false,
    msg: 'Band does not exist. Please choose from the list',
  })

  const { data: allKakiData, isError, isLoading } = useGetAllKaki()
  const addSighting = useAddSightingMutation()
  const editSighting = useUpdateSightingMutation()

  if (isError) return <h1> An error occurred loading Kakis</h1>
  if (isLoading) return <h1> Gathering kakis</h1>
  // console.log(allKakiData)

  const bandlist = allKakiData?.map((kaki) => kaki.band)

  const handleChange = (
    key: string,
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const newData = e.target.value

    const newformData = { ...formData, [key]: newData }
    setFormData(newformData)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!bandlist?.includes(formData.band.trim())) {
      setBandError({ ...bandError, set: true })
      return
    }
    if (edit && editData) {
      editSighting.mutate(
        { ...formData, ['band']: editData.band },
        { onSuccess: () => onClose() },
      )
    }

    addSighting.mutate(formData, { onSuccess: () => onClose() })
  }

  return (
    <div className="">
      <h1 className="mb-5 font-semibold text-lg text-center">
        {edit ? 'Edit Sighting' : 'New Sighting'}
      </h1>
      <form className="flex flex-col gap-4 my-5" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="font-semibold" htmlFor="band">
            {' '}
            Kaki Band Code *{' '}
          </label>
          <input
            className={`${bandError.set ? 'border-R border-2' : 'border-gray-400'} border`}
            onChange={(e) => handleChange('band', e)}
            autoComplete="off"
            type="text"
            list="band-list"
            value={formData.band}
            name="band"
            id="band"
            required
          />

          <datalist id="band-list">
            <option value={''}>Please choose a kaki band</option>
            {allKakiData?.map((kaki) => {
              return (
                <option key={kaki.band} value={kaki.band}>
                  {kaki.band}
                </option>
              )
            })}
          </datalist>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold" htmlFor="observer">
            {' '}
            Observer *{' '}
          </label>
          <input
            className="border p-1 border-gray-400"
            onChange={(e) => handleChange('observer', e)}
            type="text"
            id="observer"
            name="observer"
            value={formData.observer}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold" htmlFor="date">
            {' '}
            Date{' '}
          </label>
          <input
            className="border p-1 border-gray-400"
            onChange={(e) => handleChange('date', e)}
            type="date"
            id="date"
            name="date"
            value={formData.date}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold" htmlFor="area">
            {' '}
            Area *{' '}
          </label>
          <input
            className="border p-1 border-gray-400"
            onChange={(e) => handleChange('area', e)}
            type="text"
            id="area"
            name="area"
            value={formData.area}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold" htmlFor="location">
            {' '}
            Location *{' '}
          </label>
          <input
            className="border p-1 border-gray-400"
            onChange={(e) => handleChange('location', e)}
            type="text"
            id="location"
            name="location"
            value={formData.location}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold" htmlFor="lat">
            {' '}
            Lat.{' '}
          </label>
          <input
            className="border p-1 border-gray-400"
            onChange={(e) => handleChange('lat', e)}
            type="number"
            id="lat"
            name="lat"
            value={formData.lat ?? ''}
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold" htmlFor="lon">
            {' '}
            Lon.{' '}
          </label>
          <input
            className="border p-1 border-gray-400"
            onChange={(e) => handleChange('lon', e)}
            type="number"
            id="lon"
            name="lon"
            value={formData.lon ?? ''}
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold" htmlFor="notes">
            {' '}
            notes{' '}
          </label>
          <textarea
            className="border p-1 border-gray-400"
            onChange={(e) => handleChange('notes', e)}
            id="notes"
            name="notes"
            value={formData.notes}
          />
        </div>
        <p>*required</p>
        <p
          className={`text-R font-bold text-sm ${bandError.set ? 'block' : 'hidden'} `}
        >
          {bandError.msg}
        </p>
        <button
          className="border self-center w-fit px-3 font-semibold rounded hover:bg-gray-300 cursor-pointer"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  )
}
