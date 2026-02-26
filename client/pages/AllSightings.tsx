import AllSightingsTable from '../components/AllSightingsTable'
import AddBut from '../components/buttons/AddBut'
import SightingForm from '../components/forms/SightingForm'

export function AllSightings() {
  return (
    <div className="flex flex-col bg-white rounded-3xl p-2 items-center h-screen shadow-2xl">
      {/* <h1 className="text-4xl my-5 font-semibold"> All Kakī Sightings</h1> */}
      <AddBut Form={SightingForm}>
        <p>New Sighting</p>
      </AddBut>
      <div className=" w-full my-2 md:h-2/3 overflow-scroll">
        <AllSightingsTable />
      </div>
    </div>
  )
}
