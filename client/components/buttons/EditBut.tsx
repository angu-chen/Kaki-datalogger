import React, { ReactNode, useState } from 'react'
import { Pairing, UpdateSighting } from '../../../models/kaki'
import { FormsProps } from '../../../models/forms'
import Modal from '../Modal'

interface Props {
  editData: Pairing | UpdateSighting
  children: ReactNode
  Form: React.ComponentType<FormsProps>
}

export default function EditBut({ editData, children, Form }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)

  const handleClick = () => {
    setIsOpen(true)
  }

  return (
    <div>
      <button
        onClick={handleClick}
        className="border bg-yellow-200 rounded-sm px-3 hover:bg-yellow-500 shadow-lg cursor-pointer"
      >
        {children}
      </button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <Form edit={true} editData={editData} onClose={onClose} />
      </Modal>
    </div>
  )
}
