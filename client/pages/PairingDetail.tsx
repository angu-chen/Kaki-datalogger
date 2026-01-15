import { useNavigate, useParams } from 'react-router'
import { useDelPairingMutation, usePairingbyId } from '../hooks/useKaki'

import DelBut from '../components/buttons/DelBut'
import EditBut from '../components/buttons/EditBut'
import PairingForm from '../components/forms/PairingForm'

export default function PairingsDetail() {
  const params = useParams()
  const navigate = useNavigate()
  const id = params.id
  const { data: pairingData, isError, isLoading } = usePairingbyId(id as string)

  const delPairing = useDelPairingMutation()
  if (isError) return <h1> An error occurred loading pairing</h1>

  if (isLoading) return <h1> Looking for pairing</h1>

  return (
    <div className="flex flex-col items-center">
      <div className="my-5">
        <h1 className="text-4xl font-semibold text-center">
          {pairingData.pairNo}
        </h1>
      </div>
      <div className="flex gap-5 flex-wrap w-2/5">
        <button
          className="hover:text-B cursor-pointer"
          onClick={() => navigate(`/${pairingData.bird1Id}`)}
        >
          <h3 className="font-semibold text-sm">Bird 1</h3>
          <p>{pairingData.bird1Band}</p>
        </button>
        <button
          className="hover:text-B cursor-pointer"
          onClick={() => navigate(`/${pairingData.bird2Id}`)}
        >
          <h3 className="font-semibold text-sm">Bird 2</h3>
          <p>{pairingData.bird2Band}</p>
        </button>
        <div>
          <h3 className="font-semibold text-sm">Location</h3>
          <p>{pairingData.location}</p>
        </div>
        <div>
          <h3 className="font-semibold text-sm">Treatment</h3>
          <p>{pairingData.treatment}</p>
        </div>
        <div>
          <h3 className="font-semibold text-sm">Year</h3>
          <p>{pairingData.year}</p>
        </div>

        <div>
          <h3 className="font-semibold text-sm">Latitude</h3>
          <p>{pairingData.lat}</p>
        </div>
        <div>
          <h3 className="font-semibold text-sm">Longitude</h3>
          <p>{pairingData.lon}</p>
        </div>
      </div>

      <EditBut editData={pairingData} Form={PairingForm}>
        {/* <p>Edit</p> */}
      </EditBut>
      <DelBut id={pairingData.id} mutationFn={delPairing} />
    </div>
  )
}
