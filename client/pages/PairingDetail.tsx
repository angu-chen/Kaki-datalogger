import { useNavigate, useParams } from 'react-router'
import { useDelPairingMutation, usePairingbyId } from '../hooks/useKaki'

import DelBut from '../components/buttons/DelBut'
import EditBut from '../components/buttons/EditBut'
import PairingForm from '../components/forms/PairingForm'
import { Map } from '../components/maps/Map'

export default function PairingsDetail() {
  const params = useParams()
  const navigate = useNavigate()
  const id = params.id
  const { data: pairingData, isError, isLoading } = usePairingbyId(id as string)

  const delPairing = useDelPairingMutation()
  if (isError) return <h1> An error occurred loading pairing</h1>

  if (isLoading) return <h1> Looking for pairing</h1>
  if (!pairingData) return <p> No Data</p>

  // creating map props//
  const mapData = [
    {
      id: pairingData.id,
      x: pairingData.x,
      y: pairingData.y,
      msg: `Pair no. ${pairingData.pairNo} consisting of Kakī ${pairingData.bird1Band} and ${pairingData.bird2Band}.`,
    },
  ]

  return (
    <div className="flex flex-col items-center">
      <div className="my-5">
        <h1 className="text-4xl font-semibold text-center">
          {pairingData.pairNo}
        </h1>
        <div className="flex gap-3 my-3 justify-center">
          <EditBut editData={pairingData} Form={PairingForm} />

          <DelBut id={pairingData.id} mutationFn={delPairing} />
        </div>
      </div>
      <div className="flex flex-col gap-3 items-center w-5/6">
        <div className="flex gap-3 text-sm flex-wrap justify-center w-full">
          <div>
            <h3 className="font-semibold ">Bird 1</h3>
            <button
              className="hover:text-B cursor-pointer"
              onClick={() => navigate(`/${pairingData.bird1Id}`)}
            >
              <p>{pairingData.bird1Band}</p>
            </button>
          </div>
          <div>
            <h3 className="font-semibold text-sm">Bird 2</h3>
            <button
              className="hover:text-B cursor-pointer"
              onClick={() => navigate(`/${pairingData.bird2Id}`)}
            >
              <p>{pairingData.bird2Band}</p>
            </button>
          </div>
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
            <h3 className="font-semibold text-sm">Easting</h3>
            <p>{pairingData.x}</p>
          </div>
          <div>
            <h3 className="font-semibold text-sm">Northing</h3>
            <p>{pairingData.y}</p>
          </div>
        </div>
        <div className=" w-full">
          <Map data={mapData} />
        </div>
      </div>
    </div>
  )
}
