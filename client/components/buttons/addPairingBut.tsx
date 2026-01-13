import { useState } from 'react'
import Modal from '../Modal'
import PairingForm from '../forms/PairingForm'

export default function AddPairingBut() {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen(true)
  }

  return (
    <div>
      <button
        onClick={handleClick}
        className="border bg-green-200 rounded-sm px-3 hover:bg-green-500 shadow-lg cursor-pointer"
      >
        Add Pairing
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <PairingForm onClose={() => setIsOpen(false)} />
      </Modal>
    </div>
  )
}
