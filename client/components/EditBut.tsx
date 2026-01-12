import { UseMutationResult } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'
import Modal from './Modal'

interface Props {
  children: ReactNode
  // mutationFn: UseMutationResult<void, Error, number, unknown>
}

export default function EditBut({ children }: Props) {
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
        {children}
      </Modal>
    </div>
  )
}
