import AllSightingsTable from '../components/AllSightingsTable'
import AddBut from '../components/buttons/AddBut'
import SightingForm from '../components/forms/SightingForm'

export function AllSightings() {
  return (
    <div className="flex flex-col items-center h-screen">
      {/* <h1 className="text-4xl my-5 font-semibold"> All Kakī Sightings</h1> */}
      <AddBut Form={SightingForm}>
        <p>New Sighting</p>
      </AddBut>
      <div className="w-full md:w-5/6 my-2 md:h-2/3 overflow-hidden">
        <AllSightingsTable />
      </div>
    </div>
  )
}
