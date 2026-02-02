import React, { ReactNode, useState } from 'react'
import { FormsProps } from '../../../models/forms'
import Modal from '../Modal'
import EditIcon from '@mui/icons-material/Edit'

interface Props<T> {
  editData: T
  children?: ReactNode
  Form: React.ComponentType<FormsProps & { editData?: T }>
}

export default function EditBut<T>({ editData, children, Form }: Props<T>) {
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)

  const handleClick = () => {
    setIsOpen(true)
  }

  return (
    <div>
      <button
        onClick={handleClick}
        className={
          children
            ? `border bg-amber-400 rounded-sm px-3 py-1 hover:bg-amber-700 shadow-lg cursor-pointer`
            : ''
        }
      >
        {children ? (
          children
        ) : (
          <EditIcon className="text-amber-400 hover:text-amber-700 cursor-pointer hover:border" />
        )}
      </button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <Form edit={true} editData={editData} onClose={onClose} />
      </Modal>
    </div>
  )
}
