import { ReactNode, useState } from 'react'
import Modal from '../Modal'
import { UseMutationResult } from '@tanstack/react-query'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { red } from '@mui/material/colors'

interface Props {
  id: number
  mutationFn: UseMutationResult<void, Error, number, unknown>
  children?: ReactNode
}

export default function DelBut({ id, mutationFn, children }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen(true)
  }
  const handleConfirmation = () => {
    mutationFn.mutate(id, { onSuccess: () => window.history.back() })
  }
  return (
    <div>
      <button
        onClick={handleClick}
        className={
          children
            ? `border bg-red-500 rounded-sm px-3 py-1 hover:bg-red-800 shadow-lg cursor-pointer`
            : ''
        }
      >
        {children ? (
          children
        ) : (
          <DeleteForeverIcon className="text-red-500 hover:text-red-800 cursor-pointer hover:border" />
        )}
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <p className="text-center my-5 font-semibold">Are you sure?</p>
        <button
          onClick={handleConfirmation}
          className="border rounded-sm px-3 mx-5 shadow-lg cursor-pointer hover:bg-gray-300"
        >
          <p>Yes</p>
        </button>
        <button
          onClick={() => setIsOpen(false)}
          className="border rounded-sm px-3 mx-5 shadow-lg cursor-pointer hover:bg-gray-300"
        >
          <p>Cancel</p>
        </button>
      </Modal>
    </div>
  )
}
