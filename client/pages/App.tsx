import { useState } from 'react'
import DashBoard from '../components/Dashboard.tsx'
import Modal from '../components/Modal.tsx'

function App() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="flex justify-center">
      <div className="w-4/5 my-2 overflow-scroll h-1/2">
        <DashBoard />
      </div>
      <button onClick={() => setIsOpen(true)}>open modal</button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h1> I am the child</h1>
      </Modal>
    </div>
  )
}

export default App
