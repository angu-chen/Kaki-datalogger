import { ReactNode, useState } from 'react'
import Modal from '../Modal'

import EditSightingForm from '../EditSightingForm'
import { UpdateSighting } from '../../../models/kaki'

interface Props {
  sightingData: UpdateSighting
}

export default function EditBut({ sightingData }: Props) {
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
        <EditSightingForm
          sightingData={sightingData}
          onClose={() => setIsOpen(false)}
        />
      </Modal>
    </div>
  )
}
