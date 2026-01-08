import { useState } from 'react'
import { SightingData } from '../../models/kaki'

export default function SightingForm() {
  const [formData, setFormData] = useState<SightingData>({
    birdId: null,
    date: '',
    area: '',
    location: '',
    lat: null,
    lon: null,
    observer: '',
    notes: '',
  })
  const [band, setband] = useState('')

  const handleChange = (
    key: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newBand = e.target.value.trim()
    setband(newBand)
  }

  return (
    <form
      action="submit"
      onSubmit={() => {
        console.log('submitted')
      }}
    >
      <label htmlFor="band"> Kaki Band Code </label>
      <input
        className="border p-1 border-gray-400"
        onChange={(e) => handleChange('Band', e)}
        type="text"
        id="band"
        name="band"
        value={band}
      />
    </form>
  )
}
