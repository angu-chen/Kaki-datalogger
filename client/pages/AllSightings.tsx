import AllSightingsTable from '../components/AllSightingsTable'
import AddBut from '../components/buttons/AddBut'
import SightingForm from '../components/forms/SightingForm'

export function AllSightings() {
  return (
    <div className="flex flex-col items-center h-screen">
      <h1 className="text-4xl my-5 font-semibold"> All Kakī Sightings</h1>
      <AddBut Form={SightingForm}>
        <p>New Sighting</p>
      </AddBut>
      <div className="w-4/5 my-2 overflow-scroll h-2/3">
        <AllSightingsTable />
      </div>
    </div>
  )
}
