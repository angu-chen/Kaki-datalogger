import { useState } from 'react'
import DashBoard from '../components/Dashboard.tsx'
import Modal from '../components/Modal.tsx'
import SightingForm from '../components/SightingForm.tsx'

function App() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="flex flex-col items-center">
      <div className="w-4/5 my-2 overflow-scroll h-1/2">
        <DashBoard />
      </div>
      <button
        className="border px-5 py-2 rounded-sm bg-green-800 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <p className="font-semibold hover:text-gray-300 hover:text-lg">
          Add new Sighting
        </p>
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <SightingForm onClose={() => setIsOpen(false)} />
      </Modal>
    </div>
  )
}

export default App
