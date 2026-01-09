import { useState } from 'react'
import { SightingData } from '../../models/kaki'

export default function SightingForm() {
  const [formData, setFormData] = useState<SightingData>({
    birdId: undefined,
    date: '',
    area: '',
    location: '',
    lat: undefined,
    lon: undefined,
    observer: '',
    notes: '',
  })
  const [band, setBand] = useState('')

  const handleChange = (
    key: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newData = e.target.value.trim()
    if (key === 'band') setBand(newData)
    else {
      const newformData = { ...formData, [key]: newData }
      setFormData(newformData)
    }
  }

  return (
    <div className="">
      <h1 className="mb-5 font-semibold text-lg text-center">
        {' '}
        New Sighting Form
      </h1>
      <form
        className="flex flex-col gap-4 my-5"
        onSubmit={() => {
          console.log('submitted')
        }}
      >
        <div className="flex flex-col">
          <label className="font-semibold" htmlFor="band">
            {' '}
            Kaki Band Code *{' '}
          </label>
          <input
            className="border p-1 border-gray-400"
            onChange={(e) => handleChange('band', e)}
            type="text"
            id="band"
            name="band"
            value={band}
            required
          />
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
            value={formData.lat}
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
            value={formData.lon}
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
