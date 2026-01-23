import React, { useEffect, useState } from 'react'
import { SightingData } from '../../../models/kaki'
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
  const [formData, setFormData] = useState<SightingData>({
    band: '',
    date: '',
    area: '',
    location: '',
    x: null,
    y: null,
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
          x: editData.x,
          y: editData.y,
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
        { ...formData, ['band']: editData.band, id: editData.id },
        { onSuccess: () => onClose() },
      )
      return
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
          <label className="font-semibold" htmlFor="x">
            Easting
          </label>
          <input
            className="border p-1 border-gray-400"
            onChange={(e) => handleChange('x', e)}
            type="number"
            id="x"
            name="x"
            value={formData.x ?? ''}
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold" htmlFor="y">
            Northing
          </label>
          <input
            className="border p-1 border-gray-400"
            onChange={(e) => handleChange('y', e)}
            type="number"
            id="y"
            name="y"
            value={formData.y ?? ''}
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
