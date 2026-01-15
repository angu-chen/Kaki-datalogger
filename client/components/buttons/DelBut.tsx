import { useState } from 'react'
import Modal from '../Modal'
import { UseMutationResult } from '@tanstack/react-query'

interface Props {
  id: number
  mutationFn: UseMutationResult<void, Error, number, unknown>
}

export default function DelBut({ id, mutationFn }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  console.log(`del button id is ${id}`)
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
        className="border bg-red-300 rounded-sm px-3 hover:bg-red-500 shadow-lg cursor-pointer"
      >
        <p>Delete</p>
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
