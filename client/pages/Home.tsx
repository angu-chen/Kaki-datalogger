import DashBoard from '../components/Dashboard.tsx'

import SightingForm from '../components/forms/SightingForm.tsx'

import AddBut from '../components/buttons/AddBut.tsx'
import { Map } from '../components/maps/DashMap.tsx'

function App() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-5/6 my-2  h-1/2">
        <DashBoard />
      </div>
    </div>
  )
}
export default App
