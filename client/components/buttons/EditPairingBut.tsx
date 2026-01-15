import { useState } from 'react'
import Modal from '../Modal'

import { Pairing } from '../../../models/kaki'
import PairingForm from '../forms/PairingForm'

interface Props {
  pairingData: Pairing
}

export default function EditPairingBut({ pairingData }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen(true)
  }

  return (
    <div>
      <button
        onClick={handleClick}
        className="border bg-yellow-200 rounded-sm px-3 hover:bg-yellow-500 shadow-lg cursor-pointer"
      >
        Edit
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <PairingForm
          edit={true}
          editData={pairingData}
          onClose={() => setIsOpen(false)}
        />
      </Modal>
    </div>
  )
}
