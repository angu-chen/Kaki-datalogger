import DashBoard from '../components/Dashboard.tsx'

import SightingForm from '../components/forms/SightingForm.tsx'

import AddBut from '../components/buttons/AddBut.tsx'

function App() {
  // const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="flex flex-col items-center">
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
