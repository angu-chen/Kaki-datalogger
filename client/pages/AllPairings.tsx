import AllPairingsTable from '../components/AllPairingsTable'
import AddBut from '../components/buttons/AddBut'
import PairingForm from '../components/forms/PairingForm'

export function AllPairings() {
  return (
    <div className="flex flex-col items-center h-screen">
      <h1 className="text-4xl my-5 font-semibold"> All Kakī Pairings</h1>
      <AddBut Form={PairingForm}>
        <p>New Pairing</p>
      </AddBut>
      <div className="w-4/5 my-2 overflow-scroll h-2/3">
        <AllPairingsTable />
      </div>
    </div>
  )
}
