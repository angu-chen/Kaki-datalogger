import DashBoard from '../components/Dashboard.tsx'

import SightingForm from '../components/forms/SightingForm.tsx'

import AddBut from '../components/buttons/AddBut.tsx'
import { Map } from '../components/Map.tsx'

function App() {
  return (
    <div className="flex flex-col items-center">
      {/* <div className="w-1/2">
        <Map />
      </div> */}

      <div className="w-4/5 my-2 overflow-scroll h-1/2">
        <DashBoard />
      </div>
      <AddBut Form={SightingForm}>
        <p>Add Sighting</p>
      </AddBut>
    </div>
  )
}
export default App
