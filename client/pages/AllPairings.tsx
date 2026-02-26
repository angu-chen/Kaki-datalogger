import AllPairingsTable from '../components/AllPairingsTable'
import AddBut from '../components/buttons/AddBut'
import PairingForm from '../components/forms/PairingForm'

export function AllPairings() {
  return (
    <div className="flex flex-col bg-white rounded-3xl p-2 items-center h-screen shadow-2xl">
      <AddBut Form={PairingForm}>
        <p>New Pairing</p>
      </AddBut>
      <div className=" w-full my-2 md:h-2/3 overflow-scroll">
        <AllPairingsTable />
      </div>
    </div>
  )
}
