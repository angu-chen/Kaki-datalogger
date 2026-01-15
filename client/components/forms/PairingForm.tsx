import { useState } from 'react'
import { PairingData } from '../../../models/kaki'
import {
  useAddPairingMutation,
  useAddSightingMutation,
  useGetAllKaki,
} from '../../hooks/useKaki'

interface Props {
  onClose: () => void
}
export default function PairingForm({ onClose }: Props) {
  const [formData, setFormData] = useState<PairingData>({
    pairNo: '',
    year: undefined,
    bird1Band: '',
    bird2Band: '',
    location: '',
    treatment: '',
    lon: undefined,
    lat: undefined,
  })

  const [bandError, setBandError] = useState({
    set: false,
    msg: 'Band does not exist. Please choose from the list',
  })
  const addPairing = useAddPairingMutation()

  const { data: allKakiData, isError, isLoading } = useGetAllKaki()

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
    if (
      !bandlist?.includes(formData.bird1Band.trim()) ||
      !bandlist?.includes(formData.bird2Band.trim())
    ) {
      setBandError({ ...bandError, set: true })
      return
    }
    addPairing.mutate(formData, { onSuccess: () => onClose() })
  }

  return (
    <div>
      <h1 className="mb-5 font-semibold text-lg text-center"> New Pairing</h1>
      <form className="flex flex-col gap-4 my-5" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="font-semibold" htmlFor="pairNo">
            Pair Number
          </label>
          <input
            className={` border-gray-400 border p-1`}
            onChange={(e) => handleChange('pairNo', e)}
            autoComplete="off"
            type="text"
            value={formData.pairNo}
            name="pairNo"
            id="pairNo"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold" htmlFor="year">
            Year*
          </label>
          <input
            className={` border-gray-400 border p-1`}
            onChange={(e) => handleChange('year', e)}
            autoComplete="off"
            type="number"
            value={formData.year}
            name="year"
            id="year"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold" htmlFor="bird1">
            Bird 1 Band*
          </label>
          <input
            className={`${bandError.set ? 'border-R border-2' : 'border-gray-400'} border`}
            onChange={(e) => handleChange('bird1Band', e)}
            autoComplete="off"
            type="text"
            list="band-list"
            value={formData.bird1Band}
            name="bird1"
            id="bird1"
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
          <label className="font-semibold" htmlFor="bird1">
            Bird 2 Band*
          </label>
          <input
            className={`${bandError.set ? 'border-R border-2' : 'border-gray-400'} border`}
            onChange={(e) => handleChange('bird2Band', e)}
            autoComplete="off"
            type="text"
            list="band-list"
            value={formData.bird2Band}
            name="bird2"
            id="bird2"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold" htmlFor="location">
            Location*
          </label>
          <input
            className={` border-gray-400 border p-1`}
            onChange={(e) => handleChange('location', e)}
            autoComplete="off"
            type="text"
            value={formData.location}
            name="location"
            id="location"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold" htmlFor="treatment">
            Treatment*
          </label>
          <input
            className={` border-gray-400 border p-1`}
            onChange={(e) => handleChange('treatment', e)}
            autoComplete="off"
            type="text"
            value={formData.treatment}
            name="treatment"
            id="treatment"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold" htmlFor="lat">
            Latitude*
          </label>
          <input
            className={` border-gray-400 border p-1`}
            onChange={(e) => handleChange('lat', e)}
            autoComplete="off"
            type="text"
            value={formData.lat}
            name="lat"
            id="lat"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold" htmlFor="lon">
            Longitude*
          </label>
          <input
            className={` border-gray-400 border p-1`}
            onChange={(e) => handleChange('lon', e)}
            autoComplete="off"
            type="text"
            value={formData.lon}
            name="lon"
            id="lon"
            required
          />
        </div>
        <p>*Required</p>
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
