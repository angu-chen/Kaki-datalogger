import AllPairingsTable from '../components/AllPairingsTable'
import AddBut from '../components/buttons/AddBut'
import PairingForm from '../components/forms/PairingForm'

export function AllPairings() {
  return (
    <div className="flex flex-col items-center h-screen">
      <AddBut Form={PairingForm}>
        <p>New Pairing</p>
      </AddBut>
      <div className=" w-full md:w-5/6 my-2 md:h-2/3">
        <AllPairingsTable />
      </div>
    </div>
  )
}
